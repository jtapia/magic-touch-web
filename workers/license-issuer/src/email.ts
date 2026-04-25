import type { Env } from "./env";

export interface LicenseEmailPayload {
  to: string;
  rawLicenseKey: string;
  signedLicenseToken: string;
}

export async function sendLicenseEmail(
  payload: LicenseEmailPayload,
  env: Env,
): Promise<void> {
  const { to, rawLicenseKey, signedLicenseToken } = payload;
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
        `Email:        ${to}\n` +
        `License key:  ${rawLicenseKey}\n` +
        `Activation:   ${signedLicenseToken}\n\n` +
        `To activate:\n` +
        `  1. Open Tappit → Preferences → License\n` +
        `  2. Enter your email and license key above\n` +
        `  3. Click Activate (the app uses the activation token automatically)\n\n` +
        `You can activate Tappit on up to 3 devices with this license.\n` +
        `Keep this email — it's your proof of purchase.\n` +
        `Questions? Reply to this email or write to ${env.SUPPORT_EMAIL}.`,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "<unreadable>");
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}
