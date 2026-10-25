import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'LinkedIn Strategy for Web3 and AI Founders in 2026',
  description: 'LinkedIn\'s 2026 algorithm rewards substance and consistency. The posting system that builds authority without turning into a motivational account.',
  alternates: { canonical: `${SITE_URL}/playbook/linkedin-strategy-founders-2026` },
  openGraph: {
    title: 'LinkedIn Strategy for Web3 and AI Founders in 2026',
    description: 'LinkedIn\'s 2026 algorithm rewards substance and consistency. The posting system that builds authority without turning into a motivational account.',
    url: `${SITE_URL}/playbook/linkedin-strategy-founders-2026`,
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
    title: 'LinkedIn Strategy for Web3 and AI Founders in 2026',
    description: 'LinkedIn\'s 2026 algorithm rewards substance and consistency. The posting system that builds authority without turning into a motivational account.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/founder.jpg`,
        alt: 'Founder profiling: op-eds, podcasts, category voice. Photo: Shilika Jain smiling at the Marina Bay railing against the Singapore skyline.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-73-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-73-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-73-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-73.js" strategy="afterInteractive" />
    </>
  );
}
