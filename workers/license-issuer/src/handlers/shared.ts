import type { Env } from "../env";
import { sha256Hex } from "../license";
import { getSignedPointer } from "../kv";

export interface LicenseRequestBody {
  rawLicenseKey?: string;
  signedLicenseToken?: string;
  deviceId?: string;
  email?: string;
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
