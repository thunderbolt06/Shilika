import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { ahrefsEnabled, ahrefsMatchingTerms, ahrefsOverview, type AhrefsOverview } from '@/lib/integrations/ahrefs';
import { gscOpportunityQueries } from '@/lib/integrations/gsc';
import { perplexityBatch, perplexityEnabled, type PerplexitySignal } from '@/lib/integrations/perplexity';
import { getAdminSupabase } from '@/lib/supabase/server';
import type { ContentIdea, KnowledgeEntry } from '@/lib/supabase/types';
import { loadAgentContext } from './context';
import { withRetry } from '@/lib/retry';

const RESEARCH_MODEL = process.env.ANTHROPIC_RESEARCH_MODEL || 'claude-sonnet-4-6';

const CandidateSchema = z.object({
  title: z.string().min(8).max(240),
  description: z.string().min(40).max(1200),
  tags: z.array(z.string().min(1)).max(8),
  priority: z.number().int().min(0).max(4),
  source_signals: z.object({
    seed_query: z.string().optional(),
    gsc_query: z.string().optional(),
    page_url: z.string().optional(),
    impressions_28d: z.number().optional(),
    avg_position: z.number().optional(),
    competitor_evidence: z.array(z.string()).optional(),
    community_evidence: z.array(z.string()).optional(),
    rationale: z.string().min(20).max(800),
    demand_score: z.number().min(0).max(10).optional(),
    intent_score: z.number().min(0).max(10).optional(),
    gap_score: z.number().min(0).max(10).optional(),
  }),
});

type Candidate = z.infer<typeof CandidateSchema>;

const ResponseSchema = z.object({ candidates: z.array(CandidateSchema).min(0).max(20) });

function coercePriority(value: unknown): number | unknown {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const m = value.trim().match(/^P?(\d)$/i);
    if (m) return Number(m[1]);
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return value;
}

function coerceLlmCandidates(raw: unknown): unknown {
  if (!raw || typeof raw !== 'object' || !('candidates' in raw)) return raw;
  const candidates = (raw as { candidates?: unknown }).candidates;
  if (!Array.isArray(candidates)) return raw;
  return {
    ...raw,
    candidates: candidates.map((c) => {
      if (!c || typeof c !== 'object') return c;
      const obj = c as Record<string, unknown>;
      const title = typeof obj.title === 'string' ? obj.title : '';
      const description = typeof obj.description === 'string' && obj.description.length >= 40
        ? obj.description
        : `${title}. ${typeof obj.description === 'string' ? obj.description : ''}`.slice(0, 1200).padEnd(40, '.');
      return {
        ...obj,
        description,
        tags: Array.isArray(obj.tags) ? obj.tags.filter((t) => typeof t === 'string' && t.length > 0) : [],
        priority: coercePriority(obj.priority),
      };
    }),
  };
}

export type ResearchSummary = {
  candidates_proposed: number;
  candidates_inserted: number;
  candidates_skipped_duplicate: number;
  gsc_opportunities: number;
  seed_queries: number;
  ahrefs_used: boolean;
  perplexity_used: boolean;
  llm_used: boolean;
};

async function listLongTailSeeds(): Promise<KnowledgeEntry[]> {
  const supabase = getAdminSupabase();
  const { data } = await supabase
    .from('knowledge_base')
    .select('*')
    .eq('kind', 'long_tail_seed');
  return (data ?? []) as KnowledgeEntry[];
}

async function listKnownTitles(): Promise<Set<string>> {
  const supabase = getAdminSupabase();
  const [posts, ideas] = await Promise.all([
    supabase.from('blog_posts').select('title, slug'),
    supabase.from('content_ideas').select('title, slug').in('status', ['idea', 'draft', 'ready_for_review', 'approved', 'published']),
  ]);
  const known = new Set<string>();
  for (const p of (posts.data ?? []) as { title: string; slug: string }[]) {
    known.add(p.title.toLowerCase().trim());
    known.add(p.slug.toLowerCase());
  }
  for (const i of (ideas.data ?? []) as { title: string; slug: string | null }[]) {
    known.add(i.title.toLowerCase().trim());
    if (i.slug) known.add(i.slug.toLowerCase());
  }
  return known;
}

function callClaudeForCandidates(opts: {
  seeds: string[];
  gscOpportunities: Awaited<ReturnType<typeof gscOpportunityQueries>>;
  ahrefs: Record<string, AhrefsOverview>;
  expansions: { seed: string; terms: { keyword: string; volume: number | null }[] }[];
  perplexity: Record<string, PerplexitySignal>;
  knownTitles: string[];
  brandContext: string;
}): Promise<Candidate[]> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const system = `${opts.brandContext}

You are a topic-research agent. Your job is to propose blog post ideas that
have real search demand and conversion intent for a fractional PR consultant
serving Web3 and AI founders. You do not invent topics. You discover them
from signals, score them, and return them as JSON.

Scoring rubric (each 0-10):
- demand_score: Is this actually getting search volume? Use the web_search
  tool to see if Reddit/Stack Overflow/X communities discuss the question.
  GSC evidence (impressions) lifts this score.
- intent_score: Would the searcher convert to a fractional PR retainer?
  A founder typing "embargo strategy for token launch" scores high. A
  student typing "what is PR" scores low.
- gap_score: Is the existing top-3 on Google thin, generic, or out of date?
  Use web_search to scan the SERP. A weak SERP = high gap score = high
  priority.

Priority output mapping (return as INTEGER, not "P0"/"P1"):
  9-10 average -> priority: 0   (write next)
  7-8 average  -> priority: 1
  5-6 average  -> priority: 2
  <5 average   -> priority: 3

Return JSON ONLY in this exact shape. No prose, no markdown fences.
Every candidate MUST include every required field below.

{
  "candidates": [
    {
      "title": "string, 8-240 chars",
      "description": "string, 40-1200 chars, 2-4 sentences explaining the angle",
      "tags": ["string", "string"],
      "priority": 0,
      "source_signals": {
        "rationale": "string, 20-800 chars, 1-3 sentences on why this scores well",
        "seed_query": "optional string",
        "gsc_query": "optional string",
        "demand_score": 0,
        "intent_score": 0,
        "gap_score": 0
      }
    }
  ]
}

Rules:
- "tags" is REQUIRED. If you have no tags, return [].
- "priority" is an INTEGER 0-4. Never "P1", never "high".
- "description" is REQUIRED and at least 40 characters.
- Five to ten candidates is the sweet spot.`;

  const userParts: string[] = [];

  if (opts.seeds.length) {
    userParts.push(
      `## Long-tail seed queries (loaded from knowledge_base, kind='long_tail_seed')\n` +
        opts.seeds.map((s) => `- ${s}`).join('\n'),
    );
  }

  if (opts.gscOpportunities.length) {
    userParts.push(
      `## GSC opportunity queries (28 days, position 4-30, CTR < 2%)\nThese are queries Google already thinks the site is relevant for. Each row is an opportunity.\n` +
        opts.gscOpportunities
          .slice(0, 25)
          .map(
            (g) =>
              `- "${g.query}" -> ${g.page ?? '(no page)'} | impressions: ${g.impressions} | position: ${g.position.toFixed(1)} | ctr: ${(g.ctr * 100).toFixed(2)}%`,
          )
          .join('\n'),
    );
  }

  const ahrefsRows = Object.values(opts.ahrefs);
  if (ahrefsRows.length) {
    userParts.push(
      `## Ahrefs Keywords Explorer overview (volume, difficulty)\n` +
        ahrefsRows
          .map(
            (a) =>
              `- "${a.keyword}" — vol ${a.volume ?? '?'} | KD ${a.difficulty ?? '?'} | TP ${a.traffic_potential ?? '?'} | parent topic: ${a.parent_topic ?? '—'}`,
          )
          .join('\n'),
    );
  }

  if (opts.expansions.length) {
    userParts.push(
      `## Ahrefs matching-terms expansions (top by volume per seed)\n` +
        opts.expansions
          .map(
            (e) =>
              `### From seed: ${e.seed}\n` +
              e.terms.slice(0, 12).map((t) => `  - "${t.keyword}" (vol ${t.volume ?? '?'})`).join('\n'),
          )
          .join('\n\n'),
    );
  }

  const perplexityEntries = Object.entries(opts.perplexity);
  if (perplexityEntries.length) {
    userParts.push(
      `## Perplexity related questions (what real users ask next)\n` +
        perplexityEntries
          .map(([q, sig]) => {
            const rels = sig.related_questions.slice(0, 5).map((r) => `  - ${r}`).join('\n');
            const cites = sig.citations.slice(0, 3).map((c) => `  - ${c}`).join('\n');
            return `### Seed: ${q}\nRelated:\n${rels}\nCited sources:\n${cites}`;
          })
          .join('\n\n'),
    );
  }

  userParts.push(
    `## Titles and slugs already in the pipeline (do NOT propose duplicates)\n` +
      opts.knownTitles.slice(0, 80).map((t) => `- ${t}`).join('\n'),
  );

  userParts.push(`## Your task
1. For each candidate idea you propose, use the web_search tool to:
   a. Inspect what currently ranks on Google for the closest variant of the query
   b. Find Reddit and Stack Overflow threads that show the actual phrasing real users use
   c. Identify "people also ask" or related questions that surface in the SERP
2. Score every candidate on demand_score, intent_score, gap_score.
3. Map the average to priority (P0/P1/P2/P3) per the rubric.
4. Return JSON only: { "candidates": [ ... ] }. Do NOT return commentary.`);

  return (async () => {
    const response = await withRetry(
      () =>
        client.messages.create({
          model: RESEARCH_MODEL,
          max_tokens: 6000,
          system: [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { type: 'text', text: system, cache_control: { type: 'ephemeral', ttl: '1h' } } as any,
          ],
          messages: [{ role: 'user', content: userParts.join('\n\n') }],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tools: [{ type: 'web_search_20250305', name: 'web_search' } as any],
        }, {
          headers: { 'anthropic-beta': 'extended-cache-ttl-2025-04-11' },
        }),
      { label: `anthropic:${RESEARCH_MODEL}` },
    );

    const text = response.content
      .filter((b) => b.type === 'text')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((b) => (b as any).text as string)
      .join('\n');
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start < 0 || end <= start) throw new Error('research agent returned no JSON');
    const raw = JSON.parse(text.slice(start, end + 1));
    const parsed = ResponseSchema.parse(coerceLlmCandidates(raw));
    return parsed.candidates;
  })();
}

function fallbackFromSeeds(seeds: string[]): Candidate[] {
  // If Claude isn't available, the seed queries themselves become P2 idea rows
  // — at least the queue won't sit empty.
  return seeds.slice(0, 10).map((s) => ({
    title: s,
    description: `Seeded from knowledge_base.long_tail_seed: "${s}".`,
    tags: [],
    priority: 2,
    source_signals: {
      seed_query: s,
      rationale: 'No LLM available — using the raw seed query as the candidate.',
    },
  }));
}

/**
 * Main entry point for the topic-research cron.
 */
export async function runTopicResearch(options?: { force?: boolean }): Promise<ResearchSummary> {
  const supabase = getAdminSupabase();

  // Skip the research run unless the queue is genuinely low or the caller
  // explicitly forces a refresh.
  if (!options?.force) {
    const { count } = await supabase
      .from('content_ideas')
      .select('id', { count: 'exact', head: true })
      .in('status', ['idea', 'ready_for_review']);
    if ((count ?? 0) >= 5) {
      return {
        candidates_proposed: 0,
        candidates_inserted: 0,
        candidates_skipped_duplicate: 0,
        gsc_opportunities: 0,
        seed_queries: 0,
        ahrefs_used: false,
        perplexity_used: false,
        llm_used: false,
      };
    }
  }

  const [seedRows, gscOpportunities, knownTitles, brandCtx] = await Promise.all([
    listLongTailSeeds(),
    process.env.GSC_SERVICE_ACCOUNT_JSON ? gscOpportunityQueries().catch(() => []) : Promise.resolve([] as Awaited<ReturnType<typeof gscOpportunityQueries>>),
    listKnownTitles(),
    loadAgentContext(null).then((ctx) => `# Persona\n${ctx.persona}\n\n# Strategy\n${ctx.strategy}`),
  ]);
  const seedQueries = seedRows.flatMap((r) => [r.title, ...r.body.split('\n').filter((l) => l.trim() && !l.startsWith('#'))]).slice(0, 60);

  // Enrichment from Ahrefs + Perplexity (both optional).
  const enrichmentSeeds = [...seedQueries, ...gscOpportunities.slice(0, 10).map((g) => g.query)].slice(0, 25);
  const [ahrefsResults, expansionResults, perplexityResults] = await Promise.all([
    ahrefsEnabled()
      ? ahrefsOverview(enrichmentSeeds).catch((err) => {
          console.warn('[topic-research] Ahrefs overview failed:', err);
          return [] as Awaited<ReturnType<typeof ahrefsOverview>>;
        })
      : Promise.resolve([] as Awaited<ReturnType<typeof ahrefsOverview>>),
    ahrefsEnabled()
      ? Promise.allSettled(enrichmentSeeds.slice(0, 8).map((s) => ahrefsMatchingTerms(s, 15))).then(
          (settled) =>
            settled
              .map((s, i) =>
                s.status === 'fulfilled' ? { seed: enrichmentSeeds[i], terms: s.value } : null,
              )
              .filter(Boolean) as { seed: string; terms: { keyword: string; volume: number | null }[] }[],
        )
      : Promise.resolve([] as { seed: string; terms: { keyword: string; volume: number | null }[] }[]),
    perplexityEnabled()
      ? perplexityBatch(enrichmentSeeds.slice(0, 12)).catch((err) => {
          console.warn('[topic-research] Perplexity failed:', err);
          return {} as Awaited<ReturnType<typeof perplexityBatch>>;
        })
      : Promise.resolve({} as Awaited<ReturnType<typeof perplexityBatch>>),
  ]);

  const ahrefsByKeyword = Object.fromEntries(ahrefsResults.map((a) => [a.keyword.toLowerCase(), a]));
  const perplexityByQuery: Record<string, PerplexitySignal> = {};
  for (const [q, v] of Object.entries(perplexityResults)) {
    if ('error' in v) continue;
    perplexityByQuery[q] = v;
  }

  let candidates: Candidate[] = [];
  let llmUsed = false;

  if (process.env.ANTHROPIC_API_KEY && (seedQueries.length || gscOpportunities.length)) {
    try {
      candidates = await callClaudeForCandidates({
        seeds: seedQueries,
        gscOpportunities,
        ahrefs: ahrefsByKeyword,
        expansions: expansionResults,
        perplexity: perplexityByQuery,
        knownTitles: [...knownTitles],
        brandContext: brandCtx,
      });
      llmUsed = true;
    } catch (err) {
      console.warn('[topic-research] LLM call failed, falling back to seeds:', err);
      candidates = fallbackFromSeeds(seedQueries);
    }
  } else {
    candidates = fallbackFromSeeds(seedQueries);
  }

  // Deduplicate against known titles + against each other within this batch.
  const seenTitles = new Set<string>(knownTitles);
  const toInsert: Pick<ContentIdea, 'title' | 'description' | 'tags' | 'priority' | 'source_signals'>[] = [];
  let skipped = 0;
  for (const c of candidates) {
    const key = c.title.toLowerCase().trim();
    if (seenTitles.has(key)) {
      skipped += 1;
      continue;
    }
    seenTitles.add(key);
    toInsert.push({
      title: c.title,
      description: c.description,
      tags: c.tags,
      priority: c.priority,
      source_signals: c.source_signals,
    });
  }

  let inserted = 0;
  if (toInsert.length) {
    const { data, error } = await supabase
      .from('content_ideas')
      .insert(
        toInsert.map((r) => ({
          ...r,
          status: 'idea',
          content_type: 'blog_post',
        })),
      )
      .select('id');
    if (error) throw new Error(`topic-research insert failed: ${error.message}`);
    inserted = (data ?? []).length;
  }

  return {
    candidates_proposed: candidates.length,
    candidates_inserted: inserted,
    candidates_skipped_duplicate: skipped,
    gsc_opportunities: gscOpportunities.length,
    seed_queries: seedQueries.length,
    ahrefs_used: ahrefsResults.length > 0,
    perplexity_used: Object.keys(perplexityByQuery).length > 0,
    llm_used: llmUsed,
  };
}
