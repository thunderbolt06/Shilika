'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * "Talk to Shilika" nudge. Opens after 30s of active time on a page (the
 * clock pauses while the tab is hidden and restarts on route change). Shown
 * at most once per browser session. Clicks on both CTAs are picked up by
 * /assets/conversions.js like any other Calendly / Telegram link.
 */

const ACTIVE_MS = 30_000;
const SEEN_KEY = 'sj_talk_popup_seen';
const TELEGRAM_URL = 'https://t.me/shilika3';
const CALENDLY_URL = 'https://calendly.com/shilikajain/30min/';

function excluded(path: string) {
  return path.startsWith('/admin') || path.startsWith('/thank-you');
}

function alreadySeen() {
  try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
}

function markSeen() {
  try { sessionStorage.setItem(SEEN_KEY, '1'); } catch {}
}

export default function TalkPopup() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open || excluded(pathname) || alreadySeen()) return;

    let elapsed = 0;
    let startedAt = 0;
    let timer = 0;

    const fire = () => {
      if (alreadySeen()) return;
      markSeen();
      setOpen(true);
      try { (window as any).posthog?.capture('talk_popup_shown', { path: pathname }); } catch {}
    };
    const start = () => {
      if (timer) return;
      startedAt = Date.now();
      timer = window.setTimeout(fire, ACTIVE_MS - elapsed);
    };
    const pause = () => {
      if (!timer) return;
      clearTimeout(timer);
      timer = 0;
      elapsed += Date.now() - startedAt;
    };
    const onVisibility = () => (document.hidden ? pause() : start());

    if (!document.hidden) start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [pathname, open]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="talk-pop" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="talk-pop__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="talk-pop-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="talk-pop__close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <img
          className="talk-pop__photo"
          src="/assets/shilika-portrait-1080.jpg"
          alt="Shilika Jain"
          width={72}
          height={72}
        />
        <p className="talk-pop__eyebrow">Got questions?</p>
        <h2 id="talk-pop-title" className="talk-pop__title">
          Talk directly to <em>Shilika Jain</em> for details
        </h2>
        <div className="talk-pop__ctas">
          <a className="talk-pop__btn talk-pop__btn--primary" href={TELEGRAM_URL} target="_blank" rel="noopener">
            Chat on Telegram
          </a>
          <a className="talk-pop__btn" href={CALENDLY_URL} target="_blank" rel="noopener">
            Book a call
          </a>
        </div>
      </div>
    </div>
  );
}
