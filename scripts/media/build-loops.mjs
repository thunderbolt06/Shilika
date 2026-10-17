#!/usr/bin/env node
// Stage-talk clip -> web-sized speaker reel (MP4 with sound) plus a WebP poster.
//
//   node scripts/media/build-loops.mjs --src "<folder with the originals>"
//
// Needs ffmpeg on PATH. Output: public/assets/media/video/speaker-reel.mp4 and
// speaker-reel-poster.webp. The reel is a playable video (controls, no autoplay): it is a
// talk, so it must not loop silently.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { PUBLIC_MEDIA, ensureDir, sourceDir } from './lib.mjs';

const REELS = [{ id: 'speaker-reel', clip: 'IMG_9251.MOV', width: 720, posterAt: 2.0 }];

const out = ensureDir(path.join(PUBLIC_MEDIA, 'video'));
const src = sourceDir();

for (const reel of REELS) {
  const input = path.join(src, reel.clip);
  const mp4 = path.join(out, `${reel.id}.mp4`);
  execFileSync(
    'ffmpeg',
    [
      '-y', '-v', 'error', '-i', input,
      '-map', '0:v:0', '-map', '0:a:0',
      '-vf', `scale=${reel.width}:-2:flags=lanczos,fps=30,format=yuv420p`,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-profile:v', 'main',
      '-c:a', 'aac', '-b:a', '72k', '-ac', '1',
      '-movflags', '+faststart', mp4,
    ],
    { stdio: 'inherit' },
  );
  const png = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(reel.posterAt), '-i', input, '-frames:v', '1', '-vf', `scale=${reel.width}:-2`, '-f', 'image2pipe', '-vcodec', 'png', '-']);
  await sharp(png).webp({ quality: 78 }).toFile(path.join(out, `${reel.id}-poster.webp`));
  const meta = await sharp(png).metadata();
  console.log(`${reel.id}: ${(fs.statSync(mp4).size / 1024).toFixed(0)}KB mp4, poster ${meta.width}x${meta.height}`);
}
