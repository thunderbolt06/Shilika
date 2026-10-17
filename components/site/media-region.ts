/**
 * Which place a page is about, so a photo can never contradict it.
 *
 * Pure strings and regular expressions, no photo manifest: it is safe to import from a
 * client component (components/site/TalkPopup.tsx) as well as from Media.tsx.
 *
 * Rules (docs/media-system.md, rule 4):
 *   - a page about Singapore may use singapore, event and neutral photos
 *   - a page about Hong Kong may use hong-kong, event and neutral photos
 *   - a page about any other place, or about several places, uses event and neutral photos only
 *   - a page that names no place is global: any photo
 */

export type Place = 'singapore' | 'hong-kong' | 'event' | 'neutral';
/** Where a page is about. "other" is any place without photos of its own, or several places. */
export type Region = 'singapore' | 'hong-kong' | 'other';

const SINGAPORE = /\bsingapore\b/;
const HONG_KONG = /\b(hong kong|hongkong|hk)\b/;
const ELSEWHERE =
  /\b(korea|korean|seoul|kbw|india|indian|japan|japanese|tokyo|webx|dubai|uae|mena|vara|adgm|saudi|abu dhabi|middle east|gulf|vietnam|vietnamese|thailand|bangkok|usa|europe|london|australia|canada|germany|france|brazil|china|chinese|taiwan|indonesia|philippines|apac|asia)\b/;

/**
 * Region of a page from its slug (or path) plus any prose (title, tags). Text that names exactly
 * one of Singapore or Hong Kong gives that region; text that names any other place, or several,
 * gives "other"; text that names no place gives null. "US" and "UK" count only as capitals in
 * prose, or as a token of the slug, so the pronoun "us" never triggers them.
 */
export function regionOf(slug: string, ...prose: (string | null | undefined)[]): Region | null {
  const slugText = slug.toLowerCase().replace(/[-_/]+/g, ' ');
  const words = prose.filter(Boolean).join(' ');
  const text = `${slugText} ${words.toLowerCase()}`;
  const singapore = SINGAPORE.test(text);
  const hongKong = HONG_KONG.test(text);
  const elsewhere = ELSEWHERE.test(text) || /\b(US|UK)\b/.test(words) || /\b(us|uk)\b/.test(slugText);
  if (!singapore && !hongKong && !elsewhere) return null;
  if (singapore && !hongKong && !elsewhere) return 'singapore';
  if (hongKong && !singapore && !elsewhere) return 'hong-kong';
  return 'other';
}

/** May a photo of this place appear on a page of this region? */
export function placeAllowed(region: Region | null, place: Place): boolean {
  if (region === null) return true;
  if (place === 'neutral' || place === 'event') return true;
  return region === place;
}

/** Same FNV-1a pick the injector uses, so a page keeps the same photo between renders. */
export function hashPick(str: string, n: number): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % n;
}
