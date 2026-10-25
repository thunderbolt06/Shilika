import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Web3 & AI Content Writing: Op-Eds & Papers',
  description: 'Ghostwritten op-eds, whitepapers, founder essays for Web3 and AI startups. Forbes-grade voice, technical accuracy, AI-search ready. From a senior PR operator.',
  
  alternates: { canonical: 'https://www.shilikajain.com/services/content-writing' },
  openGraph: {
    title: 'Web3 & AI Content Writing: Op-Eds & Papers',
    description: 'Op-eds, whitepapers, founder essays ghostwritten by a senior PR operator. Forbes-grade voice, technical accuracy, AI-search ready.',
    url: 'https://www.shilikajain.com/services/content-writing',
    type: 'website',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/content.jpg',
        width: 1200,
        height: 630,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3 & AI Content Writing: Op-Eds & Papers',
    description: 'Op-eds, whitepapers, founder essays ghostwritten by a senior PR operator. Forbes-grade voice, technical accuracy, AI-search ready.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/content.jpg',
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
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
      <Script id="services-content-writing-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />


    </>
  );
}
