import { NextResponse } from 'next/server';
import { buildExportSheet } from '@/lib/blog-excel';
import { getAdminSupabase } from '@/lib/supabase/server';
import type { BlogPost } from '@/lib/supabase/types';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET() {
  const supabase = getAdminSupabase();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const bytes = buildExportSheet((data ?? []) as BlogPost[]);
  const filename = `shilika-blog-posts-${new Date().toISOString().slice(0, 10)}.xlsx`;
  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
