// Shared helpers for the portrait media pipeline.
//
//   build-photos.mjs     originals -> responsive WebP in public/assets/media/photos
//   build-graphics.mjs   HTML templates -> posters, share cards and social covers
//   build-loops.mjs      Live Photo clips -> small muted loops
//   inject.mjs           places the assets into the page partials
//
// Originals (HEIC/JPG) are never committed. Point SHILIKA_PORTRAITS_DIR (or --src)
// at the folder that holds them. HEIC files are converted with macOS `sips`.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, '..', '..');
export const PUBLIC_MEDIA = path.join(ROOT, 'public', 'assets', 'media');
export const CATALOG_PATH = path.join(ROOT, 'lib', 'media', 'catalog.json');
export const MANIFEST_PATH = path.join(ROOT, 'lib', 'media', 'manifest.json');
export const CACHE = path.join(ROOT, 'node_modules', '.cache', 'shilika-media');

export function readCatalog() {
  return JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
}

export function readManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

export function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = process.argv[i + 1];
  return next && !next.startsWith('--') ? next : true;
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function sourceDir() {
  const dir = arg('src', process.env.SHILIKA_PORTRAITS_DIR);
  if (!dir || dir === true) {
    throw new Error('Pass --src <folder with the original portraits> or set SHILIKA_PORTRAITS_DIR.');
  }
  return path.resolve(dir);
}

function findOriginal(dir, base) {
  for (const ext of ['jpg', 'jpeg', 'JPG', 'png', 'heic', 'HEIC']) {
    const file = path.join(dir, `${base}.${ext}`);
    if (fs.existsSync(file)) return file;
  }
  throw new Error(`No original found for "${base}" in ${dir}`);
}

/**
 * Upright (EXIF-rotated), metadata-free, redacted JPEG for one catalog photo,
 * cached so every crop and poster starts from the same pixels.
 */
export async function orientedSource(photo, dir = sourceDir()) {
  const out = path.join(ensureDir(path.join(CACHE, 'oriented')), `${photo.id}.jpg`);
  if (fs.existsSync(out)) return out;

  let input;
  if (photo.frame) {
    // Still pulled from a video: { file, at } (seconds). ffmpeg applies the rotation tag.
    input = path.join(ensureDir(path.join(CACHE, 'converted')), `${photo.id}.jpg`);
    if (!fs.existsSync(input)) {
      execFileSync(
        'ffmpeg',
        ['-y', '-v', 'error', '-ss', String(photo.frame.at), '-i', path.join(dir, photo.frame.file), '-frames:v', '1', '-q:v', '2', input],
        { stdio: 'inherit' },
      );
    }
  } else {
    input = findOriginal(dir, photo.src);
  }
  if (/\.heic$/i.test(input)) {
    const converted = path.join(ensureDir(path.join(CACHE, 'converted')), `${photo.src}.jpg`);
    if (!fs.existsSync(converted)) {
      execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '95', input, '--out', converted], {
        stdio: 'ignore',
      });
    }
    input = converted;
  }

  let image = sharp(input).rotate();
  const { data, info } = await image.toBuffer({ resolveWithObject: true });
  let buffer = data;

  // Blur anything that should not be readable (licence plates and the like).
  for (const box of photo.redact ?? []) {
    const left = Math.round(box.x * info.width);
    const top = Math.round(box.y * info.height);
    const width = Math.round(box.w * info.width);
    const height = Math.round(box.h * info.height);
    const patch = await sharp(buffer).extract({ left, top, width, height }).blur(Math.max(width, height) / 6).toBuffer();
    buffer = await sharp(buffer).composite([{ input: patch, left, top }]).toBuffer();
  }

  // withMetadata is deliberately not called: EXIF (including GPS) is dropped.
  await sharp(buffer).jpeg({ quality: 95, chromaSubsampling: '4:4:4' }).toFile(out);
  return out;
}

/** Largest rectangle with `ratio` inside W x H, shrunk by `zoom`, centred on (x, y). */
export function cropRect(W, H, ratio, { x = 0.5, y = 0.5, zoom = 1 } = {}) {
  let w;
  let h;
  if (ratio >= W / H) {
    w = W;
    h = W / ratio;
  } else {
    h = H;
    w = H * ratio;
  }
  w /= zoom;
  h /= zoom;
  const left = Math.min(Math.max(x * W - w / 2, 0), W - w);
  const top = Math.min(Math.max(y * H - h / 2, 0), H - h);
  return { left: Math.round(left), top: Math.round(top), width: Math.round(w), height: Math.round(h) };
}

export function srcsetFor(manifest, id, crop) {
  const entry = manifest[id]?.[crop];
  if (!entry) return null;
  return entry.files.map((f) => `${f.url} ${f.width}w`).join(', ');
}
