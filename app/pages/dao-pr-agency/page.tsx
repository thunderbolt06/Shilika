import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'DAO PR Agency 2026 | Governance & Community Comms',
  description: 'Make governance, treasuries and on-chain decision-making legible to editors and the wider community.',
  alternates: { canonical: `${SITE_URL}/pages/dao-pr-agency` },
  openGraph: {
    title: 'DAO PR Agency 2026 | Governance & Community Comms',
    description: 'Make governance, treasuries and on-chain decision-making legible to editors and the wider community.',
    url: `${SITE_URL}/pages/dao-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DAO PR Agency 2026 | Governance & Community Comms',
    description: 'Make governance, treasuries and on-chain decision-making legible to editors and the wider community.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__dao-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__dao-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-dao-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
