import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How Gaia AI Got Into Forbes: A Teardown (2026)',
  description:
    'A first-hand teardown of the campaign that put Gaia AI in Forbes: the Stripe-for-AI-agents frame, the reporter-beat match, the timeline, how the pitch was built, embargo etiquette, and what the placement produced.',
  alternates: { canonical: `${SITE_URL}/playbook/how-gaia-ai-got-into-forbes` },
  openGraph: {
    title: 'How Gaia AI Got Into Forbes: A Teardown',
    description:
      'The frame, the timeline, the pitch structure and embargo etiquette behind an earned Forbes feature for a decentralized-AI protocol.',
    url: `${SITE_URL}/playbook/how-gaia-ai-got-into-forbes`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Gaia AI Got Into Forbes: A Teardown',
    description:
      'The frame, the timeline, the pitch structure and embargo etiquette behind an earned Forbes feature for a decentralized-AI protocol.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-116-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-116-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-116-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-116.js" strategy="afterInteractive" />
    </>
  );
}
