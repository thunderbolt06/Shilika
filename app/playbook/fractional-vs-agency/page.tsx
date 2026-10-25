import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional PR vs Web3 PR Agency: How to Choose in 2026',
  description: 'Fractional PR vs Web3 PR agency in 2026: cost, speed, founder access, bandwidth and accountability. A decision tree that tells you which model fits your stage.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/fractional-vs-agency', languages: languageAlternates('/playbook/fractional-vs-agency') },
  openGraph: {
    title: 'Fractional PR vs Web3 PR Agency: How to Choose in 2026',
    description: 'Cost, speed, founder access, accountability: a decision guide for Web3 and AI founders by a senior PR operator.',
    url: 'https://www.shilikajain.com/playbook/fractional-vs-agency',
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
    title: 'Fractional PR vs Web3 PR Agency: How to Choose in 2026',
    description: 'Cost, speed, founder access, accountability: a decision guide for Web3 and AI founders by a senior PR operator.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/compare.jpg',
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-6-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-6-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-6-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-6.js" strategy="afterInteractive" />
    </>
  );
}
