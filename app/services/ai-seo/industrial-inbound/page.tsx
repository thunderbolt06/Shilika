import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const PAGE_URL = `${SITE_URL}/services/ai-seo/industrial-inbound`;
const TITLE = 'AI SEO for Manufacturers & Distributors';
const OG_DESCRIPTION =
  'Search and AI-answer leads for manufacturers and distributors. Catalog mapped to buyer queries, product and application pages, RFQ capture and tracking.';

export const metadata: Metadata = {
  title: TITLE,
  description:
    'Your buyers already search Google and ChatGPT for parts, specs and suppliers. We map your catalog to those searches and build RFQ-ready pages. From $1,000.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    url: PAGE_URL,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: OG_DESCRIPTION,
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadPartial(file: string): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials', file), 'utf8');
}

export default function Page() {
  return (
    <>
      <Script id="services-ai-seo-industrial-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: loadPartial('services__ai-seo__industrial-inbound-jsonld.json') }} />
      <div dangerouslySetInnerHTML={{ __html: loadPartial('services__ai-seo__industrial-inbound-body.html') }} />
    </>
  );
}
