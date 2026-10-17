// Family "core": the ten most visible pages (home, about, contact, faq, testimonials,
// speaker, press, ads, services index, work index).
//
// These are bespoke pages, so they carry a little more media than the templated ones, but it
// stays editorial: a photo band after the hero, a poster wall where proof or navigation
// belongs, a CTA band near the end. Everything is added between existing sections and never
// inside a text run, so inject.mjs can strip it and get the original bytes back.
//
// Copy is deliberately a small shared set (CTA, "Track record" wall, "Pick a ...") so the
// translated pages (/, /about, /services, /contact) add few new segments. Every number,
// outlet and event used here is already on the site or readable in the photo itself.
//
// Photo choices follow docs/media-system.md rule 4: these are global pages, so any photo is
// allowed, but no caption claims a place the photo does not show. Within one page a photo is
// used once, and none that is baked into a poster shown on the same page. The Press Lounge
// shot is also the existing portrait on /, /about and /ads, so it only appears on /press.
//
// Anchors match stable markers (section classes, h2 text, comments), never line numbers, so
// the parallel "AI SEO" edits to homepage-body.html and services-body.html do not matter.

import fs from 'node:fs';

const FILES = [
  'homepage-body.html',
  'about-body.html',
  'contact-body.html',
  'faq-body.html',
  'testimonials-body.html',
  'speaker-body.html',
  'press-body.html',
  'ads-body.html',
  'services-body.html',
  'work-body.html',
];

const GRAPHICS = JSON.parse(fs.readFileSync(new URL('../../../lib/media/graphics.json', import.meta.url), 'utf8'));

// ---- shared copy (reused verbatim across pages on purpose) -------------------------------------
const CTA_EYEBROW = 'Work with Shilika';
const CTA_TITLE = 'Book a 30-min <em>intro call</em>.';
const CTA_SUB = "I'll come prepped with a teardown of your current press footprint.";
const STATS_EYEBROW = 'Track record';
const STATS_TITLE = 'Six years, <em>counted</em>.';
const STAGE_EYEBROW = 'On stage';

// ---- anchors -----------------------------------------------------------------------------------
/** Whole <section class="cls"> ... </section>; fails to match if another <section> is nested. */
const section = (cls) => new RegExp(`<section class="${cls}"[^>]*>(?:(?!<section\\b)[\\s\\S])*?</section>`);
/** A top-level element such as <header class="x"> ... </header>. */
const element = (tag, cls) => new RegExp(`<${tag} class="${cls}"[^>]*>[\\s\\S]*?</${tag}>`);

// ---- scoped wrappers (styles live inside the block so media.css stays untouched) ---------------
const STYLE = {
  // A band that sits inside a section, between its heading and its list: shorter on desktop.
  gap: `<style>.cj-gap{margin:0 0 clamp(40px,5vw,72px)}@media (min-width:721px){.cj-gap .sjm-band{aspect-ratio:16/5;max-height:460px}.cj-gap .sjm-band__copy{max-width:min(460px,100%)}}</style>`,
  // Break out of a 720px article column to the full viewport width. The resets undo the
  // `.body p`, `.body a` rules of the host page so the block looks the same as everywhere else.
  bleed: `<style>.cj-bleed{width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw)}.cj-bleed p{margin-bottom:0}.cj-bleed a{text-decoration:none}.cj-bleed .sjm-btn,.cj-bleed .sjm-btn:hover{color:var(--ink,#161410)}.cj-bleed .sjm-btn--ghost{color:var(--paper,#f4f2ea)}.cj-bleed .sjm-btn--ghost:hover{color:var(--ink,#161410)}</style>`,
  // Line a wall or strip up with the page's own grid instead of the 1280px default.
  align: `<style>.cj-align .sjm-wall{max-width:var(--max,1440px)}.cj-align .sjm-strip__head{max-width:var(--max,1440px)}.cj-align .sjm-strip__track{--sjm-edge:max(var(--sjm-pad),calc((100% - var(--max,1440px)) / 2 + var(--sjm-pad)))}</style>`,
  // Cancel the horizontal padding of a .body-wrap so a CTA band lines up with the page gutters.
  inset: `<style>.cj-inset{margin-left:calc(-1 * var(--pad,24px));margin-right:calc(-1 * var(--pad,24px))}</style>`,
  // Space under the last block on a page so it does not touch the footer marquee.
  tail: `<style>.cj-tail{padding-bottom:clamp(40px,6vw,96px)}</style>`,
  // Four snapshots fill the row on desktop instead of leaving a gap on the right.
  fill4: `<style>@media (min-width:901px){.cj-fill4 .sjm-strip__item{flex:0 0 calc((100% - 3 * clamp(10px,1.4vw,18px)) / 4)}}</style>`,
  // Dark continuation of the contact section so a quiet photo does not cut the page in two.
  dark: `<style>.cj-dark{background:var(--ink,#161410);padding:0 0 clamp(48px,6vw,96px)}.cj-dark .sjm-figure{margin-top:0;margin-bottom:0}.cj-dark .sjm-figure figcaption{color:oklch(0.96 0.01 90 / 0.62)}.cj-dark .sjm-figure figcaption b{color:var(--paper,#f4f2ea)}.cj-dark .sjm-figure__frame{background:var(--ink-2,#1f1c16)}</style>`,
  // Video next to a few words, sized to sit inside a 720px article column.
  split: `<style>.cj-split{--sjm-lime:var(--lime,oklch(0.92 0.18 115));--sjm-mono:var(--font-mono,'Geist Mono',monospace);--sjm-display:var(--font-display,'Instrument Serif',serif);--sjm-body:var(--font-body,'Inter Tight',sans-serif);display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:clamp(24px,5vw,56px);align-items:center;margin:clamp(40px,6vw,72px) 0;color:var(--ink,#161410);font-family:var(--sjm-body)}.cj-split *{box-sizing:border-box}.cj-split .sjm-video{margin:0;padding:0;max-width:300px}.cj-split .cj-split__title{margin:14px 0 0;font-family:var(--sjm-display);font-weight:400;font-size:clamp(30px,3.6vw,46px);line-height:1.04;letter-spacing:-.015em;text-wrap:balance}.cj-split .cj-split__title em{font-style:italic}.cj-split .cj-split__sub{margin:16px 0 0;max-width:40ch;font-size:17px;line-height:1.55;color:oklch(0.35 0.01 80)}@media (max-width:720px){.cj-split{grid-template-columns:1fr}}</style>`,
};

const gap = (html) => `${STYLE.gap}<div class="cj-gap">${html}</div>`;
const bleed = (html) => `${STYLE.bleed}<div class="cj-bleed">${html}</div>`;
const inset = (html) => `${STYLE.inset}<div class="cj-inset">${html}</div>`;
const align = (html) => `${STYLE.align}<div class="cj-align">${html}</div>`;
const tail = (html) => `${STYLE.tail}<div class="cj-tail">${html}</div>`;
const dark = (html) => `${STYLE.dark}<div class="cj-dark">${html}</div>`;

/** Shift the focal point of the first <img> in a fragment (inline style, additive). */
const focus = (html, pos) => html.replace('<img ', `<img style="object-position:${pos}" `);

/** Open a CTA link in the same tab (mailto: links should not open a blank tab). */
const sameTab = (html) => html.replace(/(<a [^>]*href="mailto:[^"]*")\s+target="_blank"\s+rel="noopener"/g, '$1');

export default {
  name: 'core',
  describe: 'home, about, contact, faq, testimonials, speaker, press, ads, services index, work index',
  files: () => FILES.slice(),

  apply(html, file, ctx) {
    const { block, place, band, figure, wall, strip, ctaBand, video, esc, posterPicture, graphic } = ctx;

    const put = (key, markup, where) => {
      const result = place(html, key, block(key, markup), where);
      if (!result.placed) throw new Error(`${file}: anchor for "${key}" not found`);
      html = result.html;
    };

    const statsWall = (ids, opts = {}) =>
      wall({ eyebrow: STATS_EYEBROW, title: STATS_TITLE, items: ids.map((id) => ({ id })), ...opts });

    const callBand = (id, opts = {}) =>
      ctaBand({ id, eyebrow: CTA_EYEBROW, title: CTA_TITLE, sub: CTA_SUB, ...opts });

    /** Playable stage clip beside a few words. The wrapper keeps it at 300px instead of full column. */
    const stageClip = ({ title, sub }) =>
      `${STYLE.split}<div class="cj-split"><div class="cj-split__media">${video({ id: 'speaker-reel' })}</div><div class="cj-split__copy"><p class="sjm-eyebrow">${esc(STAGE_EYEBROW)}</p><p class="cj-split__title">${title}</p><p class="cj-split__sub">${esc(sub)}</p></div></div>`;

    switch (file) {
      // ---------------------------------------------------------------------------------------
      case 'homepage-body.html': {
        // Dark run (ticker, intro video, case studies): a photo band gives the eye a rest.
        put(
          'core-home-band',
          band({
            id: 'library',
            align: 'right',
            eyebrow: 'Since 2019',
            title: 'Fractional. Senior. <em>Direct.</em>',
            sub: 'Placing Web3 and AI founders in Forbes, CoinDesk and Cointelegraph.',
          }),
          { after: section('intro-video') },
        );
        // Proof: the four headline numbers as posters, between coverage and testimonials.
        put(
          'core-home-stats',
          align(statsWall(['poster-stat-placements', 'poster-stat-tier1', 'poster-stat-launches', 'poster-stat-impressions'])),
          { after: section('press" id="press') },
        );
        // Long text run (services list): snapshots from the stages and halls the page talks about.
        put(
          'core-home-road',
          STYLE.fill4 +
            `<div class="cj-fill4">${align(
              strip({
                eyebrow: 'On the road',
                title: 'The work, <em>on the ground</em>.',
                items: [
                  { id: 'token2049-hall', caption: 'TOKEN2049 Singapore' },
                  { id: 'stablecoin-summit', caption: 'Stablecoin Summit 2023' },
                  { id: 'stage-b', caption: 'On stage' },
                  { id: 'sg-bridge-a', caption: 'Marina Bay, Singapore' },
                ],
              }),
            )}</div>`,
          { after: section('services" id="services') },
        );
        // The AI SEO section now sits last; the CTA goes between it and the footer marker.
        put('core-home-cta', tail(callBand('sg-marina-a')), { before: '<!-- Footer -->' });
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'about-body.html': {
        // The header already carries the Press Lounge portrait, so that photo stays out of this page.
        put(
          'core-about-band',
          band({
            id: 'sg-marina-b',
            eyebrow: 'Regions',
            title: 'Six markets, <em>one operator</em>.',
            sub: 'Korea, Japan, Vietnam, Singapore, India and the UAE.',
          }),
          { after: element('header', 'profile-header') },
        );
        put(
          'core-about-regions',
          bleed(
            wall({
              eyebrow: 'Region guides',
              title: 'Pick a <em>market</em>.',
              cols: 6,
              items: [
                { id: 'poster-india', href: '/india' },
                { id: 'poster-singapore', href: '/singapore' },
                { id: 'poster-korea', href: '/korea' },
                { id: 'poster-japan', href: '/japan' },
                { id: 'poster-mena', href: '/dubai-mena' },
                { id: 'poster-apac', href: '/apac' },
              ],
            }),
          ),
          { before: '<h2>Areas of expertise</h2>' },
        );
        put(
          'core-about-stage',
          stageClip({
            title: 'Panels, workshops and <em>keynotes</em>.',
            sub: 'Binary Summit Bangkok, India Blockchain Week and Web3 Conf Goa.',
          }),
          { before: '<h2>How to work with Shilika</h2>' },
        );
        put('core-about-cta', bleed(callBand('depin-day-hk')), { before: '<h2>Frequently asked questions</h2>' });
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'contact-body.html': {
        // The form is the point. One quiet photo after it, nothing that asks for a click.
        put(
          'core-contact-figure',
          dark(
            figure({
              id: 'lounge',
              size: 'narrow',
              label: 'Shilika Jain',
              caption: 'Fractional PR for Web3 and AI founders',
            }),
          ),
          { after: section('contact" id="contact') },
        );
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'faq-body.html': {
        put(
          'core-faq-band',
          gap(
            band({
              id: 'sg-river-b',
              align: 'right',
              eyebrow: 'Straight answers',
              title: 'Six years of founder questions, <em>answered</em>.',
            }),
          ),
          { before: '<div class="faq-list"' },
        );
        put('core-faq-cta', tail(focus(callBand('stage-b'), '50% 12%')), { after: section('faq" id="faq') });
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'testimonials-body.html': {
        put(
          'core-testimonials-band',
          band({
            id: 'sg-bridge-b',
            eyebrow: '19 recommendations',
            title: 'Unedited, <em>straight from LinkedIn</em>.',
            sub: 'From founders, CMOs and journalists who worked with Shilika.',
          }),
          { after: element('header', 't-header') },
        );
        // Proof right before the page's own "next recommendation" strip.
        put(
          'core-testimonials-stats',
          align(
            statsWall(
              ['poster-stat-placements', 'poster-stat-tier1', 'poster-stat-launches', 'poster-stat-countries', 'poster-stat-impressions'],
              { cols: 5 },
            ),
          ),
          { before: '<!-- CTA -->' },
        );
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'speaker-body.html': {
        put(
          'core-speaker-band',
          band({
            id: 'lounge',
            eyebrow: 'Speaker',
            title: 'Six topics, <em>six formats</em>.',
            sub: 'Podcast slots confirmed inside 7 days, keynotes inside 4 weeks.',
          }),
          { after: element('header', 'speaker-header') },
        );
        put(
          'core-speaker-clip',
          stageClip({
            title: 'A clip <em>from the stage</em>.',
            sub: 'Press play with sound on. Keynotes run 25 to 45 minutes.',
          }),
          { before: '<h2>Formats</h2>' },
        );
        put(
          'core-speaker-topics',
          bleed(
            wall({
              eyebrow: 'Keynote topics',
              title: 'Pick a <em>topic</em>.',
              items: [
                { id: 'poster-speaker' },
                { id: 'poster-apac', href: '/apac' },
                { id: 'poster-token-launch', href: '/services/token-launch-pr' },
                { id: 'poster-kol', href: '/services/kol-marketing' },
              ],
            }),
          ),
          { before: '<h2>Recent and upcoming appearances</h2>' },
        );
        put(
          'core-speaker-cta',
          inset(
            sameTab(
              focus(
                ctaBand({
                  id: 'stage-a',
                  eyebrow: 'Speaker bookings',
                  title: 'Need a speaker for <em>Web3 or AI PR</em>?',
                  sub: 'Confirmed podcast slots inside 7 days, keynote slots inside 4 weeks.',
                  primary: { label: 'Email speaker enquiry', href: 'mailto:shilika@shilikajain.com?subject=Speaking%20enquiry' },
                  secondary: { label: 'Book a 30-min call', href: 'https://calendly.com/shilikajain' },
                }),
                '50% 30%',
              ),
            ),
          ),
          { before: '<aside class="faq-block" id="speaker-faq">' },
        );
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'press-body.html': {
        put(
          'core-press-figure',
          figure({
            id: 'press-lounge',
            size: 'narrow',
            label: 'Press Lounge',
            caption: 'Consensus conference',
          }),
          { after: section('press" id="press') },
        );
        put('core-press-kit', align(pressKit({ esc, posterPicture, graphic })), { after: '<!--/sjm:core-press-figure-->' });
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'ads-body.html': {
        // A paid landing page: no links out of the page, nothing that competes with the booking CTA.
        // The hero already shows the Press Lounge portrait, so that photo stays out of this page.
        put(
          'core-ads-band',
          band({
            id: 'sg-marina-a',
            align: 'right',
            eyebrow: 'Embedded PR',
            title: 'Your launch, <em>on the front page</em>.',
            sub: 'Fractional PR for Web3 and AI founders. 50+ protocols placed.',
          }),
          { after: section('props" id="services') },
        );
        put(
          'core-ads-stats',
          align(statsWall(['poster-stat-placements', 'poster-stat-tier1', 'poster-stat-launches', 'poster-stat-impressions'])),
          { after: section('stats') },
        );
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'services-body.html': {
        put(
          'core-services-band',
          gap(
            band({
              id: 'library',
              align: 'right',
              eyebrow: 'Services',
              title: 'One operator, <em>no agency layers</em>.',
              sub: 'Retainers sized to the work, with direct founder access.',
            }),
          ),
          { before: '<div class="services-list">' },
        );
        put(
          'core-services-wall',
          align(
            wall({
              eyebrow: 'Playbooks',
              title: 'Pick a <em>playbook</em>.',
              cols: 5,
              items: [
                { id: 'poster-founder-profiling', href: '/services/founder-profiling' },
                { id: 'poster-kol', href: '/services/kol-marketing' },
                { id: 'poster-ai-pr', href: '/services/ai-startup-pr' },
                { id: 'poster-token-launch', href: '/services/token-launch-pr' },
                { id: 'poster-cybersecurity', href: '/services/cybersecurity-pr' },
              ],
            }),
          ),
          { after: section('services" id="services') },
        );
        return html;
      }

      // ---------------------------------------------------------------------------------------
      case 'work-body.html': {
        put(
          'core-work-band',
          gap(
            band({
              id: 'sg-marina-d',
              align: 'right',
              eyebrow: 'Case studies',
              title: 'Six launches, <em>on the record</em>.',
              sub: 'Gaia AI, RARI, MANTRA, Fluence, Web3Auth and Bullieverse.',
            }),
          ),
          { before: '<div class="cases">' },
        );
        put('core-work-cta', tail(callBand('sg-bridge-a')), { after: section('work" id="work') });
        return html;
      }

      default:
        throw new Error(`core family does not know ${file}`);
    }
  },
};

// ---- press media kit -----------------------------------------------------------------------------
// Custom markup on top of the .sjm-wall classes: every asset gets a real download link and its
// pixel size as the caption.
function pressKit({ esc, posterPicture, graphic }) {
  const ids = Object.keys(GRAPHICS);
  const ofGroup = (prefix) => ids.filter((id) => id.startsWith(prefix));
  const POSTER_ORDER = [
    'stat-placements', 'stat-tier1', 'stat-impressions', 'stat-launches', 'stat-countries',
    'web3-pr', 'ai-pr', 'token-launch', 'kol', 'founder-profiling',
    'cybersecurity', 'speaker', 'retainer', 'teardown', 'singapore',
    'korea', 'india', 'japan', 'mena', 'apac',
  ].map((n) => `poster-${n}`);
  const posters = [...POSTER_ORDER.filter((id) => GRAPHICS[id]), ...ofGroup('poster-').filter((id) => !POSTER_ORDER.includes(id))];
  const stories = ofGroup('story-');
  const COVER_ORDER = ['cover-linkedin', 'cover-x', 'cover-youtube', 'cover-newsletter'];
  const covers = [...COVER_ORDER.filter((id) => GRAPHICS[id]), ...ofGroup('cover-').filter((id) => !COVER_ORDER.includes(id))];
  const cards = ofGroup('og-');

  const label = (id) => id.replace(/^(poster|story|cover|og)-/, '').replace(/-/g, ' ');
  const size = (g) => `${g.width} x ${g.height} px`;
  const file = (g) => `/assets/media/${g.out}.jpg`;

  const item = (id, { raster }) => {
    const g = graphic(id);
    const href = file(g);
    const thumb = raster
      ? posterPicture(id, { sizes: '(min-width: 1100px) 238px, (min-width: 640px) 30vw, 46vw' })
      : `<picture><img src="${href}" width="${g.width}" height="${g.height}" alt="${esc(g.alt)}" loading="lazy" decoding="async"></picture>`;
    return `<figure class="sjm-wall__item"><a href="${href}" download tabindex="-1" aria-hidden="true">${thumb}</a><figcaption><a href="${href}" download aria-label="Download ${esc(label(id))}, ${g.width} by ${g.height} pixels">${size(g)}</a></figcaption></figure>`;
  };

  const group = (name, mod, items, opts) =>
    `<h3 class="cj-kit__label">${name}</h3><div class="sjm-wall__grid cj-kit__grid cj-kit__grid--${mod}">${items.map((id) => item(id, opts)).join('')}</div>`;

  return `<style>
.cj-kit{--sjm-lime:var(--lime,oklch(0.92 0.18 115));--sjm-mono:var(--font-mono,'Geist Mono',monospace);--sjm-display:var(--font-display,'Instrument Serif',serif)}
.cj-kit .sjm-wall__head{margin-bottom:8px}
.cj-kit__label{margin:clamp(28px,4vw,48px) 0 14px;padding-top:14px;border-top:1px solid var(--line,oklch(0.85 0.01 80));font-family:var(--sjm-mono);font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--ink,#161410)}
.cj-kit__grid--posters,.cj-kit__grid--stories{grid-template-columns:repeat(5,minmax(0,1fr))}
.cj-kit__grid--covers{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
.cj-kit__grid--cards{grid-template-columns:repeat(4,minmax(0,1fr))}
.cj-kit__grid--stories .sjm-wall__item img{aspect-ratio:9/16}
.cj-kit__grid--covers .sjm-wall__item img,.cj-kit__grid--cards .sjm-wall__item img{aspect-ratio:auto;height:auto}
.cj-kit__grid--cards .sjm-wall__item img{border:1px solid var(--line,oklch(0.85 0.01 80))}
.cj-kit .sjm-wall__item a{transform:none}
.cj-kit .sjm-wall__item figcaption a{display:inline;border-bottom:1px solid var(--sjm-lime);color:inherit}
.cj-kit .sjm-wall__item figcaption a:hover{color:var(--ink,#161410)}
@media (max-width:1100px){.cj-kit__grid--posters,.cj-kit__grid--stories{grid-template-columns:repeat(3,minmax(0,1fr))}.cj-kit__grid--cards{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:640px){.cj-kit__grid--posters,.cj-kit__grid--stories,.cj-kit__grid--cards,.cj-kit__grid--covers{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:420px){.cj-kit__grid--covers{grid-template-columns:1fr}}
</style>
<section class="sjm-wall cj-kit" data-sjm="kit" id="media-kit" aria-labelledby="media-kit-title"><div class="sjm-wall__head"><div><p class="sjm-eyebrow">Media kit</p><h2 class="sjm-wall__title" id="media-kit-title">Posters, covers and <em>share cards</em>.</h2></div></div>${group('Posters', 'posters', posters, { raster: true })}${group('Stories', 'stories', stories, { raster: true })}${group('Covers', 'covers', covers, { raster: false })}${group('Share cards', 'cards', cards, { raster: false })}</section>`;
}
