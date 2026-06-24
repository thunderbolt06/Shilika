import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AI PR Consultant 2026 | Senior, Specialist, Fractional',
  description: 'A senior AI PR consultant who runs your media strategy directly and gets the technical story right.',
  alternates: { canonical: `${SITE_URL}/pages/ai-pr-consultant` },
  openGraph: {
    title: 'AI PR Consultant 2026 | Senior, Specialist, Fractional',
    description: 'A senior AI PR consultant who runs your media strategy directly and gets the technical story right.',
    url: `${SITE_URL}/pages/ai-pr-consultant`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI PR Consultant 2026 | Senior, Specialist, Fractional',
    description: 'A senior AI PR consultant who runs your media strategy directly and gets the technical story right.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ai-pr-consultant-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ai-pr-consultant-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-ai-pr-consultant-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
