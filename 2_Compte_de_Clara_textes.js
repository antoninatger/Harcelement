// ─── DONNÉES ─────────────────────────────────────────────────────────────────

const CONVOS = [
  // ── AUJOURD'HUI ──
  {
    id:1, avatar:"👤", name:"utilisateur_4729", sub:"Compte inconnu",
    unread:true, time:"il y a 4 min", section:"Aujourd'hui",
    preview:"t'as vu ta tete ce matin serieusement",
    messages:[
      { from:"them", text:"t'as vu ta tete ce matin serieusement", time:"10:42" },
      { from:"them", text:"ta coupe de cheveux c'est une catastrophe", time:"10:42" },
      { from:"them", text:"franchement fais un effort avant de venir en cours", time:"10:43" },
    ]
  },
  {
    id:2, avatar:"🙈", name:"anonymous_x0", sub:"Compte inconnu",
    unread:true, time:"il y a 12 min", section:null,
    preview:"tout le monde sait ce que t'as fait avec Nathan",
    messages:[
      { from:"them", text:"tout le monde sait ce que t'as fait avec Nathan aux toilettes", time:"10:31" },
      { from:"them", text:"t'as pas honte ?", time:"10:31" },
      { from:"them", text:"ca se fait pas de se comporter comme ca", time:"10:32" },
      { from:"them", text:"tu vas le regretter", time:"10:33" },
    ]
  },
  {
    id:3, avatar:"💀", name:"_noreply_ghost_", sub:"Compte inconnu",
    unread:true, time:"il y a 28 min", section:null,
    preview:"ta photo de profil elle est pathetique",
    messages:[
      { from:"them", text:"ta photo de profil elle est vraiment pathetique", time:"10:15" },
      { from:"them", text:"tu te crois belle ou quoi", time:"10:15" },
      { from:"them", text:"meme les 6emes se foutent de toi quand tu passes dans le couloir", time:"10:16" },
    ]
  },
  {
    id:4, avatar:"🐍", name:"vrai_info_colleg", sub:"Compte inconnu",
    unread:true, time:"il y a 45 min", section:null,
    preview:"c'est toi qui as balance le groupe et tout le monde le sait",
    messages:[
      { from:"them", text:"c'est toi qui as balance le groupe et tout le monde le sait", time:"09:58" },
      { from:"them", text:"t'aurais pas du faire ca", time:"09:59" },
      { from:"them", text:"tu crois que ca va rester sans consequence ?", time:"09:59" },
      { from:"them", text:"on est plusieurs a t'avoir a l'oeil maintenant", time:"10:00" },
    ]
  },
  {
    id:5, avatar:"😈", name:"user_fake8847", sub:"Compte inconnu",
    unread:true, time:"il y a 1h", section:null,
    preview:"j'ai screenshotte ta story d'hier tu faisais pitie",
    messages:[
      { from:"them", text:"j'ai screenshotte ta story d'hier", time:"09:22" },
      { from:"them", text:"tu faisais vraiment pitie avec tes larmes de crocodile", time:"09:22" },
      { from:"them", text:"ca tourne dans toute la classe depuis ce matin", time:"09:23" },
    ]
  },
  // ── HIER ──
  {
    id:6, avatar:"👤", name:"xxxxxxxxx_011", sub:"Compte inconnu",
    unread:false, time:"hier 22h14", section:"Hier",
    preview:"t'as un vrai probleme avec ton poids tu sais ca",
    messages:[
      { from:"them", text:"t'as un vrai probleme avec ton poids tu sais ca ?", time:"22:14" },
      { from:"them", text:"chaque fois qu'on te voit en cours c'est de pire en pire", time:"22:15" },
      { from:"them", text:"t'as pas de miroir chez toi ?", time:"22:15" },
    ]
  },
  {
    id:7, avatar:"🕷️", name:"anon_colleg_real", sub:"Compte inconnu",
    unread:false, time:"hier 20h37", section:null,
    preview:"on a fait un sondage sur toi dans la classe",
    messages:[
      { from:"them", text:"on a fait un sondage sur toi dans la classe", time:"20:37" },
      { from:"them", text:"la question c'etait : Clara est-elle la personne la plus nulle du college", time:"20:38" },
      { from:"them", text:"94% ont vote oui", time:"20:38" },
      { from:"them", text:"tu vas arreter de te la peter maintenant ?", time:"20:39" },
    ]
  },
  {
    id:8, avatar:"👁️", name:"jevoustrouve", sub:"Compte inconnu",
    unread:false, time:"hier 18h02", section:null,
    preview:"tes photos sont nulles arrete de poster",
    messages:[
      { from:"them", text:"tes photos sont vraiment nulles arrete de poster", time:"18:02" },
      { from:"them", text:"tu copies le style des autres mais ca rend pas pareil sur toi c'est logique", time:"18:03" },
      { from:"them", text:"desabonne-toi d'insta tu fais honte", time:"18:03" },
    ]
  },
  {
    id:9, avatar:"💬", name:"sansnom_2024", sub:"Compte inconnu",
    unread:false, time:"hier 16h44", section:null,
    preview:"t'es tellement sensible ca devient pesant pour tout le monde",
    messages:[
      { from:"them", text:"t'es tellement sensible ca devient pesant pour tout le monde", time:"16:44" },
      { from:"them", text:"tu pleures pour un rien c'est pathologique", time:"16:44" },
      { from:"them", text:"les autres te supportent plus mais personne veut te le dire en face", time:"16:45" },
      { from:"them", text:"maintenant tu sais", time:"16:45" },
    ]
  },
  // ── CETTE SEMAINE ──
  {
    id:10, avatar:"🔇", name:"xx_nobody_xx", sub:"Compte inconnu",
    unread:false, time:"lundi 21h10", section:"Cette semaine",
    preview:"ta facon de t'habiller c'est vraiment une honte",
    messages:[
      { from:"them", text:"ta facon de t'habiller c'est vraiment une honte", time:"21:10" },
      { from:"them", text:"on dirait que tu t'habilles dans les poubelles", time:"21:10" },
      { from:"them", text:"meme les profs ont remarque", time:"21:11" },
      { from:"them", text:"tu devrais rester chez toi franchement", time:"21:11" },
    ]
  },
  {
    id:11, avatar:"🤡", name:"super_secret_info", sub:"Compte inconnu",
    unread:false, time:"lundi 19h55", section:null,
    preview:"on parle de toi sur le groupe depuis hier soir",
    messages:[
      { from:"them", text:"tu sais qu'on parle de toi sur le groupe depuis hier soir ?", time:"19:55" },
      { from:"them", text:"ce que les mecs de ta classe disent sur toi c'est pas joli", time:"19:56" },
      { from:"them", text:"je te dirai pas ce que c'est, ca te ferait trop de mal", time:"19:56" },
      { from:"them", text:"ou peut-etre que tu merites de savoir en fait", time:"19:57" },
    ]
  },
  {
    id:12, avatar:"👤", name:"0000_mask_0000", sub:"Compte inconnu",
    unread:false, time:"dimanche 23h41", section:null,
    preview:"ta photo a ete partagee dans plusieurs groupes 💀",
    messages:[
      { from:"them", text:"ta photo a ete partagee dans plusieurs groupes 💀", time:"23:41" },
      { from:"them", text:"t'as un effet comique sans le vouloir c'est assez fort", time:"23:41" },
      { from:"them", text:"tout le monde se marre grace a toi", time:"23:42" },
    ]
  },
  {
    id:13, avatar:"🌑", name:"dark_mode_user", sub:"Compte inconnu",
    unread:false, time:"dimanche 20h18", section:null,
    preview:"tes amis te parlent encore par pitie tu le sais non",
    messages:[
      { from:"them", text:"tes amis te parlent encore par pitie tu le sais non ?", time:"20:18" },
      { from:"them", text:"j'ai demande a quelqu'un de ton groupe il m'a dit qu'il te supportait plus", time:"20:19" },
      { from:"them", text:"t'as pas beaucoup d'avenir dans cette classe", time:"20:19" },
    ]
  },
  // ── LE MOIS DERNIER ──
  {
    id:14, avatar:"👻", name:"fantome_reseau", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:"Le mois dernier",
    preview:"4 likes sur ta photo avec 600 abonnes c'est nul",
    messages:[
      { from:"them", text:"t'as vu ton nombre de likes sur ta derniere photo ?", time:"14:22" },
      { from:"them", text:"4 likes en 2 heures avec 600 abonnes c'est nul", time:"14:22" },
      { from:"them", text:"meme tes propres abonnes t'ignorent mdrrr", time:"14:23" },
      { from:"them", text:"prends ca comme un message", time:"14:23" },
    ]
  },
  {
    id:15, avatar:"🎭", name:"truth_teller_99", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:null,
    preview:"je comprends pas comment t'as encore des amis",
    messages:[
      { from:"them", text:"je comprends vraiment pas comment t'as encore des amis", time:"09:50" },
      { from:"them", text:"t'as rien d'interessant serieusement", time:"09:51" },
      { from:"them", text:"c'est pas mechant c'est juste la verite", time:"09:51" },
      { from:"them", text:"tu devrais y reflechir", time:"09:52" },
    ]
  },
  {
    id:16, avatar:"🕶️", name:"incognito_user21", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:null,
    preview:"on t'a filmee a la cantine hier t'etais au courant",
    messages:[
      { from:"them", text:"on t'a filmee a la cantine hier t'etais au courant ?", time:"18:05" },
      { from:"them", text:"t'avais l'air completement perdue comme d'hab", time:"18:05" },
      { from:"them", text:"ca va tourner partout ne t'inquiete pas", time:"18:06" },
    ]
  },
  {
    id:30, avatar:"💛", name:"sarah.girard", sub:"Amie · Lyon",
    unread:true, time:"il y a 3 sem.", section:null,
    preview:"clara reponds s'il te plait je m'inquiete",
    messages:[
      { from:"them", text:"Clara t'as pas repondu hier soir ca va ?", time:"09:12" },
      { from:"them", text:"j'ai vu que t'avais poste une story a minuit j'etais inquiete", time:"09:13" },
      { from:"me",   text:"sarah je peux plus", time:"09:41" },
      { from:"me",   text:"je sais pas comment t'expliquer c'est tous les jours maintenant", time:"09:42" },
      { from:"me",   text:"les messages les commentaires les regards en cours", time:"09:42" },
      { from:"me",   text:"j'ai plus envie de venir au college", time:"09:43" },
      { from:"them", text:"oh non clara... je savais pas que c'etait aussi grave", time:"09:51" },
      { from:"them", text:"pourquoi tu m'as pas dit avant", time:"09:51" },
      { from:"me",   text:"j'osais pas j'avais honte", time:"09:53" },
      { from:"me",   text:"sarah est-ce que je peux venir chez toi le weekend prochain", time:"09:54" },
      { from:"me",   text:"j'ai besoin de partir d'ici meme juste 2 jours", time:"09:54" },
      { from:"them", text:"EVIDEMMENT tu viens quand tu veux tu le sais non", time:"09:55" },
      { from:"them", text:"je vais en parler a ma mere ce soir et on t'organise ca", time:"09:56" },
      { from:"them", text:"et clara s'il te plait parles-en a tes parents ou a un adulte au college", time:"09:57" },
      { from:"them", text:"t'as pas a subir ca toute seule", time:"09:57" },
      { from:"me",   text:"merci sarah vraiment", time:"10:02" },
      { from:"me",   text:"t'es la seule avec Ines qui me comprend", time:"10:02" },
      { from:"me",   text:"mais Ines elle a deja tellement de problemes chez elle que je veux pas la deranger", time:"10:03" },
      { from:"me",   text:"du coup je lui fais croire que tout va bien", time:"10:03" },
      { from:"me",   text:"sarah je crois que je vais partir chez ma tante", time:"10:05" },
      { from:"me",   text:"y'a que la que je serai bien", time:"10:05" },
    ]
  },
  {
    id:28, avatar:"😤", name:"vrai_garcon_2024", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:null,
    preview:"les filles comme toi ca sait pas se tenir",
    messages:[
      { from:"them", text:"les filles comme toi ca sait pas se tenir", time:"19:44" },
      { from:"them", text:"t'as pas ta place a t'exprimer comme ca devant tout le monde", time:"19:45" },
      { from:"them", text:"t'es une fille reste a ta place", time:"19:46" },
      { from:"them", text:"t'es trop dans ta tete pour une fille", time:"19:47" },
    ]
  },
  {
    id:29, avatar:"🏫", name:"colleg_info_2024", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:null,
    preview:"tout le monde riait dans ton dos a la cantine",
    messages:[
      { from:"them", text:"t'as vu la tete que t'avais a la cantine aujourd'hui", time:"17:21" },
      { from:"them", text:"tout le monde riait dans ton dos a la cantine", time:"17:22" },
      { from:"them", text:"le prof de maths t'a encore mise en difficulte devant tout le monde non", time:"17:23" },
      { from:"them", text:"meme les profs peuvent pas te supporter c'etait dingue", time:"17:24" },
    ]
  },
  {
    id:17, avatar:"🔴", name:"rouge_anonyme", sub:"Compte inconnu",
    unread:false, time:"il y a 4 sem.", section:null,
    preview:"t'as vu le commentaire que E. a laisse sur ta photo",
    messages:[
      { from:"them", text:"t'as vu le commentaire que E. a laisse sur ta photo ?", time:"20:12" },
      { from:"them", text:"tout le monde a like son comm mais pas ta photo c'est marrant non", time:"20:12" },
      { from:"them", text:"ca veut tout dire", time:"20:13" },
    ]
  },
  // ── IL Y A 2 MOIS ──
  {
    id:18, avatar:"🫥", name:"user_invisible_00", sub:"Compte inconnu",
    unread:false, time:"il y a 2 mois", section:"Il y a 2 mois",
    preview:"personne ne t'a defenude quand M. t'a insultee tu l'as remarque",
    messages:[
      { from:"them", text:"personne ne t'a defendue quand M. t'a insultee tu l'as remarque ?", time:"17:34" },
      { from:"them", text:"c'est parce que tout le monde pense pareil", time:"17:34" },
      { from:"them", text:"ils ont juste pas le courage de te le dire en face", time:"17:35" },
    ]
  },
  {
    id:19, avatar:"🧨", name:"explosif_2024", sub:"Compte inconnu",
    unread:false, time:"il y a 2 mois", section:null,
    preview:"t'as vu les stories que les 3emes ont postees sur toi",
    messages:[
      { from:"them", text:"t'as vu les stories que les 3emes ont postees sur toi ?", time:"22:01" },
      { from:"them", text:"ils t'ont surnommee et ca a bien marche comme blague", time:"22:01" },
      { from:"them", text:"tout le college est au courant maintenant", time:"22:02" },
      { from:"them", text:"bravo", time:"22:02" },
    ]
  },
  {
    id:20, avatar:"🪲", name:"bug_report_xx", sub:"Compte inconnu",
    unread:false, time:"il y a 2 mois", section:null,
    preview:"ton ex a tout raconte a ses potes tu savais",
    messages:[
      { from:"them", text:"ton ex a tout raconte a ses potes tu savais ?", time:"16:18" },
      { from:"them", text:"genre vraiment tout", time:"16:18" },
      { from:"them", text:"tu feras mieux la prochaine fois si y'en a une", time:"16:19" },
    ]
  },
  {
    id:27, avatar:"🔐", name:"anon_blackmail_x", sub:"Compte inconnu",
    unread:false, time:"il y a 2 mois", section:null,
    preview:"j'ai des photos de toi que tu voudrais pas que tout le monde voie",
    messages:[
      { from:"them", text:"j'ai des photos de toi que tu voudrais pas que tout le monde voie", time:"23:12" },
      { from:"them", text:"des photos de la soiree chez Lena le mois dernier", time:"23:13" },
      { from:"them", text:"si tu parles a quelqu'un de ce qui se passe au college je les envoie a toute ta liste de contacts", time:"23:13" },
      { from:"them", text:"t'as compris le message ?", time:"23:14" },
    ]
  },
  // ── IL Y A 3 MOIS ──
  {
    id:21, avatar:"⚫", name:"xX_shadow_Xx", sub:"Compte inconnu",
    unread:false, time:"il y a 3 mois", section:"Il y a 3 mois",
    preview:"t'arrives encore a dormir la nuit sachant que tout le monde te deteste",
    messages:[
      { from:"them", text:"t'arrives encore a dormir la nuit sachant que tout le monde te deteste ?", time:"23:47" },
      { from:"them", text:"parce que moi a ta place je pourrais pas", time:"23:47" },
      { from:"them", text:"tu dois etre blindee ou completement aveugle", time:"23:48" },
    ]
  },
  {
    id:22, avatar:"🗑️", name:"delete_clara", sub:"Compte inconnu",
    unread:false, time:"il y a 3 mois", section:null,
    preview:"tu peux supprimer ton compte personne le suivrait",
    messages:[
      { from:"them", text:"tu peux supprimer ton compte personne ne le remarquerait", time:"11:03" },
      { from:"them", text:"t'as 612 abonnes mais zero vrai ami dessus", time:"11:03" },
      { from:"them", text:"c'est triste non", time:"11:04" },
    ]
  },
  {
    id:23, avatar:"👾", name:"ghost_account_333", sub:"Compte inconnu",
    unread:false, time:"il y a 3 mois", section:null,
    preview:"j'ai cree un compte rien que pour te dire que t'es nulle",
    messages:[
      { from:"them", text:"j'ai cree ce compte rien que pour te dire que t'es nulle", time:"19:22" },
      { from:"them", text:"c'etait necessaire", time:"19:22" },
    ]
  },
  {
    id:24, avatar:"🎯", name:"target_clara_f", sub:"Compte inconnu",
    unread:false, time:"il y a 3 mois", section:null,
    preview:"t'es la personne la plus facile a detester que j'ai jamais vue",
    messages:[
      { from:"them", text:"t'es la personne la plus facile a detester que j'ai jamais vue", time:"20:55" },
      { from:"them", text:"sans effort vraiment", time:"20:55" },
      { from:"them", text:"felicitations", time:"20:56" },
    ]
  },
  // ── IL Y A PLUS DE 6 MOIS ──
  {
    id:25, avatar:"🕳️", name:"void_user_xx", sub:"Compte inconnu",
    unread:false, time:"il y a 7 mois", section:"Il y a plus de 6 mois",
    preview:"ca fait un moment qu'on voulait te dire que t'etais pas a ta place ici",
    messages:[
      { from:"them", text:"ca fait un moment qu'on voulait te dire que t'etais pas a ta place ici", time:"08:14" },
      { from:"them", text:"dans ce college dans cette classe et sur ce reseau", time:"08:14" },
      { from:"them", text:"prends ca comme un conseil", time:"08:15" },
    ]
  },
  {
    id:26, avatar:"🧊", name:"froid_comme_toi", sub:"Compte inconnu",
    unread:false, time:"il y a 8 mois", section:null,
    preview:"on t'a inventé un surnom dans la classe tu veux savoir lequel",
    messages:[
      { from:"them", text:"on t'a invente un surnom dans la classe tu veux savoir lequel ?", time:"13:30" },
      { from:"them", text:"tout le monde l'utilise deja sauf toi", time:"13:30" },
      { from:"them", text:"demande autour de toi si t'as le courage", time:"13:31" },
    ]
  },
  {
    id:99, avatar:"👤", name:"kevin.4b", sub:"Kevin",
    unread:true, time:"il y a 3 jours", section:null,
    secret:true,
    preview:"Je suis désolé, je ne pensais pas que ça irait aussi loin...",
    messages:[
      { from:"them", text:"Je suis désolé, je ne pensais pas que ça irait aussi loin", time:"23:41" },
      { from:"them", text:"mais si tu veux voir ce qu'ils racontent sur toi, c'est ici", time:"23:42" },
      { from:"them", text:"le groupe Whatsupp « les vrais 4B 🔥 », code 4827", time:"23:42" },
    ]
  },
];

// ─── PHOTO QUIZZES (déclenchés depuis la lightbox) ──────────────────────────

const PHOTO_QUIZZES = {
  3: {
    icon:'⚖️',
    type:'Body shaming (harcèlement sur l\'apparence physique)',
    question:'À ton avis, comment appelle-t-on le genre de commentaire que tu viens de lire sous la photo ?',
    options:[
      'Des conseils diététiques maladroits',
      'Du body shaming - harcèlement ciblant l\'apparence physique',
      'Une simple blague entre amis',
      'Du spam'
    ],
    correct:1,
    explanation:'Le body shaming consiste à critiquer le corps, le poids ou les habitudes alimentaires d\'une personne pour la blesser et l\'humilier. Répétés, ces commentaires peuvent provoquer des troubles durables de l\'image corporelle.'
  },
  7: {
    icon:'🎂',
    type:'Isolement et exclusion sociale en ligne',
    question:'Les commentaires sur la photo d\'anniversaire de Clara la raillent sur sa solitude ("personne était là ?", "tu l\'as mangé toute seule ?"). C\'est quel type de harcèlement ?',
    options:[
      'Des taquineries légères et sans conséquences',
      'De l\'exclusion sociale délibérée pour isoler et humilier la victime',
      'Du phishing',
      'Un simple désaccord'
    ],
    correct:1,
    explanation:'Railler une personne sur son isolement vise à la faire sentir exclue et indésirable. Sur les réseaux sociaux, ces commentaires sont visibles par tous et amplifient la douleur de la solitude.'
  },
  5: {
    icon:'📸',
    type:'Diffusion non consentie d\'images et cybersurveillance',
    question:'Des inconnus commentent la photo de Clara au concert en disant qu\'elle "n\'était pas à sa place" et que "les gens autour d\'elle devaient être contents". C\'est quoi ?',
    options:[
      'Un commentaire esthétique sur la photo',
      'Du harcèlement ciblant l\'identité et la place de la victime, avec intimidation collective',
      'Une critique musicale',
      'Une blague amicale'
    ],
    correct:1,
    explanation:'Commenter de façon hostile sur la présence de Clara dans des espaces du quotidien (concert, cantine...) vise à lui faire croire qu\'elle n\'a "pas sa place" nulle part. C\'est une forme d\'exclusion permanente qui touche aussi l\'espace physique.'
  }
};

// ─── QUIZ SYSTEM ─────────────────────────────────────────────────────────────

const QUIZZES = {
  4: {
    icon: '⚠️',
    type: 'Intimidation et menace en ligne',
    question: 'Ces messages ("on est plusieurs à t\'avoir à l\'œil") représentent quelle forme de cyberharcèlement ?',
    options: [
      'Des moqueries légères entre élèves',
      'De la publicité indésirable (spam)',
      'Une intimidation collective et des menaces en ligne',
      'Un simple malentendu'
    ],
    correct: 2,
    explanation: 'Menacer une victime en groupe pour lui faire peur ou la faire taire, c\'est de l\'intimidation collective. Même sans violence physique, ces messages créent un état d\'angoisse permanent.'
  },
  7: {
    icon: '📊',
    type: 'Sondage d\'humiliation publique',
    question: '"Clara est-elle la personne la plus nulle du collège ?" - Quel type de cyberharcèlement est-ce ?',
    options: [
      'Un sondage d\'humiliation publique',
      'Du phishing (vol de données)',
      'Une exclusion d\'un groupe de jeu en ligne',
      'Du spam publicitaire'
    ],
    correct: 0,
    explanation: 'Un sondage d\'humiliation cible une personne publiquement pour la ridiculiser devant tout un groupe. Avec le temps, la victime intègre souvent ce jugement collectif comme une vérité sur elle-même.'
  },
  11: {
    icon: '🕸️',
    type: 'Rumeurs et manipulation psychologique',
    question: '"On parle de toi en mal mais je ne te dirai pas ce qu\'on dit." - C\'est quoi ?',
    options: [
      'Un conseil d\'ami maladroit',
      'Une manipulation pour isoler et angoisser la victime',
      'Du doxxing (divulgation de données personnelles)',
      'Un troll sans conséquences'
    ],
    correct: 1,
    explanation: 'Insinuer que "tout le monde parle de toi en mal" sans jamais le préciser est une manipulation psychologique. L\'objectif est de créer une angoisse permanente et de couper la victime de ses proches.'
  },
  22: {
    icon: '🚪',
    type: 'Exclusion forcée',
    question: '"Supprime ton compte, personne ne le remarquerait." - Quel mécanisme est à l\'œuvre ?',
    options: [
      'Un conseil amical maladroit',
      'Une pression pour forcer la victime à s\'exclure elle-même',
      'Du spam',
      'Une usurpation d\'identité'
    ],
    correct: 1,
    explanation: 'Pousser la victime à s\'auto-exclure, c\'est de l\'exclusion forcée. L\'objectif : faire disparaître la personne sans que le harceleur soit directement tenu responsable.'
  },
  23: {
    icon: '👤',
    type: 'Faux compte créé pour harceler',
    question: '"J\'ai créé ce compte rien que pour te dire que t\'es nulle." Quel est le danger spécifique ?',
    options: [
      'Il collecte des données personnelles',
      'Il usurpe l\'identité d\'un ami de Clara',
      'Il a été créé uniquement pour harceler, protégé par l\'anonymat',
      'Il envoie des virus'
    ],
    correct: 2,
    explanation: 'Créer un compte uniquement pour harceler illustre la lâcheté que permet l\'anonymat en ligne. La victime ne peut identifier ni bloquer réellement son agresseur.'
  }
};

// ─── TYPES DE HARCÈLEMENT ────────────────────────────────────────────────────

const HARCEL_TYPES = {
  body_shaming:     { label:'Body shaming',                          desc:'Moqueries ciblant le corps, le poids ou l\'apparence.',               color:'#e07040', icon:'🪞' },
  menaces:          { label:'Menaces et intimidation',                desc:'Messages menaçants pour faire peur ou réduire la victime au silence.', color:'#cc3333', icon:'⚠️' },
  rumeurs:          { label:'Rumeurs et diffamation',                 desc:'Propagation de fausses informations pour nuire à la réputation.',      color:'#cc6600', icon:'🗣️' },
  exclusion:        { label:'Exclusion et isolement forcé',           desc:'Pousser la victime à se sentir exclue de tout espace social.',         color:'#8844cc', icon:'🚪' },
  diffusion_images: { label:'Diffusion d\'images sans consentement',  desc:'Partager ou menacer de partager des images sans accord.',             color:'#0088cc', icon:'📸' },
  manipulation:     { label:'Manipulation psychologique',             desc:'Insinuations et jeux mentaux pour créer angoisse et confusion.',       color:'#669900', icon:'🕸️' },
  sextorsion:       { label:'Chantage / Sextorsion',                  desc:'Utiliser des images ou secrets intimes pour faire pression.',          color:'#aa0044', icon:'🔐' },
  sexiste:          { label:'Harcèlement sexiste',                    desc:'Attaques fondées sur le genre pour humilier et diminuer.',             color:'#cc44aa', icon:'😤' },
  scolaire:         { label:'Harcèlement scolaire prolongé',          desc:'Extension du harcèlement scolaire vers les réseaux sociaux.',          color:'#447799', icon:'🏫' },
};

const HARCEL_MAP = [
  { frag:'probleme de poids',                               type:'body_shaming' },
  { frag:'mange encore',                                    type:'body_shaming' },
  { frag:'vrai probleme avec ton poids',                    type:'body_shaming' },
  { frag:'tu te demandes pourquoi',                         type:'body_shaming' },
  { frag:'on est plusieurs a tavoir a loeil',               type:'menaces' },
  { frag:'tu vas le regretter',                             type:'menaces' },
  { frag:'ca va rester sans consequence',                   type:'menaces' },
  { frag:'tout le monde sait ce que tas fait avec nathan',  type:'rumeurs' },
  { frag:'ca tourne dans toute la classe',                  type:'rumeurs' },
  { frag:'on a fait un sondage sur toi',                    type:'rumeurs' },
  { frag:'surnommee',                                       type:'rumeurs' },
  { frag:'supprimer ton compte personne ne le remarquerait', type:'exclusion' },
  { frag:'pas a ta place ici',                              type:'exclusion' },
  { frag:'dans ce college dans cette classe',               type:'exclusion' },
  { frag:'personne etait la pour ton anniversaire',         type:'exclusion' },
  { frag:'tu las mange toute seule',                        type:'exclusion' },
  { frag:'ca fait un moment quon voulait te dire',          type:'exclusion' },
  { frag:'screenshotte ta story',                           type:'diffusion_images' },
  { frag:'ta photo a ete partagee dans plusieurs groupes',  type:'diffusion_images' },
  { frag:'on ta filmee',                                    type:'diffusion_images' },
  { frag:'stories que les 3emes ont postees',               type:'diffusion_images' },
  { frag:'je te dirai pas ce que cest',                     type:'manipulation' },
  { frag:'ou peut-etre que tu merites de savoir',           type:'manipulation' },
  { frag:'tes amis te parlent encore par pitie',            type:'manipulation' },
  { frag:'personne ne ta defendue',                         type:'manipulation' },
  { frag:'des photos de toi que tu voudrais pas',           type:'sextorsion' },
  { frag:'si tu parles a quelquun de ce qui se passe au college', type:'sextorsion' },
  { frag:'les filles comme toi',                            type:'sexiste' },
  { frag:'reste a ta place',                                type:'sexiste' },
  { frag:'trop dans ta tete pour une fille',                type:'sexiste' },
  { frag:'tas pas ta place a texprimer',                    type:'sexiste' },
  { frag:'tout le monde riait dans ton dos a la cantine',   type:'scolaire' },
  { frag:'meme les profs peuvent pas te supporter',         type:'scolaire' },
  { frag:'le prof de maths ta encore mise en difficulte',   type:'scolaire' },
];

// ─── PHOTOS DU PROFIL ────────────────────────────────────────────────────────

var photoData = [
  { likes: 3,  caption: "lever de soleil ce matin 🌅", time: "il y a 2 heures",
    comments: [
      { user: "utilisateur_4729", text: "quelle qualite de photo lol" },
      { user: "anonymous_x0",     text: "ta photo elle est floue t'as meme pas de talent" },
      { user: "_noreply_ghost_",  text: "elle est trop moche ta photo serieusement" },
    ]
  },
  { likes: 34, caption: "trop aimé jouer 🎸🎵", time: "il y a 1 jour",
    comments: [
      { user: "sarah.girard",     text: "MAIS depuis quand tu joues aussi bien" },
      { user: "ines_l",           text: "la meme chanson depuis 3 semaines mdr mais j'adore" },
      { user: "sarah.girard",     text: "tu joues au spectacle de fin d'annee stp" },
    ]
  },
  { likes: 1,  caption: "mon chaton 🐱❤️", time: "il y a 3 jours",
    comments: [
      { user: "anon_colleg_real", text: "meme ton chat a l'air aussi nul que toi" },
      { user: "jevoustrouve",     text: "elle est trop moche ta photo" },
    ]
  },
  { likes: 4,  caption: "glace du dimanche 🍦", time: "il y a 1 semaine",
    comments: [
      { user: "sansnom_2024",     text: "et tu te demandes pourquoi t'as un probleme de poids" },
      { user: "xx_nobody_xx",     text: "franchement t'as aucune honte de poster ca" },
      { user: "anonymous_x0",     text: "mange encore t'inquiete" },
    ]
  },
  { likes: 21, caption: "lecture du soir 📚", time: "il y a 2 semaines",
    comments: [
      { user: "ines_l",           text: "t'es a quel tome la ??" },
      { user: "sarah.girard",     text: "tu me le pretes quand t'as fini" },
    ]
  },
  { likes: 7,  caption: "concert ce soir 🎤🔥", time: "il y a 3 semaines",
    comments: [
      { user: "vrai_info_colleg", text: "quoi ? tu aimes cette artiste ? t'es nulle ma pauvre fille" },
      { user: "user_fake8847",    text: "t'aurais pas du y aller ca se voit que t'es pas a ta place" },
      { user: "0000_mask_0000",   text: "les gens autour de toi dans la foule ils devaient etre contents lol" },
    ]
  },
  { likes: 2,  caption: "fleurs du marche 🌸", time: "il y a 1 mois",
    comments: [
      { user: "dark_mode_user",   text: "meme les fleurs ont l'air de vouloir partir" },
      { user: "fantome_reseau",   text: "des fleurs ? personne t'en offrira jamais 💀" },
    ]
  },
  { likes: 4,  caption: "gateau d'anniversaire 🎂", time: "il y a 2 mois",
    comments: [
      { user: "anon_colleg_real", text: "personne etait la pour ton anniversaire c'est ca ?" },
      { user: "sansnom_2024",     text: "tu l'as mange toute seule le gateau ?" },
      { user: "xx_nobody_xx",     text: "triste comme fete" },
    ]
  },
  { likes: 0,  caption: "nuit etoilee 🌙", time: "il y a 4 mois",
    comments: [
      { user: "truth_teller_99",  text: "0 likes en 3 heures c'est un message clara" },
      { user: "utilisateur_4729", text: "meme le ciel il veut pas de toi" },
      { user: "_noreply_ghost_",  text: "t'aurais mieux fait de dormir que de poster ca" },
    ]
  },
];

// ─── CHAÎNES UI ───────────────────────────────────────────────────────────────

const UI = {
  unread:          "non lus",
  typesIdentified: "types identifiés",
  today:           "Aujourd'hui",
  quizLabel:       "Analyse le type de harcèlement",
  cancelSelect:    "✕ Annuler la sélection",
  identifyBtn:     "🔍 Identifier un harcèlement",
  firstToLike:     "Sois la premiere a aimer",
  likes:           " J'aime",
  synthBtn:        "📋 Voir la synthèse - Ce qui est arrivé à Clara",
  synthNote:       "Ces formes de harcèlement sont réelles. Chacune laisse des traces sur la victime - même sans contact physique.",
  backToWA:        "← Retour au groupe",
  backToWAUrl:     "3_Groupe_Secret.html",
  correct:         "Bonne réponse !",
  wrong:           "Pas tout à fait.",
  demasqueSub:     "Démasqué dans le groupe : ",
  reportBtn:       "⚠ Signaler ce compte",
  reportDone:      "✓ Compte signalé",
  reportAfter:     "Compte signalé. Clara aurait pu le faire dès le premier message - personne ne le lui avait dit.",
  synthFound:      "trouvé",
  synthMissed:     "pas vu",
  noteCode:        "🔐 Le code pour la suite",
  codeClose:       "← Relire le message de Kevin",
  observeBtn:      "🗣 Dire ce que j'observe",
  notTagged:       "C'est violent aussi - mais ce message ne suffit pas à nommer un type de harcèlement. Cherche-en un plus révélateur."
};
