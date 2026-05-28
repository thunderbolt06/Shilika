import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 KOL Marketing 2026: 200+ Vetted Creators, FTC-Safe',
  description: 'Web3 KOL marketing for crypto, AI and cybersecurity launches. 200+ vetted creators across X, YouTube, Telegram. Region-segmented waves, FTC-safe disclosures.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/kol-marketing' },
  openGraph: {
    title: 'Web3 KOL Marketing 2026: 200+ Vetted Creators, FTC-Safe',
    description: 'Web3 KOL marketing for crypto, AI and cybersecurity launches. 200+ vetted creators across X, YouTube, Telegram. Region-segmented waves, FTC-safe disclosures, fraud audit, on-chain attribution. RARI, MANTRA, Bullieverse proof.',
    url: 'https://www.shilikajain.com/services/kol-marketing',
    type: 'website',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 KOL Marketing 2026: 200+ Vetted Creators, FTC-Safe',
    description: 'Web3 KOL marketing for crypto, AI and cybersecurity launches. 200+ vetted creators across X, YouTube, Telegram. Region-segmented waves, FTC-safe disclosures, fraud audit, on-chain attribution. RARI, MANTRA, Bullieverse proof.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__kol-marketing-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__kol-marketing-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="services-kol-marketing-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
