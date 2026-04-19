interface Env {
  CTA_MODE?: string;
  WAITLIST_URL?: string;
  PURCHASE_URL?: string;
}

export const onRequest: PagesFunction<Env> = ({ env }) => {
  const mode = env.CTA_MODE === "waitlist" ? "waitlist" : "purchase";
  const waitlistUrl = env.WAITLIST_URL ?? "";
  const purchaseUrl = env.PURCHASE_URL ?? "#pricing";
  const href = mode === "waitlist" && waitlistUrl ? waitlistUrl : purchaseUrl;

  return Response.json(
    { mode, href, waitlistUrl, purchaseUrl },
    {
      headers: {
        "cache-control": "public, max-age=60, s-maxage=60",
        "access-control-allow-origin": "*",
      },
    },
  );
};
