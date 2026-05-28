import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best Web3 PR Agencies and Consultants in 2026: Honest Guide',
  description: 'An honest 2026 field guide to Web3 PR. Named agencies (Lunar, EAK, Coinbound, Outset, High Vibe) compared on cost, Tier-1 access, regional reach, and founder time. With a fractional senior-operator alternative.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/best-web3-pr-agencies-2026' },
  openGraph: {
    title: 'Best Web3 PR Agencies and Consultants in 2026: Honest Field Guide',
    description: 'Lunar, EAK, Coinbound, Outset, High Vibe and Shilika Jain compared on cost, Tier-1 access, regional reach, founder time. A senior operator\'s honest take.',
    url: 'https://www.shilikajain.com/playbook/best-web3-pr-agencies-2026',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Web3 PR Agencies and Consultants in 2026: Honest Field Guide',
    description: 'Lunar, EAK, Coinbound, Outset, High Vibe and Shilika Jain compared on cost, Tier-1 access, regional reach, founder time. A senior operator\'s honest take.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-7-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-7-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-7-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-7.js" strategy="afterInteractive" />
    </>
  );
}
