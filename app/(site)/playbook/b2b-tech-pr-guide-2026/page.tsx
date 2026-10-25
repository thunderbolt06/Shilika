import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'B2B Tech PR in 2026: What\'s Different',
  description: 'B2B PR sells to a buying committee, not a crowd. How category narrative, analyst relations and customer proof replace consumer-style hype.',
  alternates: { canonical: `${SITE_URL}/playbook/b2b-tech-pr-guide-2026` },
  openGraph: {
    title: 'B2B Tech PR in 2026: What\'s Different',
    description: 'B2B PR sells to a buying committee, not a crowd. How category narrative, analyst relations and customer proof replace consumer-style hype.',
    url: `${SITE_URL}/playbook/b2b-tech-pr-guide-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        width: 1200,
        height: 630,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Tech PR in 2026: What\'s Different',
    description: 'B2B PR sells to a buying committee, not a crowd. How category narrative, analyst relations and customer proof replace consumer-style hype.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-103-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-103-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="playbook-103-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-103.js" strategy="afterInteractive" />
    </>
  );
}
