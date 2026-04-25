import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";

// @noble/ed25519 v2 needs a synchronous SHA-512 implementation at startup.
ed.etc.sha512Sync = (...msgs) => sha512(ed.etc.concatBytes(...msgs));

export const KEY_PREFIX = "tap_";
const RAW_KEY_BODY_LEN = 24;
const CROCKFORD_BASE32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"; // no I L O U

export function generateRawLicenseKey(): string {
  const bytes = new Uint8Array(RAW_KEY_BODY_LEN);
  crypto.getRandomValues(bytes);
  let body = "";
  for (const b of bytes) body += CROCKFORD_BASE32[b % 32];
  return `${KEY_PREFIX}${body}`;
}

export interface SignedLicense {
  signedToken: string;     // <base64url(payload)>.<base64url(sig)>
  payload: string;         // email|issuedAt|rawLicenseKey
  issuedAt: number;        // unix seconds
}

export async function signLicense(
  email: string,
  rawLicenseKey: string,
  privateKeyB64: string,
): Promise<SignedLicense> {
  const seed = base64ToBytes(privateKeyB64);
  if (seed.length !== 32) {
    throw new Error(`Expected 32-byte Ed25519 seed, got ${seed.length} bytes`);
  }
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `${email}|${issuedAt}|${rawLicenseKey}`;
  const payloadBytes = new TextEncoder().encode(payload);
  const signature = await ed.signAsync(payloadBytes, seed);
  const signedToken = `${base64url(payloadBytes)}.${base64url(signature)}`;
  return { signedToken, payload, issuedAt };
}

export async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return bytesToHex(new Uint8Array(digest));
}

export function maskRawKey(rawKey: string): string {
  const body = rawKey.slice(KEY_PREFIX.length);
  const tail = body.slice(-4);
  return `${KEY_PREFIX}••••••••${tail}`;
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function base64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (const b of bytes) out += b.toString(16).padStart(2, "0");
  return out;
}
