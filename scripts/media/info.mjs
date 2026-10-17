#!/usr/bin/env node
// Prints what the media library offers: photos (with crops), graphics, and which photos
// can drive a full-bleed band. Run it before writing a family module.
//   node scripts/media/info.mjs [--photos] [--graphics] [--json]
import { arg, readCatalog, readManifest } from './lib.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const catalog = readCatalog();
const manifest = readManifest();
const graphics = JSON.parse(fs.readFileSync(path.join(ROOT, 'lib', 'media', 'graphics.json'), 'utf8'));
const onlyPhotos = arg('photos', false) === true;
const onlyGraphics = arg('graphics', false) === true;

if (arg('json', false) === true) {
  console.log(JSON.stringify({ photos: catalog.photos, manifest, graphics }, null, 2));
  process.exit(0);
}
if (!onlyGraphics) {
  console.log('PHOTOS  (id | place | crops | tags)  -- alt text lives in lib/media/catalog.json');
  for (const p of catalog.photos) {
    const crops = Object.keys(manifest[p.id] ?? {}).join(',');
    console.log(`  ${p.id.padEnd(16)} ${p.place.padEnd(10)} ${crops.padEnd(18)} ${p.tags.join(' ')}`);
  }
  const wide = Object.keys(manifest).filter((id) => manifest[id].wide);
  console.log(`\nBand-capable (have a "wide" crop): ${wide.join(', ')}`);
}
if (!onlyPhotos) {
  console.log('\nGRAPHICS (id | size | files | where it is meant to be used)');
  for (const [id, g] of Object.entries(graphics)) {
    console.log(`  ${id.padEnd(28)} ${`${g.width}x${g.height}`.padEnd(10)} /assets/media/${g.out}.jpg${g.webp ? ' + .webp' : ''}`);
  }
}
