import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Exchange Listing Announcement PR: Best Practices for 2026',
  description: 'Binance, OKX, Bybit, KuCoin and the rest. The repeatable listing-announcement playbook and the compliance lines you cannot cross.',
  alternates: { canonical: `${SITE_URL}/playbook/exchange-listing-pr-best-practices-2026` },
  openGraph: {
    title: 'Crypto Exchange Listing Announcement PR: Best Practices for 2026',
    description: 'Binance, OKX, Bybit, KuCoin and the rest. The repeatable listing-announcement playbook and the compliance lines you cannot cross.',
    url: `${SITE_URL}/playbook/exchange-listing-pr-best-practices-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Exchange Listing Announcement PR: Best Practices for 2026',
    description: 'Binance, OKX, Bybit, KuCoin and the rest. The repeatable listing-announcement playbook and the compliance lines you cannot cross.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-26-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-26-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-26-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-26.js" strategy="afterInteractive" />
    </>
  );
}
