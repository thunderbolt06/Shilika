import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Web3 PR Agencies in 2026: Honest Guide',
  description: 'Honest 2026 field guide to Web3 PR. Lunar, EAK, Coinbound, Outset, High Vibe compared on cost, Tier-1 access and regional reach. Senior-operator pick.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/best-web3-pr-agencies-2026', languages: languageAlternates('/playbook/best-web3-pr-agencies-2026') },
  openGraph: {
    title: 'Best Web3 PR Agencies and Consultants in 2026: Honest Field Guide',
    description: 'Lunar, EAK, Coinbound, Outset, High Vibe and Shilika Jain compared on cost, Tier-1 access, regional reach, founder time. A senior operator\'s honest take.',
    url: 'https://www.shilikajain.com/playbook/best-web3-pr-agencies-2026',
    type: 'article',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/compare.jpg',
        width: 1200,
        height: 630,
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Web3 PR Agencies and Consultants in 2026: Honest Field Guide',
    description: 'Lunar, EAK, Coinbound, Outset, High Vibe and Shilika Jain compared on cost, Tier-1 access, regional reach, founder time. A senior operator\'s honest take.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/compare.jpg',
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-7-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-7-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-7-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-7.js" strategy="afterInteractive" />
    </>
  );
}
