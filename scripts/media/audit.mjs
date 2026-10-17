#!/usr/bin/env node
// Objective checks on the placed media. Exits 1 when any check fails.
//
//   node scripts/media/audit.mjs                 everything
//   node scripts/media/audit.mjs --only <substr> restrict file checks to paths containing <substr>
//   node scripts/media/audit.mjs --usage         also print the photo usage histogram
//
// Checks
//   additive   removing every <!--sjm--> block gives back the baseline bytes (--base <dir> of snapshotted partials;
//              mismatches are warnings, --strict makes them failures; without --base this check is skipped)
//   refs       every /assets/media/... reference in partials, TSX, TS and CSS exists in public/
//   img        every <img> inside a block has alt, width, height, decoding and loading/fetchpriority
//   copy       no em dashes, arrows or banned filler inside blocks (docs/humanization-guide.md)
//   region     photos on region-specific pages come from that region or are neutral/event
//   repeat     no photo twice on one page; at most MAX_BLOCKS blocks on a templated page
//   collide    blocks avoid attributes the legacy scripts hook into

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, arg, readCatalog } from './lib.mjs';
import { PARTIALS, stripMedia } from './inject-lib.mjs';

const only = arg('only', null);
const usage = arg('usage', false) === true;
const baseDir = arg('base', null);
const strict = arg('strict', false) === true;
const warnings = [];
const catalog = readCatalog();
const placeOf = Object.fromEntries(catalog.photos.map((p) => [p.id, p.place]));
const failures = [];
const fail = (check, where, msg) => failures.push(`[${check}] ${where}: ${msg}`);

const BLOCK_RE = /<!--sjm:([\w.:-]+)-->([\s\S]*?)<!--\/sjm:\1-->/g;
const BANNED = /—|&mdash;|–|&ndash;|→|←|⇒|&rarr;|&larr;|\b(game-changer|game changing|robust|cutting-edge|seamless(ly)?|delve[sd]?|delving|tapestry|in essence|leverage[sd]?)\b/i;
const MAX_BLOCKS_TEMPLATED = 3;

function git(args) {
  try {
    return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 26 });
  } catch {
    return null;
  }
}

const files = fs.readdirSync(PARTIALS).filter((f) => f.endsWith('-body.html')).sort();
const usageCount = {};
let blockTotal = 0;
let filesWithBlocks = 0;

const REGION_RULES = [
  [/(^|[-_])(korea|korean|seoul|kbw|kol-agency-korea)([-_.]|$)/, new Set(['neutral', 'event'])],
  [/(^|[-_])(india|indian)([-_.]|$)/, new Set(['neutral', 'event'])],
  [/(^|[-_])(hong-kong|hongkong|hk)([-_.]|$)/, new Set(['hong-kong', 'neutral', 'event'])],
  [/(^|[-_])(singapore)([-_.]|$)/, new Set(['singapore', 'neutral', 'event'])],
  [/(^|[-_])(japan|japanese|tokyo|webx)([-_.]|$)/, new Set(['neutral', 'event'])],
  [/(^|[-_])(dubai|uae|mena|vara|adgm|saudi|abu-dhabi|middle-east|gulf)([-_.]|$)/, new Set(['neutral', 'event'])],
  [/(^|[-_])(vietnam|thailand|usa|uk|us|europe|london|hong-kong|australia|canada|germany|france|brazil)([-_.]|$)/, new Set(['neutral', 'event'])],
];

for (const file of files) {
  if (only && only !== true && !file.includes(only)) continue;
  const rel = `app/_partials/${file}`;
  const html = fs.readFileSync(path.join(PARTIALS, file), 'utf8');
  const blocks = [...html.matchAll(BLOCK_RE)];
  if (blocks.length) filesWithBlocks += 1;
  blockTotal += blocks.length;

  // additive: stripped current == baseline snapshot
  if (baseDir && baseDir !== true) {
    const baseFile = path.join(baseDir, file);
    if (fs.existsSync(baseFile) && stripMedia(html) !== fs.readFileSync(baseFile, 'utf8')) {
      (strict ? fail : (c, w, m) => warnings.push(`[${c}] ${w}: ${m}`))('additive', rel, 'markup differs from the baseline once media blocks are removed (hand edit, or another session)');
    }
  }

  const seenPhotos = new Map();
  const keys = new Set();
  for (const [, key, body] of blocks) {
    if (keys.has(key)) fail('repeat', rel, `block key "${key}" appears twice`);
    keys.add(key);
    if (BANNED.test(body.replace(/<[^>]+>/g, ' '))) fail('copy', rel, `banned punctuation/word in block "${key}": ${body.replace(/<[^>]+>/g, ' ').match(BANNED)[0]}`);
    if (/data-(count|reveal|magnet)\b/.test(body)) fail('collide', rel, `block "${key}" uses a data-* hook the legacy scripts own`);
    for (const m of body.matchAll(/<img\b[^>]*>/g)) {
      const tag = m[0];
      for (const attr of ['alt', 'width', 'height', 'decoding']) {
        if (!new RegExp(`\\s${attr}=`).test(tag)) fail('img', rel, `<img> in "${key}" lacks ${attr}`);
      }
      if (!/\sloading=|\sfetchpriority=/.test(tag)) fail('img', rel, `<img> in "${key}" lacks loading/fetchpriority`);
    }
    for (const m of body.matchAll(/\/assets\/media\/photos\/([\w-]+?)-(wide|land|sq|port)-\d+\.webp/g)) {
      const id = m[1];
      seenPhotos.set(id, (seenPhotos.get(id) ?? new Set()).add(key));
      usageCount[id] = (usageCount[id] ?? 0) + 1;
    }
  }
  for (const [id, where] of seenPhotos) {
    if (where.size > 1) fail('repeat', rel, `photo "${id}" used in ${where.size} blocks (${[...where].join(', ')})`);
  }
  const templated = /^(pages__|article-)/.test(file);
  if (templated && blocks.length > MAX_BLOCKS_TEMPLATED) fail('repeat', rel, `${blocks.length} blocks on a templated page (max ${MAX_BLOCKS_TEMPLATED})`);

  // region: use the file name as the slug
  const slug = file.replace(/-body\.html$/, '').replace(/^pages__/, '');
  for (const [re, allowed] of REGION_RULES) {
    if (!re.test(slug)) continue;
    for (const id of seenPhotos.keys()) {
      if (!allowed.has(placeOf[id])) fail('region', rel, `photo "${id}" (${placeOf[id]}) on a region-specific page`);
    }
    break;
  }
}

// refs: every /assets/media/ path anywhere in source must exist
const SCAN_DIRS = ['app', 'components', 'lib', 'scripts/media'];
const REF_RE = /\/assets\/media\/[A-Za-z0-9_\-./]+\.(?:webp|jpg|jpeg|png|mp4|svg)/g;
function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full.includes(`${path.sep}i18n${path.sep}`) && dir.endsWith('_partials')) continue; // translation catalogues
      walk(full, out);
    } else if (/\.(html|tsx?|css|json|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}
const checked = new Set();
for (const dir of SCAN_DIRS) {
  for (const file of walk(path.join(ROOT, dir))) {
    const rel = path.relative(ROOT, file);
    if (only && only !== true && !rel.includes(only)) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(REF_RE)) {
      const ref = m[0];
      if (/[$`{]/.test(ref)) continue;
      const key = `${rel}:${ref}`;
      if (checked.has(key)) continue;
      checked.add(key);
      if (!fs.existsSync(path.join(ROOT, 'public', ref))) fail('refs', rel, `missing file ${ref}`);
    }
  }
}

console.log(`${filesWithBlocks} partial(s) carry media, ${blockTotal} block(s), ${checked.size} asset reference(s) checked.`);
if (usage) {
  console.log('\nPhoto usage (blocks):');
  for (const [id, n] of Object.entries(usageCount).sort((a, b) => b[1] - a[1])) console.log(`  ${id.padEnd(16)} ${String(n).padStart(4)}  (${placeOf[id]})`);
}
if (warnings.length) {
  console.warn(`\n${warnings.length} warning(s):`);
  for (const w of warnings.slice(0, 50)) console.warn(`  ${w}`);
}
if (failures.length) {
  console.error(`\n${failures.length} failure(s):`);
  for (const f of failures.slice(0, 200)) console.error(`  ${f}`);
  if (failures.length > 200) console.error(`  ... and ${failures.length - 200} more`);
  process.exit(1);
}
console.log('audit: all checks passed');
