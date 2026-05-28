import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Founder Profiling Sprint: 90 Days to Category Voice',
  description: 'A 6-minute founder profiling playbook: how to turn a technical founder into a category-defining voice in 90 days. Cadence, calendar and the four hand-offs.',
  
  alternates: { canonical: 'https://www.shilikajain.com/article-3' },
  openGraph: {
    title: 'Founder Profiling Sprint: 90 Days to Category Voice',
    description: 'How to turn a technical founder into a category-defining voice in 90 days. Cadence, calendar, hand-offs.',
    url: 'https://www.shilikajain.com/article-3',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Founder Profiling Sprint: 90 Days to Category Voice',
    description: 'How to turn a technical founder into a category-defining voice in 90 days. Cadence, calendar, hand-offs.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-3-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-3-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="article-3-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-3.js" strategy="afterInteractive" />
    </>
  );
}
