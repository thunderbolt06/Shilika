import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { parseXlsx } from '@/lib/blog-excel';
import { getAdminSupabase } from '@/lib/supabase/server';
import type { BlogPost } from '@/lib/supabase/types';

export const runtime = 'nodejs';
export const maxDuration = 120;

type CommitResult = {
  applied: number;
  skipped: number;
  errors: { row: number; message: string }[];
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file required' }, { status: 400 });
  }
  const buffer = await file.arrayBuffer();
  const { rows } = parseXlsx(buffer);

  const supabase = getAdminSupabase();
  const result: CommitResult = { applied: 0, skipped: 0, errors: [] };

  for (const row of rows) {
    if (row.action === 'invalid') {
      result.skipped += 1;
      for (const e of row.errors) {
        result.errors.push({ row: row.row, message: `${e.field}: ${e.message}` });
      }
      continue;
    }

    if (row.action === 'insert') {
      const insertPayload: Partial<BlogPost> = { ...row.parsed };
      delete insertPayload.id;
      const { error } = await supabase.from('blog_posts').insert(insertPayload);
      if (error) {
        result.skipped += 1;
        result.errors.push({ row: row.row, message: error.message });
      } else {
        result.applied += 1;
      }
      continue;
    }

    if (row.action === 'update') {
      const id = row.parsed.id;
      if (!id) {
        result.skipped += 1;
        result.errors.push({ row: row.row, message: 'update row had no id post-parse' });
        continue;
      }
      // Drop id so we don't try to overwrite the primary key.
      const updatePayload: Partial<BlogPost> = { ...row.parsed };
      delete updatePayload.id;
      const { error } = await supabase.from('blog_posts').update(updatePayload).eq('id', id);
      if (error) {
        result.skipped += 1;
        result.errors.push({ row: row.row, message: error.message });
      } else {
        result.applied += 1;
      }
    }
  }

  // Bust the cached blog routes so changes show up immediately.
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  for (const row of rows) {
    if (row.parsed.slug) revalidatePath(`/blog/${row.parsed.slug}`);
  }

  return NextResponse.json(result);
}
