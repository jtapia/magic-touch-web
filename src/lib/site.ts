export const STRIPE_LINK =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#pricing";

export const DOWNLOAD_URL: string | null =
  process.env.NEXT_PUBLIC_DOWNLOAD_URL || null;

export const isExternalStripeLink = STRIPE_LINK.startsWith("http");
