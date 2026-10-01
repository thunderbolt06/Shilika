#!/usr/bin/env node
/**
 * ai-citation-rollup.mjs - AI Citation Buyer Panel rollup + comparison engine
 * (Plan Week 9.1 / Week 12 measurement - data/ai-citation-panel)
 *
 * Reads every result CSV under data/ai-citation-panel/results/** and rolls it up:
 *   - surface/citation rate per engine and per bucket
 *   - Shilika "winning pages": URLs ranked by how many distinct prompts surface them
 *   - competitor share of voice (frequency across prompts)
 *   - baseline-vs-latest delta when two or more dates exist for an engine
 *
 * It understands two row schemas and normalises them into one record shape:
 *   1. AI-engine log (results/<engine>/<date>.csv), header:
 *      prompt_id,engine,run_number,run_date_iso,shilika_cited,shilika_in_body,
 *      shilika_in_citation_list,shilika_citation_rank,shilika_url_cited,
 *      competitor_brands_cited,notes
 *   2. SERP discoverability log (results/serp-discoverability/<date>.csv), header:
 *      prompt_id,bucket,engine,run_date_iso,shilika_surfaced,shilika_urls,
 *      top_competitor_domains,notes
 *
 * Zero external deps. Usage:
 *   node scripts/ai-citation-rollup.mjs            # print rollup to stdout
 *   node scripts/ai-citation-rollup.mjs --write    # also write summary/<date>-rollup.md
 *
 * Exit codes: 0 = rollup produced, 1 = no result rows found (honest empty state).
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PANEL_DIR = path.join(ROOT, 'data', 'ai-citation-panel');
const RESULTS_DIR = path.join(PANEL_DIR, 'results');
const SUMMARY_DIR = path.join(PANEL_DIR, 'summary');
const PROMPTS_FILE = path.join(PANEL_DIR, 'prompts.json');

const WRITE = process.argv.includes('--write');

/** Minimal RFC-4180-ish CSV parser (handles quoted fields with commas). */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c === '\r') { /* ignore */ }
    else field += c;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.length > 1 || (r.length === 1 && r[0].trim() !== ''));
}

function walkCsvFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkCsvFiles(p));
    else if (entry.isFile() && entry.name.endsWith('.csv') && !entry.name.startsWith('_')) out.push(p);
  }
  return out;
}

const splitList = (s) => (s || '')
  .split(';')
  .map((x) => x.trim())
  .filter(Boolean);

/** Normalise one CSV file into common records: {promptId,bucket,engine,date,surfaced,urls[],competitors[]} */
function normaliseFile(file, promptBucket) {
  const rows = parseCsv(fs.readFileSync(file, 'utf8'));
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim());
  const idx = (name) => header.indexOf(name);
  const isSerp = header.includes('shilika_surfaced');
  const records = [];
  for (const r of rows.slice(1)) {
    const promptId = r[idx('prompt_id')]?.trim();
    if (!promptId) continue;
    const engine = r[idx('engine')]?.trim() || 'unknown';
    const date = r[idx('run_date_iso')]?.trim() || '';
    let surfaced;
    let urls;
    let competitors;
    if (isSerp) {
      surfaced = (r[idx('shilika_surfaced')] || '').trim().toLowerCase() === 'true';
      urls = splitList(r[idx('shilika_urls')]);
      competitors = splitList(r[idx('top_competitor_domains')]);
    } else {
      surfaced = (r[idx('shilika_cited')] || '').trim().toLowerCase() === 'true';
      const u = (r[idx('shilika_url_cited')] || '').trim();
      urls = u && u.toUpperCase() !== 'NA' ? [u] : [];
      competitors = splitList(r[idx('competitor_brands_cited')]);
    }
    records.push({
      promptId,
      bucket: promptBucket.get(promptId) || (idx('bucket') >= 0 ? r[idx('bucket')]?.trim() : 'unknown'),
      engine,
      date,
      surfaced,
      urls: urls.map((u) => u.replace(/^https?:\/\/(www\.)?shilikajain\.com/i, '') || '/'),
      competitors,
    });
  }
  return records;
}

function pct(n, d) { return d === 0 ? '0.0%' : `${((100 * n) / d).toFixed(1)}%`; }

function tallyTop(map, n = 12) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

// ---- load ----
const promptBucket = new Map();
const bucketPrompts = new Map();
let promptsMeta = null;
if (fs.existsSync(PROMPTS_FILE)) {
  promptsMeta = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf8'));
  for (const p of promptsMeta.prompts || []) {
    promptBucket.set(p.id, p.bucket);
    if (!bucketPrompts.has(p.bucket)) bucketPrompts.set(p.bucket, new Set());
    bucketPrompts.get(p.bucket).add(p.id);
  }
}

const files = walkCsvFiles(RESULTS_DIR);
const records = files.flatMap((f) => normaliseFile(f, promptBucket));

if (records.length === 0) {
  console.error('[ai-citation-rollup] No result rows found under', RESULTS_DIR);
  console.error('  Panel infrastructure exists but has not been run. Nothing to roll up.');
  process.exit(1);
}

const dates = [...new Set(records.map((r) => r.date).filter(Boolean))].sort();
const latestDate = dates[dates.length - 1];
const engines = [...new Set(records.map((r) => r.engine))].sort();

// per-engine surface rate (row-level)
const perEngine = new Map();
for (const e of engines) {
  const rs = records.filter((r) => r.engine === e);
  perEngine.set(e, { rows: rs.length, surfaced: rs.filter((r) => r.surfaced).length });
}

// per-bucket (unique prompts surfaced / prompts in bucket), latest date only
const latest = records.filter((r) => r.date === latestDate);
const perBucket = new Map();
for (const [bucket, set] of bucketPrompts.entries()) {
  const surfacedPrompts = new Set(latest.filter((r) => r.bucket === bucket && r.surfaced).map((r) => r.promptId));
  perBucket.set(bucket, { surfaced: surfacedPrompts.size, total: set.size });
}

// winning pages: URL -> distinct prompts surfaced (latest date)
const urlPrompts = new Map();
for (const r of latest) {
  for (const u of r.urls) {
    if (!urlPrompts.has(u)) urlPrompts.set(u, new Set());
    urlPrompts.get(u).add(r.promptId);
  }
}
const winningPages = [...urlPrompts.entries()]
  .map(([u, set]) => [u, set.size, [...set].sort().join(',')])
  .sort((a, b) => b[1] - a[1]);

// competitor SoV (latest date): domain -> distinct prompts
const compPrompts = new Map();
for (const r of latest) {
  for (const c of r.competitors) {
    if (!compPrompts.has(c)) compPrompts.set(c, new Set());
    compPrompts.get(c).add(r.promptId);
  }
}
const competitorSov = new Map([...compPrompts.entries()].map(([c, set]) => [c, set.size]));

// overall (latest date, unique prompts)
const latestPrompts = new Set(latest.map((r) => r.promptId));
const latestSurfacedPrompts = new Set(latest.filter((r) => r.surfaced).map((r) => r.promptId));

// baseline delta: compare two most recent dates for the same engine set
let deltaLine = 'No prior dated run to compare against (this is the baseline).';
if (dates.length >= 2) {
  const prev = dates[dates.length - 2];
  const prevSurf = new Set(records.filter((r) => r.date === prev && r.surfaced).map((r) => r.promptId));
  const delta = latestSurfacedPrompts.size - prevSurf.size;
  deltaLine = `${prev} -> ${latestDate}: surfaced prompts ${prevSurf.size} -> ${latestSurfacedPrompts.size} (${delta >= 0 ? '+' : ''}${delta}).`;
}

// ---- render ----
const L = [];
L.push(`# AI Citation Buyer Panel - rollup ${latestDate}`);
L.push('');
L.push(`Engines with data: ${engines.join(', ')}`);
L.push(`Dates present: ${dates.join(', ') || '(none)'}`);
L.push('');
L.push(`## Overall (latest run ${latestDate})`);
L.push(`- Prompts run: ${latestPrompts.size}`);
L.push(`- Prompts with >=1 Shilika surface: ${latestSurfacedPrompts.size} (${pct(latestSurfacedPrompts.size, latestPrompts.size)})`);
L.push(`- Baseline delta: ${deltaLine}`);
L.push('');
L.push('## Per engine (row-level surface rate)');
for (const [e, v] of perEngine.entries()) L.push(`- ${e}: ${v.surfaced}/${v.rows} (${pct(v.surfaced, v.rows)})`);
L.push('');
L.push('## Per bucket (unique prompts surfaced / prompts in bucket)');
for (const [b, v] of perBucket.entries()) L.push(`- ${b}: ${v.surfaced}/${v.total} (${pct(v.surfaced, v.total)})`);
L.push('');
L.push('## Winning pages (Shilika URL -> # prompts it surfaces on)');
if (winningPages.length === 0) L.push('- none surfaced');
for (const [u, n, ids] of winningPages) L.push(`- ${u} - ${n} prompt(s) [${ids}]`);
L.push('');
L.push('## Competitor share of voice (top, by # prompts appeared on)');
for (const [c, n] of tallyTop(competitorSov)) L.push(`- ${c}: ${n}`);
L.push('');
L.push(`_Generated ${new Date().toISOString().slice(0, 10)} by scripts/ai-citation-rollup.mjs from ${files.length} result file(s), ${records.length} row(s)._`);

const out = L.join('\n') + '\n';
process.stdout.write(out);

if (WRITE) {
  fs.mkdirSync(SUMMARY_DIR, { recursive: true });
  const dest = path.join(SUMMARY_DIR, `${latestDate}-rollup.md`);
  fs.writeFileSync(dest, out);
  console.error(`\n[ai-citation-rollup] wrote ${path.relative(ROOT, dest)}`);
}
