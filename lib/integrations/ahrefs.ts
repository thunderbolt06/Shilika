import 'server-only';

/**
 * Ahrefs v3 Keywords Explorer integration. Optional — enabled when
 * AHREFS_API_KEY is configured.
 *
 *   AHREFS_API_KEY=... (read-only Ahrefs API token)
 *   AHREFS_COUNTRY=us (default), or any ISO country code
 *
 * We only call the read endpoints that the topic-research agent needs:
 *   - keywords-explorer/overview: volume, difficulty, traffic-potential,
 *     parent topic per seed
 *   - keywords-explorer/matching-terms: long-tail expansions for a seed
 */

const API_BASE = 'https://api.ahrefs.com/v3';

type OverviewResponse = {
  keywords?: {
    keyword: string;
    country: string;
    volume?: number;
    difficulty?: number;
    cpc?: number;
    clicks?: number;
    traffic_potential?: number;
    parent_topic?: { keyword: string; volume?: number };
  }[];
};

type MatchingTermsResponse = {
  keywords?: {
    keyword: string;
    volume?: number;
    difficulty?: number;
    parent_topic?: { keyword: string };
  }[];
};

export type AhrefsOverview = {
  keyword: string;
  volume: number | null;
  difficulty: number | null;
  cpc: number | null;
  traffic_potential: number | null;
  parent_topic: string | null;
};

export type AhrefsMatchingTerm = {
  keyword: string;
  volume: number | null;
  difficulty: number | null;
  parent_topic: string | null;
};

let unauthorized = false;

export function ahrefsEnabled(): boolean {
  // Ahrefs is disabled — no API access yet.
  return false;
}

function country(): string {
  return (process.env.AHREFS_COUNTRY || 'us').toLowerCase();
}

async function ahrefsGet<T>(path: string, params: Record<string, string>): Promise<T> {
  if (!process.env.AHREFS_API_KEY) {
    throw new Error('AHREFS_API_KEY not configured');
  }
  const url = new URL(`${API_BASE}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.AHREFS_API_KEY}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 401 || res.status === 403) {
      unauthorized = true;
      console.warn(`[ahrefs] ${res.status} unauthorized — disabling Ahrefs for this process`);
      throw new Error(`Ahrefs ${path} ${res.status}: unauthorized`);
    }
    throw new Error(`Ahrefs ${path} ${res.status}: ${text.slice(0, 240)}`);
  }
  return (await res.json()) as T;
}

/**
 * Overview for up to 100 keywords in a single call.
 */
export async function ahrefsOverview(keywords: string[]): Promise<AhrefsOverview[]> {
  if (!keywords.length) return [];
  const trimmed = keywords.slice(0, 100);
  const data = await ahrefsGet<OverviewResponse>('/keywords-explorer/overview', {
    keywords: trimmed.join('\n'),
    country: country(),
    search_engine: 'google',
  });
  return (data.keywords ?? []).map((k) => ({
    keyword: k.keyword,
    volume: k.volume ?? null,
    difficulty: k.difficulty ?? null,
    cpc: k.cpc ?? null,
    traffic_potential: k.traffic_potential ?? null,
    parent_topic: k.parent_topic?.keyword ?? null,
  }));
}

/**
 * Up to 50 matching-terms expansions for a single seed.
 */
export async function ahrefsMatchingTerms(seed: string, limit = 50): Promise<AhrefsMatchingTerm[]> {
  const data = await ahrefsGet<MatchingTermsResponse>('/keywords-explorer/matching-terms', {
    keywords: seed,
    country: country(),
    search_engine: 'google',
    match_mode: 'terms',
    limit: String(limit),
    order_by: 'volume:desc',
  });
  return (data.keywords ?? []).map((k) => ({
    keyword: k.keyword,
    volume: k.volume ?? null,
    difficulty: k.difficulty ?? null,
    parent_topic: k.parent_topic?.keyword ?? null,
  }));
}
