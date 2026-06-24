import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'DePIN PR Agency 2026 | Decentralized Infrastructure Comms',
  description: 'Turn decentralized-infrastructure into a publishable category, with the Fluence playbook that anchored DePIN as a tier-1 beat.',
  alternates: { canonical: `${SITE_URL}/pages/depin-pr-agency` },
  openGraph: {
    title: 'DePIN PR Agency 2026 | Decentralized Infrastructure Comms',
    description: 'Turn decentralized-infrastructure into a publishable category, with the Fluence playbook that anchored DePIN as a tier-1 beat.',
    url: `${SITE_URL}/pages/depin-pr-agency`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DePIN PR Agency 2026 | Decentralized Infrastructure Comms',
    description: 'Turn decentralized-infrastructure into a publishable category, with the Fluence playbook that anchored DePIN as a tier-1 beat.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__depin-pr-agency-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__depin-pr-agency-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="lp-depin-pr-agency-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
