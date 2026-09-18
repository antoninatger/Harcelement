// ── Code Gate ──────────────────────────────────────────────────────────────

function checkCode() {
  var val = document.getElementById('gate-input').value.trim();
  if (val === '4827') {
    document.getElementById('gate-error').style.display = 'none';
    document.getElementById('code-gate').style.display = 'none';
    document.getElementById('warning-overlay').style.display = 'flex';
  } else {
    document.getElementById('gate-error').style.display = 'block';
  }
}

function bypassGate() {
  document.getElementById('code-gate').style.display = 'none';
  document.getElementById('warning-overlay').style.display = 'flex';
}

document.getElementById('gate-input').addEventListener('keydown', function(e){
  if (e.key === 'Enter') checkCode();
});

// ── Initialisation UI ──────────────────────────────────────────────────────

function init() {
  // Bandeau
  document.getElementById('b-strong').textContent = WA_DATA.banner.strong;
  document.getElementById('b-tail').textContent   = WA_DATA.banner.tail;

  // En-tête groupe
  document.getElementById('wa-avatar').textContent  = WA_DATA.group.avatar;
  document.getElementById('wa-name').textContent    = WA_DATA.group.name;
  document.getElementById('wa-members').textContent = WA_DATA.group.subtitle;
  document.getElementById('back-nav').addEventListener('click', function () {
    window.location.href = WA_DATA.navigation.prev.url;
  });

  // Avertissement → ouvre la mission ensuite
  document.getElementById('w-icon').textContent  = WA_DATA.warning.icon;
  document.getElementById('w-title').textContent = WA_DATA.warning.title;
  document.getElementById('w-body').textContent  = WA_DATA.warning.body;
  var wb = document.getElementById('w-btn');
  wb.textContent = WA_DATA.warning.btn;
  wb.addEventListener('click', function () {
    document.getElementById('warning-overlay').style.display = 'none';
    document.getElementById('mission-overlay').style.display = 'flex';
  });

  // Mission overlay
  document.getElementById('m-title').textContent = WA_DATA.mission.title;
  document.getElementById('m-body').textContent  = WA_DATA.mission.body;
  var mb = document.getElementById('mission-start-btn');
  mb.textContent = WA_DATA.mission.btn;
  mb.addEventListener('click', function () {
    document.getElementById('mission-overlay').style.display = 'none';
  });

  // Comptes anonymes : compteur et libellés
  initComptes();

  // Bouton démarrer
  var sb = document.getElementById('start-btn');
  sb.textContent = WA_DATA.startLabel;
  sb.addEventListener('click', startPlay);

  // Modal Instaclasse
  document.getElementById('ig-modal-photo').src = WA_DATA.postCard.photo;
  document.getElementById('ig-modal-cap-text').textContent = ' ' + WA_DATA.postCard.caption;
  document.getElementById('ig-modal-likes').textContent    = UI.likes;

  // Retour depuis Instaclasse ? → sauter les overlays, reprendre où on en était
  var saved = null;
  try { saved = sessionStorage.getItem('harcelement_wa_state'); } catch (e) {}
  if (saved !== null) {
    try { sessionStorage.removeItem('harcelement_wa_state'); } catch (e) {}
    document.getElementById('code-gate').style.display = 'none';
    document.getElementById('warning-overlay').style.display = 'none';
    fastForwardTo(parseInt(saved, 10));
  }
}

// ── Fast-forward au retour d'Instaclasse ────────────────────────────────────

function fastForwardTo(targetIndex) {
  document.getElementById('start-screen').style.display = 'none';
  var container = document.getElementById('messages-container');

  var sep = document.createElement('div');
  sep.className = 'date-sep';
  sep.textContent = UI.today;
  container.appendChild(sep);

  for (var i = 0; i < targetIndex && i < WA_DATA.messages.length; i++) {
    var m = WA_DATA.messages[i];
    if      (m.type === 'system')         appendSystem(m.text);
    else if (m.type === 'post-card') appendPostCard(m.sender, true);
    else if (m.type === 'time-sep')       appendTimeSep(m.text);
    else if (!m.type)                     appendMessage(m.sender, m.text, m.time, true);
    // quiz / end ignorés
  }

  msgIndex = targetIndex;
  scrollChat();
  processNext();
}

// ── COMPTES ANONYMES ─────────────────────────────────────────────────────
// Le groupe nomme cinq comptes à voix haute. Le joueur les repère en appuyant
// dessus ; la Partie 2 les étiquette ensuite avec le prénom du propriétaire.
// C'est l'asymétrie que le jeu raconte : le joueur sait, Clara jamais.

var COMPTES = {};
var comptesTrouves = {};

function initComptes() {
  var C = WA_DATA.comptes;
  if (!C) return;
  C.liste.forEach(function (e) { COMPTES[e.handle] = e.qui; });
  try {
    var brut = localStorage.getItem('rc_comptes');
    if (brut) comptesTrouves = JSON.parse(brut) || {};
  } catch (e) {}
  document.getElementById('cb-title').textContent = C.cardTitle;
  document.getElementById('cb-intro').textContent = C.cardIntro;
  document.getElementById('cb-note').textContent  = C.cardNote;
  document.getElementById('cb-see').textContent   = C.cardSee;
  document.getElementById('cb-close').textContent = C.cardClose;
  majComptes();
}

function majComptes() {
  var C = WA_DATA.comptes;
  if (!C) return;
  var tr = document.getElementById('comptes-tracker');
  if (!tr) return;
  var total = C.liste.length;
  var n = Object.keys(comptesTrouves).length;
  tr.style.display = 'flex';
  tr.querySelector('.c-label').textContent = n + '/' + total + ' ' + C.label;
  tr.querySelector('.c-fill').style.width = (n / total * 100) + '%';
  document.querySelectorAll('.mention').forEach(function (m) {
    var h = m.dataset.handle;
    if (h && comptesTrouves[h]) m.classList.add('trouve');
  });
}

function ouvrirCompte(handle) {
  var qui = COMPTES[handle];
  if (!qui) { goToCompte(); return; }
  comptesTrouves[handle] = qui;
  try { localStorage.setItem('rc_comptes', JSON.stringify(comptesTrouves)); } catch (e) {}
  document.getElementById('cb-handle').textContent = '@' + handle;
  document.getElementById('cb-qui').textContent = qui;
  document.getElementById('compte-overlay').style.display = 'flex';
  majComptes();
}

// ── Naviguer vers Instaclasse (sauvegarde l'état avant de partir) ───────────

function goToCompte() {
  // Sans try/catch, un stockage tiers bloque faisait echouer la navigation
  // elle-meme : cliquer une @mention ne faisait plus rien du tout.
  try {
    sessionStorage.setItem('harcelement_wa_state', String(msgIndex));
    sessionStorage.setItem('harcelement_wa_from', '1');
  } catch (e) {}
  window.location.href = WA_DATA.navigation.prev.url;
}

// ── Moteur de lecture automatique ─────────────────────────────────────────

var msgIndex = 0;
var autoTimer = null, autoPaused = false, fastMode = false;

function startPlay() {
  document.getElementById('start-screen').style.display = 'none';
  var sep = document.createElement('div');
  sep.className = 'date-sep';
  sep.textContent = UI.today;
  document.getElementById('messages-container').appendChild(sep);
  processNext();
}

function processNext() {
  if (msgIndex >= WA_DATA.messages.length) return;
  var msg = WA_DATA.messages[msgIndex++];

  if (msg.type === 'quiz') {
    openQuiz(msg.quizId);
    return;
  }
  if (msg.type === 'end') {
    showEndState();
    return;
  }
  if (msg.type === 'system') {
    appendSystem(msg.text);
    wait(msg.delay || 800, processNext);
    return;
  }
  if (msg.type === 'time-sep') {
    appendTimeSep(msg.text);
    scrollChat();
    wait(msg.delay || 1000, processNext);
    return;
  }

  // Les messages n'enchaînent plus tout seuls (55 messages en 95 s, personne
  // ne suivait) : chacun attend un appui du joueur. Le « écrit… » reste,
  // court, pour le rythme.
  var typingMs = (msg.type === 'post-card')
    ? 800
    : Math.min(800, Math.max(250, (msg.text || '').length * 10));

  var typingEl = showTyping(msg.sender);
  scrollChat();
  wait(typingMs, function () {
    typingEl.remove();
    if (msg.type === 'post-card') {
      appendPostCard(msg.sender, false);
    } else {
      appendMessage(msg.sender, msg.text, msg.time, false);
    }
    scrollChat();
    awaitTap();
  });
}

function wait(ms, cb) { setTimeout(cb, ms); }

// ── Avancer au tap ────────────────────────────────────────────────────────

var waitingTap = false;

function awaitTap() {
  waitingTap = true;
  var f = document.querySelector('.wa-input-field');
  if (f) f.placeholder = UI.tapHint || '▼';
  document.getElementById('wa-input').classList.add('tap-wait');
  document.getElementById('chat-area').classList.add('tap-wait');
  scheduleAutoAdvance();
}

// Défilement automatique, mais lent et interruptible - on ne revient pas au
// "ça défile tout seul" d'origine (55 messages en 95 s, personne ne
// suivait) : le joueur peut toujours taper pour avancer tout de suite,
// survoler la conversation pour mettre le défilement en pause, ou activer
// le bouton ⏩ pour un rythme plus rapide.
function scheduleAutoAdvance() {
  clearTimeout(autoTimer);
  if (autoPaused) return;
  var delay = fastMode ? 1200 : 3200;
  autoTimer = setTimeout(function () {
    if (waitingTap) advance();
  }, delay);
}

function advance() {
  clearTimeout(autoTimer);
  waitingTap = false;
  var f = document.querySelector('.wa-input-field');
  if (f) f.placeholder = UI.inputPlaceholder || 'Message…';
  document.getElementById('wa-input').classList.remove('tap-wait');
  document.getElementById('chat-area').classList.remove('tap-wait');
  processNext();
}

function onTap(e) {
  if (!waitingTap) return;
  // Les @mentions, la carte Instaclasse et les boutons gardent leur propre rôle.
  if (e.target.closest('.mention, .ig-card-btn, button, a')) return;
  advance();
}

document.getElementById('chat-area').addEventListener('click', onTap);
document.getElementById('wa-input').addEventListener('click', onTap);

document.getElementById('chat-area').addEventListener('mouseenter', function () {
  autoPaused = true;
  clearTimeout(autoTimer);
});
document.getElementById('chat-area').addEventListener('mouseleave', function () {
  autoPaused = false;
  if (waitingTap) scheduleAutoAdvance();
});

var ffBtn = document.getElementById('wa-ff-btn');
if (ffBtn) {
  ffBtn.style.opacity = '.55';
  ffBtn.addEventListener('click', function () {
    fastMode = !fastMode;
    ffBtn.style.opacity = fastMode ? '1' : '.55';
    ffBtn.style.color = fastMode ? '#00a884' : '';
    if (waitingTap) scheduleAutoAdvance();
  });
}

function scrollChat() {
  var ca = document.getElementById('chat-area');
  ca.scrollTop = ca.scrollHeight;
}

// ── Création des éléments ─────────────────────────────────────────────────

function showTyping(sender) {
  var color = WA_DATA.senderColors[sender] || '#8696a0';
  var row = document.createElement('div');
  row.className = 'typing-row';
  row.innerHTML =
    '<div class="typing-sender" style="color:' + color + '">' + sender + '</div>' +
    '<div class="typing-bubble">' +
      '<div class="dot"></div><div class="dot"></div><div class="dot"></div>' +
    '</div>';
  document.getElementById('messages-container').appendChild(row);
  return row;
}

function appendMessage(sender, text, time, instant) {
  var color     = WA_DATA.senderColors[sender] || '#8696a0';
  var container = document.getElementById('messages-container');
  var row       = document.createElement('div');
  row.className    = 'msg-row';
  row.dataset.sender = sender;
  if (instant) row.style.animation = 'none';

  var prev = container.lastElementChild;
  var showName = !prev
    || prev.dataset.sender !== sender
    || prev.classList.contains('ig-card-row')
    || prev.classList.contains('time-sep')
    || prev.classList.contains('date-sep')
    || prev.classList.contains('sys-msg');

  var nameHtml = showName
    ? '<div class="msg-sender" style="color:' + color + '">' + sender + '</div>'
    : '';

  row.innerHTML = nameHtml +
    '<div class="msg-bubble">' +
      formatText(text) +
      '<span class="msg-time">' + (time || '') + '</span>' +
    '</div>';
  container.appendChild(row);
}

function appendSystem(text) {
  var el = document.createElement('div');
  el.className = 'sys-msg';
  el.textContent = text;
  document.getElementById('messages-container').appendChild(el);
}

function appendTimeSep(text) {
  var el = document.createElement('div');
  el.className = 'time-sep';
  el.textContent = '- ' + text + ' -';
  document.getElementById('messages-container').appendChild(el);
}

function appendPostCard(sender, instant) {
  var color = WA_DATA.senderColors[sender] || '#8696a0';
  var card  = WA_DATA.postCard;
  var container = document.getElementById('messages-container');

  var row = document.createElement('div');
  row.className = 'ig-card-row';
  row.dataset.sender = sender;
  if (instant) row.style.animation = 'none';

  var cardEl = document.createElement('div');
  cardEl.className = 'ig-card';
  cardEl.innerHTML =
    '<div class="ig-card-header">' +
      '<div class="ig-card-avatar"><img src="images_clara/clara_profil.png" alt=""></div>' +
      '<div>' +
        '<div class="ig-card-name">' + esc(card.account) + '</div>' +
        '<div class="ig-card-app">📷 Instaclasse</div>' +
      '</div>' +
    '</div>' +
    '<img class="ig-card-photo" src="' + esc(card.photo) + '" alt="">' +
    '<div class="ig-card-caption">' + esc(card.caption) + '</div>' +
    '<button class="ig-card-btn">' + esc(card.seeBtn) + '</button>';

  cardEl.querySelector('.ig-card-btn').addEventListener('click', openIgModal);

  row.innerHTML = '<div class="msg-sender" style="color:' + color + '">' + sender + '</div>';
  row.appendChild(cardEl);
  container.appendChild(row);
}

// Échappe le HTML, met les @mentions en vert avec data-attr pour event delegation
function formatText(str) {
  return esc(str).replace(/@([\w]+)/g, function (match, username) {
    var connu = !!COMPTES[username];
    return '<span class="mention' + (comptesTrouves[username] ? ' trouve' : '') + '" ' +
           'style="cursor:pointer;text-decoration:underline dotted" ' +
           'title="' + UI.mentionTooltip + '" data-handle="' + username + '" ' +
           (connu ? 'data-compte="1"' : 'data-goto-compte="1"') + '>@' + username + '</span>';
  });
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Modal Instaclasse ────────────────────────────────────────────────────────

var igCommentsPlayed = false;

function openIgModal() {
  document.getElementById('ig-modal').classList.add('open');
  if (!igCommentsPlayed) {
    igCommentsPlayed = true;
    playIgComments();
  }
}

function closeIgModal() {
  document.getElementById('ig-modal').classList.remove('open');
}

function playIgComments() {
  var container = document.getElementById('ig-modal-comments');
  var note      = document.getElementById('ig-note');
  var comments  = WA_DATA.postComments;
  var accum     = 0;
  comments.forEach(function (c) {
    accum += c.delay;
    (function (comment, delay) {
      setTimeout(function () {
        var el = document.createElement('div');
        el.className = 'ig-comment';
        el.innerHTML =
          '<span class="c-user">' + esc(comment.user) + '</span> ' +
          '<span class="c-text">' + esc(comment.text) + '</span>';
        container.appendChild(el);
        if (container.children.length === comments.length) {
          setTimeout(function () { note.style.display = 'block'; }, 400);
        }
      }, delay);
    })(c, accum);
  });
}

// ── Quiz ──────────────────────────────────────────────────────────────────

function openQuiz(quizId) {
  var q = WA_DATA.quizzes[quizId];
  if (!q) { closeQuizContinue(); return; }

  document.getElementById('quiz-icon').textContent  = q.icon;
  document.getElementById('quiz-label').textContent = q.label;
  document.getElementById('quiz-question').textContent = q.question;

  var opts = document.getElementById('quiz-options');
  opts.innerHTML = '';
  q.options.forEach(function (opt, i) {
    var btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', function () { answerQuiz(q, i); });
    opts.appendChild(btn);
  });

  var fb = document.getElementById('quiz-feedback');
  fb.style.display = 'none'; fb.className = 'quiz-fb';
  document.getElementById('quiz-continue').style.display = 'none';
  document.getElementById('quiz-overlay').classList.add('open');
}

function answerQuiz(q, chosen) {
  var correct = chosen === q.correct;
  document.querySelectorAll('.quiz-opt').forEach(function (b, i) {
    b.disabled = true;
    if (i === q.correct)               b.classList.add('correct');
    else if (i === chosen && !correct) b.classList.add('wrong');
  });
  var fb = document.getElementById('quiz-feedback');
  fb.style.display = 'block';
  fb.className = 'quiz-fb ' + (correct ? 'good' : 'bad');
  fb.innerHTML = (correct ? '<strong>'+UI.correct+'</strong><br>' : '<strong>'+UI.wrong+'</strong><br>') + esc(q.explanation);
  document.getElementById('quiz-continue').style.display = 'inline-block';
}

function closeQuizContinue() {
  document.getElementById('quiz-overlay').classList.remove('open');
  processNext();
}

// ── État final + synthèse ─────────────────────────────────────────────────

function showEndState() {
  document.getElementById('chat-area').style.display = 'none';
  document.getElementById('wa-input').style.display  = 'none';
  // '2' = le joueur est deja retourne voir Ines et a obtenu le numero de la
  // tante. Rejouer la partie 3 ne doit pas effacer cette progression.
  try {
    if (localStorage.getItem('rc_p3_done') !== '2') {
      localStorage.setItem('rc_p3_done', '1');
    }
  } catch(e) {}

  var end  = document.getElementById('end-state');
  var data = WA_DATA.endMessage;
  document.getElementById('end-title').textContent = data.title;
  document.getElementById('end-note').textContent  = data.note;

  var list = document.getElementById('end-list');
  list.innerHTML = '';
  data.points.forEach(function (p) {
    var li = document.createElement('li');
    li.textContent = p;
    list.appendChild(li);
  });

  var synthEl = document.getElementById('synthesis-section');
  synthEl.innerHTML = '';
  var titleDiv = document.createElement('div');
  titleDiv.className   = 'synth-title-wa';
  titleDiv.textContent = WA_DATA.synthesis.title;
  synthEl.appendChild(titleDiv);
  WA_DATA.synthesis.items.forEach(function (item) {
    var div = document.createElement('div');
    div.className = 'synth-item-wa';
    div.innerHTML =
      '<div class="synth-head-wa">' +
        '<span class="synth-icon-wa">' + item.icon + '</span>' +
        '<span class="synth-type-wa">' + esc(item.type) + '</span>' +
      '</div>' +
      '<div class="synth-exp-wa">' + esc(item.exp) + '</div>';
    synthEl.appendChild(div);
  });

  // Ce que le témoin aurait pu faire, et pourquoi il n'y a pas de raison.
  var extra = document.createElement('div');
  var K = WA_DATA.kevin, M = WA_DATA.mobile, C = WA_DATA.comptes;
  if (C) {
    var n = Object.keys(comptesTrouves).length;
    var lignes = C.liste.map(function (e) {
      var vu = !!comptesTrouves[e.handle];
      return '<li>@' + esc(e.handle) + ' - <strong>' + (vu ? esc(e.qui) : '?') + '</strong></li>';
    }).join('');
    extra.innerHTML += '<div class="end-kevin"><h4>🕵️ ' + n + '/' + C.liste.length + ' ' + esc(C.label)
      + '</h4><ul>' + lignes + '</ul><p class="k-note">' + esc(C.cardNote) + '</p></div>';
  }
  if (K) {
    extra.innerHTML += '<div class="end-kevin"><h4>' + K.icon + ' ' + esc(K.title) + '</h4><p>' + esc(K.body) + '</p>'
      + '<ul>' + K.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>'
      + '<p class="k-note">' + esc(K.note) + '</p></div>';
  }
  if (M) {
    extra.innerHTML += '<div class="end-mobile"><h4>' + M.icon + ' ' + esc(M.title) + '</h4><p>' + esc(M.body) + '</p></div>';
  }
  synthEl.appendChild(extra);

  document.getElementById('end-prev').textContent = WA_DATA.navigation.prev.label;
  document.getElementById('end-prev').href        = WA_DATA.navigation.prev.url;
  document.getElementById('end-next').textContent = WA_DATA.navigation.next.label;
  document.getElementById('end-next').href        = WA_DATA.navigation.next.url;

  end.classList.add('active');
}

// ── Event listeners statiques ─────────────────────────────────────────────

document.getElementById('gate-btn').addEventListener('click', checkCode);
document.getElementById('quiz-continue').addEventListener('click', closeQuizContinue);
document.getElementById('ig-modal-close').addEventListener('click', closeIgModal);
document.getElementById('ig-modal-back').addEventListener('click', closeIgModal);

// Event delegation pour les @mentions dynamiques
document.getElementById('messages-container').addEventListener('click', function (e) {
  var c = e.target.closest('[data-compte]');
  if (c) { ouvrirCompte(c.dataset.handle); return; }
  if (e.target.closest('[data-goto-compte]')) goToCompte();
});
document.getElementById('cb-close').addEventListener('click', function () {
  document.getElementById('compte-overlay').style.display = 'none';
});
document.getElementById('cb-see').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('compte-overlay').style.display = 'none';
  goToCompte();
});

// ── Démarrage ─────────────────────────────────────────────────────────────
init();
