/* Extracted from public/testimonials.html inline scripts */

// Testimonial cards are now rendered server-side (app/testimonials/page.tsx)
// into #t-list, so crawlers and no-JS visitors get the content directly.
// This script only wires up interactivity on the existing DOM.

// Reveal on scroll + scroll progress. Wrapped in an IIFE (like the LinkedIn
// modal block below) because this page also loads site.js, which declares
// its own top-level `const io` — an unwrapped redeclaration here throws a
// page-wide SyntaxError that kills whichever of the two scripts loads
// second, which is how the loader overlay ended up stuck on screen.
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 0.05, 0.4) + 's';
    io.observe(el);
  });

  const bar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (bar) bar.style.width = pct + '%';
  }, { passive: true });
})();

// LinkedIn modal
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

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.t-li');
    if (!btn) return;
    open({
      vanity: btn.dataset.liVanity,
      name: btn.dataset.liName,
      title: btn.dataset.liTitle,
      url: btn.dataset.liUrl
    });
  });
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
})();
