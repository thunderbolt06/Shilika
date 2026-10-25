import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Founder Essay Ghostwriting 2026',
  description: 'Founder essays written in your voice and structured for human readers and AI search, with an original argument and sources that hold up to scrutiny.',
  alternates: { canonical: `${SITE_URL}/pages/founder-essay-ghostwriting` },
  openGraph: {
    title: 'Founder Essay Ghostwriting 2026',
    description: 'Founder essays written in your voice and structured for human readers and AI search, with an original argument and sources that hold up to scrutiny.',
    url: `${SITE_URL}/pages/founder-essay-ghostwriting`,
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
    title: 'Founder Essay Ghostwriting 2026',
    description: 'Founder essays written in your voice and structured for human readers and AI search, with an original argument and sources that hold up to scrutiny.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__founder-essay-ghostwriting-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__founder-essay-ghostwriting-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-founder-essay-ghostwriting-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
