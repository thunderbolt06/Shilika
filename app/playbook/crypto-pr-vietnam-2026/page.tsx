import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR in Vietnam in 2026',
  description: 'Vietnam is one of the highest crypto-adoption markets on earth and one of the least understood by Western agencies. The outlets and the access.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-pr-vietnam-2026` },
  openGraph: {
    title: 'Crypto PR in Vietnam in 2026',
    description: 'Vietnam is one of the highest crypto-adoption markets on earth and one of the least understood by Western agencies. The outlets and the access.',
    url: `${SITE_URL}/playbook/crypto-pr-vietnam-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/press.jpg`,
        width: 1200,
        height: 630,
        alt: 'Where the stories land. Forbes, CoinDesk, Cointelegraph, Decrypt, The Block and more. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR in Vietnam in 2026',
    description: 'Vietnam is one of the highest crypto-adoption markets on earth and one of the least understood by Western agencies. The outlets and the access.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/press.jpg`,
        alt: 'Where the stories land. Forbes, CoinDesk, Cointelegraph, Decrypt, The Block and more. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-51-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-51-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-51-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-51.js" strategy="afterInteractive" />
    </>
  );
}
