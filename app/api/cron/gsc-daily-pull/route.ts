import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { persistGscRows, pullSearchConsole } from '@/lib/integrations/gsc';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;

  return withRunLedger<Record<string, unknown>>('gsc-daily-pull', async () => {
    if (!process.env.GSC_SERVICE_ACCOUNT_JSON || !process.env.GSC_SITE_URL) {
      return {
        status: 'success',
        summary: { skipped: true, reason: 'GSC env vars missing' },
      };
    }
    const rows = await pullSearchConsole(28);
    const persisted = await persistGscRows(rows);
    return {
      status: 'success',
      summary: { fetched: rows.length, persisted: persisted.written },
    };
  });
}
