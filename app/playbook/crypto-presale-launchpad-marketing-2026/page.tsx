import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Presale and Launchpad Marketing Playbook for 2026',
  description: 'Launchpads bring liquidity, not narrative. How to build demand and credibility around a presale without the usual hype-cycle damage.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-presale-launchpad-marketing-2026` },
  openGraph: {
    title: 'Crypto Presale and Launchpad Marketing Playbook for 2026',
    description: 'Launchpads bring liquidity, not narrative. How to build demand and credibility around a presale without the usual hype-cycle damage.',
    url: `${SITE_URL}/playbook/crypto-presale-launchpad-marketing-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Presale and Launchpad Marketing Playbook for 2026',
    description: 'Launchpads bring liquidity, not narrative. How to build demand and credibility around a presale without the usual hype-cycle damage.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-29-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-29-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-29-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-29.js" strategy="afterInteractive" />
    </>
  );
}
