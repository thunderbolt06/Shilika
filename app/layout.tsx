import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shilikajain.com';
const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID;

export const viewport: Viewport = {
  themeColor: '#16140f',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shilika Jain - Fractional PR for Web3 & AI Founders',
    template: '%s | Shilika Jain',
  },
  description:
    'Fractional PR for Web3 and AI founders. 50+ protocols placed in Forbes, CoinDesk, Cointelegraph, Decrypt and The Block across APAC. Book a 30-min teardown.',
  keywords: [
    'Web3 PR',
    'AI PR',
    'fractional PR',
    'crypto PR',
    'Web3 communications',
    'Shilika Jain',
    'CoinDesk PR',
    'Cointelegraph PR',
    'APAC crypto PR',
  ],
  authors: [{ name: 'Shilika Jain' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23282520'/%3E%3Ctext x='50%25' y='52%25' font-family='Georgia,serif' font-size='38' font-style='italic' fill='%23d4ff32' text-anchor='middle' dominant-baseline='middle'%3ESJ%3C/text%3E%3Ccircle cx='50' cy='14' r='3' fill='%23d4ff32'/%3E%3C/svg%3E",
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://eu.i.posthog.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=Geist+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning — PostHog (analytics.js) injects script tags
          into <body> before React hydrates, which trips React's reconciler.
          We suppress the warning at the body root rather than letting React
          discard and re-render the entire tree on mount. */}
      <body suppressHydrationWarning>
        <Script src="/assets/analytics.js" strategy="lazyOnload" />
        {GTAG_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
              strategy="lazyOnload"
            />
            <Script id="gtag-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GTAG_ID}',{allow_enhanced_conversions:true});`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
