/* Extracted from index.html lines 3535-3818 and 3842-3897 */
/* =========================================================
   SHILIKA JAIN - SITE INTERACTIONS
   ========================================================= */

// ---------- INTRO CARDS ----------
// Homepage entry deck (replaces the old loader). Scroll, swipe, tap or
// arrow keys advance one bold card at a time; past the last card (or via
// Skip / Escape) the deck slides away and reveals the page.
(function bootIntroCards() {
  function runIntroCards() {
    var deck = document.getElementById('icards');
    if (!deck) return;
    var cards = Array.prototype.slice.call(deck.querySelectorAll('.icard'));
    if (!cards.length) return;
    var counter = document.getElementById('icards-current');
    var skip = document.getElementById('icards-skip');
    var idx = 0, busy = false, done = false;
    document.body.style.overflow = 'hidden';

    function dismiss() {
      if (done) return;
      done = true;
      deck.classList.add('gone');
      document.body.style.overflow = '';
      setTimeout(function () { deck.style.display = 'none'; }, 650);
    }

    function go(dir) {
      if (busy || done) return;
      var next = idx + dir;
      if (next < 0) return;
      if (next >= cards.length) { dismiss(); return; }
      busy = true;
      var cur = cards[idx];
      cur.classList.remove('is-active');
      if (dir > 0) cur.classList.add('is-exit');
      cards[next].classList.add('is-active');
      idx = next;
      if (counter) counter.textContent = String(idx + 1).padStart(2, '0');
      setTimeout(function () {
        cur.classList.remove('is-exit');
        busy = false;
      }, 620);
    }

    // Wheel / trackpad. Trackpads send a burst of many small-deltaY ticks
    // (often single digits) rather than one big one, so we accumulate over
    // a short window instead of thresholding each event individually -
    // otherwise a gentle trackpad scroll never crosses a per-event minimum.
    var wheelLock = false;
    var wheelAccum = 0;
    var wheelResetTimer = null;
    deck.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (wheelLock) return;
      wheelAccum += e.deltaY;
      clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(function () { wheelAccum = 0; }, 200);
      if (Math.abs(wheelAccum) < 6) return;
      wheelLock = true;
      go(wheelAccum > 0 ? 1 : -1);
      wheelAccum = 0;
      setTimeout(function () { wheelLock = false; }, 750);
    }, { passive: false });

    // Touch swipe
    var touchY = null;
    deck.addEventListener('touchstart', function (e) {
      touchY = e.touches[0].clientY;
    }, { passive: true });
    deck.addEventListener('touchend', function (e) {
      if (touchY === null) return;
      var dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) > 40) go(dy > 0 ? 1 : -1);
    }, { passive: true });

    // Tap / click advances (but let real links and buttons work)
    deck.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) return;
      go(1);
    });

    // Keyboard
    document.addEventListener('keydown', function onKey(e) {
      if (done) { document.removeEventListener('keydown', onKey); return; }
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); go(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault(); go(-1);
      } else if (e.key === 'Escape') {
        dismiss();
      }
    });

    if (skip) skip.addEventListener('click', dismiss);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runIntroCards, { once: true });
  } else {
    runIntroCards();
  }
})();

// ---------- CUSTOM CURSOR ----------
// isDesktop() is re-checked live on every event/frame rather than once at
// script load, so the cursor still attaches correctly if the viewport
// wasn't settled to its final size at the moment this script ran.
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
let cx = 0, cy = 0, tx = 0, ty = 0;

if (cursor && dot) {
  const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

  document.addEventListener('mousemove', (e) => {
    if (!isDesktop()) return;
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
  });

  function loopCursor() {
    if (isDesktop()) {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    }
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

// =========================================================
// HOMEPAGE v3 — "THE FRONT PAGE" STORY ENGINE
// Scroll-driven interactions for the six-act homepage.
// Every block null-guards so shared pages are unaffected.
// =========================================================
(function storyEngine() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isDesktop = function () { return window.matchMedia('(min-width: 901px)').matches; };

  // ---------- reading progress bar ----------
  var progress = document.getElementById('st-progress');

  // ---------- ACT I: word fill ----------
  var problem = document.querySelector('.st-problem');
  var words = problem ? Array.prototype.slice.call(problem.querySelectorAll('.st-words span')) : [];
  var punch = problem ? problem.querySelector('.st-problem-punch') : null;
  var litCount = -1;

  // ---------- ACT III: horizontal wall ----------
  var wall = document.querySelector('.st-wall');
  var wallTrack = document.getElementById('st-wall-track');
  var wallActive = false;

  function sizeWall() {
    if (!wall || !wallTrack) return;
    wallActive = isDesktop() && !reduceMotion;
    if (!wallActive) {
      wall.style.height = '';
      wallTrack.style.transform = '';
      return;
    }
    var overflow = wallTrack.scrollWidth - window.innerWidth;
    wall.style.height = (window.innerHeight + Math.max(overflow, 0)) + 'px';
  }

  // ---------- unified scroll loop ----------
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.scrollY;
      var vh = window.innerHeight;

      // progress bar
      if (progress) {
        var docH = document.documentElement.scrollHeight - vh;
        progress.style.transform = 'scaleX(' + (docH > 0 ? Math.min(y / docH, 1) : 0) + ')';
      }

      // word fill: progress through the tall problem section
      if (problem && words.length && !reduceMotion) {
        var rect = problem.getBoundingClientRect();
        var total = rect.height - vh;
        var p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 1;
        var n = Math.round(p * 1.15 * words.length); // finish slightly before the end
        if (n !== litCount) {
          litCount = n;
          for (var i = 0; i < words.length; i++) {
            words[i].classList.toggle('lit', i < n);
          }
          if (punch) punch.classList.toggle('in', n >= words.length);
        }
      }

      // headline wall translate
      if (wallActive && wall && wallTrack) {
        var wr = wall.getBoundingClientRect();
        var travel = wall.offsetHeight - vh;
        var wp = travel > 0 ? Math.min(Math.max(-wr.top / travel, 0), 1) : 0;
        var overflow = wallTrack.scrollWidth - window.innerWidth;
        wallTrack.style.transform = 'translateX(' + (-wp * Math.max(overflow, 0)) + 'px)';
      }
    });
  }

  if (progress || words.length || wall) {
    sizeWall();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { sizeWall(); onScroll(); });
    if (reduceMotion && words.length) {
      words.forEach(function (w) { w.classList.add('lit'); });
      if (punch) punch.classList.add('in');
    }
    onScroll();
  }

  // ---------- stat count-up ----------
  var stats = document.querySelectorAll('.st-stat-num');
  if (stats.length) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        statIO.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.dataset.target || '0', 10);
        var suffix = el.dataset.suffix || '';
        if (reduceMotion) { el.textContent = target + suffix; return; }
        var start = null;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          var eased = 1 - Math.pow(1 - p, 4);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (el) { statIO.observe(el); });
  }

  // ---------- section reveals ----------
  var revealTargets = document.querySelectorAll(
    '.st-label, .st-h2, .st-sub, .st-pillar, .st-step, .st-operator-lede, .st-video, .st-quote, .st-check, .st-verdict, .st-decide-ctas, .st-decide-note, .st-faq-item, .st-fix-more, .st-quotes-more, .st-diff-label, .st-diff-stage'
  );
  if (revealTargets.length && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el, i) {
      el.classList.add('st-reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      revealIO.observe(el);
    });
  }

  // ---------- FINAL ACT: decision checks ----------
  var checksWrap = document.getElementById('st-checks');
  if (checksWrap) {
    var checks = Array.prototype.slice.call(checksWrap.querySelectorAll('.st-check'));
    var verdict = document.getElementById('st-verdict');
    var ctas = document.getElementById('st-decide-ctas');
    var lines = [
      'Go on — be honest.',
      'One of three. Keep going.',
      'Almost. One more.',
      'Then we should talk. ↓'
    ];
    function updateVerdict() {
      var n = checks.filter(function (c) { return c.classList.contains('on'); }).length;
      if (verdict) {
        verdict.textContent = lines[n];
        verdict.classList.toggle('lit', n === 3);
      }
      if (ctas) ctas.classList.toggle('lit', n === 3);
      if (n === 3) {
        try { if (window.posthog) posthog.capture('decision_all_checked'); } catch (e) {}
      }
    }
    checks.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.classList.toggle('on');
        btn.setAttribute('aria-pressed', btn.classList.contains('on') ? 'true' : 'false');
        updateVerdict();
      });
    });
  }
})();

// =========================================================
// HOMEPAGE v3.1 — HERO CANVAS, FLIP WORD, EDITION CLOCK, COMPARE
// =========================================================
(function heroExtras() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- edition clock (IST, UTC+5:30) ----------
  var clockEl = document.getElementById('st-clock');
  if (clockEl) {
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tickClock = function () {
      var now = new Date();
      var ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000);
      clockEl.textContent = pad(ist.getHours()) + ':' + pad(ist.getMinutes()) + ':' + pad(ist.getSeconds());
    };
    tickClock();
    setInterval(tickClock, 1000);
  }

  // ---------- flip word ----------
  var flip = document.getElementById('st-flip');
  if (flip && !reduceMotion) {
    var words = ['story,', 'launch,', 'raise,', 'reveal,', 'thesis,'];
    var fi = 0;
    setInterval(function () {
      flip.classList.add('is-out');
      setTimeout(function () {
        fi = (fi + 1) % words.length;
        flip.textContent = words[fi];
        flip.classList.remove('is-out');
        flip.classList.add('is-in');
        // force reflow, then release to animate in from below
        void flip.offsetWidth;
        flip.classList.remove('is-in');
      }, 500);
    }, 2600);
  }

  // ---------- interactive halftone canvas ----------
  var canvas = document.getElementById('st-hero-canvas');
  var hero = document.querySelector('.st-hero');
  if (canvas && hero && !reduceMotion) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, dots = [];
    var GAP = 38, R = 1.5, INK = [22, 20, 15], LIME = [200, 240, 60];
    var mouse = { x: -9999, y: -9999, active: false };
    var t = 0, visible = true, raf = null;

    function build() {
      var rect = hero.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      var cols = Math.ceil(W / GAP) + 1;
      var rows = Math.ceil(H / GAP) + 1;
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          dots.push({ ox: c * GAP, oy: r * GAP, x: c * GAP, y: r * GAP });
        }
      }
    }

    function frame() {
      if (!visible) { raf = null; return; }
      t += 0.012;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        // idle wave: gentle vertical breathing + density gradient toward the base
        var wave = Math.sin(d.ox * 0.012 + t) * Math.cos(d.oy * 0.014 - t * 0.8);
        var baseA = 0.05 + (d.oy / H) * 0.05;
        var rad = R + wave * 0.4;
        var a = baseA + wave * 0.02;
        var col = INK;

        if (mouse.active) {
          var dx = d.ox - mouse.x, dy = d.oy - mouse.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var reach = 150;
          if (dist < reach) {
            var f = (1 - dist / reach);
            var push = f * 26;
            var ang = Math.atan2(dy, dx);
            d.x = d.ox + Math.cos(ang) * push;
            d.y = d.oy + Math.sin(ang) * push;
            rad = R + f * 3.4;
            a = baseA + f * 0.6;
            col = f > 0.5 ? LIME : INK;
          } else {
            d.x += (d.ox - d.x) * 0.12;
            d.y += (d.oy - d.y) * 0.12;
          }
        } else {
          d.x += (d.ox - d.x) * 0.12;
          d.y += (d.oy - d.y) * 0.12;
        }

        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + a.toFixed(3) + ')';
        ctx.arc(d.x, d.y, Math.max(rad, 0.2), 0, 6.2832);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    function start() { if (!raf) { raf = requestAnimationFrame(frame); } }

    build();
    start();

    hero.addEventListener('pointermove', function (e) {
      if (!window.matchMedia('(min-width: 901px)').matches) return;
      var rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    hero.addEventListener('pointerleave', function () { mouse.active = false; });
    window.addEventListener('resize', function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2); build();
    });
    // pause the loop when the hero scrolls out of view
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start();
      }, { threshold: 0 }).observe(hero);
    }
  }

  // ---------- THE DIFFERENCE — drag to compare ----------
  var stage = document.querySelector('.st-diff-stage');
  var handle = document.getElementById('st-diff-handle');
  if (stage && handle) {
    var dragging = false;
    function setSplit(clientX) {
      var rect = stage.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(8, Math.min(92, pct));
      stage.style.setProperty('--split', pct + '%');
    }
    stage.addEventListener('pointerdown', function (e) {
      dragging = true;
      handle.classList.remove('is-hint');
      setSplit(e.clientX);
      stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', function (e) { if (dragging) setSplit(e.clientX); });
    window.addEventListener('pointerup', function () { dragging = false; });
    // one-time nudge hint when it scrolls into view
    if ('IntersectionObserver' in window) {
      var hintIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { handle.classList.add('is-hint'); hintIO.unobserve(en.target); }
        });
      }, { threshold: 0.5 });
      hintIO.observe(stage);
    }
  }
})();
