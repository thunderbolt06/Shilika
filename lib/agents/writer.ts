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
import { withRetry } from '@/lib/retry';

const WRITER_MODEL = process.env.ANTHROPIC_WRITER_MODEL || 'claude-opus-4-7';
const MAX_HUMANIZE_PASSES = 4;

const DEFAULT_CTA_LABEL = 'Book a 30-min teardown with Shilika';
const DEFAULT_CTA_URL = 'https://calendly.com/shilikajain/30min/';

// CTA label/URL are deterministic constants set by us — ignore whatever the
// model returns and always emit the defaults. Keeps draft validation from
// failing on stylized labels or hallucinated/relative URLs.
const ctaLabelSchema = z.preprocess(() => DEFAULT_CTA_LABEL, z.string());
const ctaUrlSchema = z.preprocess(() => DEFAULT_CTA_URL, z.string().url());

// Title cap is 80 chars; if the model overshoots, trim on the last word
// boundary rather than rejecting the entire draft.
const titleSchema = z.preprocess((v) => {
  if (typeof v !== 'string') return v;
  const t = v.trim();
  if (t.length <= 80) return t;
  const cut = t.slice(0, 80);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd();
}, z.string().min(8).max(80));

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
  description: z.string().min(80).max(180),
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
  input_schema: {
    type: 'object',
    properties: {
      slug: { type: 'string', pattern: '^[a-z0-9-]+$', description: 'URL slug, lowercase kebab-case' },
      title: { type: 'string', minLength: 8, maxLength: 80 },
      description: { type: 'string', minLength: 80, maxLength: 180, description: 'Meta description / dek' },
      body: { type: 'string', minLength: 800, description: 'Markdown body, 1,500–2,500 words' },
      tags: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        maxItems: 8,
      },
      related_posts: {
        type: 'array',
        items: { type: 'string' },
        maxItems: 5,
        description: 'Slugs from the published-posts list. Pick 2–3.',
      },
      image_prompt: { type: 'string', minLength: 40, description: 'Hero image prompt: no people, 1200x630 OG composition, editorial palette.' },
    },
    required: ['slug', 'title', 'description', 'body', 'tags', 'related_posts', 'image_prompt'],
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

function buildFixPrompt(violations: string): string {
  return [
    'The validator rejected the draft. Fix every violation below and call `submit_draft` again with the corrected post. Do not change the title, description, tags, related_posts, image_prompt, or slug. Only fix the body.',
    '',
    'Violations:',
    violations,
  ].join('\n');
}

type Message = {
  role: 'user' | 'assistant';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
};

type DraftCall = {
  // The raw assistant message (preserved so we can append it to the
  // conversation for the next fix-loop turn).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assistantContent: any;
  input: unknown;
};

async function callClaude(system: string, messages: Message[]): Promise<DraftCall> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const response = await withRetry(
    () =>
      client.messages.create({
        model: WRITER_MODEL,
        max_tokens: 8000,
        system,
        messages,
        tools: [
          // Anthropic-hosted web search (server-side; no client loop needed).
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { type: 'web_search_20250305', name: 'web_search' } as any,
          // Client tool used purely as a structured-output channel.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          SUBMIT_DRAFT_TOOL as any,
        ],
      }),
    { label: `anthropic:${WRITER_MODEL}` },
  );

  const toolUse = response.content.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (b: any) => b.type === 'tool_use' && b.name === SUBMIT_DRAFT_TOOL.name,
  );
  if (!toolUse) {
    const text = response.content
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((b: any) => b.type === 'text')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((b: any) => b.text as string)
      .join('\n')
      .slice(0, 400);
    throw new Error(`writer did not call submit_draft (got: ${text || '[no text]'})`);
  }

  return {
    assistantContent: response.content,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: (toolUse as any).input,
  };
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
  let call = await callClaude(system, messages);
  let parsed = DraftSchema.parse(call.input);

  let passes = 1;
  let violations = checkHumanization(parsed.body);

  while (violations.length > 0 && passes < MAX_HUMANIZE_PASSES) {
    // Round-trip the assistant turn + a synthetic tool_result so the next
    // turn is a well-formed continuation of the structured-output flow.
    const toolUseId =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (call.assistantContent.find((b: any) => b.type === 'tool_use' && b.name === SUBMIT_DRAFT_TOOL.name) as any)
        ?.id;
    messages.push({ role: 'assistant', content: call.assistantContent });
    messages.push({
      role: 'user',
      content: [
        {
          type: 'tool_result',
          tool_use_id: toolUseId,
          content: buildFixPrompt(formatViolations(violations)),
          is_error: true,
        },
      ],
    });
    call = await callClaude(system, messages);
    parsed = DraftSchema.parse(call.input);
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
