#!/usr/bin/env node
// Cut a tall full-page screenshot into viewable chunks (the Read tool downsizes huge images).
//   node scripts/media/slice.mjs page.png /tmp/page [chunkPx=1700] [outWidth=800]
// Writes /tmp/page-0.jpg, /tmp/page-1.jpg ... and prints which source pixel rows each covers.
import sharp from 'sharp';

const [input, prefix, chunk = '1700', outWidth = '800'] = process.argv.slice(2);
if (!input || !prefix) {
  console.error('usage: slice.mjs in.png outPrefix [chunkPx] [outWidth]');
  process.exit(1);
}
const meta = await sharp(input).metadata();
const step = Number(chunk);
for (let i = 0, y = 0; y < meta.height; i += 1, y += step) {
  const height = Math.min(step, meta.height - y);
  const file = `${prefix}-${i}.jpg`;
  await sharp(input)
    .extract({ left: 0, top: y, width: meta.width, height })
    .resize({ width: Number(outWidth) })
    .jpeg({ quality: 80 })
    .toFile(file);
  console.log(`${file}  rows ${y}-${y + height}`);
}
