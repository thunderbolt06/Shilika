'use client';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

type Idea = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: number;
  tags: string[];
  slug: string | null;
  notes: string | null;
  updated_at: string;
  related_posts: string[];
};

const STATUSES = ['idea', 'draft', 'ready_for_review', 'approved', 'published', 'archived'];

const STATUS_TONE: Record<string, string> = {
  idea: 'bg-ink/10 text-ink',
  draft: 'bg-rust/20 text-rust',
  ready_for_review: 'bg-rust text-cream',
  approved: 'bg-ink text-cream',
  published: 'bg-cream/40 text-ink/60',
  archived: 'bg-ink/5 text-ink/40 line-through',
};

const BLANK = { title: '', description: '', tags: '', priority: 2 };

export function IdeasClient() {
  const [rows, setRows] = useState<Idea[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [draft, setDraft] = useState(BLANK);
  const [busy, setBusy] = useState(false);
  const [status, setStatusMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      const url = new URL('/api/admin/content-ideas', window.location.origin);
      if (statusFilter) url.searchParams.set('status', statusFilter);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('load failed');
      const data = await res.json();
      setRows(data.rows ?? []);
    } catch (e) {
      setStatusMsg(e instanceof Error ? e.message : 'load failed');
    } finally {
      setBusy(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  async function addIdea(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatusMsg(null);
    try {
      const tags = draft.tags
        .split(/[,;]/)
        .map((t) => t.trim())
        .filter(Boolean);
      const res = await fetch('/api/admin/content-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: draft.title.trim(),
          description: draft.description.trim() || null,
          tags,
          priority: Number(draft.priority),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data.error === 'string' ? data.error : 'create failed');
      }
      setDraft(BLANK);
      await load();
    } catch (err) {
      setStatusMsg(err instanceof Error ? err.message : 'create failed');
    } finally {
      setBusy(false);
    }
  }

  async function startDraft(id: number) {
    if (!confirm('Run the writer agent on this idea? Takes 1-3 minutes and incurs LLM cost.')) return;
    setBusy(true);
    setStatusMsg('Writer started…');
    try {
      const res = await fetch(`/api/admin/content-ideas/${id}/draft`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'draft failed');
      setStatusMsg(
        `Draft ready: ${data.result?.draft?.slug ?? id} (${data.result?.humanizationPasses ?? 0} humanization passes)`,
      );
      await load();
    } catch (e) {
      setStatusMsg(e instanceof Error ? e.message : 'draft failed');
    } finally {
      setBusy(false);
    }
  }

  async function quickAction(id: number, action: 'approve' | 'archive') {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/content-ideas/${id}/${action}`, { method: 'POST' });
      if (!res.ok) throw new Error(`${action} failed`);
      await load();
    } catch (e) {
      setStatusMsg(e instanceof Error ? e.message : `${action} failed`);
    } finally {
      setBusy(false);
    }
  }

  async function deleteIdea(id: number) {
    if (!confirm('Delete this idea row?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/content-ideas/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('delete failed');
      await load();
    } catch (e) {
      setStatusMsg(e instanceof Error ? e.message : 'delete failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-10 space-y-8">
      <section className="rounded-2xl border border-ink/10 bg-paper p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">New idea</p>
        <form onSubmit={addIdea} className="mt-3 grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            required
            placeholder="Proposed title (or topic)"
            className="rounded-md border border-ink/15 bg-cream px-3 py-2"
          />
          <input
            value={draft.tags}
            onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
            placeholder="tags, comma-separated"
            className="rounded-md border border-ink/15 bg-cream px-3 py-2"
          />
          <select
            value={draft.priority}
            onChange={(e) => setDraft({ ...draft, priority: Number(e.target.value) })}
            className="rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-xs uppercase tracking-widest"
          >
            <option value={0}>P0 — now</option>
            <option value={1}>P1 — soon</option>
            <option value={2}>P2 — queued</option>
            <option value={3}>P3 — later</option>
            <option value={4}>P4 — backlog</option>
          </select>
          <button
            disabled={busy}
            type="submit"
            className="rounded-full bg-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-cream disabled:opacity-50"
          >
            Add
          </button>
          <textarea
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="Angle, target queries, supporting signals (markdown ok)"
            rows={3}
            className="md:col-span-4 rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-sm"
          />
        </form>
      </section>

      <section>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-xs uppercase tracking-widest"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
          {status && (
            <p className="font-mono text-xs text-rust">{status}</p>
          )}
        </div>

        <ul className="mt-4 space-y-3">
          {rows.length === 0 && !busy && (
            <p className="font-mono text-xs uppercase tracking-widest text-ink/40">No ideas.</p>
          )}
          {rows.map((r) => (
            <li key={r.id} className="rounded-2xl border border-ink/10 bg-paper p-5">
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-1">
                  <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-ink/60">
                    <span>P{r.priority}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${STATUS_TONE[r.status] ?? 'bg-ink/5 text-ink'}`}
                    >
                      {r.status.replace(/_/g, ' ')}
                    </span>
                    <span>#{r.id}</span>
                  </p>
                  <p className="mt-1 font-serif text-xl leading-tight">{r.title}</p>
                  {r.description && (
                    <p className="mt-2 line-clamp-3 text-sm text-ink/70 whitespace-pre-wrap">
                      {r.description}
                    </p>
                  )}
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
                  {r.notes && (
                    <p className="mt-2 font-mono text-[11px] text-ink/50">notes: {r.notes}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {r.status === 'idea' && (
                    <button
                      type="button"
                      onClick={() => startDraft(r.id)}
                      className="rounded-full bg-rust px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream"
                    >
                      Run writer
                    </button>
                  )}
                  {r.status === 'ready_for_review' && (
                    <Link
                      href={`/admin/blog/review/${r.id}`}
                      className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream"
                    >
                      Review
                    </Link>
                  )}
                  {r.status === 'ready_for_review' && (
                    <button
                      type="button"
                      onClick={() => quickAction(r.id, 'approve')}
                      className="rounded-full border border-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                    >
                      Approve
                    </button>
                  )}
                  {['idea', 'draft', 'ready_for_review', 'approved'].includes(r.status) && (
                    <button
                      type="button"
                      onClick={() => quickAction(r.id, 'archive')}
                      className="rounded-full border border-ink/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-ink/60"
                    >
                      Archive
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteIdea(r.id)}
                    className="rounded-full border border-rust px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-rust"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
