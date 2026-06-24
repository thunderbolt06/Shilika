import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto YouTube Influencer Agency 2026 | Deep-Dive Creators',
  description: 'Long-form YouTube creator partnerships for projects that reward a real explanation, vetted for genuine audiences.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-youtube-influencer-agency` },
  openGraph: {
    title: 'Crypto YouTube Influencer Agency 2026 | Deep-Dive Creators',
    description: 'Long-form YouTube creator partnerships for projects that reward a real explanation, vetted for genuine audiences.',
    url: `${SITE_URL}/pages/crypto-youtube-influencer-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto YouTube Influencer Agency 2026 | Deep-Dive Creators',
    description: 'Long-form YouTube creator partnerships for projects that reward a real explanation, vetted for genuine audiences.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-youtube-influencer-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-youtube-influencer-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-youtube-influencer-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
