import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminSupabase } from '@/lib/supabase/server';
import { CronTriggerButton } from './CronTriggerButton';

export const dynamic = 'force-dynamic';

const CRONS: { name: string; schedule: string; description: string }[] = [
  {
    name: 'gsc-daily-pull',
    schedule: '04:00 UTC daily',
    description: 'Search Console 28-day rollup into analytics_search_console.',
  },
  {
    name: 'ga-daily-pull',
    schedule: '04:30 UTC daily',
    description: 'GA4 pagePath × date metrics into content_metrics.',
  },
  {
    name: 'queue-filler',
    schedule: '05:00 UTC daily',
    description: 'Topic-research agent. Reads GSC opportunities + long-tail seeds, proposes ideas.',
  },
  {
    name: 'daily-writer',
    schedule: '05:30 UTC daily',
    description: 'Picks the top P0/P1 idea, runs writer + image gen, marks ready_for_review.',
  },
  {
    name: 'hourly-publisher',
    schedule: 'top of every hour',
    description: 'Picks approved drafts, upserts blog_posts, revalidates paths.',
  },
  {
    name: 'cross-poster',
    schedule: '30 past every hour',
    description: 'Republishes new posts to dev.to / Hashnode / Medium with canonical Link.',
  },
  {
    name: 'seo-content-analysis',
    schedule: '06:00 UTC Sundays',
    description: 'Joins GSC + GA into a weekly brief, saved as a knowledge_base row.',
  },
];

type Run = {
  id: number;
  name: string;
  started_at: string;
  finished_at: string | null;
  status: 'success' | 'partial' | 'error';
  summary: Record<string, unknown> | null;
  error: string | null;
};

async function lastRuns(): Promise<Record<string, Run | null>> {
  try {
    const supabase = getAdminSupabase();
    const { data } = await supabase
      .from('cron_runs')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(100);
    const byName: Record<string, Run | null> = {};
    for (const c of CRONS) byName[c.name] = null;
    for (const r of (data ?? []) as Run[]) {
      if (!byName[r.name]) byName[r.name] = r;
    }
    return byName;
  } catch {
    return Object.fromEntries(CRONS.map((c) => [c.name, null]));
  }
}

const STATUS_TONE: Record<Run['status'], string> = {
  success: 'bg-ink/10 text-ink',
  partial: 'bg-rust/30 text-rust',
  error: 'bg-rust text-cream',
};

export default async function CronPage() {
  const runs = await lastRuns();
  return (
    <AdminShell current="/admin/cron">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Crons</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Pipeline schedule
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Cron triggers managed by Vercel Cron. Each row writes to{' '}
          <code className="rounded bg-ink/5 px-1.5">cron_runs</code> for visibility. Manual fire
          uses the same path with admin auth.
        </p>
      </div>

      <ul className="mt-10 space-y-4">
        {CRONS.map((c) => {
          const last = runs[c.name];
          return (
            <li key={c.name} className="rounded-2xl border border-ink/10 bg-paper p-5">
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-1">
                  <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
                    {c.schedule}
                  </p>
                  <p className="mt-1 font-serif text-2xl tracking-tight">{c.name}</p>
                  <p className="mt-1 text-sm text-ink/70">{c.description}</p>
                  {last ? (
                    <div className="mt-3 space-y-1">
                      <p className="font-mono text-xs text-ink/60">
                        Last run{' '}
                        <span
                          className={`ml-2 rounded-full px-2 py-0.5 ${STATUS_TONE[last.status]}`}
                        >
                          {last.status}
                        </span>{' '}
                        at {new Date(last.started_at).toLocaleString()}
                      </p>
                      {last.error && (
                        <p className="font-mono text-xs text-rust">{last.error}</p>
                      )}
                      {last.summary && (
                        <pre className="overflow-x-auto rounded bg-ink/5 p-2 font-mono text-[11px] leading-snug text-ink">
                          {JSON.stringify(last.summary, null, 2)}
                        </pre>
                      )}
                    </div>
                  ) : (
                    <p className="mt-3 font-mono text-xs text-ink/40">No runs recorded yet.</p>
                  )}
                </div>
                <CronTriggerButton name={c.name} />
              </div>
            </li>
          );
        })}
      </ul>
    </AdminShell>
  );
}
