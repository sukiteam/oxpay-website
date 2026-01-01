(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';

  // Active nav highlight
  document.querySelectorAll('.nav__link').forEach(a => {
    const page = a.getAttribute('data-page');
    if (page === path) a.classList.add('is-active');
  });

  // Mobile nav toggle
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close menu after click on a link
    nav.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.matches && t.matches('a.nav__link')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
})();
