import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Japan Crypto PR Agency 2026 | Native Outlets & Norms',
  description: 'Native Japanese placement and a pitch approach built for how Japanese newsrooms and regulators work.',
  alternates: { canonical: `${SITE_URL}/pages/japan-crypto-pr-agency` },
  openGraph: {
    title: 'Japan Crypto PR Agency 2026 | Native Outlets & Norms',
    description: 'Native Japanese placement and a pitch approach built for how Japanese newsrooms and regulators work.',
    url: `${SITE_URL}/pages/japan-crypto-pr-agency`,
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
    title: 'Japan Crypto PR Agency 2026 | Native Outlets & Norms',
    description: 'Native Japanese placement and a pitch approach built for how Japanese newsrooms and regulators work.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/japan.jpg`,
        alt: 'Japan PR: the FSA frame is paragraph one. CoinPost, Nikkei and WebX Tokyo. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__japan-crypto-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__japan-crypto-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-japan-crypto-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
