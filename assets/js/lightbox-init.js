(function () {
  function init() {
    if (!window.GLightbox) return;
    // avoid double-init: remove existing instances by recreating on each pjax:end is OK
    window.__sqLightbox = GLightbox({ selector: '.glightbox' });
  }

  window.addEventListener('load', init);
  document.addEventListener('pjax:end', init);
})();
