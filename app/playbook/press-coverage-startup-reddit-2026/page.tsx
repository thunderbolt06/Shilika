import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Press Coverage for a Startup: What Reddit Gets Right and Wrong',
  description: 'The most-upvoted PR advice on Reddit, fact-checked by an operator. What holds up, what wastes your time, and what to do instead.',
  alternates: { canonical: `${SITE_URL}/playbook/press-coverage-startup-reddit-2026` },
  openGraph: {
    title: 'How to Get Press Coverage for a Startup: What Reddit Gets Right and Wrong',
    description: 'The most-upvoted PR advice on Reddit, fact-checked by an operator. What holds up, what wastes your time, and what to do instead.',
    url: `${SITE_URL}/playbook/press-coverage-startup-reddit-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Press Coverage for a Startup: What Reddit Gets Right and Wrong',
    description: 'The most-upvoted PR advice on Reddit, fact-checked by an operator. What holds up, what wastes your time, and what to do instead.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-23-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-23-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-23-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-23.js" strategy="afterInteractive" />
    </>
  );
}
