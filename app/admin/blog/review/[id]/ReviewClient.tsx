'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

type Idea = {
  id: number;
  title: string;
  slug: string;
  description: string;
  body: string;
  image_url: string | null;
  tags: string[];
  related_posts: string[];
  status: string;
  notes: string | null;
};

// Lightweight client-side markdown preview — does not need to match the
// production blog renderer exactly, just give Shilika a feel for the shape.
function renderPreview(md: string): string {
  const escape = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith('```')) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        buf.push(escape(lines[i]));
        i++;
      }
      i++;
      out.push(`<pre><code>${buf.join('\n')}</code></pre>`);
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ''))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith('```') && !lines[i].match(/^#{1,6}\s/) && !/^\s*[-*]\s+/.test(lines[i])) {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out.join('\n');

  function inline(s: string): string {
    return escape(s)
      .replace(/`([^`]+?)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }
}

export function ReviewClient({ idea }: { idea: Idea }) {
  const router = useRouter();
  const [draft, setDraft] = useState(idea);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const previewHtml = useMemo(() => renderPreview(draft.body), [draft.body]);

  function tag(s: string) {
    return s
      .split(/[,;]/)
      .map((t) => t.trim())
      .filter(Boolean);
  }

  async function save() {
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/content-ideas/${idea.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: draft.title.trim(),
          slug: draft.slug.trim() || null,
          description: draft.description.trim(),
          body: draft.body,
          tags: draft.tags,
          related_posts: draft.related_posts,
        }),
      });
      if (!res.ok) throw new Error('save failed');
      setStatus('Saved.');
      router.refresh();
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'save failed');
    } finally {
      setBusy(false);
    }
  }

  async function approve() {
    if (!confirm('Mark as approved? The hourly publisher cron will pick it up.')) return;
    setBusy(true);
    try {
      await save();
      const res = await fetch(`/api/admin/content-ideas/${idea.id}/approve`, { method: 'POST' });
      if (!res.ok) throw new Error('approve failed');
      setStatus('Approved.');
      router.refresh();
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'approve failed');
    } finally {
      setBusy(false);
    }
  }

  async function publishNow() {
    if (!confirm('Publish to the live blog right now? Bypasses the cron.')) return;
    setBusy(true);
    try {
      await save();
      // Approve first so the publish endpoint accepts it.
      await fetch(`/api/admin/content-ideas/${idea.id}/approve`, { method: 'POST' });
      const res = await fetch(`/api/admin/content-ideas/${idea.id}/publish`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'publish failed');
      setStatus(`Published: ${data.post?.slug}`);
      router.refresh();
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'publish failed');
    } finally {
      setBusy(false);
    }
  }

  async function regenImage() {
    setBusy(true);
    setStatus('Regenerating hero image…');
    try {
      const res = await fetch('/api/admin/images/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId: idea.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'image failed');
      setDraft({ ...draft, image_url: data.url });
      setStatus(`Regenerated. ${data.sizeKb}kb`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'image failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <section className="rounded-2xl border border-ink/10 bg-paper p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Editor</p>

        <label className="mt-4 block">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Title</span>
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 font-serif text-xl"
          />
          <span className="mt-1 block font-mono text-[10px] text-ink/50">
            {draft.title.length} chars · 60-70 fits Google
          </span>
        </label>

        <label className="mt-3 block">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Slug</span>
          <input
            value={draft.slug}
            onChange={(e) =>
              setDraft({ ...draft, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })
            }
            className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-sm"
          />
        </label>

        <label className="mt-3 block">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
            Description ({draft.description.length}/160)
          </span>
          <textarea
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            rows={3}
            className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 text-sm"
          />
        </label>

        <label className="mt-3 block">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
            Tags (comma-separated)
          </span>
          <input
            value={draft.tags.join(', ')}
            onChange={(e) => setDraft({ ...draft, tags: tag(e.target.value) })}
            className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-sm"
          />
        </label>

        <label className="mt-3 block">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
            Related posts (slugs, comma-separated)
          </span>
          <input
            value={draft.related_posts.join(', ')}
            onChange={(e) => setDraft({ ...draft, related_posts: tag(e.target.value) })}
            className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-sm"
          />
        </label>

        <label className="mt-3 block">
          <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Body (markdown)</span>
          <textarea
            value={draft.body}
            onChange={(e) => setDraft({ ...draft, body: e.target.value })}
            rows={28}
            spellCheck
            className="mt-1 w-full rounded-md border border-ink/15 bg-cream px-3 py-2 font-mono text-sm"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={save}
            disabled={busy}
            className="rounded-full border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest disabled:opacity-50"
          >
            Save
          </button>
          <button
            type="button"
            onClick={regenImage}
            disabled={busy}
            className="rounded-full border border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest disabled:opacity-50"
          >
            Regenerate hero
          </button>
          <button
            type="button"
            onClick={approve}
            disabled={busy}
            className="rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream disabled:opacity-50"
          >
            Save & approve
          </button>
          <button
            type="button"
            onClick={publishNow}
            disabled={busy}
            className="rounded-full bg-rust px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream disabled:opacity-50"
          >
            Publish now
          </button>
        </div>
        {status && (
          <p className="mt-3 font-mono text-xs text-rust">{status}</p>
        )}
        {idea.notes && (
          <p className="mt-3 font-mono text-[11px] text-ink/50">notes: {idea.notes}</p>
        )}
      </section>

      <section className="space-y-4">
        {draft.image_url && (
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={draft.image_url} alt="" className="w-full" />
          </div>
        )}
        <article className="rounded-2xl border border-ink/10 bg-paper p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Preview</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight tracking-tight">{draft.title}</h2>
          <p className="mt-2 text-ink/70">{draft.description}</p>
          <div className="prose-shilika mt-6" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </article>
      </section>
    </div>
  );
}
