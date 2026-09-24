/* =========================================================
   CVMA MI 35-3 — SITE-WIDE HEADER, MENU & FOOTER
   This is the ONE place to change navigation, contact info
   and footer links. Every page loads this file.

   Links are written from the site root WITHOUT a leading slash:
     'gallery/'  ->  the Gallery page
     ''          ->  Home
   Full URLs (https://…) are used as-is and open in a new tab.
   ========================================================= */

const SITE = {
  name: 'CVMA<sup>®</sup> MI 35-3',
  tagline: 'Combat Veterans Motorcycle Association',
  location: 'Shelby Twp., Michigan',
  phone: '850-716-2186',
  email: 'webmaster@cvmami35-3.org',
  facebook: 'https://www.facebook.com/profile.php?id=100064300255634',
  signIn: 'https://cvmami35-3.org/m/account',
  logo: 'assets/img/logo.png',            // optional — hidden if the file is missing
  joinButton: { label: 'Join', href: 'become-a-member/' },
  legal: 'IRS 501(c)(19) Tax Exempt Organization',
};

// Top menu. Items with `children` become dropdowns.
const MENU = [
  { label: 'About Us', children: [
    { label: 'Command and Staff', href: 'command-and-staff/' },
    { label: 'CVMA Chapter 35-3', href: 'cvma-chapter-35-3/' },
    { label: 'Combat Vets Auxiliary', href: 'combat-vets-auxiliary/' },
  ]},
  { label: 'Ride for Freedom', href: 'ride-for-freedom/' },
  { label: 'Events', href: 'event-calendar/' },
  { label: 'Resources', children: [
    { label: 'Veterans in Crisis', href: 'veterans-in-crisis/' },
    { label: 'Veterans Organizations', href: 'veterans-organizations/' },
  ]},
  { label: 'Support', children: [
    { label: 'Scholarship Fund', href: 'scholarship-fund/' },
    { label: 'General Donations', href: 'general-donations/' },
    { label: 'Shop Gear & Apparel', href: 'shop-gear-and-apparel/' },
  ]},
  { label: 'Gallery', href: 'gallery/' },
  { label: 'Members', children: [
    { label: 'Bylaws, Policies & SOPs', href: 'bylaws-policies-sops/' },
    { label: 'Meeting Minutes', href: 'meeting-minutes/' },
    { label: 'Sign In', href: SITE.signIn },
  ]},
];

// Footer link columns.
const FOOTER = [
  { title: 'About', links: [
    { label: 'Command and Staff', href: 'command-and-staff/' },
    { label: 'CVMA Chapter 35-3', href: 'cvma-chapter-35-3/' },
    { label: 'Combat Vets Auxiliary', href: 'combat-vets-auxiliary/' },
    { label: 'Become a Member', href: 'become-a-member/' },
  ]},
  { title: 'Support', links: [
    { label: 'Ride for Freedom', href: 'ride-for-freedom/' },
    { label: 'Scholarship Fund', href: 'scholarship-fund/' },
    { label: 'General Donations', href: 'general-donations/' },
    { label: 'Shop Gear & Apparel', href: 'shop-gear-and-apparel/' },
  ]},
  { title: 'Resources', links: [
    { label: 'Event Calendar', href: 'event-calendar/' },
    { label: 'Veterans in Crisis', href: 'veterans-in-crisis/' },
    { label: 'Veterans Organizations', href: 'veterans-organizations/' },
    { label: 'Gallery', href: 'gallery/' },
  ]},
  { title: 'Follow', links: [
    { label: 'Facebook', href: SITE.facebook },
  ]},
];

/* ---------- You shouldn't need to edit below this line ---------- */
(() => {
  const me = document.currentScript;
  // Site root = wherever this file lives, minus "js/site-nav.js". Works on GitHub Pages
  // sub-paths (/CVMAVets/), custom domains, Vercel, GoDaddy, and local previews.
  const ROOT = me.src.replace(/js\/site-nav\.js(\?.*)?$/, '');
  const isExt = (h) => /^(https?:|mailto:|tel:|sms:)/.test(h);
  const url = (h) => (isExt(h) ? h : ROOT + h);
  const ext = (h) => (/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : '');
  const esc = (s) => s.replace(/&(?!\w+;)/g, '&amp;');
  const tel = SITE.phone.replace(/\D/g, '');

  // Current page: compare the page's folder to each link
  const norm = (u) => u.split(/[?#]/)[0].replace(/index\.html$/, '').replace(/\/$/, '');
  const here = norm(location.href);
  const cur = (h) => (!isExt(h) && norm(url(h)) === here ? ' aria-current="page"' : '');

  const item = (m) => {
    if (!m.children) return `<li class="nav__item"><a class="nav__link" href="${url(m.href)}"${ext(m.href)}${cur(m.href)}>${esc(m.label)}</a></li>`;
    const active = m.children.some((c) => cur(c.href)) ? ' aria-current="page"' : '';
    return `<li class="nav__item has-menu"><button class="nav__link" aria-expanded="false"${active}>${esc(m.label)}</button><ul class="menu">${
      m.children.map((c) => `<li><a href="${url(c.href)}"${ext(c.href)}${cur(c.href)}>${esc(c.label)}</a></li>`).join('')}</ul></li>`;
  };

  me.insertAdjacentHTML('beforebegin', `
  <a class="skip" href="#main">Skip to content</a>
  <div class="utility"><div class="wrap utility__inner">
    <div class="utility__left"><a href="tel:${tel}">${SITE.phone}</a><a href="mailto:${SITE.email}">${SITE.email}</a></div>
    <div class="utility__right"><a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a><a href="${SITE.signIn}">Members Sign In</a></div>
  </div></div>
  <header class="header" id="top"><div class="wrap header__inner">
    <a class="brand" href="${ROOT}" aria-label="CVMA MI 35-3 home">
      <img class="brand__logo" src="${url(SITE.logo)}" alt="" onerror="this.remove()">
      <span class="brand__text"><span class="brand__name">${SITE.name}</span><span class="brand__sub">${SITE.tagline}</span></span>
    </a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span><span></span></button>
    <nav class="nav" id="nav" aria-label="Main">
      <ul class="nav__list">${MENU.map(item).join('')}</ul>
      <a class="btn btn--gold nav__cta" href="${url(SITE.joinButton.href)}">${SITE.joinButton.label}</a>
    </nav>
  </div></header>`);

  const footerHTML = `
  <footer class="footer">
    <div class="wrap footer__grid">
      <div class="footer__brand">
        <p class="brand__name">${SITE.name}</p>
        <p>${SITE.tagline}<br>${SITE.location}</p>
        <p><a href="tel:${tel}">${SITE.phone}</a><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      </div>
      ${FOOTER.map((col) => `<div><h4>${esc(col.title)}</h4><ul>${
        col.links.map((l) => `<li><a href="${url(l.href)}"${ext(l.href)}>${esc(l.label)}</a></li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="wrap footer__legal">
      <p>© ${new Date().getFullYear()} ${SITE.name} · ${SITE.legal}</p>
      <a href="#top">Back to top ↑</a>
    </div>
  </footer>`;

  // Footer goes wherever <div data-site-footer></div> sits (end of each page)
  const placeFooter = () => { const slot = document.querySelector('[data-site-footer]'); if (slot) slot.outerHTML = footerHTML; };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', placeFooter);
  else placeFooter();
})();
