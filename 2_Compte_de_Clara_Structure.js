'use strict';

// ─── ÉTAT ────────────────────────────────────────────────────────────────────

let gamePhase = 0; // 0 = avant la mission, 1 = mission en cours, 2 = types trouvés (message de Kevin)
let typesFound = new Set();
// Un joueur qui revient (ou qui a repris avec un code) garde ce qu'il a trouvé.
try { (JSON.parse(localStorage.getItem('rc_types') || '[]') || []).forEach(t => typesFound.add(t)); } catch (e) {}
const REQUIRED_TYPES = 6;

// Ce que Léo a déjà ouvert et déjà analysé. Les conversations et les photos
// ouvertes passent en gris, et le filtre « non lus » aide à trouver ce qui
// reste à lire. Gardé d'une visite à l'autre (retour depuis le groupe).
//   d : conversations ouvertes   p : photos ouvertes
//   m : messages analysés, clé → 'ok' (trouvé) ou 'vu' (réponse donnée)
let VUS = { d: [], p: [], m: {} };
try {
  const v = JSON.parse(localStorage.getItem('rc_p2_vus') || 'null');
  if (v && typeof v === 'object') VUS = { d: v.d || [], p: v.p || [], m: v.m || {} };
} catch (e) {}
function saveVus() { try { localStorage.setItem('rc_p2_vus', JSON.stringify(VUS)); } catch (e) {} }
function convoVue(id) { return VUS.d.indexOf(id) !== -1; }

// Comptes démasqués dans la Partie 3 : au retour sur l'Instaclasse, ils portent
// le prénom de qui se cache derrière. Clara ne le saura jamais ; le joueur si.
let COMPTES_CONNUS = {};
try { COMPTES_CONNUS = JSON.parse(localStorage.getItem('rc_comptes') || '{}') || {}; } catch (e) {}

// Lu une seule fois, puis effacé : le drapeau ne doit pas survivre à la page.
var venuDuGroupe = (function () {
  try {
    var v = !!sessionStorage.getItem('harcelement_wa_from');
    sessionStorage.removeItem('harcelement_wa_from');
    return v;
  } catch (e) { return false; }
})();

// Enquête lancée depuis le groupe (Partie 3) : un membre y décrit un
// commentaire sans dire quel compte il utilise ; le joueur le retrouve sous la
// bonne photo et appuie sur le pseudo de son auteur. Gardée jusqu'à résolution.
let enquete = null;
try {
  const k = sessionStorage.getItem('rc_enquete');
  if (k && UI.enquetes && UI.enquetes[k] && !COMPTES_CONNUS[UI.enquetes[k].handle]) enquete = UI.enquetes[k];
  else sessionStorage.removeItem('rc_enquete');
} catch (e) {}

// Les amies de Clara : leurs messages et commentaires ne sont pas à analyser.
const AMIS = ['sarah.girard', 'ines_l'];
const SANS_ANALYSE = [30, 99];

// ─── UTILITAIRES ─────────────────────────────────────────────────────────────

function norm(s) {
  return String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe').replace(/[’']/g, ' ').replace(/\s+/g, ' ').trim();
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function typesDm(id, i) { return ((window.TYPES_DM || {})[id] || [])[i] || []; }
function typesPhoto(idx, i) { return ((window.TYPES_PHOTO || {})[idx] || [])[i] || []; }

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  document.body.dataset.ecran = screenId;
  window.scrollTo(0, 0);
}

// ─── LISTE DES MESSAGES : recherche et filtre ────────────────────────────────

let filtre = 'tous';   // 'tous' ou 'nonlus'
let recherche = '';

function buildDMList() {
  const list = document.getElementById('dmList');
  const visibles = CONVOS.filter(c => !c.secret || gamePhase >= 2);
  const ordre = gamePhase >= 2
    ? [CONVOS.find(c => c.id === 99), ...visibles.filter(c => c.id !== 99)]
    : visibles;
  const nonLus = ordre.filter(c => !convoVue(c.id)).length;

  const nl = document.getElementById('dm-nonlus');
  if (nl) nl.textContent = nonLus;

  const q = norm(recherche);
  let html = '';
  let n = 0;
  ordre.forEach(c => {
    if (!c) return;
    if (filtre === 'nonlus' && convoVue(c.id)) return;
    let apercu = c.preview;
    if (q) {
      const dansNom = norm(c.name).includes(q) || (COMPTES_CONNUS[c.name] && norm(COMPTES_CONNUS[c.name]).includes(q));
      const m = c.messages.find(m => norm(m.text).includes(q));
      if (!dansNom && !m) return;
      if (m) apercu = m.text;
    }
    if (!q && filtre === 'tous' && c.section && c.id !== 99) {
      html += `<div class="dm-section-label" style="margin-top:8px;">${c.section}</div>`;
    }
    const vue = convoVue(c.id);
    const border = c.id === 99 ? 'border-left:3px solid #2dcc6f;' : '';
    html += `
      <div class="dm-item${vue ? ' visited' : ' unread'}${c.reported ? ' reported' : ''}" style="${border}" data-thread-id="${c.id}">
        <div class="dm-avatar anon">${c.avatar}</div>
        <div class="dm-info">
          <div class="dm-name">${esc(c.name)}${COMPTES_CONNUS[c.name] ? `<span class="demasque">${esc(COMPTES_CONNUS[c.name])}</span>` : ''}</div>
          <div class="dm-preview">${surligne(apercu, q)}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px">
          <span class="dm-time">${c.time}</span>
          ${vue ? '' : '<div class="dm-dot"></div>'}
        </div>
      </div>`;
    n++;
  });

  // La recherche couvre aussi les commentaires sous les photos.
  if (q) {
    let h2 = '';
    photoData.forEach((ph, idx) => {
      (ph.comments || []).forEach(cm => {
        if (!norm(cm.user).includes(q) && !norm(cm.text).includes(q)) return;
        h2 += `
          <div class="dm-item" data-photo-idx="${idx}">
            <div class="dm-avatar"><img src="${photoSrc(idx)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"></div>
            <div class="dm-info">
              <div class="dm-name">${surligne(cm.user, q)}<span class="dm-sous">${esc(UI.searchUnder.replace('{cap}', ph.caption))}</span></div>
              <div class="dm-preview">${surligne(cm.text, q)}</div>
            </div>
          </div>`;
        n++;
      });
    });
    if (h2) html += `<div class="dm-section-label" style="margin-top:10px;">${UI.searchComments}</div>` + h2;
  }
  if (!n) html = `<div class="dm-empty">${UI.searchNone}</div>`;
  list.innerHTML = html;
}

function surligne(texte, q) {
  const t = String(texte);
  if (!q) return esc(t);
  // Repère la position dans la version normalisée (même longueur, caractère
  // pour caractère, tant qu'on ne touche qu'aux accents).
  const plat = t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ');
  if (plat.length !== t.length) return esc(t);
  const i = plat.indexOf(q);
  if (i === -1) return esc(t);
  return esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + q.length)) + '</mark>' + esc(t.slice(i + q.length));
}

function photoSrc(idx) {
  const cell = document.querySelector('.post-cell[data-lightbox-idx="' + idx + '"] img');
  return cell ? cell.getAttribute('src') : '';
}

// ─── CONVERSATION ────────────────────────────────────────────────────────────

let convoOuverte = null;

function openThread(id) {
  const convo = CONVOS.find(c => c.id === id);
  convoOuverte = convo;
  if (!convoVue(id)) { VUS.d.push(id); saveVus(); }
  document.getElementById('threadName').textContent = convo.name;
  document.getElementById('threadSub').textContent =
    COMPTES_CONNUS[convo.name] ? (UI.demasqueSub || '') + COMPTES_CONNUS[convo.name] : convo.sub;
  document.getElementById('threadAvatar').textContent = convo.avatar;

  const thread = document.getElementById('msgThread');
  thread.innerHTML = `<div class="msg-timestamp center">${UI.today}</div>`;
  convo.messages.forEach((m, i) => {
    const div = document.createElement('div');
    div.className = `msg-bubble ${m.from === 'them' ? 'incoming' : 'outgoing'}`;
    div.style.animationDelay = (i * 0.06) + 's';
    div.textContent = m.text;
    if (m.from === 'them' && SANS_ANALYSE.indexOf(id) === -1) {
      div.dataset.key = 'd' + id + '_' + i;
      div.dataset.cible = '1';
      majCible(div, typesDm(id, i));
    }
    thread.appendChild(div);
    if (i < convo.messages.length - 1) {
      const ts = document.createElement('div');
      ts.className = 'msg-timestamp';
      ts.textContent = m.time;
      thread.appendChild(ts);
    }
  });

  // Message de Kevin (fil 99) : un bouton en bas du fil ouvre l'écran du code.
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

  setupReport(convo);
  goTo('screen-thread');
  setTimeout(() => { thread.scrollTop = thread.scrollHeight; }, 100);
}

// État visuel d'un message à analyser : pointillés tant qu'il reste à faire,
// étiquette(s) de type une fois analysé. Les pointillés restent visibles tout
// le long de la mission, quel que soit l'écran (avant, ils disparaissaient
// après chaque identification).
function majCible(el, types) {
  el.classList.remove('cible', 'analyse');
  const old = el.querySelector('.tag-row'); if (old) old.remove();
  if (gamePhase < 1) return;
  const etat = VUS.m[el.dataset.key];
  if (etat && types.length) {
    el.classList.add('analyse');
    if (etat === 'vu') el.classList.add('revele');
    else el.classList.remove('revele');
    const row = document.createElement('div');
    row.className = 'tag-row';
    row.innerHTML = types.map(t => HARCEL_TYPES[t] ? `<span class="tag">${HARCEL_TYPES[t].icon} ${esc(HARCEL_TYPES[t].label)}</span>` : '').join('');
    el.appendChild(row);
  } else if (types.length) {
    el.classList.add('cible');
  }
}
function rafraichirCibles() {
  document.querySelectorAll('[data-cible]').forEach(el => {
    const k = el.dataset.key;
    const m = /^d(\d+)_(\d+)$/.exec(k), p = /^p(\d+)_(\d+)$/.exec(k);
    const types = m ? typesDm(+m[1], +m[2]) : p ? typesPhoto(+p[1], +p[2]) : [];
    majCible(el, types);
  });
}

// ─── SIGNALEMENT ─────────────────────────────────────────────────────────────

let reportTarget = null;

function setupReport(convo) {
  const bar = document.getElementById('report-bar');
  const btn = document.getElementById('report-btn');
  if (!bar || !btn) return;
  const harceleur = SANS_ANALYSE.indexOf(convo.id) === -1;
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

// ─── IDENTIFIER UN HARCÈLEMENT ───────────────────────────────────────────────
// Une seule mécanique : on appuie sur un message (ou un commentaire), on
// choisit son type dans la liste. La liste s'ouvre en bas de l'écran et laisse
// le message visible au-dessus. Deux essais : au deuxième faux, la réponse
// est donnée et expliquée, mais le type n'est pas compté.

let idCourant = null;

function ouvrirIdentification(el, types, why) {
  if (gamePhase < 1) return;
  if (VUS.m[el.dataset.key]) return;
  if (!types.length) { flashHint(UI.notTagged); return; }
  idCourant = { el, key: el.dataset.key, types, why, essais: 0, fini: false };
  document.querySelectorAll('.focus').forEach(x => x.classList.remove('focus'));
  el.classList.add('focus');

  const quote = el.querySelector('.c-text') ? el.querySelector('.c-text').textContent : el.firstChild.textContent;
  document.getElementById('id-msg').textContent = '« ' + quote + ' »';
  document.getElementById('id-label').textContent = UI.idLabel;
  document.getElementById('id-sub').textContent = UI.idSeveral;
  const fb = document.getElementById('id-feedback');
  fb.style.display = 'none'; fb.className = 'quiz-fb'; fb.innerHTML = '';
  const cont = document.getElementById('id-continue');
  cont.style.display = 'none'; cont.textContent = UI.idContinue;
  document.getElementById('id-cancel').textContent = UI.idClose;

  const opts = document.getElementById('id-options');
  opts.innerHTML = '';
  Object.entries(HARCEL_TYPES).forEach(([k, t]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'id-opt';
    b.dataset.typeKey = k;
    b.innerHTML = `<span class="i">${t.icon}</span><span>${esc(t.label)}</span>`;
    b.addEventListener('click', () => repondre(k));
    opts.appendChild(b);
  });

  document.body.classList.add('sheet-open');
  document.getElementById('identify-overlay').style.display = 'flex';
  document.getElementById('identify-box').scrollTop = 0;
  setTimeout(() => { try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} }, 60);
}

function repondre(k) {
  const c = idCourant;
  if (!c || c.fini) return;
  const fb = document.getElementById('id-feedback');
  const boutons = document.querySelectorAll('#id-options .id-opt');
  const pourquoi = c.why || (HARCEL_TYPES[c.types[0]] || {}).desc || '';

  if (c.types.indexOf(k) !== -1) {
    c.fini = true;
    boutons.forEach(b => {
      b.disabled = true;
      if (b.dataset.typeKey === k) b.classList.add('correct');
      else if (c.types.indexOf(b.dataset.typeKey) !== -1) b.classList.add('also');
    });
    const autres = c.types.filter(t => t !== k).map(t => HARCEL_TYPES[t].icon + ' ' + HARCEL_TYPES[t].label);
    fb.className = 'quiz-fb good';
    fb.innerHTML = '<strong>✓ ' + esc(UI.correct) + '</strong>'
      + (autres.length ? '<br>' + esc(UI.alsoTypes) + ' ' + esc(autres.join(', ')) : '')
      + '<div class="why">' + esc(pourquoi) + '</div>';
    VUS.m[c.key] = 'ok'; saveVus();
    c.types.forEach(recordTypeFound);
  } else {
    c.essais++;
    boutons.forEach(b => { if (b.dataset.typeKey === k) { b.disabled = true; b.classList.add('wrong'); } });
    if (c.essais < 2) {
      fb.className = 'quiz-fb bad';
      fb.innerHTML = '<strong>✗ ' + esc(UI.wrong1) + '</strong>';
    } else {
      c.fini = true;
      boutons.forEach(b => {
        b.disabled = true;
        if (c.types.indexOf(b.dataset.typeKey) !== -1) b.classList.add('correct');
      });
      fb.className = 'quiz-fb bad';
      fb.innerHTML = '<strong>' + esc(UI.wrong2) + '</strong>'
        + '<div class="why">' + esc(pourquoi) + '</div>'
        + '<div class="note">' + esc(UI.wrongNote) + '</div>';
      VUS.m[c.key] = 'vu'; saveVus();
    }
  }
  fb.style.display = 'block';
  if (c.fini) document.getElementById('id-continue').style.display = 'block';
  setTimeout(() => { try { document.getElementById('id-footer').scrollIntoView({ block: 'end', behavior: 'smooth' }); } catch (e) {} }, 50);
}

function fermerIdentification() {
  document.getElementById('identify-overlay').style.display = 'none';
  document.body.classList.remove('sheet-open');
  document.querySelectorAll('.focus').forEach(x => x.classList.remove('focus'));
  if (idCourant) {
    const m = /^d(\d+)_(\d+)$/.exec(idCourant.key), p = /^p(\d+)_(\d+)$/.exec(idCourant.key);
    majCible(idCourant.el, m ? typesDm(+m[1], +m[2]) : p ? typesPhoto(+p[1], +p[2]) : idCourant.types);
  }
  idCourant = null;
  majBoutonTypes();
}

// ─── MISSION ─────────────────────────────────────────────────────────────────

function showMission() {
  let vue = false;
  try { vue = !!localStorage.getItem('rc_p2_mission'); } catch (e) {}
  if (vue) { startMission(); return; }
  document.getElementById('mission-overlay').style.display = 'flex';
}
// Appelé par le script de connexion quand l'avertissement est fermé.
window.rcApresAvertissement = showMission;

function startMission() {
  if (gamePhase >= 1) return;
  gamePhase = 1;
  try { localStorage.setItem('rc_p2_mission', '1'); } catch (e) {}
  document.getElementById('mission-overlay').style.display = 'none';
  buildDMList();
  updateTypesTracker();
  rafraichirCibles();
  majBoutonTypes();
  // Reprise : le seuil peut déjà être atteint.
  if (typesFound.size >= REQUIRED_TYPES) {
    gamePhase = 2;
    // Le bandeau « nouveau message » ne revient pas si Kevin a déjà été lu,
    // ni pendant une enquête lancée depuis le groupe : il couvrait le pseudo
    // à toucher sur la photo.
    if (enquete || convoVue(99) || convoVue('99')) buildDMList();
    else setTimeout(revealSecretMessage, 600);
    const btn = document.getElementById('synthesis-btn');
    if (btn) btn.style.display = 'flex';
  }
}

function recordTypeFound(type) {
  if (!type) return;
  typesFound.add(type);
  try { localStorage.setItem('rc_types', JSON.stringify([...typesFound])); } catch (e) {}
  updateTypesTracker();
  majBoutonTypes();
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
  tracker.querySelector('.t-label').textContent = count + '/' + REQUIRED_TYPES + ' ' + UI.typesIdentified;
  tracker.querySelector('.t-fill').style.width = (count / REQUIRED_TYPES * 100) + '%';
  tracker.style.display = gamePhase >= 1 ? 'flex' : 'none';
}

// Le bouton flottant : la liste des types à trouver, sur tous les écrans,
// y compris par-dessus une photo ouverte.
function majBoutonTypes() {
  const b = document.getElementById('types-btn');
  if (!b) return;
  b.textContent = UI.typesBtn + ' · ' + Math.min(typesFound.size, REQUIRED_TYPES) + '/' + REQUIRED_TYPES;
  b.style.display = (gamePhase >= 1 && !document.body.classList.contains('sheet-open')) ? 'block' : 'none';
}

function revealSecretMessage() {
  buildDMList();
  const notif = document.getElementById('secret-notif');
  if (notif) notif.style.display = 'block';
}

function goToSecretMessage() {
  const notif = document.getElementById('secret-notif');
  if (notif) notif.style.display = 'none';
  closeLightbox();
  goTo('screen-dm');
  setTimeout(() => {
    const el = document.querySelector('[data-thread-id="99"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
}

// La liste des neuf types : pendant la mission (ce qu'il reste à trouver) et
// à la fin (synthèse de ce qui est arrivé à Clara).
function showTypesList(mode) {
  const content = document.getElementById('synthesis-content');
  document.getElementById('synth-title').textContent = mode === 'synth' ? UI.synthTitle : UI.listTitle;
  content.innerHTML = '';
  if (mode !== 'synth') {
    const intro = document.createElement('div');
    intro.className = 'synth-intro';
    intro.textContent = UI.listIntro;
    content.appendChild(intro);
  }
  Object.entries(HARCEL_TYPES).forEach(([key, t]) => {
    const found = typesFound.has(key);
    const div = document.createElement('div');
    div.className = 'synth-item' + (found ? '' : ' missed');
    div.innerHTML = `<div class="synth-item-head"><span class="synth-icon">${t.icon}</span><span class="synth-type">${esc(t.label)}</span>`
      + `<span class="synth-flag ${found ? 'ok' : 'no'}">${found ? UI.synthFound : (mode === 'synth' ? UI.synthMissed : UI.synthTodo)}</span></div>`
      + `<div class="synth-exp">${esc(t.desc)}</div>`;
    content.appendChild(div);
  });
  if (mode === 'synth') {
    const note = document.createElement('div');
    note.style.cssText = 'margin-top:14px;font-size:.75rem;color:#4a6080;line-height:1.6;text-align:center;';
    note.textContent = UI.synthNote;
    content.appendChild(note);
  }
  // retour.js n'affiche son bandeau de fin que pour la synthèse, pas pour
  // la simple liste des types ouverte en cours de mission.
  document.getElementById('synthesis-overlay').dataset.mode = mode;
  document.getElementById('synthesis-overlay').style.display = 'flex';
}

// ─── PHOTOS ──────────────────────────────────────────────────────────────────

var lbIndex = 0;
var lbImgs = [];

function collectImages() {
  lbImgs = Array.from(document.querySelectorAll('.post-cell img')).map(i => i.src);
}

// Les photos ne changent pas d'aspect une fois ouvertes (comme dans la vraie
// appli) : seules les conversations passent en gris.
function notePhotoVue(idx) {
  if (VUS.p.indexOf(idx) === -1) { VUS.p.push(idx); saveVus(); }
}

function openLightbox(idx) {
  if (enquete) document.getElementById('lb-enquete').textContent = enquete.lbHint;
  collectImages();
  if (!lbImgs.length) return;
  lbIndex = idx;
  notePhotoVue(idx);
  showLb();
  var lb = document.getElementById('lightbox');
  lb.style.display = 'flex';
  var profileAvatar = document.querySelector('.avatar-img img');
  var lbAv = document.getElementById('lb-avatar');
  if (profileAvatar) lbAv.innerHTML = '<img src="' + profileAvatar.src + '" style="width:100%;height:100%;object-fit:cover;">';
}

function closeLightbox() {
  if (document.body.classList.contains('sheet-open')) fermerIdentification();
  document.getElementById('lightbox').style.display = 'none';
}

function lbNav(dir) {
  if (document.body.classList.contains('sheet-open')) fermerIdentification();
  lbIndex = (lbIndex + dir + lbImgs.length) % lbImgs.length;
  notePhotoVue(lbIndex);
  showLb();
}

function showLb() {
  document.getElementById('lb-img').src = lbImgs[lbIndex];
  var data = photoData[lbIndex] || { likes: 0, caption: '', comments: [] };
  document.getElementById('lb-likes').textContent = data.likes === 0 ? UI.firstToLike : data.likes + UI.likes;
  document.getElementById('lb-caption').textContent = data.caption;
  var lbTimeEl = document.getElementById('lb-time');
  if (lbTimeEl) lbTimeEl.textContent = data.time || '';
  var commDiv = document.getElementById('lb-comments');
  commDiv.innerHTML = '';
  data.comments.forEach(function (c, i) {
    var el = document.createElement('div');
    el.className = 'ig-comment';
    el.innerHTML = '<span class="c-user">' + esc(c.user) + '</span> <span class="c-text">' + esc(c.text) + '</span>';
    if (AMIS.indexOf(c.user) === -1) {
      el.dataset.key = 'p' + lbIndex + '_' + i;
      el.dataset.cible = '1';
      majCible(el, typesPhoto(lbIndex, i));
    }
    commDiv.appendChild(el);
  });
  commDiv.scrollTop = 0;
}

// ─── RETOUR WHATSUPP ─────────────────────────────────────────────────────────

(function () {
  if (!venuDuGroupe) return;
  var btn = document.createElement('a');
  btn.href = UI.backToWAUrl;
  btn.textContent = UI.backToWA;
  btn.style.cssText = [
    'position:fixed', 'bottom:72px', 'left:50%', 'transform:translateX(-50%)',
    'background:#00a884', 'color:#fff', 'border:none', 'border-radius:24px',
    'padding:10px 22px', 'font-size:.85rem', 'font-weight:700',
    // Sous la photo ouverte (z 500) : il masquait les commentaires.
    'box-shadow:0 2px 12px rgba(0,0,0,.35)', 'z-index:450',
    'text-decoration:none', 'white-space:nowrap',
    'font-family:-apple-system,Segoe UI,sans-serif'
  ].join(';');
  document.body.appendChild(btn);
})();

// ─── LISTENERS ───────────────────────────────────────────────────────────────

document.getElementById('dm-icon').addEventListener('click', () => goTo('screen-dm'));
document.querySelectorAll('.bottom-nav button')[3].addEventListener('click', () => goTo('screen-dm'));
document.querySelector('#screen-dm .back').addEventListener('click', () => goTo('screen-profile'));
document.querySelector('#screen-thread .back').addEventListener('click', () => {
  if (document.body.classList.contains('sheet-open')) fermerIdentification();
  buildDMList();
  goTo('screen-dm');
});

document.querySelector('.posts-grid').addEventListener('click', e => {
  const cell = e.target.closest('[data-lightbox-idx]');
  if (cell) openLightbox(parseInt(cell.dataset.lightboxIdx, 10));
});

document.querySelector('.mission-btn').addEventListener('click', startMission);
document.getElementById('secret-notif').addEventListener('click', goToSecretMessage);

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

const codeClose = document.getElementById('code-close');
if (codeClose && UI.codeClose) codeClose.textContent = UI.codeClose;
if (codeClose) codeClose.addEventListener('click', () => {
  document.getElementById('code-overlay').style.display = 'none';
});

document.getElementById('synthesis-close').addEventListener('click', () => {
  document.getElementById('synthesis-overlay').style.display = 'none';
});

// Photo : seul un clic sur le fond la ferme (un clic sur un commentaire sert
// à l'analyser).
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target.id === 'lightbox') closeLightbox();
});
document.getElementById('lb-close-btn').addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
document.getElementById('lb-prev').addEventListener('click', e => { e.stopPropagation(); lbNav(-1); });
document.getElementById('lb-next').addEventListener('click', e => { e.stopPropagation(); lbNav(1); });

document.getElementById('dmList').addEventListener('click', e => {
  const item = e.target.closest('[data-thread-id]');
  if (item) { openThread(parseInt(item.dataset.threadId, 10)); return; }
  const ph = e.target.closest('[data-photo-idx]');
  if (ph) openLightbox(parseInt(ph.dataset.photoIdx, 10));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.body.classList.contains('sheet-open')) { fermerIdentification(); return; }
  const lb = document.getElementById('lightbox');
  if (lb.style.display === 'none') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});

// Appui sur un message ou un commentaire : on l'analyse.
document.getElementById('msgThread').addEventListener('click', e => {
  const el = e.target.closest('[data-cible]');
  if (!el || !convoOuverte) return;
  const m = /^d(\d+)_(\d+)$/.exec(el.dataset.key);
  ouvrirIdentification(el, typesDm(+m[1], +m[2]), convoOuverte.why);
});
document.getElementById('lb-comments').addEventListener('click', e => {
  e.stopPropagation();
  // Pendant une enquête, le pseudo désigne l'auteur.
  const pseudo = e.target.closest('.c-user');
  if (enquete && pseudo) { verifierEnquete(pseudo.textContent.trim()); return; }
  const el = e.target.closest('[data-cible]');
  if (!el) return;
  const p = /^p(\d+)_(\d+)$/.exec(el.dataset.key);
  ouvrirIdentification(el, typesPhoto(+p[1], +p[2]), (photoData[+p[1]] || {}).why);
});

document.getElementById('id-cancel').addEventListener('click', fermerIdentification);
document.getElementById('id-continue').addEventListener('click', fermerIdentification);
document.getElementById('types-btn').addEventListener('click', () => showTypesList('list'));

// Recherche et filtre
const champ = document.getElementById('dm-search-input');
champ.placeholder = UI.searchPh;
champ.addEventListener('input', () => { recherche = champ.value; buildDMList(); });
document.querySelectorAll('.dm-filtre').forEach(b => {
  b.addEventListener('click', () => {
    filtre = b.dataset.filtre;
    document.querySelectorAll('.dm-filtre').forEach(x => x.classList.toggle('on', x === b));
    buildDMList();
  });
});

// ─── ENQUÊTE ─────────────────────────────────────────────────────────────────

function demarrerEnquete() {
  if (!enquete) return;
  document.body.classList.add('enquete');
  const bar = document.getElementById('enquete-bar');
  bar.innerHTML = enquete.bar;
  bar.style.display = 'block';
}

function verifierEnquete(user) {
  if (lbIndex !== enquete.photo) { flashHint(enquete.wrongPhoto); return; }
  if (user !== enquete.handle) { flashHint(enquete.wrongUser); return; }
  // Trouvé : le compte porte désormais le prénom de son auteur, ici comme
  // dans le groupe.
  COMPTES_CONNUS[enquete.handle] = enquete.qui;
  try {
    localStorage.setItem('rc_comptes', JSON.stringify(COMPTES_CONNUS));
    sessionStorage.removeItem('rc_enquete');
  } catch (e) {}
  document.getElementById('eq-title').textContent = enquete.okTitle;
  document.getElementById('eq-handle').textContent = '@' + enquete.handle;
  document.getElementById('eq-qui').textContent = enquete.qui;
  document.getElementById('eq-note').textContent = enquete.okNote;
  document.getElementById('eq-back').href = UI.backToWAUrl;
  const fh = document.getElementById('flash-hint'); if (fh) fh.style.display = 'none';
  document.getElementById('enquete-ok').style.display = 'flex';
  document.body.classList.remove('enquete');
  document.getElementById('enquete-bar').style.display = 'none';
  enquete = null;
  buildDMList();
}
document.getElementById('eq-stay').addEventListener('click', () => {
  document.getElementById('enquete-ok').style.display = 'none';
});

// Petit message éphémère
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
  hintTimer = setTimeout(() => { el.style.display = 'none'; }, 3600);
}

// ─── INIT ────────────────────────────────────────────────────────────────────

// Tracker des types, en tête de la liste des messages (cliquable : la liste)
(function () {
  const dmScreen = document.getElementById('screen-dm');
  const tracker = document.createElement('button');
  tracker.type = 'button';
  tracker.id = 'types-tracker';
  tracker.innerHTML = `<span class="t-label"></span><div class="t-bar"><div class="t-fill"></div></div><span class="t-more">📋</span>`;
  tracker.addEventListener('click', () => showTypesList('list'));
  const search = dmScreen.querySelector('.dm-search');
  if (search) dmScreen.insertBefore(tracker, search);

  const synthBtn = document.createElement('button');
  synthBtn.id = 'synthesis-btn';
  synthBtn.style.cssText = 'display:none;align-items:center;gap:8px;margin:10px 16px 4px;padding:10px 14px;background:#0f1a2e;border:1px solid #3a6fff;border-radius:10px;cursor:pointer;color:#3a6fff;font-size:.82rem;font-weight:600;width:calc(100% - 32px);';
  synthBtn.innerHTML = UI.synthBtn;
  synthBtn.addEventListener('click', () => showTypesList('synth'));
  const dmList = dmScreen.querySelector('.dm-list');
  if (dmList) dmScreen.insertBefore(synthBtn, dmList);
})();

buildDMList();
updateTypesTracker();

// Retour depuis le groupe : déjà connecté, déjà prévenu, la mission continue
// - sans rejouer l'introduction.
if (venuDuGroupe) {
  const intro = document.getElementById('intro2');
  if (intro) intro.style.display = 'none';
  startMission();
}
demarrerEnquete();
