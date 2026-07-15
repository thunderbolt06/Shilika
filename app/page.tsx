import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ClientReBoot } from '@/components/site/ClientReBoot';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 PR & AI PR Consultant | Shilika Jain',
  description:
    'Fractional Web3 PR and AI PR for crypto and AI startups. Coverage in Forbes, CoinDesk, Economic Times and Yahoo Finance. $5k-10k/month. Book a call.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    siteName: 'Shilika Jain',
    title: 'Web3 PR & AI PR Consultant | Shilika Jain',
    description:
      'Fractional Web3 PR and AI PR for crypto and AI startups. Coverage in Forbes, CoinDesk, Economic Times and Yahoo Finance. $5k-10k/month. Book a call.',
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`,
        width: 1200,
        height: 628,
        alt: 'Shilika Jain - fractional PR for Web3 and AI founders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 PR & AI PR Consultant | Shilika Jain',
    description:
      'Fractional Web3 PR and AI PR for crypto and AI startups. Coverage in Forbes, CoinDesk, Economic Times and Yahoo Finance.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

// Phase 1: source-of-truth body markup ported from the legacy index.html.
// Phase 2 will replace this with idiomatic JSX server components.
function loadHomepageBody(): string {
  const file = path.join(process.cwd(), 'app/_partials/homepage-body.html');
  return fs.readFileSync(file, 'utf8');
}

function loadHomepageJsonLd(): string {
  const file = path.join(process.cwd(), 'app/_partials/homepage-jsonld.json');
  return fs.readFileSync(file, 'utf8');
}

export default function HomePage() {
  const body = loadHomepageBody();
  const jsonLd = loadHomepageJsonLd();
  return (
    <>
      <Script
        id="homepage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/site.js" strategy="afterInteractive" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <ClientReBoot />
    </>
  );
}
