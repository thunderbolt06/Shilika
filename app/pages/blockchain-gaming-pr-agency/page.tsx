import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Blockchain Gaming PR Agency 2026 | Dual-Track Comms',
  description: 'Dual-track PR for gamers and crypto media, with the Bullieverse India launch as the worked example.',
  alternates: { canonical: `${SITE_URL}/pages/blockchain-gaming-pr-agency` },
  openGraph: {
    title: 'Blockchain Gaming PR Agency 2026 | Dual-Track Comms',
    description: 'Dual-track PR for gamers and crypto media, with the Bullieverse India launch as the worked example.',
    url: `${SITE_URL}/pages/blockchain-gaming-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blockchain Gaming PR Agency 2026 | Dual-Track Comms',
    description: 'Dual-track PR for gamers and crypto media, with the Bullieverse India launch as the worked example.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__blockchain-gaming-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__blockchain-gaming-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-blockchain-gaming-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
