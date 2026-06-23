import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Fractional CMO for a Web3 Startup in 2026: When It Makes Sense',
  description: 'A fractional CMO owns the whole growth function, not just PR. When a Web3 startup needs one, when it needs fractional PR instead, and the overlap.',
  alternates: { canonical: `${SITE_URL}/playbook/fractional-cmo-web3-2026` },
  openGraph: {
    title: 'Fractional CMO for a Web3 Startup in 2026: When It Makes Sense',
    description: 'A fractional CMO owns the whole growth function, not just PR. When a Web3 startup needs one, when it needs fractional PR instead, and the overlap.',
    url: `${SITE_URL}/playbook/fractional-cmo-web3-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractional CMO for a Web3 Startup in 2026: When It Makes Sense',
    description: 'A fractional CMO owns the whole growth function, not just PR. When a Web3 startup needs one, when it needs fractional PR instead, and the overlap.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-78-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-78-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-78-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-78.js" strategy="afterInteractive" />
    </>
  );
}
