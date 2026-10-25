import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { languageAlternates } from '@/lib/i18n/config';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Services: Web3 & AI PR, Founder Profiling, KOL Marketing',
  description:
    'From zero press to flagship coverage, without the agency markup. Fractional Web3 & AI PR: campaigns, founder profiling, KOLs, token launch, cyber PR and APAC.',
  alternates: { canonical: `${SITE_URL}/services`, languages: languageAlternates('/services') },
  openGraph: {
    title: 'Services: Web3 & AI PR, Founder Profiling, KOL Marketing',
    description:
      'From zero press to flagship coverage - without the agency markup. Fractional Web3 & AI PR services from a senior operator.',
    url: `${SITE_URL}/services`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/services.jpg`,
        width: 1200,
        height: 630,
        alt: 'Web3 & AI PR, founder profiling, KOL marketing. Fractional PR from a senior operator. Photo: Shilika Jain in a floral dress on a Marina Bay footbridge with the Singapore skyline behind her.',
      },
    ],
  },
};

// Snippet ported from the homepage #services section. Chrome (nav, cursor,
// footer, scripts) is provided by app/services/layout.tsx.
function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/services-body.html'), 'utf8');
}

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: loadBody() }} />;
}
