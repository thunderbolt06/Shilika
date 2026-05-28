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
  relevantKb: KnowledgeEntry[];
  brandVoiceKb: KnowledgeEntry[];
  caseStudyKb: KnowledgeEntry[];
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

  const tagFilter = idea?.tags?.length ? idea.tags : [];

  const [relevantRes, brandVoiceRes, caseStudyRes, postsRes] = await Promise.all([
    tagFilter.length
      ? supabase
          .from('knowledge_base')
          .select('*')
          .overlaps('tags', tagFilter)
          .limit(40)
      : Promise.resolve({ data: [] as KnowledgeEntry[] }),
    supabase.from('knowledge_base').select('*').eq('kind', 'brand_voice').limit(20),
    supabase.from('knowledge_base').select('*').eq('kind', 'case_study').limit(20),
    supabase
      .from('blog_posts')
      .select('slug, title, description, tags')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(60),
  ]);

  return {
    persona,
    strategy,
    important,
    skill,
    humanize,
    geo,
    idea,
    relevantKb: (relevantRes.data ?? []) as KnowledgeEntry[],
    brandVoiceKb: (brandVoiceRes.data ?? []) as KnowledgeEntry[],
    caseStudyKb: (caseStudyRes.data ?? []) as KnowledgeEntry[],
    publishedPosts: (postsRes.data ?? []) as AgentContext['publishedPosts'],
  };
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
        `- /blog/${p.slug} — ${p.title}${p.tags?.length ? ` [${p.tags.join(', ')}]` : ''}`,
    )
    .join('\n');
}
