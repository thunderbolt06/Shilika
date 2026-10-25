import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Op-Eds vs Press Releases for Web3 Founders in 2026',
  description:
    'When to announce a fact and when to argue a position: which earns coverage, why AI engines cite op-eds over releases, ghostwriting cost and sequencing.',
  alternates: { canonical: `${SITE_URL}/playbook/op-eds-vs-press-releases` },
  openGraph: {
    title: 'Op-Eds vs Press Releases for Web3 Founders in 2026',
    description:
      'A press release announces; an op-ed argues. Which one earns coverage, which one gets cited by AI engines, and how to run both together around a launch.',
    url: `${SITE_URL}/playbook/op-eds-vs-press-releases`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        width: 1200,
        height: 630,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Op-Eds vs Press Releases for Web3 Founders in 2026',
    description:
      'A press release announces; an op-ed argues. Which one earns coverage, which one gets cited by AI engines, and how to run both together around a launch.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-14-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-14-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-14-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-14.js" strategy="afterInteractive" />
    </>
  );
}
