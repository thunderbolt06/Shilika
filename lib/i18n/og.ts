import graphics from '@/lib/media/graphics.json';
import { OG_HEIGHT, OG_WIDTH, cardFor, cardPath } from '../../scripts/media/og-map.mjs';

/**
 * Share image of a translated route. A translated page shares the card of its English route
 * (zh/ko/ja/es/ru read the same mapping as the English page.tsx files), so the preview matches
 * whichever language the link is opened in. The mapping lives in scripts/media/og-map.mjs.
 */
export type OgImage = { url: string; width: number; height: number; alt: string };

const ALT = graphics as Record<string, { alt: string }>;

/** `route` is the English path (e.g. "/playbook/crypto-pr-cost-2026"); `origin` is the site origin. */
export function ogImage(route: string, origin: string): OgImage {
  const card = cardFor(route);
  return {
    url: `${origin}${cardPath(card)}`,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt: ALT[`og-${card}`]?.alt ?? 'Shilika Jain, fractional PR for Web3 and AI founders',
  };
}
