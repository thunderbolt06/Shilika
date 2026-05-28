'use client';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  async function onClick() {
    await fetch('/api/auth/admin-logout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-ink"
    >
      Sign out
    </button>
  );
}
