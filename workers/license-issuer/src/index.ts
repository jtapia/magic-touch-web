/**
 * Tappit license issuer.
 *
 * Receives Stripe `checkout.session.completed` webhooks, signs a license
 * payload with Ed25519, and emails the key to the customer via Resend.
 *
 * The app verifies the signature locally against a bundled public key —
 * no runtime network requests. See docs/LICENSE_BACKEND.md for the
 * end-to-end design.
 */

import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import type { Env } from "./env";

// @noble/ed25519 v2 requires a synchronous SHA-512 implementation at startup.
ed.etc.sha512Sync = (...msgs) => sha512(ed.etc.concatBytes(...msgs));

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }
    if (new URL(req.url).pathname !== "/stripe-webhook") {
      return new Response("Not found", { status: 404 });
    }

    const body = await req.text();
    const sig = req.headers.get("stripe-signature") ?? "";

    const event = await verifyStripeWebhook(body, sig, env.STRIPE_WEBHOOK_SECRET);
    if (!event) return new Response("Bad signature", { status: 400 });

    // Only act on completed checkouts. Acknowledge everything else so Stripe
    // doesn't retry — returning 200 is the idiom for "received but no action".
    if (event.type !== "checkout.session.completed") {
      return new Response("Ignored", { status: 200 });
    }

    const session = event.data.object as CheckoutSession;
    const email = session.customer_details?.email?.toLowerCase().trim();
    const sessionId = session.id;
    if (!email) return new Response("No customer email", { status: 400 });

    try {
      const licenseKey = await issueLicense(email, sessionId, env.LICENSE_SIGNING_PRIVATE_KEY);
      // Run the email send after responding so Stripe's webhook SLA (5s) isn't
      // at risk if Resend is slow. `ctx.waitUntil` keeps the worker alive past
      // the response. If Resend fails, the customer emails support — we have
      // the session ID in logs and can reissue manually.
      ctx.waitUntil(sendLicenseEmail(email, licenseKey, env));
      return new Response("OK", { status: 200 });
    } catch (err) {
      // Don't return 500 to Stripe unless we actually want a retry. If signing
      // failed due to a config error, retries won't help — but we log and
      // return 500 anyway so the issue surfaces in Stripe's dashboard.
      console.error("issueLicense failed", err);
      return new Response("Internal error", { status: 500 });
    }
  },
};

// MARK: - License signing

interface CheckoutSession {
  id: string;
  customer_details?: { email?: string | null };
}

async function issueLicense(
  email: string,
  licenseId: string,
  privateKeyB64: string,
): Promise<string> {
  const seed = base64ToBytes(privateKeyB64);
  if (seed.length !== 32) {
    throw new Error(`Expected 32-byte Ed25519 seed, got ${seed.length} bytes`);
  }

  const payload = `${email}|${Math.floor(Date.now() / 1000)}|${licenseId}`;
  const payloadBytes = new TextEncoder().encode(payload);
  const signature = await ed.signAsync(payloadBytes, seed);

  return `${base64url(payloadBytes)}.${base64url(signature)}`;
}

// MARK: - Stripe webhook verification
// https://stripe.com/docs/webhooks/signatures — manual because the Stripe SDK
// isn't Worker-friendly (Node-only crypto).

interface StripeEvent {
  type: string;
  data: { object: unknown };
}

async function verifyStripeWebhook(
  body: string,
  header: string,
  secret: string,
): Promise<StripeEvent | null> {
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const [k, ...rest] = p.split("=");
      return [k?.trim() ?? "", rest.join("=").trim()];
    }),
  );
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return null;

  // Reject events older than 5 minutes to narrow the replay window.
  const eventAgeSec = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (!Number.isFinite(eventAgeSec) || eventAgeSec > 300 || eventAgeSec < -60) {
    return null;
  }

  const signedPayload = `${timestamp}.${body}`;
  const expected = await hmacSha256Hex(secret, signedPayload);
  if (!timingSafeEqualHex(expected, signature)) return null;

  try {
    return JSON.parse(body) as StripeEvent;
  } catch {
    return null;
  }
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return bytesToHex(new Uint8Array(sig));
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// MARK: - Email

async function sendLicenseEmail(to: string, licenseKey: string, env: Env): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to,
      subject: "Your Tappit license",
      text:
        `Thanks for buying Tappit!\n\n` +
        `Email:       ${to}\n` +
        `License key: ${licenseKey}\n\n` +
        `To activate:\n` +
        `  1. Open Tappit → Preferences → License\n` +
        `  2. Enter your email and paste the key above\n` +
        `  3. Click Activate\n\n` +
        `Keep this email — it's your proof of purchase.\n` +
        `Questions? Reply to this email or write to ${env.SUPPORT_EMAIL}.`,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "<unreadable>");
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

// MARK: - Encoding helpers

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function base64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (const b of bytes) out += b.toString(16).padStart(2, "0");
  return out;
}
