'use client';

import { useEffect } from 'react';

/**
 * Editorial site chrome. Renders the same loader, cursor, grain overlay,
 * nav, and footer the homepage uses. Drop this around any non-homepage
 * route to keep visual consistency.
 *
 * The homepage's _partials/homepage-body.html still inlines its own copies
 * of these elements (because that body is rendered via
 * dangerouslySetInnerHTML). This component is the JSX equivalent for the
 * blog and playbook routes.
 */
export function EditorialLoader() {
  return (
    <div id="loader" className="loader">
      <div className="loader-inner">
        <div className="loader-name">
          <span>S</span>
          <span>H</span>
          <span>I</span>
          <span>L</span>
          <span>I</span>
          <span>K</span>
          <span>A</span>
        </div>
        <div className="loader-bar">
          <div className="loader-fill" />
        </div>
        <div className="loader-meta">
          <span>EST. 2019</span>
          <span className="loader-pct">000</span>
        </div>
      </div>
    </div>
  );
}

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
export function EditorialNav({ active }: { active?: 'blog' | 'playbook' | 'about' | 'testimonials' }) {
  return (
    <nav className="nav">
      <a href="/" className="nav-logo">
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
          <a href="/work" data-magnet>
            Work
          </a>
        </li>
        <li>
          <a href="/services" data-magnet>
            Services
          </a>
        </li>
        <li>
          <a
            href="/blog"
            data-magnet
            className={active === 'blog' || active === 'playbook' ? 'is-active' : undefined}
          >
            Writing
          </a>
        </li>
        <li>
          <a href="/about" data-magnet>
            About
          </a>
        </li>
        <li>
          <a href="/testimonials" data-magnet className={active === 'testimonials' ? 'is-active' : undefined}>
            Testimonials
          </a>
        </li>
        <li>
          <a href="/contact" data-magnet>
            Contact
          </a>
        </li>
      </ul>
      <a
        href="https://calendly.com/shilikajain/30min/"
        target="_blank"
        rel="noopener"
        className="nav-cta"
        data-magnet
      >
        <span>Book a call</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </a>
    </nav>
  );
}

export function EditorialFooter() {
  return (
    <footer className="footer">
      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-marquee-track">
          <span>LET&apos;S MAKE NOISE</span>
          <span>·</span>
          <span>LET&apos;S MAKE NOISE</span>
          <span>·</span>
          <span>LET&apos;S MAKE NOISE</span>
          <span>·</span>
          <span>LET&apos;S MAKE NOISE</span>
          <span>·</span>
          <span>LET&apos;S MAKE NOISE</span>
          <span>·</span>
        </div>
      </div>

      <nav className="footer-nav" aria-label="Site navigation">
        <div className="footer-nav-col">
          <p className="footer-nav-head">Company</p>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/work">Case Studies</a>
          <a href="/testimonials">Testimonials</a>
          <a href="/press">Press</a>
          <a href="/speaker">Speaking</a>
          <a href="/faq">FAQ</a>
        </div>

        <div className="footer-nav-col">
          <p className="footer-nav-head">Services</p>
          <a href="/services">All Services</a>
          <a href="/services/web3-pr-campaigns">Web3 PR</a>
          <a href="/services/token-launch-pr">Token Launch PR</a>
          <a href="/services/ai-startup-pr">AI Startup PR</a>
          <a href="/services/kol-marketing">KOL Marketing</a>
          <a href="/services/founder-profiling">Founder Profiling</a>
          <a href="/services/content-writing">Content Writing</a>
          <a href="/services/apac-pr">APAC PR</a>
          <a href="/services/cybersecurity-pr">Cybersecurity PR</a>
        </div>

        <div className="footer-nav-col">
          <p className="footer-nav-head">Writing</p>
          <a href="/blog">Blog</a>
          <a href="/playbook">Playbooks</a>
          <a href="/glossary">Glossary</a>
        </div>

        <div className="footer-nav-col">
          <p className="footer-nav-head">Regions</p>
          <a href="/apac">APAC</a>
          <a href="/india">India</a>
          <a href="/japan">Japan</a>
          <a href="/korea">Korea</a>
          <a href="/singapore">Singapore</a>
          <a href="/dubai-mena">Dubai &amp; MENA</a>
        </div>

        <div className="footer-nav-col">
          <p className="footer-nav-head">Contact &amp; Sources</p>
          <a href="/contact">Contact</a>
          <a href="https://calendly.com/shilikajain/30min/" target="_blank" rel="noopener">Book a Call</a>
          <a href="mailto:shilika498@gmail.com">shilika498@gmail.com</a>
          <a href="https://in.linkedin.com/in/shilika" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://twitter.com/Shilika_jain" target="_blank" rel="noopener">Twitter / X</a>
        </div>
      </nav>

      <div className="footer-row">
        <span className="mono">© SHILIKA JAIN - 2019-2026</span>
        <span className="mono">Web3 &amp; AI PR · APAC &amp; Global</span>
      </div>
    </footer>
  );
}

export function EditorialShell({
  active,
  children,
}: {
  active?: 'blog' | 'playbook' | 'about' | 'testimonials';
  children: React.ReactNode;
}) {
  return (
    <>
      <EditorialLoader />
      <EditorialCursor />
      <EditorialGrain />
      <EditorialNav active={active} />
      {children}
      <EditorialFooter />
    </>
  );
}
