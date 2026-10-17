#!/usr/bin/env node
// Originals -> responsive, metadata-free WebP crops + lib/media/manifest.json.
//
//   node scripts/media/build-photos.mjs --src "<folder with portraits>"
//   node scripts/media/build-photos.mjs --src ... --only mbs-c,stairs
//   node scripts/media/build-photos.mjs --src ... --preview     (contact sheets only, nothing is published)

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import {
  CACHE,
  PUBLIC_MEDIA,
  MANIFEST_PATH,
  arg,
  cropRect,
  ensureDir,
  orientedSource,
  readCatalog,
  sourceDir,
} from './lib.mjs';

const catalog = readCatalog();
const only = arg('only', null);
const wanted = only && only !== true ? new Set(only.split(',')) : null;
const preview = arg('preview', false) === true;
const outDir = ensureDir(path.join(PUBLIC_MEDIA, 'photos'));
const quality = 74;

const manifest = fs.existsSync(MANIFEST_PATH) && wanted ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8')) : {};

async function buildPhoto(photo) {
  const src = await orientedSource(photo, sourceDir());
  const meta = await sharp(src).metadata();
  const { width: W, height: H } = meta;
  const entry = {};
  const sheetTiles = [];

  for (const [cropName, focus] of Object.entries(photo.crops)) {
    const spec = catalog.crops[cropName];
    const rect = cropRect(W, H, spec.ratio, focus);
    const files = [];
    for (const target of spec.widths) {
      const width = Math.min(target, rect.width);
      if (files.some((f) => f.width === width)) continue;
      const height = Math.round(width / spec.ratio);
      const name = `${photo.id}-${cropName}-${width}.webp`;
      const pipeline = sharp(src).extract(rect).resize({ width, height, fit: 'cover' });
      if (preview) {
        sheetTiles.push({ cropName, width, buf: await pipeline.clone().jpeg({ quality: 80 }).toBuffer() });
      } else {
        const info = await pipeline.webp({ quality, effort: 5, smartSubsample: true }).toFile(path.join(outDir, name));
        files.push({ url: `${catalog.basePath}/${name}`, width, height, bytes: info.size });
      }
    }
    if (!preview) entry[cropName] = { ratio: spec.ratio, files };
  }

  if (preview) return sheetTiles;
  manifest[photo.id] = entry;
  return null;
}

async function previewSheet(photo, tiles) {
  // One tile per crop (largest width), scaled to a common height.
  const byCrop = new Map();
  for (const t of tiles) byCrop.set(t.cropName, t);
  const H = 360;
  const parts = [];
  for (const [name, t] of byCrop) {
    const resized = await sharp(t.buf).resize({ height: H }).jpeg({ quality: 78 }).toBuffer();
    const m = await sharp(resized).metadata();
    parts.push({ buf: resized, w: m.width, name });
  }
  const gap = 8;
  const totalW = parts.reduce((s, p) => s + p.w + gap, 0);
  let x = 0;
  const composite = [];
  for (const p of parts) {
    composite.push({ input: p.buf, left: x, top: 26 });
    composite.push({
      input: Buffer.from(
        `<svg width="${p.w}" height="26"><text x="4" y="18" font-size="15" font-family="Arial" fill="#fff">${photo.id} / ${p.name}</text></svg>`,
      ),
      left: x,
      top: 0,
    });
    x += p.w + gap;
  }
  const dir = ensureDir(path.join(CACHE, 'preview'));
  await sharp({ create: { width: totalW, height: H + 26, channels: 3, background: '#111' } })
    .composite(composite)
    .jpeg({ quality: 82 })
    .toFile(path.join(dir, `${photo.id}.jpg`));
}

let count = 0;
for (const photo of catalog.photos) {
  if (wanted && !wanted.has(photo.id)) continue;
  const tiles = await buildPhoto(photo);
  if (preview) await previewSheet(photo, tiles);
  count += 1;
  process.stdout.write(`${preview ? 'previewed' : 'built'} ${photo.id}\n`);
}

if (!preview) {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
  const bytes = Object.values(manifest)
    .flatMap((p) => Object.values(p))
    .flatMap((c) => c.files)
    .reduce((s, f) => s + f.bytes, 0);
  console.log(`\n${count} photos, ${(bytes / 1048576).toFixed(1)} MB written to ${path.relative(process.cwd(), outDir)}`);
} else {
  console.log(`\nPreview sheets: ${path.join(CACHE, 'preview')}`);
}
