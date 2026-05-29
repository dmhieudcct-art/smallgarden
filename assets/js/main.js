(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', function (e) {
    if (
      menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();
