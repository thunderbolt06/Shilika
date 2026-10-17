// Family "landing": the 106 generated /pages/<slug> landing pages (app/_partials/pages__*-body.html).
//
// Every page comes from one template (hero, trust strip, press, six lp-sections, testimonials, lead
// form, cta strip), so the same three gaps carry the same three blocks everywhere:
//
//   landing:band   photo band with live text, right after the trust strip (under the hero)
//   landing:mid    one 16:10 figure, or a poster wall, between the 3rd and 4th lp-section
//   landing:cta    dark CTA banner with a portrait, right before the lead form
//
// What goes where is decided per cluster, never per page:
//
//   * 14 topic clusters (ai, aeo, cyber, tech, launch, exchange, kol, founder, content, gaming, infra,
//     fractional, compare, web3) plus two sub-topics that only steer the photo (stablecoin, depin).
//     A cluster owns one band label and title, one CTA title, a lead poster, and the photos that
//     suit it (token launch -> TOKEN2049 hall, thought leadership -> stage stills, stablecoin ->
//     Stablecoin Summit, DePIN -> DePIN Day Hong Kong, exchange news -> Press Lounge).
//   * 9 region clusters (singapore, korea, japan, india, mena, usa, uk, vietnam, apac, plus the
//     Korea and Japan double page). A region's band copy replaces the topic copy; a few region and
//     topic pairs have their own line (see BAND_OVERRIDES).
//
// Photo rules, enforced here and again by scripts/media/audit.mjs:
//   * Singapore photos stay on Singapore, global and APAC pages. Hong Kong (DePIN Day) stays off
//     pages about other places. Korea, Japan, India, MENA, US, UK and Vietnam pages get event and
//     neutral photos only, and nothing in the copy or the alt text says they were taken there.
//     A poster counts by the photo baked into it, so poster walls obey the same rules.
//   * A page never shows one photo twice (posters included) and never two look-alike frames
//     (the six Marina Bay shots, the two river shots and the two stage stills each count as one).
//
// Photos and posters are planned for all 106 pages together (see "Planning"), so the usage
// histogram stays flat and neighbouring pages differ. The plan depends only on the list of landing
// partials, never on their current content, which is what makes re-running the injector a no-op.

import { readCatalog, readManifest } from '../lib.mjs';
import { listPartials } from '../inject-lib.mjs';
import { GRAPHICS } from '../graphics.config.mjs';

const catalog = readCatalog();
const manifest = readManifest();
const PLACE = Object.fromEntries(catalog.photos.map((p) => [p.id, p.place]));
const ALL_PHOTOS = catalog.photos.map((p) => p.id);
const has = (id, crop) => Boolean(manifest[id]?.[crop]);

/** Poster id -> id of the photo baked into it. */
const POSTER_PHOTO = Object.fromEntries(GRAPHICS.filter((g) => /^poster-/.test(g.id)).map((g) => [g.id, g.photo]));

// ---------------------------------------------------------------------------------------------
// Photo facts
// ---------------------------------------------------------------------------------------------

const NEUTRAL = new Set(['neutral', 'event']);
const ANY = null;

/** Look-alike frames count as one photo on a page. */
const groupOf = (id) =>
  /^sg-(marina|bridge)-/.test(id) ? 'marina' : /^sg-river-/.test(id) ? 'river' : /^stage-/.test(id) ? 'stage' : id;

/** Band copy goes on the right where the subject stands left of centre in the 2.4:1 crop. */
const BAND_RIGHT = new Set(['sg-marina-a', 'sg-marina-c', 'sg-marina-d', 'sg-bridge-b']);

/**
 * object-position of the portrait inside the CTA frame (4:5 photo, shown 60 percent of its height):
 * centres the face. The stage stills carry the face near the top of the frame.
 */
const CTA_POS = {
  'press-lounge': '50% 58%',
  'depin-day-hk': '50% 78%',
  'stablecoin-summit': '50% 36%',
  'token2049-hall': '50% 34%',
  library: '50% 44%',
  lounge: '50% 32%',
  'sg-marina-a': '50% 50%',
  'sg-marina-b': '50% 55%',
  'sg-marina-c': '50% 55%',
  'sg-marina-d': '50% 55%',
  'sg-bridge-a': '50% 68%',
  'sg-bridge-b': '50% 34%',
  'sg-river-a': '50% 46%',
  'sg-river-b': '50% 44%',
  'stage-a': '50% 0%',
  'stage-b': '50% 0%',
};

/**
 * What the photo itself shows (signage, a stage), used as the figure caption. Photos without a
 * visible context get one of the generic captions below.
 */
const CONTEXT_CAPTION = {
  'token2049-hall': 'On the floor at TOKEN2049 Singapore.',
  'stablecoin-summit': 'At Stablecoin Summit 2023.',
  'depin-day-hk': 'At DePIN Day Hong Kong.',
  'press-lounge': 'In the Press Lounge at Consensus.',
  'stage-a': 'Speaking on stage.',
  'stage-b': 'Speaking on stage.',
};
const CAPTIONS = {
  senior: 'Senior operator, no account team.',
  years: 'Six years of Web3, crypto and AI PR.',
  placed: '50+ founders placed in Tier-1 outlets.',
  apac: 'Native access across six APAC markets.',
};
const CAPTION_SETS = { global: ['senior', 'years', 'placed'], apac: ['senior', 'apac'] };
const FIGURE_LABEL = 'Shilika Jain';
/** Low-resolution sources: shown in the narrow figure so they are never scaled up. */
const SOFT_PHOTOS = new Set(['token2049-hall', 'stage-a', 'stage-b']);

// ---------------------------------------------------------------------------------------------
// Regions
//   places  photo places allowed on the page (ANY = unrestricted)
//   own     photo place that counts as "from there" (those pages show it in every slot)
//   posters baked region posters that may open a wall on the page
// ---------------------------------------------------------------------------------------------

const REGIONS = {
  singapore: {
    re: /(^|-)singapore(-|$)/,
    places: new Set(['singapore', 'neutral', 'event']),
    own: 'singapore',
    cap: 'apac',
    posters: [], // the Singapore pages show the TOKEN2049 hall figure instead of a wall
    band: { eyebrow: 'Singapore PR', title: 'The <em>MAS frame</em> is paragraph one.', sub: 'The Business Times, DealStreetAsia and Token2049, in one plan.' },
    cta: "Let's plan your <em>Singapore</em> window.",
  },
  korea: {
    re: /(^|-)(korea|korean|seoul|kbw)(-|$)/,
    places: NEUTRAL,
    cap: 'apac',
    posters: ['poster-korea'],
    band: { eyebrow: 'Korea PR', title: 'The <em>FSC frame</em> is paragraph one.', sub: 'BloomingBit, TokenPost and KBW Seoul.' },
    cta: "Let's plan your <em>Korea</em> launch.",
  },
  japan: {
    re: /(^|-)(japan|japanese|tokyo|webx)(-|$)/,
    places: NEUTRAL,
    cap: 'apac',
    posters: ['poster-japan'],
    band: { eyebrow: 'Japan PR', title: '<em>FSA frame</em> first, then the named partner.', sub: 'CoinPost, Nikkei and WebX Tokyo.' },
    cta: "Let's plan your <em>Japan</em> launch.",
  },
  india: {
    re: /(^|-)(india|indian)(-|$)/,
    places: NEUTRAL,
    cap: 'apac',
    posters: ['poster-india'],
    band: { eyebrow: 'India PR', title: 'Win the <em>home market</em> before the re-report.', sub: 'Inc42, Economic Times and Forbes India.' },
    cta: "Let's plan your <em>India</em> launch.",
  },
  mena: {
    re: /(^|-)(dubai|uae|mena|vara|adgm|saudi|abu-dhabi|middle-east|gulf)(-|$)/,
    places: NEUTRAL,
    cap: 'apac',
    posters: ['poster-mena'],
    band: { eyebrow: 'MENA PR', title: '<em>VARA</em> is paragraph one.', sub: 'Regulators, local outlets and Token2049 Dubai timing in one plan.' },
    cta: "Let's plan your <em>MENA</em> launch.",
  },
  usa: {
    re: /(^|-)(usa|us|america)(-|$)/,
    places: NEUTRAL,
    cap: 'global',
    posters: [],
    band: { eyebrow: 'US PR', title: 'Cut through the <em>crowded</em> US crypto press.', sub: 'Pitched by a senior operator, not an account team.' },
    cta: "Let's plan your <em>US</em> push.",
  },
  uk: {
    re: /(^|-)(uk|europe|london)(-|$)/,
    places: NEUTRAL,
    cap: 'global',
    posters: [],
    band: { eyebrow: 'UK PR', title: 'UK and EU press from a <em>senior operator</em>.', sub: 'CoinDesk, City A.M. and the FT.' },
    cta: "Let's plan your <em>UK</em> push.",
  },
  vietnam: {
    re: /(^|-)(vietnam|thailand)(-|$)/,
    places: NEUTRAL,
    cap: 'apac',
    posters: [],
    band: { eyebrow: 'Vietnam PR', title: 'Native media access, not <em>translated</em> releases.', sub: 'CoinCu, BeInCrypto Vietnam and the leading Telegram communities.' },
    cta: "Let's plan your <em>Vietnam</em> launch.",
  },
  kjp: {
    re: null, // Korea plus Japan on one page
    places: NEUTRAL,
    cap: 'apac',
    posters: ['poster-korea', 'poster-japan'],
    band: { eyebrow: 'Korea and Japan', title: 'Two native markets, one <em>senior operator</em>.', sub: 'BloomingBit, TokenPost, CoinPost and Nikkei, coordinated.' },
    cta: "Let's plan your <em>Korea and Japan</em> launch.",
  },
  apac: {
    re: /(^|-)apac(-|$)/,
    places: ANY,
    cap: 'apac',
    posters: [],
    band: { eyebrow: 'APAC PR', title: 'Not a <em>translated</em> press release.', sub: 'Korea, Japan, India, Singapore and MENA.' },
    cta: "Let's plan your <em>APAC</em> rollout.",
  },
};

/** Slugs the audit treats as region specific, so a page this module misses still gets neutral photos. */
const AUDIT_REGION_RE = /(^|[-_])(korea|korean|seoul|kbw|india|indian|singapore|japan|japanese|tokyo|webx|dubai|uae|mena|vara|adgm|saudi|abu-dhabi|middle-east|gulf|vietnam|thailand|usa|uk|us|europe|london|hong-kong|australia|canada|germany|france|brazil)([-_.]|$)/;

function detectRegion(slug) {
  const korea = REGIONS.korea.re.test(slug);
  const japan = REGIONS.japan.re.test(slug);
  if (korea && japan) return 'kjp';
  for (const key of ['korea', 'india', 'singapore', 'japan', 'mena', 'usa', 'uk', 'vietnam', 'apac']) {
    if (REGIONS[key].re.test(slug)) return key;
  }
  return null;
}

// ---------------------------------------------------------------------------------------------
// Topic clusters
//   band / cta   copy for the band and the CTA banner
//   posters      lead posters for a wall (first one that fits the page)
//   bandPhotos / midPhotos / strictMid   photos that suit the topic, most natural first.
//                strictMid keeps the figure on those photos unless they are far ahead in use.
// ---------------------------------------------------------------------------------------------

const TOPICS = {
  ai: {
    band: { eyebrow: 'AI PR', title: 'Coverage that reads as <em>analyst-grade</em>.', sub: 'Tier-1 AI press, plus the AI-search work that gets you cited.' },
    cta: "Let's get your AI story <em>cited</em>.",
    posters: ['poster-ai-pr'],
    bandPhotos: ['sg-marina-c', 'sg-marina-a', 'library', 'sg-river-b', 'lounge'],
    midPhotos: ['stage-a', 'stage-b', 'library', 'lounge', 'sg-river-a'],
  },
  aeo: {
    band: { eyebrow: 'AI search', title: 'Be the name AI engines <em>cite</em>.', sub: 'Coverage structured so ChatGPT, Perplexity and Google AI Mode name you.' },
    cta: "Let's get you <em>named</em> by AI engines.",
    posters: ['poster-ai-pr'],
    bandPhotos: ['library', 'sg-marina-d', 'sg-river-b', 'lounge'],
    midPhotos: ['library', 'lounge', 'stage-b', 'press-lounge'],
  },
  cyber: {
    band: { eyebrow: 'Cybersecurity PR', title: 'Security stories from a <em>senior operator</em>.', sub: 'Press and analyst access for security founders, fractional and hands-on.' },
    cta: "Let's put your security story <em>on record</em>.",
    posters: ['poster-cybersecurity'],
    bandPhotos: ['library', 'sg-marina-d', 'sg-bridge-b', 'lounge'],
    midPhotos: ['library', 'lounge', 'sg-bridge-a', 'press-lounge'],
  },
  tech: {
    band: { eyebrow: 'Tech PR', title: 'Credibility that survives a <em>technical review</em>.', sub: 'Tier-1 coverage and proof points a buying committee can check.' },
    cta: "Let's make your tech story <em>legible</em>.",
    posters: ['poster-web3-pr'],
    bandPhotos: ['sg-marina-a', 'sg-marina-b', 'library', 'lounge'],
    midPhotos: ['library', 'lounge', 'stage-a', 'press-lounge'],
  },
  launch: {
    band: { eyebrow: 'Launch PR', title: 'TGE comms, exchange news and <em>KOL waves</em>.', sub: 'RARI Chain landed 11 Tier-1 placements in 24 hours.' },
    cta: "Let's plan your <em>launch window</em>.",
    posters: ['poster-token-launch'],
    bandPhotos: ['sg-marina-a', 'sg-marina-b', 'sg-marina-d', 'depin-day-hk', 'stablecoin-summit'],
    midPhotos: [['token2049-hall'], ['depin-day-hk', 'press-lounge']],
    strictMid: true,
  },
  exchange: {
    band: { eyebrow: 'Exchange PR', title: 'Listings that read as <em>news</em>, not notices.', sub: 'Exchange and listing stories placed in Tier-1 outlets by one senior operator.' },
    cta: "Let's plan your <em>listing news</em>.",
    posters: ['poster-token-launch'],
    bandPhotos: ['sg-marina-b', 'stablecoin-summit', 'lounge', 'sg-river-a'],
    midPhotos: [['press-lounge'], ['token2049-hall', 'stablecoin-summit']],
    strictMid: true,
  },
  kol: {
    band: { eyebrow: 'KOL and community', title: '<em>200+</em> vetted creators, FTC-safe campaigns.', sub: 'A fraud audit on every creator before any budget moves.' },
    cta: "Let's vet your <em>creator list</em>.",
    posters: ['poster-kol'],
    bandPhotos: ['sg-river-a', 'sg-river-b', 'lounge', 'sg-bridge-b'],
    midPhotos: ['sg-river-b', 'sg-river-a', 'lounge', 'sg-bridge-a', 'sg-marina-c'],
  },
  founder: {
    band: { eyebrow: 'Founder voice', title: 'Op-eds, podcasts and a <em>category voice</em>.', sub: 'Named authority that editors and AI engines cite, built around you.' },
    cta: "Let's build your <em>category voice</em>.",
    posters: ['poster-founder-profiling', 'poster-speaker'],
    bandPhotos: ['sg-river-b', 'lounge', 'sg-marina-c', 'library', 'sg-river-a'],
    midPhotos: [['stage-a', 'stage-b'], ['lounge', 'library']],
    strictMid: true,
  },
  content: {
    band: { eyebrow: 'Content writing', title: 'Writing that gets <em>picked up</em> and cited.', sub: 'Press releases, whitepapers and op-eds, written for editors and AI engines.' },
    cta: "Let's draft something <em>worth citing</em>.",
    posters: ['poster-founder-profiling'],
    bandPhotos: ['library', 'lounge', 'sg-river-b', 'sg-bridge-b'],
    midPhotos: ['library', 'lounge', 'press-lounge', 'stage-b'],
  },
  gaming: {
    band: { eyebrow: 'Gaming and NFT', title: 'Press for players and <em>investors</em> at once.', sub: 'Gaming, NFT and metaverse stories, led by a senior operator.' },
    cta: "Let's brief the press on <em>your game</em>.",
    posters: ['poster-stat-launches'],
    bandPhotos: ['lounge', 'sg-river-a', 'sg-bridge-b', 'sg-marina-a'],
    midPhotos: ['lounge', 'depin-day-hk', 'sg-bridge-a', 'press-lounge'],
  },
  infra: {
    band: { eyebrow: 'DeFi and infra', title: 'Explain the mechanism so <em>editors repeat it</em>.', sub: 'MANTRA Chain turned an $11M RWA raise into a CoinDesk exclusive.' },
    cta: "Let's explain your <em>protocol</em> to editors.",
    posters: ['poster-web3-pr'],
    bandPhotos: ['sg-marina-d', 'sg-marina-b', 'depin-day-hk', 'stablecoin-summit'],
    midPhotos: ['depin-day-hk', 'stablecoin-summit', 'token2049-hall', 'library'],
  },
  fractional: {
    band: { eyebrow: 'Fractional PR', title: 'A senior operator, <em>not an account team</em>.', sub: '$3K to $7K a month, against $15K to $45K for a full agency.' },
    cta: "Let's scope a <em>fractional</em> retainer.",
    posters: ['poster-stat-tier1'],
    bandPhotos: ['library', 'sg-bridge-b', 'sg-river-a', 'lounge', 'sg-marina-b'],
    midPhotos: ['lounge', 'library', 'sg-bridge-a', 'stage-b'],
  },
  compare: {
    band: { eyebrow: 'Compare agencies', title: 'Judge an agency by who <em>actually pitches</em>.', sub: 'Side-by-side comparisons with the trade-offs spelled out.' },
    cta: "Let's compare notes on your <em>shortlist</em>.",
    posters: ['poster-stat-placements'],
    bandPhotos: ['sg-marina-b', 'sg-marina-c', 'sg-marina-a'],
    midPhotos: ['press-lounge', 'stablecoin-summit', 'token2049-hall', 'library'],
  },
  web3: {
    band: { eyebrow: 'Web3 PR', title: 'Web3 PR that lands <em>Tier-1</em> headlines.', sub: 'Coverage in Forbes, CoinDesk, Cointelegraph, Decrypt and The Block.' },
    cta: "Let's land your next <em>Tier-1</em> headline.",
    posters: ['poster-web3-pr'],
    bandPhotos: ['sg-marina-b', 'sg-marina-a', 'depin-day-hk', 'sg-river-a'],
    midPhotos: ['press-lounge', 'stablecoin-summit', 'token2049-hall', 'stage-a'],
  },
};

/**
 * Sub-topics: the page keeps its topic copy (stablecoin also gets its own band line), but one slot is
 * pinned to the photo that is literally about it. `pin` is the slot that carries the photo.
 */
const SUBTOPICS = [
  {
    key: 'stablecoin',
    re: /stablecoin/,
    photo: 'stablecoin-summit',
    pin: () => 'band',
    copy: { eyebrow: 'Stablecoin PR', title: 'Reserves and audits in <em>paragraph one</em>.', sub: 'Regulatory context and proof points that editors can verify.' },
    cta: "Let's plan your <em>stablecoin</em> story.",
  },
  { key: 'depin', re: /depin/, photo: 'depin-day-hk', pin: (slug) => (/marketing/.test(slug) ? 'mid' : 'band'), copy: null, cta: null },
];

const TOPIC_RULES = [
  ['aeo', /(^|-)(geo|aeo)(-|$)|ai-search/],
  ['cyber', /cybersecurity|infosec|threat-intelligence/],
  ['founder', /founder|executive-visibility|podcast|ghostwriting|thought-leadership|media-training|personal-branding|op-ed/],
  ['ai', /(^|-)ai(-|$)/],
  ['tech', /b2b-|deeptech|tech-startups/],
  ['gaming', /gaming|metaverse|(^|-)nft(-|$)/],
  ['compare', /^(best|top)-/],
  ['exchange', /exchange|listing|binance/],
  ['launch', /token-launch|(^|-)tge(-|$)|ico-ido|presale|airdrop|memecoin/],
  ['kol', /kol|influencer|telegram|community|youtube/],
  ['content', /content|whitepaper|press-release/],
  ['infra', /(^|-)(defi|layer2|depin|dao|rwa|stablecoin)(-|$)|infrastructure/],
  ['fractional', /fractional|consultant|publicist|affordable|small-budget|for-startups/],
];

function detectTopic(slug) {
  for (const [key, re] of TOPIC_RULES) if (re.test(slug)) return key;
  return 'web3';
}

/** Band copy for region pages whose topic needs its own line (the region frame alone would be off-topic). */
const BAND_OVERRIDES = {
  'korea+kol': { eyebrow: 'Korea KOL', title: '<em>200+</em> Korean KOLs, vetted and briefed natively.', sub: 'Nano to mid-tier creators, matched to your token buyer.' },
  'japan+kol': { eyebrow: 'Japan KOL', title: 'Native creators, briefed with <em>cultural precision</em>.', sub: 'X, YouTube and LINE communities, coordinated by a senior operator.' },
  'usa+cyber': { eyebrow: 'US security PR', title: 'Wired, Dark Reading and SC Media, <em>pitched directly</em>.', sub: 'US security press from a senior operator.' },
  'apac+launch': { eyebrow: 'APAC launch PR', title: 'Press windows timed <em>market by market</em>.', sub: 'Korea, Japan, India, Singapore and MENA in one coordinated launch.' },
  'india+ai': { eyebrow: 'India AI PR', title: 'Win India first, then <em>travel global</em>.', sub: 'Inc42, Economic Times and DealStreetAsia, then the Tier-1 re-report.' },
};

// ---------------------------------------------------------------------------------------------
// Walls and figures
// ---------------------------------------------------------------------------------------------

const WALL_HEAD = { eyebrow: 'Track record', title: 'The work, <em>at a glance</em>.' };
const WALL_HEAD_APAC = { eyebrow: 'APAC markets', title: 'One senior operator across <em>six markets</em>.' };
/** Poster-retainer quotes $5k-10k a month, which would contradict the $3K to $7K these pages state. */
const GENERIC_POSTERS = [
  'poster-stat-placements',
  'poster-stat-tier1',
  'poster-stat-impressions',
  'poster-stat-launches',
  'poster-stat-countries',
  'poster-speaker',
  'poster-teardown',
];
/** APAC pages: the region posters, three per page, none that repeats the page's band line. */
const APAC_WALLS = [
  ['poster-singapore', 'poster-korea', 'poster-india'], // apac-crypto-pr-agency: band reads "Not a translated press release"
  ['poster-apac', 'poster-japan', 'poster-mena'], // apac-token-launch-pr: its own band line (see BAND_OVERRIDES)
];

/**
 * Share of global pages that get a poster wall instead of a figure (percent). Region pages only get a
 * wall (their own region poster plus one more) when the band line differs from the poster text, so a
 * page never says the same sentence twice (see BAND_OVERRIDES and the Korea and Japan page).
 */
const WALL_PERCENT = 35;

const CTA_EYEBROW = 'Talk to Shilika'; // the lead form right below already says "Work with Shilika"

// ---------------------------------------------------------------------------------------------
// Copy guard: the brief's limits, checked every time the module loads.
// ---------------------------------------------------------------------------------------------

const BANNED = /—|–|→|←|&mdash;|&ndash;|\b(game-changer|robust|cutting-edge|seamless|delve|tapestry|in essence|leverage|navigate)/i;
const plainText = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const words = (s) => plainText(s).split(/\s+/).filter(Boolean).length;

function checkCopy(where, { eyebrow, title, sub }) {
  const bad = (msg) => {
    throw new Error(`landing copy (${where}): ${msg}`);
  };
  if (eyebrow && words(eyebrow) > 3) bad(`eyebrow "${eyebrow}" has more than 3 words`);
  // the character caps keep the band copy to two lines on a phone, above the subject's face
  if (title && (words(title) > 9 || plainText(title).length > 56)) bad(`title "${title}" is longer than 9 words or 56 characters`);
  if (sub && (words(sub) > 14 || plainText(sub).length > 80)) bad(`sub "${sub}" is longer than 14 words or 80 characters`);
  for (const s of [eyebrow, title, sub]) if (s && BANNED.test(s)) bad(`banned wording in "${s}"`);
}
for (const [k, v] of Object.entries(TOPICS)) {
  checkCopy(`topic ${k}`, v.band);
  checkCopy(`topic ${k} cta`, { title: v.cta });
}
for (const [k, v] of Object.entries(REGIONS)) {
  checkCopy(`region ${k}`, v.band);
  checkCopy(`region ${k} cta`, { title: v.cta });
}
for (const s of SUBTOPICS) {
  if (s.copy) checkCopy(`subtopic ${s.key}`, s.copy);
  if (s.cta) checkCopy(`subtopic ${s.key} cta`, { title: s.cta });
}
for (const [k, v] of Object.entries(BAND_OVERRIDES)) checkCopy(`override ${k}`, v);
for (const c of Object.values(CAPTIONS)) checkCopy('caption', { sub: c });
for (const c of Object.values(CONTEXT_CAPTION)) checkCopy('caption', { sub: c });
checkCopy('wall', WALL_HEAD);
checkCopy('wall apac', WALL_HEAD_APAC);
checkCopy('cta eyebrow', { eyebrow: CTA_EYEBROW });

// ---------------------------------------------------------------------------------------------
// Planning
//
// All pages are planned together (restricted pages first, then the rest, alphabetical). Every
// photo has a running "weight" (a band weighs most, a poster least) and each slot picks among the
// eligible photos that are least used so far, preferring the ones that suit the topic. Ties break
// with hashPick(slug, salt), so the plan is stable.
// ---------------------------------------------------------------------------------------------

const WEIGHT = { band: 7, mid: 3, cta: 4, poster: 2 }; // roughly the number of image URLs each block carries
const SLOT_CROP = { band: 'wide', mid: 'land', cta: 'port' };

function planOrder(slug) {
  const region = detectRegion(slug);
  if (region && REGIONS[region].places !== ANY) return 0;
  if (!region && AUDIT_REGION_RE.test(slug)) return 0;
  return region ? 1 : 2;
}

function buildPlans(files, hashPick) {
  const use = Object.fromEntries(ALL_PHOTOS.map((id) => [id, 0]));
  const posterUse = Object.fromEntries(Object.keys(POSTER_PHOTO).map((id) => [id, 0]));
  const plans = new Map();
  let apacPages = -1;
  const slugOf = (f) => f.replace(/^pages__/, '').replace(/-body\.html$/, '');
  const ordered = [...files].sort((a, b) => planOrder(slugOf(a)) - planOrder(slugOf(b)) || a.localeCompare(b));

  /** Least-used tier of `list` (within `slack`), then hashPick. */
  const pickLeast = (list, slug, salt, slack = 0, table = use) => {
    const floor = Math.min(...list.map((id) => table[id]));
    const tier = list.filter((id) => table[id] <= floor + slack);
    return tier[hashPick(`${slug}:${salt}`, tier.length)];
  };

  for (const file of ordered) {
    const slug = slugOf(file);
    const regionKey = detectRegion(slug);
    const region = regionKey ? REGIONS[regionKey] : null;
    const topicKey = detectTopic(slug);
    const topic = TOPICS[topicKey];
    const sub = SUBTOPICS.find((s) => s.re.test(slug)) ?? null;

    let places = region ? region.places : ANY;
    if (!region && AUDIT_REGION_RE.test(slug)) places = NEUTRAL; // a slug the audit calls regional stays neutral
    const placeOk = (id) => places === ANY || places.has(PLACE[id]);

    const taken = new Set(); // photos on this page, posters included
    const takenGroups = new Set();
    const claim = (id) => {
      taken.add(id);
      takenGroups.add(groupOf(id));
    };
    const free = (id) => !taken.has(id) && !takenGroups.has(groupOf(id));

    // ---- poster wall (planned first, so the photos baked into it are off limits elsewhere) ----
    let wallKind = null; // 'global' | 'region' | 'apac'
    let wallItems = null;
    if (regionKey === 'apac') wallKind = 'apac';
    else if (region && region.posters.length && (regionKey === 'kjp' || BAND_OVERRIDES[`${regionKey}+${topicKey}`])) wallKind = 'region';
    else if (!region && !topic.strictMid && regionKey !== 'singapore' && hashPick(`${slug}:wall`, 100) < WALL_PERCENT) wallKind = 'global';

    if (wallKind) {
      const chosen = [];
      const take = (p) => {
        const photo = POSTER_PHOTO[p];
        if (!photo || chosen.includes(p) || !free(photo) || !placeOk(photo)) return false;
        chosen.push(p);
        claim(photo);
        return true;
      };
      if (wallKind === 'apac') {
        apacPages += 1;
        for (const p of APAC_WALLS[apacPages % APAC_WALLS.length]) take(p);
      } else if (wallKind === 'region') {
        for (const p of region.posters) take(p);
        const rest = GENERIC_POSTERS.filter((p) => !chosen.includes(p) && free(POSTER_PHOTO[p]) && placeOk(POSTER_PHOTO[p]));
        while (chosen.length < 2 && rest.length) {
          const next = pickLeast(rest, slug, `partner${chosen.length}`, 0, posterUse);
          rest.splice(rest.indexOf(next), 1);
          take(next);
        }
      } else {
        for (const p of topic.posters) if (chosen.length < 1) take(p);
        const rest = GENERIC_POSTERS.filter((p) => !chosen.includes(p) && free(POSTER_PHOTO[p]) && placeOk(POSTER_PHOTO[p]));
        while (chosen.length < 3 && rest.length) {
          const next = pickLeast(rest, slug, `proof${chosen.length}`, 0, posterUse);
          rest.splice(rest.indexOf(next), 1);
          take(next);
        }
      }
      const need = wallKind === 'region' ? 2 : 3;
      if (chosen.length < need) {
        // could not assemble a wall for this page: fall back to a figure
        for (const p of chosen) {
          taken.delete(POSTER_PHOTO[p]);
          takenGroups.delete(groupOf(POSTER_PHOTO[p]));
        }
        wallKind = null;
      } else {
        for (const p of chosen) {
          posterUse[p] += 1;
          use[POSTER_PHOTO[p]] += WEIGHT.poster;
        }
        wallItems = chosen.map((id) => ({ id }));
      }
    }

    // ---- photo slots ----
    const choice = {};
    const eligible = (slot) => {
      const list = ALL_PHOTOS.filter((id) => has(id, SLOT_CROP[slot]) && placeOk(id) && free(id) && (region?.own ? PLACE[id] === region.own : true));
      // the stage stills carry a microphone and a screen; they stay in the figure slot unless nothing else is left
      if (slot === 'cta') {
        const rest = list.filter((id) => groupOf(id) !== 'stage');
        if (rest.length) return rest;
      }
      return list;
    };
    /**
     * Pick a photo for `slot`. `tiers` = preferred photos, most natural first; a tier is used when any
     * of its photos is not far (more than `slack` weight) ahead of the least used eligible photo.
     */
    const choose = (slot, tiers, slack, pinned = null) => {
      const list = eligible(slot);
      if (!list.length) throw new Error(`${slug}: no ${SLOT_CROP[slot]} photo left for slot "${slot}"`);
      let id;
      if (pinned && list.includes(pinned)) {
        id = pinned;
      } else {
        const floor = Math.min(...list.map((x) => use[x]));
        let pool = null;
        for (const tier of tiers) {
          const t = tier.filter((x) => list.includes(x) && use[x] <= floor + slack);
          if (t.length) {
            pool = t;
            break;
          }
        }
        id = pickLeast(pool ?? list, slug, slot, 6);
      }
      choice[slot] = id;
      claim(id);
      use[id] += WEIGHT[slot];
    };
    const tiersOf = (prefs) => (prefs.length && Array.isArray(prefs[0]) ? prefs : [prefs]);

    let midTiers = tiersOf(topic.midPhotos);
    if (regionKey === 'singapore') midTiers = [['token2049-hall']];
    const midSlack = topic.strictMid || regionKey === 'singapore' ? 60 : 24;
    const pinSlot = sub ? sub.pin(slug) : null;
    const pinned = (slot) => (pinSlot === slot ? sub.photo : null);

    // the pinned slot first, then the figure (it carries the strongest topic matches: TOKEN2049 hall,
    // stage stills, Press Lounge), then the band, then the CTA portrait
    if (pinSlot === 'band') choose('band', [], 0, pinned('band'));
    if (!wallKind) choose('mid', midTiers, midSlack, pinned('mid'));
    if (!choice.band) choose('band', tiersOf(topic.bandPhotos), 28);
    choose('cta', [[]], 0);

    plans.set(file, { slug, regionKey, region, topicKey, topic, sub, choice, wallKind, wallItems });
  }
  return plans;
}

let PLANS = null;
function planFor(file, ctx) {
  if (!PLANS) PLANS = buildPlans(listPartials((f) => /^pages__.*-body\.html$/.test(f)), ctx.hashPick);
  const p = PLANS.get(file);
  if (!p) throw new Error(`${file}: not in the landing plan`);
  return p;
}

// ---------------------------------------------------------------------------------------------
// Placement
// ---------------------------------------------------------------------------------------------

const SECTION_RE = /<section class="lp-section[ "]/;

/**
 * The figure and the wall sit on the paper background between a paper section (84px of bottom
 * padding) and an alt section (no gap above it). The wrapper pulls the block up by 40px and adds
 * 44px underneath, so the space above and below it is the same at every breakpoint.
 */
const midGap = (html) => `<div style="margin-top:-40px;padding-bottom:44px">${html}</div>`;

const ANCHORS = {
  band: [{ before: '<section class="lp-press"' }, { before: SECTION_RE, occurrence: 0 }, { after: '</header>' }],
  mid: [{ before: SECTION_RE, occurrence: 3 }, { before: SECTION_RE, occurrence: 2 }, { before: '<section class="lp-tst"' }],
  cta: [{ before: '<section class="lead-section"' }, { before: '<section class="cta-strip"' }, { before: '<section class="lp-tst"' }],
};

function placeAt(ctx, html, key, markup, file) {
  const { place, block } = ctx;
  const wrapped = block(key, markup);
  for (const anchor of ANCHORS[key.split(':')[1]]) {
    const r = place(html, key, wrapped, anchor);
    if (r.placed) return r.html;
  }
  throw new Error(`${file}: no anchor found for ${key}`);
}

export default {
  name: 'landing',
  describe: 'generated /pages/* landing pages: photo band, figure or poster wall, CTA banner',
  files() {
    return listPartials((f) => /^pages__.*-body\.html$/.test(f));
  },
  apply(html, file, ctx) {
    const { band, figure, wall, ctaBand, hashPick, pageTitle } = ctx;
    const p = planFor(file, ctx);
    const override = BAND_OVERRIDES[`${p.regionKey}+${p.topicKey}`];
    const copy = override ?? (p.region ? p.region.band : p.sub?.copy ?? p.topic.band);
    const ctaTitle = p.region ? p.region.cta : p.sub?.cta ?? p.topic.cta;

    const h1 = plainText(pageTitle(html)).toLowerCase();
    for (const t of [copy.title, ctaTitle]) {
      if (plainText(t).toLowerCase() === h1) throw new Error(`${file}: block title repeats the page H1`);
    }

    // 1. band, right under the hero and its trust strip
    let out = placeAt(
      ctx,
      html,
      'landing:band',
      band({ id: p.choice.band, ...copy, align: BAND_RIGHT.has(p.choice.band) ? 'right' : 'left' }),
      file,
    );

    // 2. mid-page figure or poster wall
    if (p.wallKind) {
      const head = p.wallKind === 'apac' ? WALL_HEAD_APAC : WALL_HEAD;
      let markup = wall({ ...head, items: p.wallItems });
      if (p.wallKind === 'region') markup = `<div style="max-width:880px;margin:0 auto">${markup}</div>`;
      out = placeAt(ctx, out, 'landing:mid', midGap(markup), file);
    } else {
      const id = p.choice.mid;
      const capSet = CAPTION_SETS[p.region ? p.region.cap : 'global'];
      const caption = CONTEXT_CAPTION[id] ?? CAPTIONS[capSet[hashPick(`${p.slug}:cap`, capSet.length)]];
      // the TOKEN2049 hall frame is only 885px wide and the stage stills are video frames, so they get
      // the narrow figure (no upscaling)
      const narrow = SOFT_PHOTOS.has(id) ? { size: 'narrow', sizes: '(min-width: 800px) 760px, 92vw' } : {};
      out = placeAt(ctx, out, 'landing:mid', midGap(figure({ id, label: FIGURE_LABEL, caption, ...narrow })), file);
    }

    // 3. CTA banner, with room underneath so it never touches the dark lead section
    const cta = ctaBand({ id: p.choice.cta, eyebrow: CTA_EYEBROW, title: ctaTitle });
    const style = `<style>.lp-cta-x .sjm-cta__pic img{object-position:${CTA_POS[p.choice.cta] ?? '50% 50%'}}</style>`;
    out = placeAt(ctx, out, 'landing:cta', `<div class="lp-cta-x" style="padding-bottom:clamp(32px,5vw,72px)">${style}${cta}</div>`, file);
    return out;
  },
  // exposed for scratch analysis only
  _plan: (file, ctx) => planFor(file, ctx),
  _detect: (slug) => ({ region: detectRegion(slug), topic: detectTopic(slug) }),
};
