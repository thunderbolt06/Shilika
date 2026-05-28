import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { persistGaRows, pullGaPageMetrics } from '@/lib/integrations/ga';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;

  return withRunLedger<Record<string, unknown>>('ga-daily-pull', async () => {
    if (!process.env.GA_SERVICE_ACCOUNT_JSON || !process.env.GA_PROPERTY_ID) {
      return {
        status: 'success',
        summary: { skipped: true, reason: 'GA env vars missing' },
      };
    }
    const rows = await pullGaPageMetrics(28);
    const persisted = await persistGaRows(rows);
    return {
      status: 'success',
      summary: { fetched: rows.length, persisted: persisted.written },
    };
  });
}
