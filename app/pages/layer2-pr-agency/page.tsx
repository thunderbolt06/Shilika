import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Layer-2 PR Agency 2026 | Rollups, Appchains, Scaling',
  description: 'Position an L2, rollup or appchain around a category it can own, with the RARI Chain framing lesson.',
  alternates: { canonical: `${SITE_URL}/pages/layer2-pr-agency` },
  openGraph: {
    title: 'Layer-2 PR Agency 2026 | Rollups, Appchains, Scaling',
    description: 'Position an L2, rollup or appchain around a category it can own, with the RARI Chain framing lesson.',
    url: `${SITE_URL}/pages/layer2-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layer-2 PR Agency 2026 | Rollups, Appchains, Scaling',
    description: 'Position an L2, rollup or appchain around a category it can own, with the RARI Chain framing lesson.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__layer2-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__layer2-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-layer2-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
