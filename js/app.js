/* Otağ — Ulya & Ali wedding site interactivity.
   Vanilla JS: sticky-nav state, smooth section scroll, live countdown,
   and the RSVP submit → thank-you transition. No dependencies. */
(function () {
  'use strict';

  var WED_DATE = '2026-07-25T19:00:00';

  /* ── Smooth scroll to section (offset for the 64px sticky nav) ── */
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function () { scrollToId(btn.getAttribute('data-scroll')); });
  });

  /* ── Sticky nav: translucent blurred bar after a little scroll ── */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('is-solid', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Countdown ── */
  var cd = document.querySelector('.countdown');
  if (cd) {
    var fields = {
      Gun: cd.querySelector('[data-cd="Gun"]'),
      Saat: cd.querySelector('[data-cd="Saat"]'),
      Dakika: cd.querySelector('[data-cd="Dakika"]'),
      Saniye: cd.querySelector('[data-cd="Saniye"]')
    };
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var ms = Math.max(0, new Date(WED_DATE) - Date.now());
      var s = Math.floor(ms / 1000);
      var v = {
        Gun: Math.floor(s / 86400),
        Saat: Math.floor((s % 86400) / 3600),
        Dakika: Math.floor((s % 3600) / 60),
        Saniye: s % 60
      };
      if (fields.Gun) fields.Gun.textContent = v.Gun;
      if (fields.Saat) fields.Saat.textContent = pad(v.Saat);
      if (fields.Dakika) fields.Dakika.textContent = pad(v.Dakika);
      if (fields.Saniye) fields.Saniye.textContent = pad(v.Saniye);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ── RSVP: POST to the Google Apps Script Web App, then thank-you ──
     Paste the deployed Web App URL (…/exec) below. While it's empty the
     form just shows the thank-you state without saving. */
  var RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyhvp-3k3sWfiUD3_ngXNjeIhdqDPwwM5zpn4-W2MXkv-6yIXdlHLw0Um6-3AlMgnkNxw/exec';

  var form = document.querySelector('.rsvp-form');
  var thanks = document.querySelector('.rsvp-thanks');
  if (form && thanks) {
    var showThanks = function () {
      form.classList.add('is-hidden');
      thanks.classList.remove('is-hidden');
      scrollToId('rsvp');
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Gönderiliyor…'; }
      if (RSVP_ENDPOINT) {
        /* no-cors: Apps Script doesn't send CORS headers; we fire-and-forget
           (opaque response) and show thanks on success or network error. */
        fetch(RSVP_ENDPOINT, { method: 'POST', mode: 'no-cors', body: new FormData(form) })
          .then(showThanks, showThanks);
      } else {
        showThanks();
      }
    });
  }
})();
