// ---------- INTRO CARDS ----------
// Homepage entry deck (replaces the old loader). Scroll, swipe, tap or
// arrow keys advance one bold card at a time; past the last card (or via
// Skip / Escape) the deck slides away and reveals the page.
(function bootIntroCards() {
  function runIntroCards() {
    var deck = document.getElementById('icards');
    if (!deck || deck.dataset.bound === '1') return;
    deck.dataset.bound = '1';
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
  // Loaded synchronously right after the deck markup, so #icards already
  // exists and handlers attach before React hydrates (no dead first click).
  runIntroCards();
})();

