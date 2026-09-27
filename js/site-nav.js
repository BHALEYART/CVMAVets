/* =========================================================
   CVMA MI 35-10 — SITE-WIDE HEADER, MENU & FOOTER
   This is the ONE place to change navigation, contact info
   and footer links. Every page loads this file.

   Links are written from the site root WITHOUT a leading slash:
     'gallery/'  ->  the Gallery page
     ''          ->  Home
   Full URLs (https://…) are used as-is and open in a new tab.
   ========================================================= */

const SITE = {
  name: 'CVMA<sup>®</sup> MI 35-10',
  tagline: 'Combat Veterans Motorcycle Association',
  location: 'Michigan',
  phone: '',                               // e.g. '555-555-5555' — shows "Phone: TBA" while empty
  email: '',                               // e.g. 'info@cvmami35-10.org' — shows "Email: TBA" while empty
  facebook: 'https://www.facebook.com/profile.php?id=61577806524375',
  website: 'https://cvmami35-10.org/',
  logo: 'assets/img/logo.png',            // optional — hidden if the file is missing
  joinButton: { label: 'Join', href: 'become-a-member/' },
  legal: 'IRS 501(c)(19) Tax Exempt Organization',
};

// Top menu. Items with `children` become dropdowns.
const MENU = [
  { label: 'About Us', children: [
    { label: 'Command and Staff', href: 'command-and-staff/' },
    { label: 'CVMA Chapter 35-10', href: 'cvma-chapter-35-10/' },
    { label: 'Combat Vets Auxiliary', href: 'combat-vets-auxiliary/' },
  ]},
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
  ]},
];

// Footer link columns.
const FOOTER = [
  { title: 'About', links: [
    { label: 'Command and Staff', href: 'command-and-staff/' },
    { label: 'CVMA Chapter 35-10', href: 'cvma-chapter-35-10/' },
    { label: 'Combat Vets Auxiliary', href: 'combat-vets-auxiliary/' },
    { label: 'Become a Member', href: 'become-a-member/' },
  ]},
  { title: 'Support', links: [
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
  const phoneHTML = SITE.phone ? `<a href="tel:${tel}">${SITE.phone}</a>` : '<span class="tba">Phone: TBA</span>';
  const emailHTML = SITE.email ? `<a href="mailto:${SITE.email}">${SITE.email}</a>` : '<span class="tba">Email: TBA</span>';

  // Missing photo -> striped "Photo coming soon" placeholder (pages use onerror="cvmaPh(this)")
  window.cvmaPh = (img) => {
    const d = document.createElement('div');
    d.className = 'ph';
    d.setAttribute('role', 'img');
    d.setAttribute('aria-label', 'Photo coming soon');
    d.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3l2-2h6l2 2h3v12H4z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="13" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg><span>Photo coming soon</span>';
    (img.closest('.gallery a') || img).replaceWith(d);
  };

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
    <div class="utility__left">${phoneHTML}${emailHTML}</div>
    <div class="utility__right"><a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a></div>
  </div></div>
  <header class="header" id="top"><div class="wrap header__inner">
    <a class="brand" href="${ROOT}" aria-label="CVMA MI 35-10 home">
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
        <p>${phoneHTML}<br>${emailHTML}</p>
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
