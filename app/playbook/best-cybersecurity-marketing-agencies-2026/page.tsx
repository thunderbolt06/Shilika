import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

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
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Marketing Agencies for Cybersecurity Firms in 2026',
    description: 'Cybersecurity marketing is a credibility game most agencies misread. A criteria-led field guide and the analyst-aware alternative.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-94-body.html'), 'utf8');
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
