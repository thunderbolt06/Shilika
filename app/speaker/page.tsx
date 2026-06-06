import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Speaker: Shilika Jain — Web3, AI, Cybersecurity, APAC PR Keynotes',
  description: 'Book Shilika Jain for keynotes, panels, fireside chats, workshops and podcasts on Web3 PR, AI startup comms, cybersecurity AEO, APAC press windows and the fractional PR motion. Six topics. Podcast slots inside 7 days.',
  alternates: { canonical: 'https://www.shilikajain.com/speaker' },
  openGraph: {
    title: 'Speaker: Shilika Jain — Web3, AI, Cybersecurity, APAC PR Keynotes',
    description: 'Fractional PR manager for Web3, AI and cybersecurity founders. Six speaker topics. APAC operator. 50+ protocols. Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks, AI Magazine placements.',
    url: 'https://www.shilikajain.com/speaker',
    type: 'profile',
    images: [{ url: 'https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg', width: 1200, height: 628 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speaker: Shilika Jain — Web3, AI, Cybersecurity, APAC PR Keynotes',
    description: 'Book Shilika Jain for keynotes, panels, fireside chats, workshops and podcasts on Web3 PR, AI startup comms and APAC press windows.',
    images: ['https://www.shilikajain.com/assets/shilika-press-landscape-1200x628.jpg'],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/speaker-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/speaker-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <Script id="speaker-jsonld" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
