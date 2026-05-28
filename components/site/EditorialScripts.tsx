import Script from 'next/script';
import { ClientReBoot } from './ClientReBoot';

/**
 * Loads the shared interaction script + Calendly + the SPA re-boot hook.
 * Drop into any layout that uses EditorialShell.
 */
export function EditorialScripts() {
  return (
    <>
      <Script src="/assets/site.js" strategy="afterInteractive" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <ClientReBoot />
    </>
  );
}
