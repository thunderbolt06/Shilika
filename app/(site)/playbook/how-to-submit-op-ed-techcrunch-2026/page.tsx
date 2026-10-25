import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';
import { stripLegacyChrome } from '@/lib/legacy-chrome';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How to Submit an Op-Ed to TechCrunch (2026)',
  description: 'TechCrunch rarely runs outside op-eds, so where do founder essays actually land? The real opinion-desk map and a submission that works.',
  alternates: { canonical: `${SITE_URL}/playbook/how-to-submit-op-ed-techcrunch-2026`, languages: languageAlternates('/playbook/how-to-submit-op-ed-techcrunch-2026') },
  openGraph: {
    title: 'How to Submit an Op-Ed to TechCrunch (2026)',
    description: 'TechCrunch rarely runs outside op-eds, so where do founder essays actually land? The real opinion-desk map and a submission that works.',
    url: `${SITE_URL}/playbook/how-to-submit-op-ed-techcrunch-2026`,
    type: 'article',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        width: 1200,
        height: 630,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Submit an Op-Ed to TechCrunch (2026)',
    description: 'TechCrunch rarely runs outside op-eds, so where do founder essays actually land? The real opinion-desk map and a submission that works.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/content.jpg`,
        alt: 'Content writing for founders: op-eds, whitepapers. For Web3 and AI teams. Photo: Shilika Jain in a pink dress by the Singapore River with the old bridge behind her.',
      },
    ],
  },
};

function loadBody(): string {
  return stripLegacyChrome(fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-69-body.html'), 'utf8'));
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-69-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-69-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-69.js" strategy="afterInteractive" />
    </>
  );
}
