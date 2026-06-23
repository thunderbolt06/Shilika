import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for a Healthcare AI Startup in 2026',
  description: 'Healthcare AI carries a trust and regulatory burden no consumer app does. How to run comms that respects evidence, the FDA and skeptical reporters.',
  alternates: { canonical: `${SITE_URL}/playbook/healthcare-ai-pr-2026` },
  openGraph: {
    title: 'PR for a Healthcare AI Startup in 2026',
    description: 'Healthcare AI carries a trust and regulatory burden no consumer app does. How to run comms that respects evidence, the FDA and skeptical reporters.',
    url: `${SITE_URL}/playbook/healthcare-ai-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for a Healthcare AI Startup in 2026',
    description: 'Healthcare AI carries a trust and regulatory burden no consumer app does. How to run comms that respects evidence, the FDA and skeptical reporters.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-59-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-59-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-59-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-59.js" strategy="afterInteractive" />
    </>
  );
}
