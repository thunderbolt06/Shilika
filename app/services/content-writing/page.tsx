import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Content Writing for Web3 & AI Founders: Op-Eds, Whitepapers',
  description: 'Ghostwritten op-eds, whitepapers, founder essays for Web3 and AI startups. Forbes-grade voice, technical accuracy, AI-search ready. From a senior PR operator.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/content-writing' },
  openGraph: {
    title: 'Content Writing for Web3 & AI Founders: Op-Eds, Whitepapers',
    description: 'Op-eds, whitepapers, founder essays ghostwritten by a senior PR operator. Forbes-grade voice, technical accuracy, AI-search ready.',
    url: 'https://www.shilikajain.com/services/content-writing',
    type: 'website',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content Writing for Web3 & AI Founders: Op-Eds, Whitepapers',
    description: 'Op-eds, whitepapers, founder essays ghostwritten by a senior PR operator. Forbes-grade voice, technical accuracy, AI-search ready.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__content-writing-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services__content-writing-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
