import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Affordable PR for Tech Startups in 2026',
  description: 'What \'affordable PR\' really buys, the models that fit a small budget, and how to avoid cheap services that quietly cost you credibility.',
  alternates: { canonical: `${SITE_URL}/playbook/affordable-pr-tech-startup-2026` },
  openGraph: {
    title: 'Affordable PR for Tech Startups in 2026',
    description: 'What \'affordable PR\' really buys, the models that fit a small budget, and how to avoid cheap services that quietly cost you credibility.',
    url: `${SITE_URL}/playbook/affordable-pr-tech-startup-2026`,
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
    title: 'Affordable PR for Tech Startups in 2026',
    description: 'What \'affordable PR\' really buys, the models that fit a small budget, and how to avoid cheap services that quietly cost you credibility.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-106-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-106-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-106-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-106.js" strategy="afterInteractive" />
    </>
  );
}
