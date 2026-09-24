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
  const cd = document.querySelector('.countdown[data-target]');
  if (cd && cd.querySelector('.timer')) {
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

// Inner-page helpers
(() => {
  // Highlight current page in nav
  const here = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav a[href^="/"]').forEach((a) => {
    const href = a.getAttribute('href').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (href === here) {
      a.setAttribute('aria-current', 'page');
      a.closest('.has-menu')?.querySelector('.nav__link').setAttribute('aria-current', 'page');
    }
  });

  // Events: items with data-date (YYYY-MM-DD) move to "Past events" once the day is over
  const upcoming = document.querySelector('[data-events="upcoming"]');
  const past = document.querySelector('[data-events="past"]');
  if (upcoming && past) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const items = [...upcoming.querySelectorAll('.event[data-date]')];
    items.forEach((ev) => {
      const d = new Date(`${ev.dataset.date}T23:59:59`);
      if (d < today) { ev.classList.add('is-past'); past.prepend(ev); }
    });
    const sortBy = (list, dir) => [...list.querySelectorAll('.event')]
      .sort((a, b) => dir * ((a.dataset.date || '9999').localeCompare(b.dataset.date || '9999')))
      .forEach((e) => list.appendChild(e));
    sortBy(upcoming, 1); sortBy(past, -1);
    [upcoming, past].forEach((l) => l.querySelector('.events__empty')?.toggleAttribute('hidden', !!l.querySelector('.event')));
    past.closest('section')?.toggleAttribute('hidden', !past.querySelector('.event'));
  }

  // Lightbox for .gallery links
  const links = [...document.querySelectorAll('.gallery a')];
  if (!links.length) return;
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<img alt=""><button class="lightbox__close" aria-label="Close">×</button><button class="lightbox__prev" aria-label="Previous">‹</button><button class="lightbox__next" aria-label="Next">›</button>';
  document.body.appendChild(box);
  const img = box.querySelector('img');
  let i = 0;
  const show = (n) => { i = (n + links.length) % links.length; img.src = links[i].href; img.alt = links[i].querySelector('img')?.alt || ''; };
  const close = () => { box.classList.remove('open'); document.body.style.overflow = ''; };
  links.forEach((a, n) => a.addEventListener('click', (e) => { e.preventDefault(); show(n); box.classList.add('open'); document.body.style.overflow = 'hidden'; box.querySelector('.lightbox__close').focus(); }));
  box.querySelector('.lightbox__close').onclick = close;
  box.querySelector('.lightbox__prev').onclick = () => show(i - 1);
  box.querySelector('.lightbox__next').onclick = () => show(i + 1);
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();
