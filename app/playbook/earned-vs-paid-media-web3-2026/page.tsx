import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Earned vs Paid Media in Web3 in 2026',
  description: 'Paid buys reach; earned builds belief. Where each fits in a Web3 budget, why credibility outlasts impressions, and how to blend them.',
  alternates: { canonical: `${SITE_URL}/playbook/earned-vs-paid-media-web3-2026` },
  openGraph: {
    title: 'Earned vs Paid Media in Web3 in 2026',
    description: 'Paid buys reach; earned builds belief. Where each fits in a Web3 budget, why credibility outlasts impressions, and how to blend them.',
    url: `${SITE_URL}/playbook/earned-vs-paid-media-web3-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Earned vs Paid Media in Web3 in 2026',
    description: 'Paid buys reach; earned builds belief. Where each fits in a Web3 budget, why credibility outlasts impressions, and how to blend them.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-104-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-104-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-104-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-104.js" strategy="afterInteractive" />
    </>
  );
}
