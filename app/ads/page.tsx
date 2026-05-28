import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: 'Shilika Jain - Fractional PR for Web3 & AI Founders',
  description: 'Embedded fractional PR for newly-funded Web3 and AI founders. Forbes, CoinDesk, Cointelegraph, Decrypt placements. 50+ protocols shaped. Book a 30-min teardown call.',
  
  alternates: { canonical: `${SITE_URL}/ads` },
  
  
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/ads-body.html'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  
  return (
    <>
      
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      <Script src="/assets/ads.js" strategy="afterInteractive" />
    </>
  );
}
