/* Shared client script for /pages landing pages:
   scroll progress, reveal-on-scroll animations, magnetic CTAs, and the
   lead/intent form submit (POST /api/contact). */
(function () {
  'use strict';

  // ---------- scroll progress ----------
  var bar = document.getElementById('progress-bar');
  if (bar) {
    window.addEventListener(
      'scroll',
      function () {
        var h = document.documentElement;
        var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = pct + '%';
      },
      { passive: true },
    );
  }

  // ---------- reveal on scroll ----------
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    reveals.forEach(function (el, i) {
      el.style.setProperty('--reveal-i', String(i % 8));
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ---------- magnetic CTAs ----------
  if (window.matchMedia && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-magnet]').forEach(function (el) {
      el.addEventListener('mousemove', function (ev) {
        var r = el.getBoundingClientRect();
        var x = ev.clientX - r.left - r.width / 2;
        var y = ev.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + x * 0.12 + 'px,' + y * 0.18 + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  }

  // ---------- animated stat counters ----------
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          cio.unobserve(el);
          var target = parseFloat(el.getAttribute('data-count')) || 0;
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
          var dur = 1100,
            start = null;
          function step(ts) {
            if (start === null) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var val = target * eased;
            el.textContent = prefix + (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach(function (el) {
      cio.observe(el);
    });
  }


  // ---------- intent / lead form ----------
  var form = document.getElementById('intent-form');
  if (form) {
    var status = form.querySelector('.intent-status');
    // Pre-select the page's primary service if provided.
    var svc = form.getAttribute('data-service');
    if (svc) {
      var sel = form.querySelector('[name="service"]');
      if (sel) {
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value === svc) {
            sel.selectedIndex = i;
            break;
          }
        }
      }
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var get = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? String(el.value || '').trim() : '';
      };
      var data = {
        name: get('name'),
        email: get('email'),
        company: get('company'),
        service: get('service') || form.getAttribute('data-service') || '',
        stage: get('stage'),
        timeline: get('timeline'),
        budget: get('budget'),
        region: get('region'),
        message: get('message'),
        website: get('website'), // honeypot
        source: form.getAttribute('data-source') || window.location.pathname,
      };

      if (!data.name || !data.email || !data.message) {
        setStatus('Please add your name, email, and a short message.', 'error');
        return;
      }

      var btn = form.querySelector('.intent-submit');
      if (btn) btn.disabled = true;
      setStatus('Sending…', '');

      try {
        var res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setStatus('✓ Sent. Shilika will reply within 24h.', 'success');
          form.reset();
        } else {
          var t = await res.text().catch(function () {
            return '';
          });
          console.error('contact error', res.status, t);
          setStatus(
            "Couldn't send (" + res.status + '). Email shilika498@gmail.com directly.',
            'error',
          );
        }
      } catch (err) {
        console.error(err);
        setStatus('Network error. Try again or email shilika498@gmail.com.', 'error');
      } finally {
        if (btn) btn.disabled = false;
      }
    });

    function setStatus(msg, cls) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'intent-status' + (cls ? ' ' + cls : '');
    }
  }
})();
