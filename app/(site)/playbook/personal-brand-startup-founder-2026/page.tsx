import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Startup Founder Personal Brand Guide (2026)',
  description: 'For AI and tech founders. The content cadence, the platform choices, and the line between useful authority and LinkedIn cringe.',
  alternates: { canonical: `${SITE_URL}/playbook/personal-brand-startup-founder-2026` },
  openGraph: {
    title: 'Startup Founder Personal Brand Guide (2026)',
    description: 'For AI and tech founders. The content cadence, the platform choices, and the line between useful authority and LinkedIn cringe.',
    url: `${SITE_URL}/playbook/personal-brand-startup-founder-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/founder.jpg`,
        width: 1200,
        height: 630,
        alt: 'Founder profiling: op-eds, podcasts, category voice. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Startup Founder Personal Brand Guide (2026)',
    description: 'For AI and tech founders. The content cadence, the platform choices, and the line between useful authority and LinkedIn cringe.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/founder.jpg`,
        alt: 'Founder profiling: op-eds, podcasts, category voice. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-67-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-67-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-67-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-67.js" strategy="afterInteractive" />
    </>
  );
}
