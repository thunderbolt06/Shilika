import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Token Launch PR 2026: TGE Comms, Exchange & KOL Waves',
  description: 'Token launch and TGE PR run by one senior operator. Pre-launch sequencing, embargo strategy, exchange comms, KOL waves, post-TGE coverage. Book a teardown.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/token-launch-pr' },
  openGraph: {
    title: 'Token Launch PR 2026: TGE Comms, Exchange & KOL Waves',
    description: 'Fractional token launch and TGE communications. Pre-launch sequencing, embargoed tier-1 coverage, exchange comms (Binance, OKX, MEXC), KOL waves, post-TGE earned coverage. 50+ protocols.',
    url: 'https://www.shilikajain.com/services/token-launch-pr',
    type: 'website',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Launch PR 2026: TGE Comms, Exchange & KOL Waves',
    description: 'Fractional token launch and TGE communications. Pre-launch sequencing, embargoed tier-1 coverage, exchange comms (Binance, OKX, MEXC), KOL waves, post-TGE earned coverage. 50+ protocols.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__token-launch-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__token-launch-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="services-token-launch-pr-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
