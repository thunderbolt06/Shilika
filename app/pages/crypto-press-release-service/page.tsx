import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Press Release Service 2026 | Written to Get Picked Up',
  description: 'Press releases written around a dated news peg and pitched to the reporters who actually cover your beat.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-press-release-service` },
  openGraph: {
    title: 'Crypto Press Release Service 2026 | Written to Get Picked Up',
    description: 'Press releases written around a dated news peg and pitched to the reporters who actually cover your beat.',
    url: `${SITE_URL}/pages/crypto-press-release-service`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Press Release Service 2026 | Written to Get Picked Up',
    description: 'Press releases written around a dated news peg and pitched to the reporters who actually cover your beat.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-press-release-service-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-press-release-service-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-press-release-service-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
