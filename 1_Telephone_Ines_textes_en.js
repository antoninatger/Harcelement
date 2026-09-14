var TEXTES = {
  "contact": {
    "name": "Inès",
    "avatar": "IN",
    "statusOnline": "online",
    "statusTyping": "typing…"
  },
  "trustLabels": [
    "she doesn't want to talk to you anymore",
    "she is about to hang up",
    "she is suspicious of you",
    "she is hesitant to reply",
    "she is listening to you",
    "she is starting to trust you",
    "she trusts you",
    "she trusts you",
    "she really trusts you"
  ],
  "trustInitial": "she is hesitant to reply",
  "choiceHint": "What does Léo reply?",
  "choiceHintCrise": "How does Léo react?",
  "restartBtn": "↺ Restart",
  "revelationsHeader": "📋 WHAT YOU HAVE LEARNED ABOUT CLARA",
  "ouverture": [
    {
      "t": "Inès?",
      "type": "s"
    },
    {
      "t": "Yes, who is this?",
      "type": "r"
    },
    {
      "t": "It's Léo. We're in the same school as Clara.",
      "type": "s"
    },
    {
      "t": "I don't know you.",
      "type": "r"
    },
    {
      "t": "I know. I haven't been able to reach her for several days. I don't see her in the schoolyard anymore. Have you heard from her?",
      "type": "s"
    },
    {
      "t": "Why are you asking me?",
      "type": "r"
    }
  ],
  "finImmediate": [
    {
      "t": "ok",
      "type": "r"
    },
    {
      "t": "seen ✔️",
      "type": "sy"
    }
  ],
  "blocageMessages": [
    {
      "t": "Stop talking to me.",
      "type": "cr"
    },
    {
      "t": "I'm not going to answer you anymore.",
      "type": "cr"
    },
    {
      "t": "(she stops replying)",
      "type": "sy"
    }
  ],
  "REVELATIONS": [
    {
      "icon": "📵",
      "title": "She was avoiding her phone",
      "txt": "For several weeks, Clara had been leaving her phone face down and ignoring her notifications - even Inès's."
    },
    {
      "icon": "🔒",
      "title": "She had disappeared from social media",
      "txt": "Clara had stopped posting and opening her apps. Something online was making her run away. Inès doesn't know exactly what."
    },
    {
      "icon": "❓",
      "title": "Inès doesn't know everything",
      "txt": "Even her best friend didn't get the details. Clara wanted to protect Inès - or was too ashamed to talk about it."
    }
  ],
  "G": [
    {
      "edu": "I have to be as honest and sincere as possible - it's my only chance of getting her to help me.",
      "c": [
        {
          "l": "A",
          "t": "Because you're her friend. If anyone knows something, it's you.",
          "e": -1
        },
        {
          "l": "B",
          "t": "I didn't know who else to turn to.",
          "e": 0
        },
        {
          "l": "C",
          "t": "I'm worried. I haven't been able to sleep since last night.",
          "e": 1
        }
      ]
    },
    {
      "intro": [
        "How do you know Clara?"
      ],
      "edu": "I've known her for a few years. We often ran into each other at school. I need to show her that.",
      "c": [
        {
          "l": "A",
          "t": "We often run into each other. I liked her.",
          "e": 1
        },
        {
          "l": "B",
          "t": "Not that well. But I've heard people talking about her lately.",
          "e": -1
        },
        {
          "l": "C",
          "t": "We're in different classes, but we talk sometimes.",
          "e": 0
        }
      ]
    },
    {
      "intro": [
        "She's not replying to me either.",
        "It's been a few days."
      ],
      "c": [
        {
          "l": "A",
          "t": "Had this happened before?",
          "e": 1,
          "r": "No. Never."
        },
        {
          "l": "B",
          "t": "Maybe she blocked you.",
          "e": -1,
          "r": "She would never block me. Not me."
        },
        {
          "l": "C",
          "t": "Did you talk often?",
          "e": 0,
          "r": "Every day. Well… before."
        }
      ]
    },
    {
      "intro": [
        "She hadn't been doing well for a while.",
        "For months, really.",
        "She was missing classes. She wasn't replying to messages anymore.",
        "She said it was nothing."
      ],
      "c": [
        {
          "l": "A",
          "t": "Do you know what happened?",
          "e": 1,
          "r": "Not really. I tried asking her."
        },
        {
          "l": "B",
          "t": "And you didn't try to talk to her about it?",
          "e": -1,
          "r": "I did try."
        },
        {
          "l": "C",
          "t": "Did she seem afraid of something?",
          "e": 0,
          "r": "Maybe… I asked her, more than once."
        }
      ]
    },
    {
      "intro": [
        "She didn't want to.",
        "But I could tell.",
        "She would leave her phone face down on the table. She wasn't looking at her apps anymore.",
        "Sometimes I'd send her a message, I'd see that she'd read it… and she wouldn't reply for hours."
      ],
      "c": [
        {
          "l": "A",
          "t": "It sounds like she wanted to distance herself from her phone.",
          "e": 1
        },
        {
          "l": "B",
          "t": "That's strange behavior.",
          "e": 0
        },
        {
          "l": "C",
          "t": "Maybe she's just going through a bad time.",
          "e": -1
        }
      ]
    },
    {
      "intro": [
        "I don't know if I should be telling you all this.",
        "I don't even know you."
      ],
      "edu": "She's right to be suspicious. I have to reassure her without pressuring her.",
      "c": [
        {
          "l": "A",
          "t": "You don't have to do anything. It's your choice.",
          "e": 1
        },
        {
          "l": "B",
          "t": "Just tell me what you know.",
          "e": -1
        },
        {
          "l": "C",
          "t": "I just want to know if she's okay. Nothing else.",
          "e": 0
        }
      ]
    }
  ],
  "CRISIS": {
    "intro": [
      "Wait.",
      "What class are you in?",
      "Who do you know in hers?"
    ],
    "c": [
      {
        "l": "A",
        "t": "You're right to be suspicious. You don't know me.",
        "e": 2
      },
      {
        "l": "B",
        "t": "I'm not one of the people who hurt her.",
        "e": 1
      },
      {
        "l": "C",
        "t": "Trust me, I'm just trying to help.",
        "e": -1
      }
    ]
  },
  "fins": {
    "imm": {
      "titre": "End of conversation",
      "corps": "(she stops replying)"
    },
    "blocage": {
      "titre": "🔴 Trust lost",
      "ines": "I knew we couldn't trust you.",
      "sys": "(she stops replying)"
    },
    "succes": {
      "titre": "🟢 Inès trusts you",
      "p1ines": "Do you promise to be careful with what you read?",
      "p1leo": "I promise.",
      "p1suite": "And you'll tell me if you find something.",
      "p2ines": "Do you promise to respect Clara's privacy?",
      "p2leo": "I promise.",
      "codesMsg": "She gave it to me just in case. You use it, you don't tell anyone.",
      "nextPartBtn": "▶ View Clara's Instaclasse",
      "copied": "✓ Copied!",
      "ig": {
        "label": "📱 Clara's Instaclasse",
        "compteLabel": "account:",
        "compte": "@clara.fontaine",
        "mdpLabel": "password:",
        "mdp": "nuit_rouge17",
        "warn": "⚠ This is her private life. Respect it."
      }
    },
    "fragile": {
      "titre": "🟡 Fragile success",
      "p1ines": "I really don't know if I'm doing the right thing.\nDo you promise to be careful?",
      "p1leo": "Yes.",
      "p2ines": "Do you promise to respect Clara's privacy?",
      "p2leo": "Yes.",
      "codesMsg": "She gave it to me just in case. You use it, you don't tell anyone.",
      "nextPartBtn": "▶ View Clara's Instaclasse",
      "copied": "✓ Copied!",
      "ig": {
        "label": "📱 Clara's Instaclasse",
        "compteLabel": "account:",
        "compte": "@clara.fontaine",
        "mdpLabel": "password:",
        "mdp": "nuit_rouge17",
        "warn": "⚠ Be careful."
      }
    },
    "echec": {
      "titre": "🔴 Failure",
      "ines": "No.\nStop digging. It's none of your business.",
      "sys": "(she stops replying)"
    }
  }
};

const UI = {
  nextPartUrl: "2_Compte_de_Clara_en.html",
  secondConvo: {
    statusOnline: "online",
    statusTyping: "typing…",
    playerMsg: "Inès, I think I've found something",
    q: "what is it?",
    correctYes: "Yes! She's at her aunt's, in the countryside.",
    correctCont: "That's where she is, well done! Her aunt works at a restaurant - here's the number:",
    wrongAnswer: "I'm not sure what you mean... what exactly did you find?",
    nextUrl: "4_Convaincre_Clara_en.html",
    nextBtn: "→ Part 4: Convincing Clara"
  }
};
