import 'server-only';
import { z } from 'zod';
import { buildHeroPrompt } from '@/lib/images/prompt';
import {
  formatKbEntry,
  publishedPostsAsList,
  loadAgentContext,
  type AgentContext,
} from './context';
import { checkHumanization } from './humanize-loop';
import type { AnthropicBatchRequest } from './anthropic-batch';

const WRITER_MODEL = process.env.ANTHROPIC_WRITER_MODEL || 'claude-sonnet-4-6';

const DEFAULT_CTA_LABEL = 'Book a 30-min teardown with Shilika';
const DEFAULT_CTA_URL = 'https://calendly.com/shilikajain/30min/';

// CTA label/URL are deterministic constants set by us — ignore whatever the
// model returns and always emit the defaults. Keeps draft validation from
// failing on stylized labels or hallucinated/relative URLs.
const ctaLabelSchema = z.preprocess(() => DEFAULT_CTA_LABEL, z.string());
const ctaUrlSchema = z.preprocess(() => DEFAULT_CTA_URL, z.string().url());

// Trim a string to `max` chars on a word boundary, falling back to a hard cut
// if no space exists in the back half. Used for fields where the model
// occasionally overshoots the schema cap.
function trimToBoundary(v: unknown, max: number, minBoundary: number): unknown {
  if (typeof v !== 'string') return v;
  const t = v.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > minBoundary ? cut.slice(0, lastSpace) : cut).trimEnd();
}

// Title cap is 80 chars; if the model overshoots, trim on the last word
// boundary rather than rejecting the entire draft.
const titleSchema = z.preprocess((v) => trimToBoundary(v, 80, 40), z.string().min(8).max(80));

// Same trick for the meta description. Model is told 220, we accept up to 220
// and trim anything longer.
const descriptionSchema = z.preprocess((v) => trimToBoundary(v, 220, 140), z.string().min(80).max(220));

// Claude occasionally returns array fields as comma-separated strings or as
// a JSON-encoded string. Normalize to a string[] before validating.
function coerceStringArray(v: unknown): unknown {
  if (Array.isArray(v)) return v;
  if (typeof v !== 'string') return v;
  const trimmed = v.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // fall through to comma-split
    }
  }
  return trimmed
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

const DraftSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: titleSchema,
  description: descriptionSchema,
  body: z.string().min(800),
  tags: z.preprocess(coerceStringArray, z.array(z.string()).min(1).max(8)),
  related_posts: z.preprocess(coerceStringArray, z.array(z.string()).max(5)).default([]),
  cta_label: ctaLabelSchema,
  cta_url: ctaUrlSchema,
  image_prompt: z.string().min(40),
});

export type DraftEnvelope = z.infer<typeof DraftSchema>;

// JSON schema for the `submit_draft` tool. Mirrors DraftSchema's intent but is
// what the Claude API actually enforces server-side — Zod still runs as a
// belt-and-suspenders pass with its preprocess fallbacks.
const SUBMIT_DRAFT_TOOL = {
  name: 'submit_draft',
  description:
    'Submit the final blog post draft. Call this exactly once when you are done researching and writing. Do not return prose alongside the call.',
  // Strict mode: Anthropic grammar-constrains the tool input. Guarantees
  // required fields, types, and additionalProperties:false. NOTE: it does
  // NOT enforce min/maxLength — those are advisory hints to the model; the
  // truncating Zod preprocesses (titleSchema, descriptionSchema) are the
  // real safety net for length caps.
  strict: true,
  input_schema: {
    type: 'object',
    properties: {
      slug: { type: 'string', pattern: '^[a-z0-9-]+$', description: 'URL slug, lowercase kebab-case' },
      title: { type: 'string', description: 'Headline, 8-80 chars.' },
      description: { type: 'string', description: 'Meta description / dek, 80-220 chars. Hard cap 220.' },
      body: { type: 'string', description: 'Markdown body, 1,500–2,500 words.' },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: '1-8 topic tags.',
      },
      related_posts: {
        type: 'array',
        items: { type: 'string' },
        description: 'Slugs from the published-posts list. Pick 2–3, max 5.',
      },
      image_prompt: { type: 'string', description: 'Hero image prompt: no people, 1200x630 OG composition, editorial palette. Min 40 chars.' },
    },
    required: ['slug', 'title', 'description', 'body', 'tags', 'related_posts', 'image_prompt'],
    additionalProperties: false,
  },
} as const;

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
    'Use the `web_search` tool to research, then call the `submit_draft` tool exactly once with the finished post. Do not return any prose outside the tool call.',
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
    '1. Research what currently ranks for this query using the `web_search` tool.',
    '2. Draft a 1,500–2,500-word post following the skill + humanization rules.',
    '3. Choose 2–3 related_posts from the published slug list above.',
    '4. Compose an image_prompt that satisfies the hero image rules (no people, 1200x630 OG composition, editorial palette).',
    '5. Call the `submit_draft` tool with the finished post. Do not include any text outside the tool call.',
  ]
    .filter(Boolean)
    .join('\n\n');
}

/** Stable custom_id <-> ideaId mapping used to match batch results to ideas. */
export function writerCustomId(ideaId: number): string {
  return `idea-${ideaId}`;
}

export function ideaIdFromCustomId(customId: string): number | null {
  const m = customId.match(/^idea-(\d+)$/);
  return m ? Number(m[1]) : null;
}

/**
 * Build the Anthropic batch request for a single idea. The writer is now
 * single-shot: the old multi-turn humanization fix loop can't run inside one
 * batch request, so we ask for the best draft in one pass and validate
 * humanization at parse time (recorded, non-fatal). Web search runs
 * server-side within the batch request — no client loop needed.
 */
export async function buildWriterRequest(ideaId: number): Promise<AnthropicBatchRequest> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY missing — required to run the writer');
  }

  const ctx = await loadAgentContext(ideaId);
  if (!ctx.idea) throw new Error(`content_idea ${ideaId} not found`);

  const system = buildSystem(ctx);
  const userPrompt = buildUserPrompt(ctx);

  return {
    custom_id: writerCustomId(ideaId),
    params: {
      model: WRITER_MODEL,
      max_tokens: 8000,
      system: [
        // Shared prefix across every request in the batch — cache it.
        { type: 'text', text: system, cache_control: { type: 'ephemeral' } },
      ],
      messages: [{ role: 'user', content: userPrompt }],
      tools: [
        // Anthropic-hosted web search (server-side; runs inside the batch).
        { type: 'web_search_20250305', name: 'web_search' },
        // Client tool used purely as a structured-output channel. Cache
        // breakpoint on the last tool caches the full tools block.
        { ...SUBMIT_DRAFT_TOOL, cache_control: { type: 'ephemeral' } },
      ],
    },
  };
}

export type WriterDraftResult = {
  draft: DraftEnvelope;
  imagePrompt: string;
  finalViolations: number;
};

/**
 * Parse a completed batch message into a validated draft + hero prompt.
 * Throws if the model didn't call `submit_draft` or the payload fails schema
 * validation — the caller rolls the idea back to 'idea' in that case.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseWriterDraft(message: any): WriterDraftResult {
  const content = message?.content ?? [];
  const toolUse = content.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (b: any) => b.type === 'tool_use' && b.name === SUBMIT_DRAFT_TOOL.name,
  );
  if (!toolUse) {
    const text = content
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((b: any) => b.type === 'text')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((b: any) => b.text as string)
      .join('\n')
      .slice(0, 400);
    throw new Error(`writer did not call submit_draft (got: ${text || '[no text]'})`);
  }

  const parsed = DraftSchema.parse(toolUse.input);

  // Build a hero image prompt from the draft's image_prompt + structural rules.
  const hero = buildHeroPrompt({
    title: parsed.title,
    description: parsed.description,
    tags: parsed.tags,
    styleHint: parsed.image_prompt,
  });

  const violations = checkHumanization(parsed.body);

  return {
    draft: parsed,
    imagePrompt: hero,
    finalViolations: violations.length,
  };
}
