import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Token Launch Marketing Agencies in 2026: a Field Guide',
  description: 'A criteria-led look at token-launch and TGE agencies, the trade-offs of each model, and a fractional-operator alternative.',
  alternates: { canonical: `${SITE_URL}/playbook/best-token-launch-marketing-agencies-2026` },
  openGraph: {
    title: 'Best Token Launch Marketing Agencies in 2026: a Field Guide',
    description: 'A criteria-led look at token-launch and TGE agencies, the trade-offs of each model, and a fractional-operator alternative.',
    url: `${SITE_URL}/playbook/best-token-launch-marketing-agencies-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Token Launch Marketing Agencies in 2026: a Field Guide',
    description: 'A criteria-led look at token-launch and TGE agencies, the trade-offs of each model, and a fractional-operator alternative.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-28-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-28-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-28-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-28.js" strategy="afterInteractive" />
    </>
  );
}
