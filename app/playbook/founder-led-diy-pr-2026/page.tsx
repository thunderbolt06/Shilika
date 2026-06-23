import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'DIY PR in 2026: How Founders Can Run Their Own Comms',
  description: 'Before you can afford help, you can still earn coverage. The founder-run PR system: news hooks, a media list, pitching and a posting cadence.',
  alternates: { canonical: `${SITE_URL}/playbook/founder-led-diy-pr-2026` },
  openGraph: {
    title: 'DIY PR in 2026: How Founders Can Run Their Own Comms',
    description: 'Before you can afford help, you can still earn coverage. The founder-run PR system: news hooks, a media list, pitching and a posting cadence.',
    url: `${SITE_URL}/playbook/founder-led-diy-pr-2026`,
    type: 'article',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIY PR in 2026: How Founders Can Run Their Own Comms',
    description: 'Before you can afford help, you can still earn coverage. The founder-run PR system: news hooks, a media list, pitching and a posting cadence.',
    images: [`${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-112-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-112-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-112-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-112.js" strategy="afterInteractive" />
    </>
  );
}
