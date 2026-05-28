type Props = { label?: string | null; url?: string | null };

const DEFAULT_LABEL = 'Book a 30-min teardown with Shilika';
const DEFAULT_URL = 'https://calendly.com/shilikajain/30min/';

export function BookCallCTA({ label, url }: Props) {
  return (
    <aside className="my-12 rounded-2xl border border-ink/15 bg-cream/40 p-8 md:p-10">
      <p className="font-serif text-2xl md:text-3xl leading-tight tracking-tight text-ink">
        Want this playbook applied to your launch?
      </p>
      <p className="mt-2 max-w-prose text-ink/70">
        Shilika has placed 50+ Web3 and AI founders in Forbes, CoinDesk, Cointelegraph, Decrypt,
        The Block, Blockworks, and AI Magazine — across six APAC markets.
      </p>
      <a
        href={url || DEFAULT_URL}
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream transition hover:bg-rust"
      >
        {label || DEFAULT_LABEL}
        <span aria-hidden>→</span>
      </a>
    </aside>
  );
}
