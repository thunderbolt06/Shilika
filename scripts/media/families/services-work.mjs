// Family "services-work": the eight /services/* pages and the six /work/* case studies.
// (The AI SEO service pages, services__ai-seo*, belong to another workstream and are not listed here.)
//
// Every page gets three blocks, in this order down the page:
//
//   1. band   full-bleed photo band right after the header, labelled with a fact from the page
//   2. wall   three baked posters (the matching service poster plus proof posters) between the
//             article and the FAQ; APAC gets the four country-desk posters
//   3. cta    portrait CTA banner near the end: after the FAQ asides on services (before the author
//             block), after the FAQ section on case studies (before the related reading)
//
// Photo rules
//   - Services are global, so any photo may be used. The APAC page mixes places (a Singapore River
//     band, a Hong Kong CTA) and says nothing in the copy about where a photo was taken.
//   - MANTRA Chain has a Middle East angle and Bullieverse is an India raise: both pages only get
//     event or neutral photos (band, CTA and the baked posters in their walls), and nothing in the
//     copy or alt text places a photo anywhere.
//   - Fluence is the natural home of depin-day-hk: the Fluence logo is on that backdrop, and the alt
//     text says only that.
//   - A page never shows the same photo twice. Posters have a photo baked in, so the band and CTA
//     photo of a page also differ from the scene baked into any of its posters (the four Marina Bay
//     frames count as one scene, as do the two river frames and the two stage frames). assertPlan()
//     checks this on every run.
//   - Across the family no photo is used more than three times (band and CTA together).
//
// Copy: eyebrow, title and sub restate facts already on the page (outlets, counts, offers). The stat
// posters carry site-wide totals, so the case-study wall says "all client work". Limits: eyebrow 3
// words, band title 9, band sub 14 (checked in assertPlan()).
//
// Blocks that sit inside the padded body section are wrapped in a negative-margin div so they line
// up exactly like top-level blocks (no double side padding).

import { listPartials } from '../inject-lib.mjs';
import { GRAPHICS } from '../graphics.config.mjs';

const NAME = 'services-work';
const bakedPhotoOf = Object.fromEntries(GRAPHICS.map((g) => [g.id, g.photo]));

const EVENT_NEUTRAL = new Set(['press-lounge', 'stablecoin-summit', 'stage-a', 'stage-b', 'library', 'lounge']);

// Which side of the frame the band copy goes on, so it never covers the face. `left` = copy on the left
// (subject sits right of centre), `right` = copy on the right (subject sits left of centre).
const BAND_ALIGN = {
  'depin-day-hk': 'right',
  'stablecoin-summit': 'left',
  library: 'right',
  lounge: 'left',
  'sg-marina-a': 'right',
  'sg-marina-b': 'left',
  'sg-marina-c': 'right',
  'sg-marina-d': 'right',
  'sg-bridge-b': 'right',
  'sg-river-a': 'left',
  'sg-river-b': 'right',
};

// The sign in stablecoin-summit starts a third of the way across the frame, so on desktop its band copy
// is kept narrow enough to stay left of it.
const BAND_NARROW = new Set(['stablecoin-summit']);

// On phones the band switches to the portrait crop and the copy sits at the bottom. For every photo
// except stablecoin-summit (full-length shot, face in the upper third) the face is in the middle or
// lower half of that crop, so the copy moves to the top there.
const MOBILE_COPY_BOTTOM = new Set(['stablecoin-summit']);

// The CTA banner is a landscape frame (about 1.4:1 on desktop, 4:3 on phones), so the shared portrait
// crop would show a small window onto the photo. The family swaps in the 16:10 `land` crop of the same
// photo and only needs to say where the face sits horizontally (object-position).
const CTA_SIZES = '(min-width: 760px) 40vw, 92vw';
const CTA_POSITION = {
  'press-lounge': '60% 50%',
  'depin-day-hk': '58% 50%',
  'sg-bridge-a': '8% 50%',
  library: '66% 50%',
  lounge: '78% 50%',
  'stage-a': '44% 40%',
  'stage-b': '44% 40%',
};

const GENERIC_SERVICE_WALL = { eyebrow: 'Track record', title: 'Senior-operator PR, <em>by the numbers</em>.' };
const GENERIC_CASE_WALL = { eyebrow: 'All client work', title: 'Beyond this case, <em>the wider record</em>.' };

const PAGES = {
  // ------------------------------------------------------------------ services
  'services__web3-pr-campaigns': {
    kind: 'service',
    band: {
      id: 'sg-bridge-b',
      eyebrow: 'Web3 PR',
      title: 'One senior operator, <em>start to launch</em>.',
      sub: '50+ protocols placed in Forbes, CoinDesk, Cointelegraph, Decrypt and The Block.',
    },
    wall: { ...GENERIC_SERVICE_WALL, items: [{ id: 'poster-web3-pr' }, { id: 'poster-stat-tier1' }, { id: 'poster-stat-launches' }] },
    cta: {
      id: 'press-lounge',
      title: 'Plan your next <em>news moment</em>.',
      sub: '30 minutes to map your category, your journalists and your launch date.',
    },
  },
  'services__token-launch-pr': {
    kind: 'service',
    band: {
      id: 'sg-marina-b',
      eyebrow: 'Token launch PR',
      title: 'From pre-TGE to <em>post-listing</em>.',
      sub: 'Embargoed trade press, exchange comms and KOL waves across 200+ vetted creators.',
    },
    wall: { ...GENERIC_SERVICE_WALL, items: [{ id: 'poster-token-launch' }, { id: 'poster-kol' }, { id: 'poster-stat-launches' }] },
    cta: {
      id: 'stage-a',
      title: 'Mapping your <em>TGE</em> in 30 minutes.',
      sub: 'We cover your date, trade desks, exchange listings and your post-TGE coverage.',
    },
  },
  'services__kol-marketing': {
    kind: 'service',
    band: {
      id: 'sg-marina-a',
      eyebrow: 'KOL marketing',
      title: '200+ vetted creators, <em>three waves</em>.',
      sub: 'Region-segmented activation with FTC and SEC-aware disclosure in every brief.',
    },
    wall: { ...GENERIC_SERVICE_WALL, items: [{ id: 'poster-kol' }, { id: 'poster-stat-countries' }, { id: 'poster-stat-launches' }] },
    cta: {
      id: 'sg-bridge-a',
      title: 'Plan the <em>creator waves</em> before launch.',
      sub: 'We look at your launch, region mix and the creators that matter.',
    },
  },
  'services__founder-profiling': {
    kind: 'service',
    band: {
      id: 'stablecoin-summit',
      eyebrow: 'Founder profiling',
      title: 'From technical founder to <em>named voice</em>.',
      sub: 'Op-eds in CoinDesk Opinion, Cointelegraph, Decrypt, Forbes Council and AI Magazine.',
    },
    wall: { ...GENERIC_SERVICE_WALL, items: [{ id: 'poster-founder-profiling' }, { id: 'poster-speaker' }, { id: 'poster-stat-tier1' }] },
    cta: {
      id: 'depin-day-hk',
      title: 'Find the <em>category word</em> you can own.',
      sub: '30 minutes on your trade desks, conferences and where your voice has gaps.',
    },
  },
  'services__ai-startup-pr': {
    kind: 'service',
    band: {
      id: 'lounge',
      eyebrow: 'AI startup PR',
      title: 'Tier-1 coverage for <em>AI protocols</em>.',
      sub: 'Forbes, AI Magazine, Decrypt and Benzinga. The Gaia AI feature is the proof.',
    },
    wall: { ...GENERIC_SERVICE_WALL, items: [{ id: 'poster-ai-pr' }, { id: 'poster-stat-tier1' }, { id: 'poster-stat-launches' }] },
    cta: {
      id: 'stage-b',
      title: 'Find the hook your <em>AI story</em> needs.',
      sub: 'We look at your narrative, your founder and your next news hook.',
    },
  },
  'services__cybersecurity-pr': {
    kind: 'service',
    band: {
      id: 'library',
      eyebrow: 'Cybersecurity PR',
      title: 'Be the vendor the <em>CISO</em> finds.',
      sub: 'Analyst relations, tier-1 security press, threat research and disclosure comms.',
    },
    wall: { ...GENERIC_SERVICE_WALL, items: [{ id: 'poster-cybersecurity' }, { id: 'poster-stat-tier1' }, { id: 'poster-stat-countries' }] },
    cta: {
      id: 'press-lounge',
      title: 'Turn threat research into <em>press</em>.',
      sub: 'We look at your analyst position, unpublished research and the next news hook.',
    },
  },
  'services__apac-pr': {
    kind: 'service',
    band: {
      id: 'sg-river-a',
      eyebrow: 'APAC PR',
      title: 'Local desks, <em>one operator</em>.',
      sub: 'Native-language placements in BloomingBit, TokenPost, CryptoTimes JP, ChainCatcher and Inc42.',
    },
    wall: {
      eyebrow: 'Country desks',
      title: 'Start with the <em>market that matters</em>.',
      cols: 4,
      items: [
        { id: 'poster-apac', href: '/apac', caption: 'APAC' },
        { id: 'poster-korea', href: '/korea', caption: 'Korea' },
        { id: 'poster-japan', href: '/japan', caption: 'Japan' },
        { id: 'poster-india', href: '/india', caption: 'India' },
      ],
    },
    cta: {
      id: 'depin-day-hk',
      title: 'Pick the <em>right markets</em> first.',
      sub: 'We match regions to your buyers, event timing and per-market compliance.',
    },
  },
  'services__content-writing': {
    kind: 'service',
    band: {
      id: 'sg-river-b',
      eyebrow: 'Content writing',
      title: 'Ghostwritten in <em>your voice</em>.',
      sub: 'Op-eds, whitepapers and founder essays, placed in Tier-1 outlets.',
    },
    wall: { ...GENERIC_SERVICE_WALL, items: [{ id: 'poster-founder-profiling' }, { id: 'poster-stat-countries' }, { id: 'poster-stat-launches' }] },
    cta: {
      id: 'library',
      title: 'Pick the <em>first piece</em> to place.',
      sub: '30 minutes to choose between the essay, the whitepaper and the monthly op-ed.',
    },
  },

  // ---------------------------------------------------------------------- work
  'work__rari-chain': {
    kind: 'case',
    band: {
      id: 'sg-marina-d',
      eyebrow: 'RARI Chain mainnet',
      title: 'A 9-day embargo, <em>one launch morning</em>.',
      sub: 'A CoinDesk exclusive first, then The Block, The Defiant, Cointelegraph and more.',
    },
    wall: { ...GENERIC_CASE_WALL, items: [{ id: 'poster-stat-tier1' }, { id: 'poster-stat-launches' }, { id: 'poster-stat-countries' }] },
    cta: {
      id: 'sg-bridge-a',
      title: 'Launching a <em>mainnet</em>?',
      sub: '30 minutes to test your category angle and your launch window.',
    },
  },
  'work__gaia-ai': {
    kind: 'case',
    band: {
      id: 'sg-bridge-b',
      eyebrow: 'Gaia AI',
      title: 'One analogy, one co-founder, <em>one moment</em>.',
      sub: 'A Forbes feature, a Decrypt deep-dive and a Benzinga interview, plus six podcasts.',
    },
    wall: {
      ...GENERIC_CASE_WALL,
      items: [{ id: 'poster-ai-pr', href: '/services/ai-startup-pr' }, { id: 'poster-stat-launches' }, { id: 'poster-stat-tier1' }],
    },
    cta: {
      id: 'stage-b',
      title: 'Have an <em>AI story</em> worth a category?',
      sub: '30 minutes to check your founder, your analogy and your next calendar moment.',
    },
  },
  'work__mantra-chain': {
    kind: 'case',
    strict: true, // Middle East angle: event and neutral photos only, no place claims in the copy
    band: {
      id: 'lounge',
      eyebrow: 'MANTRA Chain',
      title: 'An RWA frame, <em>a CoinDesk exclusive</em>.',
      sub: 'Plus a standalone Cointelegraph profile of CEO John Mullin.',
    },
    wall: {
      ...GENERIC_CASE_WALL,
      items: [{ id: 'poster-mena', href: '/dubai-mena' }, { id: 'poster-speaker' }, { id: 'poster-teardown' }],
    },
    cta: {
      id: 'press-lounge',
      title: 'Raising soon? <em>Find the story</em> first.',
      sub: '30 minutes to link your round to a story the press already wants.',
    },
  },
  'work__web3auth': {
    kind: 'case',
    band: {
      id: 'sg-marina-c',
      eyebrow: 'Web3Auth',
      title: 'No raise, no token, <em>still a headline</em>.',
      sub: 'A Firebase extension became Tier-1 news in four language markets.',
    },
    wall: { ...GENERIC_CASE_WALL, items: [{ id: 'poster-stat-countries' }, { id: 'poster-stat-tier1' }, { id: 'poster-stat-launches' }] },
    cta: {
      id: 'sg-bridge-a',
      title: 'Shipping infrastructure? <em>Find the anchor</em>.',
      sub: '30 minutes to find the credibility anchor that turns a release into news.',
    },
  },
  'work__fluence': {
    kind: 'case',
    band: {
      id: 'depin-day-hk',
      // The Fluence logo is in the top row of this sponsor wall. Say only what is visible.
      alt: 'Shilika Jain in front of the DePIN Day Hong Kong sponsor wall, with the Fluence logo in the top row',
      eyebrow: 'Fluence Network',
      title: 'From acronym to <em>editorial beat</em>.',
      sub: 'CoinDesk Opinion, Cointelegraph, Decrypt, Benzinga and e27, over four quarters.',
    },
    wall: {
      ...GENERIC_CASE_WALL,
      items: [{ id: 'poster-founder-profiling', href: '/services/founder-profiling' }, { id: 'poster-stat-tier1' }, { id: 'poster-stat-countries' }],
    },
    cta: {
      id: 'library',
      title: 'Building a category? <em>Own the acronym</em>.',
      sub: '30 minutes to find the term you own and the cadence to run.',
    },
  },
  'work__bullieverse': {
    kind: 'case',
    strict: true, // India raise: event and neutral photos only, no place claims in the copy
    band: {
      id: 'stablecoin-summit',
      eyebrow: 'Bullieverse',
      title: 'Two press tracks, <em>one news cycle</em>.',
      sub: 'National business press and crypto-native media, run in parallel.',
    },
    wall: {
      ...GENERIC_CASE_WALL,
      items: [{ id: 'poster-india', href: '/india' }, { id: 'poster-stat-countries' }, { id: 'poster-teardown' }],
    },
    cta: {
      id: 'lounge',
      title: 'Plan both <em>press tracks</em> together.',
      sub: '30 minutes to map a home-market exclusive and a crypto-native track.',
    },
  },
};

const slugOf = (file) => file.replace(/-body\.html$/, '');

// Photos from one shoot share an outfit and a backdrop; two of them on a page read as a repeat.
const sceneOf = (id) =>
  id.startsWith('sg-marina') ? 'marina' : id.startsWith('sg-river') ? 'river' : id.startsWith('stage-') ? 'stage' : id.startsWith('sg-bridge') ? 'bridge' : id;

const words = (s) => s.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;

let usageChecked = false;

/** Fails loudly when the plan breaks a rule, so a bad edit never reaches a partial. */
function assertPlan(ctx) {
  if (usageChecked) return;
  const usage = {};
  for (const [slug, cfg] of Object.entries(PAGES)) {
    const baked = cfg.wall.items.map((it) => bakedPhotoOf[it.id]);
    const bakedScenes = new Set(baked.map(sceneOf));
    const { band, cta } = cfg;
    if (band.id === cta.id) throw new Error(`${slug}: band and CTA use the same photo`);
    if (sceneOf(band.id) === sceneOf(cta.id)) throw new Error(`${slug}: band and CTA come from the same shoot`);
    for (const id of [band.id, cta.id]) {
      if (bakedScenes.has(sceneOf(id))) throw new Error(`${slug}: ${id} repeats a scene baked into one of the page's posters`);
      if (cfg.strict && !EVENT_NEUTRAL.has(id)) throw new Error(`${slug}: ${id} is not an event or neutral photo`);
      usage[id] = (usage[id] ?? 0) + 1;
    }
    if (cfg.strict) {
      for (const [i, b] of baked.entries()) {
        if (!EVENT_NEUTRAL.has(b)) throw new Error(`${slug}: poster ${cfg.wall.items[i].id} bakes ${b}, not an event or neutral photo`);
      }
    }
    if (new Set(baked).size !== baked.length) throw new Error(`${slug}: two posters bake the same photo`);
    if (!ctx.hasCrop(band.id, 'wide')) throw new Error(`${slug}: ${band.id} has no wide crop`);
    if (!ctx.hasCrop(cta.id, 'land')) throw new Error(`${slug}: ${cta.id} has no land crop`);
    if (words(band.eyebrow) > 3) throw new Error(`${slug}: band eyebrow over 3 words`);
    if (words(band.title) > 9) throw new Error(`${slug}: band title over 9 words`);
    if (words(band.sub) > 14) throw new Error(`${slug}: band sub over 14 words`);
    if (words(cfg.wall.eyebrow) > 3 || words(cfg.wall.title) > 9) throw new Error(`${slug}: wall copy too long`);
    if (words(cta.title) > 9 || words(cta.sub) > 14) throw new Error(`${slug}: CTA copy too long`);
  }
  for (const [id, n] of Object.entries(usage)) {
    if (n > 3) throw new Error(`${id} is used ${n} times across the family (max 3)`);
  }
  usageChecked = true;
}

// Wall of 3 on phones: swipe row instead of a two-column grid with an orphan poster.
const WALL_STYLE = `<style>
@media (min-width: 561px) and (max-width: 900px) { .sjm-wall--sw .sjm-wall__grid[data-n="3"] { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 560px) {
  .sjm-wall--sw .sjm-wall__grid[data-n="3"] { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; margin: 0 calc(var(--sjm-pad) * -1); padding: 0 var(--sjm-pad) 6px; scroll-padding-inline: var(--sjm-pad); scrollbar-width: none; }
  .sjm-wall--sw .sjm-wall__grid[data-n="3"]::-webkit-scrollbar { display: none; }
  .sjm-wall--sw .sjm-wall__grid[data-n="3"] .sjm-wall__item { flex: 0 0 64%; scroll-snap-align: start; }
}
</style>`;

// Bands whose face sits in the middle or lower half of the portrait crop: on phones the copy sits at
// the top of the band, over the sky, books or backdrop.
const BAND_STYLE = `<style>
@media (min-width: 721px) { .sjm-band.sw-narrow .sjm-band__copy { max-width: min(440px, 100%); } }
@media (max-width: 720px) {
  .sjm-band.sjm-band--mtop::after { background: linear-gradient(180deg, oklch(0.16 0.01 80 / 0.9) 0%, oklch(0.16 0.01 80 / 0.66) 34%, oklch(0.16 0.01 80 / 0.08) 62%, transparent 100%); }
  .sjm-band.sjm-band--mtop .sjm-band__copy { justify-content: flex-start; }
}
</style>`;

/** Replaces the portrait <img> that ctaBand() renders with the 16:10 crop of the same photo. */
function landCrop(ctaHtml, id, ctx) {
  const pos = CTA_POSITION[id];
  let pic = ctx.picture({ id, crop: 'land', sizes: CTA_SIZES });
  if (pos) pic = pic.replace('<img ', `<img style="object-position:${pos}" `);
  const next = ctaHtml.replace(/<img [^>]*>/, pic);
  if (next === ctaHtml) throw new Error(`could not swap the CTA crop for ${id}`);
  return next;
}

const bleed = (html) => `<div style="margin:0 calc(var(--pad) * -1)">${html}</div>`;

function must(result, file, what) {
  if (!result.placed) throw new Error(`${file}: anchor for ${what} not found`);
  return result.html;
}

export default {
  name: NAME,
  describe: 'services and case-study pages: band, poster wall, CTA banner',
  files() {
    // Explicit list: a partial that is not configured here (the AI SEO pages, or a brand-new bespoke
    // services page) is left alone instead of failing the run.
    const configured = new Set(Object.keys(PAGES).map((slug) => `${slug}-body.html`));
    return listPartials((f) => configured.has(f));
  },
  apply(html, file, ctx) {
    assertPlan(ctx);
    const slug = slugOf(file);
    const cfg = PAGES[slug];
    if (!cfg) throw new Error(`no services-work config for ${slug}`);

    // 1. band after the header
    const { band: b } = cfg;
    let bandHtml = ctx.band({
      id: b.id,
      eyebrow: b.eyebrow,
      title: b.title,
      sub: b.sub,
      alt: b.alt,
      align: BAND_ALIGN[b.id] ?? 'left',
    });
    if (!MOBILE_COPY_BOTTOM.has(b.id)) bandHtml = `${BAND_STYLE}${bandHtml.replace('class="sjm-band ', 'class="sjm-band sjm-band--mtop ')}`;
    let out = must(ctx.place(html, 'sw-band', ctx.block('sw-band', bandHtml), { after: '</header>' }), file, 'band');

    // 2. wall after the article, inside the padded section
    const wallHtml = ctx
      .wall({ eyebrow: cfg.wall.eyebrow, title: cfg.wall.title, items: cfg.wall.items, cols: cfg.wall.cols })
      .replace('class="sjm-wall"', 'class="sjm-wall sjm-wall--sw"');
    const wall = bleed(`${cfg.wall.items.length === 3 ? WALL_STYLE : ''}${wallHtml}`);
    out = must(ctx.place(out, 'sw-wall', ctx.block('sw-wall', wall), { after: '</article>' }), file, 'wall');

    // 3. CTA banner near the end
    let cta = ctx.ctaBand({ id: cfg.cta.id, title: cfg.cta.title, sub: cfg.cta.sub });
    cta = landCrop(cta, cfg.cta.id, ctx);
    if (cfg.kind === 'service') {
      out = must(ctx.place(out, 'sw-cta', ctx.block('sw-cta', bleed(cta)), { after: '</aside>', occurrence: 'last' }), file, 'cta');
    } else {
      const padded = `<div style="padding-bottom:clamp(40px,6vw,88px)">${cta}</div>`;
      out = must(
        ctx.place(out, 'sw-cta', ctx.block('sw-cta', padded), { after: /<section class="faq-block"[\s\S]*?<\/section>/ }),
        file,
        'cta',
      );
    }
    return out;
  },
};
