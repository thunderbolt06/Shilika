/* Extracted from public/ads.html inline scripts */
window.addEventListener('load', function () {
  if (typeof Calendly !== 'undefined' && Calendly.initInlineWidget) {
    // Build URL with UTM + GCLID stitched in
    var sep = '?';
    var params = [];
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function (k) {
      var v = sessionStorage.getItem('sj_' + k);
      if (v) params.push(k + '=' + encodeURIComponent(v));
    });
    var gclid = sessionStorage.getItem('sj_gclid');
    if (gclid) params.push('gclid=' + encodeURIComponent(gclid));
    var url = 'https://calendly.com/shilikajain/30min/' + (params.length ? sep + params.join('&') : '');
    Calendly.initInlineWidget({
      url: url,
      parentElement: document.getElementById('calendly-inline-widget'),
      prefill: {},
      utm: {}
    });
  }
});

var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

(function () {
  // Stash gclid + utm params from URL
  try {
    var qs = new URLSearchParams(window.location.search);
    var gclid = qs.get('gclid');
    if (gclid) sessionStorage.setItem('sj_gclid', gclid);
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function (k) {
      var v = qs.get(k);
      if (v) sessionStorage.setItem('sj_' + k, v);
    });
  } catch (e) {}

  // Decorate any outbound Calendly links
  function decorate() {
    var params = [];
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(function (k) {
      var v = sessionStorage.getItem('sj_' + k);
      if (v) params.push(k + '=' + encodeURIComponent(v));
    });
    var gclid = sessionStorage.getItem('sj_gclid');
    if (gclid) params.push('gclid=' + encodeURIComponent(gclid));
    var extra = params.join('&');
    if (!extra) return;
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function (a) {
      try {
        var u = new URL(a.href);
        var sep = u.search ? '&' : '?';
        a.href = u.href + sep + extra;
      } catch (e) {}
    });
  }
  decorate();

  // Click conversion
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="calendly.com"], .cta-book-call');
    if (!a) return;
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/BOOK_CALL_LABEL',
        value: 40.0,
        currency: 'USD'
      });
    }
  }, { passive: true });

  // Calendly postMessage listener
  window.addEventListener('message', function (e) {
    if (!e.data || typeof e.data !== 'object') return;
    var ev = e.data.event;
    if (!ev || ev.indexOf('calendly') !== 0) return;
    if (typeof gtag !== 'function') return;
    if (ev === 'calendly.event_scheduled') {
      gtag('event', 'conversion', { send_to: 'AW-CONVERSION_ID/CAL_BOOKED_LABEL', value: 400.0, currency: 'USD' });
    } else if (ev === 'calendly.profile_page_viewed') {
      gtag('event', 'conversion', { send_to: 'AW-CONVERSION_ID/CAL_LOADED_LABEL', value: 80.0, currency: 'USD' });
    }
  });
})();
