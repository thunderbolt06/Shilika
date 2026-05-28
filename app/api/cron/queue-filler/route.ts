import { requireCronAuth, withRunLedger } from '@/lib/cron-auth';
import { runTopicResearch } from '@/lib/agents/topic-research';

export const runtime = 'nodejs';
export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const unauthorized = requireCronAuth(request);
  if (unauthorized) return unauthorized;
  return withRunLedger<Record<string, unknown>>('queue-filler', async () => {
    const url = new URL(request.url);
    const force = url.searchParams.get('force') === '1';
    const summary = await runTopicResearch({ force });
    return { status: 'success', summary: summary as unknown as Record<string, unknown> };
  });
}
