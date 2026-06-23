import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'The Most Common Token Launch PR Mistakes in 2026',
  description: 'The avoidable errors that quietly sink a TGE: no news hook, hype with no proof, ignoring APAC, KOL fraud, and going silent after launch.',
  alternates: { canonical: `${SITE_URL}/playbook/token-launch-pr-mistakes-2026` },
  openGraph: {
    title: 'The Most Common Token Launch PR Mistakes in 2026',
    description: 'The avoidable errors that quietly sink a TGE: no news hook, hype with no proof, ignoring APAC, KOL fraud, and going silent after launch.',
    url: `${SITE_URL}/playbook/token-launch-pr-mistakes-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Most Common Token Launch PR Mistakes in 2026',
    description: 'The avoidable errors that quietly sink a TGE: no news hook, hype with no proof, ignoring APAC, KOL fraud, and going silent after launch.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-113-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-113-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-113-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-113.js" strategy="afterInteractive" />
    </>
  );
}
