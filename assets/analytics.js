// =====================================================================
// PostHog Analytics — EU region
// =====================================================================
// Replace POSTHOG_KEY below with your project key (starts with `phc_`).
// Get it from: https://eu.posthog.com/project/settings → "Project API Key".
// The key is safe to expose in client code — that's how PostHog is designed.
// =====================================================================

(function () {
  var POSTHOG_KEY = 'phc_xRRqNvS3aMZ4atSebhV3cikL3MGN8oP4H6UFdsD6wj2M';
  var POSTHOG_HOST = 'https://eu.i.posthog.com';

  if (!POSTHOG_KEY || POSTHOG_KEY.indexOf('REPLACE_WITH') === 0) {
    // Key not configured yet — skip init so we don't fire bogus events.
    return;
  }

  !function (t, e) {
    var o, n, p, r;
    e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) {
      function g(t, e) { var o = e.split('.'); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; }
      (p = t.createElement('script')).type = 'text/javascript', p.crossOrigin = 'anonymous', p.async = !0, p.src = s.api_host.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js',
      (r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r);
      var u = e; for (void 0 !== a ? u = e[a] = [] : a = 'posthog', u.people = u.people || [], u.toString = function (t) { var e = 'posthog'; return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e; }, u.people.toString = function () { return u.toString(1) + '.people (stub)'; }, o = 'init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric'.split(' '), n = 0; n < o.length; n++)g(u, o[n]);
      e._i.push([i, s, a]);
    }, e.__SV = 1);
  }(document, window.posthog || []);

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    defaults: '2025-05-24'
  });

  // Lightweight named events on key CTAs so funnels are easy to build.
  window.addEventListener('DOMContentLoaded', function () {
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function () {
        try { posthog.capture('contact_form_submit'); } catch (e) {}
      });
    }
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function (a) {
      a.addEventListener('click', function () {
        try { posthog.capture('calendly_click', { href: a.href }); } catch (e) {}
      });
    });
    document.querySelectorAll('a[href*="bit.ly/shilikajain"]').forEach(function (a) {
      a.addEventListener('click', function () {
        try { posthog.capture('resume_click'); } catch (e) {}
      });
    });
  });
})();
