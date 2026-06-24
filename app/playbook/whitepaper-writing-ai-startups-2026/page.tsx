import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Whitepaper Writing for AI Startups in 2026',
  description:
    'An AI startup whitepaper is not a crypto whitepaper, a pitch deck or a blog post. A fractional operator on what goes in it, the four audiences it serves, how to make it citable by AI search, ghostwriting cost, and the honest limits.',
  alternates: { canonical: `${SITE_URL}/playbook/whitepaper-writing-ai-startups-2026` },
  openGraph: {
    title: 'Whitepaper Writing for AI Startups in 2026',
    description:
      'What goes in an AI startup whitepaper, who it has to serve, and how to make it citable by AI search engines. The operator breakdown.',
    url: `${SITE_URL}/playbook/whitepaper-writing-ai-startups-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whitepaper Writing for AI Startups in 2026',
    description:
      'What goes in an AI startup whitepaper, who it has to serve, and how to make it citable by AI search engines. The operator breakdown.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-115-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-115-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-115-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-115.js" strategy="afterInteractive" />
    </>
  );
}
