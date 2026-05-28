import 'server-only';
import { getAdminSupabase } from '@/lib/supabase/server';

const BUCKET = 'media';

export async function uploadHeroImage(opts: {
  slug: string;
  bytes: Uint8Array;
  mimeType: string;
}): Promise<{ path: string; publicUrl: string }> {
  const ext = opts.mimeType === 'image/png' ? 'png' : 'jpg';
  const path = `blog/${opts.slug}-${Date.now()}.${ext}`;

  const supabase = getAdminSupabase();
  const { error } = await supabase.storage.from(BUCKET).upload(path, opts.bytes, {
    contentType: opts.mimeType,
    upsert: true,
    cacheControl: '31536000',
  });
  if (error) throw new Error(`upload failed: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}
