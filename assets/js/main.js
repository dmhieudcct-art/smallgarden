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

  /* ── Search ────────────────────────────────────────── */
  var btn     = document.getElementById('searchBtn');
  var panel   = document.getElementById('searchPanel');
  var input   = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var closeBtn = document.getElementById('searchClose');

  // Bail out if any required element is missing
  if (!btn || !panel || !input || !results || !closeBtn) return;

  var posts = window.SEARCH_POSTS || [];

  function openPanel() {
    panel.style.display = 'block';
    input.value = '';
    results.innerHTML = '';
    input.focus();
  }

  function closePanel() {
    panel.style.display = 'none';
  }

  function runSearch() {
    var q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }

    var hits = posts.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) >= 0 ||
             (p.excerpt && p.excerpt.toLowerCase().indexOf(q) >= 0);
    });

    if (!hits.length) {
      results.innerHTML =
        '<p style="padding:12px 18px;color:#73777e;font-size:15px;font-family:sans-serif;">No results.</p>';
      return;
    }

    results.innerHTML = hits.slice(0, 10).map(function (p) {
      var title = p.title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      var url = p.url.replace(/"/g, '%22');
      return '<a href="' + url + '"' +
        ' style="display:block;padding:11px 18px;text-decoration:none;' +
        'border-bottom:1px solid #e7e8e9;color:#2D5A27;' +
        'font-size:16px;font-family:\'Lora\',serif;font-weight:500;"' +
        ' onmouseover="this.style.background=\'#f3f4f5\'"' +
        ' onmouseout="this.style.background=\'\'">' +
        title + '</a>';
    }).join('');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (panel.style.display === 'none' || panel.style.display === '') {
      openPanel();
    } else {
      closePanel();
    }
  });

  closeBtn.addEventListener('click', closePanel);
  input.addEventListener('input', runSearch);

  // Close when clicking the dark backdrop (not the card itself)
  panel.addEventListener('click', function (e) {
    if (e.target === panel) closePanel();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
  });

})();
