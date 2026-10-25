import { notFound } from 'next/navigation';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminSupabase } from '@/lib/supabase/server';
import { ReviewClient } from './ReviewClient';

export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>;

export default async function ReviewDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = getAdminSupabase();
  const { data } = await supabase
    .from('content_ideas')
    .select('*')
    .eq('id', Number(id))
    .maybeSingle();
  if (!data) notFound();

  return (
    <AdminShell current="/admin/blog/review">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
          Review · #{id} · {data.status.replace(/_/g, ' ')}
        </p>
        <h1 className="mt-2 font-serif text-3xl tracking-tight md:text-4xl">
          {data.title}
        </h1>
      </div>
      <ReviewClient
        idea={{
          id: data.id,
          title: data.title,
          slug: data.slug ?? '',
          description: data.description ?? '',
          body: data.body ?? '',
          image_url: data.image_url,
          tags: data.tags ?? [],
          related_posts: data.related_posts ?? [],
          status: data.status,
          notes: data.notes,
        }}
      />
    </AdminShell>
  );
}
