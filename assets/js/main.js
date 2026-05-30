(function () {
  'use strict';

  // ── Mobile nav toggle ────────────────────────────────
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');

  if (toggle && menu) {
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
  }

  // ── Search overlay open / close ──────────────────────
  var searchBtn = document.getElementById('searchBtn');
  var overlay   = document.getElementById('searchOverlay');
  var input     = document.getElementById('searchInput');
  var closeBtn  = document.getElementById('searchClose');

  if (!searchBtn || !overlay) return;

  function openSearch() {
    overlay.classList.remove('hidden');
    var results = document.getElementById('searchResults');
    if (results) results.innerHTML = '';
    if (input) {
      input.value = '';
      setTimeout(function () { input.focus(); }, 50);
    }
  }

  function closeSearch() {
    overlay.classList.add('hidden');
  }

  searchBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
})();
