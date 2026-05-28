import { NextResponse } from 'next/server';

/**
 * Vercel Cron and our manual triggers both authenticate with
 * `Authorization: Bearer ${CRON_SECRET}`.
 *
 * Vercel Cron also sets `User-Agent: vercel-cron/1.0`. We accept both
 * the explicit header and the runtime UA.
 */
export function requireCronAuth(request: Request): NextResponse | null {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: 'CRON_SECRET not configured on the server' },
      { status: 500 },
    );
  }
  const header = request.headers.get('authorization');
  if (header && header === `Bearer ${expected}`) return null;

  // Vercel Cron requests carry the secret in the same header automatically;
  // if it didn't, fall through to 401.
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

export type CronRun = {
  started_at: string;
  finished_at: string;
  status: 'success' | 'partial' | 'error';
  summary: Record<string, unknown> | null;
  error: string | null;
};

import { getAdminSupabase } from './supabase/server';

export async function recordCronRun(name: string, run: CronRun): Promise<void> {
  try {
    const supabase = getAdminSupabase();
    await supabase.from('cron_runs').insert({
      name,
      started_at: run.started_at,
      finished_at: run.finished_at,
      status: run.status,
      summary: run.summary,
      error: run.error,
    });
  } catch (err) {
    console.warn('[cron] failed to record run:', err);
  }
}

export type Runner<T> = () => Promise<{ status: 'success' | 'partial'; summary: T }>;

export async function withRunLedger<T extends Record<string, unknown>>(
  name: string,
  runner: Runner<T>,
): Promise<NextResponse> {
  const startedAt = new Date().toISOString();
  try {
    const { status, summary } = await runner();
    const finishedAt = new Date().toISOString();
    await recordCronRun(name, {
      started_at: startedAt,
      finished_at: finishedAt,
      status,
      summary,
      error: null,
    });
    return NextResponse.json({ ok: true, status, summary });
  } catch (err) {
    const finishedAt = new Date().toISOString();
    const message = err instanceof Error ? err.message : String(err);
    await recordCronRun(name, {
      started_at: startedAt,
      finished_at: finishedAt,
      status: 'error',
      summary: null,
      error: message,
    });
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
