/* =========================================================================
   retour.js - bouton « Message » et envoi des remarques par e-mail
   -------------------------------------------------------------------------
   Un petit bouton 💬 en haut à droite, à côté du plein écran, sur l'accueil
   et sur les quatre parties. Il ouvre une fenêtre unique qui fait deux
   choses, comme demandé :

   1. NOTER - le joueur écrit une remarque à n'importe quel moment. Elle est
      rangée dans le localStorage avec l'endroit exact où il se trouvait
      (partie, écran, avancement, dernière réplique affichée), et elle
      survit au passage d'une partie à l'autre (les quatre parties sont des
      pages séparées : sans ce stockage, chaque remarque serait perdue au
      changement de page). Quand le navigateur refuse le stockage - le jeu
      tourne en cadre tiers, voir le bloc STOCKAGE -, la fenêtre le dit au
      lieu de perdre la remarque en silence.

   2. ENVOYER - à la fin de l'exercice, un seul bouton envoie l'ensemble des
      remarques accumulées dans un seul e-mail. La technique d'envoi est
      celle du Fakemètre et de Radar'naque : Web3Forms, une requête POST en
      JSON, pas de back-end, pas de dépendance.

   Quand le joueur atteint l'écran de fin d'une partie, un bandeau discret
   apparaît en bas pour le lui rappeler. La détection se fait uniquement en
   observant le DOM (voir FINS ci-dessous) : aucune ligne des fichiers de
   jeu n'a besoin d'être modifiée.

   Le fichier est autonome : ni CSS ni HTML à ajouter dans les pages, une
   seule balise <script src="retour.js" defer></script>.
   ========================================================================= */
(function () {
  'use strict';

  var CLE = 'rc_remarques';
  /* Même clé Web3Forms que le Fakemètre et Radar'naque : les envois arrivent
     dans la même boîte. */
  var ACCESS_KEY = 'ef1fe549-c616-4a27-a6c2-97f06caa913d';

  /* ---------------------------------------------------------------------
     Langue et étape courante
     Les pages de la partie 1 n'ont pas de balise <html> : le nom du fichier
     est le seul repère fiable, on l'utilise en secours.
     --------------------------------------------------------------------- */
  var fichier = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var EN = (document.documentElement.getAttribute('lang') === 'en')
        || /_en\.html?$/.test(fichier);

  var partie = 0;
  if (fichier.indexOf('1_') === 0) partie = 1;
  else if (fichier.indexOf('2_') === 0) partie = 2;
  else if (fichier.indexOf('3_') === 0) partie = 3;
  else if (fichier.indexOf('4_') === 0) partie = 4;

  var ETAPES_FR = ['Accueil',
    'Partie 1 - Le téléphone d’Inès',
    'Partie 2 - L’Instaclasse de Clara',
    'Partie 3 - Le groupe Whatsupp',
    'Partie 4 - Convaincre Clara'];
  var ETAPES_EN = ['Home',
    'Part 1 - Inès’s phone',
    'Part 2 - Clara’s Instaclasse',
    'Part 3 - The Whatsupp group',
    'Part 4 - Convincing Clara'];
  var etape = (EN ? ETAPES_EN : ETAPES_FR)[partie];

  /* Ce qui, dans le DOM, signale que la partie est terminée. Un sélecteur
     par partie ; l'accueil n'en a pas. */
  var FINS = [null, '#ca .ea', '#synthesis-overlay', '#end-state.active', '#screen-end.active'];

  var T = EN ? {
    btn: 'Message', btnTitle: 'Send me a note',
    titre: 'Your notes',
    sous: 'A remark, an idea, something that feels off? Jot it down here. At the end of the exercise you can send me everything in one go.',
    phMsg: 'Your note…',
    ajouter: 'Add this note',
    ajoute: 'Note added.',
    jointe: 'Where you are in the exercise is attached automatically, so I can find the spot.',
    sansMemoire: 'This browser will not let the page remember anything between the four parts. Send this note now - it would be lost when you move on.',
    sousSansMemoire: 'A remark, an idea, something that feels off? Write it here - I read everything.',
    liste: 'Your notes so far',
    vide: 'No note yet.',
    supprimer: 'Delete this note',
    envoiTitre: 'Send them to me',
    phNom: 'Your first name (optional)',
    phMail: 'Your e-mail (optional, so I can reply)',
    envoyer: 'Send', envoyerN: 'Send my {n} notes', envoyer1: 'Send my note',
    envoiEnCours: 'Sending…',
    fermer: 'Close',
    videErreur: 'Write a note before sending.',
    merci: 'Thank you - it has been sent!',
    erreur: 'Sending failed. Try again, or write to contact@antoninatger.com',
    finTexte: 'End of this part. Anything to tell me about the exercise?',
    finCta: 'Send my notes'
  } : {
    btn: 'Message', btnTitle: 'M’envoyer une remarque',
    titre: 'Vos remarques',
    sous: 'Une remarque, une idée, un détail qui cloche&nbsp;? Notez-la ici. À la fin de l’exercice, vous m’enverrez l’ensemble d’un seul coup.',
    phMsg: 'Votre remarque…',
    ajouter: 'Noter cette remarque',
    ajoute: 'Remarque notée.',
    jointe: 'L’endroit où vous êtes dans l’exercice est joint automatiquement, pour que je retrouve le passage.',
    sansMemoire: 'Ce navigateur empêche la page de retenir quoi que ce soit d’une partie à l’autre. Envoyez cette remarque maintenant : elle serait perdue en changeant de partie.',
    sousSansMemoire: 'Une remarque, une idée, un détail qui cloche&nbsp;? Écrivez-la ici, je lis tout.',
    liste: 'Vos remarques notées',
    vide: 'Aucune remarque notée pour l’instant.',
    supprimer: 'Supprimer cette remarque',
    envoiTitre: 'M’envoyer l’ensemble',
    phNom: 'Votre prénom (facultatif)',
    phMail: 'Votre e-mail (facultatif, pour une réponse)',
    envoyer: 'Envoyer', envoyerN: 'Envoyer mes {n} remarques', envoyer1: 'Envoyer ma remarque',
    envoiEnCours: 'Envoi…',
    fermer: 'Fermer',
    videErreur: 'Écrivez une remarque avant d’envoyer.',
    merci: 'Merci beaucoup, c’est envoyé&nbsp;!',
    erreur: 'L’envoi a échoué. Réessayez, ou écrivez à contact@antoninatger.com',
    finTexte: 'Fin de cette partie. Une remarque sur l’exercice&nbsp;?',
    finCta: 'M’envoyer mes remarques'
  };

  /* =====================================================================
     STOCKAGE - le fil entre les quatre parties, quand il existe
     ---------------------------------------------------------------------
     Les quatre parties sont quatre pages : sans stockage partagé, une
     remarque notée en partie 1 disparaît en passant à la partie 2.

     Or le jeu tourne en cadre (iframe) sur antoninatger.com, servi depuis
     github.io : c'est du stockage tiers. Safari le bloque toujours, Chrome
     dès que les cookies tiers sont refusés - et sur les postes d'un
     établissement, c'est fréquent. localStorage lève alors une exception.

     Dans ce cas on ne fait pas semblant : la mémoire tombe en RAM, ce qui
     tient le temps d'une page, et la fenêtre le dit - « envoyez maintenant,
     je ne pourrai pas garder cette remarque ». Perdre les remarques d'un
     élève sans rien lui dire serait pire que de ne pas les proposer.
     ===================================================================== */
  var memoire = [];          // repli quand le navigateur refuse le stockage
  var stockageOK = (function () {
    try {
      var t = CLE + '.test';
      localStorage.setItem(t, '1');
      localStorage.removeItem(t);
      return true;
    } catch (e) { return false; }
  })();

  function lire() {
    if (!stockageOK) return memoire;
    try {
      var l = JSON.parse(localStorage.getItem(CLE) || '[]');
      return Object.prototype.toString.call(l) === '[object Array]' ? l : [];
    } catch (e) { return memoire; }
  }
  function ecrire(l) {
    memoire = l;
    if (!stockageOK) return;
    try { localStorage.setItem(CLE, JSON.stringify(l)); } catch (e) { stockageOK = false; }
  }

  function echap(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* =====================================================================
     OÙ ÉTAIT LE JOUEUR - relevé au moment où il écrit, pas à l'envoi
     ---------------------------------------------------------------------
     « Je n'ai pas compris cette question » n'est réparable que si on sait
     laquelle. Chaque partie tient déjà sa position dans des variables au
     premier niveau de son fichier Structure : on les lit, sans rien lui
     demander et sans jamais la modifier.

     Tout est en try/catch et tout est facultatif : un jeu qui change de
     variables ne doit pas casser le bouton, il doit juste envoyer un
     contexte plus maigre.
     ===================================================================== */

  /* Les `var` du jeu sont des propriétés de window ; ses `let` et `const` au
     premier niveau, non - ils vivent dans la portée lexicale globale. Un
     corps de Function, lui, est évalué dans cette portée : il les voit. */
  function glob(nom) {
    try {
      if (nom in window) return window[nom];
      return Function('return typeof ' + nom + ' !== "undefined" ? ' + nom + ' : undefined')();
    } catch (e) { return undefined; }
  }

  function nombre(v) {
    return (typeof v === 'number' && isFinite(v)) ? v : null;
  }

  function extrait(el, max) {
    if (!el) return '';
    var t = (el.textContent || '').replace(/\s+/g, ' ').trim();
    return t.length > max ? t.slice(0, max - 1) + '…' : t;
  }

  /* La dernière réplique affichée : le repère le plus parlant dans les deux
     parties qui déroulent une conversation. */
  function derniereReplique() {
    if (partie === 1) {
      /* .bb seulement : .tyi est l'indicateur « écrit… », il n'a pas de texte. */
      var bb = document.querySelectorAll('#ma .bb');
      return extrait(bb.length ? bb[bb.length - 1] : null, 90);
    }
    if (partie === 3) {
      /* .msg-row seulement : .typing-row ne porte que le nom de l'auteur. */
      var wa = document.querySelectorAll('#messages-container .msg-row');
      var row = wa.length ? wa[wa.length - 1] : null;
      if (!row) return '';
      var qui = '';
      try { qui = row.dataset.sender ? row.dataset.sender + ' : ' : ''; } catch (e) {}
      var bulle = row.querySelector('.msg-bubble') || row;
      /* L'heure est un <span> dans la bulle : sur une copie, on l'enlève pour
         ne pas la coller au texte. */
      try {
        bulle = bulle.cloneNode(true);
        var h = bulle.querySelector('.msg-time');
        if (h) h.parentNode.removeChild(h);
      } catch (e) {}
      return qui + extrait(bulle, 90);
    }
    return '';
  }

  function contexte() {
    var b = [];

    var ecran = document.querySelector('.screen.active');
    if (ecran && ecran.id) b.push((EN ? 'screen ' : 'écran ') + ecran.id);

    if (partie === 1) {
      var step = nombre(glob('step')), G = glob('G');
      var total = (G && G.length) ? G.length : null;
      if (step !== null) b.push((EN ? 'exchange ' : 'échange ') + (step + 1) + (total ? '/' + total : ''));
      var trust = nombre(glob('trust'));
      if (trust !== null) b.push((EN ? 'trust ' : 'confiance ') + trust);
      var good = nombre(glob('good'));
      if (good !== null) b.push(good + (EN ? ' good answers' : ' bonnes réponses'));
      if (glob('crisisUsed') === true) b.push(EN ? 'crisis triggered' : 'crise déclenchée');

    } else if (partie === 2) {
      var gp = nombre(glob('gamePhase'));
      if (gp !== null) b.push((EN ? 'phase ' : 'phase ') + gp);
      var tf = glob('typesFound');
      if (tf && typeof tf.size === 'number') {
        var req = nombre(glob('REQUIRED_TYPES'));
        b.push(tf.size + (req ? '/' + req : '') + (EN ? ' types found' : ' types trouvés'));
        try {
          var noms = [];
          tf.forEach(function (t) { noms.push(t); });
          if (noms.length) b.push('(' + noms.join(', ') + ')');
        } catch (e) {}
      }

    } else if (partie === 3) {
      var mi = nombre(glob('msgIndex'));
      if (mi !== null) b.push((EN ? 'message ' : 'message ') + mi);

    } else if (partie === 4) {
      var si = nombre(glob('sceneIndex'));
      var TX = glob('TEXTES');
      var nbSc = (TX && TX.SCENES && TX.SCENES.length) ? TX.SCENES.length : null;
      if (si !== null) b.push((EN ? 'scene ' : 'scène ') + (si + 1) + (nbSc ? '/' + nbSc : ''));
      var emp = nombre(glob('empathy')), maxEmp = nombre(glob('MAX_EMP'));
      if (emp !== null) b.push((EN ? 'empathy ' : 'empathie ') + emp + (maxEmp ? '/' + maxEmp : ''));
      var sc = nombre(glob('auntScore'));
      if (sc !== null) b.push((EN ? 'aunt ' : 'tante ') + sc);
      var st = nombre(glob('auntStrikes'));
      if (st) b.push(st + (EN ? ' clumsy answers' : ' maladresses'));
    }

    var rep = derniereReplique();
    if (rep) b.push((EN ? 'last line: “' : 'dernière réplique : « ') + rep + (EN ? '”' : ' »'));

    return b.join(' · ');
  }

  function horodatage(d) {
    function d2(n) { return (n < 10 ? '0' : '') + n; }
    return d2(d.getDate()) + '/' + d2(d.getMonth() + 1) + ' ' + d2(d.getHours()) + ':' + d2(d.getMinutes());
  }

  /* ---------------------------------------------------------------------
     Habillage - injecté ici pour que les pages n'aient rien à déclarer.
     Les z-index passent au-dessus du reste du jeu (10000 au maximum).
     --------------------------------------------------------------------- */
  var CSS = [
    '#rc-btn{position:fixed;top:1rem;right:calc(1rem + 42px);z-index:10050;',
      'display:inline-flex;align-items:center;gap:6px;',
      'background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.12);border-radius:20px;',
      'color:rgba(255,255,255,.55);cursor:pointer;padding:9px 13px;line-height:1;',
      'font-family:"Jost",system-ui,-apple-system,sans-serif;font-size:.72rem;font-weight:500;',
      'letter-spacing:.06em;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);',
      'transition:color .2s,border-color .2s,background .2s;}',
    '#rc-btn:hover,#rc-btn:focus-visible{color:#fff;border-color:rgba(196,134,90,.55);background:rgba(0,0,0,.8);}',
    '#rc-btn .rc-lab{display:inline;}',
    '@media(max-width:520px){#rc-btn .rc-lab{display:none;}#rc-btn{padding:9px 11px;}}',

    '#rc-ov{position:fixed;inset:0;z-index:10060;display:none;align-items:center;justify-content:center;',
      'background:rgba(4,5,9,.82);padding:1rem;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);}',
    '#rc-ov.rc-open{display:flex;}',
    '#rc-modal{position:relative;width:min(480px,100%);max-height:88vh;overflow-y:auto;',
      'background:#121826;border:1px solid rgba(255,255,255,.09);border-radius:16px;',
      'padding:1.6rem 1.5rem 1.4rem;color:#d8d0c2;',
      'font-family:"Jost",system-ui,-apple-system,sans-serif;font-size:.87rem;line-height:1.6;',
      'box-shadow:0 24px 60px rgba(0,0,0,.6);}',
    '#rc-modal h2{font-family:"Playfair Display",Georgia,serif;font-weight:400;font-size:1.3rem;',
      'color:#d8d0c2;margin:0 0 .5rem;padding-right:1.6rem;}',
    '#rc-modal .rc-sous{color:#8b8296;font-size:.8rem;font-weight:300;margin-bottom:1.1rem;}',
    '#rc-x{position:absolute;top:.9rem;right:.9rem;background:none;border:0;color:#575060;',
      'font-size:1.1rem;line-height:1;cursor:pointer;padding:4px;}',
    '#rc-x:hover,#rc-x:focus-visible{color:#d8d0c2;}',
    '#rc-modal textarea,#rc-modal input{width:100%;background:#0d1119;color:#d8d0c2;',
      'border:1px solid rgba(255,255,255,.09);border-radius:9px;padding:.6rem .7rem;',
      'font-family:inherit;font-size:.85rem;margin-bottom:.55rem;}',
    '#rc-modal textarea{resize:vertical;min-height:76px;}',
    '#rc-modal textarea:focus,#rc-modal input:focus{outline:none;border-color:rgba(196,134,90,.55);}',
    '#rc-modal ::placeholder{color:#575060;}',
    '.rc-bt{font-family:inherit;font-size:.76rem;font-weight:500;letter-spacing:.06em;',
      'border-radius:20px;cursor:pointer;padding:.5rem 1rem;transition:background .2s,color .2s,border-color .2s;}',
    '.rc-bt.rc-sec{background:transparent;border:1px solid rgba(255,255,255,.14);color:#8b8296;}',
    '.rc-bt.rc-sec:hover,.rc-bt.rc-sec:focus-visible{color:#d8d0c2;border-color:rgba(255,255,255,.3);}',
    '.rc-bt.rc-pri{background:#c4865a;border:1px solid #c4865a;color:#12100d;font-weight:600;}',
    '.rc-bt.rc-pri:hover,.rc-bt.rc-pri:focus-visible{background:#d59a6f;border-color:#d59a6f;}',
    '.rc-bt[disabled]{opacity:.55;cursor:default;}',
    '.rc-sep{margin:1.2rem 0 .9rem;border-top:1px solid rgba(255,255,255,.08);padding-top:1rem;}',
    '.rc-titre{font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;',
      'color:#575060;margin-bottom:.6rem;}',
    '#rc-liste{list-style:none;margin:0 0 .3rem;padding:0;}',
    '#rc-liste li{display:flex;gap:.5rem;align-items:flex-start;background:#0d1119;',
      'border:1px solid rgba(255,255,255,.06);border-radius:9px;padding:.5rem .6rem;margin-bottom:.4rem;}',
    '#rc-liste .rc-txt{flex:1;font-size:.8rem;}',
    '#rc-liste .rc-ou{display:block;font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;',
      'color:#c4865a;opacity:.75;margin-bottom:.2rem;}',
    '#rc-liste .rc-sup{background:none;border:0;color:#575060;cursor:pointer;font-size:.9rem;line-height:1;padding:2px 4px;}',
    '#rc-liste .rc-sup:hover,#rc-liste .rc-sup:focus-visible{color:#b85c5c;}',
    '.rc-vide{color:#575060;font-size:.78rem;font-style:italic;margin-bottom:.3rem;}',
    '.rc-jointe{color:#575060;font-size:.7rem;font-weight:300;margin-top:.55rem;}',
    '.rc-jointe.rc-alerte{color:#c4865a;}',
    '.rc-info{font-size:.76rem;margin:.2rem 0 .6rem;min-height:1.1em;}',
    '.rc-info.rc-ok{color:#5a9e7a;}',
    '.rc-info.rc-ko{color:#b85c5c;}',

    '#rc-fin{position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:10040;',
      'display:none;align-items:center;gap:.8rem;max-width:min(520px,calc(100vw - 2rem));',
      'background:rgba(13,17,25,.94);border:1px solid rgba(196,134,90,.35);border-radius:14px;',
      'padding:.7rem .85rem;color:#d8d0c2;font-family:"Jost",system-ui,sans-serif;font-size:.78rem;',
      'box-shadow:0 12px 34px rgba(0,0,0,.5);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);}',
    '#rc-fin.rc-open{display:flex;}',
    '#rc-fin .rc-fin-txt{flex:1;font-weight:300;color:#a79e91;}',
    '#rc-fin .rc-fin-x{background:none;border:0;color:#575060;cursor:pointer;font-size:1rem;line-height:1;padding:2px 4px;}',
    '#rc-fin .rc-fin-x:hover{color:#d8d0c2;}',
    '@media(max-width:520px){#rc-fin{width:calc(100vw - 2rem);flex-wrap:wrap;}',
      '#rc-fin .rc-fin-txt{flex-basis:100%;}#rc-fin .rc-bt{flex:1;}}'
  ].join('');

  function html() {
    return '' +
    '<button id="rc-btn" type="button" title="' + echap(T.btnTitle) + '" aria-label="' + echap(T.btnTitle) + '">' +
      '<span aria-hidden="true">💬</span><span class="rc-lab">' + echap(T.btn) + '</span>' +
    '</button>' +

    '<div id="rc-ov" role="dialog" aria-modal="true" aria-labelledby="rc-h2">' +
      '<div id="rc-modal">' +
        '<button id="rc-x" type="button" aria-label="' + echap(T.fermer) + '">✕</button>' +
        '<h2 id="rc-h2">💬 ' + T.titre + '</h2>' +
        '<p class="rc-sous">' + (stockageOK ? T.sous : T.sousSansMemoire) + '</p>' +

        '<textarea id="rc-msg" rows="3" placeholder="' + echap(T.phMsg) + '"></textarea>' +
        '<p class="rc-info" id="rc-info"></p>' +
        '<button type="button" class="rc-bt rc-sec" id="rc-add">＋ ' + echap(T.ajouter) + '</button>' +
        /* Quand le navigateur refuse le stockage, cette ligne devient un
           avertissement : « envoyez maintenant ». Voir le bloc STOCKAGE. */
        '<p class="rc-jointe' + (stockageOK ? '' : ' rc-alerte') + '">' +
          echap(stockageOK ? T.jointe : T.sansMemoire) + '</p>' +

        '<div class="rc-sep">' +
          '<p class="rc-titre">' + echap(T.liste) + '</p>' +
          '<ul id="rc-liste"></ul>' +
        '</div>' +

        '<div class="rc-sep">' +
          '<p class="rc-titre">' + echap(T.envoiTitre) + '</p>' +
          '<input type="text" id="rc-nom" placeholder="' + echap(T.phNom) + '" autocomplete="given-name">' +
          '<input type="email" id="rc-mail" placeholder="' + echap(T.phMail) + '" autocomplete="email">' +
          '<button type="button" class="rc-bt rc-pri" id="rc-send">📨 <span id="rc-send-lab"></span></button>' +
        '</div>' +
      '</div>' +
    '</div>' +

    '<div id="rc-fin">' +
      '<span class="rc-fin-txt">' + T.finTexte + '</span>' +
      '<button type="button" class="rc-bt rc-pri" id="rc-fin-cta">💬 ' + echap(T.finCta) + '</button>' +
      '<button type="button" class="rc-fin-x" id="rc-fin-x" aria-label="' + echap(T.fermer) + '">✕</button>' +
    '</div>';
  }

  /* ---------------------------------------------------------------------
     Montage
     --------------------------------------------------------------------- */
  function monter() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head ? document.head.appendChild(style) : document.documentElement.appendChild(style);

    var hote = document.createElement('div');
    hote.id = 'rc-hote';
    hote.innerHTML = html();
    document.body.appendChild(hote);

    var ov    = document.getElementById('rc-ov');
    var msg   = document.getElementById('rc-msg');
    var info  = document.getElementById('rc-info');
    var liste = document.getElementById('rc-liste');
    var send  = document.getElementById('rc-send');
    var lab   = document.getElementById('rc-send-lab');
    var fin   = document.getElementById('rc-fin');
    var declencheur = null;   // pour rendre le focus à la fermeture

    function dire(texte, ok) {
      info.innerHTML = texte || '';
      info.className = 'rc-info' + (texte ? (ok ? ' rc-ok' : ' rc-ko') : '');
    }

    function libelleEnvoi() {
      var n = lire().length;
      lab.textContent = n === 0 ? T.envoyer
                      : n === 1 ? T.envoyer1
                      : T.envoyerN.replace('{n}', n);
    }

    function dessinerListe() {
      var l = lire();
      if (!l.length) {
        liste.innerHTML = '<li style="border:0;background:none;padding:0"><span class="rc-vide">' + echap(T.vide) + '</span></li>';
      } else {
        var h = '';
        for (var i = 0; i < l.length; i++) {
          h += '<li title="' + echap(l[i].ou || '') + '"><span class="rc-txt"><span class="rc-ou">' + echap(l[i].etape || '') + '</span>' +
               echap(l[i].texte) + '</span>' +
               '<button type="button" class="rc-sup" data-i="' + i + '" aria-label="' + echap(T.supprimer) + '">✕</button></li>';
        }
        liste.innerHTML = h;
      }
      libelleEnvoi();
    }

    function ouvrir() {
      declencheur = document.activeElement;
      dire('');
      dessinerListe();
      ov.classList.add('rc-open');
      fin.classList.remove('rc-open');
      msg.focus();
    }
    function fermer() {
      ov.classList.remove('rc-open');
      if (declencheur && declencheur.focus) declencheur.focus();
    }

    function ajouter() {
      var texte = (msg.value || '').trim();
      if (!texte) { dire(T.videErreur, false); msg.focus(); return false; }
      var l = lire();
      /* Le contexte est relevé ici, pas à l'envoi : une remarque écrite en
         partie 1 doit garder la position de la partie 1 même si elle part
         une heure plus tard, depuis la partie 4. */
      l.push({ etape: etape, ou: contexte(), texte: texte, date: new Date().toISOString() });
      ecrire(l);
      msg.value = '';
      dessinerListe();
      dire(T.ajoute, true);
      return true;
    }

    function envoyer() {
      /* Ce qui est encore dans la zone de saisie compte comme une remarque :
         personne ne doit perdre son texte pour avoir oublié « Noter ». */
      var enCours = (msg.value || '').trim();
      var l = lire().slice();
      if (enCours) l.push({ etape: etape, ou: contexte(), texte: enCours, date: new Date().toISOString() });
      if (!l.length) { dire(T.videErreur, false); msg.focus(); return; }

      var nom  = (document.getElementById('rc-nom').value || '').trim();
      var mail = (document.getElementById('rc-mail').value || '').trim();

      var ua = '';
      try { ua = (navigator.userAgent || '').slice(0, 140); } catch (e) {}

      var lignes = [];
      lignes.push(l.length + (EN ? ' note(s)' : ' remarque(s)') + ' - ' + (EN ? 'EN' : 'FR') +
                  ' · ' + horodatage(new Date()) +
                  ' · ' + (EN ? 'window ' : 'fenêtre ') + window.innerWidth + '×' + window.innerHeight);
      if (ua) lignes.push(ua);

      for (var i = 0; i < l.length; i++) {
        var r = l[i];
        var quand = '';
        try { if (r.date) quand = ' - ' + horodatage(new Date(r.date)); } catch (e) {}
        lignes.push('');
        lignes.push((i + 1) + '. ' + (r.etape || '?') + quand);
        if (r.ou) lignes.push('   ' + (EN ? 'where: ' : 'où : ') + r.ou);
        lignes.push('   ' + r.texte.replace(/\n/g, '\n   '));
      }

      send.disabled = true;
      var ancien = lab.textContent;
      lab.textContent = T.envoiEnCours;
      dire('');

      /* Web3Forms pose « email » en Reply-To du message qu'il expédie. Y
         mettre « non renseigné » quand le champ est vide fabrique un en-tête
         invalide, et les filtres anti-spam - Outlook et Hotmail en tête -
         classent volontiers un message dont le Reply-To n'est pas une
         adresse. Le champ n'est pas obligatoire : quand il est vide ou
         manifestement mal saisi, on ne l'envoie pas du tout. */
      var envoi = {
        access_key: ACCESS_KEY,
        subject: 'Retrouver Clara - ' + (EN ? 'notes' : 'remarques') + (nom ? ' - ' + nom : ''),
        name: nom || (EN ? 'Anonymous' : 'Anonyme'),
        message: lignes.join('\n')
      };
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) envoi.email = mail;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(envoi)
      }).then(function (r) { return r.json(); }).then(function (d) {
        if (d && d.success) {
          ecrire([]);
          msg.value = '';
          dessinerListe();
          dire(T.merci, true);
        } else {
          dire(T.erreur, false);
        }
      }).catch(function () {
        dire(T.erreur, false);
      }).then(function () {
        send.disabled = false;
        lab.textContent = ancien;
        libelleEnvoi();
      });
    }

    document.getElementById('rc-btn').onclick = ouvrir;
    document.getElementById('rc-x').onclick   = fermer;
    document.getElementById('rc-add').onclick = ajouter;
    send.onclick = envoyer;

    ov.addEventListener('click', function (e) { if (e.target === ov) fermer(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && ov.classList.contains('rc-open')) fermer();
    });
    liste.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.rc-sup') : null;
      if (!b) return;
      var l = lire();
      l.splice(parseInt(b.getAttribute('data-i'), 10), 1);
      ecrire(l);
      dessinerListe();
    });

    document.getElementById('rc-fin-cta').onclick = ouvrir;
    document.getElementById('rc-fin-x').onclick = function () { fin.classList.remove('rc-open'); };

    dessinerListe();

    /* ------------------------------------------------------------------
       Fin de partie - le bandeau, une seule fois par page. La détection
       lit le DOM et ne touche à rien : voir FINS en haut du fichier.
       ------------------------------------------------------------------ */
    var selFin = FINS[partie];
    if (selFin) {
      var minuteur = setInterval(function () {
        var el;
        try { el = document.querySelector(selFin); } catch (e) { clearInterval(minuteur); return; }
        if (!el) return;
        /* La synthèse de la partie 2 est un calque masqué par display:none :
           il ne suffit pas qu'il existe, il doit être affiché. getClientRects()
           est le seul test qui marche aussi pour les écrans en position:fixed,
           dont offsetParent vaut toujours null. */
        if (!el.getClientRects().length) return;
        clearInterval(minuteur);
        if (!ov.classList.contains('rc-open')) fin.classList.add('rc-open');
      }, 1200);
    }

    /* Petite API, si un jour une page veut ouvrir la fenêtre elle-même. */
    window.RetourClara = { ouvrir: ouvrir, fermer: fermer, finDePartie: function () { fin.classList.add('rc-open'); } };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', monter);
  } else {
    monter();
  }
})();
