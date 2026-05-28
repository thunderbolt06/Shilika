import Link from 'next/link';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Row = {
  id: number;
  title: string;
  slug: string | null;
  status: string;
  tags: string[];
  image_url: string | null;
  updated_at: string;
};

async function listReviewable(): Promise<Row[]> {
  try {
    const supabase = getAdminSupabase();
    const { data } = await supabase
      .from('content_ideas')
      .select('id, title, slug, status, tags, image_url, updated_at')
      .in('status', ['ready_for_review', 'approved'])
      .order('updated_at', { ascending: false });
    return (data as Row[]) ?? [];
  } catch {
    return [];
  }
}

export default async function ReviewPage() {
  const rows = await listReviewable();

  return (
    <AdminShell current="/admin/blog/review">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Review queue</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Drafts awaiting Shilika
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Twenty-second pass over each draft. Read the first paragraph and the CTA. Approve to ship,
          edit if needed, archive if it slipped through wrong.
        </p>
      </div>

      <ul className="mt-10 space-y-4">
        {rows.length === 0 && (
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
            Queue is empty.
          </p>
        )}
        {rows.map((r) => (
          <li key={r.id} className="rounded-2xl border border-ink/10 bg-paper p-5">
            <div className="flex items-start gap-5">
              <div className="hidden h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-cream sm:block">
                {r.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-ink/40">
                    no image
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-rust">
                  {r.status.replace(/_/g, ' ')} · #{r.id}
                </p>
                <p className="mt-1 font-serif text-2xl leading-tight">{r.title}</p>
                <p className="mt-1 font-mono text-xs text-ink/50">
                  slug: <code>{r.slug ?? '—'}</code>
                </p>
                {r.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ink/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href={`/admin/blog/review/${r.id}`}
                className="rounded-full bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cream"
              >
                Open
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
