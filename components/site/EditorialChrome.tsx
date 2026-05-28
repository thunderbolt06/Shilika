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

export function EditorialCursor() {
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
          <a href="/#work" data-magnet>
            Work
          </a>
        </li>
        <li>
          <a href="/#services" data-magnet>
            Services
          </a>
        </li>
        <li>
          <a href="/playbook" data-magnet className={active === 'playbook' ? 'is-active' : undefined}>
            Playbooks
          </a>
        </li>
        <li>
          <a href="/#press" data-magnet>
            Press
          </a>
        </li>
        <li>
          <a href="/#about" data-magnet>
            About
          </a>
        </li>
        <li>
          <a href="/testimonials" data-magnet className={active === 'testimonials' ? 'is-active' : undefined}>
            Testimonials
          </a>
        </li>
        <li>
          <a href="/blog" data-magnet className={active === 'blog' ? 'is-active' : undefined}>
            Blog
          </a>
        </li>
        <li>
          <a href="/#contact" data-magnet>
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
      <div className="footer-row">
        <span className="mono">© SHILIKA JAIN - 2019-2026</span>
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
