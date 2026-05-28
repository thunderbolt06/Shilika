import 'server-only';
import { getAdminSupabase } from '@/lib/supabase/server';
import { getGoogleAccessToken } from './google-auth';

const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

type SearchAnalyticsRow = {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type SearchAnalyticsResponse = {
  rows?: SearchAnalyticsRow[];
};

function siteUrl(): string {
  const url = process.env.GSC_SITE_URL;
  if (!url) throw new Error('GSC_SITE_URL is required (e.g. sc-domain:shilikajain.com)');
  return url;
}

export type GscQueryRow = {
  query: string;
  page: string | null;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  date: string;
};

/**
 * Pull the last `days` days of (query, page, date) rows from Search Console.
 * Default is 28 days to match the GSC UI default.
 */
export async function pullSearchConsole(days = 28): Promise<GscQueryRow[]> {
  const token = await getGoogleAccessToken(process.env.GSC_SERVICE_ACCOUNT_JSON, SCOPE);

  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl())}/searchAnalytics/query`;

  const today = new Date();
  const startDate = new Date(today);
  startDate.setUTCDate(startDate.getUTCDate() - days);
  const startStr = startDate.toISOString().slice(0, 10);
  const endStr = today.toISOString().slice(0, 10);

  const all: GscQueryRow[] = [];
  let startRow = 0;
  const rowLimit = 2500;

  // Paginate until we have everything or hit a safe cap.
  for (let i = 0; i < 10; i++) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startStr,
        endDate: endStr,
        dimensions: ['query', 'page', 'date'],
        rowLimit,
        startRow,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`GSC query failed: ${res.status} ${text}`);
    }
    const data: SearchAnalyticsResponse = await res.json();
    const rows = data.rows ?? [];
    for (const r of rows) {
      const [query, page, date] = r.keys ?? [];
      if (!query || !date) continue;
      all.push({
        query,
        page: page ?? null,
        clicks: Math.round(r.clicks),
        impressions: Math.round(r.impressions),
        ctr: Number(r.ctr.toFixed(4)),
        position: Number(r.position.toFixed(2)),
        date,
      });
    }
    if (rows.length < rowLimit) break;
    startRow += rowLimit;
  }

  return all;
}

/**
 * Upsert GSC rows into analytics_search_console. The primary key is
 * (query, page, date) so reruns are idempotent.
 */
export async function persistGscRows(rows: GscQueryRow[]): Promise<{ written: number }> {
  if (!rows.length) return { written: 0 };
  const supabase = getAdminSupabase();
  const payload = rows.map((r) => ({
    query: r.query,
    page: r.page,
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: r.ctr,
    avg_position: r.position,
    date: r.date,
  }));
  // Upsert in chunks of 1000 to keep the SQL command size reasonable.
  let written = 0;
  for (let i = 0; i < payload.length; i += 1000) {
    const chunk = payload.slice(i, i + 1000);
    const { error } = await supabase.from('analytics_search_console').upsert(chunk, {
      onConflict: 'query,page,date',
    });
    if (error) throw new Error(`GSC upsert failed at chunk ${i}: ${error.message}`);
    written += chunk.length;
  }
  return { written };
}

/**
 * Opportunity query: ranked but not earning clicks. These are the highest
 * leverage candidates for the topic-research agent.
 *
 * Default heuristic: impressions >= 50 over the last 28 days,
 * position between 4 and 30, CTR < 2%.
 */
export async function gscOpportunityQueries(): Promise<
  { query: string; page: string | null; impressions: number; ctr: number; position: number }[]
> {
  const supabase = getAdminSupabase();
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - 28);
  const sinceStr = since.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from('analytics_search_console')
    .select('query, page, impressions, clicks, ctr, avg_position')
    .gte('date', sinceStr)
    .gte('impressions', 50)
    .gte('avg_position', 4)
    .lte('avg_position', 30)
    .lt('ctr', 0.02);
  if (error) throw error;

  // Aggregate by query across the date range so we don't pick a query 28 times.
  const byQuery = new Map<
    string,
    { query: string; page: string | null; impressions: number; ctr: number; position: number; n: number }
  >();
  for (const row of data ?? []) {
    const key = `${row.query}::${row.page ?? ''}`;
    const cur = byQuery.get(key) ?? {
      query: row.query,
      page: row.page ?? null,
      impressions: 0,
      ctr: 0,
      position: 0,
      n: 0,
    };
    cur.impressions += row.impressions ?? 0;
    cur.ctr += Number(row.ctr ?? 0);
    cur.position += Number(row.avg_position ?? 0);
    cur.n += 1;
    byQuery.set(key, cur);
  }
  return [...byQuery.values()]
    .map((r) => ({
      query: r.query,
      page: r.page,
      impressions: r.impressions,
      ctr: r.ctr / r.n,
      position: r.position / r.n,
    }))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 50);
}
