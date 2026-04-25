const SITE_ORIGIN = "https://gettappit.com";

export type CorsMode = "site" | "wildcard";

export function corsHeaders(mode: CorsMode): Record<string, string> {
  const origin = mode === "site" ? SITE_ORIGIN : "*";
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
  };
}

export function preflight(mode: CorsMode): Response {
  return new Response(null, { status: 204, headers: corsHeaders(mode) });
}

export function jsonResponse(
  body: unknown,
  status: number,
  mode: CorsMode,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      ...corsHeaders(mode),
      ...extraHeaders,
    },
  });
}

export function errorResponse(
  code: string,
  message: string,
  status: number,
  mode: CorsMode,
): Response {
  return jsonResponse({ error: code, message }, status, mode);
}
