// Placement helpers for the page partials in app/_partials.
//
// Rules the injector enforces so media can never damage a page:
//   1. Additive only. stripMedia(result) must equal stripMedia(original), so existing
//      markup and text (and therefore the translation hashes) never change.
//   2. Idempotent. Re-running replaces a block with the same key instead of stacking.
//   3. Reversible. `inject.mjs --revert` removes every block it ever placed.

import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

export const PARTIALS = path.join(ROOT, 'app', '_partials');

// A block is "\n<!--sjm:key-->...<!--/sjm:key-->" so removing it restores the exact bytes.
const BLOCK_RE = /\n<!--sjm:([\w.:-]+)-->[\s\S]*?<!--\/sjm:\1-->/g;

export function stripMedia(html) {
  return html.replace(BLOCK_RE, '');
}

export function hasBlock(html, key) {
  return html.includes(`<!--sjm:${key}-->`);
}

export function blockKeys(html) {
  return [...html.matchAll(/<!--sjm:([\w.:-]+)-->/g)].map((m) => m[1]);
}

function remove(html, key) {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return html.replace(new RegExp(`\\n<!--sjm:${esc}-->[\\s\\S]*?<!--\\/sjm:${esc}-->`, 'g'), '');
}

function locate(html, anchor, occurrence) {
  const re = anchor instanceof RegExp ? new RegExp(anchor.source, anchor.flags.includes('g') ? anchor.flags : anchor.flags + 'g') : null;
  const hits = [];
  if (re) {
    for (const m of html.matchAll(re)) hits.push({ index: m.index, length: m[0].length });
  } else {
    let from = 0;
    for (;;) {
      const i = html.indexOf(anchor, from);
      if (i === -1) break;
      hits.push({ index: i, length: anchor.length });
      from = i + anchor.length;
    }
  }
  if (!hits.length) return null;
  if (occurrence === 'last') return hits[hits.length - 1];
  if (typeof occurrence === 'number') return hits[occurrence] ?? null;
  return hits[0];
}

/**
 * Insert `markup` (already wrapped with block(key, ...)) next to an anchor.
 *   { after: string|RegExp }   place right after the matched text
 *   { before: string|RegExp }  place right before it
 * `occurrence`: 'first' (default) | 'last' | index. Returns { html, placed }.
 * Replaces an existing block with the same key first.
 */
export function place(html, key, markup, { after, before, occurrence = 'first' }) {
  const clean = remove(html, key);
  const anchor = after ?? before;
  const hit = locate(clean, anchor, occurrence);
  if (!hit) return { html: clean, placed: false };
  const at = after !== undefined ? hit.index + hit.length : hit.index;
  return { html: `${clean.slice(0, at)}\n${markup}${clean.slice(at)}`, placed: true };
}

export function listPartials(filter = () => true) {
  return fs
    .readdirSync(PARTIALS)
    .filter((f) => f.endsWith('-body.html'))
    .filter(filter)
    .sort();
}

export function readPartial(file) {
  return fs.readFileSync(path.join(PARTIALS, file), 'utf8');
}

export function writePartial(file, html) {
  fs.writeFileSync(path.join(PARTIALS, file), html);
}

/** First heading text of a partial (tags stripped), for matching topics to photos. */
export function pageTitle(html) {
  const m = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  return m ? m[1].replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim() : '';
}

/** Stable small integer from a string, so related pages pick different photos deterministically. */
export function hashPick(str, n) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % n;
}
