# license-issuer

Cloudflare Worker that receives Stripe `checkout.session.completed` webhooks,
signs a license payload with Ed25519, and emails the key to the customer.

See `docs/LICENSE_BACKEND.md` at the repo root for the end-to-end architecture
and rationale.

## Prerequisites

- Node 20+
- A Cloudflare account (free tier is plenty — 100k req/day)
- A Stripe account with a Payment Link configured
- A Resend account (or swap the email provider in `src/index.ts`)

## One-time setup

```bash
cd workers/license-issuer
npm install

# Log in to Cloudflare if you haven't already.
npx wrangler login

# Generate the Ed25519 keypair (copy the output).
node -e "
const { generateKeyPairSync } = require('crypto');
const { publicKey, privateKey } = generateKeyPairSync('ed25519');
const pub  = publicKey.export({ type: 'spki',  format: 'der' }).subarray(-32);
const priv = privateKey.export({ type: 'pkcs8', format: 'der' }).subarray(-32);
console.log('PUBLIC  (base64, ship in app):', pub.toString('base64'));
console.log('PRIVATE (base64, keep SECRET):', priv.toString('base64'));
"

# Paste the PUBLIC value into LicenseManager.swift signingPublicKeyBase64.

# Register secrets (paste values when prompted):
npx wrangler secret put LICENSE_SIGNING_PRIVATE_KEY   # PRIVATE from above
npx wrangler secret put STRIPE_WEBHOOK_SECRET         # whsec_... from Stripe
npx wrangler secret put RESEND_API_KEY                # re_... from Resend
```

## Deploy

```bash
npx wrangler deploy
```

Then in Stripe Dashboard → Developers → Webhooks → Add endpoint:

- URL: `https://license-issuer.<your-subdomain>.workers.dev/stripe-webhook`
- Event: `checkout.session.completed`

Copy the webhook signing secret back into `STRIPE_WEBHOOK_SECRET` if you
didn't already.

## Local development

```bash
# Start the Worker locally on :8787
npx wrangler dev

# In another tab, forward real Stripe events to it:
stripe listen --forward-to localhost:8787/stripe-webhook

# Trigger a test event:
stripe trigger checkout.session.completed
```

`wrangler dev` reads secrets from `.dev.vars` (gitignored). Create one with
dummy values for local testing:

```
LICENSE_SIGNING_PRIVATE_KEY=<base64 private key>
STRIPE_WEBHOOK_SECRET=<whsec_... from `stripe listen`>
RESEND_API_KEY=<re_...>
```

## Free-tier cost

100,000 requests/day, 10ms CPU per request. A $2.99 app sits several orders
of magnitude below the limit. Zero cost for the forseeable future.
