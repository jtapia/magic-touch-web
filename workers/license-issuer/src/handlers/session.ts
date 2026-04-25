import type { Env } from "../env";
import { getSessionPointer, getLicense } from "../kv";
import { jsonResponse, errorResponse, preflight } from "./cors";

export async function handleSession(
  req: Request,
  env: Env,
  sessionId: string,
): Promise<Response> {
  if (req.method === "OPTIONS") return preflight("site");
  if (req.method !== "GET") {
    return errorResponse("method_not_allowed", "Use GET", 405, "site");
  }

  const pointer = await getSessionPointer(env.LICENSES, sessionId);
  if (!pointer) {
    return errorResponse("not_found", "License not yet issued", 404, "site");
  }

  const record = await getLicense(env.LICENSES, pointer.rawKeyHash);
  if (!record) {
    // Pointer without primary — corrupt state. Treat as not found.
    return errorResponse("not_found", "License record missing", 404, "site");
  }

  return jsonResponse(
    {
      email: record.email,
      maskedKey: record.maskedKey,
      issuedAt: record.issuedAt,
      status: record.status,
    },
    200,
    "site",
  );
}
