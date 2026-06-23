import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Run a KOL Campaign for a Token Launch in 2026',
  description: 'The three-wave KOL sequence that actually moves a launch: credibility anchors, broad activation, sustained deep-dives, with timing and briefs.',
  alternates: { canonical: `${SITE_URL}/playbook/kol-campaign-token-launch-2026` },
  openGraph: {
    title: 'How to Run a KOL Campaign for a Token Launch in 2026',
    description: 'The three-wave KOL sequence that actually moves a launch: credibility anchors, broad activation, sustained deep-dives, with timing and briefs.',
    url: `${SITE_URL}/playbook/kol-campaign-token-launch-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Run a KOL Campaign for a Token Launch in 2026',
    description: 'The three-wave KOL sequence that actually moves a launch: credibility anchors, broad activation, sustained deep-dives, with timing and briefs.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-82-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-82-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-82-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-82.js" strategy="afterInteractive" />
    </>
  );
}
