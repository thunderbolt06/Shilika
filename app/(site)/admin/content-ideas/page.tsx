import { AdminShell } from '@/components/admin/AdminShell';
import { IdeasClient } from './IdeasClient';

export const dynamic = 'force-dynamic';

export default function ContentIdeasPage() {
  return (
    <AdminShell current="/admin/content-ideas">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Pipeline</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Content ideas
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          The backlog the writer agent draws from. Each row carries a documented case for why it
          should rank. P0 is "write now," P3 is "later."
        </p>
      </div>
      <IdeasClient />
    </AdminShell>
  );
}
