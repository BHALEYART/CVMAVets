# CVMA® MI 35-3 — Website

New site for Combat Veterans Motorcycle Association Chapter 35-3 (replacing the GoDaddy Website Builder site at cvmami35-3.org).

Plain static HTML/CSS/JS — no build step. Works on Vercel, GitHub Pages, or GoDaddy hosting as-is.

```
index.html          Home page
css/styles.css      All styles (colors/fonts are CSS variables at the top)
js/main.js          Nav menus, mobile drawer, countdown
assets/img/         Images (see list below)
vercel.json         Clean URLs for Vercel (/gallery → gallery.html)
```

## Preview locally

```
npx serve .
```

## Images to drop into `assets/img/`

The page falls back gracefully if any are missing, so add them as you export them from the GoDaddy site.

| File | Used for |
|---|---|
| `logo.png` | Header logo (transparent PNG, ~200px tall) |
| `favicon.png` | Browser tab icon (square, 512×512) |
| `mission.jpg` | "Our Mission" photo (portrait, 4:5) |
| `full-member.jpg` | "Full Member" card (16:10) |
| `supporter.jpg` | "Supporter Member" card (16:10) |
| `auxiliary.jpg` | "Combat Vets Auxiliary" card (16:10) |

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
