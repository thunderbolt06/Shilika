/**
 * Build a hero image prompt suitable for Imagen 3 / Gemini Nano Banana 2.
 *
 * Constraints learned the hard way:
 *  - No people. Generated faces are uncanny on a personal brand site.
 *  - No text overlay. The renderer adds its own.
 *  - Editorial / magazine aesthetic, not stock-photo.
 *  - Lime accent + ink dark base to match the site palette.
 */

const PALETTE_RULES = `
Color palette: deep ink black (#16140f) base with cream paper (#f5f1e6) and a
single lime accent (#d4ff32). Subtle film grain. Editorial magazine aesthetic.
No bright photographic colors.
`.trim();

const FORMAT_RULES = `
1200x630 aspect ratio composition (OG image proportions).
Centered focal element with breathing room on the sides.
Suitable for cropping to social cards.
`.trim();

const BAN_LIST = `
Do NOT include: human faces, people, hands, stock-photo people, sales-deck
photography, text overlays, lens flare, glowing edges, mobile phone props,
laptop props, generic office settings.
`.trim();

export type HeroPromptInput = {
  title: string;
  description: string;
  tags?: string[];
  styleHint?: string;
};

export function buildHeroPrompt(input: HeroPromptInput): string {
  const focus = input.styleHint?.trim()
    ? input.styleHint.trim()
    : 'Abstract editorial illustration with geometric shapes, typographic textures, or symbolic objects that represent the article topic.';

  const tagLine = input.tags?.length
    ? `\nThematic anchor tags: ${input.tags.slice(0, 5).join(', ')}.`
    : '';

  return [
    `Hero image for a tech-business article titled "${input.title}".`,
    `Subject brief: ${input.description}.${tagLine}`,
    focus,
    PALETTE_RULES,
    FORMAT_RULES,
    BAN_LIST,
    'High quality, editorial style. Suitable for use as an OpenGraph image.',
  ].join('\n\n');
}
