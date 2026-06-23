import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR for a Web3 Infrastructure Startup in 2026',
  description: 'Infra has no token hype and no consumer story. How to make wallets, RPCs, oracles and middleware newsworthy, with the Web3Auth playbook.',
  alternates: { canonical: `${SITE_URL}/playbook/web3-infrastructure-pr-2026` },
  openGraph: {
    title: 'PR for a Web3 Infrastructure Startup in 2026',
    description: 'Infra has no token hype and no consumer story. How to make wallets, RPCs, oracles and middleware newsworthy, with the Web3Auth playbook.',
    url: `${SITE_URL}/playbook/web3-infrastructure-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR for a Web3 Infrastructure Startup in 2026',
    description: 'Infra has no token hype and no consumer story. How to make wallets, RPCs, oracles and middleware newsworthy, with the Web3Auth playbook.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-39-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-39-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-39-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-39.js" strategy="afterInteractive" />
    </>
  );
}
