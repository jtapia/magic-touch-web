# License endpoints: /webhook, /success, /validate, /activate

**Status:** Approved design, pending implementation plan
**Date:** 2026-04-25
**Owner:** jonathan@even.biz

## Summary

Replace the current single-purpose `workers/license-issuer/src/index.ts` (Stripe
webhook → Ed25519 sign → Resend email, stateless) with a stateful licensing
service backed by Cloudflare KV. Add three new endpoints and a `/success` page
on the marketing site so customers see a confirmation immediately after
checkout, can periodically validate their license from the macOS app, and can
activate up to three devices per license.

## Goals

- Persist every issued license in KV so support can revoke and the app can
  validate online.
- Show a meaningful confirmation page after Stripe checkout without exposing
  the full license key in the browser.
- Bind licenses to a small number of devices (3) to limit casual sharing while
  preserving a friction-free experience for legitimate buyers.
- Keep the macOS app's existing offline Ed25519 verification working — `/validate`
  is a periodic check, not a runtime gate.

## Non-goals

- `/deactivate` endpoint. Users at the device cap contact support for now.
- Admin UI for revocation. Manual `wrangler kv key put` until volume warrants
  tooling.
- Migration of existing customers. The Stripe Payment Link is still in test
  mode (`wrangler.toml`), so there are none.
- Rate limiting beyond Cloudflare's built-in DDoS protection.

## Architecture

Two workers, one KV namespace.

**`workers/license-issuer/`** (backend, no static assets) hosts:

- `POST /webhook` — Stripe `checkout.session.completed` handler.
- `GET  /session/:sessionId` — read-only lookup for the marketing site's
  `/success` page. Returns a masked license key.
- `POST /validate` — periodic license check from the macOS app.
- `POST /activate` — bind a license to a device (≤3 devices).

**`worker/`** (marketing site `tappit-web`, serves Next.js static export) hosts:

- `/success` — Next.js page that reads `?session_id=` and fetches `/session/:id`
  from `license-issuer`, with polling fallback for the webhook race.

The macOS app continues to verify the signed Ed25519 token offline on every
launch. `/validate` is called periodically (recommendation: every 7 days) with
a 30-day offline grace period before the app deactivates if the server reports
`status: "revoked"`.

## Data model

KV namespace `LICENSES` on `license-issuer`. Three key schemas:

### `lic:<sha256(rawLicenseKey)>` — primary record

```json
{
  "email": "user@example.com",
  "sessionId": "cs_test_abc123",
  "rawKeyHash": "<sha256(rawLicenseKey) hex>",
  "signedKeyHash": "<sha256(signedLicenseToken) hex>",
  "maskedKey": "tap_••••••••3F2A",
  "issuedAt": 1714003200,
  "status": "active",
  "activations": [
    { "deviceId": "uuid", "activatedAt": 1714003500, "lastSeenAt": 1714089600 }
  ],
  "maxDevices": 3
}
```

### `session:<sessionId>` — pointer for `/success`

```json
{ "rawKeyHash": "<hex>", "signedKeyHash": "<hex>" }
```

### `signed:<sha256(signedLicenseToken)>` — pointer for app callers

```json
{ "rawKeyHash": "<hex>" }
```

**Both raw and signed license keys are stored only as SHA-256 hashes.** The
plaintext copies live exactly once: in the email sent at issue time. The app
keeps them in the macOS keychain. KV never holds plaintext.

The `maskedKey` field is computed at issue time as `tap_••••••••<last 4 chars
of raw key>` so `/session/:id` can render confirmation without ever holding
plaintext.

## Endpoint contracts

### `POST /webhook`

Replaces existing `/stripe-webhook` route (kept alive for one deploy cycle for
backwards compatibility, then removed).

Stripe HMAC verification unchanged from current implementation. On
`checkout.session.completed`:

1. Generate `rawLicenseKey` = `tap_` + 24-char Crockford base32 from
   `crypto.getRandomValues`.
2. Sign Ed25519 token over `email|issuedAt|rawLicenseKey` (changed from current
   `email|ts|sessionId` so the signed token is bound to the raw key, not the
   session).
3. Compute `rawKeyHash`, `signedKeyHash`, `maskedKey`.
4. KV writes (sequential):
   - `lic:<rawKeyHash>` → primary record (status `active`, empty activations).
   - `session:<sessionId>` → pointer.
   - `signed:<signedKeyHash>` → pointer.
5. `ctx.waitUntil(sendLicenseEmail(...))` — email contains both the raw key
   (for display/typing) and the signed token (for app activation).
6. Return `200 OK`.

**Idempotency:** if `session:<sessionId>` already exists, skip generation and
return `200`. Stripe retries are safe.

### `GET /session/:sessionId`

Public, called by the marketing site's `/success` page from the browser.

- Read `session:<sessionId>` → `rawKeyHash`. Read `lic:<rawKeyHash>`.
- Return `{ email, maskedKey, issuedAt, status }`.
- Never returns plaintext keys or hashes.
- `404` if not found (success page polls).
- CORS: `access-control-allow-origin: https://gettappit.com`.

### `POST /validate`

Body: `{ rawLicenseKey?: string, signedLicenseToken?: string, deviceId: string, email: string }`
(one of `rawLicenseKey` or `signedLicenseToken` required).

- Resolve to `rawKeyHash` (direct hash if `rawLicenseKey`, via `signed:` pointer
  if `signedLicenseToken`).
- Read `lic:<rawKeyHash>`. If not found → `404 { error: "unknown" }`.
- Verify `email` matches the record. If not → `403 { error: "email_mismatch" }`.
- If `status === "revoked"` → `200 { status: "revoked", ... }` (app handles
  grace period).
- Update matching activation's `lastSeenAt` (no-op if `deviceId` not in
  `activations` — `/validate` does not auto-activate).
- Write back if mutated.
- Return `200 { status: "active", maxDevices, activeDevices: activations.length }`.

### `POST /activate`

Body: `{ rawLicenseKey?: string, signedLicenseToken?: string, deviceId: string, email: string }`.

- Resolve and load record. Verify email.
- If `deviceId` already in `activations`, treat as re-activation: update
  `lastSeenAt`, write back, return `200 { status: "active", reactivated: true }`.
- Else if `activations.length < maxDevices`, append
  `{ deviceId, activatedAt: now, lastSeenAt: now }`, write back, return `200`.
- Else return `409 { error: "device_limit_reached", activeDevices: activations.length, maxDevices }`.

### Error shape

All endpoints return JSON with `{ error: "code", message: "human-readable" }`
on failure. Error codes are stable strings the app can branch on.

### CORS

- `/session/:id` allows origin `https://gettappit.com`, responds to `OPTIONS`.
- `/validate` and `/activate` set `access-control-allow-origin: *` for
  consistency. They are app-to-server (native macOS, no browser), so CORS is
  not a security boundary here.

## `/success` page

Static Next.js page at `src/app/success/page.tsx` with a client component
`src/app/success/SuccessClient.tsx` that holds the polling logic. The site is
statically exported; all logic runs client-side.

Flow:

1. Read `session_id` from `window.location.search`. If missing → show generic
   "Thanks for your purchase, check your email" fallback.
2. `fetch("https://license-issuer.<account>.workers.dev/session/" + sessionId)`.
3. If `404`, poll every 1.5s up to 8 attempts (~12s ceiling for webhook race).
4. On success, render:
   - "✓ Payment confirmed"
   - Email (from response).
   - License: masked key (e.g. `tap_••••••••3F2A`).
   - "Your full license key has been emailed to **user@example.com**. Check
     your inbox (and spam) — open the email on the Mac you want to activate."
   - Support link.
5. If still `404` after polling: "Your license is being issued. Check your
   email in a few minutes, or contact support if it doesn't arrive."

**Stripe Payment Link configuration** (manual, dashboard): success URL =
`https://gettappit.com/success?session_id={CHECKOUT_SESSION_ID}`.

## File layout

### `workers/license-issuer/` — refactored from single file

The current 200-line single-file worker has grown past comfortable; splitting
now keeps each handler under ~60 lines and isolates the KV/crypto seams.

- `src/index.ts` — request router (method + path → handler).
- `src/stripe.ts` — webhook signature verification (extracted from current
  file).
- `src/license.ts` — raw key generation, Ed25519 signing, hashing, masking.
- `src/kv.ts` — typed KV reads/writes for the three key schemas.
- `src/email.ts` — Resend send (extracted).
- `src/handlers/webhook.ts`, `session.ts`, `validate.ts`, `activate.ts` — one
  per endpoint.

### `workers/license-issuer/wrangler.toml` — add KV binding

```toml
[[kv_namespaces]]
binding = "LICENSES"
id = "<populated after `wrangler kv namespace create LICENSES`>"
```

### Marketing site

- `src/app/success/page.tsx` — new, server-export-safe shell.
- `src/app/success/SuccessClient.tsx` — new, client component with polling.

### Stripe dashboard (manual)

- Webhook URL: `…/stripe-webhook` → `…/webhook`. Worker keeps both alive for
  one deploy, then drops the old route.
- Payment Link success URL: `https://gettappit.com/success?session_id={CHECKOUT_SESSION_ID}`.

## Constants

- `MAX_DEVICES = 3`
- `SESSION_LOOKUP_POLL_INTERVAL_MS = 1500`
- `SESSION_LOOKUP_MAX_ATTEMPTS = 8`
- `KEY_PREFIX = "tap_"`, body = 24-char Crockford base32 random.
- `WEBHOOK_REPLAY_WINDOW_SEC = 300` (unchanged from current).

## Implementation phases

### Phase 1 — main implementation (this spec)

1. Refactor `workers/license-issuer/` into the file layout above with current
   `/stripe-webhook` behavior preserved (no functional change yet).
2. Add KV binding and `kv.ts` helpers.
3. Update webhook to generate raw key, write all three KV records, email both
   keys.
4. Add `/session/:id`, `/validate`, `/activate` handlers.
5. Add `/success` page on the marketing site.
6. Manual smoke test with `wrangler dev` + Stripe CLI
   (`stripe trigger checkout.session.completed`) and a real Stripe test
   checkout end-to-end.
7. Update Stripe dashboard webhook URL and Payment Link success URL.

### Phase 2 — automated tests (follow-up)

Deferred until Phase 1 is shipped and the API shape is settled. Planned scope:

- Unit tests for `license.ts` (key generation, signature roundtrip),
  `kv.ts` (key schema), `stripe.ts` (signature verification samples).
- Integration tests against `wrangler dev` covering the four endpoints and the
  webhook race for `/session/:id`.
- A small `success` page client-side test asserting the polling logic.

## Open questions

None remaining as of approval.
