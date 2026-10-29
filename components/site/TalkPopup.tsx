'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { splitLocalePath } from '@/lib/i18n/config';
import { withEm } from '@/lib/i18n/rich';
import { hashPick, regionOf } from './media-region';
import EN from '@/lib/i18n/ui.en.json';

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

/**
 * Round portrait at the top of the card: the square crop of a smiling photo from the media
 * library (public/assets/media/photos). The popup can open on any page, so the photo follows the
 * page (docs/media-system.md, rule 4): Singapore and Hong Kong pages get a photo from there, a page
 * about any other place (or several) an event or neutral one, and a global page any of them.
 * Plain strings instead of lib/media/manifest.json keep the whole manifest out of the client
 * bundle. Decorative: the title and buttons carry the meaning.
 */
const avatar = (id: string) => ({
  src: `/assets/media/photos/${id}-sq-320.webp`,
  srcSet: `/assets/media/photos/${id}-sq-320.webp 320w, /assets/media/photos/${id}-sq-640.webp 640w`,
});
const NEUTRAL = ['lounge', 'stage-b', 'stablecoin-summit'].map(avatar); // place: neutral or event
const SINGAPORE = ['sg-bridge-a', 'sg-marina-b', 'sg-marina-c'].map(avatar);
const HONG_KONG = ['depin-day-hk'].map(avatar);

function avatarFor(pathname: string) {
  const path = splitLocalePath(pathname).path;
  const region = regionOf(path);
  const pool =
    region === 'singapore' ? SINGAPORE : region === 'hong-kong' ? HONG_KONG : region === 'other' ? NEUTRAL : [...NEUTRAL, ...SINGAPORE, ...HONG_KONG];
  return pool[hashPick(path, pool.length)];
}

function excluded(path: string) {
  return path.startsWith('/admin') || path.startsWith('/thank-you');
}

function alreadySeen() {
  try { return sessionStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
}

function markSeen() {
  try { sessionStorage.setItem(SEEN_KEY, '1'); } catch {}
}

/**
 * app/(site)/layout.tsx mounts the English popup and app/[locale]/layout.tsx a
 * translated one (with `strings`); each is its own root layout, so only one is ever mounted.
 */
export default function TalkPopup({ strings }: { strings?: Record<string, string> }) {
  const pathname = usePathname() ?? '/';
  const t = (key: keyof typeof EN) => strings?.[key] ?? EN[key];
  const otherInstance = !strings && splitLocalePath(pathname).lang !== 'en';
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open || otherInstance || excluded(pathname) || alreadySeen()) return;

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
  }, [pathname, open, otherInstance]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  const portrait = avatarFor(pathname);

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
          aria-label={t('talk.close')}
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <img
          className="talk-pop__photo"
          src={portrait.src}
          srcSet={portrait.srcSet}
          sizes="72px"
          alt=""
          width={72}
          height={72}
          decoding="async"
          style={{ background: 'var(--paper-2)' }}
        />
        <p className="talk-pop__eyebrow">{t('talk.eyebrow')}</p>
        <h2 id="talk-pop-title" className="talk-pop__title">
          {withEm(t('talk.title'))}
        </h2>
        <div className="talk-pop__ctas">
          <a className="talk-pop__btn talk-pop__btn--primary" href={TELEGRAM_URL} target="_blank" rel="noopener">
            {t('talk.telegram')}
          </a>
          <a className="talk-pop__btn" href={CALENDLY_URL} target="_blank" rel="noopener">
            {t('talk.call')}
          </a>
        </div>
      </div>
    </div>
  );
}
