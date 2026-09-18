const WA_DATA = {

  // ─── Groupe ──────────────────────────────────────────────────────────────────

  group: {
    name:    "les vrais 4B 🔥",
    subtitle:"Enzo, Jade, Théo, Marine, Kevin",
    avatar:  "👥"
  },

  senderColors: {
    "Enzo":  "#25d366",
    "Jade":   "#f4a261",
    "Théo":   "#60a5fa",
    "Marine": "#f472b6",
    "Kevin":  "#a78bfa"
  },

  // ─── Textes UI ───────────────────────────────────────────────────────────────

  banner: {
    strong: "Exercice pédagogique sur le cyberharcèlement",
    tail:   ", créé à des fins éducatives - tous les personnages et messages sont fictifs."
  },

  warning: {
    icon:  "⚠️",
    title: "Simulation pédagogique",
    body:  "Je vais observer un groupe secret dont Clara ne fait pas partie.\n\nCes échanges montrent comment le harcèlement se coordonne en coulisse - comment des comptes anonymes sont créés pour attaquer et comment les agressions sont organisées collectivement.",
    btn:   "Continuer →"
  },

  mission: {
    icon:  "🕵️",
    title: "Ce qu'il faut repérer",
    body:  "Ils écrivent à Clara depuis des comptes anonymes - et ici, entre eux, ils disent lesquels.\n\nÀ chaque fois qu'un compte est nommé, appuie dessus : je saurai qui se cache derrière. Clara, elle, ne le saura jamais.\n\nIl y en a cinq à repérer. Des questions viendront aussi pendant la lecture.",
    btn:   "Commencer →"
  },

  // ─── Les comptes anonymes nommés dans le groupe ─────────────────────────────
  // Ce sont les mêmes identifiants que dans la Partie 2 : une fois repérés ici,
  // ils portent le prénom de leur propriétaire quand on retourne sur l'Instaclasse.
  comptes: {
    label:      "comptes identifiés",
    cardTitle:  "Compte démasqué",
    cardIntro:  "Derrière ce compte, il y a :",
    cardNote:   "Clara ne peut pas le savoir. Toi si - parce que tu lis un groupe où tu n'es pas.",
    cardSee:    "Voir ses messages sur l'Instaclasse de Clara →",
    cardClose:  "Fermer",
    already:    "Déjà repéré.",
    liste: [
      { handle: "utilisateur_4729", qui: "Enzo" },
      { handle: "_noreply_ghost_",  qui: "Jade" },
      { handle: "anonymous_x0",     qui: "Enzo et Théo" },
      { handle: "vrai_info_colleg", qui: "Jade" },
      { handle: "jevoustrouve",     qui: "Théo" }
    ]
  },

  startLabel: "▶ Voir ce qui se dit dans le groupe",

  // ─── Carte Instaclasse partagée dans le groupe ─────────────────────────────────

  postCard: {
    account: "clara.fontaine",
    caption: "lever de soleil ce matin 🌅",
    photo:   "images_clara/plage.png",
    seeBtn:  "👁 Voir les commentaires envahir sa publication"
  },

  // Commentaires qui "arrivent" - mêmes comptes que dans le jeu 2
  postComments: [
    { user: "utilisateur_4729", text: "quelle qualite de photo lol",                   delay:  400 },
    { user: "anonymous_x0",     text: "ta photo elle est floue t'as meme pas de talent",delay: 1600 },
    { user: "_noreply_ghost_",  text: "elle est trop moche ta photo serieusement",      delay: 2800 }
  ],

  // ─── Séquence de messages ────────────────────────────────────────────────────
  // type absent     = message normal (sender + text + time requis)
  // type "system"   = encart centré (pas de bulle)
  // type "post-card" = carte de publication partagée
  // type "time-sep" = séparateur temporel
  // type "quiz"     = déclenche quiz (quizId requis)
  // type "end"      = fin de la séquence

  messages: [

    // - Phase 1 : contexte (après les cours, ~17h14) -
    { id:  1, sender: "Enzo",  text: "les gars c trop drôle, clara a encore essayé de nous parler à la récré 💀",              time: "17:14", delay:  800 },
    { id:  2, sender: "Jade",   text: "sérieusement elle comprend pas qu'elle est plus dans le groupe ou quoi",                 time: "17:14", delay:  900 },
    { id:  3, sender: "Théo",   text: "je l'ai carrément ignorée devant tout le monde, elle avait l'air d'une clown",          time: "17:15", delay:  800 },
    { id:  4, sender: "Kevin",  text: "mdrrr 💀",                                                                               time: "17:16", delay:  500 },
    { id:  5, sender: "Marine", text: "ça fait combien de temps qu'on lui parle plus au fait ?",                               time: "17:16", delay:  700 },
    { id:  6, sender: "Enzo",  text: "genre 3 semaines et elle comprend toujours pas lol",                                    time: "17:17", delay:  700 },
    { id:  7, sender: "Jade",   text: "j'en ai marre de la voir poster des trucs sur insta comme si de rien n'était",          time: "17:17", delay:  900 },
    { id:  8, sender: "Enzo",  text: "ouais elle fait genre tout va bien alors que personne lui parle au collège",            time: "17:18", delay: 1000 },
    { id:  9, sender: "Jade",   text: "on devrait aller lui flood ses commentaires",                                           time: "17:18", delay:  800 },
    { id: 10, sender: "Kevin",  text: "bonne idée, attendez qu'elle poste quelque chose 👀",                                   time: "17:19", delay:  700 },

    // - Phase 2 : Clara poste (~17h21) -
    { id: 11, type: "system",         text:   "Enzo a partagé une publication Instaclasse", time: "17:21", delay: 1500 },
    { id: 12, type: "post-card", sender: "Enzo",                                     time: "17:21", delay:  600 },
    { id: 13, sender: "Enzo",  text: "ALLEZ Y TOUS c'est le moment 🔥🔥",                                                     time: "17:21", delay:  600 },
    { id: 14, sender: "Théo",   text: "j'y vais maintenant",                                                                  time: "17:22", delay:  500 },
    { id: 15, sender: "Jade",   text: "moi aussi, attendez je cherche mon compte anon",                                       time: "17:22", delay:  800 },
    { id: 16, sender: "Marine", text: "utilisez vos faux comptes surtout, comme ça elle sait pas que c'est nous",             time: "17:22", delay: 1000 },
    { id: 17, sender: "Kevin",  text: "ouais genre même si elle screenshotte on peut toujours nier",                          time: "17:23", delay:  800 },

    // - Phase 3 : coordination des commentaires (~17h23) -
    { id: 18, sender: "Enzo",  text: "moi j'utilise @utilisateur_4729, ça fait un moment",                                   time: "17:23", delay:  900 },
    { id: 19, sender: "Jade",   text: `moi c'est @_noreply_ghost_ lol j'ai mis "elle est trop moche ta photo"`,               time: "17:24", delay: 1000 },
    { id: 20, sender: "Théo",   text: `j'ai mis "ta photo elle est floue t'as même pas de talent" depuis @anonymous_x0 💀`,   time: "17:24", delay: 1100 },
    { id: 21, sender: "Marine", text: "hahaha moi j'attends un peu pour pas que ça arrive tout en même temps",               time: "17:25", delay: 1000 },
    { id: 22, sender: "Kevin",  text: "stratégie 🧠",                                                                         time: "17:25", delay:  500 },
    { id: 23, sender: "Enzo",  text: "ouais faites des pauses entre chaque pour que ça ait l'air naturel",                  time: "17:26", delay:  900 },

    // - Saut de 25 minutes (ils sont allés poster leurs commentaires) -
    { type: "time-sep", text: "25 minutes plus tard", delay: 1000 },

    // - Phase 4 : résultats + doute de Kevin (~17h51) -
    { id: 24, sender: "Jade",   text: "regardez son nombre de likes 💀 3 likes en 2h avec 612 abonnés c'est mort",            time: "17:51", delay: 1800 },
    { id: 25, sender: "Théo",   text: "même ses vrais abonnés l'ignorent maintenant hahaha",                                 time: "17:51", delay:  800 },
    { id: 26, sender: "Enzo",  text: "on a réussi à contaminer son image 😈",                                               time: "17:52", delay:  800 },
    { id: 27, sender: "Kevin",  text: "sérieusement vous trouvez pas qu'on va un peu trop loin là...",                       time: "17:53", delay: 1000 },
    { id: 28, sender: "Enzo",  text: "t'inquiète c'est juste pour rire, elle le prend trop au sérieux de toute façon",      time: "17:53", delay:  900 },
    { id: 29, sender: "Kevin",  text: "ouais ok...",                                                                         time: "17:54", delay:  500 },
    { id: 30, sender: "Marine", text: "et aussi ses DMs ? on pourrait lui envoyer des trucs la nuit",                       time: "17:54", delay: 1000 },
    { id: 31, sender: "Enzo",  text: "oui avec des comptes anon encore, comme ça elle dort pas tranquille",                 time: "17:55", delay:  900 },
    { id: 32, sender: "Jade",   text: "genre la harceler pour qu'elle finisse par partir d'insta",                           time: "17:55", delay:  800 },

    { type: "quiz", quizId: "coordination", delay: 400 },

    // - Phase 5 : création des comptes anonymes (~17h57) -
    { id: 34, sender: "Enzo",  text: "@anonymous_x0 c'est moi qui l'ai créé, Théo l'utilise aussi btw",                                        time: "17:57", delay:  700 },
    { id: 35, sender: "Jade",   text: "moi c'est @vrai_info_colleg, créé pour balancer des rumeurs sur elle",               time: "17:57", delay: 1000 },
    { id: 36, sender: "Théo",   text: "moi j'ai @jevoustrouve pour lui faire peur la nuit",                                 time: "17:58", delay:  900 },
    { id: 37, sender: "Marine", text: "pour ce soir on s'organise : messages toutes les heures après minuit",               time: "17:59", delay: 1000 },
    { id: 38, sender: "Enzo",  text: "pour qu'elle pense à nous même chez elle, même quand elle essaie de dormir 💀",      time: "18:00", delay: 1000 },
    { id: 39, sender: "Jade",   text: "et on flood ses DMs depuis les comptes anon, surtout des trucs sur son physique",   time: "18:01", delay: 1000 },

    { type: "quiz", quizId: "anonymat", delay: 400 },

    // - Phase 6 : Clara disparaît (~J+1) -
    { type: "time-sep", text: "Lendemain - 09h14" },
    { id: 40, sender: "Jade",   text: "vous avez vu ? Clara a plus posté depuis hier soir",                                   time: "09:14", delay: 1200 },
    { id: 41, sender: "Enzo",  text: "hahaha on l'a bien cassée 💀",                                                        time: "09:15", delay:  700 },
    { id: 42, sender: "Théo",   text: "même plus vue en ligne depuis ce matin",                                               time: "09:15", delay:  800 },
    { id: 43, sender: "Marine", text: "et elle était pas en cours aujourd'hui non plus 😂",                                   time: "09:16", delay:  900 },
    { id: 44, sender: "Kevin",  text: "sérieusement... c'est peut-être grave là",                                             time: "09:17", delay: 1200 },
    { id: 45, sender: "Enzo",  text: "relax elle a juste besoin d'une pause, elle l'a bien cherché 😂",                     time: "09:17", delay:  700 },
    { id: 46, sender: "Kevin",  text: "ça fait 2 jours qu'on la voit plus nulle part. c'est pas normal",                     time: "09:18", delay: 1000 },
    { id: 47, sender: "Jade",   text: "kevin arrête de dramatiser c'est bon",                                                 time: "09:18", delay:  600 },
    { id: 48, sender: "Marine", text: "j'ai entendu dire qu'elle est partie dans son « havre secret » lmao",                 time: "09:20", delay: 1500 },
    { id: 49, sender: "Enzo",  text: "son QUOI 💀💀💀",                                                                   time: "09:20", delay:  500 },
    { id: 50, sender: "Jade",   text: "elle est vraiment trop bizarre cette fille avec ses mots de 40 ans",                  time: "09:21", delay:  800 },
    { id: 51, sender: "Théo",   text: "c'est quoi ce « havre secret » omg elle se prend pour qui",                          time: "09:21", delay:  700 },
    { id: 52, sender: "Marine", text: "chez sa tante je crois, quelque part, personne sait vraiment",                        time: "09:22", delay: 1000 },
    { id: 53, sender: "Enzo",  text: "lmao elle s'est enfuie dans son château secret 🏰 trop pathétique",                  time: "09:22", delay:  800 },
    { id: 54, sender: "Kevin",  text: "les gars franchement... on est peut-être allés trop loin",                            time: "09:24", delay: 1500 },
    { id: 55, sender: "Théo",   text: "non, elle l'a bien cherché. elle avait juste à pas réagir comme ça",                  time: "09:24", delay:  700 },
    { id: 56, sender: "Jade",   text: "exactement, c'est sa faute si elle peut pas encaisser",                               time: "09:25", delay:  600 },
    { id: 57, sender: "Enzo",  text: "bon elle revient quand elle veut de son « havre » 😂 on sera là",                    time: "09:25", delay:  900 },
    { id: 58, sender: "Kevin",  text: "...",                                                                                  time: "09:26", delay:  400 },

    { type: "end",                        delay: 300 }

  ],

  // ─── Quiz ────────────────────────────────────────────────────────────────────

  quizzes: {

    coordination: {
      icon:     "👥",
      label:    "Point d'analyse",
      question: "Kevin hésite mais se tait et accepte. Que révèle cette scène ?",
      options: [
        "Kevin est trop lâche pour s'opposer",
        "La pression du groupe peut réduire au silence même celui qui doute - c'est un mécanisme clé du harcèlement collectif",
        "Kevin n'est pas vraiment impliqué dans le harcèlement",
        "C'est une décision individuelle et libre de chacun"
      ],
      correct: 1,
      explanation: "Le harcèlement de groupe fonctionne parce que la pression sociale étouffe les voix discordantes. Kevin doute, mais il se conforme pour ne pas être exclu à son tour. Pendant ce temps, Clara fait face à une masse entière - ce qui rend son isolement total et son sentiment d'injustice encore plus fort."
    },

    anonymat: {
      icon:     "👤",
      label:    "Point d'analyse",
      question: "Pourquoi créent-ils des comptes anonymes spécifiquement pour harceler Clara ?",
      options: [
        "Pour tester les paramètres de confidentialité d'Instaclasse",
        "Pour éviter d'être identifiés, multiplier les agresseurs apparents et rendre le blocage impossible",
        "Parce que leurs vrais comptes ont déjà été bloqués par Clara",
        "Pour jouer un rôle fictif sans conséquences réelles"
      ],
      correct: 1,
      explanation: "Les comptes anonymes servent à masquer l'identité des harceleurs tout en donnant l'impression que les attaques viennent de partout. Clara ne peut pas identifier ses agresseurs, les bloquer efficacement, ni prouver qui fait quoi. L'angoisse devient permanente car la menace semble surgir de nulle part - même chez elle, même la nuit."
    }

  },

  // ─── Synthèse finale ─────────────────────────────────────────────────────────

  synthesis: {
    title: "📋 Mécanismes du harcèlement de groupe",
    items: [
      {
        icon: "👥",
        type: "La pression collective",
        exp:  "Kevin hésite mais se conforme pour ne pas être exclu. Quand personne n'ose s'opposer, tout le groupe devient complice - même ceux qui doutent. La victime fait face à une masse, pas à un individu."
      },
      {
        icon: "👤",
        type: "L'anonymat comme bouclier",
        exp:  "Les faux comptes permettent de multiplier les agresseurs apparents et d'éviter toute identification. La victime ne peut bloquer personne efficacement. L'angoisse devient permanente car la menace vient de nulle part."
      },
      {
        icon: "🗓️",
        type: "La coordination invisible",
        exp:  "Le harcèlement est planifié, réparti dans le temps pour paraître naturel. Ce n'est pas spontané : c'est une organisation invisible. La victime perçoit une hostilité généralisée sans en voir la source."
      },
      {
        icon: "🌙",
        type: "L'invasion de l'espace privé",
        exp:  "En envoyant des messages après minuit, le groupe s'assure que Clara ne peut plus se réfugier chez elle. Le harcèlement suit la victime partout - même dans son lit, même la nuit."
      }
    ]
  },

  // ─── État final ──────────────────────────────────────────────────────────────

  endMessage: {
    title: "Ce groupe existait pendant que Clara…",
    points: [
      "recevait des messages anonymes la nuit - ils sont dans ce groupe.",
      "voyait ses commentaires envahis - ils les ont organisés ici.",
      "pensait que « tout le monde » la détestait - ils l'ont fabriqué ensemble.",
      "n'osait plus poster - c'était leur objectif.",
      "s'est enfuie vers son « havre secret »... mais où est-il ?"
    ],
    note: "Le harcèlement de groupe transforme chaque espace en danger. Clara est partie se réfugier quelque part. Quelqu’un doit savoir où."
  },

  // ─── Ce que le témoin aurait pu faire ───────────────────────────────────────

  kevin: {
    icon:  "🫥",
    title: "Et Kevin ?",
    body:  "Kevin a douté cinq fois. « On va un peu trop loin là. » « C'est peut-être grave. » « Ça fait 2 jours qu'on la voit plus. » « On est peut-être allés trop loin. » Puis « … ». À chaque fois on lui a coupé la parole, et à chaque fois il s'est tu. Il a fini par écrire à Clara, mais trop tard : elle était déjà partie.",
    items: [
      "Écrire à Clara en privé dès le premier doute, une seule phrase. Il n'avait pas besoin d'affronter le groupe : il suffisait qu'elle ne se croie plus seule.",
      "Quitter le groupe. Partir se voit, et ça retire une voix au nombre.",
      "Garder une capture d'écran. C'est la seule preuve que ce groupe a existé.",
      "En parler à un adulte. C'est le seul geste qui pouvait arrêter les autres."
    ],
    note: "Dans une classe, il y a rarement beaucoup de Clara et beaucoup d'Enzo. Il y a surtout beaucoup de Kevin."
  },

  // ─── Pourquoi elle ? ────────────────────────────────────────────────────────

  mobile: {
    icon:  "❓",
    title: "Pourquoi Clara ?",
    body:  "Relis le groupe : à aucun moment ils ne le disent. La seule justification qui revient est « elle l'a bien cherché ». Il n'y a pas de raison - et chercher laquelle serait déjà donner tort à Clara."
  },

  // ─── Navigation ──────────────────────────────────────────────────────────────

  navigation: {
    prev: { label: "← Instaclasse de Clara", url: "2_Compte_de_Clara.html" },
    next: { label: "Retour à l'enquête →", url: "index.html" }
  }

};

const UI = {
  today: "Aujourd'hui",
  likes: "3 J'aime",
  mentionTooltip: "Voir ses messages sur l'Instaclasse de Clara",
  correct: "✓ Bonne réponse !",
  wrong: "✗ Pas tout à fait.",
  tapHint: "▼ Appuie pour lire la suite",
  inputPlaceholder: "Message…"
};
