import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';

export const metadata: Metadata = {
  title: 'Crypto Telegram Marketing Agency 2026',
  description: 'Community seeding, AMA scheduling and moderation that turns a channel into a real audience, using Telegram-native tactics rather than inflated counts.',
  alternates: { canonical: `${SITE_URL}/pages/telegram-marketing-agency-crypto` },
  openGraph: {
    title: 'Crypto Telegram Marketing Agency 2026',
    description: 'Community seeding, AMA scheduling and moderation that turns a channel into a real audience, using Telegram-native tactics rather than inflated counts.',
    url: `${SITE_URL}/pages/telegram-marketing-agency-crypto`,
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/kol.jpg`,
        width: 1200,
        height: 630,
        alt: 'Web3 KOL marketing with 200+ vetted creators. FTC-safe campaigns. Photo: Shilika Jain in a pink dress and sunglasses on the Singapore River at dusk.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Telegram Marketing Agency 2026',
    description: 'Community seeding, AMA scheduling and moderation that turns a channel into a real audience, using Telegram-native tactics rather than inflated counts.',
    images: [
      {
        url: `${SITE_URL}/assets/media/og/kol.jpg`,
        alt: 'Web3 KOL marketing with 200+ vetted creators. FTC-safe campaigns. Photo: Shilika Jain in a pink dress and sunglasses on the Singapore River at dusk.',
      },
    ],
  },
};

function loadBody(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__telegram-marketing-agency-crypto-body.html'), 'utf8');
}

function loadJsonLd(): string {
  return fs.readFileSync(path.join(process.cwd(), 'app/_partials/pages__telegram-marketing-agency-crypto-jsonld.json'), 'utf8');
}

export default function Page() {
  const body = loadBody();
  const jsonLd = loadJsonLd();
  return (
    <>
      <script id="lp-telegram-marketing-agency-crypto-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <div dangerouslySetInnerHTML={{ __html: body }} />
      <Script src="/assets/pages.js" strategy="afterInteractive" />
    </>
  );
}
