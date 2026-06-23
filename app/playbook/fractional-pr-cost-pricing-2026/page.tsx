import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional PR Cost and Monthly Retainer Pricing in 2026',
  description: 'What fractional PR really costs, what a retainer should include, and how to tell a fair price from an underqualified one.',
  alternates: { canonical: `${SITE_URL}/playbook/fractional-pr-cost-pricing-2026` },
  openGraph: {
    title: 'Fractional PR Cost and Monthly Retainer Pricing in 2026',
    description: 'What fractional PR really costs, what a retainer should include, and how to tell a fair price from an underqualified one.',
    url: `${SITE_URL}/playbook/fractional-pr-cost-pricing-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional PR Cost and Monthly Retainer Pricing in 2026',
    description: 'What fractional PR really costs, what a retainer should include, and how to tell a fair price from an underqualified one.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-77-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-77-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-77-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-77.js" strategy="afterInteractive" />
    </>
  );
}
