import 'server-only';

export type RetryOptions = {
  retries?: number;
  baseMs?: number;
  maxMs?: number;
  label?: string;
};

const RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504, 529]);

function isRetryableError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as Record<string, unknown>;

  const status =
    (typeof e.status === 'number' && e.status) ||
    (typeof e.statusCode === 'number' && e.statusCode) ||
    (typeof (e.response as { status?: number } | undefined)?.status === 'number' &&
      (e.response as { status: number }).status) ||
    0;
  if (status && RETRYABLE_STATUS.has(status)) return true;

  const msg = typeof e.message === 'string' ? e.message : '';
  if (/\b(429|500|502|503|504|529)\b/.test(msg)) return true;
  if (
    /overloaded|unavailable|temporarily|rate.?limit|timeout|fetch failed|network|socket hang up|ECONNRESET|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|UND_ERR/i.test(
      msg,
    )
  ) {
    return true;
  }

  // Node undici wraps the underlying error in `.cause` and surfaces only
  // "fetch failed" at the top level — classify by error code on the cause.
  const code = typeof e.code === 'string' ? e.code : '';
  if (/^(ECONNRESET|ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|UND_ERR_SOCKET|UND_ERR_CONNECT_TIMEOUT)$/i.test(code)) {
    return true;
  }
  if (typeof e.name === 'string' && /AbortError|TimeoutError/i.test(e.name)) return true;

  const cause = (e.cause as unknown) ?? null;
  if (cause && cause !== err) return isRetryableError(cause);

  return false;
}

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const retries = opts.retries ?? 5;
  const baseMs = opts.baseMs ?? 1000;
  const maxMs = opts.maxMs ?? 30_000;
  const label = opts.label ?? 'retry';

  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === retries || !isRetryableError(err)) throw err;
      const exp = Math.min(maxMs, baseMs * 2 ** attempt);
      const jitter = Math.random() * exp * 0.3;
      const delay = Math.floor(exp + jitter);
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[${label}] attempt ${attempt + 1}/${retries + 1} failed (${msg.slice(0, 140)}); retrying in ${delay}ms`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}
