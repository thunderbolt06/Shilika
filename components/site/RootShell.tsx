import Script from 'next/script';

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID ?? 'AW-18324652879';

/**
 * The <html>/<head>/<body> document shell shared by both root layouts:
 * app/(site)/layout.tsx (English, lang="en") and app/[locale]/layout.tsx
 * (translated pages, lang = that locale's hreflang). They are separate root
 * layouts so `lang` is rendered into the static HTML instead of patched in by
 * a script, which crawlers and no-JS clients never run.
 */
export default function RootShell({ lang, children }: { lang: string; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        {/* OpenAI Pixel: one setup script per page, near the top of <head>. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"AAo66s2GKSrGUa2ZWkwBkT",debug:true});oaiq("measure","page_viewed",{type:"contents"});`,
          }}
        />
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
      {/* suppressHydrationWarning - PostHog (analytics.js) injects script tags
          into <body> before React hydrates, which trips React's reconciler.
          We suppress the warning at the body root rather than letting React
          discard and re-render the entire tree on mount. */}
      <body suppressHydrationWarning>
        <Script src="/assets/analytics.js" strategy="lazyOnload" />
        {GTAG_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GTAG_ID}',{allow_enhanced_conversions:true});`}
            </Script>
          </>
        )}
        <Script src="/assets/conversions.js" strategy="afterInteractive" />
        <Script id="apollo-tracker" strategy="lazyOnload">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,o.onload=function(){window.trackingFunctions.onLoad({appId:"6a44e09cf8f4f40020d77ca0"})},document.head.appendChild(o)}initApollo();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
