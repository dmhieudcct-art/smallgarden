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

  // window.load fires after all deferred scripts (incl. pagefind-ui.js) have run.
  // This guarantees PagefindUI is defined before we call it.
  window.addEventListener('load', function () {
    if (typeof PagefindUI === 'undefined') return;
    new PagefindUI({ element: '#pfSearch', showImages: false, showSubResults: false });

    // Deduplicate results by URL: watch for DOM changes and remove any
    // result whose href has already been seen in the current result set.
    var pfSearch = document.getElementById('pfSearch');
    if (!pfSearch) return;
    var observer = new MutationObserver(function () {
      var seen = {};
      pfSearch.querySelectorAll('.pagefind-ui__result').forEach(function (el) {
        var a = el.querySelector('a[href]');
        if (!a) return;
        var url = a.getAttribute('href');
        if (seen[url]) {
          el.parentNode.removeChild(el);
        } else {
          seen[url] = true;
        }
      });
    });
    observer.observe(pfSearch, { childList: true, subtree: true });
  });

  function openSearch() {
    pfOverlay.style.display = 'block';
    setTimeout(function () {
      var inp = document.querySelector('#pfSearch input');
      if (inp) inp.focus();
    }, 60);
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

  pfOverlay.addEventListener('click', function (e) {
    if (e.target === pfOverlay) closeSearch();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
  });

})();
