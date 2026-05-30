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
  var searchBtn     = document.getElementById('searchBtn');
  var searchBox     = document.getElementById('searchBox');
  var searchInput   = document.getElementById('searchInput');
  var searchResults = document.getElementById('searchResults');

  if (!searchBtn || !searchBox || !searchInput || !searchResults) return;

  var posts = window.SEARCH_POSTS || [];

  function showBox() {
    searchBox.style.display = 'block';
    searchInput.value = '';
    searchResults.innerHTML = '';
    searchInput.focus();
  }

  function hideBox() {
    searchBox.style.display = 'none';
  }

  function doSearch() {
    var q = searchInput.value.trim().toLowerCase();
    if (!q) { searchResults.innerHTML = ''; return; }

    var hits = posts.filter(function (p) {
      return p.title.toLowerCase().indexOf(q) >= 0 ||
             (p.excerpt && p.excerpt.toLowerCase().indexOf(q) >= 0);
    });

    if (!hits.length) {
      searchResults.innerHTML =
        '<p style="padding:10px 16px;color:#73777e;font-size:14px;font-family:sans-serif;">No results.</p>';
      return;
    }

    searchResults.innerHTML = hits.slice(0, 8).map(function (p) {
      var t = p.title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return '<a href="' + p.url + '"'
        + ' style="display:block;padding:10px 16px;text-decoration:none;'
        + 'border-top:1px solid #e7e8e9;color:#2D5A27;'
        + 'font-size:15px;font-family:Lora,serif;font-weight:500;"'
        + ' onmouseover="this.style.background=\'#f3f4f5\'"'
        + ' onmouseout="this.style.background=\'\'">'
        + t + '</a>';
    }).join('');
  }

  /* Toggle on button click */
  searchBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (searchBox.style.display === 'block') {
      hideBox();
    } else {
      showBox();
    }
  });

  /* Filter as user types */
  searchInput.addEventListener('input', doSearch);

  /* Close on outside click */
  document.addEventListener('click', function (e) {
    if (!searchBtn.contains(e.target) && !searchBox.contains(e.target)) {
      hideBox();
    }
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideBox();
  });

})();
