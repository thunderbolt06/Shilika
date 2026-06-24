import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'APAC Token Launch PR 2026 | Korea, Japan, SEA Timing',
  description: 'Time a TGE across the three APAC press windows with coordinated translation and regional KOLs.',
  alternates: { canonical: `${SITE_URL}/pages/apac-token-launch-pr` },
  openGraph: {
    title: 'APAC Token Launch PR 2026 | Korea, Japan, SEA Timing',
    description: 'Time a TGE across the three APAC press windows with coordinated translation and regional KOLs.',
    url: `${SITE_URL}/pages/apac-token-launch-pr`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APAC Token Launch PR 2026 | Korea, Japan, SEA Timing',
    description: 'Time a TGE across the three APAC press windows with coordinated translation and regional KOLs.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__apac-token-launch-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__apac-token-launch-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-apac-token-launch-pr-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
