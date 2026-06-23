import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto KOL Marketing in Korea in 2026',
  description: 'Korea\'s KOL scene runs by its own rules, rates and platforms. How to activate Korean creators credibly without importing Western playbooks.',
  alternates: { canonical: `${SITE_URL}/playbook/crypto-kol-marketing-korea-2026` },
  openGraph: {
    title: 'Crypto KOL Marketing in Korea in 2026',
    description: 'Korea\'s KOL scene runs by its own rules, rates and platforms. How to activate Korean creators credibly without importing Western playbooks.',
    url: `${SITE_URL}/playbook/crypto-kol-marketing-korea-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto KOL Marketing in Korea in 2026',
    description: 'Korea\'s KOL scene runs by its own rules, rates and platforms. How to activate Korean creators credibly without importing Western playbooks.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-84-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-84-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-84-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-84.js" strategy="afterInteractive" />
    </>
  );
}
