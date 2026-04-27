import type { Env } from "../env";
import { getLicense, putLicense } from "../kv";
import { jsonResponse, errorResponse, preflight } from "./cors";
import { parseLicenseBody, resolveRawKeyHash } from "./shared";

export async function handleValidate(req: Request, env: Env): Promise<Response> {
  if (req.method === "OPTIONS") return preflight("site");
  if (req.method !== "POST") {
    return errorResponse("method_not_allowed", "Use POST", 405, "site");
  }

  const parsed = await parseLicenseBody(req);
  if (parsed instanceof Response) return parsed;
  const { rawLicenseKey, signedLicenseToken, deviceId, email } = parsed;

  // Single generic error for not-found / email-mismatch to prevent
  // enumerating which license keys exist without knowing the buyer's email.
  const invalid = () =>
    errorResponse("invalid_credentials", "License not found or email mismatch", 404, "site");

  const rawKeyHash = await resolveRawKeyHash(env, rawLicenseKey, signedLicenseToken);
  if (!rawKeyHash) return invalid();

  const record = await getLicense(env.LICENSES, rawKeyHash);
  if (!record) return invalid();
  if (record.email !== email) return invalid();

  if (record.status === "revoked") {
    return jsonResponse(
      {
        status: "revoked",
        maxDevices: record.maxDevices,
        activeDevices: record.activations.length,
      },
      200,
      "site",
    );
  }

  // Update lastSeenAt for the calling device if it's already activated.
  // /validate does not auto-activate; that's /activate's job.
  const now = Math.floor(Date.now() / 1000);
  const activation = record.activations.find((a) => a.deviceId === deviceId);
  if (activation) {
    activation.lastSeenAt = now;
    await putLicense(env.LICENSES, record);
  }

  return jsonResponse(
    {
      status: "active",
      maxDevices: record.maxDevices,
      activeDevices: record.activations.length,
      deviceActivated: activation !== undefined,
    },
    200,
    "wildcard",
  );
}
