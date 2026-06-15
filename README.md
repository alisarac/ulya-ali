# Ulya & Ali — Wedding Site (Otağ)

Static implementation of the **Otağ** wedding design system — no build step,
no dependencies. Just open the HTML files (or serve the folder).

## Pages
- **`index.html`** — the full single-couple wedding website:
  Nav · Hero (live countdown) · Detaylar (details + program + venue) ·
  Hikâyemiz (story) · Anılarımız (gallery) · LCV (interactive RSVP) · Footer.
- **`davetiye.html`** — the print-ready digital invitation card (`@media print` aware).

## Structure
```
site/
  index.html          wedding website
  davetiye.html       print invitation
  css/
    styles.css        design-system entry point (@imports the tokens + fonts)
    fonts.css         Google Fonts (Cormorant Garamond / Pinyon Script / Jost / Golos Text)
    tokens/           colors · typography · spacing · effects · base
    site.css          website + component styles (class-based; mirrors the DS components)
  js/
    app.js            sticky nav, smooth scroll, countdown, RSVP submit → thank-you
  assets/             brand art cropped from the source invitation (kilim, botanicals, scenes…)
```

## Run
Fonts and CSS `@import` work over `http://`, so serve the folder:
```bash
cd site && python3 -m http.server 8000
# → http://localhost:8000/         (website)
# → http://localhost:8000/davetiye.html
```

## Production notes (carried over from the design system)
- **Fonts are Google Fonts substitutions** for the source invitation's unidentified faces — swap in `css/fonts.css` if you have the originals.
- **Copy is Turkish**; Russian (Cyrillic) is supported by the font stack (`Golos Text` fallback) but unproofed.
- **Gallery** uses two watercolor samples + placeholders — drop in the couple's real photography.
- **RSVP** (name · attendance · guest count · note) is front-end only — it shows a thank-you state. Wire the `<form>` submit in `js/app.js` to a real endpoint to collect responses.
- **"Haritada Aç"** points at a Google Maps query — replace with the exact venue pin/coords.
