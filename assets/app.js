(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav__link').forEach(a => {
    if (a.getAttribute('data-page') === path) a.classList.add('is-active');
  });

  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
})();
