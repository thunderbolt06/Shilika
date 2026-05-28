import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { buildHeroPrompt } from '@/lib/images/prompt';
import {
  formatKbEntry,
  publishedPostsAsList,
  loadAgentContext,
  type AgentContext,
} from './context';
import { checkHumanization, formatViolations } from './humanize-loop';

const WRITER_MODEL = process.env.ANTHROPIC_WRITER_MODEL || 'claude-opus-4-7';
const MAX_HUMANIZE_PASSES = 4;

const DraftSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(8).max(80),
  description: z.string().min(80).max(180),
  body: z.string().min(800),
  tags: z.array(z.string()).min(1).max(8),
  related_posts: z.array(z.string()).max(5).default([]),
  cta_label: z.string().default('Book a 30-min teardown with Shilika'),
  cta_url: z.string().url().default('https://calendly.com/shilikajain/30min/'),
  image_prompt: z.string().min(40),
});

export type DraftEnvelope = z.infer<typeof DraftSchema>;

function buildSystem(ctx: AgentContext): string {
  return [
    '# Persona',
    ctx.persona,
    '# Strategy',
    ctx.strategy,
    '# Important (memory)',
    ctx.important,
    '# Skill — Write blog post',
    ctx.skill,
    '# Humanization guide',
    ctx.humanize,
    '# GEO guidelines',
    ctx.geo,
    '',
    '## Output format',
    'Return a single JSON object matching the envelope schema. No prose before or after.',
    'Keys: slug, title, description, body (markdown), tags, related_posts (use real slugs from the list below), cta_label, cta_url, image_prompt.',
  ].join('\n\n');
}

function buildUserPrompt(ctx: AgentContext): string {
  const idea = ctx.idea;
  if (!idea) {
    throw new Error('writer requires a content_idea row');
  }

  const kb = ctx.relevantKb.concat(ctx.brandVoiceKb).concat(ctx.caseStudyKb);
  const uniq = new Map(kb.map((e) => [e.id, e]));
  const kbBlock = [...uniq.values()].map(formatKbEntry).join('\n---\n');

  return [
    `## Content idea (priority P${idea.priority})`,
    `Title (proposed): ${idea.title}`,
    idea.description ? `Description / angle:\n${idea.description}` : '',
    idea.tags?.length ? `Target tags: ${idea.tags.join(', ')}` : '',
    idea.source_signals
      ? `Source signals (why this topic): \`\`\`json\n${JSON.stringify(idea.source_signals, null, 2)}\n\`\`\``
      : '',
    '',
    '## Knowledge base entries you may cite',
    kbBlock || '_(no matching knowledge base entries — write conservatively and avoid named entities)_',
    '',
    '## Currently published posts (use these slugs for related_posts)',
    publishedPostsAsList(ctx.publishedPosts),
    '',
    '## Your task',
    '1. Research what currently ranks for this query using the web_search tool.',
    '2. Draft a 1,500–2,500-word post following the skill + humanization rules.',
    '3. Choose 2–3 related_posts from the published slug list above.',
    '4. Compose an image_prompt that satisfies the hero image rules (no people, 1200x630 OG composition, editorial palette).',
    '5. Return JSON envelope only.',
  ]
    .filter(Boolean)
    .join('\n\n');
}

function buildFixPrompt(violations: string, lastDraft: string): string {
  return [
    'The validator rejected the draft. Fix every violation below and return the same JSON envelope. Do not change the title, description, tags, related_posts, cta_label, cta_url, image_prompt, or slug. Only fix the body.',
    '',
    'Violations:',
    violations,
    '',
    'Previous body (markdown):',
    '```markdown',
    lastDraft,
    '```',
  ].join('\n');
}

type Message = { role: 'user' | 'assistant'; content: string };

async function callClaude(system: string, messages: Message[]): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await client.messages.create({
    model: WRITER_MODEL,
    max_tokens: 8000,
    system,
    messages,
    // Anthropic-hosted web search tool. The writer uses it to inspect what
    // currently ranks before composing the draft.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tools: [{ type: 'web_search_20250305', name: 'web_search' } as any],
  });
  const text = response.content
    .filter((b) => b.type === 'text')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((b) => (b as any).text as string)
    .join('\n');
  return text;
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  // Strip a leading ```json fence if present.
  const noFence = trimmed.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '');
  const start = noFence.indexOf('{');
  const end = noFence.lastIndexOf('}');
  if (start < 0 || end <= start) {
    throw new Error('writer did not return JSON');
  }
  return JSON.parse(noFence.slice(start, end + 1));
}

export type WriterResult = {
  draft: DraftEnvelope;
  imagePrompt: string;
  passes: number;
  finalViolations: number;
};

export async function writeDraftForIdea(ideaId: number): Promise<WriterResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY missing — required to run the writer');
  }

  const ctx = await loadAgentContext(ideaId);
  if (!ctx.idea) throw new Error(`content_idea ${ideaId} not found`);

  const system = buildSystem(ctx);
  const userPrompt = buildUserPrompt(ctx);

  const messages: Message[] = [{ role: 'user', content: userPrompt }];
  let raw = await callClaude(system, messages);
  let parsed = DraftSchema.parse(extractJson(raw));

  let passes = 1;
  let violations = checkHumanization(parsed.body);

  while (violations.length > 0 && passes < MAX_HUMANIZE_PASSES) {
    messages.push({ role: 'assistant', content: raw });
    messages.push({ role: 'user', content: buildFixPrompt(formatViolations(violations), parsed.body) });
    raw = await callClaude(system, messages);
    parsed = DraftSchema.parse(extractJson(raw));
    passes += 1;
    violations = checkHumanization(parsed.body);
  }

  // Build a hero image prompt from the draft's image_prompt + structural rules.
  const hero = buildHeroPrompt({
    title: parsed.title,
    description: parsed.description,
    tags: parsed.tags,
    styleHint: parsed.image_prompt,
  });

  return {
    draft: parsed,
    imagePrompt: hero,
    passes,
    finalViolations: violations.length,
  };
}
