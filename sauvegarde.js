/* =========================================================================
   sauvegarde.js - un seul code pour tout le jeu
   -------------------------------------------------------------------------
   Les quatre parties sont des pages séparées et rangeaient leur avancement
   dans le localStorage du navigateur : impossible de reprendre ailleurs. La
   Partie 4 avait bien un code, mais elle seule, et sur quatre caractères.

   Ici, tout l'état tient dans 31 bits, écrits en base 36 : six caractères
   plus une somme de contrôle. Le code se suffit à lui-même - il marche d'un
   navigateur à l'autre, d'un appareil à l'autre, rien n'est stocké ailleurs.

     bit  0      Partie 1 vue
     bits 1-2    Partie 3 : 0 non faite, 1 faite, 2 numéro de la tante obtenu
     bits 3-11   les neuf types de harcèlement identifiés (Partie 2)
     bits 12-16  les cinq comptes anonymes démasqués (Partie 3)
     bits 17-20  empathie 0-10        (Partie 4)
     bits 21-24  scène en cours 0-15  (Partie 4)
     bits 25-28  confiance de la tante 0-10
     bits 29-30  maladresses envers la tante 0-2
   ========================================================================= */
(function (global) {
  'use strict';

  var TYPES = ['body_shaming','menaces','rumeurs','exclusion','diffusion_images',
               'manipulation','sextorsion','sexiste','scolaire'];
  var COMPTES = ['utilisateur_4729','_noreply_ghost_','anonymous_x0',
                 'vrai_info_colleg','jevoustrouve'];

  function lire(cle, defaut) {
    try { var v = localStorage.getItem(cle); return v === null ? defaut : v; }
    catch (e) { return defaut; }
  }
  function ecrire(cle, valeur) {
    try { if (valeur === null) localStorage.removeItem(cle); else localStorage.setItem(cle, valeur); }
    catch (e) {}
  }
  function json(cle, defaut) {
    try { return JSON.parse(lire(cle, null)) || defaut; } catch (e) { return defaut; }
  }
  function borne(n, max) { n = parseInt(n, 10); return (isNaN(n) || n < 0) ? 0 : Math.min(n, max); }

  /* ---------- lecture de l'état ---------- */
  function etat() {
    var p4 = json('rc_p4', {});
    return {
      p1:       lire('rc_p1_visited', null) ? 1 : 0,
      p3:       borne(lire('rc_p3_done', 0), 2),
      types:    json('rc_types', []),
      comptes:  Object.keys(json('rc_comptes', {})),
      empathy:  borne(p4.e, 10),
      scene:    borne(p4.s, 15),
      aunt:     borne(p4.a, 10),
      strikes:  borne(p4.k, 2)
    };
  }

  /* ---------- code ---------- */
  function encoder() {
    var e = etat(), v = 0;
    v |= e.p1;
    v |= e.p3 << 1;
    TYPES.forEach(function (t, i) { if (e.types.indexOf(t) !== -1) v |= 1 << (3 + i); });
    COMPTES.forEach(function (c, i) { if (e.comptes.indexOf(c) !== -1) v |= 1 << (12 + i); });
    v |= e.empathy << 17;
    v |= e.scene   << 21;
    v |= e.aunt    << 25;
    v |= e.strikes << 29;
    v = v >>> 0;
    var b36 = v.toString(36).toUpperCase();
    while (b36.length < 6) b36 = '0' + b36;
    var somme = 0;
    for (var i = 0; i < b36.length; i++) somme += b36.charCodeAt(i);
    return b36 + (somme % 36).toString(36).toUpperCase();
  }

  function decoder(brut) {
    var code = String(brut || '').trim().toUpperCase().replace(/[\s-]/g, '');
    if (!/^[0-9A-Z]{7}$/.test(code)) return null;
    var b36 = code.slice(0, 6), chk = parseInt(code[6], 36);
    var somme = 0;
    for (var i = 0; i < 6; i++) somme += b36.charCodeAt(i);
    if (isNaN(chk) || somme % 36 !== chk) return null;
    var v = parseInt(b36, 36);
    if (isNaN(v)) return null;
    var e = {
      p1:      v & 1,
      p3:      (v >> 1) & 3,
      types:   TYPES.filter(function (t, i) { return (v >> (3 + i)) & 1; }),
      comptes: COMPTES.filter(function (c, i) { return (v >> (12 + i)) & 1; }),
      empathy: (v >> 17) & 15,
      scene:   (v >> 21) & 15,
      aunt:    (v >> 25) & 15,
      strikes: (v >> 29) & 3
    };
    if (e.p3 > 2 || e.empathy > 10 || e.aunt > 10 || e.strikes > 2) return null;
    return e;
  }

  /* ---------- application ---------- */
  var QUI = { utilisateur_4729:'Enzo', _noreply_ghost_:'Jade',
              anonymous_x0:'Enzo et Théo', vrai_info_colleg:'Jade', jevoustrouve:'Théo' };

  function appliquer(e) {
    if (!e) return false;
    ecrire('rc_p1_visited', e.p1 ? '1' : null);
    ecrire('rc_p3_done', e.p3 ? String(e.p3) : null);
    ecrire('rc_types', JSON.stringify(e.types));
    var c = {};
    e.comptes.forEach(function (h) { c[h] = QUI[h] || '?'; });
    ecrire('rc_comptes', JSON.stringify(c));
    ecrire('rc_p4', JSON.stringify({ e: e.empathy, s: e.scene, a: e.aunt, k: e.strikes }));
    return true;
  }

  function effacer() {
    ['rc_p1_visited','rc_p3_done','rc_types','rc_comptes','rc_p4','rc_fin','rc_remarques']
      .forEach(function (k) { ecrire(k, null); });
    try { sessionStorage.clear(); } catch (e) {}
  }

  global.Sauvegarde = {
    code: encoder,
    lire: decoder,
    reprendre: function (brut) { return appliquer(decoder(brut)); },
    etat: etat,
    effacer: effacer,
    TYPES: TYPES,
    COMPTES: COMPTES,
    QUI: QUI
  };
})(window);
