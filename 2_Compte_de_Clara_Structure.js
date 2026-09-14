'use strict';

// ─── ÉTAT ────────────────────────────────────────────────────────────────────

let gamePhase = 0; // 0=waiting, 1=mission active, 2=types found
let typesFound = new Set();
// Un joueur qui revient (ou qui a repris avec un code) garde ce qu'il a trouvé.
try { (JSON.parse(localStorage.getItem('rc_types') || '[]') || []).forEach(t => typesFound.add(t)); } catch (e) {}
const REQUIRED_TYPES = 6;

// Les QCM ont été écrits avant le système à neuf types : leur champ « type »
// est une phrase, pas une clé de HARCEL_TYPES. On les rattache ici. Le QCM 23
// (« un compte créé rien que pour harceler ») n'a pas d'équivalent : ce n'est
// pas un type de harcèlement mais une technique - il reste un point d'analyse.
const QUIZ_TYPE = { 4:'menaces', 7:'rumeurs', 11:'manipulation', 22:'exclusion', 23:null };
const PHOTO_QUIZ_TYPE = { 3:'body_shaming', 5:'exclusion', 7:'exclusion' };
let quizAnswered = {};
let selectMode = false;
let currentIdentifyData = null;

// ─── UTILITAIRES ─────────────────────────────────────────────────────────────

// Comptes démasqués dans la Partie 3 : au retour sur l'Instaclasse, ils portent
// le prénom de qui se cache derrière. Clara ne le saura jamais ; le joueur si.
let COMPTES_CONNUS = {};
try { COMPTES_CONNUS = JSON.parse(localStorage.getItem('rc_comptes') || '{}') || {}; } catch (e) {}

function normaliseStr(s) {
  // Les fragments de HARCEL_MAP sont écrits sans apostrophe ni ligature
  // (« tas fait », « loeil ») : on retire les deux côtés avant de comparer,
  // sinon « t'as » ne rencontre jamais « tas ».
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/œ/g,'oe').replace(/[\u2019']/g,'')
    .replace(/^(du |de la |de l|le |la |les |un |une |des |au |cest |c est )/gi,'')
    .trim();
}
function levenshtein(a,b){
  const m=a.length,n=b.length;
  const d=Array.from({length:m+1},(_,i)=>Array.from({length:n+1},(_,j)=>i===0?j:j===0?i:0));
  for(let i=1;i<=m;i++) for(let j=1;j<=n;j++)
    d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]:1+Math.min(d[i-1][j],d[i][j-1],d[i-1][j-1]);
  return d[m][n];
}
function isHarcelement(input){
  const n=normaliseStr(input);
  const accepted=['harcelement','harcellement','intimidation','bullying','harcel','cyberharcel','violence en ligne'];
  return accepted.some(a=>{
    const na=normaliseStr(a);
    if(n.includes(na)||na.includes(n)) return true;
    if(n.length>5&&levenshtein(n,na)<=2) return true;
    return false;
  });
}

function getHarcelType(text) {
  const n = normaliseStr(text);
  for (const e of HARCEL_MAP) {
    if (n.includes(normaliseStr(e.frag))) return e.type;
  }
  return null;
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  if (screenId !== 'screen-thread') maybeAskInitial();
}

// ─── LISTE DM ────────────────────────────────────────────────────────────────

function buildDMList() {
  const list = document.getElementById('dmList');
  const visible = CONVOS.filter(c => !c.secret || gamePhase >= 2);
  // Secret DM goes first when revealed
  const sorted = gamePhase >= 2
    ? [CONVOS.find(c=>c.id===99), ...visible.filter(c=>c.id!==99)]
    : visible;
  const unreadCount = sorted.filter(c=>c.unread).length;

  // Inject types tracker once
  const dmScreen = document.getElementById('screen-dm');
  if (!document.getElementById('types-tracker') && gamePhase >= 1) {
    const tracker = document.createElement('div');
    tracker.id = 'types-tracker';
    tracker.innerHTML = `<span class="t-label">0/${REQUIRED_TYPES} ${UI.typesIdentified}</span><div class="t-bar"><div class="t-fill"></div></div>`;
    const search = dmScreen.querySelector('.dm-search');
    if (search) dmScreen.insertBefore(tracker, search);
  }

  let html = `<div class="dm-section-label">Messages · <span style="color:#0095f6">${unreadCount} ${UI.unread}</span></div>`;
  sorted.forEach(c => {
    if (!c) return;
    if (c.section && c.id !== 99) {
      html += `<div class="dm-section-label" style="margin-top:8px;">${c.section}</div>`;
    }
    const border = c.id===99 ? 'border-left:3px solid #2dcc6f;' : '';
    html += `
      <div class="dm-item ${c.unread?'unread':''}${c.reported?' reported':''}" style="${border}" data-thread-id="${c.id}">
        <div class="dm-avatar anon">${c.avatar}</div>
        <div class="dm-info">
          <div class="dm-name">${c.name}${COMPTES_CONNUS[c.name] ? `<span class="demasque">${COMPTES_CONNUS[c.name]}</span>` : ''}</div>
          <div class="dm-preview" style="color:${c.unread?'var(--text)':'var(--text2)'};">${c.preview}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px">
          <span class="dm-time">${c.time}</span>
          ${c.unread ? '<div class="dm-dot"></div>' : ''}
        </div>
      </div>`;
  });
  list.innerHTML = html;
}

// ─── THREAD ──────────────────────────────────────────────────────────────────

function openThread(id) {
  const convo = CONVOS.find(c => c.id === id);
  noteExplored('dms', id);
  document.getElementById('threadName').textContent = convo.name;
  document.getElementById('threadSub').textContent =
    COMPTES_CONNUS[convo.name] ? (UI.demasqueSub || '') + COMPTES_CONNUS[convo.name] : convo.sub;
  document.getElementById('threadAvatar').textContent = convo.avatar;

  const thread = document.getElementById('msgThread');
  thread.innerHTML = `<div class="msg-timestamp center">${UI.today}</div>`;
  convo.messages.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = `msg-bubble ${m.from==='them'?'incoming':'outgoing'}`;
    div.style.animationDelay = (i * 0.06) + 's';
    div.textContent = m.text;
    const ht = getHarcelType(m.text);
    if (ht) {
      div.dataset.harcelType = ht;
      if (selectMode) div.classList.add('selectable');
    }
    thread.appendChild(div);
    if (i < convo.messages.length - 1) {
      const ts = document.createElement('div');
      ts.className = 'msg-timestamp';
      ts.textContent = m.time;
      thread.appendChild(ts);
    }
  });

  // Le journal de Clara (fil 99) : le code n'est plus imposé en overlay
  // deux secondes après l'ouverture - c'est le seul endroit où Clara parle
  // à la première personne, il faut pouvoir le lire. Un bouton en bas du
  // fil ouvre l'écran du code quand le joueur est prêt.
  if (id === 99) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'text-align:center;margin:18px 0 8px;';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = UI.noteCode || '🔐 4827';
    btn.style.cssText = 'background:#2dcc6f;color:#000;border:none;border-radius:8px;padding:11px 18px;font-size:.85rem;font-weight:700;cursor:pointer;';
    btn.addEventListener('click', () => {
      document.getElementById('code-overlay').style.display = 'flex';
    });
    wrap.appendChild(btn);
    thread.appendChild(wrap);
  }

  // Signalement : proposé sur les comptes qui harcèlent, pas sur l'amie ni
  // sur le journal de Clara.
  setupReport(convo);

  // Mark as read
  convo.unread = false;
  goTo('screen-thread');
  setTimeout(() => {
    thread.scrollTop = thread.scrollHeight;
    // Point d'analyse écrit pour cette conversation (QUIZZES) : il ne se
    // déclenchait nulle part jusqu'ici.
    if (gamePhase >= 1 && QUIZZES[id] && !quizAnswered[id]) setTimeout(() => showQuiz(id), 900);
  }, 100);
}

// ─── SIGNALEMENT ─────────────────────────────────────────────────────────────
// Le jeu montrait le harcèlement en détail et jamais le premier geste : dans
// les 9 500 mots, « signaler » n'apparaissait qu'une fois, dans une ressource.

let reportTarget = null;

function setupReport(convo) {
  const bar = document.getElementById('report-bar');
  const btn = document.getElementById('report-btn');
  if (!bar || !btn) return;
  const harceleur = convo.id !== 99 && convo.id !== 30;
  bar.hidden = !harceleur;
  if (!harceleur) { reportTarget = null; return; }
  reportTarget = convo;
  btn.disabled = !!convo.reported;
  btn.className = convo.reported ? 'done' : '';
  btn.textContent = convo.reported ? UI.reportDone : UI.reportBtn;
}

function openReport() {
  if (!reportTarget || reportTarget.reported) return;
  document.getElementById('report-overlay').style.display = 'flex';
}
function closeReport() {
  document.getElementById('report-overlay').style.display = 'none';
}
function confirmReport() {
  closeReport();
  if (!reportTarget) return;
  reportTarget.reported = true;
  const btn = document.getElementById('report-btn');
  btn.disabled = true; btn.className = 'done'; btn.textContent = UI.reportDone;
  buildDMList();
  flashHint(UI.reportAfter);
}

// ─── QUIZ ────────────────────────────────────────────────────────────────────

function showQuiz(id) {
  const q = QUIZZES[id];
  if (!q) return;
  document.getElementById('quiz-icon').textContent = q.icon || '🔍';
  document.getElementById('quiz-label').textContent = UI.quizLabel;
  document.getElementById('quiz-question').textContent = q.question;
  const optionsEl = document.getElementById('quiz-options');
  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.onclick = () => answerQuiz(id, i);
    optionsEl.appendChild(btn);
  });
  const fb = document.getElementById('quiz-feedback');
  fb.style.display = 'none';
  fb.textContent = '';
  fb.className = 'quiz-fb';
  document.getElementById('quiz-continue').style.display = 'none';
  document.getElementById('quiz-overlay').style.display = 'flex';
}

function answerQuiz(id, chosen) {
  const q = QUIZZES[id];
  quizAnswered[id] = true;
  const correct = (chosen === q.correct);
  document.querySelectorAll('.quiz-opt').forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('correct');
    else if (i === chosen && !correct) b.classList.add('wrong');
  });
  const fb = document.getElementById('quiz-feedback');
  fb.style.display = 'block';
  fb.className = 'quiz-fb ' + (correct ? 'good' : 'bad');
  fb.innerHTML = (correct ? '<strong>✓ ' + UI.correct + '</strong><br>' : '<strong>✗ ' + UI.wrong + '</strong><br>') + q.explanation;
  document.getElementById('quiz-continue').style.display = 'inline-block';
  // Le type est acquis même sur une mauvaise réponse : l'explication vient
  // d'être lue, et une erreur ne doit pas fermer l'accès à la suite.
  recordTypeFound(QUIZ_TYPE[id]);
}

function answerPhotoQuiz(idx, chosen) {
  const q = PHOTO_QUIZZES[idx];
  const key = 'photo_' + idx;
  if (!q || quizAnswered[key]) return;
  quizAnswered[key] = true;
  const correct = (chosen === q.correct);
  document.querySelectorAll('.quiz-opt').forEach((b, i) => {
    b.disabled = true;
    if (i === q.correct) b.classList.add('correct');
    else if (i === chosen && !correct) b.classList.add('wrong');
  });
  const fb = document.getElementById('quiz-feedback');
  fb.style.display = 'block';
  fb.className = 'quiz-fb ' + (correct ? 'good' : 'bad');
  fb.innerHTML = (correct ? '<strong>✓ ' + UI.correct + '</strong><br>' : '<strong>✗ ' + UI.wrong + '</strong><br>') + q.explanation;
  document.getElementById('quiz-continue').style.display = 'inline-block';
  recordTypeFound(PHOTO_QUIZ_TYPE[idx]);
}

function showPhotoQuiz(idx) {
  const q = PHOTO_QUIZZES[idx];
  if (!q || quizAnswered['photo_' + idx]) return;
  document.getElementById('quiz-icon').textContent = q.icon;
  document.getElementById('quiz-label').textContent = UI.quizLabel;
  document.getElementById('quiz-question').textContent = q.question;
  const optionsEl = document.getElementById('quiz-options');
  optionsEl.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.onclick = () => answerPhotoQuiz(idx, i);
    optionsEl.appendChild(btn);
  });
  const fb = document.getElementById('quiz-feedback');
  fb.style.display = 'none'; fb.textContent = ''; fb.className = 'quiz-fb';
  document.getElementById('quiz-continue').style.display = 'none';
  document.getElementById('quiz-overlay').style.display = 'flex';
}

function closeQuiz() {
  document.getElementById('quiz-overlay').style.display = 'none';
}

// ─── IDENTIFICATION FLOTTANTE ─────────────────────────────────────────────────

function toggleSelectMode() {
  selectMode = !selectMode;
  const btn = document.getElementById('identify-btn');
  if (selectMode) {
    btn.textContent = UI.cancelSelect;
    btn.style.background = '#555';
    document.querySelectorAll('[data-harcel-type]').forEach(el => el.classList.add('selectable'));
  } else {
    btn.textContent = UI.identifyBtn;
    btn.style.background = '#e94560';
    document.querySelectorAll('[data-harcel-type]').forEach(el => el.classList.remove('selectable'));
  }
}

function showIdentifyQCM(correctType, msgText) {
  currentIdentifyData = { correctType, msgText };
  document.getElementById('id-msg').textContent = '« ' + msgText + ' »';
  document.getElementById('id-feedback').style.display = 'none';
  document.getElementById('id-feedback').className = 'quiz-fb';
  document.getElementById('id-continue').style.display = 'none';
  const optionsEl = document.getElementById('id-options');
  optionsEl.innerHTML = '';
  Object.entries(HARCEL_TYPES).forEach(([key, t]) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.dataset.typeKey = key;
    btn.textContent = t.icon + ' ' + t.label;
    btn.onclick = () => answerIdentify(key);
    optionsEl.appendChild(btn);
  });
  document.getElementById('identify-overlay').style.display = 'flex';
}

function answerIdentify(chosen) {
  if (!currentIdentifyData) return;
  const { correctType } = currentIdentifyData;
  const correct = chosen === correctType;
  document.querySelectorAll('#id-options .quiz-opt').forEach(b => {
    b.disabled = true;
    if (b.dataset.typeKey === correctType) b.classList.add('correct');
    else if (b.dataset.typeKey === chosen && !correct) b.classList.add('wrong');
  });
  const fb = document.getElementById('id-feedback');
  fb.style.display = 'block';
  const t = HARCEL_TYPES[correctType];
  fb.className = 'quiz-fb ' + (correct ? 'good' : 'bad');
  fb.innerHTML = (correct ? '<strong>✓ ' + UI.correct + '</strong><br>' : '<strong>✗ ' + UI.wrong + '</strong><br>')
    + '<strong>' + t.icon + ' ' + t.label + '</strong><br>' + t.desc;
  document.getElementById('id-continue').style.display = 'block';
  if (correct) recordTypeFound(correctType);
}

function closeIdentify() {
  document.getElementById('identify-overlay').style.display = 'none';
  if (selectMode) toggleSelectMode();
  currentIdentifyData = null;
}

// ─── FLOW DU JEU ─────────────────────────────────────────────────────────────

// ─── QUESTION INITIALE : déclenchée par l'exploration, pas par l'horloge ──
// « Qu'est-ce que tu observes ? » arrivait 40 s après le chargement, quoi que
// fasse le joueur (même en pleine lecture d'une photo, même avant d'avoir
// passé l'écran de connexion). Elle vient maintenant quand il a réellement
// regardé : deux photos et deux conversations, et seulement quand il revient
// sur le profil ou la liste des messages. Un bouton permet de répondre plus
// tôt ; un filet de 2 min après la connexion couvre celui qui ne fait rien.

const explored = { photos: new Set(), dms: new Set() };
let initialAsked = false;
let observeBtn = null;
const FALLBACK_S = 120;

function gateOpen() { return window.igGateOpen === true; }
function fromGroupe() {
  try { return !!sessionStorage.getItem('harcelement_wa_from'); } catch (e) { return false; }
}
function overlayOpen() {
  return document.getElementById('lightbox').style.display === 'flex'
      || document.getElementById('screen-thread').classList.contains('active');
}
function canAsk() {
  return gamePhase === 0 && !initialAsked && !gateOpen() && !fromGroupe();
}
function askInitial() {
  if (!canAsk()) return;
  initialAsked = true;
  if (observeBtn) observeBtn.style.display = 'none';
  // Le bandeau du haut annonce « exercice sur le cyberharcèlement » : il
  // donnerait la réponse à la question qu'on vient de poser.
  const ban = document.getElementById('banner');
  if (ban) ban.style.visibility = 'hidden';
  const el = document.getElementById('initial-q-overlay');
  el.style.display = 'flex';
  document.getElementById('iq-input').focus();
}
function maybeAskInitial() {
  if (canAsk() && !overlayOpen() && explored.photos.size >= 2 && explored.dms.size >= 2) askInitial();
}
function noteExplored(kind, id) {
  if (gamePhase !== 0) return;
  explored[kind].add(id);
  showObserveBtn();
}
function showObserveBtn() {
  if (!canAsk()) return;
  if (!observeBtn) {
    observeBtn = document.createElement('button');
    observeBtn.type = 'button';
    observeBtn.id = 'observe-btn';
    observeBtn.textContent = UI.observeBtn || '🗣';
    observeBtn.style.cssText = 'position:fixed;bottom:20px;right:16px;z-index:450;background:#3a9fff;color:#fff;border:none;border-radius:24px;padding:11px 18px;font-size:.82rem;font-weight:700;cursor:pointer;box-shadow:0 2px 14px rgba(58,159,255,.45);white-space:nowrap;';
    observeBtn.addEventListener('click', askInitial);
    document.body.appendChild(observeBtn);
  }
  observeBtn.style.display = 'block';
}
// Filet : 2 min après la connexion, si rien ne s'est passé.
(function () {
  let sinceGate = 0;
  const tick = setInterval(() => {
    if (initialAsked || gamePhase !== 0) { clearInterval(tick); return; }
    if (gateOpen()) return;
    sinceGate++;
    if (sinceGate >= FALLBACK_S && canAsk() && !overlayOpen()) { askInitial(); clearInterval(tick); }
  }, 1000);
})();

function checkInitialAnswer() {
  const input = document.getElementById('iq-input').value.trim();
  const err = document.getElementById('iq-error');
  const ok  = document.getElementById('iq-success');
  if (!input) return;
  if (isHarcelement(input)) {
    err.style.display = 'none';
    ok.style.display = 'block';
    setTimeout(() => {
      document.getElementById('initial-q-overlay').style.display = 'none';
      const ban = document.getElementById('banner');
      if (ban) ban.style.visibility = '';
      document.getElementById('mission-overlay').style.display = 'flex';
    }, 1400);
  } else {
    ok.style.display = 'none';
    err.style.display = 'block';
    document.getElementById('iq-input').style.borderColor = '#e94560';
    setTimeout(() => { document.getElementById('iq-input').style.borderColor = '#3a4a6a'; }, 1500);
  }
}

function startMission() {
  gamePhase = 1;
  document.getElementById('mission-overlay').style.display = 'none';
  buildDMList();
  const tracker = document.getElementById('types-tracker');
  if (tracker) tracker.style.display = 'flex';
  updateTypesTracker();
  document.getElementById('identify-btn').style.display = 'block';
  // Reprise : le seuil peut déjà être atteint.
  if (typesFound.size >= REQUIRED_TYPES && gamePhase < 2) {
    gamePhase = 2;
    setTimeout(revealSecretMessage, 600);
    const btn = document.getElementById('synthesis-btn');
    if (btn) btn.style.display = 'flex';
  }
}

function recordTypeFound(type) {
  if (!type) return;
  typesFound.add(type);
  try { localStorage.setItem('rc_types', JSON.stringify([...typesFound])); } catch (e) {}
  updateTypesTracker();
  if (typesFound.size >= REQUIRED_TYPES && gamePhase < 2) {
    gamePhase = 2;
    setTimeout(revealSecretMessage, 1200);
    setTimeout(() => {
      const btn = document.getElementById('synthesis-btn');
      if (btn) btn.style.display = 'flex';
    }, 800);
  }
}

function updateTypesTracker() {
  const tracker = document.getElementById('types-tracker');
  if (!tracker) return;
  const count = Math.min(typesFound.size, REQUIRED_TYPES);
  const label = tracker.querySelector('.t-label');
  const fill  = tracker.querySelector('.t-fill');
  if (label) label.textContent = count + '/' + REQUIRED_TYPES + ' ' + UI.typesIdentified;
  if (fill)  fill.style.width  = (count / REQUIRED_TYPES * 100) + '%';
  tracker.style.display = 'flex';
}

function revealSecretMessage() {
  buildDMList();
  const notif = document.getElementById('secret-notif');
  if (notif) notif.style.display = 'block';
}

function goToSecretMessage() {
  const notif = document.getElementById('secret-notif');
  if (notif) notif.style.display = 'none';
  goTo('screen-dm');
  setTimeout(() => {
    const el = document.querySelector('[data-thread-id="99"]');
    if (el) el.scrollIntoView({behavior:'smooth',block:'center'});
  }, 200);
}

function showSynthesis() {
  const content = document.getElementById('synthesis-content');
  content.innerHTML = '';
  // Les neuf types, pas seulement ceux trouvés : un joueur pouvait terminer
  // sans jamais entendre parler de la sextorsion ni du harcèlement sexiste.
  Object.entries(HARCEL_TYPES).forEach(([key, t]) => {
    const found = typesFound.has(key);
    const div = document.createElement('div');
    div.className = 'synth-item' + (found ? '' : ' missed');
    div.innerHTML = `<div class="synth-item-head"><span class="synth-icon">${t.icon}</span><span class="synth-type">${t.label}</span>`
      + `<span class="synth-flag ${found ? 'ok' : 'no'}">${found ? UI.synthFound : UI.synthMissed}</span></div>`
      + `<div class="synth-exp">${t.desc}</div>`;
    content.appendChild(div);
  });
  const note = document.createElement('div');
  note.style.cssText = 'margin-top:14px;font-size:.75rem;color:#4a6080;line-height:1.6;text-align:center;';
  note.textContent = UI.synthNote;
  content.appendChild(note);
  document.getElementById('synthesis-overlay').style.display = 'flex';
}

// ─── LIGHTBOX ────────────────────────────────────────────────────────────────

var lbIndex = 0;
var lbImgs = [];

function collectImages() {
  lbImgs = Array.from(document.querySelectorAll('.post-cell img')).map(i => i.src);
}

function openLightbox(idx) {
  collectImages();
  if (!lbImgs.length) return;
  lbIndex = idx;
  noteExplored('photos', idx);
  showLb();
  maybePhotoQuiz(idx);
  var lb = document.getElementById('lightbox');
  lb.style.display = 'flex';
  // Copy avatar
  var profileAvatar = document.querySelector('.avatar-img img');
  var lbAv = document.getElementById('lb-avatar');
  if (profileAvatar) lbAv.innerHTML = '<img src="'+profileAvatar.src+'" style="width:100%;height:100%;object-fit:cover;">';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  maybeAskInitial();
}

function lbNav(dir) {
  lbIndex = (lbIndex + dir + lbImgs.length) % lbImgs.length;
  noteExplored('photos', lbIndex);
  showLb();
  maybePhotoQuiz(lbIndex);
}

// Laisse le temps de lire les commentaires avant de poser la question.
function maybePhotoQuiz(idx) {
  if (gamePhase < 1) return;
  if (!PHOTO_QUIZZES[idx] || quizAnswered['photo_' + idx]) return;
  setTimeout(() => {
    if (document.getElementById('lightbox').style.display === 'flex') showPhotoQuiz(idx);
  }, 1600);
}

function showLb() {
  document.getElementById('lb-img').src = lbImgs[lbIndex];
  var data = photoData[lbIndex] || { likes: 0, caption: "", comments: [] };
  var likeTxt = data.likes === 0 ? UI.firstToLike : data.likes + UI.likes;
  document.getElementById('lb-likes').textContent = likeTxt;
  document.getElementById('lb-caption').textContent = data.caption;
  var commDiv = document.getElementById('lb-comments');
  commDiv.innerHTML = '';
  data.comments.forEach(function(c) {
    var el = document.createElement('div');
    el.className = 'ig-comment';
    el.style.cssText = 'font-size:.8rem;color:#f5f5f5;line-height:1.4;';
    var ht = getHarcelType(c.text);
    if (ht) {
      el.dataset.harcelType = ht;
      if (selectMode) el.classList.add('selectable');
    }
    el.innerHTML = '<span style="font-weight:700;color:#f5f5f5;">' + c.user + '</span> <span class="c-text" style="color:#d0d0d0;">' + c.text + '</span>';
    commDiv.appendChild(el);
  });
  commDiv.scrollTop = 0;
}

// ─── RETOUR WHATSUPP ─────────────────────────────────────────────────────────

(function () {
  if (!sessionStorage.getItem('harcelement_wa_from')) return;

  var btn = document.createElement('a');
  btn.href = UI.backToWAUrl;
  btn.textContent = UI.backToWA;
  btn.style.cssText = [
    'position:fixed', 'bottom:72px', 'left:50%', 'transform:translateX(-50%)',
    'background:#00a884', 'color:#fff', 'border:none', 'border-radius:24px',
    'padding:10px 22px', 'font-size:.85rem', 'font-weight:700',
    'box-shadow:0 2px 12px rgba(0,0,0,.35)', 'z-index:600',
    'text-decoration:none', 'white-space:nowrap',
    'font-family:-apple-system,Segoe UI,sans-serif'
  ].join(';');
  btn.onclick = function () {
    sessionStorage.removeItem('harcelement_wa_from');
  };
  document.body.appendChild(btn);
})();

// ─── LISTENERS (remplacent tous les onclick) ──────────────────────────────────

// DM icon nav bar
document.getElementById('dm-icon').addEventListener('click', () => goTo('screen-dm'));

// Bottom nav bouton DM (4e bouton de .bottom-nav)
document.querySelectorAll('.bottom-nav button')[3].addEventListener('click', () => goTo('screen-dm'));

// Bouton retour screen-dm
document.querySelector('#screen-dm .back').addEventListener('click', () => goTo('screen-profile'));

// Bouton retour screen-thread
document.querySelector('#screen-thread .back').addEventListener('click', () => goTo('screen-dm'));

// Post cells - event delegation sur .posts-grid
document.querySelector('.posts-grid').addEventListener('click', e => {
  const cell = e.target.closest('[data-lightbox-idx]');
  if (cell) openLightbox(parseInt(cell.dataset.lightboxIdx));
});

// warning overlay supprimé

// Initial question - bouton valider
document.querySelector('.iq-btn').addEventListener('click', checkInitialAnswer);

// Initial question - Enter sur l'input
document.getElementById('iq-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkInitialAnswer();
});

// Mission overlay - bouton commencer
document.querySelector('.mission-btn').addEventListener('click', startMission);

// Notification secret
document.getElementById('secret-notif').addEventListener('click', goToSecretMessage);

// Quiz continue
document.getElementById('quiz-continue').addEventListener('click', closeQuiz);

// Signalement
document.getElementById('report-btn').addEventListener('click', openReport);
document.getElementById('report-go').addEventListener('click', confirmReport);
document.getElementById('report-cancel').addEventListener('click', closeReport);

// Avant de passer à la Partie 3 : ce que le joueur vient de faire du compte
// de Clara. Le lien de l'écran du code passe d'abord par cet écran.
(function () {
  const link = document.querySelector('#code-overlay a[href]');
  const pv = document.getElementById('privacy-overlay');
  if (!link || !pv) return;
  link.addEventListener('click', e => {
    if (link.dataset.seen) return;
    e.preventDefault();
    link.dataset.seen = '1';
    document.getElementById('code-overlay').style.display = 'none';
    pv.style.display = 'flex';
  });
})();

// Écran du code - retour au journal
const codeClose = document.getElementById('code-close');
if (codeClose && UI.codeClose) codeClose.textContent = UI.codeClose;
if (codeClose) codeClose.addEventListener('click', () => {
  document.getElementById('code-overlay').style.display = 'none';
});

// Synthèse close
document.getElementById('synthesis-close').addEventListener('click', () => {
  document.getElementById('synthesis-overlay').style.display = 'none';
});

// Lightbox - clic sur fond pour fermer
document.getElementById('lightbox').addEventListener('click', closeLightbox);

// Lightbox - bouton fermer
document.getElementById('lb-close-btn').addEventListener('click', e => {
  e.stopPropagation();
  closeLightbox();
});

// Lightbox - navigation précédent
document.getElementById('lb-prev').addEventListener('click', e => {
  e.stopPropagation();
  lbNav(-1);
});

// Lightbox - navigation suivant
document.getElementById('lb-next').addEventListener('click', e => {
  e.stopPropagation();
  lbNav(1);
});

// Event delegation sur #dmList : clic sur [data-thread-id]
document.getElementById('dmList').addEventListener('click', e => {
  const item = e.target.closest('[data-thread-id]');
  if (item) openThread(parseInt(item.dataset.threadId));
});

// Keyboard lightbox
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (lb.style.display === 'none') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

// Bouton identifier flottant
document.getElementById('identify-btn').addEventListener('click', toggleSelectMode);

// Identify overlay - annuler et continuer
document.getElementById('id-cancel').addEventListener('click', closeIdentify);
document.getElementById('id-continue').addEventListener('click', closeIdentify);

// Event delegation - messages DM en mode sélection
document.getElementById('msgThread').addEventListener('click', e => {
  if (!selectMode) return;
  const bubble = e.target.closest('[data-harcel-type]');
  if (bubble) showIdentifyQCM(bubble.dataset.harcelType, bubble.textContent);
  else if (e.target.closest('.msg-bubble.incoming')) flashHint(UI.notTagged);
});

// Event delegation - commentaires lightbox en mode sélection
document.getElementById('lb-comments').addEventListener('click', e => {
  if (!selectMode) return;
  const comment = e.target.closest('[data-harcel-type]');
  if (comment) {
    const textEl = comment.querySelector('.c-text');
    showIdentifyQCM(comment.dataset.harcelType, textEl ? textEl.textContent : comment.textContent);
  } else if (e.target.closest('.ig-comment')) flashHint(UI.notTagged);
});

// Petit message éphémère (mode sélection : message non balisé)
let hintTimer = null;
function flashHint(msg) {
  if (!msg) return;
  let el = document.getElementById('flash-hint');
  if (!el) {
    el = document.createElement('div');
    el.id = 'flash-hint';
    el.style.cssText = 'position:fixed;left:50%;bottom:76px;transform:translateX(-50%);max-width:88%;background:#1c2a44;color:#dfe8ff;border:1px solid #3a6fff;border-radius:10px;padding:10px 14px;font-size:.78rem;line-height:1.45;z-index:650;box-shadow:0 2px 14px rgba(0,0,0,.5);text-align:center;';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.display = 'block';
  clearTimeout(hintTimer);
  hintTimer = setTimeout(() => { el.style.display = 'none'; }, 3200);
}

// ─── INIT ────────────────────────────────────────────────────────────────────

buildDMList();

// Injecter le bouton synthèse dans l'écran DM après construction
const dmScreen = document.getElementById('screen-dm');
if (dmScreen) {
  const synthBtn = document.createElement('button');
  synthBtn.id = 'synthesis-btn';
  synthBtn.style.cssText = 'display:none;align-items:center;gap:8px;margin:10px 16px 4px;padding:10px 14px;background:#0f1a2e;border:1px solid #3a6fff;border-radius:10px;cursor:pointer;color:#3a6fff;font-size:.82rem;font-weight:600;width:calc(100% - 32px);';
  synthBtn.innerHTML = UI.synthBtn;
  synthBtn.addEventListener('click', showSynthesis);
  const dmList = dmScreen.querySelector('.dm-list');
  if (dmList) dmScreen.insertBefore(synthBtn, dmList);
}
