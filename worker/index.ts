interface Env {
  ASSETS: Fetcher;
  PURCHASE_URL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/cta") {
      const href = env.PURCHASE_URL ?? "/#pricing";
      return Response.json(
        { href },
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
