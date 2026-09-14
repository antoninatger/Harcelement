// ═══════════════════════════════════════════════════════════════
//  SAUVEGARDE - un seul code pour les quatre parties (voir sauvegarde.js)
// ═══════════════════════════════════════════════════════════════
function showSaveModal(){
  saveP4();
  document.getElementById('save-code').textContent = Sauvegarde.code();
  document.getElementById('modal-save').classList.add('open');
}
function hideSaveModal(){
  document.getElementById('modal-save').classList.remove('open');
}

function resumeFromCode(){
  const raw   = document.getElementById('code-input').value;
  const errEl = document.getElementById('code-error');
  const state = Sauvegarde.lire(raw);
  if(!state){ errEl.textContent=UI.invalidCode; return; }
  Sauvegarde.reprendre(raw);
  errEl.textContent='';
  clearTimers();
  empathy=state.empathy; sceneIndex=state.scene;
  auntScore=state.aunt; auntStrikes=state.strikes;
  buildHearts();
  // Le code rouvre aussi la serrure du numéro : elle a déjà été franchie.
  const gate=document.getElementById('phone-gate'); if(gate) gate.style.display='none';
  const intro=document.getElementById('intro4'); if(intro) intro.style.display='none';
  switchScreen('game');
  loadScene(sceneIndex);
}

// ═══════════════════════════════════════════════════════════════
//  UTILS
// ═══════════════════════════════════════════════════════════════
function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

// ═══════════════════════════════════════════════════════════════
//  INIT TEXTS FROM EXTERNAL JS
// ═══════════════════════════════════════════════════════════════
function initTextes(){
  const t=TEXTES.titre;
  document.querySelector('.t-eyebrow').textContent=t.eyebrow;
  document.querySelector('.t-main').textContent=t.main;
  document.querySelector('.t-sub').innerHTML=t.sub.replace(/\n/g,'<br>');
  // « .legend span » attrapait aussi les pastilles de couleur imbriquées :
  // les trois libellés atterrissaient un cran trop loin (« CLARALA TANTE »).
  const legs=document.querySelectorAll('.legend > span');
  t.legende.forEach((l,i)=>{ if(legs[i]) legs[i].appendChild(document.createTextNode(l)); });
  document.querySelector('.btn-start').textContent=t.bouton;

  const go=TEXTES.gameover;
  document.querySelector('.go-icon').textContent=go.icon;
  document.querySelector('.go-title').textContent=go.titre;
  document.querySelector('.go-body').innerHTML=go.corps.replace(/\n/g,'<br>');
  document.querySelector('.go-lesson').innerHTML=go.lecon.replace(/\n/g,'<br>');

  const retryBtns=document.querySelectorAll('.btn-retry');
  retryBtns[0].textContent=TEXTES.btnRecommencer;
  retryBtns[1].textContent=TEXTES.btnRejouer;
}

// ═══════════════════════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════════════════════
let empathy = 0;
let sceneIndex = 0;
let auntScore = 0;
let auntStrikes = 0;
const MAX_EMP = 10;
let _timers = [];

function later(fn, ms){ const id=setTimeout(fn,ms); _timers.push(id); return id; }

// L'état de cette partie est rangé avec celui des trois autres : le code de
// sauvegarde couvre le jeu entier (voir sauvegarde.js).
function saveP4(){
  try {
    localStorage.setItem('rc_p4', JSON.stringify({ e: empathy, s: sceneIndex, a: auntScore, k: auntStrikes }));
  } catch (e) {}
}
function clearTimers(){ _timers.forEach(clearTimeout); _timers=[]; }

function startGame(){
  clearTimers();
  empathy=0; sceneIndex=0; auntScore=0; auntStrikes=0;
  buildHearts();
  switchScreen('game');
  loadScene(0);
}
function retryGame(){ startGame(); }

function switchScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+id).classList.add('active');
}

// ═══ EMPATHIE ═══
// Les cœurs et le score chiffré ont été retirés : ils poussaient à chercher
// la bonne réponse plutôt qu'à répondre. Le compte reste en interne, il
// choisit la fin ; le joueur, lui, ne voit que le retour écrit.
function buildHearts(){
  const c=document.getElementById('hearts'); if(c) c.innerHTML='';
  const a=document.querySelector('.emp-area'); if(a) a.style.display='none';
}
function updateHearts(){}
function addEmpathy(n){ empathy=Math.min(MAX_EMP,empathy+n); saveP4(); }

// ═══ LOAD SCENE ═══
function loadScene(idx){
  sceneIndex=idx;
  saveP4();
  const scene=TEXTES.SCENES[idx];
  if(!scene){ showEnding(); return; }

  document.getElementById('phase-label').textContent=scene.phaseName;
  document.getElementById('step-label').textContent=scene.stepLabel;

  const pdotsEl=document.getElementById('pdots'); pdotsEl.innerHTML='';
  for(let i=0;i<scene.pdotCount;i++){
    const d=document.createElement('div');
    d.className='pdot'+(i<scene.pdotActive?' done':i===scene.pdotActive?' active':'');
    pdotsEl.appendChild(d);
  }

  const feed=document.getElementById('feed'); feed.innerHTML='';
  clearIx();

  let delay=150;
  scene.dialogueBefore.forEach(line=>{
    const dur = 500 + line.txt.length*9;
    later(()=>{ appendLine(line.spk,line.txt); scrollFeed(); }, delay);
    delay += dur;
  });

  if(scene.isContinue){
    later(()=>{
      document.getElementById('btn-continue').className='btn-continue show';
    }, delay+300);
  } else if(scene.choices.length>0){
    later(()=>showChoices(scene.choices, scene.prompt, (choice)=>onMainChoice(scene,choice)), delay+350);
  }
}

function clearIx(){
  document.getElementById('fb-toast').className='fb';
  document.getElementById('fb-toast').textContent='';
  document.getElementById('choices').innerHTML='';
  document.getElementById('q-prompt').textContent='';
  document.getElementById('btn-continue').className='btn-continue';
}

// ═══ APPEND LINE ═══
function appendLine(spk,txt){
  const feed=document.getElementById('feed');
  const div=document.createElement('div');
  div.className='dline';
  if(spk==='narrator'){
    div.innerHTML=`<div class="bbl narrator">${txt.replace(/\n/g,'<br>')}</div>`;
  } else {
    const label=TEXTES.locuteurs[spk]||spk;
    div.innerHTML=`<div class="spk ${spk}">${label}</div><div class="bbl ${spk}">${txt.replace(/\n/g,'<br>')}</div>`;
  }
  feed.appendChild(div);
}
function scrollFeed(){ const f=document.getElementById('feed'); later(()=>{f.scrollTop=f.scrollHeight;},60); }

// ═══ SHOW CHOICES ═══
function showChoices(choices, prompt, callback){
  if(prompt) document.getElementById('q-prompt').textContent=prompt;
  const wrap=document.getElementById('choices');
  wrap.innerHTML=''; wrap.className='choices anim';
  void wrap.offsetWidth;

  const shuffled=shuffle(choices);
  shuffled.forEach((c,i)=>{
    const btn=document.createElement('button');
    btn.className='cbtn';
    btn.innerHTML=c.txt;
    btn.addEventListener('click', ()=>{
      wrap.querySelectorAll('.cbtn').forEach((b,j)=>{b.disabled=true; b.style.opacity=j===i?'1':'.38';});
      callback(c,i);
    });
    wrap.appendChild(btn);
  });
}

// ═══ MAIN CHOICE HANDLER ═══
function onMainChoice(scene, choice){
  if(scene.phase==='1') auntScore+=choice.emp;
  addEmpathy(choice.emp);

  later(()=>{
    document.getElementById('choices').innerHTML='';
    document.getElementById('q-prompt').textContent='';
    const thomasTxt=choice.txt.replace(/^«\s*/,'').replace(/\s*»$/,'');
    appendLine('thomas',thomasTxt);
    scrollFeed();

    later(()=>{
      if(choice.reply){ appendLine(choice.reply.spk,choice.reply.txt); scrollFeed(); }
      // Le retour pédagogique (pourquoi cette réponse est juste, moyenne ou
      // maladroite) : sans lui, le joueur ne voit que des cœurs qui montent
      // ou pas, et cherche « la bonne réponse » au lieu de comprendre.
      if(choice.fb){
        const toast=document.getElementById('fb-toast');
        toast.textContent=choice.fb.msg;
        toast.className='fb show '+choice.fb.type;
      }

      if(choice.emp===0 && scene.phase==='1' && choice.recovery){
        later(()=>showRecovery(scene, choice.recovery), 900);
      } else {
        later(()=>checkGate(scene), 850);
      }
    }, 700);
  }, 380);
}

// ═══ RECOVERY ═══
function showRecovery(scene, rec){
  appendLine('aunt', rec.auntLine);
  scrollFeed();

  later(()=>{
    // Le retour de la réponse maladroite reste affiché pendant le rattrapage.
    const recoveryChoices=[
      { emp:'good', txt: rec.good.txt, _reply: rec.good.reply },
      { emp:'bad',  txt: rec.bad.txt,  _reply: rec.bad.reply  },
    ];
    showChoices(recoveryChoices, rec.prompt||'', (choice)=>onRecoveryChoice(scene, choice));
  }, 900);
}

function onRecoveryChoice(scene, choice){
  later(()=>{
    document.getElementById('choices').innerHTML='';
    document.getElementById('q-prompt').textContent='';

    const thomasTxt=choice.txt.replace(/^«\s*/,'').replace(/\s*»$/,'');
    appendLine('thomas', thomasTxt);
    scrollFeed();

    later(()=>{
      appendLine(choice._reply.spk, choice._reply.txt);
      scrollFeed();

      if(choice.emp==='good'){
        auntScore+=1;
        addEmpathy(1);
        auntStrikes=0;
      } else {
        auntStrikes++;
        if(auntStrikes>=2){
          later(()=>{
            appendLine('aunt', TEXTES.jeu.echecRecup1);
            appendLine('narrator', TEXTES.jeu.echecRecup2);
            scrollFeed();
            later(()=>switchScreen('gameover'), 2000);
          }, 800);
          return;
        }
      }
      later(()=>checkGate(scene), 850);
    }, 700);
  }, 380);
}

// ═══ GATES ═══
function checkGate(scene){
  if(scene.id==='A3'){
    if(auntScore<=1){
      later(()=>{
        appendLine('aunt', TEXTES.jeu.echecGate1);
        appendLine('narrator', TEXTES.jeu.echecGate2);
        scrollFeed();
        later(()=>switchScreen('gameover'), 2000);
      }, 400);
    } else {
      later(()=>nextStep(), 500);
    }
    return;
  }
  if(scene.id==='PIVOT'){
    const auntLine = auntScore>=5 ? TEXTES.jeu.pivotHaut : TEXTES.jeu.pivotBas;
    appendLine('aunt', auntLine);
    scrollFeed();
    later(()=>nextStep(), 900);
    return;
  }
  document.getElementById('btn-continue').className='btn-continue show';
}

function nextStep(){
  clearIx();
  const next=sceneIndex+1;
  if(next>=TEXTES.SCENES.length) showEnding();
  else loadScene(next);
}

// ═══ ENDING ═══
function buildResourcesHTML(){
  const R = (window.RESSOURCES || { titre: '', liste: [] });
  const items=R.liste.map(r=>
    `<div><span style="color:rgba(255,255,255,.7);">${r.label}</span> - ${r.txt}</div>`
  ).join('');
  return `<div style="margin-top:18px;border-top:1px solid rgba(255,255,255,.06);padding-top:14px;font-family:'Jost',sans-serif;font-size:11px;color:rgba(255,255,255,.55);line-height:1.8;text-align:left;">
  <div style="color:rgba(255,255,255,.6);font-weight:600;letter-spacing:.12em;text-transform:uppercase;font-size:11px;margin-bottom:6px;">${R.titre}</div>
  ${items}
</div>`;
}

function buildSuiteHTML(){
  const S=TEXTES.suite, E=TEXTES.epilogue;
  let h='';
  if(S){
    h+=`<div class="end-block"><h4>${S.icon} ${S.titre}</h4><ul>`
      + S.items.map(i=>`<li>${i}</li>`).join('') + `</ul></div>`;
  }
  if(E){
    h+=`<div class="end-block end-block-law"><h4>${E.icon} ${E.titre}</h4><p>${E.corps.replace(/\n/g,'<br>')}</p></div>`;
  }
  return h;
}

function buildRecapHTML(){
  if(!TEXTES.recapBtn) return '';
  const url = (typeof UI!=='undefined' && UI.recapUrl) ? UI.recapUrl : 'recapitulatif.html';
  return `<a class="end-recap" href="${url}">${TEXTES.recapBtn}</a>`;
}

function showEnding(){
  const s=empathy;
  const fin=TEXTES.fins.find(f=>s>=f.minScore)||TEXTES.fins[TEXTES.fins.length-1];

  document.getElementById('end-icon').textContent=fin.icon;
  document.getElementById('end-title').textContent=fin.titre;
  document.getElementById('end-title').className='end-title '+fin.cls;
  document.getElementById('end-body').textContent=fin.corps;
  document.getElementById('end-quote').textContent=fin.citation;
  document.getElementById('end-score').innerHTML = buildSuiteHTML() + buildResourcesHTML() + buildRecapHTML();
  try { localStorage.setItem('rc_fin', fin.cls); } catch(e){}
  switchScreen('end');
}

// ═══════════════════════════════════════════════════════════════
//  EVENT LISTENERS
// ═══════════════════════════════════════════════════════════════
document.querySelector('.btn-start').addEventListener('click', startGame);
document.querySelector('.btn-resume').addEventListener('click', resumeFromCode);
document.querySelector('.btn-save').addEventListener('click', showSaveModal);
document.getElementById('btn-continue').addEventListener('click', nextStep);
document.querySelector('.btn-close-modal').addEventListener('click', hideSaveModal);
document.getElementById('code-input').addEventListener('input', function(){ this.value = this.value.toUpperCase(); });

document.querySelectorAll('.btn-retry').forEach(btn => {
  btn.addEventListener('click', retryGame);
});

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
initTextes();
