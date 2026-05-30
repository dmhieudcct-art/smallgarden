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

  // ── Search ───────────────────────────────────────────
  var searchBtn  = document.getElementById('searchBtn');
  var overlay    = document.getElementById('searchOverlay');
  var input      = document.getElementById('searchInput');
  var results    = document.getElementById('searchResults');
  var closeBtn   = document.getElementById('searchClose');
  var posts      = window.__posts || [];

  if (!searchBtn || !overlay) return;

  function escHtml(s) {
    return s.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
  }

  function openSearch() {
    overlay.classList.remove('hidden');
    input.value = '';
    results.innerHTML = '';
    setTimeout(function () { input.focus(); }, 50);
  }

  function closeSearch() {
    overlay.classList.add('hidden');
  }

  function renderResults(query) {
    var q = query.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }

    var hits = posts.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) !== -1;
    });

    if (!hits.length) {
      results.innerHTML =
        '<p style="padding:1rem 1.25rem;font-size:15px;color:#73777e;">No results found.</p>';
      return;
    }

    results.innerHTML = hits.map(function (p) {
      return (
        '<a href="' + escHtml(p.url) + '"' +
        ' style="display:flex;align-items:center;gap:12px;padding:0.75rem 1.25rem;' +
        'text-decoration:none;color:#191c1d;transition:background 0.15s;"' +
        ' onmouseover="this.style.background=\'#f3f4f5\'"' +
        ' onmouseout="this.style.background=\'\'">' +
        '<span class="material-symbols-outlined" style="font-size:18px;color:#73777e;flex-shrink:0;">article</span>' +
        '<span style="font-size:17px;font-family:\'Lora\',serif;">' + escHtml(p.title) + '</span>' +
        '</a>'
      );
    }).join('');
  }

  searchBtn.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);
  input.addEventListener('input', function () { renderResults(this.value); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });
})();
