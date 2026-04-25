import type { Env } from "../env";
import { sha256Hex } from "../license";
import { getLicense, getSignedPointer, putLicense, type Activation } from "../kv";
import { jsonResponse, errorResponse, preflight } from "./cors";

interface ActivateBody {
  rawLicenseKey?: string;
  signedLicenseToken?: string;
  deviceId?: string;
  email?: string;
}

export async function handleActivate(req: Request, env: Env): Promise<Response> {
  if (req.method === "OPTIONS") return preflight("wildcard");
  if (req.method !== "POST") {
    return errorResponse("method_not_allowed", "Use POST", 405, "wildcard");
  }

  let body: ActivateBody;
  try {
    body = (await req.json()) as ActivateBody;
  } catch {
    return errorResponse("bad_request", "Invalid JSON body", 400, "wildcard");
  }

  const { rawLicenseKey, signedLicenseToken, deviceId, email } = body;
  if (!deviceId || !email) {
    return errorResponse("bad_request", "deviceId and email are required", 400, "wildcard");
  }
  if (!rawLicenseKey && !signedLicenseToken) {
    return errorResponse(
      "bad_request",
      "rawLicenseKey or signedLicenseToken required",
      400,
      "wildcard",
    );
  }

  const rawKeyHash = await resolveRawKeyHash(env, rawLicenseKey, signedLicenseToken);
  if (!rawKeyHash) {
    return errorResponse("unknown", "License not found", 404, "wildcard");
  }

  const record = await getLicense(env.LICENSES, rawKeyHash);
  if (!record) {
    return errorResponse("unknown", "License not found", 404, "wildcard");
  }

  if (record.email !== email.toLowerCase().trim()) {
    return errorResponse("email_mismatch", "Email does not match license", 403, "wildcard");
  }

  if (record.status === "revoked") {
    return errorResponse("revoked", "License has been revoked", 403, "wildcard");
  }

  const now = Math.floor(Date.now() / 1000);
  const existing = record.activations.find((a) => a.deviceId === deviceId);
  if (existing) {
    existing.lastSeenAt = now;
    await putLicense(env.LICENSES, record);
    return jsonResponse(
      {
        status: "active",
        reactivated: true,
        maxDevices: record.maxDevices,
        activeDevices: record.activations.length,
      },
      200,
      "wildcard",
    );
  }

  if (record.activations.length >= record.maxDevices) {
    return jsonResponse(
      {
        error: "device_limit_reached",
        message: `License is already activated on ${record.maxDevices} devices`,
        activeDevices: record.activations.length,
        maxDevices: record.maxDevices,
      },
      409,
      "wildcard",
    );
  }

  const activation: Activation = { deviceId, activatedAt: now, lastSeenAt: now };
  record.activations.push(activation);
  await putLicense(env.LICENSES, record);

  return jsonResponse(
    {
      status: "active",
      reactivated: false,
      maxDevices: record.maxDevices,
      activeDevices: record.activations.length,
    },
    200,
    "wildcard",
  );
}

async function resolveRawKeyHash(
  env: Env,
  rawLicenseKey: string | undefined,
  signedLicenseToken: string | undefined,
): Promise<string | null> {
  if (rawLicenseKey) {
    return sha256Hex(rawLicenseKey);
  }
  if (signedLicenseToken) {
    const signedHash = await sha256Hex(signedLicenseToken);
    const pointer = await getSignedPointer(env.LICENSES, signedHash);
    return pointer?.rawKeyHash ?? null;
  }
  return null;
}
