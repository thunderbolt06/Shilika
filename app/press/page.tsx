import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { EditorialScripts } from '@/components/site/EditorialScripts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Press & Coverage: Where the Stories Land',
  description:
    'Selected media placements across Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks, The Block, Benzinga and more - the front-page coverage behind Web3 & AI founders.',
  alternates: { canonical: `${SITE_URL}/press` },
  openGraph: {
    title: 'Press & Coverage: Where the Stories Land',
    description:
      'Selected tier-1 media placements across Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks and The Block.',
    url: `${SITE_URL}/press`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
};

// Snippet ported from the homepage #press section.
function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/press-body.html'), 'utf8');
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
