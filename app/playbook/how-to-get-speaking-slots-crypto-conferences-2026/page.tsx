import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Speaking Slots at Crypto Conferences in 2026',
  description: 'Consensus, Token2049, ETHDenver and the rest. How conference programming actually works and how founders earn a real slot, not a side stage.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-speaking-slots-crypto-conferences-2026` },
  openGraph: {
    title: 'How to Get Speaking Slots at Crypto Conferences in 2026',
    description: 'Consensus, Token2049, ETHDenver and the rest. How conference programming actually works and how founders earn a real slot, not a side stage.',
    url: `${SITE_URL}/playbook/how-to-get-speaking-slots-crypto-conferences-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/speaker.jpg`,
        width: 1200,
        height: 630,
        alt: 'Keynotes on Web3, AI & cybersecurity PR. Binary Summit Bangkok, India Blockchain Week 2024, Web3 Conf Goa. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Speaking Slots at Crypto Conferences in 2026',
    description: 'Consensus, Token2049, ETHDenver and the rest. How conference programming actually works and how founders earn a real slot, not a side stage.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/speaker.jpg`,
        alt: 'Keynotes on Web3, AI & cybersecurity PR. Binary Summit Bangkok, India Blockchain Week 2024, Web3 Conf Goa. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-71-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-71-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-71-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-71.js" strategy="afterInteractive" />
    </>
  );
}
