import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Your AI Startup Into TechCrunch in 2026',
  description: 'TechCrunch still sets the startup agenda. What its reporters cover, the exclusive-vs-embargo call, and a pitch that does not get deleted.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-ai-startup-in-techcrunch-2026` },
  openGraph: {
    title: 'How to Get Your AI Startup Into TechCrunch in 2026',
    description: 'TechCrunch still sets the startup agenda. What its reporters cover, the exclusive-vs-embargo call, and a pitch that does not get deleted.',
    url: `${SITE_URL}/playbook/how-to-get-ai-startup-in-techcrunch-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Your AI Startup Into TechCrunch in 2026',
    description: 'TechCrunch still sets the startup agenda. What its reporters cover, the exclusive-vs-embargo call, and a pitch that does not get deleted.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-61-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-61-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-61-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-61.js" strategy="afterInteractive" />
    </>
  );
}
