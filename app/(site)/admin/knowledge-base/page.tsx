import { AdminShell } from '@/components/admin/AdminShell';
import { KBClient } from './KBClient';

export const dynamic = 'force-dynamic';

export default function KBPage() {
  return (
    <AdminShell current="/admin/knowledge-base">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">Knowledge base</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          Agent inputs
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Case studies, human notes, brand voice snippets, long-tail seed queries. The
          topic-research and writer agents read this table on every run to ground their work.
        </p>
      </div>

      <KBClient />
    </AdminShell>
  );
}
