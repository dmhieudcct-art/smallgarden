(function () {
  'use strict';

  /* ── Mobile nav toggle ─────────────────────────────── */
  var navToggle = document.getElementById('navToggle');
  var navMenu   = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ── Pagefind search ───────────────────────────────── */
  var searchBtn = document.getElementById('searchBtn');
  var pfOverlay = document.getElementById('pfOverlay');

  if (!searchBtn || !pfOverlay) return;

  // Initialise PagefindUI once (pagefind-ui.js is loaded via <head>)
  var pfReady = false;
  function initPagefind() {
    if (pfReady || typeof PagefindUI === 'undefined') return;
    new PagefindUI({
      element: '#pfSearch',
      showImages: false,
      resetStyles: false
    });
    pfReady = true;
  }

  function openSearch() {
    initPagefind();
    pfOverlay.style.display = 'block';
    // Focus the input Pagefind renders inside #pfSearch
    setTimeout(function () {
      var inp = pfOverlay.querySelector('input[type=text]');
      if (inp) inp.focus();
    }, 80);
  }

  function closeSearch() {
    pfOverlay.style.display = 'none';
  }

  searchBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (pfOverlay.style.display === 'block') {
      closeSearch();
    } else {
      openSearch();
    }
  });

  // Close on backdrop click (not on the search card itself)
  pfOverlay.addEventListener('click', function (e) {
    if (e.target === pfOverlay) closeSearch();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
  });

})();
