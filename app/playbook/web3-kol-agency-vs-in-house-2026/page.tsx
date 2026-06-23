import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 KOL Agency vs Building Your Own Creator List in 2026',
  description: 'Rent the network or build it. The cost, control and risk trade-offs of a KOL agency versus an in-house creator program.',
  alternates: { canonical: `${SITE_URL}/playbook/web3-kol-agency-vs-in-house-2026` },
  openGraph: {
    title: 'Web3 KOL Agency vs Building Your Own Creator List in 2026',
    description: 'Rent the network or build it. The cost, control and risk trade-offs of a KOL agency versus an in-house creator program.',
    url: `${SITE_URL}/playbook/web3-kol-agency-vs-in-house-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 KOL Agency vs Building Your Own Creator List in 2026',
    description: 'Rent the network or build it. The cost, control and risk trade-offs of a KOL agency versus an in-house creator program.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-86-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-86-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-86-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-86.js" strategy="afterInteractive" />
    </>
  );
}
