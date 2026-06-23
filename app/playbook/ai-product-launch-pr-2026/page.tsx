import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'PR Strategy for an AI Product Launch in 2026',
  description: 'AI launches drown in their own category noise. How to earn coverage by leading with a concrete use case, not \'AI-native autonomous agents\'.',
  alternates: { canonical: `${SITE_URL}/playbook/ai-product-launch-pr-2026` },
  openGraph: {
    title: 'PR Strategy for an AI Product Launch in 2026',
    description: 'AI launches drown in their own category noise. How to earn coverage by leading with a concrete use case, not \'AI-native autonomous agents\'.',
    url: `${SITE_URL}/playbook/ai-product-launch-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PR Strategy for an AI Product Launch in 2026',
    description: 'AI launches drown in their own category noise. How to earn coverage by leading with a concrete use case, not \'AI-native autonomous agents\'.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-55-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-55-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-55-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-55.js" strategy="afterInteractive" />
    </>
  );
}
