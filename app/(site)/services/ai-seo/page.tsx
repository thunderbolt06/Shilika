import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const PAGE_URL = `${SITE_URL}/services/ai-seo`;
const TITLE = 'AI SEO Services 2026: Get Cited by ChatGPT & Google AI';
const OG_DESCRIPTION =
  'AI SEO (GEO and AEO) that gets your brand cited in ChatGPT, Perplexity, Gemini and Google AI Overviews. PR-led mentions plus engineered answer pages. Plans from $1,000.';

export const metadata: Metadata = {
  title: TITLE,
  description:
    'AI SEO (GEO and AEO) from Shilika Jain and AI engineer Rahil Jain. 100 AI-feed pages, technical SEO, branded placements and a citation panel. From $1,000.',
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
      <Script id="services-ai-seo-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: loadPartial('services__ai-seo-jsonld.json') }} />
      <div dangerouslySetInnerHTML={{ __html: loadPartial('services__ai-seo-body.html') }} />
    </>
  );
}
