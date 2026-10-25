import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Best AI Startup PR Agencies in India in 2026',
  description: 'India\'s AI startup scene is global-facing from day one. How to run PR that earns both Indian and international tech coverage.',
  alternates: { canonical: `${SITE_URL}/playbook/ai-startup-pr-agency-india-2026`, languages: languageAlternates('/playbook/ai-startup-pr-agency-india-2026') },
  openGraph: {
    title: 'Best AI Startup PR Agencies in India in 2026',
    description: 'India\'s AI startup scene is global-facing from day one. How to run PR that earns both Indian and international tech coverage.',
    url: `${SITE_URL}/playbook/ai-startup-pr-agency-india-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/india.jpg`,
        width: 1200,
        height: 630,
        alt: 'India PR: own the home market first. Inc42, Economic Times and Forbes India. Photo: Shilika Jain at the Stablecoin Summit 2023 photo wall.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Startup PR Agencies in India in 2026',
    description: 'India\'s AI startup scene is global-facing from day one. How to run PR that earns both Indian and international tech coverage.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/india.jpg`,
        alt: 'India PR: own the home market first. Inc42, Economic Times and Forbes India. Photo: Shilika Jain at the Stablecoin Summit 2023 photo wall.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-53-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-53-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-53-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-53.js" strategy="afterInteractive" />
    </>
  );
}
