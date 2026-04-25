export interface StripeEvent {
  type: string;
  data: { object: unknown };
}

export interface CheckoutSession {
  id: string;
  customer_details?: { email?: string | null };
}

const REPLAY_WINDOW_SEC = 300;

export async function verifyStripeWebhook(
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

  // Reject events older than REPLAY_WINDOW_SEC to narrow the replay window.
  const eventAgeSec = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (!Number.isFinite(eventAgeSec) || eventAgeSec > REPLAY_WINDOW_SEC || eventAgeSec < -60) {
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

function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (const b of bytes) out += b.toString(16).padStart(2, "0");
  return out;
}
