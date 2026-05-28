/* Extracted from index.html lines 3535-3818 and 3842-3897 */
/* =========================================================
   SHILIKA JAIN - SITE INTERACTIONS
   ========================================================= */

// ---------- LOADER ----------
// Fire on DOMContentLoaded (or immediately if already past it) with a hard
// 1.5s cap so external scripts (Calendly, PostHog, gtag) cannot keep the
// loader on screen. Original code waited on window.load which blocked on
// every deferred third-party script.
(function bootLoader() {
  function runLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;
    var pct = document.querySelector('.loader-pct');
    var p = 0;
    var start = Date.now();
    var t = setInterval(function () {
      p = Math.min(100, p + Math.ceil(Math.random() * 30));
      if (pct) pct.textContent = String(p).padStart(3, '0');
      if (p >= 100 || Date.now() - start > 1200) {
        clearInterval(t);
        if (pct) pct.textContent = '100';
        setTimeout(function () { loader.classList.add('gone'); }, 80);
        setTimeout(function () { loader.style.display = 'none'; }, 550);
      }
    }, 25);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runLoader, { once: true });
  } else {
    runLoader();
  }
})();

// ---------- CUSTOM CURSOR ----------
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
let cx = 0, cy = 0, tx = 0, ty = 0;

if (cursor && window.matchMedia('(min-width: 901px)').matches) {
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    if (dot) dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
  });

  function loopCursor() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loopCursor);
  }
  loopCursor();

  // hover targets
  const hoverables = document.querySelectorAll('a, button, .service, .case, .press-item, input, textarea, select, [data-magnet]');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
}

// ---------- MAGNETIC BUTTONS ----------
document.querySelectorAll('[data-magnet]').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

// ---------- NAV HIDE-ON-SCROLL ----------
let lastScroll = 0;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 200 && y > lastScroll) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
  lastScroll = y;
});

// ---------- INTERSECTION REVEAL ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-title, .service, .case, .press-item, .timeline-item, .process-step, .photo-frame, .about-lede, .speaking, .press-quote, .contact-card, .channel, .stat')
  .forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    io.observe(el);
  });

// ---------- CLOCK ----------
function tick() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  // IST = UTC+5:30
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000);
  const h = String(ist.getHours()).padStart(2, '0');
  const m = String(ist.getMinutes()).padStart(2, '0');
  const s = String(ist.getSeconds()).padStart(2, '0');
  el.textContent = `${h}:${m}:${s}`;
}
setInterval(tick, 1000); tick();

// ---------- LITE YOUTUBE (click-to-play) ----------
// Warm up the YT origin on first hover/touch so playback starts faster.
(function () {
  let warmed = false;
  function warmYT() {
    if (warmed) return; warmed = true;
    [
      'https://www.youtube-nocookie.com',
      'https://www.google.com',
      'https://googleads.g.doubleclick.net',
      'https://static.doubleclick.net'
    ].forEach(href => {
      const l = document.createElement('link');
      l.rel = 'preconnect'; l.href = href; l.crossOrigin = '';
      document.head.appendChild(l);
    });
  }
  document.querySelectorAll('.lite-yt').forEach(el => {
    el.addEventListener('pointerenter', warmYT, { once: true });
    el.addEventListener('focusin', warmYT, { once: true });
    el.addEventListener('click', function () {
      if (el.dataset.activated === '1') return;
      el.dataset.activated = '1';
      const id = el.dataset.yt;
      const title = el.dataset.title || 'YouTube video';
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&color=white&cc_load_policy=0';
      iframe.title = title;
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.allowFullscreen = true;
      el.innerHTML = '';
      el.appendChild(iframe);
      try { if (window.posthog) posthog.capture('video_play', { video_id: id, title }); } catch (e) {}
    });
  });
})();

// ---------- CONTACT FORM ----------
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      budget: form.budget.value,
      message: form.message.value.trim()
    };

    if (!data.name || !data.email || !data.message) {
      status.textContent = 'Please fill name, email, and message.';
      status.className = 'form-status error';
      return;
    }

    const btn = form.querySelector('.submit-btn');
    btn.disabled = true;
    status.textContent = 'Sending…';
    status.className = 'form-status';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        status.textContent = '✓ Sent. Shilika will reply within 24h.';
        status.className = 'form-status success';
        form.reset();
      } else {
        const errText = await res.text();
        console.error('Contact API error:', res.status, errText);
        status.textContent = `Hmm - couldn't send (${res.status}). Email shilika498@gmail.com directly.`;
        status.className = 'form-status error';
      }
    } catch (err) {
      console.error('Fetch error', err);
      status.textContent = 'Network error. Try again or email directly.';
      status.className = 'form-status error';
    } finally {
      btn.disabled = false;
    }
  });
}

// ---------- GOOGLE ADS TRACKING: UTM + GCLID + CALENDLY STITCHING ----------
(function () {
  // 1. Capture URL params (gclid, utm_*) once per session and stash them.
  try {
    var qs = new URLSearchParams(window.location.search);
    var gclid = qs.get('gclid');
    if (gclid) sessionStorage.setItem('sj_gclid', gclid);

    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function (k) {
      var v = qs.get(k);
      if (v) sessionStorage.setItem('sj_' + k, v);
    });
  } catch (e) { /* no-op */ }

  // 2. Build the param string to append to outbound Calendly links.
  function buildCalendlyParams() {
    var params = [];
    var keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
    keys.forEach(function (k) {
      var v = sessionStorage.getItem('sj_' + k);
      if (v) params.push(k + '=' + encodeURIComponent(v));
    });
    var gclid = sessionStorage.getItem('sj_gclid');
    if (gclid) params.push('gclid=' + encodeURIComponent(gclid));
    return params.join('&');
  }

  // 3. Rewrite all calendly links on the page so the tracking rides along.
  function decorateCalendlyLinks() {
    var extra = buildCalendlyParams();
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function (a) {
      try {
        var u = new URL(a.href);
        if (extra) {
          var sep = u.search ? '&' : '?';
          a.href = u.href + sep + extra;
        }
        a.classList.add('cta-book-call');
      } catch (e) { /* no-op */ }
    });
  }
  decorateCalendlyLinks();

  // 4. Fire gtag conversion event on any Book-a-Call click.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="calendly.com"], .cta-book-call');
    if (!a) return;
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/BOOK_CALL_LABEL',
        value: 40.0,
        currency: 'USD',
        transaction_id: ''
      });
    }
  }, { passive: true });

  // 5. Listen for Calendly postMessages — resize + conversion tracking.
  window.addEventListener('message', function (e) {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.event && e.data.event.indexOf('calendly') === 0) {
      // Auto-fit height to Calendly's reported content height (no internal scroll).
      if (e.data.event === 'calendly.page_height') {
        var h = e.data.payload && e.data.payload.height;
        if (h) {
          var w = document.getElementById('calendly-widget');
          if (w) w.style.height = h + 'px';
        }
      }
      if (e.data.event === 'calendly.event_scheduled' && typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CAL_BOOKED_LABEL',
          value: 400.0,
          currency: 'USD'
        });
      }
      if (e.data.event === 'calendly.profile_page_viewed' && typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-CONVERSION_ID/CAL_LOADED_LABEL',
          value: 80.0,
          currency: 'USD'
        });
      }
    }
  });
})();


(function () {
  var modal = document.getElementById('li-modal');
  if (!modal) return;
  var badgeWrap = document.getElementById('li-badge-wrap');
  var nameEl = document.getElementById('li-modal-name');
  var titleEl = document.getElementById('li-modal-title');
  var ctaEl = document.getElementById('li-modal-cta');
  var closeBtn = document.getElementById('li-modal-close');
  var liScriptLoaded = false;

  function loadLiScript() {
    if (liScriptLoaded) {
      if (window.LIRenderAll) try { window.LIRenderAll(); } catch (e) {}
      return;
    }
    liScriptLoaded = true;
    var s = document.createElement('script');
    s.src = 'https://platform.linkedin.com/badges/js/profile.js';
    s.async = true;
    s.defer = true;
    document.body.appendChild(s);
  }

  function open(data) {
    nameEl.textContent = data.name;
    titleEl.textContent = data.title;
    ctaEl.href = data.url;
    badgeWrap.innerHTML = '<div class="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="' + data.vanity + '" data-version="v1"><a class="badge-base__link LI-simple-link" href="' + data.url + '"></a></div>';
    modal.hidden = false;
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    loadLiScript();
  }
  function close() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      modal.hidden = true;
      badgeWrap.innerHTML = '';
    }, 320);
  }

  document.querySelectorAll('.testimonial-li').forEach(function (btn) {
    btn.addEventListener('click', function () {
      open({
        vanity: btn.dataset.liVanity,
        name: btn.dataset.liName,
        title: btn.dataset.liTitle,
        url: btn.dataset.liUrl
      });
    });
  });
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
})();

// ---------- BOOT HOOK (for Next.js SPA re-mounts) ----------
// Expose a small no-op-safe re-boot function. The main script body above
// runs at script load time. Most listeners are bound to `document` which
// survives SPA navigation. The exceptions — cursor rAF and Calendly link
// decoration — are stamped with data attributes so re-running them does
// not double-bind. ClientReBoot in app/page.tsx calls this on mount.
(function () {
  function reboot() {
    try {
      // Re-stamp Calendly links if the page rerendered.
      var keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
      var params = [];
      try {
        keys.forEach(function (k) {
          var v = sessionStorage.getItem('sj_' + k);
          if (v) params.push(k + '=' + encodeURIComponent(v));
        });
        var g = sessionStorage.getItem('sj_gclid');
        if (g) params.push('gclid=' + encodeURIComponent(g));
      } catch (e) {}
      var extra = params.join('&');
      document.querySelectorAll('a[href*="calendly.com"]').forEach(function (a) {
        if (a.dataset.sjDecorated === '1') return;
        a.dataset.sjDecorated = '1';
        try {
          var u = new URL(a.href);
          if (extra) {
            var sep = u.search ? '&' : '?';
            a.href = u.href + sep + extra;
          }
          a.classList.add('cta-book-call');
        } catch (e) {}
      });
    } catch (e) { /* never throw from re-boot */ }
  }
  if (typeof window !== 'undefined') {
    window.__shilikaBoot = reboot;
  }
})();
