import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { pollAndProcessBatches } from '@/lib/agents/batch-pipeline';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

/**
 * Drives the async half of the LLM pipeline: checks every pending Anthropic
 * batch, finalizes the completed ones (writer → draft + hero image;
 * topic-research → inserted ideas), and leaves still-processing batches for the
 * next run. Runs hourly — Anthropic batches usually finish within the hour.
 */
export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;

  return withRunLedger<Record<string, unknown>>('batch-poller', async () => {
    const result = await pollAndProcessBatches();
    const anyFailed = result.outcomes.some((o) => o.status === 'failed');
    return {
      status: anyFailed ? 'partial' : 'success',
      summary: result as unknown as Record<string, unknown>,
    };
  });
}
