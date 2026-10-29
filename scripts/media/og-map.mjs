#!/usr/bin/env node
// Share-card mapping: which 1200x630 card goes on which route's og:image / twitter:image.
//
//   node scripts/media/og-map.mjs                     dry run: distribution + what would change
//   node scripts/media/og-map.mjs --apply             rewrite the page.tsx files and their JSON-LD images
//   node scripts/media/og-map.mjs --table             every route with its card and the rule that picked it
//   node scripts/media/og-map.mjs --card /korea       one route: card, rule, url, alt (add --json for machines)
//   node scripts/media/og-map.mjs --check             verify cards, alt text, JSON-LD image files, region rule, no old image
//   --only <path prefix>                              limit the dry run / --apply / --table to routes under that prefix
//   --include-excluded                                also touch the files another workstream owns (see EXCLUDED)
//
// The mapping is a pure function of the route path (`cardFor`). It is imported by the translated
// routes (lib/i18n/og.ts), by app/sitemap.ts and by scripts/wire-*.py (through --card --json),
// so there is exactly one place that decides a card. Nothing here runs on import: the CLI only
// starts when this file is the entry point.
//
// How a card is chosen, first match wins (see RULES below, `--table` prints the rule per route):
//   1. A named route has its own card (/, /about, /services, /work, /korea, ...).
//   2. /work/<case> uses the case study card; /services/<x> uses the cluster card of that service.
//   3. Index-style sections (glossary, compare, tools, resources, authors) use their section card.
//   4. Everywhere else (/pages, /playbook, /blog, /pitch) the slug decides:
//        a. a named case study in the slug (gaia-ai, rari-chain, ...) -> that case study card
//        b. a market in the slug (korea, japan, india, singapore, dubai/mena/uae) -> the market card;
//           two or more markets (korea-japan) or APAC/Vietnam -> the apac card (then see e.)
//        c. a topic keyword, in this order: agency decisions (compare), cyber, speaking, kol,
//           token launch, content, founder, web3 verticals, AI search (geo/aeo/chatgpt), "x vs y",
//           best/top lists (compare), ai, fractional and generic tech/b2b/saas (services)
//        d. otherwise the section default: /pages -> web3, /playbook -> playbook, /blog -> blog.
//        e. the place guard (PLACE_RULES): a slug that names a place keeps only cards whose photo may
//           be shown for that place (same table as audit.mjs REGION_RULES). Korea, India, Japan and
//           MENA cards use event/neutral photos already; a Vietnam, UK or USA page, or a Korea+Japan
//           page, would otherwise get a Singapore photo, so it gets the press card (Press Lounge).
//   Region cards win over topic cards on purpose: a page about Korea is shared as Korea.
//   A market only gets a market card when the slug names it, so the card photo never implies a
//   place the page is not about (the cards carry no claim about where a photo was taken).

import fs from 'node:fs';
import path from 'node:path';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
export const OG_DIR = '/assets/media/og';
export const LEGACY_IMAGE = '/assets/shilika-press-landscape-1200x628.jpg';
export const LOGO_IMAGE = '/assets/shilika-press-square-1200.jpg';
/** 1080x1350 portrait for the Person node of the homepage and About JSON-LD (Marina Bay, badge, face visible). */
export const PORTRAIT_IMAGE = '/assets/media/photos/sg-marina-c-port-1080.webp';
/** Portrait files an earlier attempt wrote that are gone from the library. Built from parts so audit.mjs does not flag the literal. */
const STALE_PORTRAITS = [`/assets/media/photos/${'sg-river-e-port-1080'}.webp`];
/** Another workstream owns these pages (AI SEO). The mapping still answers for them; the CLI leaves the files alone. */
export const EXCLUDED = ['app/(site)/services/ai-seo/'];
export const SITE = 'https://www.shilikajain.com';

/** Every card in public/assets/media/og (without .jpg). */
export const CARDS = [
  'home', 'about', 'services', 'work', 'work-bullieverse', 'work-fluence', 'work-gaia-ai',
  'work-mantra-chain', 'work-rari-chain', 'work-web3auth', 'web3', 'ai', 'cyber', 'token-launch',
  'kol', 'founder', 'content', 'apac', 'singapore', 'korea', 'india', 'japan', 'mena', 'playbook',
  'compare', 'glossary', 'tools', 'press', 'speaker', 'testimonials', 'contact', 'faq', 'blog',
  'resources',
];

const LOCALES = ['zh', 'ko', 'ja', 'es', 'ru'];

/** Routes with a card of their own. */
const ROUTES = {
  '/': ['home', 'Homepage'],
  '/about': ['about', 'About page'],
  '/services': ['services', 'Services overview'],
  '/work': ['work', 'Case study index'],
  '/contact': ['contact', 'Contact and booking'],
  '/faq': ['faq', 'FAQ'],
  '/press': ['press', 'Press and coverage'],
  '/speaker': ['speaker', 'Speaker page'],
  '/testimonials': ['testimonials', 'Testimonials'],
  '/apac': ['apac', 'APAC hub'],
  '/singapore': ['singapore', 'Singapore market page'],
  '/korea': ['korea', 'Korea market page'],
  '/india': ['india', 'India market page'],
  '/japan': ['japan', 'Japan market page'],
  '/dubai-mena': ['mena', 'Dubai and MENA market page'],
  '/playbook': ['playbook', 'Playbook index'],
  '/blog': ['blog', 'Blog index'],
  '/compare': ['compare', 'Agency comparison index'],
  '/glossary': ['glossary', 'Glossary index'],
  '/tools': ['tools', 'Free tools index'],
  '/resources': ['resources', 'Resources index'],
  '/pages': ['services', 'Landing page hub, shared as the services overview'],
  '/ads': ['home', 'Paid landing page, shared as the homepage'],
  '/thank-you': ['contact', 'Post-booking page, shared as the contact card (what app/(site)/thank-you/page.tsx uses)'],
  '/pitch/ai-pr': ['ai', 'AI PR pitch page'],
  '/pitch/web3-pr': ['web3', 'Web3 PR pitch page'],
};

/** /services/<slug> -> cluster card. */
const SERVICES = {
  'web3-pr-campaigns': 'web3',
  'token-launch-pr': 'token-launch',
  'ai-startup-pr': 'ai',
  'ai-seo': 'ai', // the ai card names the AI-search work
  'apac-pr': 'apac',
  'kol-marketing': 'kol',
  'cybersecurity-pr': 'cyber',
  'founder-profiling': 'founder',
  'content-writing': 'content',
};

/** Sections that always use their own card, whatever the slug says. */
const SECTION_CARD = {
  glossary: 'glossary',
  compare: 'compare',
  tools: 'tools',
  resources: 'resources',
  authors: 'about',
};

/** Sections where the slug is read for a case study, market or topic. */
const SLUG_SECTIONS = { pages: 'web3', playbook: 'playbook', blog: 'blog', pitch: 'home' };

const WORK_CASES = ['bullieverse', 'fluence', 'gaia-ai', 'mantra-chain', 'rari-chain', 'web3auth'];

// Slug patterns. `W` matches whole hyphen-separated words so "ai" never fires inside "email".
const W = (alts) => new RegExp(`(?:^|-)(?:${alts})(?:-|$)`);

const CASE_STUDY = [
  ['work-gaia-ai', W('gaia|gaia-ai')],
  ['work-rari-chain', W('rari|rari-chain')],
  ['work-mantra-chain', W('mantra|mantra-chain')],
  ['work-web3auth', W('web3auth')],
  ['work-fluence', W('fluence')],
  ['work-bullieverse', W('bullieverse')],
];

const MARKETS = [
  ['korea', W('korea|korean|seoul|kbw')],
  ['japan', W('japan|japanese|tokyo')],
  ['india', W('india|indian')],
  ['singapore', W('singapore|token2049')],
  ['mena', W('dubai|mena|uae|gcc|vara')],
];
const APAC = W('apac|vietnam');

/** Topic keywords, in priority order. Each entry is [card, rule id, pattern]. */
const TOPICS = [
  ['compare', 'topic:agency-decision', /(agency-comparison|reviews|how-to-choose|pr-agency-mistakes|-vs-agency|agency-vs-|vs-in-house|fractional-vs-)/],
  ['cyber', 'topic:cyber', W('cyber[a-z]*|infosec|threat|dark-reading|breach')],
  ['speaker', 'topic:speaking', W('speaking|speaker|keynotes?')],
  ['kol', 'topic:kol', W('kols?|influencer|telegram|community|memecoin')],
  ['token-launch', 'topic:token-launch', W('token-launch|tge|airdrop|presale|launchpad|ico-ido|listing|binance|stablecoin|exchange')],
  ['content', 'topic:content', W('ghostwrit[a-z]*|op-eds?|whitepaper|content-writing|content-marketing|press-releases?|essay')],
  ['founder', 'topic:founder', W('founders?|personal-brand|thought-leadership|executive|linkedin|podcast|media-training')],
  ['web3', 'topic:web3-vertical', W('defi|nft|depin|rwa|tokeniz[a-z]*|gaming|infrastructure|dao|layer2|metaverse|restaking|zk')],
  // AI-search words come before "x vs y" so "aeo-vs-seo" is shared as AI, not as a generic playbook.
  ['ai', 'topic:ai-search', W('geo|aeo|chatgpt|llm|generative')],
  ['playbook', 'topic:x-vs-y', W('vs')],
  ['compare', 'topic:best-list', /^(best|top)-/],
  ['ai', 'topic:ai', W('ai')],
  // Fractional work and generic tech, B2B and SaaS pages: the services card, not the AI card, because
  // the AI card headline says "AI PR" and these pages are not about AI.
  ['services', 'topic:fractional', W('fractional|retainer|when-to-hire|b2b|saas|deeptech|tech|fintech|enterprise|healthcare')],
];

/**
 * Where each card's photo was taken (the `place` of its photo in lib/media/catalog.json). Kept as a
 * literal so this module stays free of imports; `--check` compares it to graphics.config.mjs.
 */
export const CARD_PLACE = {
  home: 'singapore', about: 'neutral', services: 'singapore', work: 'event', web3: 'singapore', ai: 'event',
  cyber: 'neutral', 'token-launch': 'singapore', kol: 'singapore', founder: 'singapore', content: 'singapore',
  apac: 'singapore', singapore: 'singapore', korea: 'event', india: 'event', japan: 'neutral', mena: 'event',
  playbook: 'singapore', compare: 'singapore', glossary: 'neutral', tools: 'singapore', press: 'event',
  speaker: 'event', testimonials: 'singapore', contact: 'neutral', faq: 'neutral', blog: 'hong-kong',
  resources: 'event', 'work-bullieverse': 'neutral', 'work-fluence': 'hong-kong', 'work-gaia-ai': 'singapore',
  'work-mantra-chain': 'singapore', 'work-rari-chain': 'singapore', 'work-web3auth': 'singapore',
};

/**
 * The photo-matches-the-page rule, same table and same first-match order as REGION_RULES in
 * audit.mjs. [pattern over the slug, places whose photos may be shown, label].
 */
const PLACE_RULES = [
  [/(^|-)(korea|korean|seoul|kbw)(-|$)/, ['neutral', 'event'], 'korea'],
  [/(^|-)(india|indian)(-|$)/, ['neutral', 'event'], 'india'],
  [/(^|-)(hong-kong|hongkong|hk)(-|$)/, ['hong-kong', 'neutral', 'event'], 'hong-kong'],
  [/(^|-)singapore(-|$)/, ['singapore', 'neutral', 'event'], 'singapore'],
  [/(^|-)(japan|japanese|tokyo|webx)(-|$)/, ['neutral', 'event'], 'japan'],
  [/(^|-)(dubai|uae|mena|vara|adgm|saudi|abu-dhabi|middle-east|gulf)(-|$)/, ['neutral', 'event'], 'mena'],
  [/(^|-)(vietnam|thailand|usa|uk|us|europe|london|australia|canada|germany|france|brazil)(-|$)/, ['neutral', 'event'], 'other-place'],
];

/** The safe card when a slug names a place and the topic card's photo may not be shown there. */
const GUARD_CARD = 'press';

/** Returns an override when `card`'s photo may not be shown for the place the slug names. */
function placeGuard(slug, card) {
  for (const [re, allowed, label] of PLACE_RULES) {
    if (!re.test(slug)) continue;
    if (allowed.includes(CARD_PLACE[card])) return null;
    return {
      card: GUARD_CARD,
      rule: `guard:${label}`,
      why: `Slug names ${label} and the ${card} card photo is from ${CARD_PLACE[card]}, so the ${GUARD_CARD} card is used`,
    };
  }
  return null;
}

/** Normalise "/ko/korea/" -> "/korea". Locale prefixes share the English route's card. */
export function normalize(route) {
  let p = String(route).split(/[?#]/)[0].replace(/\/+$/, '').toLowerCase();
  if (!p.startsWith('/')) p = `/${p}`;
  const parts = p.split('/').filter(Boolean);
  if (parts.length && LOCALES.includes(parts[0])) parts.shift();
  return parts.length ? `/${parts.join('/')}` : '/';
}

/** Case study, market, topic or section default for the slug of a /pages, /playbook, /blog or /pitch route. */
function pickBySlug(section, slug) {
  for (const [card, re] of CASE_STUDY) {
    if (re.test(slug)) return { card, rule: 'case-study', why: 'Slug names a case study' };
  }
  const hits = MARKETS.filter(([, re]) => re.test(slug)).map(([name]) => name);
  if (hits.length === 1) return { card: hits[0], rule: `market:${hits[0]}`, why: `Slug names ${hits[0]}` };
  if (hits.length > 1) return { card: 'apac', rule: 'market:multi', why: `Slug names ${hits.join(' and ')}, so the APAC card` };
  if (APAC.test(slug)) return { card: 'apac', rule: 'market:apac', why: 'Slug names APAC or Vietnam' };
  for (const [card, rule, re] of TOPICS) {
    if (re.test(slug)) return { card, rule, why: `Slug matches ${rule.replace('topic:', '')} keywords` };
  }
  return { card: SLUG_SECTIONS[section], rule: `default:${section}`, why: `No keyword matched, /${section} default` };
}

/** Which card, and which rule picked it. */
export function explain(route) {
  const p = normalize(route);
  const [section, ...rest] = p.split('/').filter(Boolean);
  const slug = rest.join('-') || section || '';

  if (ROUTES[p]) return { card: ROUTES[p][0], rule: 'route', why: ROUTES[p][1] };

  if (section === 'work') {
    const card = WORK_CASES.includes(rest[0]) ? `work-${rest[0]}` : 'work';
    return { card, rule: 'work-case', why: 'Case study cards are named after the case' };
  }
  if (section === 'services') {
    const card = SERVICES[rest[0]] ?? 'services';
    return { card, rule: 'service', why: 'Each service page uses its cluster card' };
  }
  if (SECTION_CARD[section]) {
    return { card: SECTION_CARD[section], rule: `section:${section}`, why: `Everything under /${section} shares its section card` };
  }

  if (section in SLUG_SECTIONS) {
    const picked = pickBySlug(section, slug);
    return placeGuard(slug, picked.card) ?? picked;
  }

  return { card: 'home', rule: 'default', why: 'Unmapped route falls back to the homepage card' };
}

export function cardFor(route) {
  return explain(route).card;
}

export function cardPath(card) {
  return `${OG_DIR}/${card}.jpg`;
}

/** Absolute (or origin-relative when origin is '') URL of a card. */
export function cardUrl(card, origin = SITE) {
  return `${origin}${cardPath(card)}`;
}

// ---------------------------------------------------------------------------------------------
// CLI. Everything below only runs when this file is the entry point, never on import.
// ---------------------------------------------------------------------------------------------


function main() {
  const ROOT = path.resolve(path.dirname(process.argv[1]), '..', '..');
  const args = process.argv.slice(2);
  const flag = (name) => args.includes(`--${name}`);
  const value = (name) => {
    const i = args.indexOf(`--${name}`);
    return i !== -1 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : null;
  };

  const graphics = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib', 'media', 'graphics.json'), 'utf8'));
  const altFor = (card) => {
    const g = graphics[`og-${card}`];
    if (!g) throw new Error(`No share card "og-${card}" in lib/media/graphics.json`);
    return g.alt;
  };

  if (value('card')) {
    const route = value('card');
    const hit = explain(route);
    const info = { route, ...hit, path: cardPath(hit.card), url: cardUrl(hit.card), width: OG_WIDTH, height: OG_HEIGHT, alt: altFor(hit.card) };
    console.log(flag('json') ? JSON.stringify(info) : `${hit.card}\t${hit.rule}\t${hit.why}`);
    return;
  }

  const all = listPageFiles(ROOT);
  const held = flag('include-excluded') ? [] : all.filter((f) => EXCLUDED.some((x) => f.startsWith(x)));
  const prefix = value('only');
  const files = all.filter((f) => !held.includes(f) && (!prefix || routeOf(f).startsWith(prefix)));
  const plans = files.map((file) => plan(ROOT, file, altFor));

  if (flag('table')) {
    for (const p of plans) console.log(`${p.route.padEnd(58)} ${p.card.padEnd(18)} ${p.rule}`);
    return;
  }

  if (flag('check')) {
    check(ROOT, plans, altFor, held).then((ok) => process.exit(ok ? 0 : 1));
    return;
  }

  let changed = 0;
  let skipped = 0;
  const notes = [];
  for (const p of plans) {
    if (p.skip) {
      skipped += 1;
      notes.push(`${p.file}: ${p.skip}`);
      continue;
    }
    for (const out of p.outputs) {
      if (out.next !== out.prev) {
        changed += 1;
        if (flag('apply')) fs.writeFileSync(out.file, out.next);
      }
    }
  }

  printDistribution(plans);
  console.log(
    `\n${flag('apply') ? 'Wrote' : 'Would change'} ${changed} file(s) ` +
      `(${plans.length} page.tsx scanned, ${skipped} skipped, ${held.length} left to another workstream).` +
      (flag('apply') ? '' : ' Dry run. Pass --apply to write.'),
  );
  for (const n of notes) console.log(`  note: ${n}`);
  for (const f of held) console.log(`  held: ${f} (owned by another workstream, pass --include-excluded to map it)`);
}

// ---- file discovery --------------------------------------------------------------------------

/** page.tsx files that load a body partial. app/[locale] builds its own metadata and is skipped. */
function listPageFiles(ROOT) {
  const out = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === '[locale]' || entry.name === 'node_modules') continue;
        walk(full);
      } else if (entry.name === 'page.tsx' && fs.readFileSync(full, 'utf8').includes('_partials')) {
        out.push(path.relative(ROOT, full));
      }
    }
  };
  walk(path.join(ROOT, 'app'));
  return out.sort();
}

function routeOf(file) {
  // Route groups such as (site) are not part of the URL.
  const segments = path.dirname(file).split(path.sep).slice(1).filter((s) => !/^\(.*\)$/.test(s));
  return segments.length ? `/${segments.join('/')}` : '/';
}

// ---- planning --------------------------------------------------------------------------------

/** `src` with every `images: [...]` property removed: what must be byte-identical before and after a rewrite. */
function withoutImages(src) {
  let out = src;
  let from = 0;
  for (;;) {
    const m = /\bimages:\s*\[/.exec(out.slice(from));
    if (!m) return out;
    const start = from + m.index;
    const close = matchClose(out, start + m[0].length - 1);
    let end = close + 1;
    if (out[end] === ',') end += 1;
    out = out.slice(0, start) + out.slice(end);
    from = start;
  }
}

function plan(ROOT, file, altFor) {
  const route = routeOf(file);
  const hit = explain(route);
  const abs = path.join(ROOT, file);
  const prev = fs.readFileSync(abs, 'utf8');
  const result = { file, route, ...hit, outputs: [], skip: null };

  const next = rewriteMetadata(prev, hit.card, altFor(hit.card));
  if (next.error) {
    result.skip = next.error;
    return result;
  }
  // Titles, descriptions, URLs and everything else outside the images props must not move by a byte
  // (scripts/i18n.mjs reads the first title and description literal of each page.tsx).
  if (withoutImages(next.src) !== withoutImages(prev)) {
    result.skip = 'rewrite would change more than the images props, left untouched';
    return result;
  }
  result.outputs.push({ file: abs, prev, next: next.src });

  const ld = /_partials\/([\w-]+-jsonld\.json)/.exec(prev);
  if (ld) {
    const ldFile = path.join(ROOT, 'app', '_partials', ld[1]);
    if (fs.existsSync(ldFile)) {
      const ldPrev = fs.readFileSync(ldFile, 'utf8');
      const ldNext = rewriteJsonLd(ldPrev, hit.card);
      JSON.parse(ldNext); // must stay valid JSON
      result.outputs.push({ file: ldFile, prev: ldPrev, next: ldNext });
      result.jsonLd = ldFile;
    }
  }
  return result;
}

// ---- page.tsx rewriting ----------------------------------------------------------------------

const MANAGED = (text) => text.includes('shilika-press-landscape') || text.includes(`${OG_DIR}/`);

/** Index of the char after a string / template / comment that starts at src[i], or i if none starts there. */
function skipLiteral(src, i) {
  const c = src[i];
  if (c === '/' && src[i + 1] === '/') {
    const nl = src.indexOf('\n', i);
    return nl === -1 ? src.length : nl;
  }
  if (c === '/' && src[i + 1] === '*') {
    const end = src.indexOf('*/', i + 2);
    return end === -1 ? src.length : end + 2;
  }
  if (c === "'" || c === '"') {
    let j = i + 1;
    while (j < src.length) {
      if (src[j] === '\\') j += 2;
      else if (src[j] === c) return j + 1;
      else j += 1;
    }
    return src.length;
  }
  if (c === '`') {
    let j = i + 1;
    while (j < src.length) {
      if (src[j] === '\\') j += 2;
      else if (src[j] === '`') return j + 1;
      else if (src[j] === '$' && src[j + 1] === '{') j = matchClose(src, j + 1) + 1;
      else j += 1;
    }
    return src.length;
  }
  return i;
}

/** Index of the bracket that closes the one at src[open]. */
function matchClose(src, open) {
  const pairs = { '{': '}', '[': ']', '(': ')' };
  const stack = [pairs[src[open]]];
  let i = open + 1;
  while (i < src.length && stack.length) {
    const skipped = skipLiteral(src, i);
    if (skipped !== i) {
      i = skipped;
      continue;
    }
    const c = src[i];
    if (pairs[c]) stack.push(pairs[c]);
    else if (c === stack[stack.length - 1]) stack.pop();
    i += 1;
  }
  return i - 1;
}

const tsString = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function imagesProp({ indent, card, alt, style, kind }) {
  const url = style === 'template' ? `\`\${SITE_URL}${cardPath(card)}\`` : tsString(`${SITE}${cardPath(card)}`);
  const i1 = `${indent}  `;
  const i2 = `${indent}    `;
  const lines = [`${indent}images: [`, `${i1}{`, `${i2}url: ${url},`];
  if (kind === 'og') lines.push(`${i2}width: ${OG_WIDTH},`, `${i2}height: ${OG_HEIGHT},`);
  lines.push(`${i2}alt: ${tsString(alt)},`, `${i1}},`, `${indent}],`);
  return lines.join('\n');
}

/** Rewrite (or add) images in the openGraph block and rewrite the twitter block's images. */
function rewriteMetadata(src, card, alt) {
  let out = src;
  const fallbackStyle = /const SITE_URL\b/.test(src) ? 'template' : 'literal';

  for (const [key, kind] of [['openGraph', 'og'], ['twitter', 'tw']]) {
    const found = findBlock(out, key);
    if (!found) {
      if (kind === 'og') return { error: 'no openGraph block, left untouched' };
      continue; // Next copies the openGraph images into twitter when there is no twitter block
    }
    const block = out.slice(found.open, found.close + 1);
    const imgs = /\bimages:\s*\[/.exec(block);

    if (imgs) {
      const open = found.open + imgs.index + imgs[0].length - 1;
      const close = matchClose(out, open);
      const oldProp = out.slice(found.open + imgs.index, close + 1);
      if (!MANAGED(oldProp)) return { error: `${key}.images points at an unmanaged image, left untouched` };
      let end = close + 1;
      if (out[end] === ',') end += 1;
      const lineStart = out.lastIndexOf('\n', found.open + imgs.index) + 1;
      const indent = out.slice(lineStart, found.open + imgs.index);
      if (/\S/.test(indent)) return { error: `${key}.images is not on its own line` };
      const style = oldProp.includes('${SITE_URL}') ? 'template' : oldProp.includes('https://') ? 'literal' : fallbackStyle;
      out = out.slice(0, lineStart) + imagesProp({ indent, card, alt, style, kind }) + out.slice(end);
    } else if (kind === 'og') {
      // openGraph without images (the playbook index): add the property as the last entry.
      const closeLineStart = out.lastIndexOf('\n', found.close) + 1;
      const closeIndent = out.slice(closeLineStart, found.close);
      if (/\S/.test(closeIndent)) return { error: 'openGraph block closes on a line with other code, left untouched' };
      const sibling = /\n([ \t]+)\S/.exec(block);
      const indent = sibling ? sibling[1] : `${closeIndent}  `;
      let head = out.slice(0, closeLineStart).replace(/\s+$/, '');
      if (!head.endsWith(',')) head += ',';
      out = `${head}\n${imagesProp({ indent, card, alt, style: fallbackStyle, kind })}\n${closeIndent}${out.slice(found.close)}`;
    }
  }
  return { src: out };
}

function findBlock(src, key) {
  const m = new RegExp(`\\b${key}:\\s*\\{`).exec(src);
  if (!m) return null;
  const open = m.index + m[0].length - 1;
  return { open, close: matchClose(src, open) };
}

// ---- JSON-LD rewriting -----------------------------------------------------------------------

const IMG = `(?:https://www\\.shilikajain\\.com)?(?:${LEGACY_IMAGE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|${OG_DIR}/[a-z0-9-]+\\.jpg)`;

/**
 * Point every managed image URL in a JSON-LD file at the page's card. Logos get the square logo
 * file instead (a share card is not a logo), and a 1200x628 size next to a card becomes 1200x630.
 * Text-level on purpose, so unrelated formatting in the file stays byte for byte the same.
 */
export function rewriteJsonLd(text, card) {
  const url = cardUrl(card);
  let out = text.replace(
    new RegExp(`("logo"\\s*:\\s*\\{\\s*"@type"\\s*:\\s*"ImageObject"\\s*,\\s*"url"\\s*:\\s*")${IMG}(")`, 'g'),
    `$1${SITE}${LOGO_IMAGE}$2`,
  );
  out = out.replace(
    new RegExp(`("url"\\s*:\\s*")${IMG}("\\s*,\\s*"width"\\s*:\\s*)1200(\\s*,\\s*"height"\\s*:\\s*)(?:628|630)`, 'g'),
    `$1${url}$2${OG_WIDTH}$3${OG_HEIGHT}`,
  );
  out = out.replace(new RegExp(`("(?:image|primaryImageOfPage)"\\s*:\\s*")${IMG}(")`, 'g'), `$1${url}$2`);
  // Anything left (a logo written another way) is only touched when it still is the old file.
  out = out.replace(new RegExp(`https://www\\.shilikajain\\.com${LEGACY_IMAGE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g'), url);
  // A portrait path from an earlier photo set that is gone from the library (homepage and About Person node).
  for (const stale of STALE_PORTRAITS) out = out.split(`${SITE}${stale}`).join(`${SITE}${PORTRAIT_IMAGE}`);
  return out;
}

// ---- reporting -------------------------------------------------------------------------------

function clusterOf(route) {
  const [section, second] = route.split('/').filter(Boolean);
  if (!section) return 'home';
  if (section === 'pages') return 'pages/* (landing pages)';
  if (section === 'playbook') return second ? 'playbook/*' : 'playbook index';
  if (section === 'services') return second ? 'services/*' : 'top-level';
  if (section === 'work') return second ? 'work/* (case studies)' : 'top-level';
  if (['apac', 'singapore', 'korea', 'india', 'japan', 'dubai-mena'].includes(section)) return 'markets';
  return 'top-level';
}

function printDistribution(plans) {
  const clusters = new Map();
  const total = new Map();
  for (const p of plans) {
    const c = clusterOf(p.route);
    if (!clusters.has(c)) clusters.set(c, new Map());
    clusters.get(c).set(p.card, (clusters.get(c).get(p.card) ?? 0) + 1);
    total.set(p.card, (total.get(p.card) ?? 0) + 1);
  }
  const fmt = (m) => [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([k, v]) => `${k} ${v}`).join(', ');
  console.log(`Share card per cluster (${plans.length} page.tsx files)\n`);
  for (const [name, m] of [...clusters.entries()].sort()) {
    const n = [...m.values()].reduce((a, b) => a + b, 0);
    console.log(`${name.padEnd(26)} ${String(n).padStart(3)}  ${fmt(m)}`);
  }
  console.log(`\nAll clusters (${total.size} of ${CARDS.length} cards used): ${fmt(total)}`);
  const unused = CARDS.filter((c) => !total.has(c));
  if (unused.length) console.log(`Not used by these files (other families use them: blog, compare, glossary, tools, resources): ${unused.join(', ')}`);
}

/** [width, height] of a baseline JPEG, read from its SOF marker. */
function jpegSize(file) {
  const buf = fs.readFileSync(file);
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) return null;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  return null;
}

const BANNED_PUNCT = /—|–|→|←|⇒|&mdash;|&ndash;|&rarr;|&larr;/;

async function checkPlaces(ROOT, problems) {
  // CARD_PLACE must say what graphics.config.mjs and the photo catalog say.
  const { GRAPHICS } = await import(/* webpackIgnore: true */ path.join(ROOT, 'scripts', 'media', 'graphics.config.mjs'));
  const catalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib', 'media', 'catalog.json'), 'utf8'));
  const placeOfPhoto = Object.fromEntries(catalog.photos.map((p) => [p.id, p.place]));
  for (const g of GRAPHICS.filter((x) => x.group === 'og')) {
    const card = g.id.replace(/^og-/, '');
    if (!CARDS.includes(card)) problems.push(`graphics.config.mjs has share card og-${card} that CARDS does not list`);
    const real = placeOfPhoto[g.photo];
    if (CARD_PLACE[card] !== real) problems.push(`CARD_PLACE.${card} is "${CARD_PLACE[card]}" but photo ${g.photo} is "${real}" (update og-map.mjs)`);
  }
  for (const card of CARDS) if (!CARD_PLACE[card]) problems.push(`CARD_PLACE has no entry for ${card}`);
}

async function check(ROOT, plans, altFor, held = []) {
  const problems = [];
  for (const card of CARDS) {
    const file = path.join(ROOT, 'public', cardPath(card));
    if (!fs.existsSync(file)) {
      problems.push(`missing card file ${cardPath(card)}`);
    } else {
      const size = jpegSize(file);
      if (!size || size[0] !== OG_WIDTH || size[1] !== OG_HEIGHT) problems.push(`${cardPath(card)} is ${size ? size.join('x') : 'not a JPEG'}, expected ${OG_WIDTH}x${OG_HEIGHT}`);
    }
    try {
      const alt = altFor(card);
      if (BANNED_PUNCT.test(alt)) problems.push(`alt text of og-${card} has an em dash, en dash or arrow`);
    } catch (e) {
      problems.push(e.message);
    }
  }
  await checkPlaces(ROOT, problems);

  for (const p of plans) {
    if (p.skip) {
      if (!/no openGraph/.test(p.skip)) problems.push(`${p.file}: ${p.skip}`);
      continue;
    }
    for (const out of p.outputs) {
      if (out.next !== out.prev) problems.push(`${path.relative(ROOT, out.file)}: not up to date (run --apply)`);
    }
    const src = p.outputs[0].prev;
    if (src.includes('shilika-press-landscape')) problems.push(`${p.file}: still references the old share image`);
    const used = [...src.matchAll(new RegExp(`${OG_DIR}/([a-z0-9-]+)\\.jpg`, 'g'))].map((m) => m[1]);
    for (const u of used) if (u !== p.card) problems.push(`${p.file}: uses card ${u}, mapping says ${p.card}`);
    // A page without a twitter block gets its twitter image from openGraph (Next copies it, alt included).
    const wanted = findBlock(src, 'twitter') ? 2 : 1;
    if (used.length !== wanted) problems.push(`${p.file}: expected ${wanted} card reference(s) (openGraph${wanted === 2 ? ' and twitter' : ' only'}), found ${used.length}`);
    if (!new RegExp(`width: ${OG_WIDTH},\\s*height: ${OG_HEIGHT}`).test(src)) problems.push(`${p.file}: openGraph image lacks width ${OG_WIDTH} and height ${OG_HEIGHT}`);
    if ((src.match(/\balt:\s*'/g) ?? []).length < wanted) problems.push(`${p.file}: every card image needs alt text`);
    const slug = p.route.split('/').filter(Boolean).slice(1).join('-') || p.route.slice(1);
    const rule = PLACE_RULES.find(([re]) => re.test(slug));
    if (rule && !rule[1].includes(CARD_PLACE[p.card]) && !['route', 'service'].includes(p.rule)) {
      problems.push(`${p.file}: slug names ${rule[2]} but card ${p.card} shows a ${CARD_PLACE[p.card]} photo`);
    }
  }

  // Every image URL inside any JSON-LD partial (except the AI SEO ones) must exist on disk.
  const partials = path.join(ROOT, 'app', '_partials');
  for (const f of fs.readdirSync(partials).filter((x) => x.endsWith('-jsonld.json')).sort()) {
    const text = fs.readFileSync(path.join(partials, f), 'utf8');
    try {
      JSON.parse(text);
    } catch (e) {
      problems.push(`${f}: invalid JSON (${e.message})`);
      continue;
    }
    if (EXCLUDED.some((x) => f.startsWith(x.replace(/^app\/(\(site\)\/)?/, '').replace(/\/$/, '').replace(/\//g, '__')))) continue;
    for (const m of text.matchAll(/https:\/\/www\.shilikajain\.com(\/assets\/[^"\s]+\.(?:jpg|jpeg|png|webp|svg))/g)) {
      if (!fs.existsSync(path.join(ROOT, 'public', m[1]))) problems.push(`${f}: image ${m[1]} does not exist in public/`);
    }
  }

  if (problems.length) {
    console.log(`${problems.length} problem(s):`);
    for (const x of problems) console.log(`  ${x}`);
    for (const f of held) console.log(`  held: ${f} (another workstream)`);
    return false;
  }
  console.log(`OK: ${plans.length} page.tsx files, ${CARDS.length} cards exist (${OG_WIDTH}x${OG_HEIGHT}, alt text, photo places match graphics.config.mjs), JSON-LD images exist, nothing points at the old image.`);
  for (const f of held) console.log(`  held: ${f} (another workstream, still on the old image until it runs --include-excluded)`);
  return true;
}

// Start the CLI last, after every const above is initialised.
if (/(^|[\\/])og-map\.mjs$/.test(process.argv[1] ?? '')) main();
