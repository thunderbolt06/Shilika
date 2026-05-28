import 'server-only';
import { getAdminSupabase } from '@/lib/supabase/server';
import type { BlogPost } from '@/lib/supabase/types';
import { getGoogleAccessToken } from './google-auth';

const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';

function propertyId(): string {
  const p = process.env.GA_PROPERTY_ID;
  if (!p) throw new Error('GA_PROPERTY_ID is required (e.g. 123456789)');
  return p;
}

type RunReportResponse = {
  rows?: {
    dimensionValues?: { value: string }[];
    metricValues?: { value: string }[];
  }[];
};

export type GaPageRow = {
  page_path: string;
  date: string;
  sessions: number;
  engaged_sessions: number;
  avg_session_duration: number;
};

/**
 * Pull (pagePath × date) for the last `days` days. We map the resulting
 * rows back to blog_posts via slug = pagePath suffix.
 */
export async function pullGaPageMetrics(days = 28): Promise<GaPageRow[]> {
  const token = await getGoogleAccessToken(process.env.GA_SERVICE_ACCOUNT_JSON, SCOPE);

  const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId()}:runReport`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'date' }],
      metrics: [
        { name: 'sessions' },
        { name: 'engagedSessions' },
        { name: 'averageSessionDuration' },
      ],
      limit: 100000,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GA runReport failed: ${res.status} ${text}`);
  }

  const data: RunReportResponse = await res.json();
  return (data.rows ?? []).map((row) => {
    const [pagePath, dateStr] = (row.dimensionValues ?? []).map((v) => v.value);
    const [sessions, engaged, duration] = (row.metricValues ?? []).map((v) => Number(v.value || '0'));
    return {
      page_path: pagePath ?? '',
      date: `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`,
      sessions: Math.round(sessions),
      engaged_sessions: Math.round(engaged),
      avg_session_duration: Number(duration.toFixed(2)),
    };
  });
}

export async function persistGaRows(rows: GaPageRow[]): Promise<{ written: number }> {
  if (!rows.length) return { written: 0 };
  const supabase = getAdminSupabase();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, slug')
    .eq('published', true);
  const slugToId = new Map<string, string>();
  for (const p of (posts ?? []) as Pick<BlogPost, 'id' | 'slug'>[]) {
    slugToId.set(`/blog/${p.slug}`, p.id);
  }

  const payload = rows.map((r) => ({
    page_path: r.page_path,
    date: r.date,
    sessions: r.sessions,
    engaged_sessions: r.engaged_sessions,
    avg_session_duration: r.avg_session_duration,
    post_id: slugToId.get(r.page_path) ?? null,
  }));

  let written = 0;
  for (let i = 0; i < payload.length; i += 1000) {
    const chunk = payload.slice(i, i + 1000);
    const { error } = await supabase.from('content_metrics').upsert(chunk, {
      onConflict: 'page_path,date',
    });
    if (error) throw new Error(`GA upsert failed at chunk ${i}: ${error.message}`);
    written += chunk.length;
  }
  return { written };
}
