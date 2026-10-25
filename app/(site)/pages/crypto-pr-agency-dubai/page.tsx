import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto PR Agency Dubai & MENA 2026 | VARA, Token2049',
  description: 'MENA placement plus Token2049 Dubai leverage and a VARA-aware regulatory angle, delivered directly by a senior fractional operator, not an agency bench.',
  alternates: { canonical: `${SITE_URL}/pages/crypto-pr-agency-dubai` },
  openGraph: {
    title: 'Crypto PR Agency Dubai & MENA 2026 | VARA, Token2049',
    description: 'MENA placement plus Token2049 Dubai leverage and a VARA-aware regulatory angle, delivered directly by a senior fractional operator, not an agency bench.',
    url: `${SITE_URL}/pages/crypto-pr-agency-dubai`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/mena.jpg`,
        width: 1200,
        height: 630,
        alt: 'Dubai and MENA PR: VARA is paragraph one. VARA, ADGM and RAK DAO. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto PR Agency Dubai & MENA 2026 | VARA, Token2049',
    description: 'MENA placement plus Token2049 Dubai leverage and a VARA-aware regulatory angle, delivered directly by a senior fractional operator, not an agency bench.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/mena.jpg`,
        alt: 'Dubai and MENA PR: VARA is paragraph one. VARA, ADGM and RAK DAO. Photo: Shilika Jain in front of a red Press Lounge wall at the Consensus conference.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-dubai-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__crypto-pr-agency-dubai-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-crypto-pr-agency-dubai-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
