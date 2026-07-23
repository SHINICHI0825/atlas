/**
 * Fetches the canonical brand SVG referenced by each [data-brand-logo] element's
 * data-src attribute and inlines it, so the logo shape/paths always come from a
 * single source file. Requires http(s) (fetch cannot read local files via file://).
 */
(function () {
  async function loadBrandLogo(mount) {
    var url = mount.getAttribute('data-src');
    if (!url) return;
    try {
      var res = await fetch(url);
      if (!res.ok) throw new Error('brand-loader: ' + url + ' -> ' + res.status);
      mount.innerHTML = await res.text();
    } catch (err) {
      console.error(err);
    }
  }

  function init() {
    document.querySelectorAll('[data-brand-logo]').forEach(loadBrandLogo);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
