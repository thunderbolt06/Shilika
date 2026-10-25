import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Korea & Japan Crypto PR 2026 | Dual-Market Access',
  description: 'Coordinated native coverage across the two highest-value, highest-bar APAC crypto markets, Korea and Japan, with local-language pitching and timing.',
  alternates: { canonical: `${SITE_URL}/pages/korea-japan-crypto-pr` },
  openGraph: {
    title: 'Korea & Japan Crypto PR 2026 | Dual-Market Access',
    description: 'Coordinated native coverage across the two highest-value, highest-bar APAC crypto markets, Korea and Japan, with local-language pitching and timing.',
    url: `${SITE_URL}/pages/korea-japan-crypto-pr`,
    type: 'website',
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
    title: 'Korea & Japan Crypto PR 2026 | Dual-Market Access',
    description: 'Coordinated native coverage across the two highest-value, highest-bar APAC crypto markets, Korea and Japan, with local-language pitching and timing.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/press.jpg`,
        alt: 'Where the stories land. Forbes, CoinDesk, Cointelegraph, Decrypt, The Block and more. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__korea-japan-crypto-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__korea-japan-crypto-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-korea-japan-crypto-pr-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
