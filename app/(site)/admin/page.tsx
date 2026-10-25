import Link from 'next/link';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAdminSupabase } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const supabase = getAdminSupabase();
    const [posts, drafts, kb, ideas] = await Promise.all([
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('published', true),
      supabase.from('blog_posts').select('id', { count: 'exact', head: true }).eq('published', false),
      supabase.from('knowledge_base').select('id', { count: 'exact', head: true }),
      supabase.from('content_ideas').select('id', { count: 'exact', head: true }),
    ]);
    return {
      published: posts.count ?? 0,
      drafts: drafts.count ?? 0,
      kb: kb.count ?? 0,
      ideas: ideas.count ?? 0,
    };
  } catch {
    return null;
  }
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-paper p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-ink/60">{label}</p>
      <p className="mt-2 font-serif text-5xl tracking-tight">{value}</p>
    </div>
  );
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  return (
    <AdminShell current="/admin">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Overview</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Control plane
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Blog posts, knowledge base entries, content ideas, and Excel batch ops live here. Numbers
          below come straight from Supabase.
        </p>
      </div>

      {stats ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Published posts" value={stats.published} />
          <Stat label="Drafts" value={stats.drafts} />
          <Stat label="KB entries" value={stats.kb} />
          <Stat label="Content ideas" value={stats.ideas} />
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-rust/30 bg-rust/5 p-6 text-sm">
          Could not reach Supabase. Check <code className="rounded bg-rust/10 px-2 py-1">NEXT_PUBLIC_SUPABASE_URL</code>
          {' '}and{' '}
          <code className="rounded bg-rust/10 px-2 py-1">SUPABASE_SECRET_KEY</code>.
        </div>
      )}

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/blog/excel"
          className="rounded-2xl border border-ink/10 bg-paper p-6 transition hover:border-ink"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Excel I/O</p>
          <p className="mt-2 font-serif text-2xl tracking-tight">Bulk import & export</p>
          <p className="mt-2 text-sm text-ink/70">
            Upsert blog posts from an .xlsx sheet by id. Download the full catalog as Excel.
          </p>
        </Link>
        <Link
          href="/admin/knowledge-base"
          className="rounded-2xl border border-ink/10 bg-paper p-6 transition hover:border-ink"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Knowledge base</p>
          <p className="mt-2 font-serif text-2xl tracking-tight">Case studies + human notes</p>
          <p className="mt-2 text-sm text-ink/70">
            Inputs the topic-research and writer agents read. Case studies, brand voice
            snippets, long-tail seed queries.
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}
