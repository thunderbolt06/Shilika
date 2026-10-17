import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'MANTRA Chain Case Study: $11M RWA Raise, Middle East Angle',
  description: 'How Shilika Jain ran the MANTRA Chain $11M raise: a CoinDesk exclusive on the Middle East RWA angle plus a Cointelegraph CEO profile.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/mantra-chain' },
  openGraph: {
    title: 'MANTRA Chain: The $11M RWA Raise With a Middle East Angle',
    description: 'CoinDesk exclusive, Decrypt, CryptoPotato, a standalone Cointelegraph CEO profile. A 2024 funding-announcement PR teardown by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/mantra-chain',
    type: 'article',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/work-mantra-chain.jpg',
        width: 1200,
        height: 630,
        alt: '$11M RWA raise with a Middle East angle. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MANTRA Chain: The $11M RWA Raise With a Middle East Angle',
    description: 'CoinDesk exclusive, Decrypt, CryptoPotato, a standalone Cointelegraph CEO profile. A 2024 funding-announcement PR teardown by Shilika Jain, fractional PR manager.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/work-mantra-chain.jpg',
        alt: '$11M RWA raise with a Middle East angle. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
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
      <Script id="work-mantra-chain-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
