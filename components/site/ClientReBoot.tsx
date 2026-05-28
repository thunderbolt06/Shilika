'use client';
import { useEffect } from 'react';

/**
 * Calls window.__shilikaBoot() on every mount.
 *
 * The legacy site.js attached event listeners + started rAF loops at
 * script load time. With Next.js client-side navigation, the script
 * loads once but the DOM elements (cursor, nav, scroll-reveal targets,
 * Calendly links, LinkedIn modal) re-render. This component re-fires
 * the boot function so handlers re-attach to the new elements.
 *
 * The boot function itself is responsible for idempotency — it uses
 * data attributes to skip re-binding to elements it has already
 * touched.
 */
export function ClientReBoot() {
  useEffect(() => {
    const w = window as unknown as { __shilikaBoot?: () => void };
    if (typeof w.__shilikaBoot === 'function') {
      w.__shilikaBoot();
    }
  });
  return null;
}
