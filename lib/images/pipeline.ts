import 'server-only';
import { generateHeroImage } from './generate';
import { optimizeForOg } from './optimize';
import { uploadHeroImage } from './storage';

export async function generateAndStoreHero(opts: {
  slug: string;
  prompt: string;
  model?: string;
}): Promise<{ url: string; path: string; sizeKb: number }> {
  const raw = await generateHeroImage({ prompt: opts.prompt, model: opts.model });
  const optimized = await optimizeForOg(raw.bytes);
  const { path, publicUrl } = await uploadHeroImage({
    slug: opts.slug,
    bytes: optimized,
    mimeType: 'image/jpeg',
  });
  return { url: publicUrl, path, sizeKb: Math.round(optimized.byteLength / 1024) };
}
