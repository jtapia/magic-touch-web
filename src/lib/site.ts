export const STRIPE_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#pricing";

export const DOWNLOAD_URL: string | null =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL || null;

export const isExternalStripeLink = STRIPE_LINK.startsWith("http");

export const TRIAL_ENABLED: boolean =
  process.env.NEXT_PUBLIC_TRIAL_PERIOD_ENABLED !== "false";

// Product Hunt: set PH_PRODUCT_URL after launch (e.g. https://www.producthunt.com/products/tappit).
// Set PH_UPCOMING_URL before launch to point at your Upcoming page.
// Only one should be set at a time — post-launch wins if both are present.
export const PH_PRODUCT_URL: string | null =
  process.env.NEXT_PUBLIC_PH_PRODUCT_URL || null;
export const PH_UPCOMING_URL: string | null =
  process.env.NEXT_PUBLIC_PH_UPCOMING_URL || null;

// Waitlist: submission endpoint. Leave unset to hide the form.
// Supports any endpoint that accepts POST JSON {"email": "..."} (Formspree,
// Buttondown, Resend Audiences, a custom Cloudflare Worker, etc).
export const WAITLIST_ENDPOINT: string | null =
  process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT || null;

// Launch mode derives from the env. Precedence:
//   download available  -> "launched"  (show Try Free CTA)
//   waitlist available  -> "waitlist"  (show email capture)
//   neither             -> "soon"      (show pricing-anchor CTA)
export type LaunchMode = "launched" | "waitlist" | "soon";
export const launchMode: LaunchMode = DOWNLOAD_URL
  ? "launched"
  : WAITLIST_ENDPOINT
  ? "waitlist"
  : "soon";
