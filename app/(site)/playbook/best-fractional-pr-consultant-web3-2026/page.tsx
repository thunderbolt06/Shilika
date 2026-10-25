import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Fractional PR Consultant for Web3 2026',
  description: 'Web3 moves too fast for agency layers. Why fractional fits crypto founders, what to look for, and the trade-offs to weigh honestly.',
  alternates: { canonical: `${SITE_URL}/playbook/best-fractional-pr-consultant-web3-2026` },
  openGraph: {
    title: 'Best Fractional PR Consultant for Web3 2026',
    description: 'Web3 moves too fast for agency layers. Why fractional fits crypto founders, what to look for, and the trade-offs to weigh honestly.',
    url: `${SITE_URL}/playbook/best-fractional-pr-consultant-web3-2026`,
    type: 'article',
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
    title: 'Best Fractional PR Consultant for Web3 2026',
    description: 'Web3 moves too fast for agency layers. Why fractional fits crypto founders, what to look for, and the trade-offs to weigh honestly.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/compare.jpg`,
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-76-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-76-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-76-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-76.js" strategy="afterInteractive" />
    </>
  );
}
