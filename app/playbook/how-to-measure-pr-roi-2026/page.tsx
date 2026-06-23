import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Measure PR ROI and Share of Voice in 2026',
  description: 'Impressions are vanity. The metrics that actually map PR to pipeline, the share-of-voice method, and what to report to a board.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-measure-pr-roi-2026` },
  openGraph: {
    title: 'How to Measure PR ROI and Share of Voice in 2026',
    description: 'Impressions are vanity. The metrics that actually map PR to pipeline, the share-of-voice method, and what to report to a board.',
    url: `${SITE_URL}/playbook/how-to-measure-pr-roi-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Measure PR ROI and Share of Voice in 2026',
    description: 'Impressions are vanity. The metrics that actually map PR to pipeline, the share-of-voice method, and what to report to a board.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-98-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-98-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-98-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-98.js" strategy="afterInteractive" />
    </>
  );
}
