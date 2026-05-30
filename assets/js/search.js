(function () {
  'use strict';

  var overlay  = document.getElementById('searchOverlay');
  var input    = document.getElementById('searchInput');
  var results  = document.getElementById('searchResults');

  if (!overlay || !input || typeof lunr === 'undefined') return;

  var lang     = overlay.getAttribute('data-lang') || 'en';
  var indexUrl = overlay.getAttribute('data-search-index');

  var store = {};   // url → post object
  var idx   = null; // lunr index for current lang

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  fetch(indexUrl)
    .then(function (r) { return r.json(); })
    .then(function (posts) {
      var langPosts = posts.filter(function (p) { return (p.lang || 'en') === lang; });

      langPosts.forEach(function (p) { store[p.url] = p; });

      idx = lunr(function () {
        // Disable stemmer for Vietnamese so diacritics are preserved as-is
        if (lang === 'vi') {
          this.pipeline.remove(lunr.stemmer);
          this.searchPipeline.remove(lunr.stemmer);
        }

        this.ref('url');
        this.field('title',      { boost: 10 });
        this.field('excerpt',    { boost: 5  });
        this.field('categories', { boost: 3  });
        this.field('content');

        langPosts.forEach(function (p) {
          this.add({
            url:        p.url,
            title:      p.title      || '',
            excerpt:    p.excerpt    || '',
            categories: p.categories || '',
            content:    p.content    || ''
          });
        }, this);
      });
    })
    .catch(function (err) { console.warn('Lunr: failed to load search index', err); });

  function renderResults(query) {
    var q = query.trim();
    if (!q) { results.innerHTML = ''; return; }

    if (!idx) {
      results.innerHTML =
        '<p style="padding:1rem 1.25rem;color:#73777e;font-size:15px;">Loading index…</p>';
      return;
    }

    var hits;
    try       { hits = idx.search(q); }
    catch (e) { try { hits = idx.search(q + '*'); } catch (e2) { hits = []; } }

    if (!hits.length) {
      results.innerHTML =
        '<p style="padding:1rem 1.25rem;color:#73777e;font-size:15px;">No results found.</p>';
      return;
    }

    results.innerHTML = hits.slice(0, 10).map(function (hit) {
      var p = store[hit.ref];
      if (!p) return '';
      var snippet = p.excerpt ? escHtml(p.excerpt.substring(0, 130)) + '…' : '';
      return (
        '<a href="' + escHtml(p.url) + '"' +
        ' style="display:block;padding:0.75rem 1.25rem;text-decoration:none;' +
        'border-bottom:1px solid #e7e8e9;transition:background 0.15s;"' +
        ' onmouseover="this.style.background=\'#f3f4f5\'"' +
        ' onmouseout="this.style.background=\'\'">' +
        '<div style="display:flex;align-items:center;gap:10px;">' +
        '<span class="material-symbols-outlined" style="font-size:18px;color:#73777e;flex-shrink:0;">article</span>' +
        '<span style="font-size:17px;font-family:\'Lora\',serif;color:#2D5A27;font-weight:500;">' +
        escHtml(p.title) + '</span></div>' +
        (snippet
          ? '<p style="margin:4px 0 0 28px;font-size:13px;color:#73777e;line-height:1.5;">' +
            snippet + '</p>'
          : '') +
        '</a>'
      );
    }).join('');
  }

  input.addEventListener('input', function () { renderResults(this.value); });
})();
