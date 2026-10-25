import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Ghostwriting Agency 2026 | Founder-Voice Content',
  description: 'Op-eds, threads and long-form essays written in a founder\'s actual voice, not template copy with the name swapped in.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-ghostwriting-agency` },
  openGraph: {
    title: 'Crypto Ghostwriting Agency 2026 | Founder-Voice Content',
    description: 'Op-eds, threads and long-form essays written in a founder\'s actual voice, not template copy with the name swapped in.',
    url: `${SITE_URL}/pages/crypto-ghostwriting-agency`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        width: 1200,
        height: 630,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Ghostwriting Agency 2026 | Founder-Voice Content',
    description: 'Op-eds, threads and long-form essays written in a founder\'s actual voice, not template copy with the name swapped in.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-ghostwriting-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-ghostwriting-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-ghostwriting-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
