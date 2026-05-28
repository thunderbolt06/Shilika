import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'How Much Does Crypto PR Cost in 2026? Honest Pricing',
  description: 'What crypto PR actually costs in 2026: agency retainers, fractional models, single-launch sprints, KOL waves and the hidden line items most contracts bury.',
  
  alternates: { canonical: 'https://www.shilikajain.com/playbook/4' },
  openGraph: {
    title: 'How Much Does Crypto PR Cost in 2026? Honest Pricing',
    description: 'Web3 PR pricing in 2026: agency retainers vs fractional, what each dollar gets you, and where the markup hides.',
    url: 'https://www.shilikajain.com/playbook/4',
    type: 'article',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Does Crypto PR Cost in 2026? Honest Pricing',
    description: 'Web3 PR pricing in 2026: agency retainers vs fractional, what each dollar gets you, and where the markup hides.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-4-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/article-4-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="playbook-4-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />

      <Script src="/assets/article-4.js" strategy="afterInteractive" />
    </>
  );
}
