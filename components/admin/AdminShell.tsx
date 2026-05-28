import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

const NAV = [
  { href: '/admin', label: 'Overview', match: 'exact' as const },
  { href: '/admin/blog/excel', label: 'Excel I/O' },
  { href: '/admin/knowledge-base', label: 'Knowledge base' },
  { href: '/blog', label: 'View blog →', external: true },
];

export function AdminShell({
  current,
  children,
}: {
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-mono text-xs uppercase tracking-widest">
            Shilika<span className="text-rust">.admin</span>
          </Link>
          <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
            {NAV.map((n) => {
              const active = n.match === 'exact' ? current === n.href : current.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={
                    n.external
                      ? 'text-ink/60 hover:text-rust'
                      : active
                        ? 'text-rust'
                        : 'text-ink/70 hover:text-ink'
                  }
                  target={n.external ? '_blank' : undefined}
                  rel={n.external ? 'noopener' : undefined}
                >
                  {n.label}
                </Link>
              );
            })}
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
