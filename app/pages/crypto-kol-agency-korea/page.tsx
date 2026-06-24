import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto KOL Agency Korea 2026 | Native Creator Access',
  description: 'Activate Korean creators credibly, by Korea\'s own rules, rates and platforms, with native briefs.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-kol-agency-korea` },
  openGraph: {
    title: 'Crypto KOL Agency Korea 2026 | Native Creator Access',
    description: 'Activate Korean creators credibly, by Korea\'s own rules, rates and platforms, with native briefs.',
    url: `${SITE_URL}/pages/crypto-kol-agency-korea`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto KOL Agency Korea 2026 | Native Creator Access',
    description: 'Activate Korean creators credibly, by Korea\'s own rules, rates and platforms, with native briefs.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-kol-agency-korea-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-kol-agency-korea-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-kol-agency-korea-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
