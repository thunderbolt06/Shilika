// Family "regions": the six country and region pages (Singapore, Korea, India, Japan, APAC,
// Dubai and MENA). They are bespoke, single-column pages with the same skeleton:
//
//   <header class="svc-header">         hero (crumb, meta row, H1, answer box)
//   <section class="stat-strip">        four stat cards   (APAC: <section class="country-grid-wrap">)
//   <section class="svc-body-wrap">     <article class="svc-body"> ... h2 sections ... </article>
//                                       <aside class="faq-block">, author block, related block
//   <section class="cta-strip">         the page's own closing CTA
//
// Blocks, in page order:
//
//   1. region-band    full-bleed photo band right after the header, labelled with a fact from the page
//   2. region-strip   APAC only: event snapshots after the country desks
//   3. region-figure  one captioned photo at the end of the events-calendar section, before the
//                     regulatory section starts (a natural gap in the long article)
//   4. region-poster  the matching baked region poster, between the article and the FAQ
//   5. region-cta     portrait CTA banner between the author block and the related reading
//
// Photo rules (the audit enforces them): Singapore uses Singapore photos; Korea, India, Japan and
// Dubai/MENA use only event and neutral photos, and nothing in the copy, caption or alt text says
// the photo was taken there; APAC mixes places. Each page uses a photo once, and none of its blocks
// repeats the photo that is already baked into that page's region poster.
//
//   poster-singapore bakes sg-bridge-b     poster-korea bakes stage-a       poster-india bakes press-lounge
//   poster-japan     bakes lounge          poster-mena  bakes stablecoin-summit
//   poster-apac      bakes sg-marina-a
//
// Only three event/neutral photos can drive a band (library, lounge, stablecoin-summit) and four
// pages need one, so the library band appears twice, once with the copy on the right (India) and
// once on the left (Dubai/MENA).
//
// Copy: the eyebrow is the region label from the page's own meta row, the title and sub restate a
// stat or sentence that is already on the page. The CTA copy is identical on all six pages (and on
// the core pages), so it adds no new translation segments.

// ---- shared copy (reused verbatim: same strings as scripts/media/families/core.mjs) ---------------
const CTA_EYEBROW = 'Work with Shilika';
const CTA_TITLE = 'Book a 30-min <em>intro call</em>.';
const CTA_SUB = "I'll come prepped with a teardown of your current press footprint.";

// ---- per-page configuration -----------------------------------------------------------------------
const PAGES = {
  'singapore-body.html': {
    slug: 'singapore',
    allowed: ['singapore', 'neutral', 'event'],
    posterPhoto: 'sg-bridge-b',
    poster: 'poster-singapore',
    band: {
      id: 'sg-marina-b',
      align: 'left',
      eyebrow: 'Singapore, MAS hub',
      title: 'Crypto adoption is the highest in <em>Asia</em>.',
      sub: '32 percent of Singapore residents own or use crypto in 2026.',
    },
    figure: { id: 'token2049-hall', label: 'TOKEN2049 Singapore' },
    cta: { id: 'sg-river-a', focus: '50% 32%' },
  },
  'korea-body.html': {
    slug: 'korea',
    allowed: ['neutral', 'event'],
    posterPhoto: 'stage-a',
    poster: 'poster-korea',
    band: {
      id: 'lounge',
      align: 'left',
      eyebrow: 'Korea, FSC frame',
      title: 'Two exchanges carry roughly <em>96%</em> of domestic volume.',
      sub: 'Launch sprints are timed to an Upbit or Bithumb listing.',
    },
    figure: { id: 'stablecoin-summit', label: 'Stablecoin Summit 2023' },
    cta: { id: 'press-lounge', focus: '50% 62%', zoom: { scale: 1.3, origin: '38% 78%' } },
  },
  'india-body.html': {
    slug: 'india',
    allowed: ['neutral', 'event'],
    posterPhoto: 'press-lounge',
    poster: 'poster-india',
    band: {
      id: 'library',
      align: 'right',
      tight: 560,
      eyebrow: 'India, home market',
      title: 'India led the world on <em>crypto adoption</em>.',
      sub: 'Indian exclusive first, international re-report 24 hours behind.',
    },
    figure: { id: 'stage-b', label: 'On stage' },
    cta: { id: 'lounge', focus: '62% 40%' },
  },
  'japan-body.html': {
    slug: 'japan',
    allowed: ['neutral', 'event'],
    posterPhoto: 'lounge',
    poster: 'poster-japan',
    band: {
      id: 'stablecoin-summit',
      align: 'right',
      zoom: { scale: 1.2, origin: '100% 55%' },
      eyebrow: 'Japan, FSA frame',
      title: 'Foreign trust-type stablecoins, legal since <em>1 June 2026</em>.',
      sub: 'Press copy names the FSA frame and a Japanese licensed partner first.',
    },
    figure: { id: 'press-lounge', label: 'Consensus Press Lounge' },
    cta: { id: 'library', focus: '58% 72%', zoom: { scale: 1.45, origin: '58% 72%' } },
  },
  'dubai-mena-body.html': {
    slug: 'dubai-mena',
    allowed: ['neutral', 'event'],
    posterPhoto: 'stablecoin-summit',
    poster: 'poster-mena',
    band: {
      id: 'library',
      align: 'left',
      eyebrow: 'UAE, GCC, MENA',
      title: 'The VARA Travel Rule went live in <em>February 2026</em>.',
      sub: 'Press copy is framed around VARA, ADGM FSRA and RAK DAO.',
    },
    figure: { id: 'lounge' },
    cta: { id: 'stage-a', focus: '50% 15%' },
  },
  'apac-body.html': {
    slug: 'apac',
    allowed: ['singapore', 'hong-kong', 'neutral', 'event'],
    posterPhoto: 'sg-marina-a',
    poster: 'poster-apac',
    band: {
      id: 'sg-river-b',
      align: 'right',
      tight: 600,
      zoom: { scale: 1.18, origin: '100% 45%' },
      eyebrow: 'APAC plus MENA',
      title: 'Six markets, <em>one senior operator</em>.',
      sub: 'Native-language placements in Korean, Japanese, Mandarin, Hindi and Arabic press.',
    },
    strip: {
      eyebrow: 'Event snapshots',
      title: 'Shilika at <em>industry events</em>.',
      items: [
        { id: 'token2049-hall', caption: 'TOKEN2049 Singapore' },
        { id: 'depin-day-hk', caption: 'DePIN Day Hong Kong' },
        { id: 'press-lounge', caption: 'Consensus Press Lounge' },
        { id: 'stablecoin-summit', caption: 'Stablecoin Summit 2023' },
      ],
    },
    cta: { id: 'stage-b', focus: '50% 12%' },
  },
};

// ---- anchors (stable existing markers, never line numbers) --------------------------------------
const ANCHOR = {
  band: { after: '</header>' },
  strip: { after: /<section class="country-grid-wrap">[\s\S]*?<\/section>/ },
  // the first <h2> that follows the "... events calendar ..." heading: the end of that section
  figure: { before: /(?<=<h2>The [^<]*events calendar[^<]*<\/h2>[\s\S]*?)<h2>/ },
  poster: { before: /\n[ \t]*<aside class="faq-block">/ },
  cta: { before: /\n[ \t]*<div class="related-block">/ },
};

// ---- scoped styles, kept inside each block so app/media.css stays untouched ------------------------
// Tablet: cap the copy column so it leaves the subject visible. Desktop: some photos need a narrower
// column because the subject sits close to the copy side.
const bandCss = (cfg) => `<style>
.rg-band .sjm-band__sub { text-wrap: pretty; }
@media (min-width: 721px) and (max-width: 1100px) { .rg-band .sjm-band__copy { max-width: min(600px, 58%); } }
${cfg.tight ? `@media (min-width: 1101px) { .rg-band .sjm-band__copy { max-width: ${cfg.tight}px; } }` : ''}
${cfg.zoom ? `@media (min-width: 721px) { .rg-band .sjm-band__pic img { transform: scale(${cfg.zoom.scale}); transform-origin: ${cfg.zoom.origin}; } }` : ''}
</style>`;

// The figure sits inside the 720px article column: let it fill the column and add spacing that
// matches the headings around it.
const FIGURE_CSS = `<style>
.rg-fig .sjm-figure { padding-inline: 0; margin-block: clamp(36px, 5vw, 56px) clamp(8px, 1.5vw, 16px); }
</style>`;

// The baked poster is a 4:5 card; show it at a calm size, centred between the article and the FAQ.
const POSTER_CSS = `<style>
.rg-poster .sjm-wall { margin-block: clamp(40px, 6vw, 80px) 0; }
.rg-poster .sjm-wall__grid { grid-template-columns: minmax(0, 1fr); max-width: 440px; margin-inline: auto; }
</style>`;

// The strip lines up with the 980px column of the country desks above it on wide screens and stays
// a swipeable row on phones.
const STRIP_CSS = `<style>
.rg-strip .sjm-strip { margin-block: clamp(40px, 5vw, 64px) 0; }
@media (min-width: 900px) {
  .rg-strip .sjm-strip__head, .rg-strip .sjm-strip__track { width: min(980px, 100% - 2 * var(--sjm-pad)); max-width: none; margin-inline: auto; padding-inline: 0; }
  .rg-strip .sjm-strip__track { overflow: visible; }
  .rg-strip .sjm-strip__item { flex: 1 1 0; min-width: 0; }
}
</style>`;

// The CTA sits inside .svc-body-wrap, which already has the page gutters; line it up with the 980px
// related-reading grid below it. `focus` keeps the face inside the shorter phone crop (4:3).
const ctaCss = (cta) => `<style>
.rg-cta .sjm-cta { margin-top: clamp(48px, 6vw, 80px); padding-inline: 0; }
.rg-cta .sjm-cta__inner { max-width: 980px; }
.rg-cta .sjm-cta__pic { overflow: hidden; }
.rg-cta .sjm-cta__pic img { object-position: ${cta.focus};${cta.zoom ? ` transform: scale(${cta.zoom.scale}); transform-origin: ${cta.zoom.origin};` : ''} }
.rg-cta .sjm-cta__title:lang(en) { text-wrap: wrap; max-width: 6.4em; }
</style>`;

export default {
  name: 'regions',
  describe: 'Singapore, Korea, India, Japan, APAC and Dubai/MENA: band, figure, poster, CTA (APAC: strip instead of figure)',
  files() {
    return Object.keys(PAGES);
  },
  apply(html, file, ctx) {
    const cfg = PAGES[file];
    if (!cfg) throw new Error(`regions family has no config for ${file}`);
    const { band, figure, wall, strip, ctaBand, block, place, photo, hasCrop, CTA_CALL, CTA_TELEGRAM } = ctx;

    // Every photo is checked against the page's allowed places and used once per page.
    const used = new Map([[cfg.posterPhoto, 'baked into the region poster']]);
    const claim = (id, where) => {
      if (used.has(id)) throw new Error(`${file}: photo ${id} is used twice (${used.get(id)} and ${where})`);
      if (!cfg.allowed.includes(photo(id).place)) {
        throw new Error(`${file}: photo ${id} (${photo(id).place}) does not fit this page (${where})`);
      }
      used.set(id, where);
    };
    claim(cfg.band.id, 'band');
    if (cfg.figure) claim(cfg.figure.id, 'figure');
    for (const item of cfg.strip?.items ?? []) claim(item.id, 'strip');
    claim(cfg.cta.id, 'cta');
    for (const [id, where] of used) {
      if (where === 'baked into the region poster') continue;
      if (where === 'band' && !hasCrop(id, 'wide')) throw new Error(`${file}: ${id} has no wide crop for a band`);
    }

    const parts = [];
    parts.push({
      key: 'region-band',
      anchor: ANCHOR.band,
      markup: `<div class="rg-band">${bandCss(cfg.band)}${band({
        id: cfg.band.id,
        eyebrow: cfg.band.eyebrow,
        title: cfg.band.title,
        sub: cfg.band.sub,
        align: cfg.band.align,
      })}</div>`,
    });
    if (cfg.strip) {
      parts.push({
        key: 'region-strip',
        anchor: ANCHOR.strip,
        markup: `<div class="rg-strip">${STRIP_CSS}${strip(cfg.strip)}</div>`,
      });
    }
    if (cfg.figure) {
      parts.push({
        key: 'region-figure',
        anchor: ANCHOR.figure,
        markup: `<div class="rg-fig">${FIGURE_CSS}${figure({
          id: cfg.figure.id,
          crop: 'land',
          label: cfg.figure.label,
          sizes: '(min-width: 800px) 720px, 92vw',
        })}</div>`,
      });
    }
    parts.push(
      {
        key: 'region-poster',
        anchor: ANCHOR.poster,
        markup: `<div class="rg-poster">${POSTER_CSS}${wall({ items: [{ id: cfg.poster }] })}</div>`,
      },
      {
        key: 'region-cta',
        anchor: ANCHOR.cta,
        markup: `<div class="rg-cta">${ctaCss(cfg.cta)}${ctaBand({
          id: cfg.cta.id,
          eyebrow: CTA_EYEBROW,
          title: CTA_TITLE,
          sub: CTA_SUB,
          primary: CTA_CALL,
          secondary: CTA_TELEGRAM,
        })}</div>`,
      },
    );

    let out = html;
    for (const part of parts) {
      const res = place(out, part.key, block(part.key, part.markup), part.anchor);
      if (!res.placed) throw new Error(`${file}: anchor for "${part.key}" not found`);
      out = res.html;
    }
    return out;
  },
};
