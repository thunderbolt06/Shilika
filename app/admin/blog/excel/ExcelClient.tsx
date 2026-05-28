'use client';
import { useRef, useState } from 'react';

type PreviewRow = {
  row: number;
  source: Record<string, unknown>;
  parsed: Record<string, unknown>;
  action: 'insert' | 'update' | 'invalid';
  errors: { row: number; field: string; message: string }[];
};

type PreviewResult = {
  rows: PreviewRow[];
  summary: { inserts: number; updates: number; invalid: number; total: number };
};

type CommitResult = {
  applied: number;
  skipped: number;
  errors: { row: number; message: string }[];
};

export function ExcelClient() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [commit, setCommit] = useState<CommitResult | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function doPreview() {
    if (!file) return;
    setBusy(true);
    setStatus(null);
    setCommit(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/blog/excel/preview', { method: 'POST', body: form });
      if (!res.ok) throw new Error('preview failed');
      setPreview(await res.json());
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'preview failed');
    } finally {
      setBusy(false);
    }
  }

  async function doCommit() {
    if (!file) return;
    if (
      !confirm(
        `Commit ${preview?.summary.inserts ?? 0} inserts and ${preview?.summary.updates ?? 0} updates? Rows with errors will be skipped.`,
      )
    )
      return;
    setBusy(true);
    setStatus(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/blog/excel/commit', { method: 'POST', body: form });
      if (!res.ok) throw new Error('commit failed');
      setCommit(await res.json());
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'commit failed');
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setFile(null);
    setPreview(null);
    setCommit(null);
    setStatus(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <div className="mt-10 space-y-8">
      <section className="rounded-2xl border border-ink/10 bg-paper p-6">
        <div className="flex flex-wrap items-end gap-4">
          <label className="block">
            <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
              Upload .xlsx
            </span>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xlsm,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-2 block w-full max-w-md rounded-md border border-ink/15 bg-cream px-3 py-2 text-sm"
            />
          </label>
          <button
            type="button"
            onClick={doPreview}
            disabled={!file || busy}
            className="rounded-full bg-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-cream disabled:opacity-50"
          >
            {busy ? 'Working…' : 'Preview'}
          </button>
          {preview && preview.summary.invalid < preview.summary.total && (
            <button
              type="button"
              onClick={doCommit}
              disabled={busy}
              className="rounded-full bg-rust px-5 py-2 font-mono text-xs uppercase tracking-widest text-cream disabled:opacity-50"
            >
              Commit
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            disabled={busy || (!file && !preview)}
            className="rounded-full border border-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-ink disabled:opacity-50"
          >
            Reset
          </button>
          <a
            href="/api/admin/blog/excel/export"
            className="ml-auto rounded-full border border-ink px-5 py-2 font-mono text-xs uppercase tracking-widest text-ink hover:bg-ink hover:text-cream"
          >
            Download all posts
          </a>
        </div>
        {status && (
          <p className="mt-4 rounded-md border border-rust/30 bg-rust/5 p-3 font-mono text-xs text-rust">
            {status}
          </p>
        )}
      </section>

      {preview && (
        <section className="rounded-2xl border border-ink/10 bg-paper p-6">
          <div className="flex flex-wrap items-baseline gap-6 border-b border-ink/10 pb-4">
            <Counter label="Inserts" value={preview.summary.inserts} tone="ink" />
            <Counter label="Updates" value={preview.summary.updates} tone="ink" />
            <Counter label="Invalid" value={preview.summary.invalid} tone={preview.summary.invalid > 0 ? 'rust' : 'ink'} />
            <Counter label="Total rows" value={preview.summary.total} tone="ink" />
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left font-mono text-xs uppercase tracking-widest text-ink/60">
                  <th className="py-2 pr-3">Row</th>
                  <th className="py-2 pr-3">Action</th>
                  <th className="py-2 pr-3">Slug</th>
                  <th className="py-2 pr-3">Title</th>
                  <th className="py-2 pr-3">Errors</th>
                </tr>
              </thead>
              <tbody>
                {preview.rows.map((r) => (
                  <tr key={r.row} className="border-b border-ink/5 align-top">
                    <td className="py-2 pr-3 font-mono text-xs">{r.row}</td>
                    <td className="py-2 pr-3">
                      <ActionBadge action={r.action} />
                    </td>
                    <td className="py-2 pr-3 font-mono text-xs">
                      {String(r.parsed.slug ?? r.source.slug ?? '—')}
                    </td>
                    <td className="py-2 pr-3">
                      {String(r.parsed.title ?? r.source.title ?? '—')}
                    </td>
                    <td className="py-2 pr-3 text-xs text-rust">
                      {r.errors.map((e) => `${e.field}: ${e.message}`).join('; ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {commit && (
        <section className="rounded-2xl border border-ink/10 bg-paper p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Commit result</p>
          <div className="mt-4 flex flex-wrap gap-6">
            <Counter label="Applied" value={commit.applied} tone="ink" />
            <Counter
              label="Skipped"
              value={commit.skipped}
              tone={commit.skipped > 0 ? 'rust' : 'ink'}
            />
          </div>
          {commit.errors.length > 0 && (
            <ul className="mt-4 space-y-1 font-mono text-xs text-rust">
              {commit.errors.slice(0, 50).map((e, i) => (
                <li key={i}>
                  row {e.row}: {e.message}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}

function Counter({ label, value, tone }: { label: string; value: number; tone: 'ink' | 'rust' }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-ink/60">{label}</p>
      <p className={`font-serif text-3xl ${tone === 'rust' ? 'text-rust' : 'text-ink'}`}>{value}</p>
    </div>
  );
}

function ActionBadge({ action }: { action: 'insert' | 'update' | 'invalid' }) {
  const map = {
    insert: 'bg-ink text-cream',
    update: 'bg-rust text-cream',
    invalid: 'bg-rust/20 text-rust',
  };
  return (
    <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${map[action]}`}>
      {action}
    </span>
  );
}
