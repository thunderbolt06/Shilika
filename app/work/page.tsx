import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { EditorialScripts } from '@/components/site/EditorialScripts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Selected Work: Tier-1 Web3 & AI PR Case Studies',
  description:
    "Stories I've put on the front page - RARI Chain, MANTRA, Gaia AI, Web3Auth, Fluence and Bullieverse. Tier-1 placements in Forbes, CoinDesk, Cointelegraph, Decrypt and The Block.",
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: 'Selected Work: Tier-1 Web3 & AI PR Case Studies',
    description:
      "Stories I've put on the front page. RARI Chain, MANTRA, Gaia AI, Web3Auth, Fluence, Bullieverse - tier-1 Web3 & AI PR case studies.",
    url: `${SITE_URL}/work`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
};

// Snippet ported from the homepage #work section.
function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/work-body.html'), 'utf8');
}

export default function Page() {
  return (
    <>
      <EditorialShell>
        <div dangerouslySetInnerHTML={{ __html: loadBody() }} />
      </EditorialShell>
      <EditorialScripts />
    </>
  );
}
