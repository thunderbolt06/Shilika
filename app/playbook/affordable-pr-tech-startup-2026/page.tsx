import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

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
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable PR for Tech Startups in 2026',
    description: 'What \'affordable PR\' really buys, the models that fit a small budget, and how to avoid cheap services that quietly cost you credibility.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-106-body.html'), 'utf8');
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
