import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto KOL Agency Japan 2026 | Native Creator Access',
  description: 'Activate Japanese crypto creators with native briefs and a culturally precise approach, with disclosure handled the way Japanese audiences expect.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-kol-agency-japan` },
  openGraph: {
    title: 'Crypto KOL Agency Japan 2026 | Native Creator Access',
    description: 'Activate Japanese crypto creators with native briefs and a culturally precise approach, with disclosure handled the way Japanese audiences expect.',
    url: `${SITE_URL}/pages/crypto-kol-agency-japan`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/japan.jpg`,
        width: 1200,
        height: 630,
        alt: 'Japan PR: the FSA frame is paragraph one. CoinPost, Nikkei and WebX Tokyo. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto KOL Agency Japan 2026 | Native Creator Access',
    description: 'Activate Japanese crypto creators with native briefs and a culturally precise approach, with disclosure handled the way Japanese audiences expect.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/japan.jpg`,
        alt: 'Japan PR: the FSA frame is paragraph one. CoinPost, Nikkei and WebX Tokyo. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-kol-agency-japan-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-kol-agency-japan-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-crypto-kol-agency-japan-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
