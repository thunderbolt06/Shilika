import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Build Founder Thought Leadership in 2026',
  description: 'Thought leadership is earned, not posted. The cadence, the channels and the author-entity build that turns a founder into a cited authority.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-build-founder-thought-leadership-2026` },
  openGraph: {
    title: 'How to Build Founder Thought Leadership in 2026',
    description: 'Thought leadership is earned, not posted. The cadence, the channels and the author-entity build that turns a founder into a cited authority.',
    url: `${SITE_URL}/playbook/how-to-build-founder-thought-leadership-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build Founder Thought Leadership in 2026',
    description: 'Thought leadership is earned, not posted. The cadence, the channels and the author-entity build that turns a founder into a cited authority.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-65-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-65-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-65-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-65.js" strategy="afterInteractive" />
    </>
  );
}
