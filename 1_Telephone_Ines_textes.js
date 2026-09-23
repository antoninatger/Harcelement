var TEXTES = {
  "contact": {
    "name": "Inès",
    "avatar": "IN",
    "statusOnline": "en ligne",
    "statusTyping": "écrit…"
  },
  "trustLabels": [
    "elle ne veut plus te parler",
    "elle est sur le point de raccrocher",
    "elle se méfie de toi",
    "elle hésite à répondre",
    "elle t'écoute",
    "elle commence à te faire confiance",
    "elle te fait confiance",
    "elle se confie à toi",
    "elle te fait vraiment confiance"
  ],
  "trustInitial": "elle hésite à répondre",
  "choiceHint": "Que répond Léo ?",
  "choiceHintCrise": "Comment réagit Léo ?",
  "restartBtn": "↺ Recommencer",
  "revelationsHeader": "📋 CE QUE TU AS APPRIS SUR CLARA",
  "ouverture": [
    {
      "t": "Inès ?",
      "type": "s"
    },
    {
      "t": "Oui c'est qui",
      "type": "r"
    },
    {
      "t": "C'est Léo. Je suis {un ami|une amie} de Clara, depuis la primaire.",
      "type": "s"
    },
    {
      "t": "Je te connais pas.",
      "type": "r"
    },
    {
      "t": "Je sais. J'arrive plus à la joindre depuis plusieurs jours. Je ne la vois plus dans la cour. T'as eu de ses nouvelles ?",
      "type": "s"
    },
    {
      "t": "Pourquoi tu me demandes ça à moi",
      "type": "r"
    }
  ],
  "finImmediate": [
    {
      "t": "ok",
      "type": "r"
    },
    {
      "t": "vu ✔️",
      "type": "sy"
    }
  ],
  "blocageMessages": [
    {
      "t": "Arrête de me parler.",
      "type": "cr"
    },
    {
      "t": "Je te répondrai plus.",
      "type": "cr"
    },
    {
      "t": "(elle ne répond plus)",
      "type": "sy"
    }
  ],
  "REVELATIONS": [
    {
      "icon": "📵",
      "title": "Elle fuyait son téléphone",
      "txt": "Depuis plusieurs semaines, Clara laissait son téléphone retourné, ignorait ses notifications - même celles d'Inès."
    },
    {
      "icon": "🔒",
      "title": "Elle avait disparu des réseaux",
      "txt": "Clara avait arrêté de poster, d'ouvrir ses applis. Quelque chose en ligne la faisait fuir. Inès ne sait pas exactement quoi."
    },
    {
      "icon": "❓",
      "title": "Inès ne sait pas tout",
      "txt": "Même sa meilleure amie n'a pas eu les détails. Clara voulait protéger Inès - ou avait trop honte pour en parler."
    }
  ],
  "G": [
    {
      "edu": "Je dois être {le plus honnête|la plus honnête} possible, et {le plus sincère|la plus sincère} - c'est ma seule chance qu'elle m'aide.",
      "c": [
        {
          "l": "A",
          "t": "Parce que t'es son amie. Si quelqu'un sait quelque chose, c'est toi.",
          "e": -1
        },
        {
          "l": "B",
          "t": "Je savais pas à qui d'autre m'adresser.",
          "e": 0
        },
        {
          "l": "C",
          "t": "Je suis {inquiet|inquiète}. J'arrive plus à dormir depuis qu'elle a disparu.",
          "e": 1
        }
      ]
    },
    {
      "intro": [
        "Tu la connais comment toi, Clara ?"
      ],
      "edu": "On est amis depuis la primaire. Cette année on n'est plus dans la même classe, on se voyait moins… mais elle compte toujours autant pour moi. Il faut qu'Inès comprenne que je ne suis pas là par curiosité.",
      "c": [
        {
          "l": "A",
          "t": "On est amis depuis la primaire. Elle compte beaucoup pour moi.",
          "e": 1
        },
        {
          "l": "B",
          "t": "Pas super bien. Mais j'ai entendu parler d'elle ces derniers temps.",
          "e": -1
        },
        {
          "l": "C",
          "t": "On se voit moins depuis qu'on est plus dans la même classe.",
          "e": 0
        }
      ]
    },
    {
      "intro": [
        "Elle répond plus à moi non plus.",
        "Depuis quelques jours."
      ],
      "c": [
        {
          "l": "A",
          "t": "Ça lui arrivait déjà avant ?",
          "e": 1,
          "r": "Non. Jamais."
        },
        {
          "l": "B",
          "t": "Peut-être qu'elle vous a bloqués.",
          "e": -1,
          "r": "Elle m'aurait jamais bloquée. Pas moi."
        },
        {
          "l": "C",
          "t": "Vous vous parliez souvent ?",
          "e": 0,
          "r": "Tous les jours. Enfin… avant."
        }
      ]
    },
    {
      "intro": [
        "Ça faisait un moment qu'elle était pas bien.",
        "Depuis des mois, en fait.",
        "Elle manquait des cours. Elle répondait de moins en moins aux messages.",
        "Elle disait que c'était rien."
      ],
      "c": [
        {
          "l": "A",
          "t": "Tu sais ce qui s'est passé ?",
          "e": 1,
          "r": "Pas vraiment. J'ai essayé de lui demander."
        },
        {
          "l": "B",
          "t": "Et t'as pas essayé d'en parler avec elle ?",
          "e": -1,
          "r": "Si. J'ai essayé."
        },
        {
          "l": "C",
          "t": "Elle avait l'air d'avoir peur de quelque chose ?",
          "e": 0,
          "r": "Peut-être… Je lui ai demandé, plusieurs fois."
        }
      ]
    },
    {
      "intro": [
        "Elle voulait pas.",
        "Mais je voyais bien.",
        "Elle laissait son téléphone retourné sur la table. Elle regardait plus ses applis.",
        "Des fois je lui envoyais un message, je voyais qu'elle l'avait lu… et elle répondait pas pendant des heures."
      ],
      "c": [
        {
          "l": "A",
          "t": "On dirait qu'elle voulait s'éloigner de son téléphone.",
          "e": 1
        },
        {
          "l": "B",
          "t": "C'est bizarre comme comportement.",
          "e": 0
        },
        {
          "l": "C",
          "t": "C'est peut-être juste une mauvaise période.",
          "e": -1
        }
      ]
    },
    {
      "intro": [
        "Je sais pas si je devrais te raconter tout ça.",
        "Je te connais même pas."
      ],
      "edu": "Elle a raison de se méfier. Je dois la rassurer sans la brusquer.",
      "c": [
        {
          "l": "A",
          "t": "T'es obligée à rien. C'est toi qui décides.",
          "e": 1
        },
        {
          "l": "B",
          "t": "Dis-moi juste ce que tu sais.",
          "e": -1
        },
        {
          "l": "C",
          "t": "Je veux juste savoir si elle va bien. Rien d'autre.",
          "e": 0
        }
      ]
    }
  ],
  "CRISIS": {
    "intro": [
      "Attends.",
      "T'es dans quelle classe ?",
      "Tu connais qui dans la sienne ?"
    ],
    "c": [
      {
        "l": "A",
        "t": "T'as raison d'être méfiante. Tu me connais pas.",
        "e": 2
      },
      {
        "l": "B",
        "t": "Je fais pas partie des gens qui lui ont fait du mal.",
        "e": 1
      },
      {
        "l": "C",
        "t": "Fais-moi confiance, j'essaie juste d'aider.",
        "e": -1
      }
    ]
  },
  "fins": {
    "imm": {
      "titre": "Fin de conversation",
      "corps": "(elle ne répond plus)"
    },
    "blocage": {
      "titre": "🔴 Confiance perdue",
      "ines": "Je sais qu'on ne pouvait pas te faire confiance.",
      "sys": "(elle ne répond plus)"
    },
    "succes": {
      "titre": "🟢 Inès te fait confiance",
      "p0ines": "J'ai le mot de passe depuis un moment mais j'arrive pas à m'en servir moi-même. J'ai trop peur de tomber sur un truc horrible. Toi, ça te fera moins mal de regarder à ma place.",
      "p1ines": "Tu promets de faire attention à ce que tu lis ?",
      "p1leo": "Je promets.",
      "p1suite": "Et tu me dis si tu trouves quelque chose.",
      "p2ines": "Tu promets de respecter la vie privée de Clara ?",
      "p2leo": "Je le promets.",
      "codesMsg": "Elle me l'avait donné au cas où. Tu l'utilises, mais t'en parles à personne.",
      "nextPartBtn": "▶ Voir l'Instaclasse de Clara",
      "copied": "✓ Copié !",
      "ig": {
        "label": "📱 Instaclasse de Clara",
        "compteLabel": "compte :",
        "compte": "@clara.fontaine",
        "mdpLabel": "mdp :",
        "mdp": "nuit_rouge17",
        "warn": "⚠ C'est sa vie privée. Respecte-la."
      }
    },
    "fragile": {
      "titre": "🟡 Succès fragile",
      "p0ines": "J'ai le mot de passe depuis un moment mais j'arrive pas à m'en servir moi-même. J'ai trop peur de tomber sur un truc horrible. Toi, ça te fera moins mal de regarder à ma place.",
      "p1ines": "Je sais vraiment pas si je fais bien.\nTu me promets de faire attention ?",
      "p1leo": "Oui.",
      "p2ines": "Tu promets de respecter la vie privée de Clara ?",
      "p2leo": "Oui.",
      "codesMsg": "Elle me l'avait donné au cas où. Tu l'utilises, mais t'en parles à personne.",
      "nextPartBtn": "▶ Voir l'Instaclasse de Clara",
      "copied": "✓ Copié !",
      "ig": {
        "label": "📱 Instaclasse de Clara",
        "compteLabel": "compte :",
        "compte": "@clara.fontaine",
        "mdpLabel": "mdp :",
        "mdp": "nuit_rouge17",
        "warn": "⚠ Sois prudent."
      }
    },
    "echec": {
      "titre": "🔴 Échec",
      "ines": "Non. \nArrête de fouiller. C'est pas tes affaires.",
      "sys": "(elle ne répond plus)"
    }
  }
};

const UI = {
  nextPartUrl: "2_Compte_de_Clara.html",
  secondConvo: {
    statusOnline: "en ligne",
    statusTyping: "écrit…",
    playerMsg: "Inès, je crois que je sais où est Clara.",
    q: "Quoi ?? Où ça ?",
    // Inès ne savait pas où était Clara : elle comprend en même temps que Léo.
    // Deux entrées selon ce que le joueur a écrit (le surnom ou la tante).
    foundHavre: [
      "Son « havre secret » ??",
      "C'est comme ça qu'elle appelait la maison de sa tante, à la campagne."
    ],
    foundTante: [
      "Chez sa tante ??",
      "Mais oui… c'est là qu'elle allait quand ça allait pas. Elle appelait ça son « havre secret »."
    ],
    foundSuite: [
      "J'y avais même pas pensé.",
      "J'ai le numéro de chez sa tante, on y était allées ensemble cet été. Attends, je le cherche."
    ],
    apresNumero: "Appelle-la. Et dis-moi comment va Clara, stp.",
    // Réponse du joueur réaffichée quand il revient sur la conversation déjà résolue
    reponseResolue: "Chez sa tante. Ils en parlent dans le groupe.",
    relireBtn: "↺ Relire la première conversation",
    wrongAnswer: "Hein ? Je comprends pas. Elle serait où, d'après toi ?",
    nextUrl: "4_Convaincre_Clara.html",
    nextBtn: "→ Partie 4 : Convaincre Clara"
  }
};
