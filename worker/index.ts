interface Env {
  ASSETS: Fetcher;
  /** "waitlist" | "on-sale" | "placeholder" */
  CTA_MODE?: string;
  WAITLIST_URL?: string;
  PURCHASE_URL?: string;
}

export type CtaMode = "waitlist" | "on-sale" | "placeholder";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/cta") {
      const raw = env.CTA_MODE ?? "on-sale";
      const mode: CtaMode =
        raw === "waitlist" ? "waitlist" : raw === "placeholder" ? "placeholder" : "on-sale";

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
    }

    return env.ASSETS.fetch(request);
  },
};
