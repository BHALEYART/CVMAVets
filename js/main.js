// CVMA MI 35-3 — site behavior
(() => {
  const header = document.querySelector('.header');
  const nav = document.getElementById('nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobile = window.matchMedia('(max-width: 1120px)');

  // Mobile menu drawer sits right under the sticky header
  const setNavTop = () => {
    const r = header.getBoundingClientRect();
    document.documentElement.style.setProperty('--nav-top', `${r.bottom}px`);
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setNavTop();
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
  });

  // Dropdowns: click to open (desktop + mobile), hover on desktop
  const items = document.querySelectorAll('.has-menu');
  const closeAll = (except) => items.forEach((it) => {
    if (it === except) return;
    it.classList.remove('open');
    it.querySelector('.nav__link').setAttribute('aria-expanded', 'false');
  });

  items.forEach((item) => {
    const btn = item.querySelector('.nav__link');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !item.classList.contains('open');
      closeAll(item);
      item.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
    item.addEventListener('mouseenter', () => { if (!mobile.matches) { closeAll(item); item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); } });
    item.addEventListener('mouseleave', () => { if (!mobile.matches) { item.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  });

  document.addEventListener('click', (e) => { if (!nav.contains(e.target)) closeAll(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeAll();
    if (nav.classList.contains('open')) toggle.click();
  });
  mobile.addEventListener('change', () => { if (!mobile.matches && nav.classList.contains('open')) toggle.click(); });

  // Countdown — set data-target on .countdown to an ISO date, e.g. "2027-06-10T09:00:00-05:00"
  const cd = document.querySelector('.countdown');
  if (cd) {
    const timer = cd.querySelector('.timer');
    const target = Date.parse(cd.dataset.target || '');
    const el = (k) => timer.querySelector(`[data-${k}]`);
    const pad = (n) => String(n).padStart(2, '0');
    if (Number.isNaN(target)) {
      timer.classList.add('is-tba');
      ['d', 'h', 'm', 's'].forEach((k, i) => { el(k).textContent = ['Date', 'Coming', 'Soon', '—'][i]; });
    } else {
      const tick = () => {
        let t = Math.max(0, target - Date.now()) / 1000;
        const d = Math.floor(t / 86400); t -= d * 86400;
        const h = Math.floor(t / 3600); t -= h * 3600;
        const m = Math.floor(t / 60); const s = Math.floor(t - m * 60);
        el('d').textContent = d; el('h').textContent = pad(h); el('m').textContent = pad(m); el('s').textContent = pad(s);
      };
      tick(); setInterval(tick, 1000);
    }
  }

  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
