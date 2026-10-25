'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image: string | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

export function PostsClient() {
  const [rows, setRows] = useState<Post[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'drafts'>('all');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const load = useCallback(async () => {
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch('/api/admin/blog/posts');
      if (!res.ok) throw new Error('load failed');
      const data = await res.json();
      setRows(data.rows ?? []);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'load failed');
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const visible = rows.filter((r) =>
    filter === 'all' ? true : filter === 'published' ? r.published : !r.published,
  );

  async function action(id: string, op: 'publish' | 'unpublish' | 'delete' | 'regenImage') {
    if (op === 'delete' && !confirm('Delete this post? This cannot be undone.')) return;
    if (op === 'unpublish' && !confirm('Unpublish? It will be removed from the live blog.')) return;
    setBusy(true);
    try {
      let res: Response;
      if (op === 'delete') {
        res = await fetch(`/api/admin/blog/posts/${id}`, { method: 'DELETE' });
      } else if (op === 'regenImage') {
        res = await fetch('/api/admin/images/regenerate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: id }),
        });
      } else {
        res = await fetch(`/api/admin/blog/posts/${id}/${op}`, { method: 'POST' });
      }
      if (!res.ok) throw new Error(`${op} failed`);
      await load();
    } catch (e) {
      setStatus(e instanceof Error ? e.message : `${op} failed`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-3">
        {(['all', 'published', 'drafts'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-widest ${
              filter === f ? 'border-ink bg-ink text-cream' : 'border-ink/20 text-ink/60'
            }`}
          >
            {f}
          </button>
        ))}
        {status && <p className="font-mono text-xs text-rust">{status}</p>}
      </div>

      <ul className="mt-6 space-y-3">
        {visible.length === 0 && !busy && (
          <p className="font-mono text-xs uppercase tracking-widest text-ink/40">No posts.</p>
        )}
        {visible.map((p) => (
          <li key={p.id} className="rounded-2xl border border-ink/10 bg-paper p-5">
            <div className="flex items-start gap-4">
              <div className="hidden h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-cream sm:block">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1">
                <p className="font-mono text-[10px] uppercase tracking-widest">
                  {p.published ? (
                    <span className="text-rust">published</span>
                  ) : (
                    <span className="text-ink/40">draft</span>
                  )}
                  <span className="ml-3 text-ink/40">/{p.slug}</span>
                </p>
                <p className="mt-1 font-serif text-xl leading-tight">{p.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-ink/70">{p.description}</p>
                {p.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.tags.map((t) => (
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
              <div className="flex flex-col items-end gap-2">
                {p.published ? (
                  <Link
                    href={`/blog/${p.slug}`}
                    target="_blank"
                    className="rounded-full border border-ink/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                  >
                    View
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => action(p.id, p.published ? 'unpublish' : 'publish')}
                  disabled={busy}
                  className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream disabled:opacity-50"
                >
                  {p.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  type="button"
                  onClick={() => action(p.id, 'regenImage')}
                  disabled={busy}
                  className="rounded-full border border-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest disabled:opacity-50"
                >
                  Hero image
                </button>
                <button
                  type="button"
                  onClick={() => action(p.id, 'delete')}
                  disabled={busy}
                  className="rounded-full border border-rust px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-rust disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
