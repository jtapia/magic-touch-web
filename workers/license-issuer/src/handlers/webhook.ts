import type { Env } from "../env";
import { verifyStripeWebhook, type CheckoutSession } from "../stripe";
import {
  generateRawLicenseKey,
  signLicense,
  sha256Hex,
  maskRawKey,
} from "../license";
import {
  getSessionPointer,
  putLicense,
  putSessionPointer,
  putSignedPointer,
  MAX_DEVICES,
  type LicenseRecord,
} from "../kv";
import { sendLicenseEmail } from "../email";

export async function handleWebhook(
  req: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  const event = await verifyStripeWebhook(body, sig, env.STRIPE_WEBHOOK_SECRET);
  if (!event) return new Response("Bad signature", { status: 400 });

  if (event.type !== "checkout.session.completed") {
    console.log("webhook: ignored event type", { type: event.type });
    return new Response("Ignored", { status: 200 });
  }

  const session = event.data.object as CheckoutSession;
  const email = session.customer_details?.email?.toLowerCase().trim();
  const sessionId = session.id;
  if (!email) {
    console.warn("webhook: missing customer email", { sessionId });
    return new Response("No customer email", { status: 400 });
  }

  // Idempotency: Stripe retries on non-2xx and occasionally on success.
  // If we've already issued for this session, return 200 without re-issuing.
  const existing = await getSessionPointer(env.LICENSES, sessionId);
  if (existing) {
    console.log("webhook: idempotent skip", { sessionId, email });
    return new Response("Already issued", { status: 200 });
  }
  console.log("webhook: issuing license", { sessionId, email });

  try {
    const rawLicenseKey = generateRawLicenseKey();
    const signed = await signLicense(email, rawLicenseKey, env.LICENSE_SIGNING_PRIVATE_KEY);
    const rawKeyHash = await sha256Hex(rawLicenseKey);
    const signedKeyHash = await sha256Hex(signed.signedToken);
    const maskedKey = maskRawKey(rawLicenseKey);

    const record: LicenseRecord = {
      email,
      sessionId,
      rawKeyHash,
      signedKeyHash,
      maskedKey,
      issuedAt: signed.issuedAt,
      status: "active",
      activations: [],
      maxDevices: MAX_DEVICES,
    };

    // Write primary record first, then pointers. If a pointer write fails,
    // the primary record exists but is unreachable by session/signed lookup —
    // support can recover via direct rawKeyHash if needed. We accept this
    // over a partial state where a pointer exists without a primary.
    await putLicense(env.LICENSES, record);
    await Promise.all([
      putSessionPointer(env.LICENSES, sessionId, { rawKeyHash, signedKeyHash }),
      putSignedPointer(env.LICENSES, signedKeyHash, { rawKeyHash }),
    ]);

    // ctx.waitUntil silently swallows rejections; .catch surfaces the failure.
    ctx.waitUntil(
      sendLicenseEmail(
        { to: email, rawLicenseKey, signedLicenseToken: signed.signedToken },
        env,
      ).catch((err) => {
        console.error("sendLicenseEmail failed", {
          sessionId,
          to: email,
          error: err instanceof Error ? err.message : String(err),
        });
      }),
    );
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("license issuance failed", { sessionId, err });
    return new Response("Internal error", { status: 500 });
  }
}
