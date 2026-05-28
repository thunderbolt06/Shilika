import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'APAC PR Playbook 2026: Korea, Japan, Vietnam, India',
  description: 'An 11-minute APAC PR breakdown for Korea, Japan, Vietnam and India: which outlets matter, how to pitch them, and what most agencies get wrong.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/2' },
  openGraph: {
    title: 'APAC PR Playbook 2026: Korea, Japan, Vietnam, India',
    description: 'An 11-minute regional APAC PR breakdown for Web3 and AI founders: how it works in Korea, Japan, Vietnam and India.',
    url: 'https://www.shilikajain.com/playbook/2',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APAC PR Playbook 2026: Korea, Japan, Vietnam, India',
    description: 'An 11-minute regional APAC PR breakdown for Web3 and AI founders: how it works in Korea, Japan, Vietnam and India.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-2-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-2-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-2-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-2.js" strategy="afterInteractive" />
    </>
  );
}
