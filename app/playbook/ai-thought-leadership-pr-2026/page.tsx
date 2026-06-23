import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AI Thought Leadership in 2026: Executive Positioning That Works',
  description: 'In AI, credibility is the whole game. How to position a technical founder as a category authority across op-eds, podcasts and analyst rooms.',
  alternates: { canonical: `${SITE_URL}/playbook/ai-thought-leadership-pr-2026` },
  openGraph: {
    title: 'AI Thought Leadership in 2026: Executive Positioning That Works',
    description: 'In AI, credibility is the whole game. How to position a technical founder as a category authority across op-eds, podcasts and analyst rooms.',
    url: `${SITE_URL}/playbook/ai-thought-leadership-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Thought Leadership in 2026: Executive Positioning That Works',
    description: 'In AI, credibility is the whole game. How to position a technical founder as a category authority across op-eds, podcasts and analyst rooms.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-57-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-57-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-57-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-57.js" strategy="afterInteractive" />
    </>
  );
}
