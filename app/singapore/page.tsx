import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Singapore Web3 & AI PR 2026: BT, DealStreetAsia, Token2049',
  description: 'Singapore PR for Web3 and AI founders. Business Times, Channel News Asia, DealStreetAsia, e27. MAS DTSP-aware framing, Token2049 Marina Bay Oct 2026.',
  alternates: { canonical: `${SITE_URL}/singapore` },
  openGraph: {
    title: 'Singapore Web3 & AI PR 2026: BT, DealStreetAsia, Token2049',
    description: 'Singapore PR for Web3 and AI founders. The Business Times, Channel News Asia, DealStreetAsia, Tech in Asia, e27, Lianhe Zaobao. MAS DTSP-aware framing, Project Guardian institutional partners, Token2049 Singapore Oct 2026 calendar.',
    url: `${SITE_URL}/singapore`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Singapore Web3 & AI PR 2026: BT, DealStreetAsia, Token2049',
    description: 'Singapore PR for Web3 and AI founders. MAS-aware framing, Token2049 Oct 2026 calendar, Project Guardian institutional anchor.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/singapore-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/singapore-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="singapore-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
