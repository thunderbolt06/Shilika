import 'server-only';
import sharp from 'sharp';

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;
const TARGET_QUALITY = 80;

export async function optimizeForOg(input: Uint8Array): Promise<Uint8Array> {
  const buffer = Buffer.from(input);
  const out = await sharp(buffer)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, {
      fit: 'cover',
      position: sharp.strategy.attention,
    })
    .jpeg({ quality: TARGET_QUALITY, progressive: true, mozjpeg: true })
    .toBuffer();
  return new Uint8Array(out);
}
