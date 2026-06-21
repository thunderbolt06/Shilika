import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Pitch Cointelegraph in 2026: Pitch Guide',
  description:
    'How to pitch Cointelegraph and earn editorial coverage in 2026: how the newsroom is structured, the dated news peg, the under-150-word pitch, the editorial firewall, and the multilingual APAC editions.',

  alternates: { canonical: `${SITE_URL}/playbook/how-to-pitch-cointelegraph-2026` },
  openGraph: {
    title: 'How to Pitch Cointelegraph in 2026: Pitch Guide',
    description:
      'The dated news peg, the under-150-word pitch, the editorial firewall, and the multilingual editions, from a senior Web3 PR operator. The sister guide to the CoinDesk playbook.',
    url: `${SITE_URL}/playbook/how-to-pitch-cointelegraph-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Pitch Cointelegraph in 2026: Pitch Guide',
    description:
      'The dated news peg, the under-150-word pitch, the editorial firewall, and the multilingual editions, from a senior Web3 PR operator.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-13-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-13-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-13-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-13.js" strategy="afterInteractive" />
    </>
  );
}
