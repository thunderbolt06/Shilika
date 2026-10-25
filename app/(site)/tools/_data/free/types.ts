import type { Faq } from '../../_lib/seo';

export type ToolGroup = 'everyday' | 'seo' | 'calculators' | 'pr';

export const GROUPS: { id: ToolGroup; label: string; blurb: string }[] = [
  { id: 'everyday', label: 'Everyday marketing', blurb: 'Links, copy checks and social basics.' },
  { id: 'seo', label: 'SEO and AI search', blurb: 'Get found by Google, ChatGPT and Perplexity.' },
  { id: 'calculators', label: 'Calculators', blurb: 'Check the maths before you spend.' },
  { id: 'pr', label: 'PR and content', blurb: 'Press, pitches, bios and assets.' },
];

export interface FreeTool {
  slug: string;
  name: string;
  group: ToolGroup;
  /** One line for the /tools index card. */
  blurb: string;
  /** <title>, under ~60 characters before the " | Shilika Jain" suffix. */
  title: string;
  /** Meta description, 120 to 160 characters. */
  description: string;
  /** H1 split so the middle part renders in italics: [before, italic, after]. */
  h1: [string, string, string?];
  /** One or two sentences under the H1. */
  intro: string;
  /** Three short steps. */
  howto: string[];
  /** Three to four FAQs. Also emitted as FAQPage schema. */
  faqs: Faq[];
  /** Two or three internal links to services, playbooks or other tools. */
  related: { href: string; label: string }[];
  /** schema.org applicationCategory. */
  category?: string;
}
