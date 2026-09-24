# CVMA® MI 35-3 — Website

New site for Combat Veterans Motorcycle Association Chapter 35-3 (replacing the GoDaddy Website Builder site at cvmami35-3.org).

Plain static HTML/CSS/JS — no build step. Works on Vercel, GitHub Pages, or GoDaddy hosting as-is.

```
index.html                  Home page (also the master copy of the header + footer)
*.html                      One file per page (about, command-and-staff, gallery, …)
css/styles.css              All styles (colors/fonts are CSS variables at the top)
js/main.js                  Nav menus, mobile drawer, countdown, events, gallery lightbox
assets/img/                 Images
scripts/sync-layout.mjs     Copies header/footer from index.html to every page
scripts/pull-assets.mjs     Downloads images/PDFs still linked from the GoDaddy site
scripts/build-gallery.mjs   Builds gallery albums from assets/img/gallery/ folders
vercel.json                 Clean URLs + redirects for Vercel
.htaccess                   Same, for GoDaddy/Apache hosting
```

## Changing the menu or footer

Edit them **only in `index.html`** (between the `LAYOUT:HEADER` / `LAYOUT:FOOTER` markers), then run:

```
node scripts/sync-layout.mjs
```

## Before cancelling GoDaddy

Photos and PDFs are currently loaded straight from the old GoDaddy site (img1.wsimg.com). From inside this folder, run once:

```
node scripts/pull-assets.mjs
```

It saves the files into `assets/img/site/` and `assets/docs/` and updates the `.html` pages to point at them. Then upload the `assets` folder **and** all the `.html` files to GitHub.

## Adding events / photos

- **Events:** `event-calendar.html` — copy an `<article class="event">` block and set `data-date="YYYY-MM-DD"`. Past events move to "Past Events" automatically.
- **Gallery:** make one folder per album in `assets/img/gallery/` (e.g. `1-ride-for-freedom-2026-poker-run/`), drop the photos in, then run `node scripts/build-gallery.mjs`. The number sets the album order and isn't shown.

## Preview locally

```
npx serve .   # supports clean URLs like /gallery
```

## Images to drop into `assets/img/`

Still needed (the pages fall back gracefully until they exist):

| File | Used for |
|---|---|
| `logo.png` | Header logo (transparent PNG, ~200px tall) |
| `favicon.png` | Browser tab icon (square, 512×512) |

Videos (hero background + two highlight reels) are the existing Vimeo videos, embedded directly.

## Countdown

Set the National Meeting date on the `.countdown` section in `index.html`:

```html
<section class="countdown" data-target="2027-06-10T09:00:00-05:00">
```

Leave it empty to show "Date Coming Soon".

## Deploy

**Vercel:** Import the GitHub repo → Framework preset "Other" → deploy. Add `cvmami35-3.org` under Project → Domains, then point GoDaddy DNS at Vercel.

**GoDaddy hosting:** Upload the repo contents to `public_html`.

## Open items

- [ ] Members-only pages (Bylaws, Meeting Minutes): replace the GoDaddy sign-in link with a shared Google Drive folder link.
- [ ] Ride for Freedom: add the next event's date, tickets and flyer once announced.
- [ ] National Meeting 2027: set the countdown date.
- [ ] Add logo.png, favicon.png, and the gallery albums.
- [ ] Run `pull-assets.mjs` before cancelling GoDaddy.
