/* =========================================================================
   coquille.js - envoie chaque page du jeu dans jeu.html
   -------------------------------------------------------------------------
   Chargé en tout premier dans chaque page. Si la page est ouverte seule (et
   non dans le cadre de jeu.html), elle se rouvre dans la coquille, qui garde
   le plein écran d'une partie à l'autre. Le cadre de la coquille s'appelle
   « rc-coquille » : on le reconnaît à son nom, sans rien lire de la page
   parente (ce qui échoue en local, en file://).
   ?nocoquille dans l'adresse : la page s'ouvre seule, comme avant.
   ========================================================================= */
(function () {
  if (window.name === 'rc-coquille') return;
  if (/[?&]nocoquille\b/.test(location.search)) return;
  var page = location.pathname.split('/').pop() || 'index.html';
  if (!/\.html$/.test(page)) page = 'index.html';
  location.replace('jeu.html?p=' + encodeURIComponent(page + location.search + location.hash));
})();
