import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'APAC PR Playbook 2026: Korea, Japan, Vietnam, India',
  description: 'An 11-minute APAC PR breakdown for Korea, Japan, Vietnam and India: which outlets matter, how to pitch them, and what most agencies get wrong.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/apac-pr-playbook-2026' },
  openGraph: {
    title: 'APAC PR Playbook 2026: Korea, Japan, Vietnam, India',
    description: 'An 11-minute regional APAC PR breakdown for Web3 and AI founders: how it works in Korea, Japan, Vietnam and India.',
    url: 'https://www.shilikajain.com/playbook/apac-pr-playbook-2026',
    type: 'article',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/apac.jpg',
        width: 1200,
        height: 630,
        alt: 'APAC PR that is not a translated press release. Korea, Japan, India, Singapore and MENA. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APAC PR Playbook 2026: Korea, Japan, Vietnam, India',
    description: 'An 11-minute regional APAC PR breakdown for Web3 and AI founders: how it works in Korea, Japan, Vietnam and India.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/apac.jpg',
        alt: 'APAC PR that is not a translated press release. Korea, Japan, India, Singapore and MENA. Photo: Shilika Jain leaning on the Marina Bay railing with the Singapore skyline across the water.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-2-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-2-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-2-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-2.js" strategy="afterInteractive" />
    </>
  );
}
