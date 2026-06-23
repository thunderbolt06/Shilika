import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Get Into a Forbes Council in 2026 (and Whether You Should)',
  description: 'Forbes Councils are pay-to-publish, and that changes what they are worth. The honest cost-benefit, the credibility trap, and the alternatives.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-get-into-forbes-councils-2026` },
  openGraph: {
    title: 'How to Get Into a Forbes Council in 2026 (and Whether You Should)',
    description: 'Forbes Councils are pay-to-publish, and that changes what they are worth. The honest cost-benefit, the credibility trap, and the alternatives.',
    url: `${SITE_URL}/playbook/how-to-get-into-forbes-councils-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Get Into a Forbes Council in 2026 (and Whether You Should)',
    description: 'Forbes Councils are pay-to-publish, and that changes what they are worth. The honest cost-benefit, the credibility trap, and the alternatives.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-74-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-74-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-74-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-74.js" strategy="afterInteractive" />
    </>
  );
}
