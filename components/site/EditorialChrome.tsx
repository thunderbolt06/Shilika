'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { findI18nPage, localizePath, splitLocalePath, type Lang } from '@/lib/i18n/config';
import { languageToggleHtml } from '@/lib/i18n/toggle';
import EN from '@/lib/i18n/ui.en.json';

export type UiStrings = Record<string, string>;

/** Internal link in the visitor's language when that page is translated, else English. */
function hrefFor(lang: Lang, path: string): string {
  return findI18nPage(path) ? localizePath(lang, path) : path;
}

/**
 * Editorial site chrome. Renders the same cursor, grain overlay,
 * nav, and footer the homepage uses. Drop this around any non-homepage
 * route to keep visual consistency.
 *
 * The homepage's _partials/homepage-body.html still inlines its own copies
 * of these elements (because that body is rendered via
 * dangerouslySetInnerHTML). This component is the JSX equivalent for the
 * blog and playbook routes.
 */

const HOVER_SELECTOR = 'a, button, .service, .case, .press-item, input, textarea, select, [data-magnet]';

export function EditorialCursor() {
  useEffect(() => {
    if (!window.matchMedia('(min-width: 901px)').matches) return;
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    if (!cursor) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      if (dot) dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
    };
    document.addEventListener('mousemove', onMove);

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onEnter = () => cursor.classList.add('is-hover');
    const onLeave = () => cursor.classList.remove('is-hover');
    const tracked = new WeakSet<Element>();
    const bind = (el: Element) => {
      if (tracked.has(el)) return;
      tracked.add(el);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    };
    const scan = (root: ParentNode) => root.querySelectorAll(HOVER_SELECTOR).forEach(bind);
    scan(document);

    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches?.(HOVER_SELECTOR)) bind(el);
          scan(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-dot" id="cursor-dot" />
    </>
  );
}

export function EditorialGrain() {
  return <div className="grain" />;
}

/**
 * Nav for non-homepage pages. Homepage anchors are rewritten to /#anchor
 * so they jump back to the home and scroll. Internal routes stay as
 * top-level paths.
 */
export function EditorialNav({
  active,
  strings = EN,
}: {
  active?: 'blog' | 'playbook' | 'about' | 'testimonials';
  strings?: UiStrings;
}) {
  const { lang, path } = splitLocalePath(usePathname() ?? '/');
  const t = (key: keyof typeof EN) => strings[key] ?? EN[key];
  return (
    <nav className="nav">
      <a href={hrefFor(lang, '/')} className="nav-logo">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden>
          <circle cx="17" cy="17" r="16" stroke="currentColor" strokeWidth="1" />
          <path d="M11 22 Q17 8 23 22" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="17" cy="17" r="2.4" fill="currentColor" />
        </svg>
        <span className="nav-logo-text">
          SHILIKA<span className="nav-logo-dot">·</span>JAIN
        </span>
      </a>
      <ul className="nav-links">
        <li>
          <a href={hrefFor(lang, '/work')} data-magnet>
            {t('nav.work')}
          </a>
        </li>
        <li>
          <a href={hrefFor(lang, '/services')} data-magnet>
            {t('nav.services')}
          </a>
        </li>
        <li>
          <a
            href="/blog"
            data-magnet
            className={active === 'blog' || active === 'playbook' ? 'is-active' : undefined}
          >
            {t('nav.writing')}
          </a>
        </li>
        <li>
          <a href={hrefFor(lang, '/about')} data-magnet>
            {t('nav.about')}
          </a>
        </li>
        <li>
          <a href="/testimonials" data-magnet className={active === 'testimonials' ? 'is-active' : undefined}>
            {t('nav.testimonials')}
          </a>
        </li>
        <li>
          <a href={hrefFor(lang, '/contact')} data-magnet>
            {t('nav.contact')}
          </a>
        </li>
      </ul>
      <div className="nav-actions">
        <div
          className="lang"
          dangerouslySetInnerHTML={{ __html: languageToggleHtml(lang, path, t('lang.label')) }}
        />
        <a
          href="https://calendly.com/shilikajain/30min/"
          target="_blank"
          rel="noopener"
          className="nav-cta"
          data-magnet
        >
          <span>{t('nav.cta')}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
      </div>
    </nav>
  );
}

export function EditorialFooter({ strings = EN }: { strings?: UiStrings }) {
  const { lang } = splitLocalePath(usePathname() ?? '/');
  const t = (key: keyof typeof EN) => strings[key] ?? EN[key];
  return (
    <footer className="footer">
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-track">
          <span>{t('footer.marquee')}</span>
          <span>·</span>
          <span>{t('footer.marquee')}</span>
          <span>·</span>
          <span>{t('footer.marquee')}</span>
          <span>·</span>
          <span>{t('footer.marquee')}</span>
          <span>·</span>
          <span>{t('footer.marquee')}</span>
          <span>·</span>
        </div>
      </div>

      <nav className="footer-nav" aria-label="Site navigation">
        <div className="footer-nav-col">
          <p className="footer-nav-head">{t('footer.company')}</p>
          <a href={hrefFor(lang, '/')}>{t('footer.home')}</a>
          <a href={hrefFor(lang, '/about')}>{t('footer.about')}</a>
          <a href={hrefFor(lang, '/work')}>{t('footer.work')}</a>
          <a href={hrefFor(lang, '/testimonials')}>{t('footer.testimonials')}</a>
          <a href={hrefFor(lang, '/press')}>{t('footer.press')}</a>
          <a href={hrefFor(lang, '/speaker')}>{t('footer.speaking')}</a>
          <a href={hrefFor(lang, '/faq')}>{t('footer.faq')}</a>
        </div>

        <div className="footer-nav-col">
          <p className="footer-nav-head">{t('footer.services')}</p>
          <a href={hrefFor(lang, '/services')}>{t('footer.allServices')}</a>
          <a href={hrefFor(lang, '/services/web3-pr-campaigns')}>{t('footer.web3Pr')}</a>
          <a href={hrefFor(lang, '/services/token-launch-pr')}>{t('footer.tokenLaunchPr')}</a>
          <a href={hrefFor(lang, '/services/ai-startup-pr')}>{t('footer.aiStartupPr')}</a>
          <a href={hrefFor(lang, '/services/kol-marketing')}>{t('footer.kolMarketing')}</a>
          <a href={hrefFor(lang, '/services/founder-profiling')}>{t('footer.founderProfiling')}</a>
          <a href={hrefFor(lang, '/services/content-writing')}>{t('footer.contentWriting')}</a>
          <a href={hrefFor(lang, '/services/apac-pr')}>{t('footer.apacPr')}</a>
          <a href={hrefFor(lang, '/services/cybersecurity-pr')}>{t('footer.cybersecurityPr')}</a>
          <a href={hrefFor(lang, '/services/ai-seo')}>{t('footer.aiSeo')}</a>
        </div>

        <div className="footer-nav-col">
          <p className="footer-nav-head">{t('footer.writing')}</p>
          <a href={hrefFor(lang, '/blog')}>{t('footer.blog')}</a>
          <a href={hrefFor(lang, '/playbook')}>{t('footer.playbooks')}</a>
          <a href={hrefFor(lang, '/glossary')}>{t('footer.glossary')}</a>
          <a href={hrefFor(lang, '/tools')}>{t('footer.tools')}</a>
          <a href={hrefFor(lang, '/pages')}>{t('footer.pages')}</a>
          <a href="/compare">{t('footer.compare')}</a>
        </div>

        <div className="footer-nav-col">
          <p className="footer-nav-head">{t('footer.regions')}</p>
          <a href={hrefFor(lang, '/apac')}>{t('footer.apac')}</a>
          <a href={hrefFor(lang, '/india')}>{t('footer.india')}</a>
          <a href={hrefFor(lang, '/japan')}>{t('footer.japan')}</a>
          <a href={hrefFor(lang, '/korea')}>{t('footer.korea')}</a>
          <a href={hrefFor(lang, '/singapore')}>{t('footer.singapore')}</a>
          <a href={hrefFor(lang, '/dubai-mena')}>{t('footer.dubaiMena')}</a>
        </div>

        <div className="footer-nav-col">
          <p className="footer-nav-head">{t('footer.contactSources')}</p>
          <a href={hrefFor(lang, '/contact')}>{t('footer.contact')}</a>
          <a href="https://calendly.com/shilikajain/30min/" target="_blank" rel="noopener">{t('footer.bookCall')}</a>
          <a href="mailto:shilika498@gmail.com">shilika498@gmail.com</a>
          <a href="https://www.linkedin.com/in/shilika/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://x.com/Shilika_jain" target="_blank" rel="noopener">Twitter / X</a>
        </div>
      </nav>

      <div className="footer-row">
        <span className="mono">© SHILIKA JAIN - 2019-2026</span>
        <span className="mono">{t('footer.tagline')}</span>
      </div>
    </footer>
  );
}

export function EditorialShell({
  active,
  strings,
  children,
}: {
  active?: 'blog' | 'playbook' | 'about' | 'testimonials';
  /** Translated chrome strings; omit for English. */
  strings?: UiStrings;
  children: React.ReactNode;
}) {
  return (
    <>
      <EditorialCursor />
      <EditorialGrain />
      <EditorialNav active={active} strings={strings} />
      {children}
      <EditorialFooter strings={strings} />
    </>
  );
}
