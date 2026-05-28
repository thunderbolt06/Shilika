'use client';
import { useCallback, useEffect, useState } from 'react';

const KINDS = [
  'case_study',
  'human_note',
  'transcript',
  'snippet',
  'brand_voice',
  'long_tail_seed',
] as const;

type Kind = (typeof KINDS)[number];

type Entry = {
  id: string;
  title: string;
  kind: Kind;
  body: string;
  tags: string[];
  source_url: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

const KIND_LABELS: Record<Kind, string> = {
  case_study: 'Case study',
  human_note: 'Human note',
  transcript: 'Transcript',
  snippet: 'Snippet',
  brand_voice: 'Brand voice',
  long_tail_seed: 'Long-tail seed',
};

const BLANK_ENTRY = {
  title: '',
  kind: 'case_study' as Kind,
  body: '',
  tags: '',
  source_url: '',
  metadata: '',
};

export function KBClient() {
  const [rows, setRows] = useState<Entry[]>([]);
  const [kindFilter, setKindFilter] = useState<Kind | 'all'>('all');
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState(BLANK_ENTRY);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    setStatus(null);
    try {
      const url = new URL('/api/admin/knowledge-base', window.location.origin);
      if (kindFilter !== 'all') url.searchParams.set('kind', kindFilter);
      if (search) url.searchParams.set('q', search);
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('failed to load');
      const data = await res.json();
      setRows(data.rows ?? []);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'load failed');
    } finally {
      setBusy(false);
    }
  }, [kindFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(entry: Entry) {
    setEditingId(entry.id);
    setDraft({
      title: entry.title,
      kind: entry.kind,
      body: entry.body,
      tags: entry.tags.join(', '),
      source_url: entry.source_url ?? '',
      metadata: entry.metadata ? JSON.stringify(entry.metadata, null, 2) : '',
    });
  }

  function startNew() {
    setEditingId(null);
    setDraft(BLANK_ENTRY);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const tags = draft.tags
        .split(/[,;]/)
        .map((t) => t.trim())
        .filter(Boolean);

      let metadata: Record<string, unknown> | null = null;
      if (draft.metadata.trim()) {
        try {
          metadata = JSON.parse(draft.metadata);
        } catch {
          throw new Error('metadata must be valid JSON or blank');
        }
      }

      const payload = {
        title: draft.title.trim(),
        kind: draft.kind,
        body: draft.body,
        tags,
        source_url: draft.source_url.trim() || null,
        metadata,
      };

      const res = editingId
        ? await fetch(`/api/admin/knowledge-base/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/admin/knowledge-base', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data.error === 'string' ? data.error : 'save failed');
      }

      startNew();
      await load();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'save failed');
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/knowledge-base/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('delete failed');
      await load();
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'delete failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
      <section className="rounded-2xl border border-ink/10 bg-paper p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
          {editingId ? 'Edit entry' : 'New entry'}
        </p>
        <form onSubmit={save} className="mt-4 space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink/60">Title</label>
            <input
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              required
              className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2"
              placeholder="e.g. Gaia AI Forbes launch — Stripe-for-agents narrative"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink/60">Kind</label>
            <select
              value={draft.kind}
              onChange={(e) => setDraft({ ...draft, kind: e.target.value as Kind })}
              className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2"
            >
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {KIND_LABELS[k]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink/60">Body (markdown)</label>
            <textarea
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              required
              rows={12}
              className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-sm"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink/60">
              Tags (comma-separated)
            </label>
            <input
              value={draft.tags}
              onChange={(e) => setDraft({ ...draft, tags: e.target.value })}
              className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2"
              placeholder="embargo, tier-1, apac"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink/60">
              Source URL (optional)
            </label>
            <input
              value={draft.source_url}
              onChange={(e) => setDraft({ ...draft, source_url: e.target.value })}
              type="url"
              className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2"
            />
          </div>

          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-ink/60">
              Metadata JSON (optional)
            </label>
            <textarea
              value={draft.metadata}
              onChange={(e) => setDraft({ ...draft, metadata: e.target.value })}
              rows={4}
              className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-xs"
              placeholder='{"client":"Gaia AI","year":2025}'
            />
          </div>

          {status && (
            <p className="rounded-md border border-rust/30 bg-rust/5 p-3 font-mono text-xs text-rust">
              {status}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-full bg-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-cream disabled:opacity-50"
            >
              {editingId ? 'Update' : 'Add entry'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={startNew}
                className="rounded-full border border-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-ink"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={kindFilter}
            onChange={(e) => setKindFilter(e.target.value as Kind | 'all')}
            className="rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-xs uppercase tracking-widest"
          >
            <option value="all">All kinds</option>
            {KINDS.map((k) => (
              <option key={k} value={k}>
                {KIND_LABELS[k]}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, body, tags…"
            className="rounded-md border border-ink/15 bg-cream px-3 py-2 text-sm"
          />
        </div>

        <ul className="mt-4 space-y-3">
          {rows.length === 0 && !busy && (
            <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
              No entries.
            </p>
          )}
          {rows.map((r) => (
            <li
              key={r.id}
              className={`rounded-2xl border bg-paper p-5 ${
                editingId === r.id ? 'border-rust' : 'border-ink/10'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-rust">
                    {KIND_LABELS[r.kind]}
                  </p>
                  <p className="mt-1 font-serif text-lg leading-tight">{r.title}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(r)}
                    className="rounded-full border border-ink/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest hover:bg-ink hover:text-cream"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    className="rounded-full border border-rust px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-rust hover:bg-rust hover:text-cream"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-ink/70">{r.body}</p>
              {r.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
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
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
