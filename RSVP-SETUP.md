# LCV formunu Google E-Tablo'ya bağlama (evde, bilgisayarda)

Form (`index.html` → LCV) hazır; sadece bir Google Apps Script "Web App"
URL'si girilince yanıtları E-Tablo'ya yazmaya başlar.

> Not: Bu adımlar **bilgisayardan / masaüstü tarayıcıdan** yapılır.
> Google Sheets'in **mobil uygulamasında Apps Script yoktur.**

## 1. E-Tablo + Apps Script
1. `sheets.new` ile yeni bir E-Tablo aç (örn. "Ulya & Ali — LCV").
2. **Uzantılar → Apps Script**.
3. Editördeki her şeyi sil, şunu yapıştır ve kaydet:

```javascript
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('LCV') || ss.insertSheet('LCV');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Tarih', 'Ad Soyad', 'Katılım', 'Kişi Sayısı', 'Not']);
  }
  var p = (e && e.parameter) || {};
  var att = p.att === 'yes' ? 'Katılıyor' : (p.att === 'no' ? 'Katılmıyor' : p.att || '');
  sheet.appendRow([new Date(), p.name || '', att, p.guests || '', p.note || '']);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
                       .setMimeType(ContentService.MimeType.JSON);
}
```

## 2. Dağıtım (deploy)
1. Sağ üst **Dağıt → Yeni dağıtım**.
2. Tür: **Web uygulaması**.
   - Yürütülecek hesap: **Ben**
   - Erişim: **Herkes (Anyone)**
3. **Dağıt** → Google izin isteyince onayla.
4. Verilen **Web uygulaması URL**'sini kopyala — `https://script.google.com/macros/s/AKfyc…/exec` ile biter.

## 3. URL'yi siteye gir
`js/app.js` içinde şu satırı bul:

```js
var RSVP_ENDPOINT = '';
```

Tırnakların arasına URL'yi yapıştır:

```js
var RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfyc…/exec';
```

Kaydet → commit → push. (Ya da URL'yi bana ver, ben girip yayına alayım.)

## Test
Sitede formu doldurup gönder → E-Tablo'nun **LCV** sayfasına yeni bir satır
düşmeli. Kod değişirse Apps Script'te **yeni dağıtım** yapman gerekebilir.
