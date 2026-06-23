import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Build AI Search Visibility (GEO) for a Startup in 2026',
  description: 'When buyers ask ChatGPT instead of Google, getting cited is the win. The earned-media and content moves that make AI engines name your brand.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-build-ai-search-visibility-geo-2026` },
  openGraph: {
    title: 'How to Build AI Search Visibility (GEO) for a Startup in 2026',
    description: 'When buyers ask ChatGPT instead of Google, getting cited is the win. The earned-media and content moves that make AI engines name your brand.',
    url: `${SITE_URL}/playbook/how-to-build-ai-search-visibility-geo-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build AI Search Visibility (GEO) for a Startup in 2026',
    description: 'When buyers ask ChatGPT instead of Google, getting cited is the win. The earned-media and content moves that make AI engines name your brand.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-95-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-95-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-95-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-95.js" strategy="afterInteractive" />
    </>
  );
}
