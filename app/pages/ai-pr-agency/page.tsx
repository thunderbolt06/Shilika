import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AI PR Agency 2026 | Forbes, TechCrunch, The Information',
  description: 'Tier-1 AI coverage and analyst-grade credibility from a senior operator, plus the AI-search work that gets you cited.',
  alternates: { canonical: `${SITE_URL}/pages/ai-pr-agency` },
  openGraph: {
    title: 'AI PR Agency 2026 | Forbes, TechCrunch, The Information',
    description: 'Tier-1 AI coverage and analyst-grade credibility from a senior operator, plus the AI-search work that gets you cited.',
    url: `${SITE_URL}/pages/ai-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI PR Agency 2026 | Forbes, TechCrunch, The Information',
    description: 'Tier-1 AI coverage and analyst-grade credibility from a senior operator, plus the AI-search work that gets you cited.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ai-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__ai-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-ai-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
