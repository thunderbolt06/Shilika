import 'server-only';
import { SignJWT, importPKCS8 } from 'jose';

type ServiceAccount = {
  client_email: string;
  private_key: string;
  token_uri?: string;
};

function parseServiceAccountJson(envValue: string | undefined): ServiceAccount {
  if (!envValue) {
    throw new Error('Service account JSON env var is missing');
  }
  try {
    const json = JSON.parse(envValue);
    if (!json.client_email || !json.private_key) {
      throw new Error('Service account JSON missing client_email or private_key');
    }
    return json as ServiceAccount;
  } catch (err) {
    throw new Error(`Service account JSON malformed: ${err instanceof Error ? err.message : err}`);
  }
}

const tokenCache = new Map<string, { token: string; expiresAt: number }>();

/**
 * Exchange a Google service-account JWT for an OAuth access token, cached
 * until 60s before expiry. Works in Node and Edge runtimes (jose is universal).
 */
export async function getGoogleAccessToken(
  envValue: string | undefined,
  scope: string,
): Promise<string> {
  const sa = parseServiceAccountJson(envValue);
  const cacheKey = `${sa.client_email}:${scope}`;
  const now = Math.floor(Date.now() / 1000);

  const cached = tokenCache.get(cacheKey);
  if (cached && cached.expiresAt - now > 60) return cached.token;

  const tokenUri = sa.token_uri ?? 'https://oauth2.googleapis.com/token';
  const privateKey = await importPKCS8(sa.private_key, 'RS256');

  const assertion = await new SignJWT({ scope })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuer(sa.client_email)
    .setSubject(sa.client_email)
    .setAudience(tokenUri)
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(privateKey);

  const res = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google token exchange failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  tokenCache.set(cacheKey, {
    token: data.access_token,
    expiresAt: now + data.expires_in,
  });
  return data.access_token;
}
