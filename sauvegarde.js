/* =========================================================================
   sauvegarde.js - un seul code pour tout le jeu
   -------------------------------------------------------------------------
   Les quatre parties sont des pages séparées et rangeaient leur avancement
   dans le localStorage du navigateur : impossible de reprendre ailleurs. La
   Partie 4 avait bien un code, mais elle seule, et sur quatre caractères.

   Ici, tout l'état tient dans six caractères en base 36, plus une somme de
   contrôle. Le code se suffit à lui-même - il marche d'un navigateur à
   l'autre, d'un appareil à l'autre, rien n'est stocké ailleurs.

   L'empaquetage se fait en base mixte et non en bits : les champs n'ont pas
   des tailles en puissances de deux (empathie 0-10, tante 0-10, scène 0-11),
   et le découpage en bits gaspillait justement la place qui manquait pour
   retenir la fin de la Partie 4. Le récapitulatif affichait alors « pas
   encore jouée jusqu'au bout » après une reprise sur un autre poste.

     Partie 1 vue                                   2 valeurs
     Partie 3 : 0 non faite, 1 faite, 2 numéro obtenu  3
     les neuf types de harcèlement (Partie 2)        512
     les cinq comptes démasqués (Partie 3)            32
     empathie 0-10 (Partie 4)                         11
     scène en cours 0-11 (Partie 4)                   12
     confiance de la tante 0-10                       11
     maladresses envers la tante 0-2                   3
     fin de la Partie 4 : aucune, good, ok, bad        4

   Le produit fait 1 712 848 896, sous les 36^6 = 2 176 782 336 disponibles.
   Ce format n'est pas celui de la version précédente : les codes émis avant
   ne sont plus valides.
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
      scene:    borne(p4.s, 11),
      aunt:     borne(p4.a, 10),
      strikes:  borne(p4.k, 2),
      fin:      lire('rc_fin', 'none')
    };
  }

  /* ---------- code ---------- */
  // Ordre significatif : l'encodage multiplie champ apres champ, le decodage
  // depile dans l'ordre inverse. Toute modification doit garder les deux
  // tables synchronisees.
  var CHAMPS = [
    { cle: 'p1',      base: 2   },
    { cle: 'p3',      base: 3   },
    { cle: 'types',   base: 512 },
    { cle: 'comptes', base: 32  },
    { cle: 'empathy', base: 11  },
    { cle: 'scene',   base: 12  },
    { cle: 'aunt',    base: 11  },
    { cle: 'strikes', base: 3   },
    { cle: 'fin',     base: 4   }
  ];
  var FINS = ['none', 'good', 'ok', 'bad'];

  function masque(liste, presents) {
    var m = 0;
    liste.forEach(function (x, i) { if (presents.indexOf(x) !== -1) m += 1 << i; });
    return m;
  }

  function encoder() {
    var e = etat();
    var brut = {
      p1: e.p1,
      p3: e.p3,
      types: masque(TYPES, e.types),
      comptes: masque(COMPTES, e.comptes),
      empathy: e.empathy,
      scene: e.scene,
      aunt: e.aunt,
      strikes: e.strikes,
      fin: Math.max(0, FINS.indexOf(e.fin))
    };
    var v = 0;
    CHAMPS.forEach(function (c) {
      var x = brut[c.cle];
      if (typeof x !== 'number' || isNaN(x) || x < 0) x = 0;
      v = v * c.base + Math.min(x, c.base - 1);
    });
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
    if (isNaN(v) || v < 0) return null;

    var vals = {};
    for (var j = CHAMPS.length - 1; j >= 0; j--) {
      vals[CHAMPS[j].cle] = v % CHAMPS[j].base;
      v = Math.floor(v / CHAMPS[j].base);
    }
    if (v !== 0) return null; // au-dela de ce que le format peut contenir

    var e = {
      p1:      vals.p1,
      p3:      vals.p3,
      types:   TYPES.filter(function (t, i) { return (vals.types >> i) & 1; }),
      comptes: COMPTES.filter(function (c, i) { return (vals.comptes >> i) & 1; }),
      empathy: vals.empathy,
      scene:   vals.scene,
      aunt:    vals.aunt,
      strikes: vals.strikes,
      fin:     FINS[vals.fin] || 'none'
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
    ecrire('rc_fin', (e.fin && e.fin !== 'none') ? e.fin : null);
    return true;
  }

  function effacer() {
    // rc_remarques n'est pas de la progression : ce sont les remarques
    // ecrites par un eleve et pas encore envoyees. Les effacer avec une
    // nouvelle enquete detruisait son retour sans le prevenir.
    ['rc_p1_visited','rc_p3_done','rc_types','rc_comptes','rc_p4','rc_fin']
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
