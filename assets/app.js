// Mobile menu
(() => {
  const btn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-menu]');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });

  // close menu on link click (mobile)
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  });
})();

// FAQ tabs (filter accordion by category)
(() => {
  const tabs = Array.from(document.querySelectorAll('[data-tab]'));
  const items = Array.from(document.querySelectorAll('.accItem'));
  if (!tabs.length || !items.length) return;

  function setActive(tabName) {
    tabs.forEach(t => {
      const on = t.dataset.tab === tabName;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', String(on));
    });

    // show items that match cat; if none match, show all
    const hasMatch = items.some(it => (it.dataset.cat || it.getAttribute('data-cat')) === tabName);
    items.forEach(it => {
      const cat = it.getAttribute('data-cat');
      it.style.display = (!hasMatch || cat === tabName) ? '' : 'none';
    });
  }

  tabs.forEach(t => t.addEventListener('click', () => setActive(t.dataset.tab)));
  setActive('general');
})();

// Accordion
(() => {
  const acc = document.querySelector('[data-acc]');
  if (!acc) return;

  acc.addEventListener('click', (e) => {
    const btn = e.target.closest('.accBtn');
    if (!btn) return;
    const item = btn.closest('.accItem');
    const isOpen = item.classList.contains('is-open');

    // close all
    acc.querySelectorAll('.accItem').forEach(i => {
      i.classList.remove('is-open');
      const icon = i.querySelector('.accIcon');
      if (icon) icon.textContent = '+';
    });

    // open clicked if it was closed
    if (!isOpen) {
      item.classList.add('is-open');
      const icon = item.querySelector('.accIcon');
      if (icon) icon.textContent = '–';
    }
  });
})();

// Testimonials carousel (scroll track)
(() => {
  const track = document.querySelector('[data-track]');
  const prev = document.querySelector('[data-prev]');
  const next = document.querySelector('[data-next]');
  const dots = Array.from(document.querySelectorAll('[data-dots] .d'));
  if (!track || !prev || !next) return;

  function cardWidth() {
    const first = track.querySelector('.testCard');
    if (!first) return 320;
    const rect = first.getBoundingClientRect();
    return rect.width + 16; // + gap
  }

  function updateDots() {
    if (!dots.length) return;
    const w = cardWidth();
    const idx = Math.round(track.scrollLeft / w);
    dots.forEach((d, i) => d.classList.toggle('is-on', i === Math.min(i, idx)));
    // keep safe:
    dots.forEach((d,i)=>d.classList.toggle('is-on', i===Math.min(idx,dots.length-1)));
  }

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    setTimeout(updateDots, 220);
  });

  next.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    setTimeout(updateDots, 220);
  });

  track.addEventListener('scroll', () => requestAnimationFrame(updateDots));
  updateDots();
})();
