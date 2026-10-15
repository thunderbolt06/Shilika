import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import { getAdminSupabase } from '@/lib/supabase/server';
import type { BlogPost, ContentIdea, KnowledgeEntry } from '@/lib/supabase/types';

const ROOT = process.cwd();

const FILES = {
  persona: 'agents/content-strategist/PERSONA.md',
  strategy: 'agents/content-strategist/STRATEGY.md',
  important: 'agents/content-strategist/IMPORTANT.md',
  skill: 'skills/write-blog-post/SKILL.md',
  humanize: 'docs/humanization-guide.md',
  geo: 'docs/geo-guidelines.md',
};

export type AgentContext = {
  persona: string;
  strategy: string;
  important: string;
  skill: string;
  humanize: string;
  geo: string;
  idea: ContentIdea | null;
  /** Always-on facts about Shilika (roles, clients, speaking). */
  credentialsKb: KnowledgeEntry[];
  /** Client case studies ranked by relevance to the idea. */
  caseStudyKb: KnowledgeEntry[];
  /** Shilika's own X posts ranked by relevance; quotable verbatim. */
  xPostsKb: KnowledgeEntry[];
  /** Everything else that matches (brand voice, seeds, notes, snippets). */
  relevantKb: KnowledgeEntry[];
  publishedPosts: Pick<BlogPost, 'slug' | 'title' | 'description' | 'tags'>[];
};

async function readFileSafe(rel: string): Promise<string> {
  try {
    return await fs.readFile(path.join(ROOT, rel), 'utf8');
  } catch {
    return '';
  }
}

export async function loadAgentContext(ideaId: number | null): Promise<AgentContext> {
  const [persona, strategy, important, skill, humanize, geo] = await Promise.all([
    readFileSafe(FILES.persona),
    readFileSafe(FILES.strategy),
    readFileSafe(FILES.important),
    readFileSafe(FILES.skill),
    readFileSafe(FILES.humanize),
    readFileSafe(FILES.geo),
  ]);

  const supabase = getAdminSupabase();

  let idea: ContentIdea | null = null;
  if (ideaId !== null) {
    const { data } = await supabase
      .from('content_ideas')
      .select('*')
      .eq('id', ideaId)
      .maybeSingle();
    idea = (data as ContentIdea | null) ?? null;
  }

  const [kbRes, postsRes] = await Promise.all([
    idea
      ? supabase.from('knowledge_base').select('*')
      : Promise.resolve({ data: [] as KnowledgeEntry[] }),
    supabase
      .from('blog_posts')
      .select('slug, title, description, tags')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(60),
  ]);

  const picked = idea
    ? pickKnowledge(idea, (kbRes.data ?? []) as KnowledgeEntry[])
    : { credentialsKb: [], caseStudyKb: [], xPostsKb: [], relevantKb: [] };

  return {
    persona,
    strategy,
    important,
    skill,
    humanize,
    geo,
    idea,
    ...picked,
    publishedPosts: (postsRes.data ?? []) as AgentContext['publishedPosts'],
  };
}

// ---------------------------------------------------------------------------
// Knowledge selection. The KB holds a few hundred rows (mostly X posts), and
// tags are written inconsistently ("Web3 PR" vs "web3-pr"), so exact tag
// overlap is not enough. Each row is scored against the idea by normalised tag
// matches plus IDF-weighted word overlap, so generic words like "web3" or "pr"
// count for little and specific ones like "embargo" or "korea" count for a lot.
// ---------------------------------------------------------------------------

const MAX_X_POSTS = 10;
const MAX_CASE_STUDIES = 4;
const MIN_CASE_STUDIES = 2;
const MAX_OTHER = 8;

const STOPWORDS = new Set(
  'the and for with that this from your you are was were what when how why who will can not but our out into about than then them they their have has had its just more most over also only very much many some any all one two get got use using via per vs here there been being which while would could should into onto off yet still like make made does did done doing every each such 2024 2025 2026 http https www com status shilika jain amp'.split(
    ' ',
  ),
);
const SHORT_KEEP = new Set(['pr', 'ai', 'kol', 'x', 'l1', 'l2', 'rwa', 'zk', 'seo', 'geo', 'aeo', 'bd', 'gtm', 'kr', 'jp']);

const normTag = (t: string) =>
  t.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, ' ')
    .split(/[^a-z0-9]+/)
    .map((w) => (w.length > 4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w))
    .filter((w) => (w.length >= 3 || SHORT_KEEP.has(w)) && !STOPWORDS.has(w));
}

const meta = (e: KnowledgeEntry) => (e.metadata ?? {}) as Record<string, unknown>;
const isXPost = (e: KnowledgeEntry) => meta(e).source === 'x_tweets';
const isCredentials = (e: KnowledgeEntry) => e.tags?.includes('author-credentials');

const WEBSITE_USE_PRIOR: Record<string, number> = {
  'New page': 1.5,
  'Quote in page': 1.2,
  'Social proof': 0.8,
  'Idea bank': 0.2,
};

function pickKnowledge(idea: ContentIdea, rows: KnowledgeEntry[]) {
  // BM25 over title + body + tags, so a long post can't win on sheer volume of
  // weak matches.
  const docs = rows.map((e) => {
    const tf = new Map<string, number>();
    const words = [...tokens(`${e.title} ${e.body}`), ...(e.tags ?? []).flatMap((t) => tokens(t))];
    for (const w of words) tf.set(w, (tf.get(w) ?? 0) + 1);
    return { tf, len: words.length };
  });
  const avgLen = docs.reduce((n, d) => n + d.len, 0) / Math.max(docs.length, 1);
  const df = new Map<string, number>();
  for (const d of docs) for (const w of d.tf.keys()) df.set(w, (df.get(w) ?? 0) + 1);
  const idf = (w: string) => {
    const n = df.get(w) ?? 0;
    return Math.log(1 + (rows.length - n + 0.5) / (n + 0.5));
  };

  // The title says what the post is about. Idea tags come from a broad
  // taxonomy ("Web3 PR", "AI PR") and the description is long, so both only
  // nudge the ranking.
  const query = new Map<string, number>();
  for (const w of tokens(idea.description ?? '')) query.set(w, 0.2);
  for (const w of (idea.tags ?? []).flatMap((t) => tokens(t))) query.set(w, 0.5);
  for (const w of tokens(idea.title)) query.set(w, 1);
  const ideaTags = new Set((idea.tags ?? []).map(normTag));

  const K1 = 1.2;
  const B = 0.75;
  const relevance = rows.map((e, i) => {
    const { tf, len } = docs[i];
    let s = 0;
    for (const [w, qw] of query) {
      const f = tf.get(w);
      if (!f) continue;
      s += qw * idf(w) * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * len) / avgLen)));
    }
    for (const t of e.tags ?? []) if (ideaTags.has(normTag(t))) s += 0.75;
    return s;
  });

  // Keep only rows that score close to the best match for this idea; the floor
  // stops a weak idea from dragging in anything at all.
  const cutoff = (list: { rel: number }[], floor: number) => {
    const top = Math.max(0, ...list.map((x) => x.rel));
    return (x: { rel: number }) => x.rel >= Math.max(floor, top * 0.5);
  };

  const ranked = (filter: (e: KnowledgeEntry) => boolean, prior: (e: KnowledgeEntry) => number = () => 0) =>
    rows
      .map((e, i) => ({ e, rel: relevance[i], score: relevance[i] * (1 + 0.15 * prior(e)) }))
      .filter(({ e }) => filter(e))
      .sort((a, b) => b.score - a.score);

  const credentialsKb = rows.filter(isCredentials);

  const cases = ranked((e) => e.kind === 'case_study' && !isCredentials(e));
  const relevantCases = cases.filter(cutoff(cases, 4)).slice(0, MAX_CASE_STUDIES);
  const caseStudyKb = (relevantCases.length >= MIN_CASE_STUDIES ? relevantCases : cases.slice(0, MIN_CASE_STUDIES)).map(
    (c) => c.e,
  );

  // X posts need a real topical match; engagement and the tagger's own
  // usefulness score only break ties between relevant posts.
  const xRanked = ranked(isXPost, (e) => {
    const m = meta(e);
    return (
      (WEBSITE_USE_PRIOR[String(m.website_use)] ?? 0) +
      Number(m.score ?? 0) / 20 +
      Math.log10(Number(m.likes ?? 0) + 1) * 0.15
    );
  });
  const xPostsKb = xRanked
    .filter(cutoff(xRanked, 9))
    .slice(0, MAX_X_POSTS)
    .map((x) => x.e);

  const relevantKb = [
    ...rows.filter((e) => e.kind === 'brand_voice'),
    ...ranked((e) => !isXPost(e) && !isCredentials(e) && e.kind !== 'case_study' && e.kind !== 'brand_voice')
      .filter((x) => x.rel >= 4)
      .slice(0, MAX_OTHER)
      .map((x) => x.e),
  ];

  return { credentialsKb, caseStudyKb, xPostsKb, relevantKb };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatXPost(entry: KnowledgeEntry): string {
  const m = meta(entry);
  const date = typeof m.date === 'string' ? m.date : '';
  const [y, mo, d] = date.split('-').map(Number);
  const label = y ? `${d} ${MONTHS[mo - 1]} ${y}` : '';
  const extra = [
    m.page_cluster ? `Theme: ${m.page_cluster}` : '',
    m.website_use ? `Use: ${m.website_use}` : '',
    m.used_in_article ? `Already quoted in: ${m.used_in_article}` : '',
  ]
    .filter(Boolean)
    .join(' | ');
  return `- Posted ${label || 'undated'} | Cite as: [Shilika Jain on X, ${label}](${entry.source_url})${extra ? ` | ${extra}` : ''}\n  ${entry.body.replace(/\n+/g, '\n  ')}`;
}

export function formatKbEntry(entry: KnowledgeEntry): string {
  const tagLine = entry.tags?.length ? `Tags: ${entry.tags.join(', ')}\n` : '';
  const src = entry.source_url ? `Source: ${entry.source_url}\n` : '';
  return `### ${entry.title}\n${tagLine}${src}\n${entry.body}\n`;
}

export function publishedPostsAsList(
  posts: AgentContext['publishedPosts'],
): string {
  if (!posts.length) return '_(no published posts yet)_';
  return posts
    .map(
      (p) =>
        `- /blog/${p.slug} - ${p.title}${p.tags?.length ? ` [${p.tags.join(', ')}]` : ''}`,
    )
    .join('\n');
}
