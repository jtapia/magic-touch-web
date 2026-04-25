export interface Activation {
  deviceId: string;
  activatedAt: number;
  lastSeenAt: number;
}

export type LicenseStatus = "active" | "revoked";

export interface LicenseRecord {
  email: string;
  sessionId: string;
  rawKeyHash: string;
  signedKeyHash: string;
  maskedKey: string;
  issuedAt: number;
  status: LicenseStatus;
  activations: Activation[];
  maxDevices: number;
}

export interface SessionPointer {
  rawKeyHash: string;
  signedKeyHash: string;
}

export interface SignedPointer {
  rawKeyHash: string;
}

export const MAX_DEVICES = 3;

const licKey = (rawKeyHash: string) => `lic:${rawKeyHash}`;
const sessionKey = (sessionId: string) => `session:${sessionId}`;
const signedKey = (signedKeyHash: string) => `signed:${signedKeyHash}`;

export async function getLicense(
  kv: KVNamespace,
  rawKeyHash: string,
): Promise<LicenseRecord | null> {
  return kv.get<LicenseRecord>(licKey(rawKeyHash), "json");
}

export async function putLicense(
  kv: KVNamespace,
  record: LicenseRecord,
): Promise<void> {
  await kv.put(licKey(record.rawKeyHash), JSON.stringify(record));
}

export async function getSessionPointer(
  kv: KVNamespace,
  sessionId: string,
): Promise<SessionPointer | null> {
  return kv.get<SessionPointer>(sessionKey(sessionId), "json");
}

export async function putSessionPointer(
  kv: KVNamespace,
  sessionId: string,
  pointer: SessionPointer,
): Promise<void> {
  await kv.put(sessionKey(sessionId), JSON.stringify(pointer));
}

export async function getSignedPointer(
  kv: KVNamespace,
  signedKeyHash: string,
): Promise<SignedPointer | null> {
  return kv.get<SignedPointer>(signedKey(signedKeyHash), "json");
}

export async function putSignedPointer(
  kv: KVNamespace,
  signedKeyHash: string,
  pointer: SignedPointer,
): Promise<void> {
  await kv.put(signedKey(signedKeyHash), JSON.stringify(pointer));
}
