import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'APAC Token Launch PR 2026 | Korea, Japan, SEA Timing',
  description: 'Time a TGE across the three APAC press windows with coordinated translation and regional KOLs, covering Korea, Japan and Southeast Asia.',
  alternates: { canonical: `${SITE_URL}/pages/apac-token-launch-pr` },
  openGraph: {
    title: 'APAC Token Launch PR 2026 | Korea, Japan, SEA Timing',
    description: 'Time a TGE across the three APAC press windows with coordinated translation and regional KOLs, covering Korea, Japan and Southeast Asia.',
    url: `${SITE_URL}/pages/apac-token-launch-pr`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/apac.jpg`,
        width: 1200,
        height: 630,
        alt: 'APAC PR that is not a translated press release. Korea, Japan, India, Singapore and MENA. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APAC Token Launch PR 2026 | Korea, Japan, SEA Timing',
    description: 'Time a TGE across the three APAC press windows with coordinated translation and regional KOLs, covering Korea, Japan and Southeast Asia.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/apac.jpg`,
        alt: 'APAC PR that is not a translated press release. Korea, Japan, India, Singapore and MENA. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
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
