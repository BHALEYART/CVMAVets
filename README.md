# CVMA® MI 35-3 — Website

New site for Combat Veterans Motorcycle Association Chapter 35-3 (replacing the GoDaddy Website Builder site at cvmami35-3.org).

Plain static HTML/CSS/JS — no build step. Works on Vercel, GitHub Pages, or GoDaddy hosting as-is.

```
index.html                  Home page
<page-name>/index.html      One folder per page (gallery/, become-a-member/, …)
404.html                    "Page not found" page
js/site-nav.js              ★ Site-wide menu, header, footer & contact info — edit here
js/main.js                  Menu behavior, countdown, events, gallery lightbox
css/styles.css              All styles (colors/fonts are CSS variables at the top)
assets/img/                 Images
scripts/pull-assets.mjs     Downloads images/PDFs still linked from the GoDaddy site
scripts/build-gallery.mjs   Builds gallery albums from assets/img/gallery/ folders
vercel.json / .htaccess     Redirects from old GoDaddy URLs (Vercel / GoDaddy hosting)
```

All links are relative, so the site works on GitHub Pages (`bhaleyart.github.io/CVMAVets/`), Vercel, or GoDaddy without changes.

## Changing the menu, footer, or contact info

Edit **`js/site-nav.js`** only — the `SITE`, `MENU` and `FOOTER` lists at the top. Every page picks up the change automatically. Links are written without a leading slash, e.g. `'gallery/'`.

## Adding a new page

1. Copy an existing page folder (e.g. `shop-gear-and-apparel/`) and rename it, e.g. `newsletter/`.
2. Edit the content inside its `<main>`.
3. Add `{ label: 'Newsletter', href: 'newsletter/' }` to `MENU` in `js/site-nav.js`.

## Before cancelling GoDaddy

Photos and PDFs are currently loaded straight from the old GoDaddy site (img1.wsimg.com). From inside this folder, run once:

```
node scripts/pull-assets.mjs
```

It saves the files into `assets/img/site/` and `assets/docs/` and updates every page to point at them. Then upload the `assets` folder **and** all the page folders + `index.html` to GitHub.

## Adding events / photos

- **Events:** `event-calendar/index.html` — copy an `<article class="event">` block and set `data-date="YYYY-MM-DD"`. Past events move to "Past Events" automatically.
- **Gallery:** make one folder per album in `assets/img/gallery/` (e.g. `1-ride-for-freedom-2026-poker-run/`), drop the photos in, then run `node scripts/build-gallery.mjs`. The number sets the album order and isn't shown.

## Preview locally

```
npx serve .
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

**GitHub Pages (now):** repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. Live at `https://bhaleyart.github.io/CVMAVets/`.

**Vercel:** Import the GitHub repo → Framework preset "Other" → deploy. Add `cvmami35-3.org` under Project → Domains, then point GoDaddy DNS at Vercel.

**GoDaddy hosting:** Upload the repo contents to `public_html`.

## Open items

- [ ] Members-only pages (Bylaws, Meeting Minutes): replace the GoDaddy sign-in link with a shared Google Drive folder link.
- [ ] Ride for Freedom: add the next event's date, tickets and flyer once announced.
- [ ] National Meeting 2027: set the countdown date.
- [ ] Add logo.png, favicon.png, and the gallery albums.
- [ ] Run `pull-assets.mjs` before cancelling GoDaddy.
