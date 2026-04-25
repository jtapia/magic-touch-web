import type { Env } from "../env";
import { getLicense, putLicense, MAX_DEVICE_ID_LEN, MAX_EMAIL_LEN, MAX_KEY_LEN } from "../kv";
import { jsonResponse, errorResponse, preflight } from "./cors";
import { LicenseRequestBody, resolveRawKeyHash } from "./shared";

export async function handleValidate(req: Request, env: Env): Promise<Response> {
  if (req.method === "OPTIONS") return preflight("site");
  if (req.method !== "POST") {
    return errorResponse("method_not_allowed", "Use POST", 405, "site");
  }

  let body: LicenseRequestBody;
  try {
    body = (await req.json()) as LicenseRequestBody;
  } catch {
    return errorResponse("bad_request", "Invalid JSON body", 400, "site");
  }

  const { rawLicenseKey, signedLicenseToken, deviceId, email } = body;
  if (!deviceId || !email) {
    return errorResponse("bad_request", "deviceId and email are required", 400, "site");
  }
  if (deviceId.length > MAX_DEVICE_ID_LEN || email.length > MAX_EMAIL_LEN) {
    return errorResponse("bad_request", "Field exceeds maximum length", 400, "site");
  }
  if (
    (rawLicenseKey && rawLicenseKey.length > MAX_KEY_LEN) ||
    (signedLicenseToken && signedLicenseToken.length > MAX_KEY_LEN)
  ) {
    return errorResponse("bad_request", "Field exceeds maximum length", 400, "site");
  }
  if (!rawLicenseKey && !signedLicenseToken) {
    return errorResponse(
      "bad_request",
      "rawLicenseKey or signedLicenseToken required",
      400,
      "site",
    );
  }

  // Single generic error for not-found / email-mismatch to prevent
  // enumerating which license keys exist without knowing the buyer's email.
  const invalid = () =>
    errorResponse("invalid_credentials", "License not found or email mismatch", 404, "site");

  const rawKeyHash = await resolveRawKeyHash(env, rawLicenseKey, signedLicenseToken);
  if (!rawKeyHash) return invalid();

  const record = await getLicense(env.LICENSES, rawKeyHash);
  if (!record) return invalid();
  if (record.email !== email.toLowerCase().trim()) return invalid();

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
