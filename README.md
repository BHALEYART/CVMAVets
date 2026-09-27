# CVMA® MI 35-10 — Website

Site for Combat Veterans Motorcycle Association Chapter 35-10 — https://cvmami35-10.org/

Plain static HTML/CSS/JS — no build step. Works on Vercel, GitHub Pages, or GoDaddy hosting as-is.

```
index.html                  Home page
<page-name>/index.html      One folder per page (gallery/, become-a-member/, …)
404.html                    "Page not found" page
js/site-nav.js              ★ Site-wide menu, header, footer & contact info — edit here
js/main.js                  Menu behavior, countdown, events, gallery lightbox
css/styles.css              All styles (colors/fonts are CSS variables at the top)
assets/img/                 Images
scripts/build-gallery.mjs   Builds gallery albums from assets/img/gallery/ folders
vercel.json / .htaccess     Host settings (Vercel / GoDaddy hosting)
```

All links are relative, so the site works on GitHub Pages (`bhaleyart.github.io/CVMAVets/`), Vercel, or GoDaddy without changes.

## Changing the menu, footer, or contact info

Edit **`js/site-nav.js`** only — the `SITE`, `MENU` and `FOOTER` lists at the top. Phone and email show "TBA" until you fill them in there. Every page picks up the change automatically. Links are written without a leading slash, e.g. `'gallery/'`.

## Adding a new page

1. Copy an existing page folder (e.g. `shop-gear-and-apparel/`) and rename it, e.g. `newsletter/`.
2. Edit the content inside its `<main>`.
3. Add `{ label: 'Newsletter', href: 'newsletter/' }` to `MENU` in `js/site-nav.js`.

## Photos

All site photos come from **`assets/img/photos/1.jpg` … `77.jpg`** — drop your numbered photos into that folder and upload it. Any number that's missing shows a striped "Photo coming soon" placeholder instead of a broken image.

| Photo # | Used on |
|---|---|
| 1 | Home — "Our Mission" |
| 2, 3, 4 | Home — Full / Supporter / Auxiliary cards |
| 5–13 | Page banners: About, Command & Staff, Auxiliary, Become a Member, Events, Scholarship, Donations, Shop, Gallery |
| 14 | "Page not found" banner |
| 15–18 | About Us page |
| 19–21 | Become a Member cards |
| 22 | General Donations panel |
| 1–77 | Gallery (all of them) |

To use a different photo somewhere, change the number in that page's `index.html`.

## Adding events / photos

- **Events:** `event-calendar/index.html` — copy an `<article class="event">` block and set `data-date="YYYY-MM-DD"`. Past events move to "Past Events" automatically.
- **Gallery:** make one folder per album in `assets/img/gallery/` (e.g. `1-summer-rides-2026/`), drop the photos in, then run `node scripts/build-gallery.mjs`. The number sets the album order and isn't shown.

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

The header background is a Vimeo video (in `index.html`). The other videos (Home, Gallery) are placeholders — replace each `<div class="ph ph--video">…</div>` with the video's embed code.

## Countdown

Set the National Meeting date on the `.countdown` section in `index.html`:

```html
<section class="countdown" data-target="2027-06-10T09:00:00-05:00">
```

Leave it empty to show "Date Coming Soon".

## Deploy

**GitHub Pages (now):** repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`. Live at `https://bhaleyart.github.io/CVMAVets/`.

**Vercel:** Import the GitHub repo → Framework preset "Other" → deploy. Domain `cvmami35-10.org` is connected under Project → Domains.

**GoDaddy hosting:** Upload the repo contents to `public_html`.

## Open items

- [ ] Chapter phone and email → `js/site-nav.js`
- [ ] Command & Staff names, road names and headshots → `command-and-staff/index.html`
- [ ] Support staff names and titles (5 slots)
- [ ] Chapter merch store link → `shop-gear-and-apparel/index.html`
- [ ] Donation links (General Donations, Scholarship Fund)
- [ ] Membership PDFs (application, back patch agreement, protocol) → `become-a-member/index.html`
- [ ] Members-only pages (Bylaws, Meeting Minutes): shared Google Drive folder link
- [ ] Chapter events and meeting times → `event-calendar/index.html`
- [ ] Videos for Home and Gallery
- [ ] Header video: currently another chapter's video — replace with a 35-10 video when available
- [ ] National Meeting 2027 countdown date
- [ ] logo.png, favicon.png
