import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Web3 Marketing Agency 2026 | PR, KOL, Growth',
  description: 'How to choose a Web3 marketing partner by what you actually need, with the red flags to avoid and the questions that expose real depth.',
  alternates: { canonical: `${SITE_URL}/pages/best-web3-marketing-agency` },
  openGraph: {
    title: 'Best Web3 Marketing Agency 2026 | PR, KOL, Growth',
    description: 'How to choose a Web3 marketing partner by what you actually need, with the red flags to avoid and the questions that expose real depth.',
    url: `${SITE_URL}/pages/best-web3-marketing-agency`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/compare.jpg`,
        width: 1200,
        height: 630,
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Web3 Marketing Agency 2026 | PR, KOL, Growth',
    description: 'How to choose a Web3 marketing partner by what you actually need, with the red flags to avoid and the questions that expose real depth.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/compare.jpg`,
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__best-web3-marketing-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__best-web3-marketing-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-best-web3-marketing-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
