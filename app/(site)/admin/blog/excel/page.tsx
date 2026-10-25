import { AdminShell } from '@/components/admin/AdminShell';
import { ExcelClient } from './ExcelClient';
import { EXPECTED_COLUMNS } from '@/lib/blog-excel';

export default function ExcelPage() {
  return (
    <AdminShell current="/admin/blog/excel">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Excel I/O</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Bulk import & export
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Upload an .xlsx file to upsert blog posts. Rows with an{' '}
          <code className="rounded bg-ink/5 px-2 py-0.5 font-mono text-sm">id</code>{' '}
          update the matching post. Rows without an id are inserted. Posts whose id is not in the
          sheet are left untouched.
        </p>
      </div>

      <ExcelClient />

      <section className="mt-12 rounded-2xl border border-ink/10 bg-paper p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Expected columns</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {EXPECTED_COLUMNS.map((c) => (
            <code
              key={c}
              className="rounded-full border border-ink/15 bg-cream px-3 py-1 font-mono text-xs"
            >
              {c}
            </code>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink/70">
          <strong>Required for new rows:</strong> slug, title, description, body. Tags and
          related_posts can be comma or semicolon-separated. <code className="font-mono">published</code>{' '}
          accepts TRUE / FALSE / 1 / 0 / yes / no. <code className="font-mono">id</code> must be a UUID
          when present.
        </p>
      </section>
    </AdminShell>
  );
}
