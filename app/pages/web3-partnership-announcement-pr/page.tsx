import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 Partnership Announcement PR 2026 | Integrations & Launches',
  description: 'PR for partnership, integration and feature launches: the news hook, the joint narrative and the outreach that gets picked up.',
  alternates: { canonical: `${SITE_URL}/pages/web3-partnership-announcement-pr` },
  openGraph: {
    title: 'Web3 Partnership Announcement PR 2026 | Integrations & Launches',
    description: 'PR for partnership, integration and feature launches: the news hook, the joint narrative and the outreach that gets picked up.',
    url: `${SITE_URL}/pages/web3-partnership-announcement-pr`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 Partnership Announcement PR 2026 | Integrations & Launches',
    description: 'PR for partnership, integration and feature launches: the news hook, the joint narrative and the outreach that gets picked up.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-partnership-announcement-pr-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__web3-partnership-announcement-pr-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-web3-partnership-announcement-pr-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
