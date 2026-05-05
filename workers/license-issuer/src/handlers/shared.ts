import type { Env } from "../env";
import { sha256Hex } from "../license";
import { getSignedPointer, MAX_DEVICE_ID_LEN, MAX_EMAIL_LEN, MAX_KEY_LEN } from "../kv";
import { errorResponse } from "./cors";

interface LicenseRequestBody {
  rawLicenseKey?: string;
  signedLicenseToken?: string;
  deviceId?: string;
  email?: string;
}

export type ParsedLicenseBody = Required<Pick<LicenseRequestBody, "deviceId" | "email">> &
  Pick<LicenseRequestBody, "rawLicenseKey" | "signedLicenseToken">;

export async function parseLicenseBody(
  req: Request,
): Promise<ParsedLicenseBody | Response> {
  let body: LicenseRequestBody;
  try {
    body = (await req.json()) as LicenseRequestBody;
  } catch {
    return errorResponse("bad_request", "Invalid JSON body", 400, "site");
  }
  const { rawLicenseKey, signedLicenseToken, deviceId, email } = body;
  if (!deviceId || !email)
    return errorResponse("bad_request", "deviceId and email are required", 400, "site");
  if (deviceId.length > MAX_DEVICE_ID_LEN || email.length > MAX_EMAIL_LEN)
    return errorResponse("bad_request", "Field exceeds maximum length", 400, "site");
  if (
    (rawLicenseKey && rawLicenseKey.length > MAX_KEY_LEN) ||
    (signedLicenseToken && signedLicenseToken.length > MAX_KEY_LEN)
  )
    return errorResponse("bad_request", "Field exceeds maximum length", 400, "site");
  if (!rawLicenseKey && !signedLicenseToken)
    return errorResponse("bad_request", "rawLicenseKey or signedLicenseToken required", 400, "site");
  return {
    rawLicenseKey,
    signedLicenseToken,
    deviceId,
    email: email.toLowerCase().trim(),
  };
}

export async function resolveRawKeyHash(
  env: Env,
  rawLicenseKey: string | undefined,
  signedLicenseToken: string | undefined,
): Promise<string | null> {
  if (rawLicenseKey) return sha256Hex(rawLicenseKey);
  if (signedLicenseToken) {
    const signedHash = await sha256Hex(signedLicenseToken);
    const pointer = await getSignedPointer(env.LICENSES, signedHash);
    return pointer?.rawKeyHash ?? null;
  }
  return null;
}
