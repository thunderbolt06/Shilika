import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AI Startup Series A Funding Announcement PR in 2026',
  description: 'A raise is a commodity until you frame it. How to turn an AI Series A into a category story instead of another funding-round line item.',
  alternates: { canonical: `${SITE_URL}/playbook/ai-series-a-funding-announcement-pr-2026` },
  openGraph: {
    title: 'AI Startup Series A Funding Announcement PR in 2026',
    description: 'A raise is a commodity until you frame it. How to turn an AI Series A into a category story instead of another funding-round line item.',
    url: `${SITE_URL}/playbook/ai-series-a-funding-announcement-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Startup Series A Funding Announcement PR in 2026',
    description: 'A raise is a commodity until you frame it. How to turn an AI Series A into a category story instead of another funding-round line item.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-56-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-56-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-56-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-56.js" strategy="afterInteractive" />
    </>
  );
}
