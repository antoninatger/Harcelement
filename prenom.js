/* =========================================================================
   prenom.js - le joueur choisit Léo ou Léa
   -------------------------------------------------------------------------
   Le héros s'appelait Léo, point. Ici, le prénom se choisit sur le menu et
   se propage aux quatre parties. Le prénom seul ne suffit pas en français :
   « je suis inquiet », « un ami de Clara », « je suis allé trop vite »
   s'accordent. Les textes portent donc deux marques :

       inquiet{e}        → « inquiet »      ou « inquiète »… non : « inquiet » + « e »
       {doux|douce}      → la forme masculine, ou la féminine

   Rien à faire ailleurs : ce fichier est chargé juste après le fichier de
   textes de chaque partie, il réécrit les chaînes sur place, puis repasse
   sur le HTML statique une fois la page construite.
   ========================================================================= */
(function (global) {
  'use strict';

  var DEFAUT = 'Léo';
  var prenom = DEFAUT;
  try { prenom = localStorage.getItem('rc_prenom') || DEFAUT; } catch (e) {}
  if (prenom !== 'Léo' && prenom !== 'Léa') prenom = DEFAUT;
  var fem = (prenom === 'Léa');

  function texte(s) {
    if (typeof s !== 'string') return s;
    return s
      .replace(/\{([^{}|]*)\|([^{}]*)\}/g, function (m, a, b) { return fem ? b : a; })
      .replace(/\{e\}/g, fem ? 'e' : '')
      .replace(/Léo/g, prenom);
  }

  /* Réécrit toutes les chaînes d'un objet, en place. */
  function parcourir(obj, vus) {
    vus = vus || [];
    if (!obj || typeof obj !== 'object') return obj;
    if (vus.indexOf(obj) !== -1) return obj;
    vus.push(obj);
    Object.keys(obj).forEach(function (k) {
      var v = obj[k];
      if (typeof v === 'string') obj[k] = texte(v);
      else if (v && typeof v === 'object') parcourir(v, vus);
    });
    return obj;
  }

  /* Le HTML statique (écrans d'intro, titres) passe par les nœuds de texte. */
  function parcourirDOM(racine) {
    var n = document.createTreeWalker(racine || document.body, NodeFilter.SHOW_TEXT, null);
    var noeud, aFaire = [];
    while ((noeud = n.nextNode())) {
      if (/Léo|\{e\}|\{[^{}|]*\|[^{}]*\}/.test(noeud.nodeValue)) aFaire.push(noeud);
    }
    aFaire.forEach(function (t) { t.nodeValue = texte(t.nodeValue); });
  }

  ['TEXTES', 'WA_DATA', 'UI'].forEach(function (nom) {
    if (global[nom] && typeof global[nom] === 'object') parcourir(global[nom]);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { parcourirDOM(); });
  } else {
    parcourirDOM();
  }

  global.RC_PRENOM = prenom;
  global.RC_FEM = fem;
  global.rcTexte = texte;
  global.rcChoisir = function (p) {
    try { localStorage.setItem('rc_prenom', p === 'Léa' ? 'Léa' : 'Léo'); } catch (e) {}
  };
})(window);
