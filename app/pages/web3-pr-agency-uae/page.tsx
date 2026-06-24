import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 PR Agency UAE 2026 | Abu Dhabi & Dubai',
  description: 'UAE-based and UAE-targeted Web3 PR with regulatory tailwinds and event-led access.',
  alternates: { canonical: `${SITE_URL}/pages/web3-pr-agency-uae` },
  openGraph: {
    title: 'Web3 PR Agency UAE 2026 | Abu Dhabi & Dubai',
    description: 'UAE-based and UAE-targeted Web3 PR with regulatory tailwinds and event-led access.',
    url: `${SITE_URL}/pages/web3-pr-agency-uae`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 PR Agency UAE 2026 | Abu Dhabi & Dubai',
    description: 'UAE-based and UAE-targeted Web3 PR with regulatory tailwinds and event-led access.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-pr-agency-uae-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-pr-agency-uae-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-web3-pr-agency-uae-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
