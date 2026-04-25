export interface Env {
  // Secrets
  LICENSE_SIGNING_PRIVATE_KEY: string; // base64, 32-byte Ed25519 seed
  STRIPE_WEBHOOK_SECRET: string;       // whsec_...
  RESEND_API_KEY: string;              // re_...

  // Vars
  FROM_EMAIL: string;
  SUPPORT_EMAIL: string;

  // Bindings
  LICENSES: KVNamespace;
}
