// Family "articles": the 122 playbook articles (app/_partials/article-N-body.html, served at
// /playbook/<slug> through app/playbook/<slug>/page.tsx and stripLegacyChrome()).
//
// Every article gets, in this order down the page:
//
//   1. band    (art-band)  photo band right after the article header, labelled for the topic
//                          cluster the article belongs to
//   2. mid     (art-mid)   one calm figure OR one pair of baked posters (OR the playable stage
//                          clip on the speaking-slots guide), placed before a section heading
//                          about half way down (a natural gap, never between a heading and its
//                          section). Skipped when an article is too short for one.
//   3. cta     (art-cta)   portrait CTA banner after the article, ahead of the existing end CTA
//
// Why these anchors survive stripLegacyChrome(): it only removes the legacy <nav> and <footer>
// and renames the .nav/.footer CSS selectors. </header>, </article> and the <h2> headings stay,
// and the scoped <style> carried by the band never uses the words nav or footer.
//
// Photo rules (hard rule 4): Singapore articles use the Singapore set or event/neutral photos;
// Korea, Japan, India, Dubai/MENA, Vietnam, USA and the two APAC overviews use event and neutral
// photos only, and no copy or alt text says where a photo was taken. Posters carry one baked
// photo each, so a poster pair only uses posters whose photo is allowed on that page, never one
// the page already shows, and never two photos from the same shoot.
//
// Rotation: photos are picked greedily by lowest weighted usage so far (a band counts more than
// a card photo, and each role is also spread on its own), with a small nudge toward photos that
// suit the topic (press lounge for media guides, stage stills for speaking and founder pieces,
// the TOKEN2049 hall for token launches). Ties are broken with hashPick(slug), region-bound
// articles pick first. Neighbouring covers never repeat a photo or a shoot, and one page avoids
// two photos from the same shoot where it can. The plan only reads file names (article number
// to slug) and the stripped partial, so it is stable between runs.
//
// Copy: one short label, title and sub per topic cluster (band), and one fixed caption, wall
// heading and CTA for every article, so the translated playbooks only gain a small set of
// strings. Every line restates something the site already prints (cards, posters, articles).

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readCatalog, readManifest } from '../lib.mjs';
import { listPartials, readPartial, stripMedia, hashPick } from '../inject-lib.mjs';
import { GRAPHICS } from '../graphics.config.mjs';

// ---------------------------------------------------------------------------------------------
// Article number to slug (from the route files) and the photo library
// ---------------------------------------------------------------------------------------------

const PLAYBOOK_DIR = path.join(ROOT, 'app', 'playbook');
const SLUG_OF = new Map();
for (const entry of fs.readdirSync(PLAYBOOK_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const page = path.join(PLAYBOOK_DIR, entry.name, 'page.tsx');
  if (!fs.existsSync(page)) continue;
  const m = /article-(\d+)-body\.html/.exec(fs.readFileSync(page, 'utf8'));
  if (m) SLUG_OF.set(Number(m[1]), entry.name);
}

const catalog = readCatalog();
const manifest = readManifest();
const PLACE = Object.fromEntries(catalog.photos.map((p) => [p.id, p.place]));
const IDS = catalog.photos.map((p) => p.id);
const has = (id, cropName) => Boolean(manifest[id]?.[cropName]);
const BAKED = Object.fromEntries(GRAPHICS.map((g) => [g.id, g.photo]));

// Photos from the same shoot look alike, so neighbours and one page avoid repeating a shoot.
const shoot = (id) => /^(sg-marina|sg-river|sg-bridge|stage)/.exec(id)?.[1] ?? id;

const articleNumber = (file) => Number(/^article-(\d+)-body\.html$/.exec(file)?.[1]);

// ---------------------------------------------------------------------------------------------
// Classification: region (strict photo rules) and topic cluster (copy and poster pairs)
// ---------------------------------------------------------------------------------------------

const REGIONS = [
  ['korea', /(^|-)korea(n)?(-|$)/],
  ['japan', /(^|-)japan(ese)?(-|$)/],
  ['mena', /(^|-)(dubai|mena|uae)(-|$)/],
  ['vietnam', /(^|-)vietnam(ese)?(-|$)/],
  ['usa', /(^|-)(usa|us|uk|europe|london)(-|$)/],
  ['india', /(^|-)india(n)?(-|$)/],
  ['singapore', /(^|-)singapore(-|$)/],
  ['apac', /^apac-|(^|-)apac(-|$)/],
];
const NEUTRAL_ONLY = ['neutral', 'event'];
const ALLOWED = {
  korea: NEUTRAL_ONLY,
  india: NEUTRAL_ONLY,
  japan: NEUTRAL_ONLY,
  mena: NEUTRAL_ONLY,
  vietnam: NEUTRAL_ONLY,
  usa: NEUTRAL_ONLY,
  apac: NEUTRAL_ONLY,
  singapore: ['singapore', ...NEUTRAL_ONLY],
  global: ['singapore', 'hong-kong', ...NEUTRAL_ONLY],
};
// The band prefers the region's own photos when the page is about that place.
const BAND_PREFERS = { singapore: 'singapore' };

// Order matters: the first match wins.
const TOPICS = [
  ['case', /^how-(gaia|rari)/],
  ['crisis', /crisis|breach/],
  ['pricing', /pricing|cost|rates|affordable|small-budget/],
  ['cyber', /cybersecurity|dark-reading/],
  ['geo', /ai-search|chatgpt|aeo-vs-seo/],
  ['measure', /measure|share-of-voice/],
  ['kol', /kol|influencer/],
  ['release', /press-release|op-eds-vs-press|free-token-listing/],
  ['ai', /(^|-)ai(-|$)|whitepaper/],
  ['press', /news-outlets/],
  ['sector', /defi|depin|gaming|infrastructure|crypto-exchange|rwa|restaking|zk-|nft|esg|sustainability/],
  ['token', /token|tge|airdrop|presale|launchpad|listing|stablecoin/],
  ['compare', /^best-|^top-|agency|agencies|checklist|reviews|publicist|mistakes|comparison/],
  ['fractional', /fractional/],
  ['founder', /founder|thought-leadership|personal-brand|podcast|op-ed|speaking|linkedin|forbes-councils|diy/],
  ['press', /how-to-(pitch|get)|get-featured|media-relations|coverage|tier-1|coindesk/],
];

export function classify(slug, h1 = '') {
  let region = REGIONS.find(([, re]) => re.test(slug))?.[0];
  // a slug without a place can still be about one (checked against the H1 as a second opinion)
  if (!region && h1) {
    const words = h1.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    region = REGIONS.find(([, re]) => re.test(words))?.[0];
  }
  if (region) return { region, cluster: region };
  const cluster = TOPICS.find(([, re]) => re.test(slug))?.[0] ?? 'strategy';
  return { region: 'global', cluster };
}

// ---------------------------------------------------------------------------------------------
// Copy. Eyebrow up to 3 words, title up to 9, sub up to 14. <em> only in titles.
// ---------------------------------------------------------------------------------------------

export const COPY = {
  // topic clusters
  pricing: { eyebrow: 'Pricing', title: 'What the retainer <em>actually</em> buys.', sub: 'Agency, fractional or sprint. Pick the model your stage can use.' },
  compare: { eyebrow: 'Agency choice', title: 'Choose a partner on <em>criteria</em>, not rankings.', sub: 'Named trade-offs, honest scope and the questions to ask first.' },
  fractional: { eyebrow: 'Fractional PR', title: 'Senior-operator PR without the <em>agency overhead</em>.', sub: 'One experienced operator, hands on, scoped to your stage.' },
  press: { eyebrow: 'Tier-1 access', title: 'Know the desk before you <em>pitch</em>.', sub: 'Forbes, CoinDesk, Cointelegraph, Decrypt and The Block.' },
  release: { eyebrow: 'Press releases', title: 'Write for the <em>journalist</em>, not the wire.', sub: 'Angle, timing and distribution that earn real pick-up.' },
  token: { eyebrow: 'Token launch', title: '<em>TGE</em> comms, exchange news and KOL waves.', sub: 'Pre-launch, launch week and the weeks after.' },
  sector: { eyebrow: 'Sector PR', title: 'Explain the <em>category</em> before you sell the product.', sub: 'Angles, outlets and proof points for your corner of Web3.' },
  crisis: { eyebrow: 'Crisis comms', title: 'Say it first, say it <em>plainly</em>.', sub: 'Holding statements, owned channels and who speaks first.' },
  ai: { eyebrow: 'AI PR', title: 'AI PR with <em>analyst-grade</em> credibility.', sub: 'Tier-1 AI coverage, plus the AI-search work that gets you cited.' },
  cyber: { eyebrow: 'Cybersecurity PR', title: 'Cybersecurity PR from a <em>senior operator</em>.', sub: 'Get cited by analysts and AI engines.' },
  geo: { eyebrow: 'AI search', title: 'Get cited where founders now <em>search</em>.', sub: 'Answer engines, citations and what moves them.' },
  measure: { eyebrow: 'Measurement', title: 'Track share of voice, not <em>vanity hits</em>.', sub: 'What to measure, what to ignore and how to report it.' },
  kol: { eyebrow: 'KOL marketing', title: 'Web3 KOL marketing with <em>200+</em> vetted creators.', sub: 'FTC-safe campaigns.' },
  founder: { eyebrow: 'Founder profiling', title: 'Op-eds, podcasts and a <em>category voice</em>.', sub: 'Positioning, bylines and speaking slots for Web3 and AI founders.' },
  strategy: { eyebrow: 'PR strategy', title: 'A plan a small team can <em>actually run</em>.', sub: 'Positioning, timing and channels for early-stage founders.' },
  // region clusters
  korea: { eyebrow: 'Korea', title: 'Korea PR: the <em>FSC frame</em> is paragraph one.', sub: 'BloomingBit, TokenPost and KBW Seoul.' },
  japan: { eyebrow: 'Japan', title: 'Japan PR: the <em>FSA frame</em> is paragraph one.', sub: 'CoinPost, Nikkei and WebX Tokyo.' },
  mena: { eyebrow: 'Dubai and MENA', title: 'Dubai and MENA PR: <em>VARA</em> is paragraph one.', sub: 'VARA, ADGM and RAK DAO.' },
  india: { eyebrow: 'India', title: 'India PR: own the <em>home market</em> first.', sub: 'Inc42, Economic Times and Forbes India.' },
  singapore: { eyebrow: 'Singapore', title: 'Singapore PR: the <em>MAS frame</em> is paragraph one.', sub: 'BT, DealStreetAsia and Token2049.' },
  apac: { eyebrow: 'APAC PR', title: 'APAC PR that is not a <em>translated</em> press release.', sub: 'Korea, Japan, India, Singapore and MENA.' },
  vietnam: { eyebrow: 'Vietnam', title: 'English-tier press needs a <em>Vietnamese-language layer</em>.', sub: 'Telegram and Zalo communities, local outlets and KOLs.' },
  usa: { eyebrow: 'US coverage', title: 'Reporter relationships beat a long <em>contact list</em>.', sub: 'CoinDesk, The Block, Blockworks, Decrypt and TechCrunch.' },
};
// The two case studies each get their own line (site facts: the og cards and the articles).
const CASE_COPY = {
  'how-gaia-ai-got-into-forbes': { eyebrow: 'Case study', title: 'How we placed the <em>Stripe for AI agents</em>.', sub: 'Gaia AI and the Forbes feature, step by step.' },
  'how-rari-chain-landed-11-tier1-placements': { eyebrow: 'Case study', title: 'One exclusive, <em>ten pre-briefed desks</em>.', sub: 'RARI Chain mainnet launch.' },
};

// One fixed caption, wall heading, video caption and CTA on every article (reused verbatim).
const FIGURE = { label: 'Shilika Jain', caption: 'Fractional PR for Web3 and AI founders.' };
const WALL_HEAD = { eyebrow: 'Track record', title: 'Six years, <em>counted</em>.' };
const VIDEO_CAPTION = 'On stage';

// Copy limits from the brief: eyebrow up to 3 words, title up to 9, sub up to 14. No dashes.
const words = (s) => s.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;
for (const [key, c] of [...Object.entries(COPY), ...Object.entries(CASE_COPY)]) {
  if (words(c.eyebrow) > 3 || words(c.title) > 9 || words(c.sub) > 14) throw new Error(`articles copy too long: ${key}`);
  if (/[–—→←]/.test(JSON.stringify(c))) throw new Error(`articles copy has a dash or arrow: ${key}`);
}

// ---------------------------------------------------------------------------------------------
// Posters for the mid block. A lead poster fits the topic, a partner is a stat or proof poster.
// Both are chosen so their baked photos are allowed on the page, differ, and are not one shoot.
// ---------------------------------------------------------------------------------------------

const STAT = ['poster-stat-placements', 'poster-stat-tier1', 'poster-stat-impressions', 'poster-stat-launches', 'poster-stat-countries'];
const LEAD = {
  pricing: ['poster-retainer'],
  compare: ['poster-teardown'],
  fractional: ['poster-retainer', 'poster-web3-pr'],
  press: ['poster-web3-pr'],
  release: ['poster-web3-pr'],
  token: ['poster-token-launch'],
  sector: ['poster-web3-pr'],
  crisis: ['poster-teardown'],
  ai: ['poster-ai-pr'],
  cyber: ['poster-cybersecurity'],
  geo: ['poster-ai-pr'],
  measure: [],
  kol: ['poster-kol'],
  founder: ['poster-founder-profiling', 'poster-speaker'],
  strategy: ['poster-web3-pr', 'poster-teardown'],
};
// A poster whose headline is the band headline of the same article is not shown on it (the page
// would print one sentence twice), so these are dropped from that cluster's leads.
const MIRRORED = {
  ai: 'poster-ai-pr',
  cyber: 'poster-cybersecurity',
  kol: 'poster-kol',
  token: 'poster-token-launch',
  founder: 'poster-founder-profiling',
};
// Pricing, crisis and other guides that sit in a different cluster than their topic lead with
// the matching poster instead.
const LEAD_BY_SLUG = {
  'crypto-influencer-pricing-rates-2026': ['poster-kol'],
  'cybersecurity-pr-agency-pricing-2026': ['poster-cybersecurity'],
  'ai-pr-agency-pricing-packages-2026': ['poster-ai-pr'],
  'token-launch-pr-campaign-cost-2026': ['poster-token-launch'],
  'kol-campaign-token-launch-2026': ['poster-token-launch'],
  'cybersecurity-breach-crisis-comms-2026': ['poster-cybersecurity'],
  'best-founder-personal-branding-agencies-2026': ['poster-founder-profiling'],
  'ai-thought-leadership-pr-2026': ['poster-founder-profiling'],
};
const REGION_PARTNERS = ['poster-teardown', 'poster-stat-countries'];
const WALL_SHARE = 40; // percent of eligible articles that get a poster pair instead of a figure
const POSTER_REPEAT = 3.2; // load added per earlier use of the same poster, so no poster repeats much

// ---------------------------------------------------------------------------------------------
// Which photos suit which topic (a nudge, not a rule) and a few fixed pairings
// ---------------------------------------------------------------------------------------------

const LIKES = {
  press: ['press-lounge'],
  release: ['press-lounge'],
  token: ['token2049-hall', 'depin-day-hk', 'stablecoin-summit'],
  sector: ['depin-day-hk', 'stablecoin-summit'],
  founder: ['stage-a', 'stage-b', 'lounge'],
  ai: ['stage-a', 'stage-b', 'library'],
  geo: ['library', 'lounge'],
  cyber: ['library'],
  crisis: ['library'],
  kol: ['sg-river-a', 'sg-river-b'],
  compare: ['press-lounge', 'lounge'],
};
const LIKE_BONUS = 2.2;

// The cases use the photo their share card uses; DePIN and stablecoin guides use the matching
// event wall; the speaking guide closes on a stage still (and carries the stage clip mid-page).
const FORCE = {
  'how-gaia-ai-got-into-forbes': { band: 'sg-marina-b' },
  'how-rari-chain-landed-11-tier1-placements': { band: 'sg-marina-d' },
  'depin-pr-strategy-2026': { band: 'depin-day-hk' },
  'stablecoin-launch-pr-2026': { band: 'stablecoin-summit' },
  'how-to-get-speaking-slots-crypto-conferences-2026': { cta: 'stage-a', mid: 'video' },
};

// Where the copy sits so the face stays clear of the scrim (checked by eye on the wide crops),
// and the focal point inside the band at desktop and phone widths.
export const BAND_ALIGN = {
  'depin-day-hk': 'right',
  'stablecoin-summit': 'left',
  library: 'left',
  lounge: 'left',
  'sg-marina-a': 'right',
  'sg-marina-b': 'left',
  'sg-marina-c': 'right',
  'sg-marina-d': 'right',
  'sg-bridge-b': 'right',
  'sg-river-a': 'left',
  'sg-river-b': 'left',
};

// ---------------------------------------------------------------------------------------------
// Page structure: where the mid block may go
// ---------------------------------------------------------------------------------------------

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const MIN_BODY = 14000; // characters of article markup before a mid block is worth adding
const MIN_H2 = 5;

/**
 * Headings that are direct children of the first <article>, so a block placed before one sits
 * between two sections and never inside an FAQ box, callout or list. Returns the position of the
 * heading that is closest to the middle of the article (leaving two sections on each side), or
 * null when the article is short.
 */
export function midAnchor(html) {
  const open = /<article\b[^>]*>/.exec(html);
  if (!open) return null;
  const start = open.index + open[0].length;
  const end = html.indexOf('</article>', start);
  if (end < 0 || end - start < MIN_BODY) return null;
  const mask = (m) => ' '.repeat(m.length);
  const body = html
    .slice(start, end)
    .replace(/<!--[\s\S]*?-->/g, mask)
    .replace(/<(script|style|svg|pre|code)\b[\s\S]*?<\/\1>/gi, mask);
  const stack = [];
  const heads = [];
  for (const m of body.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g)) {
    const name = m[2].toLowerCase();
    if (m[1] === '/') {
      const i = stack.lastIndexOf(name);
      if (i >= 0) stack.length = i;
    } else {
      if (name === 'h2' && stack.length === 0) heads.push(start + m.index);
      if (!VOID.has(name) && m[3] !== '/') stack.push(name);
    }
  }
  if (heads.length < MIN_H2) return null;
  const len = end - start;
  const usable = heads.slice(2, heads.length - 2);
  if (!usable.length) return null;
  let best = usable[0];
  for (const pos of usable) if (Math.abs((pos - start) / len - 0.5) < Math.abs((best - start) / len - 0.5)) best = pos;
  // `place` wants the occurrence index among all <h2 matches in the whole file
  const occurrence = [...html.matchAll(/<h2\b/g)].filter((m) => m.index < best).length;
  return { pos: best, occurrence };
}

// ---------------------------------------------------------------------------------------------
// The plan: one deterministic assignment of photos for all articles
// ---------------------------------------------------------------------------------------------

const FILES = listPartials((f) => /^article-\d+-body\.html$/.test(f)).sort((a, b) => articleNumber(a) - articleNumber(b));
const CROP = { band: 'wide', mid: 'land', cta: 'port' };
// How much visual weight a use carries (a full-bleed band counts more than a card photo), so the
// histogram balances what readers actually see and not just the number of placements.
const WEIGHT = { band: 3, mid: 1.3, cta: 1.7, baked: 1 };

/**
 * Two posters for a mid wall. The lead (topic or region poster, nudged ahead of the rest) and a
 * partner are the least-used eligible ones, so the baked photos balance with everything else.
 * `load(poster)` is the running weighted usage of the poster plus its baked photo.
 */
function posterPair(row, allowed, taken, load) {
  const { slug, region, cluster } = row;
  const okPoster = (p) => {
    const photo = BAKED[p];
    return photo && has(photo, 'port') && allowed.has(PLACE[photo]) && !taken.has(photo) && ![...taken].some((t) => shoot(t) === shoot(photo));
  };
  const leads = (LEAD_BY_SLUG[slug] ?? LEAD[cluster] ?? []).filter((p) => p !== MIRRORED[cluster]).filter(okPoster);
  const rank = (list, bonus = () => 0) =>
    [...list].sort((a, b) => load(a) - bonus(a) - (load(b) - bonus(b)) || hashPick(`${slug}:${a}`, 100003) - hashPick(`${slug}:${b}`, 100003));
  const sameShoot = (a, b) => shoot(BAKED[a]) === shoot(BAKED[b]);
  // region pages only carry place-neutral posters (their baked photo is event or neutral and
  // their text names no city); topic pages lead with their own poster unless a proof poster is
  // clearly less used
  const proof = region === 'global' ? STAT : REGION_PARTNERS;
  const firstPool = [...new Set([...leads, ...proof.filter(okPoster)])];
  if (!firstPool.length) return null;
  const leadBonus = LEAD_BY_SLUG[slug] ? 8 : 3;
  const first = rank(firstPool, (p) => (leads.includes(p) ? leadBonus : 0))[0];
  const partnerPool = proof.filter((p) => p !== first && okPoster(p) && !sameShoot(p, first));
  if (!partnerPool.length) return null;
  return [first, rank(partnerPool)[0]];
}

function buildPlan() {
  const usage = Object.fromEntries(IDS.map((id) => [id, 0]));
  const byRole = { band: {}, mid: {}, cta: {} }; // how often each photo already served each role
  const posterUse = {}; // how often each baked poster is already placed
  const plan = new Map();
  const rows = FILES.map((file) => {
    const n = articleNumber(file);
    const slug = SLUG_OF.get(n);
    if (!slug) throw new Error(`${file}: no app/playbook/<slug>/page.tsx loads this partial`);
    const base = stripMedia(readPartial(file));
    const h1 = (/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(base)?.[1] ?? '').replace(/<[^>]+>/g, ' ');
    return { file, n, slug, ...classify(slug, h1), hasMid: Boolean(midAnchor(base)) };
  });
  // Region-bound articles pick first (small pools), then topic articles in article order.
  rows.sort((a, b) => (a.region === 'global') - (b.region === 'global') || a.n - b.n);
  const bandOf = new Map(); // article number -> band photo, for the neighbour check

  for (const row of rows) {
    const { n, slug, region, cluster, hasMid } = row;
    const allowed = new Set(ALLOWED[region]);
    const force = FORCE[slug] ?? {};
    const used = new Set();
    const take = (id, role) => {
      used.add(id);
      usage[id] += WEIGHT[role];
      byRole[role][id] = (byRole[role][id] ?? 0) + 1;
      return id;
    };
    const pick = (role) => {
      if (force[role] && force[role] !== 'video') {
        if (!allowed.has(PLACE[force[role]]) || !has(force[role], CROP[role])) throw new Error(`${slug}: forced ${role} photo ${force[role]} not allowed`);
        return take(force[role], role);
      }
      const crop = CROP[role];
      let pool = IDS.filter((id) => has(id, crop) && allowed.has(PLACE[id]) && !used.has(id));
      const prefer = role === 'band' ? BAND_PREFERS[region] : null;
      if (prefer && pool.some((id) => PLACE[id] === prefer)) pool = pool.filter((id) => PLACE[id] === prefer);
      // soft rules, strongest first: a different shoot from the neighbouring covers, a new shoot
      // for this page, and no third photo of the same place (so one page never shows three
      // Singapore dresses in a row)
      const avoid = new Set();
      if (role === 'band') for (const k of [n - 1, n + 1, n - 2, n + 2]) if (bandOf.has(k)) avoid.add(shoot(bandOf.get(k)));
      const pageShoots = new Set([...used].map(shoot));
      const placeCount = {};
      for (const id of used) placeCount[PLACE[id]] = (placeCount[PLACE[id]] ?? 0) + 1;
      const ladder = [
        (id) => !avoid.has(shoot(id)) && !pageShoots.has(shoot(id)) && (placeCount[PLACE[id]] ?? 0) < 2,
        (id) => !avoid.has(shoot(id)) && !pageShoots.has(shoot(id)),
        (id) => !avoid.has(shoot(id)),
        (id) => !pageShoots.has(shoot(id)),
      ];
      for (const soft of ladder) {
        const kept = pool.filter(soft);
        if (kept.length) {
          pool = kept;
          break;
        }
      }
      // least-used first (overall weight, plus a push to spread each role), topic nudge, then hash
      const likes = role === 'band' ? [] : (LIKES[cluster] ?? []);
      const load = (id) => usage[id] + 0.75 * WEIGHT[role] * (byRole[role][id] ?? 0) - (likes.includes(id) ? LIKE_BONUS : 0);
      pool.sort((a, b) => load(a) - load(b) || hashPick(`${slug}:${role}:${a}`, 100003) - hashPick(`${slug}:${role}:${b}`, 100003));
      if (!pool.length) throw new Error(`${slug}: no ${role} photo left (region ${region})`);
      return take(pool[0], role);
    };

    // forced photos are reserved first so a poster pair cannot pick them up
    const band0 = force.band ? pick('band') : null;
    const cta0 = force.cta ? pick('cta') : null;

    // 1. decide the mid block: a poster pair fixes two baked photos
    let mid = null;
    if (hasMid && force.mid === 'video') {
      mid = { type: 'video' };
    } else if (hasMid && cluster !== 'case' && hashPick(`${slug}:mid-type`, 100) < WALL_SHARE) {
      const posters = posterPair(row, allowed, used, (p) => usage[BAKED[p]] + POSTER_REPEAT * (posterUse[p] ?? 0));
      if (posters) {
        mid = { type: 'wall', posters };
        for (const p of posters) {
          used.add(BAKED[p]);
          usage[BAKED[p]] += WEIGHT.baked;
          posterUse[p] = (posterUse[p] ?? 0) + 1;
        }
      }
    }
    // 2. band, then CTA, then the figure when the mid block is a figure
    const band = band0 ?? pick('band');
    bandOf.set(n, band);
    const cta = cta0 ?? pick('cta');
    if (hasMid && !mid) mid = { type: 'figure', id: pick('mid') };
    plan.set(n, { n, slug, region, cluster, band, cta, mid });
  }
  return { plan, usage };
}

// Built on first use, so running another family never pays for (or trips over) this plan.
let planned = null;
const getPlan = () => (planned ??= buildPlan());

/** For checks and the notes in the report: what this family decided per article. */
export function describePlan() {
  const { plan, usage } = getPlan();
  return { plan: [...plan.values()].sort((a, b) => a.n - b.n), usage };
}

// ---------------------------------------------------------------------------------------------
// Markup
// ---------------------------------------------------------------------------------------------

// Scoped to article pages (the block is only ever placed in article partials). It never uses the
// words nav or footer, which stripLegacyChrome() would rewrite inside a <style> element.
export const ART_CSS = `<style>
:is(.article-header, .case-header) ~ .sjm-band { max-height: 480px; }
:is(.article-header, .case-header) ~ .sjm-band .sjm-band__sub { text-wrap: balance; }
:is(.article-header, .case-header) ~ .sjm-band .sjm-band__pic img { object-position: 50% 50%; }
:is(.article-header, .case-header) ~ .sjm-band .sjm-band__pic img[src*="/depin-day-hk-"] { object-position: 50% 85%; }
.article-body .sjm-figure, .case-body .sjm-figure,
.article-body .sjm-wall, .case-body .sjm-wall { max-width: none; padding: 0; margin: 2.4em 0; }
.article-body .sjm-wall p, .case-body .sjm-wall p { margin: 0; }
.article-body .sjm-wall__head, .case-body .sjm-wall__head { margin-bottom: 16px; }
.article-body .sjm-video, .case-body .sjm-video { max-width: 320px; padding: 0; margin: 2.4em auto; }
:is(.article-body-wrap, .case-body-wrap) .sjm-cta { padding: 0; margin: clamp(48px, 6vw, 80px) 0 0; }
.sjm-cta__pic img[src*="/stage-a-"], .sjm-cta__pic img[src*="/stage-b-"] { object-position: 50% 0%; }
.sjm-cta__pic img[src*="/sg-marina-b-"] { object-position: 50% 75%; }
.sjm-cta__pic img[src*="/sg-marina-c-"] { object-position: 50% 65%; }
.sjm-cta__pic img[src*="/sg-marina-d-"] { object-position: 50% 70%; }
.sjm-cta__pic img[src*="/depin-day-hk-"] { object-position: 50% 60%; }
.sjm-cta__pic img[src*="/token2049-hall-"] { object-position: 50% 55%; }
@media (max-width: 720px) {
  :is(.article-header, .case-header) ~ .sjm-band { max-height: 500px; }
  :is(.article-header, .case-header) ~ .sjm-band:has(img[src*="/sg-marina-b-"], img[src*="/sg-marina-c-"], img[src*="/sg-marina-d-"]) .sjm-band__sub { display: none; }
}
</style>`;

const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function copyFor(entry) {
  return CASE_COPY[entry.slug] ?? COPY[entry.cluster];
}

export default {
  name: 'articles',
  describe: 'the 122 playbook articles: cover band, one mid figure, poster pair or clip, portrait CTA',
  files: () => FILES,

  apply(html, file, ctx) {
    const { band, figure, wall, video, ctaBand, block, place, pageTitle } = ctx;
    const n = articleNumber(file);
    const entry = getPlan().plan.get(n);
    if (!entry) throw new Error(`${file}: not in the articles plan`);
    const copy = copyFor(entry);
    if (!copy) throw new Error(`${file}: no copy for cluster "${entry.cluster}"`);
    const h1 = pageTitle(html);
    if (plain(copy.title) === h1) throw new Error(`${file}: band title repeats the H1`);

    let out = html;

    // mid block first: its anchor index was measured on the untouched file
    const mid = entry.mid ? midAnchor(html) : null;
    if (entry.mid && mid) {
      let markup;
      if (entry.mid.type === 'wall') {
        markup = wall({ eyebrow: WALL_HEAD.eyebrow, title: WALL_HEAD.title, items: entry.mid.posters.map((id) => ({ id })) });
      } else if (entry.mid.type === 'video') {
        markup = video({ id: 'speaker-reel', caption: VIDEO_CAPTION });
      } else {
        markup = figure({ id: entry.mid.id, label: FIGURE.label, caption: FIGURE.caption, sizes: '(min-width: 800px) 720px, 92vw' });
      }
      const r = place(out, 'art-mid', block('art-mid', markup), { before: /<h2\b/g, occurrence: mid.occurrence });
      if (!r.placed) throw new Error(`${file}: mid anchor not found`);
      out = r.html;
    }

    // band right after the article header
    const bandMarkup =
      band({ id: entry.band, eyebrow: copy.eyebrow, title: copy.title, sub: copy.sub, align: BAND_ALIGN[entry.band] ?? 'left' }) + `\n${ART_CSS}`;
    const rb = place(out, 'art-band', block('art-band', bandMarkup), { after: '</header>' });
    if (!rb.placed) throw new Error(`${file}: no </header> to anchor the band`);
    out = rb.html;

    // CTA after the article body, before the existing end CTA
    const rc = place(out, 'art-cta', block('art-cta', ctaBand({ id: entry.cta })), { after: '</article>' });
    if (!rc.placed) throw new Error(`${file}: no </article> to anchor the CTA`);
    out = rc.html;

    return out;
  },
};
