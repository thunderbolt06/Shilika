import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'AI PR Agency Pricing and Packages in 2026',
  description: 'What AI PR actually costs across agency, fractional and project models, what each tier buys, and the line items founders miss.',
  alternates: { canonical: `${SITE_URL}/playbook/ai-pr-agency-pricing-packages-2026` },
  openGraph: {
    title: 'AI PR Agency Pricing and Packages in 2026',
    description: 'What AI PR actually costs across agency, fractional and project models, what each tier buys, and the line items founders miss.',
    url: `${SITE_URL}/playbook/ai-pr-agency-pricing-packages-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI PR Agency Pricing and Packages in 2026',
    description: 'What AI PR actually costs across agency, fractional and project models, what each tier buys, and the line items founders miss.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-63-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-63-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-63-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-63.js" strategy="afterInteractive" />
    </>
  );
}
