(function(){
  // Intro overlay
  var ov = document.getElementById('intro-overlay');
  if(ov){
    if(location.search.indexOf('skip') !== -1){
      ov.style.display = 'none';
    } else {
      var t = setTimeout(dismiss, 9200);
      ov.addEventListener('click', function(){ clearTimeout(t); dismiss(); });
      function dismiss(){
        ov.style.transition = 'opacity 1.1s ease';
        ov.style.opacity = '0';
        ov.style.pointerEvents = 'none';
        setTimeout(function(){ ov.style.display = 'none'; }, 1100);
      }
    }
  }

  // Prénom du héros - Léo ou Léa. Le choix se propage aux quatre parties
  // (voir prenom.js), accords compris.
  try {
    var actuel = window.RC_PRENOM || 'Léo';
    document.querySelectorAll('#prenom-choix button').forEach(function (b) {
      if (b.dataset.prenom === actuel) b.classList.add('on');
      b.addEventListener('click', function () {
        if (window.rcChoisir) rcChoisir(b.dataset.prenom);
        location.replace(location.pathname);
      });
    });
  } catch (e) {}

  // Code de reprise - un seul code pour les quatre parties (sauvegarde.js).
  // Il se suffit à lui-même : il marche d'un navigateur et d'un appareil à
  // l'autre, rien n'est gardé ailleurs que dans le code lui-même.
  var isEN = location.pathname.indexOf('_en') !== -1;
  try {
    if (window.Sauvegarde) {
      var zone = document.getElementById('save-area');
      var code = Sauvegarde.code();
      var enCours = code !== '0000000';
      if (zone) {
        zone.style.display = 'flex';
        document.getElementById('sa-code').textContent = code;
        if (!enCours) zone.querySelector('.sa-code').previousElementSibling.textContent =
          isEN ? 'Nothing to save yet' : 'Rien à sauvegarder pour l\'instant';
        var go = document.getElementById('sa-go');
        var inp = document.getElementById('sa-input');
        var msg = document.getElementById('sa-msg');
        inp.addEventListener('input', function () { this.value = this.value.toUpperCase(); msg.textContent = ''; });
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') go.click(); });
        go.addEventListener('click', function () {
          if (Sauvegarde.reprendre(inp.value)) location.replace(location.pathname);
          else msg.textContent = isEN ? 'Unknown code - check the 7 characters.'
                                      : 'Code inconnu - vérifie les 7 caractères.';
        });
      }
    }
  } catch (e) {}

  // Bouton « Nouvelle enquête » - visible seulement s'il y a une partie en cours.
  // Sur une tablette partagée, le groupe suivant héritait de l'état du précédent.
  try {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf('rc_') === 0) keys.push(k);
    }
    var rb = document.getElementById('reset-btn');
    if (rb && keys.length) {
      rb.style.display = 'block';
      rb.addEventListener('click', function () {
        if (window.Sauvegarde) Sauvegarde.effacer();
        else { try { keys.forEach(function (k) { localStorage.removeItem(k); }); } catch (e) {} }
        location.replace(location.pathname);
      });
    }
  } catch (e) {}

  // Verrouillage des parties pas encore atteintes.
  // Règle : on n'ouvre une partie que si le joueur détient ce qu'elle exige -
  // les identifiants de Clara viennent d'Inès, le code du groupe vient de
  // Kevin à la fin de la partie 2, le numéro de la tante vient d'Inès après
  // la lecture du groupe.
  // Le jeu tourne en cadre : si le stockage est refusé, aucune progression
  // n'est mémorisable. On ne verrouille alors rien, plutôt que de laisser une
  // classe entière coincée sur la partie 1.
  try {
    var stockageOK = false;
    try {
      localStorage.setItem('rc_probe', '1');
      localStorage.removeItem('rc_probe');
      stockageOK = true;
    } catch (e) { stockageOK = false; }

    if (stockageOK && window.Sauvegarde) {
      var et = Sauvegarde.etat();
      var TYPES_POUR_LE_CODE = 6; // même seuil que le message de Kevin en partie 2
      var ouverte = {
        2: et.p1 === 1,
        3: et.types.length >= TYPES_POUR_LE_CODE,
        4: et.p3 === 2
      };
      var pourquoi = isEN ? {
        2: 'Talk to Inès first - she is the one who has Clara\'s login details.',
        3: 'Kevin gives you the group code at the end of Part 2.',
        4: 'Inès gives you the aunt\'s number once you have read the group.'
      } : {
        2: 'Parle d\'abord à Inès - c\'est elle qui a les identifiants de Clara.',
        3: 'Kevin te donne le code du groupe à la fin de la Partie 2.',
        4: 'Inès te donne le numéro de la tante une fois le groupe lu.'
      };
      [2, 3, 4].forEach(function (n) {
        if (ouverte[n]) return;
        var carte = document.querySelector('.card-' + n);
        if (!carte) return;
        carte.classList.add('locked');
        carte.removeAttribute('href');
        carte.setAttribute('aria-disabled', 'true');
        var fleche = carte.querySelector('.card-arrow');
        if (fleche) fleche.innerHTML = '<span class="lock-why">\uD83D\uDD12 ' + pourquoi[n] + '</span>';
      });
    }
  } catch (e) {}

  // CTA carte 1 - "Reprendre" si déjà visitée
  try {
    if(localStorage.getItem('rc_p1_visited')){
      var label = document.querySelector('.cta-label');
      var badge = document.querySelector('.cta-btn');
      if(label){ label.textContent = isEN ? 'Resume the investigation' : 'Reprendre l\'enquête'; }
      if(badge){ badge.textContent = isEN ? '↩ Continue' : '↩ Continuer'; badge.style.background = '#2c4a6e'; }
    }
  } catch(e) {}
})();
