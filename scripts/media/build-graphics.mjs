#!/usr/bin/env node
// Bakes the text graphics (share cards, posters, stories, social covers).
//
//   node scripts/media/build-graphics.mjs --src "<folder with portraits>"
//   node scripts/media/build-graphics.mjs --src ... --only og-home,poster-teardown
//   node scripts/media/build-graphics.mjs --src ... --group og        (og | poster | story | cover)
//
// Each spec in graphics.config.mjs becomes an HTML file (templates/*.html),
// rendered by headless Chrome with the site's own web fonts, then encoded with sharp.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { pathToFileURL, fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { CACHE, PUBLIC_MEDIA, ROOT, arg, ensureDir, orientedSource, readCatalog, sourceDir } from './lib.mjs';
import { FORMATS, GRAPHICS } from './graphics.config.mjs';

const run = promisify(execFile);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FONT_CSS_URL =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/155.0.0.0 Safari/537.36';

const catalog = readCatalog();
const recorded = {};

const plain = (html = '') =>
  html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

/** Alt text that carries the words baked into the image. */
function altFor(spec) {
  if (spec.alt) return spec.alt;
  const lead = spec.num ? `${plain(spec.num)} ${plain(spec.headline)}` : plain(spec.headline);
  const sub = spec.sub ? ` ${plain(spec.sub)}` : '';
  const who = photos[spec.photo]?.alt ? ` Photo: ${photos[spec.photo].alt}.` : '';
  return `${lead}${sub}${who}`;
}
const photos = Object.fromEntries(catalog.photos.map((p) => [p.id, p]));

/** Download the latin subsets of the site's fonts once and serve them from disk. */
async function localFontsCss() {
  const dir = ensureDir(path.join(CACHE, 'fonts'));
  const cssFile = path.join(dir, 'fonts.css');
  if (fs.existsSync(cssFile)) return cssFile;
  const css = await (await fetch(FONT_CSS_URL, { headers: { 'user-agent': UA } })).text();
  const blocks = css.split(/\/\*\s*([\w-]+)\s*\*\//).slice(1);
  let out = '';
  for (let i = 0; i < blocks.length; i += 2) {
    const subset = blocks[i];
    if (subset !== 'latin' && subset !== 'latin-ext') continue;
    let block = blocks[i + 1];
    const url = /url\((https:[^)]+)\)/.exec(block)[1];
    const file = path.join(dir, `${path.basename(new URL(url).pathname)}`);
    if (!fs.existsSync(file)) fs.writeFileSync(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
    out += `${block.replace(url, pathToFileURL(file).href).trim()}\n`;
  }
  fs.writeFileSync(cssFile, out);
  return cssFile;
}

async function master(photoId) {
  const photo = photos[photoId];
  if (!photo) throw new Error(`Unknown photo "${photoId}"`);
  const out = path.join(ensureDir(path.join(CACHE, 'masters')), `${photoId}.jpg`);
  if (!fs.existsSync(out)) {
    const src = await orientedSource(photo, sourceDir());
    await sharp(src).resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 90 }).toFile(out);
  }
  return out;
}

const fill = (tpl, map) => tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in map ? map[k] : ''));

function htmlFor(spec, fmt, tplText, assets) {
  const photo = photos[spec.photo];
  const focus = photo?.focus ?? { x: 0.5, y: 0.5 };
  const pos = spec.pos ?? `${Math.round(focus.x * 100)}% ${Math.round(focus.y * 100)}%`;
  const eyebrowHtml = spec.eyebrow
    ? `<div class="eyebrow${spec.eyebrowClass ? ' ' + spec.eyebrowClass : ''}"><i class="dot"></i>${spec.eyebrow}</div>`
    : '';
  const subHtml = spec.sub ? `<p class="sub">${spec.sub}</p>` : '';
  const footHtml =
    spec.cta || spec.url
      ? `<div class="foot">${spec.cta ? `<span class="pill">${spec.cta}</span>` : ''}${spec.url ? `<span class="url">${spec.url}</span>` : ''}</div>`
      : '';
  const markPos = spec.mark === false ? null : spec.mark ?? (spec.align === 'top' ? 'br' : fmt.mark) ?? 'tl';
  const markHtml = markPos ? `<div class="mark mark--${markPos}">SJ</div>` : '';
  const flipRow = spec.flip ? 'flex-direction: row-reverse;' : '';
  return fill(tplText, {
    fontsCss: pathToFileURL(assets.fontsCss).href,
    baseCss: pathToFileURL(path.join(HERE, 'templates', 'base.css')).href,
    W: fmt.W,
    H: fmt.H,
    vars: `${fmt.vars ?? ''}${spec.vars ?? ''}`,
    photo: pathToFileURL(assets.photo).href,
    pos,
    origin: spec.origin ?? pos,
    scale: spec.scale ?? 1,
    scrim: spec.scrim ?? 'bottom',
    align: spec.align ?? 'bottom',
    photoW: spec.photoW ?? '46%',
    photoH: spec.photoH ?? '58%',
    flipRow,
    eyebrowHtml,
    headline: spec.headline,
    subHtml,
    footHtml,
    markHtml,
    num: spec.num ?? '',
    extraCss: spec.css ?? '',
  });
}

async function render(spec, assets) {
  const fmt = FORMATS[spec.format];
  const tplText = fs.readFileSync(path.join(HERE, 'templates', `${spec.template}.html`), 'utf8');
  const work = ensureDir(path.join(CACHE, 'render'));
  const htmlFile = path.join(work, `${spec.id}.html`);
  const pngFile = path.join(work, `${spec.id}.png`);
  const photoFile = await master(spec.photo);
  fs.writeFileSync(htmlFile, htmlFor(spec, fmt, tplText, { ...assets, photo: photoFile }));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'sj-chrome-'));
  try {
    await run(
      CHROME,
      [
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        '--no-first-run',
        '--no-default-browser-check',
        `--user-data-dir=${profile}`,
        `--window-size=${fmt.W},${fmt.H + 140}`,
        '--virtual-time-budget=4000',
        `--screenshot=${pngFile}`,
        pathToFileURL(htmlFile).href,
      ],
      { timeout: 60000 },
    );
  } finally {
    fs.rmSync(profile, { recursive: true, force: true });
  }
  // The headless window can be taller than asked; keep the top-left W x H.
  const png = await sharp(pngFile).extract({ left: 0, top: 0, width: fmt.W, height: fmt.H }).toBuffer();
  const base = path.join(PUBLIC_MEDIA, spec.out);
  ensureDir(path.dirname(base));
  const outs = [];
  const jpg = await sharp(png).jpeg({ quality: spec.jpgQuality ?? 86, mozjpeg: true }).toFile(`${base}.jpg`);
  outs.push(`${spec.out}.jpg ${(jpg.size / 1024).toFixed(0)}KB`);
  if (spec.webp) {
    const webp = await sharp(png).webp({ quality: spec.webpQuality ?? 82, effort: 5 }).toFile(`${base}.webp`);
    outs.push(`${spec.out}.webp ${(webp.size / 1024).toFixed(0)}KB`);
  }
  recorded[spec.id] = {
    out: spec.out,
    width: fmt.W,
    height: fmt.H,
    group: spec.group,
    webp: Boolean(spec.webp),
    alt: altFor(spec),
  };
  return outs.join('  ');
}

const only = arg('only', null);
const group = arg('group', null);
const wanted = only && only !== true ? new Set(only.split(',')) : null;
const specs = GRAPHICS.filter((g) => (!wanted || wanted.has(g.id)) && (!group || group === true || g.group === group));
if (!specs.length) throw new Error('No graphics matched.');

const fontsCss = await localFontsCss();
const queue = [...specs];
const concurrency = Number(arg('jobs', 4));
let failed = 0;
await Promise.all(
  Array.from({ length: concurrency }, async () => {
    while (queue.length) {
      const spec = queue.shift();
      try {
        console.log(`ok  ${spec.id.padEnd(28)} ${await render(spec, { fontsCss })}`);
      } catch (err) {
        failed += 1;
        console.error(`ERR ${spec.id}: ${err.message}`);
      }
    }
  }),
);

// Keep lib/media/graphics.json in step so the injector knows each file and its size.
const registry = path.join(ROOT, 'lib', 'media', 'graphics.json');
const merged = fs.existsSync(registry) ? JSON.parse(fs.readFileSync(registry, 'utf8')) : {};
Object.assign(merged, recorded);
const sorted = Object.fromEntries(Object.entries(merged).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(registry, JSON.stringify(sorted, null, 2) + '\n');
if (failed) process.exit(1);
