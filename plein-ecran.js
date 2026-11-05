/* =========================================================================
   plein-ecran.js - le bouton plein écran, commun à toutes les pages
   -------------------------------------------------------------------------
   Dans la coquille (jeu.html), c'est la coquille qui passe en plein écran,
   pas la page : le plein écran survit ainsi au passage d'une partie à
   l'autre. Ouverte seule, la page passe elle-même en plein écran, comme
   avant. iPhone : pas de plein écran possible, le bouton est masqué.
   ========================================================================= */
(function () {
  var b = document.getElementById('fs-btn');
  if (!b) return;
  var agrandir = document.getElementById('fse') || document.getElementById('fs-icon-expand');
  var reduire  = document.getElementById('fss') || document.getElementById('fs-icon-shrink');

  var D = document;
  if (window.name === 'rc-coquille') {
    try { if (window.parent.document) D = window.parent.document; } catch (e) { D = document; }
  }
  var el = D.documentElement;
  var rq = el.requestFullscreen || el.webkitRequestFullscreen;
  var ex = D.exitFullscreen || D.webkitExitFullscreen;
  if (!rq) { b.style.display = 'none'; return; }

  function actif() { return !!(D.fullscreenElement || D.webkitFullscreenElement); }
  function maj() {
    var f = actif();
    if (agrandir) agrandir.style.display = f ? 'none' : '';
    if (reduire)  reduire.style.display  = f ? '' : 'none';
  }
  b.addEventListener('click', function () {
    if (!actif()) {
      var r = rq.call(el);
      if (r && r.catch) r.catch(function () {});
    } else if (ex) ex.call(D);
  });
  D.addEventListener('fullscreenchange', maj);
  D.addEventListener('webkitfullscreenchange', maj);
  // La page s'en va, la coquille reste : on ne laisse pas d'écouteur derrière.
  window.addEventListener('pagehide', function () {
    D.removeEventListener('fullscreenchange', maj);
    D.removeEventListener('webkitfullscreenchange', maj);
  });
  maj();
})();
