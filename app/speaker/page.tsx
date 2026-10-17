import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Speaker: Shilika Jain, Web3, AI & Cybersecurity PR Keynotes',
  description: 'Book Shilika Jain for keynotes, panels and podcasts on Web3 PR, AI startup comms, cybersecurity AEO and APAC press windows. Six topics. Slots inside 7 days.',
  alternates: { canonical: 'https://www.shilikajain.com/speaker' },
  openGraph: {
    title: 'Speaker: Shilika Jain, Web3, AI & Cybersecurity PR Keynotes',
    description: 'Fractional PR manager for Web3, AI and cybersecurity founders. Six speaker topics. APAC operator. 50+ protocols. Forbes, CoinDesk, Cointelegraph, Decrypt, Blockworks, AI Magazine placements.',
    url: 'https://www.shilikajain.com/speaker',
    type: 'profile',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/speaker.jpg',
        width: 1200,
        height: 630,
        alt: 'Keynotes on Web3, AI & cybersecurity PR. Binary Summit Bangkok, India Blockchain Week 2024, Web3 Conf Goa. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speaker: Shilika Jain, Web3, AI & Cybersecurity PR Keynotes',
    description: 'Book Shilika Jain for keynotes, panels, fireside chats, workshops and podcasts on Web3 PR, AI startup comms and APAC press windows.',
    images: [
      {
        url: 'https://www.shilikajain.com/assets/media/og/speaker.jpg',
        alt: 'Keynotes on Web3, AI & cybersecurity PR. Binary Summit Bangkok, India Blockchain Week 2024, Web3 Conf Goa. Photo: Shilika Jain speaking on stage with a microphone in front of a presentation screen.',
      },
    ],
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
