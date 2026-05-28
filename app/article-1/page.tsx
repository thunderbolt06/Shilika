import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'The Tier-1 PR Trap: Why Web3 Founders Chase Wrong Outlets',
  description: 'Why a Forbes mention can be worse than a niche placement, and how to read which publications actually move your roadmap. An 8-minute Web3 PR playbook.',
  
  alternates: { canonical: 'https://www.shilikajain.com/article-1' },
  openGraph: {
    title: 'The Tier-1 PR Trap: Why Web3 Founders Chase Wrong Outlets',
    description: 'Why a Forbes mention can be worse than a niche placement, and how to read which publications actually move your roadmap.',
    url: 'https://www.shilikajain.com/article-1',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Tier-1 PR Trap: Why Web3 Founders Chase Wrong Outlets',
    description: 'Why a Forbes mention can be worse than a niche placement, and how to read which publications actually move your roadmap.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-1-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-1-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-1.js" strategy="afterInteractive" />
    </>
  );
}
