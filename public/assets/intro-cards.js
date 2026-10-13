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
    var idx = 0, done = false;
    var lastGo = 0, exitTimer = null;
    document.body.style.overflow = 'hidden';

    function dismiss() {
      if (done) return;
      done = true;
      deck.classList.add('gone');
      document.body.style.overflow = '';
      setTimeout(function () { deck.style.display = 'none'; }, 650);
    }

    // Transitions are interruptible: a new step retargets the cards
    // mid-animation instead of being dropped while the previous one
    // finishes. Only a short cooldown remains, to swallow the second
    // click of an accidental double-click.
    function go(dir) {
      if (done) return;
      var now = Date.now();
      if (now - lastGo < 220) return;
      var next = idx + dir;
      if (next < 0) return;
      lastGo = now;
      if (next >= cards.length) { dismiss(); return; }
      clearTimeout(exitTimer);
      cards.forEach(function (c) { c.classList.remove('is-exit'); });
      var cur = cards[idx];
      cur.classList.remove('is-active');
      if (dir > 0) cur.classList.add('is-exit');
      cards[next].classList.add('is-active');
      idx = next;
      if (counter) counter.textContent = String(idx + 1).padStart(2, '0');
      exitTimer = setTimeout(function () { cur.classList.remove('is-exit'); }, 620);
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

    // The card text must never become a selection: once it is selected,
    // the next press on it starts a text drag and no click fires at all.
    deck.addEventListener('mousedown', function (e) {
      if (e.target.closest('a, button')) return;
      e.preventDefault();
    });
    deck.addEventListener('selectstart', function (e) { e.preventDefault(); });
    deck.addEventListener('dragstart', function (e) {
      if (!e.target.closest || !e.target.closest('a')) e.preventDefault();
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

