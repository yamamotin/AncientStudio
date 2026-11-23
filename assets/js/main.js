/* Language switch (EN / PT-BR) and footer year. No dependencies. */
(function () {
  'use strict';

  var STORAGE_KEY = 'eron-language';
  var blocks = document.querySelectorAll('[data-lang-content]');
  var buttons = document.querySelectorAll('[data-lang-button]');

  function applyLanguage(value) {
    var lang = value === 'pt-BR' ? 'pt-BR' : 'en';

    blocks.forEach(function (block) {
      block.hidden = block.getAttribute('data-lang-content') !== lang;
    });
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-lang-button') === lang));
    });
    document.documentElement.lang = lang;
  }

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    /* localStorage can be unavailable on file:// in some browsers; English stays the default. */
  }
  applyLanguage(saved);

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var lang = button.getAttribute('data-lang-button') === 'pt-BR' ? 'pt-BR' : 'en';
      applyLanguage(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (error) {
        /* Switching still works for this page view without storage. */
      }
    });
  });

  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
