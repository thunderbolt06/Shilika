// HTML builders for the .sjm-* blocks (styles live in app/media.css).
//
// Every builder returns a self-contained, block-level fragment. Wrap it with
// `block(key, html)` before placing it in a partial so inject.mjs can find, replace
// and remove it later. Plain-text arguments (alt, caption, eyebrow, sub) are escaped;
// `title` is trusted HTML so it can carry <em>.

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, readCatalog, readManifest } from './lib.mjs';

const catalog = readCatalog();
const manifest = readManifest();
const graphicsFile = path.join(ROOT, 'lib', 'media', 'graphics.json');
const graphics = fs.existsSync(graphicsFile) ? JSON.parse(fs.readFileSync(graphicsFile, 'utf8')) : {};
const photoById = Object.fromEntries(catalog.photos.map((p) => [p.id, p]));

export const CALENDLY = 'https://calendly.com/shilikajain/30min/';
export const TELEGRAM = 'https://t.me/shilika3';
export const PHOTO_IDS = catalog.photos.map((p) => p.id);
/** Photos with sponsor or event lettering behind the copy: bands on them get a heavier scrim (.sjm-band--bold). */
export const SIGNAGE_IDS = new Set(['depin-day-hk', 'stablecoin-summit', 'press-lounge']);
export const WIDE_IDS = Object.keys(manifest).filter((id) => manifest[id].wide);

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Marker pair the injector uses to find, replace and strip a block. */
export function block(key, html) {
  return `<!--sjm:${key}-->\n${html.trim()}\n<!--/sjm:${key}-->`;
}

export function photo(id) {
  const p = photoById[id];
  if (!p) throw new Error(`Unknown photo id "${id}". Known: ${PHOTO_IDS.join(', ')}`);
  return p;
}

function crop(id, name) {
  const entry = manifest[id]?.[name];
  if (!entry) {
    const have = Object.keys(manifest[id] ?? {}).join(', ') || 'none';
    throw new Error(`Photo "${id}" has no "${name}" crop (has: ${have}).`);
  }
  return entry;
}

export function srcset(id, name) {
  return crop(id, name)
    .files.map((f) => `${f.url} ${f.width}w`)
    .join(', ');
}

/** Does this photo have the crop? Lets callers fall back gracefully. */
export function hasCrop(id, name) {
  return Boolean(manifest[id]?.[name]);
}

/**
 * <picture> with a WebP srcset for `cropName`, optionally switching to another crop on
 * small screens. Width/height always describe the default <img> so layout cannot shift.
 */
export function picture({
  id,
  crop: cropName = 'land',
  sizes = '100vw',
  alt,
  loading = 'lazy',
  priority = false,
  mobile = null, // { crop: 'port', sizes: '100vw', max: 720 }
  className = '',
}) {
  const main = crop(id, cropName);
  const files = main.files;
  const dflt = files[Math.min(1, files.length - 1)];
  const text = alt ?? photo(id).alt;
  const parts = [];
  if (mobile && hasCrop(id, mobile.crop)) {
    parts.push(
      `<source media="(max-width: ${mobile.max ?? 720}px)" type="image/webp" srcset="${srcset(id, mobile.crop)}" sizes="${mobile.sizes ?? '100vw'}">`,
    );
  }
  parts.push(`<source type="image/webp" srcset="${srcset(id, cropName)}" sizes="${sizes}">`);
  const attrs = [
    `src="${dflt.url}"`,
    `width="${dflt.width}"`,
    `height="${dflt.height}"`,
    `alt="${esc(text)}"`,
    priority ? 'fetchpriority="high"' : `loading="${loading}"`,
    'decoding="async"',
  ];
  if (className) attrs.push(`class="${className}"`);
  return `<picture>${parts.join('')}<img ${attrs.join(' ')}></picture>`;
}

function buttons({ cta, cta2 }) {
  const out = [];
  if (cta) out.push(`<a class="sjm-btn" href="${cta.href}"${cta.external === false ? '' : ' target="_blank" rel="noopener"'}>${esc(cta.label)}</a>`);
  if (cta2) out.push(`<a class="sjm-btn sjm-btn--ghost" href="${cta2.href}"${cta2.external === false ? '' : ' target="_blank" rel="noopener"'}>${esc(cta2.label)}</a>`);
  return out.length ? `<div class="sjm-band__row">${out.join('')}</div>` : '';
}

export const CTA_CALL = { label: 'Book a call', href: CALENDLY };
export const CTA_TELEGRAM = { label: 'Chat on Telegram', href: TELEGRAM };

/**
 * Full-bleed photo band. Desktop uses the 2.4:1 `wide` crop (when the photo has one,
 * otherwise `land`); phones switch to the `port` crop.
 */
export function band({
  id,
  eyebrow,
  title,
  sub,
  cta,
  cta2,
  align = 'left', // left | right | center | clear (no scrim, no copy)
  alt,
  loading = 'lazy',
  priority = false,
}) {
  if (!hasCrop(id, 'wide')) {
    throw new Error(`band() needs a photo with a "wide" crop; "${id}" has none. Use one of: ${WIDE_IDS.join(', ')}`);
  }
  const pic = picture({
    id,
    crop: 'wide',
    sizes: '100vw',
    alt,
    loading,
    priority,
    mobile: hasCrop(id, 'port') ? { crop: 'port', sizes: '100vw', max: 720 } : null,
    className: '',
  }).replace('<picture>', '<picture class="sjm-band__pic">');
  const hasCopy = Boolean(eyebrow || title || sub || cta);
  const copy = hasCopy
    ? `<div class="sjm-band__copy">${eyebrow ? `<p class="sjm-eyebrow">${esc(eyebrow)}</p>` : ''}${title ? `<p class="sjm-band__title">${title}</p>` : ''}${sub ? `<p class="sjm-band__sub">${esc(sub)}</p>` : ''}${buttons({ cta, cta2 })}</div>`
    : '';
  const mod = !hasCopy || align === 'clear' ? 'clear' : align;
  const bold = hasCopy && SIGNAGE_IDS.has(id) ? ' sjm-band--bold' : '';
  return `<div class="sjm-band sjm-band--${mod}${bold}" data-sjm="band">${pic}${copy}</div>`;
}

/** Captioned in-content figure using the 16:10 `land` crop. */
export function figure({
  id,
  crop: cropName = 'land',
  size = 'default', // default | wide | narrow
  label,
  caption,
  alt,
  sizes = '(min-width: 1100px) 1040px, 92vw',
  loading = 'lazy',
}) {
  const pic = picture({ id, crop: cropName, sizes, alt, loading });
  const cap = label || caption ? `<figcaption>${label ? `<b>${esc(label)}</b>` : ''}${caption ? `<span>${esc(caption)}</span>` : ''}</figcaption>` : '';
  const mod = size === 'default' ? '' : ` sjm-figure--${size}`;
  return `<figure class="sjm-figure${mod}" data-sjm="figure"><div class="sjm-figure__frame">${pic}</div>${cap}</figure>`;
}

export function graphic(id) {
  const g = graphics[id];
  if (!g) throw new Error(`Unknown graphic "${id}". See lib/media/graphics.json.`);
  return g;
}

/** Baked poster (4:5 or 9:16) as <picture>: WebP with JPG fallback. */
export function posterPicture(id, { alt, loading = 'lazy', sizes = '(min-width: 900px) 25vw, 46vw' } = {}) {
  const g = graphic(id);
  const base = `/assets/media/${g.out}`;
  const text = alt ?? g.alt;
  const webp = g.webp ? `<source type="image/webp" srcset="${base}.webp" sizes="${sizes}">` : '';
  return `<picture>${webp}<img src="${base}.jpg" width="${g.width}" height="${g.height}" alt="${esc(text)}" loading="${loading}" decoding="async"></picture>`;
}

/** Row of posters. `items` = [{ id: 'poster-stat-tier1', caption?, href?, alt? }] */
export function wall({ eyebrow, title, items, cols }) {
  const n = items.length;
  const colCount = cols ?? Math.min(n, 4);
  const figs = items
    .map((it) => {
      const pic = posterPicture(it.id, { alt: it.alt });
      const body = it.href ? `<a href="${it.href}">${pic}</a>` : pic;
      return `<figure class="sjm-wall__item">${body}${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ''}</figure>`;
    })
    .join('');
  const head =
    eyebrow || title
      ? `<div class="sjm-wall__head"><div>${eyebrow ? `<p class="sjm-eyebrow">${esc(eyebrow)}</p>` : ''}${title ? `<p class="sjm-wall__title">${title}</p>` : ''}</div></div>`
      : '';
  return `<div class="sjm-wall" data-sjm="wall" style="--sjm-cols:${colCount}">${head}<div class="sjm-wall__grid" data-n="${n}">${figs}</div></div>`;
}

/** Scrolling row of portrait snapshots. `items` = [{ id, caption?, alt? }] using the 4:5 crop. */
export function strip({ eyebrow, title, items }) {
  const figs = items
    .map((it) => {
      const files = crop(it.id, 'port').files;
      const dflt = files[Math.min(1, files.length - 1)];
      return `<figure class="sjm-strip__item"><img src="${dflt.url}" srcset="${srcset(it.id, 'port')}" sizes="(min-width: 900px) 300px, 60vw" width="${dflt.width}" height="${dflt.height}" alt="${esc(it.alt ?? photo(it.id).alt)}" loading="lazy" decoding="async">${it.caption ? `<figcaption>${esc(it.caption)}</figcaption>` : ''}</figure>`;
    })
    .join('');
  const head =
    eyebrow || title
      ? `<div class="sjm-strip__head">${eyebrow ? `<p class="sjm-eyebrow">${esc(eyebrow)}</p>` : ''}${title ? `<p class="sjm-strip__title">${title}</p>` : ''}</div>`
      : '';
  return `<div class="sjm-strip" data-sjm="strip">${head}<div class="sjm-strip__track">${figs}</div></div>`;
}

/** Dark CTA banner with a portrait; defaults mirror the contact page copy. */
export function ctaBand({
  id = 'sg-shophouse-b',
  eyebrow = 'Work with Shilika',
  title = 'Book a 30-min <em>intro call</em>.',
  sub = 'I come prepped with a teardown of your current press footprint.',
  primary = CTA_CALL,
  secondary = CTA_TELEGRAM,
  alt,
}) {
  const files = crop(id, 'port').files;
  const dflt = files[Math.min(1, files.length - 1)];
  const img = `<img src="${dflt.url}" srcset="${srcset(id, 'port')}" sizes="(min-width: 760px) 40vw, 92vw" width="${dflt.width}" height="${dflt.height}" alt="${esc(alt ?? photo(id).alt)}" loading="lazy" decoding="async">`;
  const btns = [
    primary ? `<a class="sjm-btn" href="${primary.href}" target="_blank" rel="noopener">${esc(primary.label)}</a>` : '',
    secondary ? `<a class="sjm-btn sjm-btn--ghost" href="${secondary.href}" target="_blank" rel="noopener">${esc(secondary.label)}</a>` : '',
  ].join('');
  return `<div class="sjm-cta" data-sjm="cta"><div class="sjm-cta__inner"><div class="sjm-cta__pic">${img}</div><div class="sjm-cta__copy"><p class="sjm-eyebrow">${esc(eyebrow)}</p><p class="sjm-cta__title">${title}</p><p class="sjm-cta__sub">${esc(sub)}</p><div class="sjm-cta__row">${btns}</div></div></div></div>`;
}

/** Small round portrait for bylines. Decorative by default (the name sits beside it). */
export function avatar({ id = 'sg-river-c', size = 40, alt = '' } = {}) {
  const files = crop(id, 'sq').files;
  return `<span class="sjm-avatar" style="--sjm-avatar:${size}px"><img src="${files[0].url}" srcset="${srcset(id, 'sq')}" sizes="${size}px" width="${files[0].width}" height="${files[0].height}" alt="${esc(alt)}" loading="lazy" decoding="async"></span>`;
}

export const VIDEOS = {
  'speaker-reel': { width: 720, height: 1280, label: 'Shilika Jain speaking on stage' },
};

/**
 * Playable clip (native controls, no autoplay, loads only when pressed). The stage talk
 * keeps its sound, so it is never a silent loop. `caption` is optional visible text.
 */
export function video({ id = 'speaker-reel', caption, label, size = 'default' }) {
  const v = VIDEOS[id];
  if (!v) throw new Error(`Unknown video "${id}". Known: ${Object.keys(VIDEOS).join(', ')}`);
  const base = `/assets/media/video/${id}`;
  const name = label ?? v.label;
  const cap = caption ? `<figcaption>${esc(caption)}</figcaption>` : '';
  const mod = size === 'default' ? '' : ` sjm-video--${size}`;
  return `<figure class="sjm-video${mod}" data-sjm="video"><div class="sjm-video__frame"><video controls playsinline preload="none" poster="${base}-poster.webp" width="${v.width}" height="${v.height}" aria-label="${esc(name)}"><source src="${base}.mp4" type="video/mp4"></video></div>${cap}</figure>`;
}
