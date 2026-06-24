import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 KOL Agency 2026 | 200+ Vetted Creators',
  description: 'Region-segmented creator activation across X, YouTube, Telegram and Farcaster, with a fraud audit on every name.',
  alternates: { canonical: `${SITE_URL}/pages/web3-kol-agency` },
  openGraph: {
    title: 'Web3 KOL Agency 2026 | 200+ Vetted Creators',
    description: 'Region-segmented creator activation across X, YouTube, Telegram and Farcaster, with a fraud audit on every name.',
    url: `${SITE_URL}/pages/web3-kol-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 KOL Agency 2026 | 200+ Vetted Creators',
    description: 'Region-segmented creator activation across X, YouTube, Telegram and Farcaster, with a fraud audit on every name.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-kol-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-kol-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-web3-kol-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
