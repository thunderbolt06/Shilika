'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/admin';
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'login failed');
      }
      const data = await res.json();
      router.replace(data.next || '/admin');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink text-cream flex items-center justify-center p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-cream/15 bg-ink p-8"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-cream/60">
          Shilika admin
        </p>
        <h1 className="mt-2 font-serif text-3xl tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-cream/60">
          Password-gated control plane for blog posts, knowledge base, and Excel imports.
        </p>
        <label className="mt-8 block">
          <span className="font-mono text-xs uppercase tracking-widest text-cream/60">
            Admin password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-cream/20 bg-ink/50 px-3 py-2 text-cream placeholder:text-cream/40 focus:border-cream focus:outline-none"
            placeholder="••••••••"
          />
        </label>
        {error && (
          <p className="mt-3 text-sm text-rust" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          className="mt-6 w-full rounded-full bg-cream py-3 font-mono text-xs uppercase tracking-widest text-ink hover:bg-rust hover:text-cream disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
