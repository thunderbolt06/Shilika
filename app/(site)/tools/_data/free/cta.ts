import type { FreeTool, ToolGroup } from './types';

/**
 * Tool-specific "done for you" CTA. Each tool routes its visitor to the
 * service page that matches the job the tool helps with, so a founder who
 * arrives for a free utility sees the relevant paid service next.
 * Copy only names services that exist on the site. No new claims or numbers.
 */
export interface ToolCta {
  lead: string;
  links: { href: string; label: string }[];
}

const AI_SEARCH: ToolCta = {
  lead: 'Want ChatGPT, Perplexity and Google AI Overviews to name your company? AI-search visibility is built into my PR programs for',
  links: [
    { href: '/services/ai-startup-pr', label: 'AI startups' },
    { href: '/services/web3-pr-campaigns', label: 'Web3 projects' },
    { href: '/services/cybersecurity-pr', label: 'cybersecurity vendors' },
  ],
};

const WRITING: ToolCta = {
  lead: 'Want the words written for you? I ghostwrite op-eds, founder essays and whitepapers for AI, Web3 and cybersecurity teams.',
  links: [{ href: '/services/content-writing', label: 'See content writing' }],
};

const FOUNDER: ToolCta = {
  lead: 'Want journalists and podcast hosts to know your founder by name? That is what founder profiling is for.',
  links: [{ href: '/services/founder-profiling', label: 'See founder profiling' }],
};

const KOL: ToolCta = {
  lead: 'Running a social push around a launch? I plan and run KOL waves for Web3 and AI projects.',
  links: [{ href: '/services/kol-marketing', label: 'See KOL marketing' }],
};

const COVERAGE: ToolCta = {
  lead: 'Want coverage, not just a draft? I pitch launches to tier-1 crypto, AI and cybersecurity reporters.',
  links: [
    { href: '/services/web3-pr-campaigns', label: 'Web3 PR campaigns' },
    { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    { href: '/services/cybersecurity-pr', label: 'Cybersecurity PR' },
  ],
};

const LAUNCH: ToolCta = {
  lead: 'Planning spend around a token or product launch? I run launch PR end to end, from embargo to listing day.',
  links: [{ href: '/services/token-launch-pr', label: 'See token launch PR' }],
};

const GROWTH: ToolCta = {
  lead: 'Want a senior operator on the numbers and the story? I run PR and growth for funded AI and Web3 startups.',
  links: [
    { href: '/services/ai-startup-pr', label: 'AI startup PR' },
    { href: '/services/web3-pr-campaigns', label: 'Web3 PR campaigns' },
  ],
};

const BY_SLUG: Record<string, ToolCta> = {
  // PR and content
  'press-release-generator': COVERAGE,
  'journalist-pitch-email-builder': COVERAGE,
  'media-kit-builder': FOUNDER,
  'personal-brand-bio-writer': FOUNDER,
  'content-calendar-template': WRITING,
  'social-image-resizer': KOL,
  'image-compressor-converter': WRITING,
  // Everyday marketing
  'utm-builder': LAUNCH,
  'headline-analyzer': WRITING,
  'email-subject-line-tester': WRITING,
  'character-counter': FOUNDER,
  'bio-and-caption-generator': FOUNDER,
  'hashtag-generator': KOL,
  'qr-code-generator': KOL,
  'meta-title-description-checker': AI_SEARCH,
  // SEO and AI search
  'schema-markup-generator': AI_SEARCH,
  'llms-txt-generator': AI_SEARCH,
  'robots-txt-sitemap-generator': AI_SEARCH,
  'open-graph-preview': WRITING,
  'keyword-density-checker': WRITING,
  'ai-citability-checker': AI_SEARCH,
  'readability-checker': WRITING,
  // Calculators
  'roi-roas-calculator': GROWTH,
  'cpm-cpc-ctr-calculator': KOL,
  'ltv-cac-calculator': GROWTH,
  'ab-test-significance-calculator': WRITING,
  'ad-budget-planner': LAUNCH,
  'break-even-calculator': GROWTH,
};

const BY_GROUP: Record<ToolGroup, ToolCta> = {
  everyday: WRITING,
  seo: AI_SEARCH,
  calculators: GROWTH,
  pr: COVERAGE,
};

export function ctaFor(tool: Pick<FreeTool, 'slug' | 'group'>): ToolCta {
  return BY_SLUG[tool.slug] ?? BY_GROUP[tool.group];
}
