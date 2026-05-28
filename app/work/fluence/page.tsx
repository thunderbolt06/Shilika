import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fluence Network Case Study: Making DePIN a Tier-1 Beat',
  description: 'How Shilika Jain made DePIN a beat for tier-1 crypto reporters and anchored Tom Trowbridge as the category voice across CoinDesk Opinion, Cointelegraph Hashing It Out, Decrypt and Benzinga. A Web3 PR category-creation case study.',
  
  alternates: { canonical: 'https://www.shilikajain.com/work/fluence' },
  openGraph: {
    title: 'Fluence Network: Making DePIN a Tier-1 Beat',
    description: 'CoinDesk Opinion, Cointelegraph \'Hashing It Out\', Decrypt, Benzinga and e27. A category-creation PR teardown by Shilika Jain, fractional PR manager.',
    url: 'https://www.shilikajain.com/work/fluence',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fluence Network: Making DePIN a Tier-1 Beat',
    description: 'CoinDesk Opinion, Cointelegraph \'Hashing It Out\', Decrypt, Benzinga and e27. A category-creation PR teardown by Shilika Jain, fractional PR manager.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__fluence-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work__fluence-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="work-fluence-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
