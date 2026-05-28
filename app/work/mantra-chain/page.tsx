import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'MANTRA Chain Case Study: The $11M RWA Raise, Middle East Angle',
  description: 'How Shilika Jain ran the MANTRA Chain $11M raise: a CoinDesk exclusive on the Middle East RWA angle and a standalone Cointelegraph CEO profile. Named outlets, named investors, the dual-asset playbook.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/mantra-chain' },
  openGraph: {
    title: 'MANTRA Chain: The $11M RWA Raise With a Middle East Angle',
    description: 'CoinDesk exclusive, Decrypt, CryptoPotato, a standalone Cointelegraph CEO profile. A 2024 funding-announcement PR teardown by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/mantra-chain',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANTRA Chain: The $11M RWA Raise With a Middle East Angle',
    description: 'CoinDesk exclusive, Decrypt, CryptoPotato, a standalone Cointelegraph CEO profile. A 2024 funding-announcement PR teardown by Shilika Jain, fractional PR manager.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__mantra-chain-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__mantra-chain-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
