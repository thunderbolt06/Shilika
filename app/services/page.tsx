import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Services: Web3 & AI PR, Founder Profiling, KOL Marketing',
  description:
    'From zero press to flagship coverage - without the agency markup. Fractional Web3 & AI PR: campaigns, founder profiling, KOL marketing, token launch, cybersecurity PR, content and APAC.',
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: 'Services: Web3 & AI PR, Founder Profiling, KOL Marketing',
    description:
      'From zero press to flagship coverage - without the agency markup. Fractional Web3 & AI PR services from a senior operator.',
    url: `${SITE_URL}/services`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
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
