import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best B2B SaaS PR Agencies Ranked in 2026',
  description: 'B2B SaaS PR is a different sport from consumer. A criteria-led look at the field, what separates the best, and the fractional alternative.',
  alternates: { canonical: `${SITE_URL}/playbook/best-b2b-saas-pr-agencies-2026` },
  openGraph: {
    title: 'Best B2B SaaS PR Agencies Ranked in 2026',
    description: 'B2B SaaS PR is a different sport from consumer. A criteria-led look at the field, what separates the best, and the fractional alternative.',
    url: `${SITE_URL}/playbook/best-b2b-saas-pr-agencies-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best B2B SaaS PR Agencies Ranked in 2026',
    description: 'B2B SaaS PR is a different sport from consumer. A criteria-led look at the field, what separates the best, and the fractional alternative.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-64-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-64-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-64-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-64.js" strategy="afterInteractive" />
    </>
  );
}
