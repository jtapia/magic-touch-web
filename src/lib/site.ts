export const STRIPE_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#pricing";

export const DOWNLOAD_URL: string | null =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL || null;

export const isExternalStripeLink = STRIPE_LINK.startsWith("http");

// Product Hunt: set PH_PRODUCT_URL after launch (e.g. https://www.producthunt.com/products/tappit).
// Set PH_UPCOMING_URL before launch to point at your Upcoming page.
// Only one should be set at a time — post-launch wins if both are present.
export const PH_PRODUCT_URL: string | null =
  process.env.NEXT_PUBLIC_PH_PRODUCT_URL || null;
export const PH_UPCOMING_URL: string | null =
  process.env.NEXT_PUBLIC_PH_UPCOMING_URL || null;

