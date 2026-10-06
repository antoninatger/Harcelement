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
  "penseeLabel": "💭 Léo se dit…",
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
      "t": "Je sais, on s'est presque jamais parlé. Mais Clara m'a souvent parlé de toi.\nJ'arrive plus à la joindre depuis plusieurs jours, et je la vois plus dans la cour. T'as eu de ses nouvelles ?",
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
  // « p » : ce que Léo se dit juste après sa réponse, dans la bulle de pensée
  // hors du téléphone. Il explique pourquoi Inès s'ouvre ou se ferme : sans
  // lui, la jauge bougeait sans que le joueur comprenne pourquoi.
  "G": [
    {
      "edu": "Je dois être {le plus honnête|la plus honnête} possible, et {le plus sincère|la plus sincère} - c'est ma seule chance qu'elle m'aide.",
      "c": [
        {
          "l": "A",
          "t": "T'es sa meilleure amie. Si quelqu'un sait quelque chose, c'est forcément toi.",
          "e": -1,
          "p": "Je lui ai mis la pression, comme si c'était à elle de tout savoir. Elle se ferme."
        },
        {
          "l": "B",
          "t": "Je savais pas à qui d'autre m'adresser.",
          "e": 0,
          "p": "C'est vrai… mais ça ne lui dit pas pourquoi je m'inquiète."
        },
        {
          "l": "C",
          "t": "Je suis {inquiet|inquiète}. J'arrive plus à dormir depuis qu'elle a disparu.",
          "e": 1,
          "p": "Je lui ai dit ce que je ressens, sans rien lui demander. Elle peut me croire."
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
          "e": 1,
          "p": "Je lui ai dit qui je suis pour Clara. C'est exactement ce qu'elle voulait savoir."
        },
        {
          "l": "B",
          "t": "Pas super bien. Mais j'ai entendu parler d'elle ces derniers temps.",
          "e": -1,
          "p": "Aïe. J'ai l'air de quelqu'un qui vient chercher des ragots."
        },
        {
          "l": "C",
          "t": "On se voit moins depuis qu'on est plus dans la même classe.",
          "e": 0,
          "p": "C'est vrai, mais ça ne dit pas pourquoi elle compte pour moi."
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
          "r": "Non. Jamais.",
          "p": "Une vraie question, sans rien supposer. Elle a envie d'y répondre."
        },
        {
          "l": "B",
          "t": "Peut-être qu'elle vous a bloqués.",
          "e": -1,
          "r": "Elle m'aurait jamais bloquée. Pas moi.",
          "p": "J'ai laissé entendre que Clara la rejetait. Inès s'est sentie visée."
        },
        {
          "l": "C",
          "t": "Vous vous parliez souvent ?",
          "e": 0,
          "r": "Tous les jours. Enfin… avant.",
          "p": "Elle a répondu, mais ma question ne l'aide pas à en dire plus."
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
          "t": "Tu sais ce qui lui arrivait ?",
          "e": 1,
          "r": "Pas vraiment. J'ai essayé de lui demander.",
          "p": "Une question ouverte : je la laisse raconter ce qu'elle sait."
        },
        {
          "l": "B",
          "t": "Et toi, t'as rien fait ?",
          "e": -1,
          "r": "Si ! J'ai essayé. Tu crois quoi ?",
          "p": "Ça sonnait comme un reproche. Elle se sent accusée de ne pas avoir aidé Clara."
        },
        {
          "l": "C",
          "t": "Elle avait peur de quelque chose, c'est ça ?",
          "e": 0,
          "r": "J'en sais rien… Je lui ai demandé, plusieurs fois.",
          "p": "J'ai deviné à sa place. Mieux vaut la laisser raconter."
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
          "e": 1,
          "p": "J'ai relié ce qu'elle m'a dit. Elle voit que j'écoute vraiment."
        },
        {
          "l": "B",
          "t": "C'est bizarre comme comportement.",
          "e": 0,
          "p": "« Bizarre »… Ça ne l'aide pas à aller plus loin."
        },
        {
          "l": "C",
          "t": "C'est peut-être juste une mauvaise période.",
          "e": -1,
          "p": "J'ai minimisé ce qu'elle a vu. Elle sait que c'est plus grave que ça."
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
          "e": 1,
          "p": "Je lui laisse le choix. C'est ce qui la rassure le plus."
        },
        {
          "l": "B",
          "t": "Dis-moi juste ce que tu sais.",
          "e": -1,
          "p": "C'était un ordre. Elle se méfie encore plus."
        },
        {
          "l": "C",
          "t": "Je veux juste savoir si elle va bien. Rien d'autre.",
          "e": 0,
          "p": "Sincère… mais elle ne sait toujours pas si elle peut me faire confiance."
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
        "e": 2,
        "p": "J'ai reconnu qu'elle avait raison de se méfier. Ça la désarme."
      },
      {
        "l": "B",
        "t": "Je fais pas partie des gens qui lui ont fait du mal.",
        "e": 1,
        "p": "Elle m'entend… mais elle n'a aucune preuve."
      },
      {
        "l": "C",
        "t": "Fais-moi confiance, j'essaie juste d'aider.",
        "e": -1,
        "p": "« Fais-moi confiance » : c'est exactement ce que dirait quelqu'un de pas fiable."
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
      "ines": "Je savais qu'on ne pouvait pas te faire confiance.",
      "conseil": "Deux réponses maladroites, et Inès s'est fermée. Recommence : parle-lui de Clara et de ce que tu ressens, sans la presser ni la juger.",
      "sys": "(elle ne répond plus)"
    },
    "succes": {
      "titre": "🟢 Inès te fait confiance",
      "p0ines": "J'ai les codes de son compte Instaclasse. Elle me les avait donnés au cas où.\nMais j'ose pas m'en servir. J'ai trop peur de tomber sur un truc horrible. Toi, ça te fera moins mal de regarder à ma place.",
      "p1ines": "Tu promets de faire attention à ce que tu lis ?",
      "p1leo": "Je promets.",
      "p1suite": "Et tu me dis si tu trouves quelque chose.",
      "p2ines": "Tu promets de respecter la vie privée de Clara ?",
      "p2leo": "Je le promets.",
      "codesMsg": "Voilà son identifiant et son mot de passe. Tu t'en sers, mais t'en parles à personne.",
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
      "p0ines": "J'ai les codes de son compte Instaclasse. Elle me les avait donnés au cas où.\nMais j'ose pas m'en servir. J'ai trop peur de tomber sur un truc horrible. Toi, ça te fera moins mal de regarder à ma place.",
      "p1ines": "Je sais vraiment pas si je fais bien.\nTu me promets de faire attention ?",
      "p1leo": "Oui.",
      "p2ines": "Tu promets de respecter la vie privée de Clara ?",
      "p2leo": "Oui.",
      "codesMsg": "Voilà son identifiant et son mot de passe. Tu t'en sers, mais t'en parles à personne.",
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
    q: "Quoi ?? Où ça ?",
    // Inès ne savait pas où était Clara : elle comprend en même temps que Léo.
    // Deux entrées selon ce que le joueur a écrit (le surnom ou la tante).
    foundHavre: [
      "Son « havre secret » ??",
      "C'est comme ça qu'elle appelait la maison de sa tante, à la campagne."
    ],
    foundTante: [
      "Chez sa tante ??",
      "Mais oui… c'est là qu'elle allait quand ça allait pas. Elle appelait ça son « havre secret »."
    ],
    foundSuite: [
      "J'y avais même pas pensé.",
      "J'ai le numéro de chez sa tante, on y était allées ensemble cet été. Attends, je le cherche."
    ],
    apresNumero: "Appelle-la. Et dis-moi comment va Clara, stp.",
    // Réponse du joueur réaffichée quand il revient sur la conversation déjà résolue
    reponseResolue: "Chez sa tante. Ils en parlent dans le groupe.",
    copyTitle: "Copier le numéro",
    relireBtn: "↺ Relire la première conversation",
    wrongAnswer: "Hein ? Je comprends pas. Elle serait où, d'après toi ?",
    nextUrl: "4_Convaincre_Clara.html",
    nextBtn: "→ Partie 4 : Convaincre Clara"
  }
};
