#!/usr/bin/env node
// thin-content-audit.mjs
// Dependency-free scaled/duplicate/thin content audit for shilikajain.com.
//
// Why this exists (Plan Week 12, item 12.3): "Identify bottom 20% pages,
// consolidate or noindex thin ones (site-wide CWV and quality signal)."
//
// Google's Optimizing-for-generative-AI guide (updated 2026-07-10) is explicit:
//   - "a high quantity of pages doesn't make a website higher quality" and
//     mass-producing pages for every query variation can trip the
//     scaled-content-abuse spam policy.
//   - "Reduce duplicate content."
// So the correct measurement is not raw word count (these pages are ~3.5k words)
// but the SHARED-BOILERPLATE RATIO across the programmatic /pages cluster: how
// much of each page is template repeated verbatim on its siblings vs genuinely
// unique, non-commodity content.
//
// Method (transparent + conservative):
//   1. Read every app/_partials/*-body.html, strip tags to visible text.
//   2. Split into normalized sentences (lowercased, punctuation-stripped,
//      whitespace-collapsed). Drop sentences < MIN_SENTENCE_WORDS words.
//   3. Within a cluster (default: the /pages/* landing pages), a sentence is
//      "boilerplate" if its normalized form appears on >= BOILERPLATE_MIN_PAGES
//      pages in that cluster. Exact-match only - this UNDER-counts near-duplicate
//      entity-swapped lines, so the unique ratio reported is a generous upper
//      bound on uniqueness (we never over-flag a page as duplicative).
//   4. uniqueRatio = uniqueSentenceWords / totalSentenceWords per page.
//   5. Rank, bucket (KEEP / REVIEW / CONSOLIDATE-OR-NOINDEX), and cross-check
//      sitemap inclusion.
//
// Output: CSV + Markdown summary under data/site-audit/. Read-only: this script
// makes NO edits to pages, sitemap, or robots. It only reports.
//
// Usage:
//   node scripts/thin-content-audit.mjs            # print summary to stdout
//   node scripts/thin-content-audit.mjs --write    # also write CSV + MD

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PARTIALS_DIR = path.join(ROOT, 'app/_partials');
const SITEMAP_FILE = path.join(ROOT, 'app/sitemap.ts');
const OUT_DIR = path.join(ROOT, 'data/site-audit');
const TODAY = new Date().toISOString().slice(0, 10);

const MIN_SENTENCE_WORDS = 4;       // ignore fragments / nav crumbs
const BOILERPLATE_MIN_PAGES = 8;    // sentence repeated on >= 8 /pages = template
const LOW_UNIQUE_RATIO = 0.35;      // below this = mostly template (flag)
const MID_UNIQUE_RATIO = 0.55;      // below this = review

const WRITE = process.argv.includes('--write');

// ---- helpers ---------------------------------------------------------------

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(text) {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

function sentences(text) {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeSentence(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function routeForBodyFile(name) {
  // name like "pages__nft-pr-agency-body.html" or "services__apac-pr-body.html"
  const base = name.replace(/-body\.html$/, '');
  if (base.startsWith('pages__')) return '/pages/' + base.slice('pages__'.length);
  if (base.startsWith('services__')) return '/services/' + base.slice('services__'.length);
  if (base.startsWith('work__')) return '/work/' + base.slice('work__'.length);
  if (base.startsWith('article-')) return '(playbook:' + base + ')';
  return '(' + base + ')';
}

// ---- load bodies -----------------------------------------------------------

const files = fs
  .readdirSync(PARTIALS_DIR)
  .filter((f) => f.endsWith('-body.html'));

const pages = files.map((f) => {
  const html = fs.readFileSync(path.join(PARTIALS_DIR, f), 'utf8');
  const text = stripHtml(html);
  const route = routeForBodyFile(f);
  const sents = sentences(text)
    .map((s) => ({ raw: s, norm: normalizeSentence(s) }))
    .filter((s) => s.norm.split(' ').length >= MIN_SENTENCE_WORDS);
  return {
    file: f,
    route,
    cluster: route.startsWith('/pages/') ? 'pages'
      : route.startsWith('/services/') ? 'services'
      : route.startsWith('(playbook') ? 'playbook'
      : 'other',
    words: wordCount(text),
    sents,
  };
});

// ---- sitemap membership ----------------------------------------------------

let sitemapText = '';
try { sitemapText = fs.readFileSync(SITEMAP_FILE, 'utf8'); } catch { /* ignore */ }
function inSitemap(route) {
  if (route.startsWith('(')) return null; // unknown mapping
  return sitemapText.includes(`'${route}'`) || sitemapText.includes(`"${route}"`);
}

// ---- boilerplate detection within the /pages cluster -----------------------

const cluster = pages.filter((p) => p.cluster === 'pages');

const freq = new Map(); // normalized sentence -> count of distinct pages
for (const p of cluster) {
  const seen = new Set();
  for (const s of p.sents) {
    if (seen.has(s.norm)) continue;
    seen.add(s.norm);
    freq.set(s.norm, (freq.get(s.norm) || 0) + 1);
  }
}
const boilerplate = new Set(
  [...freq.entries()].filter(([, c]) => c >= BOILERPLATE_MIN_PAGES).map(([s]) => s)
);

for (const p of cluster) {
  let uniqueWords = 0;
  let boilerWords = 0;
  const seen = new Set();
  for (const s of p.sents) {
    const w = s.norm.split(' ').length;
    if (boilerplate.has(s.norm)) boilerWords += w;
    else if (!seen.has(s.norm)) { uniqueWords += w; seen.add(s.norm); }
    else { boilerWords += w; } // intra-page repeat counts as non-unique
  }
  const total = uniqueWords + boilerWords || 1;
  p.uniqueWords = uniqueWords;
  p.boilerWords = boilerWords;
  p.uniqueRatio = uniqueWords / total;
  p.bucket = p.uniqueRatio < LOW_UNIQUE_RATIO ? 'CONSOLIDATE_OR_NOINDEX'
    : p.uniqueRatio < MID_UNIQUE_RATIO ? 'REVIEW'
    : 'KEEP';
}

cluster.sort((a, b) => a.uniqueRatio - b.uniqueRatio);

// ---- site-wide depth ranking (bottom 20% by words, mappable routes) --------

const mappable = pages.filter((p) => !p.route.startsWith('(') || p.cluster === 'playbook');
const byDepth = [...pages].sort((a, b) => a.words - b.words);
const bottomN = Math.max(1, Math.round(byDepth.length * 0.2));
const bottom20 = byDepth.slice(0, bottomN);

// ---- report ----------------------------------------------------------------

const clusterAvgUnique = cluster.reduce((s, p) => s + p.uniqueRatio, 0) / (cluster.length || 1);
const buckets = { KEEP: 0, REVIEW: 0, CONSOLIDATE_OR_NOINDEX: 0 };
for (const p of cluster) buckets[p.bucket]++;
const boilerplateLines = [...freq.entries()]
  .filter(([, c]) => c >= BOILERPLATE_MIN_PAGES)
  .sort((a, b) => b[1] - a[1]);

const lines = [];
lines.push(`# Thin / scaled / duplicate content audit - ${TODAY}`);
lines.push('');
lines.push(`Plan Week 12, item 12.3 (identify bottom 20% pages; consolidate or noindex thin ones).`);
lines.push(`Grounded in Google's Optimizing-for-generative-AI guide (updated 2026-07-10): scaled-content-abuse + reduce-duplicate-content.`);
lines.push('');
lines.push(`- Body partials scanned: ${pages.length}`);
lines.push(`- /pages programmatic cluster: ${cluster.length} pages`);
lines.push(`- Boilerplate sentences (repeated on >= ${BOILERPLATE_MIN_PAGES} /pages): ${boilerplate.size}`);
lines.push(`- Cluster mean unique-content ratio: ${(clusterAvgUnique * 100).toFixed(1)}%`);
lines.push(`- Cluster buckets: KEEP ${buckets.KEEP} | REVIEW ${buckets.REVIEW} | CONSOLIDATE_OR_NOINDEX ${buckets.CONSOLIDATE_OR_NOINDEX}`);
lines.push('');
lines.push(`## /pages cluster - lowest unique-content ratio (highest scaled-content risk)`);
lines.push('');
lines.push('| Route | Words | Unique words | Unique ratio | Bucket | In sitemap |');
lines.push('|---|---:|---:|---:|---|---|');
for (const p of cluster.slice(0, 30)) {
  lines.push(`| ${p.route} | ${p.words} | ${p.uniqueWords} | ${(p.uniqueRatio * 100).toFixed(0)}% | ${p.bucket} | ${inSitemap(p.route) ? 'yes' : 'no'} |`);
}
lines.push('');
lines.push(`## Top shared boilerplate sentences (verbatim, across the cluster)`);
lines.push('');
for (const [s, c] of boilerplateLines.slice(0, 15)) {
  lines.push(`- (${c}x) ${s.slice(0, 90)}`);
}
lines.push('');
lines.push(`## Site-wide bottom 20% by raw word count (${bottom20.length} of ${byDepth.length} partials)`);
lines.push('');
lines.push('| Route | Words |');
lines.push('|---|---:|');
for (const p of bottom20.slice(0, 30)) {
  lines.push(`| ${p.route} | ${p.words} |`);
}
lines.push('');

const md = lines.join('\n');
console.log(md);

if (WRITE) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const csvRows = ['route,cluster,words,unique_words,boiler_words,unique_ratio,bucket,in_sitemap'];
  for (const p of pages) {
    const ur = p.uniqueRatio != null ? p.uniqueRatio.toFixed(4) : '';
    const uw = p.uniqueWords != null ? p.uniqueWords : '';
    const bw = p.boilerWords != null ? p.boilerWords : '';
    const bk = p.bucket || '';
    const sm = inSitemap(p.route);
    csvRows.push([p.route, p.cluster, p.words, uw, bw, ur, bk, sm == null ? '' : sm].join(','));
  }
  fs.writeFileSync(path.join(OUT_DIR, `${TODAY}-thin-content-audit.csv`), csvRows.join('\n'));
  fs.writeFileSync(path.join(OUT_DIR, `${TODAY}-thin-content-audit.md`), md);
  console.error(`\n[written] ${path.relative(ROOT, OUT_DIR)}/${TODAY}-thin-content-audit.{csv,md}`);
}
