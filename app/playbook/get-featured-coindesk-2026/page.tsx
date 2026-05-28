import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Featured in CoinDesk in 2026: Pitch Guide',
  description: 'What CoinDesk editors filter for, pitch templates that land, embargo etiquette and three worked examples from a senior Web3 PR operator\'s 2026 playbook.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/5' },
  openGraph: {
    title: 'How to Get Featured in CoinDesk in 2026: Pitch Guide',
    description: 'What CoinDesk editors filter for, pitch templates that work, and 3 worked examples from a senior Web3 PR operator.',
    url: 'https://www.shilikajain.com/playbook/5',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Featured in CoinDesk in 2026: Pitch Guide',
    description: 'What CoinDesk editors filter for, pitch templates that work, and 3 worked examples from a senior Web3 PR operator.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-5-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-5-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-5-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-5.js" strategy="afterInteractive" />
    </>
  );
}
