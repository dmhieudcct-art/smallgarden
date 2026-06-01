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

  /* ── Post-page language switcher ───────────────────────── */
  var langSwitch   = document.getElementById('langSwitch');
  var langModal    = document.getElementById('langModal');
  var langModalMsg = document.getElementById('langModalMsg');

  function closeLangModal() {
    if (langModal) langModal.style.display = 'none';
  }

  function showLangModal(targetLang) {
    if (!langModal || !langModalMsg) return;
    langModalMsg.textContent = targetLang === 'vi'
      ? 'Chưa có bài viết tương ứng cho ngôn ngữ bạn chọn'
      : 'No corresponding post available in your selected language';
    langModal.style.display = 'flex';
  }

  if (langModal) {
    langModal.addEventListener('click', function (e) {
      if (e.target === langModal) closeLangModal();
    });
  }

  if (langSwitch) {
    langSwitch.addEventListener('click', function () {
      var path = window.location.pathname;
      var targetPath, targetLang;
      if (path.indexOf('/vi/') !== -1) {
        targetPath = path.replace('/vi/', '/en/');
        targetLang = 'en';
      } else if (path.indexOf('/en/') !== -1) {
        targetPath = path.replace('/en/', '/vi/');
        targetLang = 'vi';
      } else {
        return;
      }
      fetch(targetPath, { method: 'HEAD' })
        .then(function (res) {
          if (res.ok) {
            window.location.href = targetPath;
          } else {
            showLangModal(targetLang);
          }
        })
        .catch(function () {
          showLangModal(targetLang);
        });
    });
  }


  /* ── Related posts slider ───────────────────────────────────────���──────── */
  var relatedSlider = document.getElementById('relatedSlider');
  var sliderPrev    = document.getElementById('sliderPrev');
  var sliderNext    = document.getElementById('sliderNext');

  if (relatedSlider && sliderPrev && sliderNext) {

    function scrollAmt() { return relatedSlider.clientWidth; }

    function syncSliderBtns() {
      sliderPrev.style.opacity = relatedSlider.scrollLeft <= 2 ? '0.35' : '1';
      sliderNext.style.opacity = relatedSlider.scrollLeft + relatedSlider.clientWidth >= relatedSlider.scrollWidth - 2 ? '0.35' : '1';
    }

    sliderPrev.addEventListener('click', function () {
      relatedSlider.scrollBy({ left: -scrollAmt(), behavior: 'smooth' });
    });

    sliderNext.addEventListener('click', function () {
      relatedSlider.scrollBy({ left: scrollAmt(), behavior: 'smooth' });
    });

    relatedSlider.addEventListener('scroll', syncSliderBtns);
    syncSliderBtns();
  }

})();
