import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AEO vs SEO: What Startups Actually Need in 2026',
  description: 'Answer-engine optimization is not a replacement for SEO, it\'s a layer on top. What\'s different, what overlaps, and where to spend first.',
  alternates: { canonical: `${SITE_URL}/playbook/aeo-vs-seo-startups-2026` },
  openGraph: {
    title: 'AEO vs SEO: What Startups Actually Need in 2026',
    description: 'Answer-engine optimization is not a replacement for SEO, it\'s a layer on top. What\'s different, what overlaps, and where to spend first.',
    url: `${SITE_URL}/playbook/aeo-vs-seo-startups-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEO vs SEO: What Startups Actually Need in 2026',
    description: 'Answer-engine optimization is not a replacement for SEO, it\'s a layer on top. What\'s different, what overlaps, and where to spend first.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-97-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-97-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-97-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-97.js" strategy="afterInteractive" />
    </>
  );
}
