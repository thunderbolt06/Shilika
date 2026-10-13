/**
 * Segment-level HTML translation.
 *
 * The site's pages are English HTML partials. Rather than keeping a second,
 * hand-translated copy of each partial per language (which goes stale the
 * moment the English changes), we cut the English HTML into translatable
 * segments - one per block of running text - and look each one up in a
 * per-locale catalogue keyed by a hash of the English source.
 *
 *   - Markup, classes, scripts and inline CSS always come from the English
 *     partial, so layout fixes flow into every language for free.
 *   - A segment whose English text changed simply has no translation yet and
 *     renders in English until the catalogue is refreshed.
 *
 * Inline tags inside a segment are swapped for numbered placeholders so the
 * translator only sees `Coverage in <1>Forbes</1> and <2>CoinDesk</2>.` and
 * can reorder them freely without touching attributes.
 *
 * No imports besides node:crypto on purpose: scripts/i18n.mjs loads this file
 * directly with `node --experimental-strip-types`.
 */
import { createHash } from 'node:crypto';

const TOKEN_RE =
  /<!--[\s\S]*?-->|<(script|style|svg|pre|code)\b(?:"[^"]*"|'[^']*'|[^'">])*>[\s\S]*?<\/\1\s*>|<\/?[a-zA-Z](?:"[^"]*"|'[^']*'|[^'">])*>|[^<]+|</g;

// Tags that sit inside a run of text. Everything else ends the segment.
const INLINE = new Set([
  'a', 'abbr', 'b', 'bdi', 'cite', 'del', 'em', 'i', 'ins', 'kbd', 'mark', 'q', 's', 'small',
  'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'font', 'br', 'wbr', 'img',
]);
const VOID = new Set(['br', 'wbr', 'img']);
// Raw elements that still read as part of the surrounding sentence.
const OPAQUE_INLINE = new Set(['svg', 'code']);

const TEXT_ATTRS = /(\s(?:alt|title|placeholder|aria-label)=")([^"]*)(")/g;
const HAS_LETTER = /\p{L}/u;
const PLACEHOLDER = /<(\/?)(\d+)(\/?)>/g;

type Token =
  | { type: 'text'; raw: string }
  | { type: 'open' | 'close'; raw: string; name: string }
  | { type: 'void'; raw: string }
  | { type: 'block'; raw: string };

/** Returns the translation for a source string, or undefined to keep the English. */
export type Lookup = (id: string, source: string) => string | undefined;

export function segmentId(source: string): string {
  return createHash('sha1').update(source).digest('hex').slice(0, 10);
}

function tokenize(html: string): Token[] {
  const tokens: Token[] = [];
  for (const match of html.matchAll(TOKEN_RE)) {
    const raw = match[0];
    if (raw[0] !== '<' || raw === '<') {
      tokens.push({ type: 'text', raw });
    } else if (raw.startsWith('<!--')) {
      tokens.push({ type: 'void', raw });
    } else if (match[1]) {
      tokens.push({ type: OPAQUE_INLINE.has(match[1].toLowerCase()) ? 'void' : 'block', raw });
    } else {
      const name = /^<\/?([a-zA-Z0-9-]+)/.exec(raw)![1].toLowerCase();
      if (!INLINE.has(name)) tokens.push({ type: 'block', raw });
      else if (VOID.has(name) || raw.endsWith('/>')) tokens.push({ type: 'void', raw });
      else tokens.push({ type: raw[1] === '/' ? 'close' : 'open', raw, name });
    }
  }
  return tokens;
}

function translateAttrs(tag: string, lookup: Lookup): string {
  return tag.replace(TEXT_ATTRS, (match, pre: string, value: string, post: string) => {
    if (!HAS_LETTER.test(value)) return match;
    const translated = lookup(segmentId(value), value);
    return translated === undefined ? match : `${pre}${translated.replace(/"/g, '&quot;')}${post}`;
  });
}

/** Swap the numbered placeholders in a translation back for the original tags. */
function restore(translated: string, tags: Map<number, { open: string; close?: string }>): string | null {
  const open: number[] = [];
  let out = '';
  let last = 0;
  for (const match of translated.matchAll(PLACEHOLDER)) {
    out += translated.slice(last, match.index).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    last = match.index + match[0].length;
    const n = Number(match[2]);
    const tag = tags.get(n);
    if (!tag) return null;
    if (match[3]) {
      if (tag.close) return null;
      out += tag.open;
    } else if (match[1]) {
      if (open.pop() !== n || !tag.close) return null;
      out += tag.close;
    } else {
      if (!tag.close) return null;
      open.push(n);
      out += tag.open;
    }
  }
  if (open.length) return null;
  return out + translated.slice(last).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function flush(run: Token[], lookup: Lookup): string {
  const emit = (tokens: Token[]) =>
    tokens.map((t) => (t.type === 'text' ? t.raw : translateAttrs(t.raw, lookup))).join('');

  // Pair up open/close tags inside the run. Tags whose partner sits outside
  // the run (the run was cut by a block element) stay unpaired.
  const partner = new Map<number, number>();
  const stack: number[] = [];
  run.forEach((token, i) => {
    if (token.type === 'open') stack.push(i);
    else if (token.type === 'close') {
      const at = stack.findLastIndex((j) => (run[j] as { name: string }).name === token.name);
      if (at === -1) return;
      partner.set(stack[at], i);
      partner.set(i, stack[at]);
      stack.length = at;
    }
  });

  // Peel wrappers, icons and whitespace off both ends to find the text core.
  const peelable = (i: number) => {
    const token = run[i];
    if (token.type === 'text') return !token.raw.trim();
    return token.type === 'void' || !partner.has(i);
  };
  let lo = 0;
  let hi = run.length - 1;
  while (lo <= hi) {
    if (peelable(lo)) lo++;
    else if (peelable(hi)) hi--;
    else if (partner.get(lo) === hi) { lo++; hi--; }
    else break;
  }

  const core = run.slice(lo, hi + 1);
  if (!core.some((t) => t.type === 'text' && HAS_LETTER.test(t.raw))) return emit(run);

  const tags = new Map<number, { open: string; close?: string }>();
  const numberOf = new Map<number, number>();
  let n = 0;
  let source = '';
  core.forEach((token, offset) => {
    const i = lo + offset;
    if (token.type === 'text') {
      source += token.raw;
    } else if (token.type === 'open' && partner.has(i)) {
      n++;
      numberOf.set(partner.get(i)!, n);
      tags.set(n, { open: translateAttrs(token.raw, lookup), close: run[partner.get(i)!].raw });
      source += `<${n}>`;
    } else if (token.type === 'close' && partner.has(i)) {
      source += `</${numberOf.get(i)}>`;
    } else {
      n++;
      tags.set(n, { open: translateAttrs(token.raw, lookup) });
      source += `<${n}/>`;
    }
  });

  const lead = /^\s*/.exec(source)![0];
  const trail = /\s*$/.exec(source)![0];
  source = source.replace(/\s+/g, ' ').trim();

  const translated = lookup(segmentId(source), source);
  const restored = translated === undefined ? null : restore(translated, tags);
  if (restored === null) return emit(run);
  return emit(run.slice(0, lo)) + lead + restored + trail + emit(run.slice(hi + 1));
}

/** Walk the HTML, replacing every segment the lookup has a translation for. */
export function translateHtml(html: string, lookup: Lookup): string {
  let out = '';
  let run: Token[] = [];
  for (const token of tokenize(html)) {
    if (token.type !== 'block') {
      run.push(token);
      continue;
    }
    if (run.length) out += flush(run, lookup);
    run = [];
    // Raw elements (script, style, pre) pass through untouched.
    out += /^<(script|style|pre)\b/i.test(token.raw) ? token.raw : translateAttrs(token.raw, lookup);
  }
  if (run.length) out += flush(run, lookup);
  return out;
}

/** Every translatable segment in the HTML, as { id: englishSource }. */
export function extractSegments(html: string): Record<string, string> {
  const segments: Record<string, string> = {};
  translateHtml(html, (id, source) => {
    segments[id] = source;
    return undefined;
  });
  return segments;
}

/**
 * True when a translation uses exactly the placeholders its source does, in a
 * well-nested order. Used by scripts/i18n.mjs to reject broken catalogue rows.
 */
export function placeholdersMatch(source: string, translated: string): boolean {
  const list = (s: string) => [...s.matchAll(PLACEHOLDER)].map((m) => m[0]).sort().join('');
  if (list(source) !== list(translated)) return false;
  const open: string[] = [];
  for (const match of translated.matchAll(PLACEHOLDER)) {
    if (match[3]) continue;
    if (!match[1]) open.push(match[2]);
    else if (open.pop() !== match[2]) return false;
  }
  return open.length === 0;
}
