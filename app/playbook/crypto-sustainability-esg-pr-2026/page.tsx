import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Sustainability and ESG PR in 2026',
  description: 'Energy and ESG questions still shape how crypto gets covered. How to talk about sustainability credibly, without greenwashing claims you cannot back up.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-sustainability-esg-pr-2026` },
  openGraph: {
    title: 'Crypto Sustainability and ESG PR in 2026',
    description: 'Energy and ESG questions still shape how crypto gets covered. How to talk about sustainability credibly, without greenwashing claims you cannot back up.',
    url: `${SITE_URL}/playbook/crypto-sustainability-esg-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Sustainability and ESG PR in 2026',
    description: 'Energy and ESG questions still shape how crypto gets covered. How to talk about sustainability credibly, without greenwashing claims you cannot back up.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-122-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-122-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-122-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-122.js" strategy="afterInteractive" />
    </>
  );
}
