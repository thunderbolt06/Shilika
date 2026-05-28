import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Testimonials - What clients say about Shilika Jain',
  description: '19 LinkedIn recommendations from Web3 founders, marketers and journalists who have worked with Shilika Jain - a senior PR strategist for Web3 and AI.',
  
  alternates: { canonical: 'https://www.shilikajain.com/testimonials' },
  openGraph: {
    title: 'Testimonials - 19 LinkedIn recommendations for Shilika Jain',
    description: 'Unedited recommendations from founders, CMOs and journalists who have worked with Shilika Jain.',
    url: 'https://www.shilikajain.com/testimonials',
    type: 'website',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testimonials - 19 LinkedIn recommendations for Shilika Jain',
    description: 'Unedited recommendations from founders, CMOs and journalists who have worked with Shilika Jain.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/testimonials-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/testimonials-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="testimonials-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/testimonials.js" strategy="afterInteractive" />
    </>
  );
}
