'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CronTriggerButton({ name }: { name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function fire() {
    if (!confirm(`Trigger ${name} now? This counts as a real run.`)) return;
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/cron/trigger/${name}`, { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok ? 'Done' : data.error || 'failed');
      router.refresh();
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={fire}
        disabled={busy}
        className="rounded-full bg-ink px-4 py-2 font-mono text-xs uppercase tracking-widest text-cream disabled:opacity-50"
      >
        {busy ? 'Running…' : 'Run now'}
      </button>
      {status && <p className="font-mono text-[10px] text-ink/60">{status}</p>}
    </div>
  );
}
