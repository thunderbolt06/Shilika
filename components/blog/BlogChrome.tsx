import Link from 'next/link';

export function BlogHeader() {
  return (
    <header className="border-b border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-ink"
        >
          Shilika.Jain<span className="text-rust">.</span>
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest">
          <Link href="/blog" className="text-ink hover:text-rust">
            Playbooks
          </Link>
          <Link href="/about" className="text-ink hover:text-rust">
            About
          </Link>
          <a
            href="https://calendly.com/shilikajain/30min/"
            target="_blank"
            rel="noopener"
            className="rounded-full border border-ink px-4 py-2 hover:bg-ink hover:text-cream"
          >
            Book a call
          </a>
        </nav>
      </div>
    </header>
  );
}

export function BlogFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink py-16 text-cream">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-serif text-2xl md:text-3xl tracking-tight">
          Fractional PR for Web3 and AI founders.
        </p>
        <div className="mt-8 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest text-cream/70">
          <a href="https://www.linkedin.com/in/shilika/" target="_blank" rel="noopener" className="hover:text-cream">LinkedIn</a>
          <a href="https://x.com/Shilika_jain" target="_blank" rel="noopener" className="hover:text-cream">X</a>
          <a href="https://calendly.com/shilikajain/30min/" target="_blank" rel="noopener" className="hover:text-cream">Calendly</a>
          <Link href="/" className="hover:text-cream">Home</Link>
        </div>
      </div>
    </footer>
  );
}
