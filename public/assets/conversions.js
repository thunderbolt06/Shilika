/* =========================================================
   CONVERSION → THANK-YOU ROUTER (site-wide, loaded from app/layout.tsx)

   Every contact action on the site ends on /thank-you?via=<channel>, which
   is the URL Google Ads counts as the conversion:

     calendly  - clicked a Calendly "Book a call" link (opens in a new tab)
     booked    - finished booking inside an embedded Calendly widget
     telegram  - t.me/shilika3
     twitter   - x.com/Shilika_jain
     linkedin  - linkedin.com/in/shilika
     email     - mailto: Shilika's addresses
     form      - contact / intent form sent successfully (called from
                 site.js and pages.js via window.__sjThankYou)

   Outbound links still open where the visitor expects (new tab, Telegram
   app, mail client); the current tab moves to the thank-you page behind it.
   ========================================================= */
(function () {
  'use strict';
  if (window.__sjConversionsBound) return;
  window.__sjConversionsBound = true;

  var THANK_YOU = '/thank-you';

  function onExcludedPage() {
    var p = window.location.pathname;
    return p.indexOf(THANK_YOU) === 0 || p.indexOf('/admin') === 0;
  }

  function thankYouUrl(via) {
    var from = window.location.pathname;
    return THANK_YOU + '?via=' + encodeURIComponent(via) +
      (from && from !== '/' ? '&from=' + encodeURIComponent(from) : '');
  }

  function goThankYou(via, delay) {
    if (onExcludedPage()) return;
    try { if (window.posthog) window.posthog.capture('contact_conversion', { via: via }); } catch (e) {}
    setTimeout(function () { window.location.assign(thankYouUrl(via)); }, delay || 0);
  }
  window.__sjThankYou = goThankYou;

  // Which channel (if any) a link belongs to. Deliberately narrow so links to
  // other people's profiles (testimonial LinkedIn badges, quoted tweets,
  // third-party Telegram channels) don't count as a conversion.
  function channelFor(a) {
    if (a.dataset.thankyou === 'off') return null;
    if (a.dataset.thankyou) return a.dataset.thankyou;
    var href = a.getAttribute('href') || '';
    if (/^mailto:/i.test(href)) {
      return /shilika498@gmail\.com|shilika@shilikajain\.com/i.test(href) ? 'email' : null;
    }
    var u;
    try { u = new URL(a.href); } catch (e) { return null; }
    var host = u.hostname.replace(/^www\./, '').toLowerCase();
    var path = u.pathname.replace(/\/+$/, '').toLowerCase();
    if (host === 'calendly.com' && path.indexOf('/shilikajain') === 0) return 'calendly';
    if ((host === 't.me' || host === 'telegram.me') && path === '/shilika3') return 'telegram';
    if ((host === 'x.com' || host === 'twitter.com') && path === '/shilika_jain') return 'twitter';
    if (/(^|\.)linkedin\.com$/.test(host) && path === '/in/shilika') return 'linkedin';
    return null;
  }

  // Capture phase so this runs even if a page script stops propagation.
  document.addEventListener('click', function (e) {
    if (onExcludedPage()) return;
    if (e.defaultPrevented) return;
    // Cmd/Ctrl/Shift/middle-click: the visitor chose to stay on this page.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var via = channelFor(a);
    if (!via) return;

    if (via === 'email') {
      // Let the mail client open, then move this tab along.
      goThankYou(via, 400);
      return;
    }
    if ((a.getAttribute('target') || '').toLowerCase() !== '_blank') {
      // Same-tab link: open the destination in a new tab ourselves so the
      // thank-you page can take this one.
      e.preventDefault();
      window.open(a.href, '_blank', 'noopener');
    }
    goThankYou(via, 150);
  }, true);

  // Embedded Calendly widgets (homepage, /contact, /ads): a completed booking
  // gets its own thank-you variant. Short delay so the widget's own
  // confirmation flashes first.
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://calendly.com') return;
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.event === 'calendly.event_scheduled') goThankYou('booked', 1200);
  });
})();
