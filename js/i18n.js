/* Otağ — Ulya & Ali · simple i18n for a static site.
   TR (default) · RU (Russian).
   Strings are marked in HTML with data-i18n / data-i18n-ph / data-i18n-aria. */
(function () {
  'use strict';

  var I18N = {
    tr: {
      'connector': 've',
      'nav.brandAria': 'Başa dön',
      'nav.details': 'Detaylar',
      'nav.invitation': 'Davetiye',
      'nav.rsvp': 'LCV',
      'hero.eyebrow': 'Düğünümüze Davetlisiniz',
      'hero.date': '25 Temmuz 2026 · İstanbul',
      'cd.days': 'Gün', 'cd.hours': 'Saat', 'cd.mins': 'Dakika', 'cd.secs': 'Saniye',
      'details.eyebrow': 'Düğün Detayları',
      'details.title': 'Sizi Bekliyoruz',
      'tile.month': 'Temmuz 2026',
      'tile.saturday': 'Cumartesi',
      'tile.wedding': 'Düğün',
      'tile.evening': 'Akşam',
      'detail.directions': 'Nasıl Giderim',
      'kids.script': 'incelikle',
      'kids.note': 'Akşamımızın geç saatlere uzayacağını düşünerek, bu özel günümüzde miniklerimize İyi Geceler Diliyoruz.',
      'venue.title': 'Mekân',
      'venue.map': 'Haritada Aç',
      'rsvp.script': 'lütfen',
      'rsvp.eyebrow': 'LCV',
      'rsvp.title': 'Katılır mısınız?',
      'field.name': 'Ad Soyad',
      'field.name.ph': 'Adınız ve soyadınız',
      'field.att': 'Katılım Durumu',
      'att.yes': 'Katılıyorum',
      'att.no': 'Maalesef katılamıyorum',
      'field.guests': 'Kişi Sayısı',
      'guests.1': '1 kişi', 'guests.2': '2 kişi', 'guests.3': '3 kişi', 'guests.4': '4 kişi',
      'field.note': 'Notunuz',
      'field.note.ph': 'Alerji veya özel istekleriniz (isteğe bağlı)',
      'rsvp.submit': 'Yanıtı Gönder',
      'rsvp.sending': 'Gönderiliyor…',
      'thanks.title': 'Teşekkür Ederiz!',
      'thanks.body': 'Yanıtınız bize ulaştı. Sizleri bu özel günümüzde aramızda görmek için sabırsızlanıyoruz.',
      'thanks.script': 'Sevgilerle',
      'footer.tag': 'Sevgilerle bekliyoruz',
      'footer.meta': 'Ulya & Ali · 25 Temmuz 2026 · İstanbul',
      'doc.title': 'Ulya & Ali — Düğün · 25 Temmuz 2026'
    },
    ru: {
      'connector': 'и',
      'nav.brandAria': 'Наверх',
      'nav.details': 'Детали',
      'nav.invitation': 'Приглашение',
      'nav.rsvp': 'RSVP',
      'hero.eyebrow': 'Приглашаем на нашу свадьбу',
      'hero.date': '25 июля 2026 · Стамбул',
      'cd.days': 'Дней', 'cd.hours': 'Часов', 'cd.mins': 'Минут', 'cd.secs': 'Секунд',
      'details.eyebrow': 'Детали свадьбы',
      'details.title': 'Ждём вас',
      'tile.month': 'июля 2026',
      'tile.saturday': 'суббота',
      'tile.wedding': 'Свадьба',
      'tile.evening': 'вечер',
      'detail.directions': 'Как добраться',
      'kids.script': 'с заботой',
      'kids.note': 'Поскольку наш вечер продлится допоздна, в этот особенный день мы желаем нашим маленьким гостям спокойной ночи.',
      'venue.title': 'Место проведения',
      'venue.map': 'Открыть на карте',
      'rsvp.script': 'пожалуйста',
      'rsvp.eyebrow': 'RSVP',
      'rsvp.title': 'Придёте?',
      'field.name': 'Имя и фамилия',
      'field.name.ph': 'Ваше имя и фамилия',
      'field.att': 'Участие',
      'att.yes': 'Приду',
      'att.no': 'К сожалению, не смогу',
      'field.guests': 'Количество гостей',
      'guests.1': '1 человек', 'guests.2': '2 человека', 'guests.3': '3 человека', 'guests.4': '4 человека',
      'field.note': 'Примечание',
      'field.note.ph': 'Аллергии или особые пожелания (необязательно)',
      'rsvp.submit': 'Отправить ответ',
      'rsvp.sending': 'Отправляется…',
      'thanks.title': 'Спасибо!',
      'thanks.body': 'Ваш ответ получен. Будем рады видеть вас в этот особенный день.',
      'thanks.script': 'С любовью',
      'footer.tag': 'Ждём вас с любовью',
      'footer.meta': 'Ulya & Ali · 25 июля 2026 · Стамбул',
      'doc.title': 'Ulya & Ali — Свадьба · 25 июля 2026'
    }
  };

  function applyLang(lang) {
    if (!I18N[lang]) { lang = 'tr'; }
    var dict = I18N[lang];
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v != null) { el.textContent = v; }
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-ph')];
      if (v != null) { el.setAttribute('placeholder', v); }
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-aria')];
      if (v != null) { el.setAttribute('aria-label', v); }
    });

    if (dict['doc.title']) { document.title = dict['doc.title']; }

    /* hand the localized "sending…" label to app.js via a data attribute */
    var submit = document.querySelector('.rsvp-submit');
    if (submit && dict['rsvp.sending']) { submit.setAttribute('data-sending', dict['rsvp.sending']); }

    document.querySelectorAll('.lang-btn').forEach(function (b) {
      var active = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    try { localStorage.setItem('ua_lang', lang); } catch (e) {}
  }

  /* pick initial: saved choice → browser language → Turkish */
  var saved = null;
  try { saved = localStorage.getItem('ua_lang'); } catch (e) {}
  var nav2 = (navigator.language || 'tr').slice(0, 2).toLowerCase();
  var initial = (saved && I18N[saved]) ? saved : (I18N[nav2] ? nav2 : 'tr');

  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
  });

  applyLang(initial);
  window.applyLang = applyLang;
})();
