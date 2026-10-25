import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Fractional PR Consultants for Tech 2026',
  description: 'What a fractional PR consultant is, how to evaluate one, and why a senior operator part-time often beats a junior-staffed agency full-time.',
  alternates: { canonical: `${SITE_URL}/playbook/best-fractional-pr-consultant-tech-2026` },
  openGraph: {
    title: 'Best Fractional PR Consultants for Tech 2026',
    description: 'What a fractional PR consultant is, how to evaluate one, and why a senior operator part-time often beats a junior-staffed agency full-time.',
    url: `${SITE_URL}/playbook/best-fractional-pr-consultant-tech-2026`,
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
    title: 'Best Fractional PR Consultants for Tech 2026',
    description: 'What a fractional PR consultant is, how to evaluate one, and why a senior operator part-time often beats a junior-staffed agency full-time.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/compare.jpg`,
        alt: 'Which PR agency to hire for crypto and AI. Side-by-side comparisons with the trade-offs spelled out. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-75-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-75-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-75-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-75.js" strategy="afterInteractive" />
    </>
  );
}
