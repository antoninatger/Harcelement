var G=TEXTES.G, CRISIS=TEXTES.CRISIS, REVELATIONS=TEXTES.REVELATIONS;

var trust=0,good=0,step=0,crisisUsed=false,phase='story',busy=false,tyEl=null;
var ma=document.getElementById('ma'),ca=document.getElementById('ca');
var tf=document.getElementById('tf'),tlb=document.getElementById('tlb');

// Initialise les éléments statiques de l'en-tête depuis TEXTES
document.getElementById('av').textContent=TEXTES.contact.avatar;
document.getElementById('cn').textContent=TEXTES.contact.name;
document.getElementById('st').textContent=TEXTES.contact.statusOnline;

function sl(ms){return new Promise(function(r){setTimeout(r,ms);});}

function addBub(txt,type){
  var d=document.createElement('div');
  d.className='bb '+type;
  d.innerHTML=txt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
  ma.appendChild(d);
  ma.scrollTop=ma.scrollHeight;
}
function showTy(){
  tyEl=document.createElement('div');
  tyEl.className='tyi';
  tyEl.innerHTML='<span></span><span></span><span></span>';
  ma.appendChild(tyEl);
  ma.scrollTop=ma.scrollHeight;
  document.getElementById('st').textContent=TEXTES.contact.statusTyping;
}
function hideTy(){
  if(tyEl){tyEl.remove();tyEl=null;}
  document.getElementById('st').textContent=TEXTES.contact.statusOnline;
}
function updateBar(){
  var pct=Math.max(5,Math.min(95,(trust+4)/8*100));
  tf.style.width=pct+'%';
  tf.style.background=trust>=2?'#30d158':trust>=0?'#ff9f0a':'#ff453a';
  tlb.textContent=TEXTES.trustLabels[Math.max(0,Math.min(8,trust+4))];
  tlb.style.color=trust>=2?'#30d158':trust>=0?'#ff9f0a':'#ff453a';
  // Pas d'indicateur chiffre (+1/-1) : la conversation avec Ines n'est pas un
  // score a optimiser. La barre et le libelle suffisent a faire sentir qu'elle
  // se ferme ou s'ouvre, sans transformer l'echange en jeu de points.
}
function showChoices(arr,isCr){
  ca.innerHTML='<div class="chint'+(isCr?' cr':'')+'">'+
    (isCr?TEXTES.choiceHintCrise:TEXTES.choiceHint)+'</div>';
  arr.forEach(function(c){
    var b=document.createElement('button');
    b.className='cb'+(isCr?' cr-btn':'');
    b.innerHTML='<span class="cl">'+c.l+'</span><span>'+c.t+'</span>';
    b.addEventListener('click', function(){pick(c);});
    ca.appendChild(b);
  });
}

async function showNextStep(){
  await sl(430);
  var ns=G[step];
  if(ns.intro){
    showTy();
    var delay=ns.intro.length>2?900:1100;
    await sl(delay);hideTy();
    for(var i=0;i<ns.intro.length;i++){
      if(i>0){
        await sl(ns.intro[i-1].startsWith('(')?400:700);
        if(i<ns.intro.length-1){showTy();await sl(800);hideTy();}
      }
      addBub(ns.intro[i],ns.intro[i].startsWith('(')? 'sy':'r');
    }
    await sl(350);
  }
  if(ns.edu){
    await sl(500);
    addBub(ns.edu,'ed');
    await sl(700);
  }
  showChoices(ns.c,false);
  busy=false;
}

async function pick(choice){
  if(busy)return;
  busy=true;
  ca.querySelectorAll('button').forEach(function(b){b.disabled=true;});
  addBub(choice.t,'s');

  if(choice.end==='imm'){
    ca.innerHTML='';
    await sl(600);showTy();await sl(900);hideTy();
    addBub(TEXTES.finImmediate[0].t,TEXTES.finImmediate[0].type);
    await sl(350);addBub(TEXTES.finImmediate[1].t,TEXTES.finImmediate[1].type);
    endGame('imm');return;
  }

  if(phase==='story'&&choice.e>0)good++;
  trust+=choice.e;
  updateBar();
  ca.innerHTML='';

  if(trust<=-3){
    await sl(500);showTy();await sl(1200);hideTy();
    addBub(TEXTES.blocageMessages[0].t,TEXTES.blocageMessages[0].type);
    await sl(350);addBub(TEXTES.blocageMessages[1].t,TEXTES.blocageMessages[1].type);
    await sl(300);addBub(TEXTES.blocageMessages[2].t,TEXTES.blocageMessages[2].type);
    endGame('block');return;
  }

  // Réplique propre au choix (champ « r » de l'option), jouée avant la suite
  // commune de l'étape : sans elle, « Si j'ai essayé » répondait aussi bien à
  // « Tu sais ce qui s'est passé ? » qu'à « T'as pas essayé d'en parler ? ».
  if(choice.r){
    await sl(450);showTy();await sl(900);hideTy();
    addBub(choice.r,'r');
  }

  if(phase==='crisis'){
    phase='story';
    step++;
    if(step>=G.length){await sl(400);showTy();await sl(1400);hideTy();endGame('final');return;}
    await showNextStep();return;
  }

  if(trust<=-2&&!crisisUsed&&step<G.length-1){
    crisisUsed=true;phase='crisis';
    await sl(600);showTy();await sl(1400);hideTy();
    for(var i=0;i<CRISIS.intro.length;i++){
      addBub(CRISIS.intro[i],'cr');
      await sl(i<CRISIS.intro.length-1?700:300);
    }
    showChoices(CRISIS.c,true);
    busy=false;return;
  }

  step++;
  if(step>=G.length){await sl(400);showTy();await sl(1400);hideTy();endGame('final');return;}
  await showNextStep();
}

function buildIgCard(ig){
  var esc=function(s){return s.replace(/\\/g,'\\\\').replace(/'/g,"\\'");};
  return '<div class="igcard">'+ig.label+'<br>'
    +'<span style="color:#888;font-size:10.5px;">'+ig.compteLabel+'</span> <span class="igusr">'+ig.compte+'</span>'
    +' <button class="cpbtn" onclick="doCopy(this,\''+esc(ig.compte)+'\')">📋</button><br>'
    +'<span style="color:#888;font-size:10.5px;">'+ig.mdpLabel+'</span> <span class="igpwd">'+ig.mdp+'</span>'
    +' <button class="cpbtn" onclick="doCopy(this,\''+esc(ig.mdp)+'\')">📋</button>'
    +'<div class="igwarn">'+ig.warn+'</div></div>';
}

function doCopy(btn,text){
  var done=function(){
    var orig=btn.textContent;
    btn.textContent='✓';btn.classList.add('ok');
    setTimeout(function(){btn.textContent=orig;btn.classList.remove('ok');},1800);
  };
  if(navigator.clipboard){
    navigator.clipboard.writeText(text).then(done).catch(function(){fallbackCopy(text);done();});
  }else{fallbackCopy(text);done();}
}
function fallbackCopy(text){
  var ta=document.createElement('textarea');
  ta.value=text;ta.style.cssText='position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy');}catch(e){}
  document.body.removeChild(ta);
}

function buildRevCards(){
  var h='<div style="color:#4dcc70;font-size:10px;font-weight:700;margin-bottom:6px;letter-spacing:.04em;border-bottom:0.5px solid #1a4a1a;padding-bottom:5px;">'+TEXTES.revelationsHeader+'</div>';
  REVELATIONS.forEach(function(r){
    h+='<div class="revcard"><div class="revcard-head"><span class="revcard-icon">'+r.icon+'</span><span class="revcard-title">'+r.title+'</span></div><div class="revcard-txt">'+r.txt+'</div></div>';
  });
  return h;
}

function endGame(type){
  var html='';
  var F=TEXTES.fins;
  if(type==='imm'){
    html='<div style="color:#555;font-size:10.5px;font-weight:600;margin-bottom:7px;">'+F.imm.titre+'</div>'
      +'<div style="color:#555;font-size:12px;">'+F.imm.corps+'</div>';
    html+='<button class="rb js-restart">'+TEXTES.restartBtn+'</button>';
    ca.innerHTML='<div class="ea">'+html+'</div>';
  }else if(type==='block'){
    html='<div style="color:#ff453a;font-size:10.5px;font-weight:600;margin-bottom:7px;">'+F.blocage.titre+'</div>'
      +'<div style="color:#e5e5ea;font-size:12px;line-height:1.65;">'
      +'<span style="color:#555">'+TEXTES.contact.name+' :</span> '+F.blocage.ines+'<br>'
      +'<span style="color:#555">'+F.blocage.sys+'</span></div>';
    html+='<button class="rb js-restart">'+TEXTES.restartBtn+'</button>';
    ca.innerHTML='<div class="ea">'+html+'</div>';
  }else if(good>=2){
    finalSuccessPhase(good>=3);
  }else{
    html='<div style="color:#ff453a;font-size:10.5px;font-weight:600;margin-bottom:6px;">'+F.echec.titre+'</div>'
      +'<div style="color:#e5e5ea;font-size:12px;line-height:1.65;">'
      +'<span style="color:#555">'+TEXTES.contact.name+' :</span> '+F.echec.ines.replace(/\n/g,'<br>')+'<br><br>'
      +'<span style="color:#555">'+F.echec.sys+'</span></div>';
    html+='<button class="rb js-restart">'+TEXTES.restartBtn+'</button>';
    ca.innerHTML='<div class="ea">'+html+'</div>';
  }
}

async function finalSuccessPhase(isSuccess){
  var F=TEXTES.fins;
  var fin=isSuccess?F.succes:F.fragile;
  ca.innerHTML='';

  // Phase 0 - Inès explique pourquoi elle ne regarde pas elle-même
  if(fin.p0ines){
    await sl(500);showTy();await sl(900);hideTy();
    addBub(fin.p0ines,'r');
    await sl(500);
  }

  // Phase 1 - Inès demande de promettre d'être prudent
  await sl(600);showTy();await sl(1000);hideTy();
  addBub(fin.p1ines,'r');
  await sl(400);
  ca.innerHTML='<div class="chint">'+TEXTES.choiceHint+'</div>'
    +'<button class="cb js-p1"><span class="cl">→</span><span>'+fin.p1leo+'</span></button>';
  await new Promise(function(r){
    ca.querySelector('.js-p1').addEventListener('click',function(){addBub(fin.p1leo,'s');r();});
  });
  ca.innerHTML='';

  if(isSuccess&&fin.p1suite){
    await sl(500);showTy();await sl(700);hideTy();
    addBub(fin.p1suite,'r');
    await sl(400);
  }

  // Phase 2 - Inès demande de respecter la vie privée de Clara
  showTy();await sl(900);hideTy();
  addBub(fin.p2ines,'r');
  await sl(400);
  ca.innerHTML='<div class="chint">'+TEXTES.choiceHint+'</div>'
    +'<button class="cb js-p2"><span class="cl">→</span><span>'+fin.p2leo+'</span></button>';
  await new Promise(function(r){
    ca.querySelector('.js-p2').addEventListener('click',function(){addBub(fin.p2leo,'s');r();});
  });
  ca.innerHTML='';

  // Phase 3 - Inès donne les codes
  await sl(700);showTy();await sl(1200);hideTy();
  addBub(fin.codesMsg,'r');
  await sl(600);

  // Phase 4 - Résumé : codes + bilan + navigation
  var titleColor=isSuccess?'#30d158':'#ff9f0a';
  var html='<div style="color:'+titleColor+';font-size:10.5px;font-weight:600;margin-bottom:6px;">'+fin.titre+'</div>';
  html+=buildIgCard(fin.ig);
  html+='<div style="margin-top:8px;">'+buildRevCards()+'</div>';
  html+='<a href="'+UI.nextPartUrl+'" class="nxbtn">'+fin.nextPartBtn+'</a>';
  html+='<button class="rb js-restart" style="margin-top:6px;">'+TEXTES.restartBtn+'</button>';
  ca.innerHTML='<div class="ea">'+html+'</div>';
}

async function startGame(){
  trust=0;good=0;step=0;crisisUsed=false;phase='story';busy=false;tyEl=null;
  ma.innerHTML='';ca.innerHTML='<div class="chint">…</div>';
  tf.style.width='50%';tf.style.background='#ff9f0a';
  tlb.textContent=TEXTES.trustInitial;tlb.style.color='#ff9f0a';
  document.getElementById('st').textContent=TEXTES.contact.statusOnline;

  var O=TEXTES.ouverture;
  await sl(500);
  addBub(O[0].t,O[0].type);
  showTy();await sl(700);hideTy();
  addBub(O[1].t,O[1].type);
  await sl(300);
  addBub(O[2].t,O[2].type);
  showTy();await sl(1100);hideTy();
  addBub(O[3].t,O[3].type);
  await sl(320);
  addBub(O[4].t,O[4].type);
  showTy();await sl(900);hideTy();
  addBub(O[5].t,O[5].type);
  await sl(350);
  if(G[0].edu){await sl(400);addBub(G[0].edu,'ed');await sl(600);}
  showChoices(G[0].c,false);
  busy=false;
}

// Event delegation pour le bouton restart généré dynamiquement
ca.addEventListener('click', function(e){
  if(e.target.closest('.js-restart')) startGame();
});

try { localStorage.setItem('rc_p1_visited','1'); } catch(e) {}

// ── Deuxième conversation Inès (après partie 3) ───────────────────────────

var openSecondDirect = false;
var secondDejaResolue = false;
(function(){
  var p3done = null;
  try { p3done = localStorage.getItem('rc_p3_done'); } catch(e) {}
  if (!p3done) return;

  var notifBar = document.getElementById('p3-notif-bar');
  notifBar.style.display = 'flex';

  notifBar.addEventListener('click', function () {
    notifBar.style.display = 'none';
    openSecondConvo();
  });

  // Dès que la Partie 3 est finie, revenir sur la Partie 1 ouvre directement
  // la conversation « tante ». Rejouer toute la première conversation pour
  // retrouver le numéro bloquait les joueurs qui avaient quitté la page.
  // Si le numéro a déjà été donné (rc_p3_done = 2), l'échange s'affiche d'un
  // coup, déjà résolu, avec le numéro et le bouton vers la Partie 4.
  // « ?debut » permet de relire volontairement la première conversation.
  if (location.search.indexOf('debut') === -1) openSecondDirect = true;
  secondDejaResolue = (p3done === '2');
})();

function openSecondConvo(){
  var S = UI.secondConvo;
  // Masque la conversation principale, affiche la seconde
  var nb = document.getElementById('p3-notif-bar');
  if (nb) nb.style.display = 'none';
  document.querySelector('.tbar').style.display = 'none';
  document.getElementById('ma').style.display   = 'none';
  document.getElementById('ca').style.display   = 'none';
  var sc = document.getElementById('second-convo');
  sc.style.display = 'flex';
  document.getElementById('st').textContent = S.statusOnline;

  var scMa = document.getElementById('sc-ma');
  scMa.innerHTML = '';
  var scInputRow = document.getElementById('sc-input-row');
  var scInput    = document.getElementById('sc-input');
  var scSend     = document.getElementById('sc-send');
  var endEl      = document.getElementById('sc-end');
  scInputRow.style.display = 'none';
  endEl.style.display = 'none';

  function addSc(txt, type) {
    var d = document.createElement('div');
    d.className = 'bb ' + type;
    d.textContent = txt;
    scMa.appendChild(d);
    scMa.scrollTop = scMa.scrollHeight;
  }
  function addNumero() {
    var d = document.createElement('div');
    d.className = 'bb r';
    d.innerHTML = '<span style="font-size:14px;font-weight:700;letter-spacing:.08em;color:#30d158;">04 54 78 95 32</span>';
    scMa.appendChild(d);
    scMa.scrollTop = scMa.scrollHeight;
  }
  function montrerFin() {
    var html = '<a href="'+S.nextUrl+'" class="nxbtn">'+S.nextBtn+'</a>';
    if (S.relireBtn) {
      html += '<a href="'+location.pathname+'?debut" class="rb" style="display:block;box-sizing:border-box;text-align:center;margin-top:6px;text-decoration:none;">'+S.relireBtn+'</a>';
    }
    endEl.innerHTML = html;
    endEl.style.display = 'block';
  }
  // Inès « écrit… » pendant ms, puis envoie txt
  function ecrit(txt, ms) {
    return new Promise(function(r){
      document.getElementById('st').textContent = S.statusTyping;
      var ty = document.createElement('div');
      ty.className = 'tyi';
      ty.innerHTML = '<span></span><span></span><span></span>';
      scMa.appendChild(ty); scMa.scrollTop = scMa.scrollHeight;
      setTimeout(function(){
        ty.remove();
        document.getElementById('st').textContent = S.statusOnline;
        if (txt === '#numero') addNumero(); else addSc(txt, 'r');
        r();
      }, ms);
    });
  }

  // Conversation déjà résolue : on affiche tout, sans rejouer ni redemander.
  if (secondDejaResolue) {
    addSc(S.playerMsg, 's');
    addSc(S.q, 'r');
    addSc(S.reponseResolue, 's');
    S.foundTante.concat(S.foundSuite).forEach(function(t){ addSc(t, 'r'); });
    addNumero();
    addSc(S.apresNumero, 'r');
    montrerFin();
    return;
  }

  // Amorce : le joueur envoie le premier message
  addSc(S.playerMsg, 's');
  sl(700).then(function(){ return ecrit(S.q, 1100); }).then(function(){
    scInputRow.style.display = 'flex';
    scInput.focus();
  });

  var envoiEnCours = false;
  async function sendMsg() {
    var val = scInput.value.trim();
    if (!val || envoiEnCours) return;
    envoiEnCours = true;
    scInput.value = '';
    scInputRow.style.display = 'none';
    addSc(val, 's');

    var n = val.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
    // « chez sa tante » est la réponse naturelle ; on accepte aussi les mots
    // du groupe Whatsupp (« havre secret ») et leurs équivalents anglais.
    var parHavre = ['havre','secret','haven','safe'].some(function(w){ return n.includes(w); });
    var parTante = ['tante','campagne','aunt','countryside'].some(function(w){ return n.includes(w); });

    if (!parHavre && !parTante) {
      await ecrit(S.wrongAnswer, 1200);
      envoiEnCours = false;
      scInputRow.style.display = 'flex';
      scInput.focus();
      return;
    }

    // Inès n'a pas le numéro sous la main : elle comprend en même temps que
    // Léo, puis va le chercher.
    var lignes = (parTante ? S.foundTante : S.foundHavre).concat(S.foundSuite);
    for (var i = 0; i < lignes.length; i++) {
      await ecrit(lignes[i], i === 0 ? 1200 : 1000);
      await sl(350);
    }
    await ecrit('#numero', 1600);
    try { localStorage.setItem('rc_p3_done', '2'); } catch(e) {}
    await sl(500);
    await ecrit(S.apresNumero, 1000);
    await sl(500);
    montrerFin();
  }

  scSend.onclick = sendMsg;
  scInput.onkeydown = function(e){ if (e.key === 'Enter') sendMsg(); };
}

var intro1El = document.getElementById('intro1');
if(openSecondDirect){
  if(intro1El) intro1El.style.display='none';
  openSecondConvo();
}else if(intro1El){
  function dismissIntro(){
    intro1El.style.transition='opacity .9s ease';
    intro1El.style.opacity='0';
    intro1El.style.pointerEvents='none';
    setTimeout(function(){intro1El.style.display='none';startGame();},900);
  }
  document.getElementById('intro1-btn').addEventListener('click',function(e){
    e.stopPropagation();dismissIntro();
  });
  intro1El.addEventListener('click',dismissIntro);
}else{
  startGame();
}
