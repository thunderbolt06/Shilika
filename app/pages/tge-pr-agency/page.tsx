import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'TGE PR Agency 2026 | Token Generation Event Comms',
  description: 'A dated comms sequence into and out of your token generation event: narrative, media, KOLs and crisis prep.',
  alternates: { canonical: `${SITE_URL}/pages/tge-pr-agency` },
  openGraph: {
    title: 'TGE PR Agency 2026 | Token Generation Event Comms',
    description: 'A dated comms sequence into and out of your token generation event: narrative, media, KOLs and crisis prep.',
    url: `${SITE_URL}/pages/tge-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TGE PR Agency 2026 | Token Generation Event Comms',
    description: 'A dated comms sequence into and out of your token generation event: narrative, media, KOLs and crisis prep.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__tge-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__tge-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-tge-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
