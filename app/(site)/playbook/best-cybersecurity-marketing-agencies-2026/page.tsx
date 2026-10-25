import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Marketing Agencies for Cybersecurity Firms in 2026',
  description: 'Cybersecurity marketing is a credibility game most agencies misread. A criteria-led field guide and the analyst-aware alternative.',
  alternates: { canonical: `${SITE_URL}/playbook/best-cybersecurity-marketing-agencies-2026` },
  openGraph: {
    title: 'Best Marketing Agencies for Cybersecurity Firms in 2026',
    description: 'Cybersecurity marketing is a credibility game most agencies misread. A criteria-led field guide and the analyst-aware alternative.',
    url: `${SITE_URL}/playbook/best-cybersecurity-marketing-agencies-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/cyber.jpg`,
        width: 1200,
        height: 630,
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Marketing Agencies for Cybersecurity Firms in 2026',
    description: 'Cybersecurity marketing is a credibility game most agencies misread. A criteria-led field guide and the analyst-aware alternative.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/cyber.jpg`,
        alt: 'Cybersecurity PR from a senior operator. Fractional, hands-on, built for security founders. Photo: Shilika Jain seated in a wood-panelled library lounge lined with leather-bound books.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-94-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-94-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-94-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-94.js" strategy="afterInteractive" />
    </>
  );
}
