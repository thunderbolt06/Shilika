// Web Crypto only — this module runs in both the Node runtime (route handlers)
// and the Edge runtime (middleware).

const COOKIE_NAME = 'shilika_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const HEX = '0123456789abcdef';

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set to a string of at least 32 characters');
  }
  return s;
}

function bytesToHex(buf: ArrayBuffer): string {
  const arr = new Uint8Array(buf);
  let out = '';
  for (let i = 0; i < arr.length; i++) {
    out += HEX[arr[i] >> 4] + HEX[arr[i] & 0x0f];
  }
  return out;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
}

async function sign(payload: string): Promise<string> {
  const key = await importKey(getSecret());
  const buf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return bytesToHex(buf);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export type AdminSession = { issued: number; expires: number };

export async function issueSessionToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload = `${now}.${now + SESSION_TTL_SECONDS}`;
  const sig = await sign(payload);
  return `${payload}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<AdminSession | null> {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [issuedStr, expiresStr, sig] = parts;
  const expected = await sign(`${issuedStr}.${expiresStr}`);
  if (!constantTimeEqual(sig, expected)) return null;
  const issued = Number(issuedStr);
  const expires = Number(expiresStr);
  if (!Number.isFinite(issued) || !Number.isFinite(expires)) return null;
  if (Math.floor(Date.now() / 1000) > expires) return null;
  return { issued, expires };
}

export function checkAdminPassword(input: string | null | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 12) {
    throw new Error('ADMIN_PASSWORD must be set to a string of at least 12 characters');
  }
  if (!input) return false;
  return constantTimeEqual(input, expected);
}

export const ADMIN_COOKIE = COOKIE_NAME;
export const ADMIN_TTL = SESSION_TTL_SECONDS;
