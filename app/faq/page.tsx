import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { EditorialShell } from '@/components/site/EditorialChrome';
import { EditorialScripts } from '@/components/site/EditorialScripts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'FAQ: Fractional Web3 & AI PR - Scope, Cost, Regions',
  description:
    'Short, honest answers on scope, cost, regions, and how fractional PR differs from a Web3 PR agency. Questions founders ask before booking.',
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: 'FAQ: Fractional Web3 & AI PR - Scope, Cost, Regions',
    description:
      'Honest answers on scope, cost, regions, and how fractional PR differs from a Web3 PR agency.',
    url: `${SITE_URL}/faq`,
    type: 'website',
    images: [{ url: `${SITE_URL}/assets/shilika-press-landscape-1200x628.jpg`, width: 1200, height: 628 }],
  },
};

// Snippet ported from the homepage #faq section (carries FAQPage schema markup).
function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/faq-body.html'), 'utf8');
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
