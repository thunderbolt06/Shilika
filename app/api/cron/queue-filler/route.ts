import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { submitTopicResearch } from '@/lib/agents/topic-research';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

/**
 * Submit topic research as an async Anthropic batch (or seed raw queries inline
 * when no LLM is configured). Candidate ideas are inserted later by
 * /api/cron/batch-poller once the batch completes.
 */
export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;
  return withRunLedger<Record<string, unknown>>('queue-filler', async () => {
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === '1';
    const result = await submitTopicResearch({ force });
    return { status: 'success', summary: result as unknown as Record<string, unknown> };
  });
}
