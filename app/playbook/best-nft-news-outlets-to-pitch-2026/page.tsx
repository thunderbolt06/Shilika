import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best NFT News Outlets to Pitch in 2026',
  description: 'A working media list for NFT coverage: which outlets run what, how their desks differ, and how to pitch each one without wasting the shot.',
  alternates: { canonical: `${SITE_URL}/playbook/best-nft-news-outlets-to-pitch-2026` },
  openGraph: {
    title: 'Best NFT News Outlets to Pitch in 2026',
    description: 'A working media list for NFT coverage: which outlets run what, how their desks differ, and how to pitch each one without wasting the shot.',
    url: `${SITE_URL}/playbook/best-nft-news-outlets-to-pitch-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NFT News Outlets to Pitch in 2026',
    description: 'A working media list for NFT coverage: which outlets run what, how their desks differ, and how to pitch each one without wasting the shot.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-120-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-120-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-120-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-120.js" strategy="afterInteractive" />
    </>
  );
}
