var TEXTES = {

  // ─── Écran titre ──────────────────────────────────────────────────────────

  titre: {
    eyebrow: "Un jeu sur l'empathie - Harcèlement scolaire",
    main:    "Convaincre Clara",
    sub:     "Clara ne vient plus au collège depuis cinq jours. Elle s'est réfugiée chez sa tante, à la campagne.\nTu es Léo, son ami{e}. Pour parler à Clara, tu dois d'abord convaincre sa tante que tu es digne de confiance - et que tu es vraiment là pour l'aider.",
    legende: ["La tante", "Clara", "Toi - Léo"],
    bouton:  "☎  Appeler",
    // Pensées de Léo après chaque numéro faux : le joueur doit deviner qu'Inès
    // (Partie 1) peut lui donner le numéro.
    pensees: [
      "Il y a forcément un moyen d'avoir ce numéro…",
      "Il y a certainement quelqu'un que je connais qui peut m'aider.",
      "C'est quelqu'un avec qui j'ai déjà interagi qui peut m'aider…"
    ]
  },

  // ─── Écran game over ──────────────────────────────────────────────────────

  gameover: {
    icon:  "📵",
    titre: "La tante a raccroché.",
    corps: "Elle a senti que tu n'étais pas prêt{e} à comprendre ce que Clara traversait.\n\nPour protéger sa nièce encore fragile, elle a préféré mettre fin à la conversation.",
    lecon: "💡 L'empathie, ce n'est pas seulement vouloir aider.\nC'est écouter avant de parler. Sentir avant d'agir."
  },

  btnRecommencer: "↩ Recommencer",
  btnRejouer:     "↩ Rejouer",

  // ─── Labels locuteurs ─────────────────────────────────────────────────────

  locuteurs: { aunt: "La tante", lea: "Clara", thomas: "Léo" },

  // Les numéros d'aide sont dans ressources.js - un seul endroit à changer.


  // ─── Ce que Léo fait le lendemain, et ce qui arrive au groupe ────────────
  // Le jeu disait « il faut des adultes qui peuvent agir » après quarante
  // minutes passées à enquêter seul. Voici la démarche qui manquait.

  suite: {
    icon:  "🧑‍🏫",
    titre: "Le lendemain, Léo",
    items: [
      "Va voir le CPE. Pas pour dénoncer : pour dire qu'une élève de son collège ne vient plus, et pourquoi.",
      "Montre les captures d'écran qu'il a gardées, et signale les comptes anonymes un par un.",
      "N'a rien réglé tout seul{e} - {il|elle} a fait ce qu'{un ami|une amie} de quatorze ans peut faire : prévenir quelqu'un qui peut agir."
    ]
  },

  epilogue: {
    icon:  "⚖️",
    titre: "Et les cinq du groupe ?",
    corps: "Le collège a ouvert une enquête et les a reçus, avec leurs parents. Deux ont répondu qu'ils « ne pensaient pas à mal ». Kevin a montré ses captures.\n\nEn France, le harcèlement scolaire est un délit depuis 2022 - y compris en ligne, y compris entre élèves d'un même établissement.\n\nClara est revenue trois semaines plus tard. Ça n'a pas été simple. Mais elle ne portait plus ça toute seule."
  },

  recapBtn: "🖨 Récapitulatif à imprimer",

  // ─── Fins (ordre décroissant de score) ───────────────────────────────────

  fins: [
    { minScore: 10,
      icon: "🌿", cls: "good",
      titre:    "Clara va demander de l'aide.",
      corps:    "Tu as su trouver les mots justes à chaque instant.\nNi trop forts, ni trop légers - juste présents.\n\nLa tante t'a fait confiance. Clara a raccroché avec une décision concrète : parler à un adulte de confiance, et ne plus porter ça seule.\n\nTon rôle n'était pas de la sauver. C'était de lui montrer que demander de l'aide, c'est possible.",
      citation: "« Je vais en parler à ma tante. Vraiment parler. »\n- Clara"
    },
    { minScore: 5,
      icon: "🕯️", cls: "ok",
      titre:    "Un premier pas.",
      corps:    "Tu as montré de la bonne volonté, même si certaines réponses manquaient de profondeur.\n\nClara hésite encore - mais elle envisage d'en parler à un adulte. Le chemin est long.\n\nTon rôle était de lui montrer que ce n'est pas à elle seule de tout porter.",
      citation: "« Peut-être que je vais essayer… »\n- Clara"
    },
    { minScore: 0,
      icon: "🌧️", cls: "bad",
      titre:    "La distance reste.",
      corps:    "Tu voulais bien faire, mais tes mots ont parfois sonné comme des reproches ou de l'impatience.\n\nClara reste fermée. Elle a besoin de temps - et de quelqu'un qui écoute vraiment avant d'agir.",
      citation: "« J'avais juste besoin que tu m'écoutes. »\n- Clara"
    }
  ],

  // ─── Textes codés dans la logique ────────────────────────────────────────

  jeu: {
    pivotHaut:   "(revenue) Elle hésite…\n… Attends.",
    pivotBas:    "(revenue) Elle n'est pas sûre… mais elle accepte de te parler.",
    echecGate1:  "(longue pause)\nJe suis désolée, Léo. Je ne crois pas que ce soit une bonne idée ce soir.\nPeut-être une autre fois.",
    echecGate2:  "[ Elle raccroche doucement. ]",
    echecRecup1: "(ton ferme) Je pense qu'il vaut mieux en rester là, Léo.\nClara n'est pas en état pour ça. Pas ce soir.",
    echecRecup2: "[ Elle raccroche. ]",
    scoreLabel:  "Score d'empathie : "
  },

  // ─── Scènes ───────────────────────────────────────────────────────────────

  SCENES: [

    // ── PHASE 1 : La tante ────────────────────────────────────────────────

    { id:'A1', phase:'1', phaseName:'Phase 1 - La tante', stepLabel:'Question 1 / 3',
      pdotCount:3, pdotActive:0,
      dialogueBefore:[
        {spk:'narrator', txt:'[ Le téléphone sonne… déclic. ]'},
        {spk:'aunt',     txt:'Allô ?'},
        {spk:'thomas',   txt:"Bonjour madame… excusez-moi de vous déranger. Je m'appelle Léo, je suis {un ami|une amie} de Clara. Est-ce que je pourrais lui parler, s'il vous plaît ?"},
        {spk:'aunt',     txt:"Léo… Oui, elle m'a parlé de toi.\nMais… je préfère être honnête : ce n'est pas un bon moment."},
      ],
      prompt:'Comment répondre ?',
      choices:[
        { emp:2, txt:"« Je comprends. Je veux pas la brusquer… mais elle me manque, et j'ai peur pour elle. »",
          fb:{type:'good', msg:'Tu montres que sa protection passe avant ton besoin.'},
          reply:{spk:'aunt', txt:"(un silence) C'est gentil de le dire comme ça."}},
        { emp:1, txt:"« Je comprends. Mais c'est important - ça ne prendra pas longtemps. »",
          fb:{type:'ok', msg:'Honnête, mais centré sur toi plutôt que sur Clara.'},
          reply:{spk:'aunt', txt:"Hmm… d'accord. Je t'écoute."}},
        { emp:0, txt:"« J'ai besoin de lui parler maintenant, c'est urgent. »",
          fb:{type:'bad', msg:'L\'insistance brusque met la tante sur la défensive.'},
          reply:{spk:'aunt', txt:"(froide) Urgent… pour toi, peut-être."},
          recovery:{
            auntLine: "Ce n'est pas une urgence pour moi, Léo. Et pour l'instant, c'est ce qui compte.",
            prompt:   'La tante attend. Que dis-tu ?',
            good:{ txt:"« Vous avez raison. Je suis désolé{e}. C'est elle qui compte, pas moi. »",
                   reply:{spk:'aunt', txt:"(légèrement adoucie) …D'accord. Continue."} },
            bad: { txt:"« Mais vous ne comprenez pas, c'est vraiment important. »",
                   reply:{spk:'aunt', txt:"(sèchement) Je comprends très bien. Et ça ne me rassure pas."} }
          }
        },
      ]
    },

    { id:'A2', phase:'1', phaseName:'Phase 1 - La tante', stepLabel:'Question 2 / 3',
      pdotCount:3, pdotActive:1,
      dialogueBefore:[
        {spk:'aunt', txt:"Tu sais, depuis qu'elle est arrivée ici… Clara n'est plus la même.\nElle pleure beaucoup. Elle fait des cauchemars. Elle se réveille paniquée la nuit.\nEt surtout… elle culpabilise. Elle pense que tout est de sa faute."},
      ],
      prompt:'Que réponds-tu ?',
      choices:[
        { emp:2, txt:"« Elle culpabilise ? Mais elle a rien fait… C'est ça qui me fait le plus mal. »",
          fb:{type:'good', msg:'Tu défends Clara directement. La tante le ressent.'},
          reply:{spk:'aunt', txt:"(souffle) C'est exactement ce qu'elle a besoin d'entendre."}},
        { emp:1, txt:"« Je savais pas que c'était à ce point… c'est vraiment grave. »",
          fb:{type:'ok', msg:'Sincère, mais tu restes en surface.'},
          reply:{spk:'aunt', txt:"Oui. C'est très grave."}},
        { emp:0, txt:"« Elle aurait dû m'en parler avant d'en arriver là. »",
          fb:{type:'bad', msg:'Cela ressemble à un reproche. La tante le perçoit clairement.'},
          reply:{spk:'aunt', txt:"(sèchement) Elle n'osait pas. C'est précisément le problème."},
          recovery:{
            auntLine: "Si tu lui faisais des reproches maintenant… tu la blesserais encore plus, Léo.",
            prompt:   'Comment réagis-tu à ça ?',
            good:{ txt:"« Vous avez raison. Ce n'est pas ce que je voulais dire. Elle ne méritait rien de tout ça. »",
                   reply:{spk:'aunt', txt:"(pause) …C'est mieux. J'entends de la sincérité."} },
            bad: { txt:"« Je fais juste remarquer que si elle m'avait parlé, on aurait pu éviter ça. »",
                   reply:{spk:'aunt', txt:"(froide) Éviter ça. Tu penses vraiment que c'était si simple."} }
          }
        },
      ]
    },

    { id:'A3', phase:'1', phaseName:'Phase 1 - La tante', stepLabel:'Question 3 / 3',
      pdotCount:3, pdotActive:2,
      dialogueBefore:[
        {spk:'aunt', txt:"Le harcèlement, ça détruit lentement. Ça te fait douter de ta valeur…\nElle s'est renfermée. Elle évite même de regarder son téléphone.\nSi tu veux vraiment l'aider… il faudra être patient. Très patient."},
      ],
      prompt:"Avant qu'elle aille demander à Clara…",
      choices:[
        { emp:2, txt:"« Je serai patient{e}. Dites-lui juste que je suis là. Elle est pas obligée de me parler. »",
          fb:{type:'good', msg:"Tu enlèves toute pression. C'est exactement ce qu'il fallait."},
          reply:{spk:'aunt', txt:"(plus douce) Je vais lui dire ça. Attends."}},
        { emp:1, txt:"« Je vous promets d'être {doux|douce}. Merci de me donner cette chance. »",
          fb:{type:'ok', msg:"Sincère. La tante apprécie l'honnêteté."},
          reply:{spk:'aunt', txt:"D'accord… je vais lui demander."}},
        { emp:0, txt:"« Je vais lui dire que tout va s'arranger, que j'ai un plan. »",
          fb:{type:'bad', msg:"Tu parles de toi et de ton plan - pas d'elle."},
          reply:{spk:'aunt', txt:"(froide) Un plan. Clara n'a pas besoin d'un plan. Elle a besoin d'être entendue."},
          recovery:{
            auntLine: "Est-ce que tu comprends la différence, Léo ?",
            prompt:   '',
            good:{ txt:"« Oui… vous avez raison. Je voulais juste l'aider mais je suis allé{e} trop vite. »",
                   reply:{spk:'aunt', txt:"(longue pause) …Je vais lui demander. Mais ne la brusque pas."} },
            bad: { txt:"« Je pense que ça lui ferait du bien d'avoir un objectif concret. »",
                   reply:{spk:'aunt', txt:"(ferme) Je ne crois pas que tu sois prêt{e} à lui parler ce soir."} }
          }
        },
      ]
    },

    // ── PIVOT ─────────────────────────────────────────────────────────────

    { id:'PIVOT', phase:'pivot', phaseName:'En attente…', stepLabel:'',
      pdotCount:0, pdotActive:-1,
      dialogueBefore:[
        {spk:'narrator', txt:'[ Bruits étouffés… la tante s\'éloigne… murmures au loin… ]'},
      ],
      prompt:null, choices:[], isContinue:true
    },

    // ── PHASE 2 : Clara ───────────────────────────────────────────────────

    { id:'L1', phase:'2', phaseName:'Phase 2 - Clara', stepLabel:'Question 1 / 4',
      pdotCount:4, pdotActive:0,
      dialogueBefore:[
        {spk:'narrator', txt:'[ Un froissement de téléphone… ]'},
        {spk:'lea',      txt:'Allô… ?'},
        {spk:'thomas',   txt:'Clara… c\'est moi. Léo.'},
        {spk:'lea',      txt:'… Salut.'},
        {spk:'thomas',   txt:"Je suis désolé{e} d'appeler comme ça. Je ne savais pas comment faire autrement."},
        {spk:'lea',      txt:"C'est… c'est pas grave."},
        {spk:'thomas',   txt:"Tu m'as manqué."},
        {spk:'lea',      txt:"(souffle) Toi aussi…"},
        {spk:'thomas',   txt:"Pourquoi tu n'as rien dit ? Tu sais que tu pouvais me parler…"},
        {spk:'lea',      txt:"J'y ai pensé… plein de fois.\nJ'ai même commencé à écrire des messages… et puis je les supprimais."},
      ],
      prompt:'Que lui réponds-tu ?',
      choices:[
        { emp:2, txt:"« T'avais pas besoin de trouver les bons mots. Je t'aurais écoutée, même sans explication. »",
          fb:{type:'good', msg:"Tu lèves la pression des mots. Elle peut souffler."},
          reply:{spk:'lea', txt:"(silence) …Je sais. Je crois que j'avais honte."}},
        { emp:1, txt:"« Je comprends… c'est dur de savoir comment dire ces choses. »",
          fb:{type:'ok', msg:'Vrai, mais un peu général.'},
          reply:{spk:'lea', txt:"Ouais… c'est ça."}},
        { emp:0, txt:"« Pourquoi tu as supprimé ces messages ? J'aurais répondu, tu sais. »",
          fb:{type:'bad', msg:"Tu mets l'accent sur toi, pas sur ce qu'elle vivait."},
          reply:{spk:'lea', txt:"(froide) J'en sais rien…"}},
      ]
    },

    { id:'L2', phase:'2', phaseName:'Phase 2 - Clara', stepLabel:'Question 2 / 4',
      pdotCount:4, pdotActive:1,
      dialogueBefore:[
        {spk:'lea', txt:"Au début, c'était juste des remarques… des petites piques.\nJe me disais que ça allait passer.\nMais après… ça a empiré. Des moqueries en groupe. Des commentaires sur tout.\nEt ensuite, ça a continué en ligne. Des messages. Des captures. Des rumeurs.\nJe ne pouvais plus y échapper… même chez moi."},
      ],
      prompt:"Que ressens-tu à l'entendre ?",
      choices:[
        { emp:2, txt:"« Même chez toi t'étais pas tranquille… T'avais plus aucun endroit où souffler. Je suis désolé{e}. »",
          fb:{type:'good', msg:'Tu nommes sa réalité avec précision. Elle se sent comprise.'},
          reply:{spk:'lea', txt:"(voix qui se brise) Oui… c'est exactement ça."}},
        { emp:1, txt:"« C'est horrible… être harcelée même à la maison. »",
          fb:{type:'ok', msg:'Sincère, mais tu restes en surface.'},
          reply:{spk:'lea', txt:"Ouais…"}},
        { emp:0, txt:"« T'aurais pu bloquer ces gens, désactiver tes réseaux. »",
          fb:{type:'bad', msg:'Un conseil non demandé, qui ressemble à un reproche.'},
          reply:{spk:'lea', txt:"(froide) Merci, j'y avais pas pensé."}},
      ]
    },

    { id:'L3', phase:'2', phaseName:'Phase 2 - Clara', stepLabel:'Question 3 / 4',
      pdotCount:4, pdotActive:2,
      dialogueBefore:[
        {spk:'lea', txt:"Le pire, tu sais quoi ?\nC'est quand j'ai commencé à y croire.\nQuand je me regardais dans le miroir et que je voyais ce qu'ils disaient."},
      ],
      prompt:'Comment lui répondre ?',
      choices:[
        { emp:2, txt:"« C'est normal que t'aies fini par y croire, ils te l'ont dit cent fois. Mais c'est faux. C'est eux le problème, pas toi. »",
          fb:{type:'good', msg:'Tu expliques le mécanisme. Tu lui rends la réalité.'},
          reply:{spk:'lea', txt:"(longue pause) Personne ne l'avait dit comme ça avant."}},
        { emp:1, txt:"« Non. Ce que tu voyais, c'est leurs mensonges - pas toi. »",
          fb:{type:'ok', msg:'Clair et direct. Utile.'},
          reply:{spk:'lea', txt:"J'essaie de me le dire… c'est dur."}},
        { emp:0, txt:"« Tu sais bien que c'est faux ce qu'ils disent. »",
          fb:{type:'bad', msg:'"Tu sais bien" minimise sa douleur sans le vouloir.'},
          reply:{spk:'lea', txt:"(silence) Si je le savais vraiment, j'aurais pas craqué."}},
      ]
    },

    { id:'L4', phase:'2', phaseName:'Phase 2 - Clara', stepLabel:'Question 4 / 4',
      pdotCount:4, pdotActive:3,
      dialogueBefore:[
        {spk:'lea',    txt:"Ça fait cinq jours que je suis ici…\nLes deux premiers, je sortais même pas de la chambre.\nMaintenant… ça va un peu moins mal. Mais j'ai encore peur.\nPeur de retourner au collège. Peur que ça recommence. Peur que rien ne change."},
        {spk:'thomas', txt:"Tu en as parlé à ta tante ? À tes parents ?"},
        {spk:'lea',    txt:"Ma tante sait un peu… Elle est gentille. Mais je veux pas les inquiéter.\nJ'ai l'impression que si j'en parle vraiment… ça devient réel."},
      ],
      prompt:'Que lui dire ?',
      choices:[
        { emp:2, txt:"« C'est déjà réel, Clara. Et c'est pour ça qu'il faut des adultes qui peuvent agir : ta tante, tes parents, le CPE. Pas pour tout régler d'un coup. Juste pour que tu portes plus ça toute seule. »",
          fb:{type:'good', msg:"Tu lui montres que chercher de l'aide adulte, c'est un acte de courage - pas une faiblesse."},
          reply:{spk:'lea', txt:"(silence) …Peut-être. Ma tante m'a proposé d'appeler le collège.\nJ'avais dit non. Mais là… peut-être que oui."}},
        { emp:1, txt:"« Tu n'as pas à régler ça toute seule. Si tu veux, je peux être là quand tu en parles à quelqu'un - n'importe quel adulte de confiance. »",
          fb:{type:'ok', msg:"Solidaire. Mais c'est à elle de faire le premier pas - tu le lui rappelles bien."},
          reply:{spk:'lea', txt:"(hésitante) …D'accord. Je vais y réfléchir."}},
        { emp:0, txt:"« T'inquiète, je vais régler ça moi-même. Ces gens vont avoir des problèmes. »",
          fb:{type:'bad', msg:"Tu prends tout sur toi. Ce n'est pas ton rôle - et elle sait que ça risque d'empirer."},
          reply:{spk:'lea', txt:"(froide) Non… s'il te plaît, fais rien. Ça va juste empirer."}},
      ]
    }

  ]

};

const UI = {
  recapUrl: "recapitulatif.html",
  invalidCode: "Code invalide - vérifie les 4 caractères."
};
