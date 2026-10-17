var TEXTES = {

  // ─── Title screen ──────────────────────────────────────────────────────────

  titre: {
    eyebrow: "A game about empathy - School bullying",
    main:    "Convincing Clara",
    sub:     "Clara has not been to school for almost a week. She has taken refuge at her aunt's, out in the countryside.\nYou are Léo, her friend. To speak to Clara, you must first convince her aunt that you are trustworthy - and that you are truly there to help her.",
    legende: ["The aunt", "Clara", "You - Léo"],
    bouton:  "☎  Call",
    commentTitre: "How it works",
    comment: [
      "Each time, you choose what Léo says from three answers.",
      "First, the aunt. She is protecting Clara: show her you're thinking of Clara before yourself, without pushing. If she doesn't trust you, she hangs up.",
      "Then, Clara. Listen to her before trying to help: don't judge her, don't blame her, don't hand her ready-made solutions. If she feels judged, she hangs up.",
      "After each answer, a note explains how it came across."
    ],
    // Léo's thoughts after each wrong number: the player has to work out that
    // Inès (Part 1) can give it to them.
    pensees: [
      "There has to be a way to get this number…",
      "There must be someone I know who can help me.",
      "It's someone I've already talked to who can help me…"
    ]
  },

  // ─── Game over screen ──────────────────────────────────────────────────────

  gameover: {
    icon:  "📵",
    titre: "The aunt hung up.",
    corps: "She felt that you were not ready to understand what Clara was going through.\n\nTo protect her still-fragile niece, she preferred to end the conversation.",
    lecon: "💡 Empathy is not just wanting to help.\nIt means listening before speaking. Feeling before acting."
  },

  btnRecommencer: "↩ Start over",
  btnRejouer:     "↩ Play again",

  objectifs: {
    "1": "Goal: get the aunt to put Clara on the phone.",
    "2": "Goal: listen to Clara, and help her agree to talk to an adult."
  },

  gameoverClara: {
    icon:  "📵",
    titre: "Clara hung up.",
    corps: "She felt judged instead of listened to. She didn't have the strength to keep going tonight.\n\nYou can call her back and try a different way.",
    lecon: "💡 Someone who is hurting doesn't first need advice or solutions.\nThey need to be listened to, without being judged."
  },
  btnRappeler:    "↩ Call Clara back",
  btnTout:        "↩ Start everything over",
  btnSuite:       "What happened next →",
  btnRejouerClara:"↩ Try the conversation with Clara again",

  // ─── Speaker labels ─────────────────────────────────────────────────────

  locuteurs: { aunt: "The aunt", lea: "Clara", thomas: "Léo" },

  // Les numéros d'aide sont dans ressources.js - un seul endroit à changer.


  // ─── What Léo does next, and what happens to the group ───────────────────

  // Read as the conclusion of the story: text on screen, line after line.
  conclusion: [
    "The next day, Léo went to see the school counsellor.",
    "Not to denounce anyone: to say that a student from {his|her} school had stopped coming, and why. {He|She} showed the screenshots {he|she} had kept, and reported the anonymous accounts, one by one.",
    "{He|She} didn't fix anything alone. {He|She} did what a fourteen-year-old friend can do: tell someone who can act.",
    "The school opened an investigation. The five in the group were called in, with their parents. Two said they \"didn't mean any harm\". Kevin showed his screenshots.",
    "In France, school bullying has been a criminal offence since 2022 - online included, between pupils included.",
    "Clara went back to school three weeks later. It wasn't easy. But she was no longer carrying it alone."
  ],

  recapBtn: "🖨 Printable summary",

  // ─── Endings, descending score order ───────────────────────────────────

  fins: [
    // Score = how well Léo listened to Clara in phase 2 (0 to 8).
    { minScore: 7,
      icon: "🌿", cls: "good",
      titre:    "Clara is going to ask for help.",
      corps:    "You found the right words at every moment.\nNot too forceful, not too light - simply present.\n\nThe aunt trusted you. Clara hung up with a concrete decision: to talk to a trusted adult, and to stop carrying this alone.\n\nYour role was not to save her. It was to show her that asking for help is possible.",
      citation: "“I'm going to talk to my aunt. Really talk.”\n- Clara"
    },
    { minScore: 4,
      icon: "🕯️", cls: "ok",
      titre:    "A first step.",
      corps:    "You showed goodwill, even if some answers lacked depth.\n\nClara is still hesitant - but she is considering talking to an adult. The road is long.\n\nYour role was to show her that she does not have to carry everything alone.",
      citation: "“Maybe I'll try…”\n- Clara"
    },
    { minScore: 0,
      icon: "🌧️", cls: "bad",
      titre:    "The distance remains.",
      corps:    "You meant well, but your words sometimes sounded like blame or impatience.\n\nClara remains closed off. She needs time - and someone who truly listens before acting.\n\nTry the conversation again: listen to her first, without judging.",
      citation: "“I just needed you to listen to me.”\n- Clara"
    }
  ],

  // ─── Texts coded into the logic ────────────────────────────────────────

  jeu: {
    pivotHaut:   "(returning) She'd like to talk to you.\nI'll put her on.",
    pivotBas:    "(returning) She's still unsure…\n… All right. She agrees. But go gently.",
    echecGate1:  "(long pause)\nI'm sorry, Léo. I don't think this is a good idea tonight.\nMaybe another time.",
    echecGate2:  "[ She gently hangs up. ]",
    echecRecup1: "(firm tone) I think it would be better to leave it there, Léo.\nClara is not in a state for this. Not tonight.",
    echecRecup2: "[ She hangs up. ]",
    scoreLabel:  "Empathy score: ",
    claraRaccroche1: "(long silence) … I think I'm going to hang up. I don't have the strength tonight.",
    claraRaccroche2: "[ She hangs up. ]"
  },

  // ─── Scenes ───────────────────────────────────────────────────────────────

  SCENES: [

    // ── PHASE 1: The aunt ────────────────────────────────────────────────

    { id:'A1', phase:'1', phaseName:'Phase 1 - The aunt', stepLabel:'Question 1 / 3',
      pdotCount:3, pdotActive:0,
      dialogueBefore:[
        {spk:'narrator', txt:'[ The phone rings… click. ]'},
        {spk:'aunt',     txt:'Hello?'},
        {spk:'thomas',   txt:"Hello, ma'am… sorry to bother you. My name is Léo, I'm a friend of Clara's. Could I speak to her, please?"},
        {spk:'aunt',     txt:"Léo… Yes, she told me about you.\nBut… I prefer to be honest: this is not a good time."},
      ],
      prompt:'How do you answer?',
      choices:[
        { emp:2, txt:"“I get it. I don't want to push her… but I miss her, and I'm scared for her.”",
          fb:{type:'good', msg:'You show that protecting her comes before your own need.'},
          reply:{spk:'aunt', txt:"(a silence) That's kind of you to say it like that."}},
        { emp:1, txt:"“I understand. But it's important - it won't take long.”",
          fb:{type:'ok', msg:'Honest, but focused more on you than on Clara.'},
          reply:{spk:'aunt', txt:"Hmm… alright. I'm listening."}},
        { emp:0, txt:"“I need to talk to her now, it's urgent.”",
          fb:{type:'bad', msg:"\"It's urgent\": you're talking about your own need. The aunt is protecting Clara, who is not doing well. By insisting, you show her that you come before Clara - exactly what she fears."},
          reply:{spk:'aunt', txt:"(coldly) Urgent… for you, maybe."},
          recovery:{
            auntLine: "It is not an emergency for me, Léo. And for now, that is what matters.",
            prompt:   'The aunt waits. What do you say?',
            good:{ txt:"“You're right. I'm sorry. She is what matters, not me.”",
                   fb:{type:'good', msg:"You admit your mistake and put Clara back at the centre. That's what reassures the aunt."},
                   reply:{spk:'aunt', txt:"(slightly softened) …Alright. Continue."} },
            bad: { txt:"“But you don't understand, it's really important.”",
                   fb:{type:'bad', msg:"You contradict the aunt instead of hearing her. It's not up to you to decide whether Clara is ready to talk: it's up to her, and to the aunt protecting her."},
                   reply:{spk:'aunt', txt:"(sharply) I understand very well. And it does not reassure me."} }
          }
        },
      ]
    },

    { id:'A2', phase:'1', phaseName:'Phase 1 - The aunt', stepLabel:'Question 2 / 3',
      pdotCount:3, pdotActive:1,
      dialogueBefore:[
        {spk:'aunt', txt:"You know, since she arrived here… Clara has not been the same.\nShe cries a lot. She has nightmares. She wakes up panicked at night.\nAnd above all… she feels guilty. She thinks everything is her fault."},
      ],
      prompt:'What do you answer?',
      choices:[
        { emp:2, txt:"“She blames herself? But she didn't do anything… That's what hurts the most.”",
          fb:{type:'good', msg:'You defend Clara directly. The aunt feels it.'},
          reply:{spk:'aunt', txt:"(breathes out) That's exactly what she needs to hear."}},
        { emp:1, txt:"“I didn't know it was that bad… it's really serious.”",
          fb:{type:'ok', msg:'Sincere, but you remain on the surface.'},
          reply:{spk:'aunt', txt:"Yes. It is very serious."}},
        { emp:0, txt:"“She should have talked to me before it got to this point.”",
          fb:{type:'bad', msg:"\"She should have told me\": that's blaming Clara for staying silent. Victims often keep quiet out of shame or fear. Holding it against her adds to the guilt the aunt has just described."},
          reply:{spk:'aunt', txt:"(sharply) She didn't dare. That is precisely the problem."},
          recovery:{
            auntLine: "If you blamed her now… you would hurt her even more, Léo.",
            prompt:   'How do you react to that?',
            good:{ txt:"“You're right. That's not what I meant. She deserved none of this.”",
                   fb:{type:'good', msg:"You correct yourself, and put the blame where it belongs: on those who bullied her."},
                   reply:{spk:'aunt', txt:"(pause) …That's better. I hear sincerity."} },
            bad: { txt:"“I'm just pointing out that if she had talked to me, we could have avoided this.”",
                   fb:{type:'bad', msg:"You insist it could all have been avoided if she had talked. That amounts to saying it's partly her fault. It is never the victim's fault."},
                   reply:{spk:'aunt', txt:"(coldly) Avoided this. You really think it was that simple."} }
          }
        },
      ]
    },

    { id:'A3', phase:'1', phaseName:'Phase 1 - The aunt', stepLabel:'Question 3 / 3',
      pdotCount:3, pdotActive:2,
      dialogueBefore:[
        {spk:'aunt', txt:"Bullying destroys you slowly. It makes you doubt your own worth…\nShe withdrew into herself. She even avoids looking at her phone.\nIf you really want to help her… you will have to be patient. Very patient."},
      ],
      prompt:"Before she goes to ask Clara…",
      choices:[
        { emp:2, txt:"“I'll be patient. Just tell her I'm here. She doesn't have to talk to me.”",
          fb:{type:'good', msg:"You remove all pressure. That's exactly what was needed."},
          reply:{spk:'aunt', txt:"(softer) I'll tell her that. Wait."}},
        { emp:1, txt:"“I'll be careful about what I say to her. Thank you for letting me try.”",
          fb:{type:'ok', msg:"Sincere. The aunt appreciates the honesty."},
          reply:{spk:'aunt', txt:"Alright… I'll ask her."}},
        { emp:0, txt:"“I'll tell her everything will be okay, that I have a plan.”",
          fb:{type:'bad', msg:"\"I have a plan, everything will be fine\": you promise what you can't deliver, and you decide for her. Clara doesn't need rescuing, she needs to be listened to, at her own pace."},
          reply:{spk:'aunt', txt:"(coldly) A plan. Clara does not need a plan. She needs to be heard."},
          recovery:{
            auntLine: "Do you understand the difference, Léo?",
            prompt:   '',
            good:{ txt:"“Yes… you're right. I just wanted to help her but I went too fast.”",
                   fb:{type:'good', msg:"You admit you went too fast. The aunt sees you can listen."},
                   reply:{spk:'aunt', txt:"(long pause) …I'll ask her. But don't pressure her."} },
            bad: { txt:"“I think it would do her good to have a concrete goal.”",
                   fb:{type:'bad', msg:"A \"concrete goal\" is still a solution decided for her. Before she can act, Clara needs to feel heard."},
                   reply:{spk:'aunt', txt:"(firmly) I don't think you're ready to talk to her tonight."} }
          }
        },
      ]
    },

    // ── PIVOT ─────────────────────────────────────────────────────────────

    { id:'PIVOT', phase:'pivot', phaseName:'Waiting…', stepLabel:'',
      pdotCount:0, pdotActive:-1,
      dialogueBefore:[
        {spk:'narrator', txt:'[ Muffled noises… the aunt moves away… whispers in the distance… ]'},
      ],
      prompt:null, choices:[], isContinue:true
    },

    // ── PHASE 2: Clara ───────────────────────────────────────────────────

    { id:'L1', phase:'2', phaseName:'Phase 2 - Clara', stepLabel:'Question 1 / 4',
      pdotCount:4, pdotActive:0,
      dialogueRappel:[
        {spk:'narrator', txt:'[ You call back. It rings for a long time… click. ]'},
        {spk:'aunt',     txt:'Hello?'},
        {spk:'thomas',   txt:"It's Léo again. I'm sorry… I said the wrong things to Clara earlier. Would she be willing to talk to me again? Just for a minute."},
        {spk:'aunt',     txt:"(a long silence) … I'll ask her. But this time, listen to her."},
        {spk:'narrator', txt:'[ Footsteps… a door… whispers. ]'},
        {spk:'lea',      txt:'… Hello?'},
        {spk:'thomas',   txt:"Clara… I'm sorry about earlier. I didn't mean to lecture you. I'm here to listen, that's all."},
        {spk:'lea',      txt:"(silence) … Okay."},
        {spk:'thomas',   txt:"I asked you why you hadn't said anything. You don't have to answer."},
        {spk:'lea',      txt:"No… it's okay. I thought about it… lots of times.\nI even started writing messages… and then I'd delete them."},
      ],
      dialogueBefore:[
        {spk:'narrator', txt:'[ A rustle of the phone… ]'},
        {spk:'lea',      txt:'Hello…?'},
        {spk:'thomas',   txt:'Clara… it\'s me. Léo.'},
        {spk:'lea',      txt:'… Hi.'},
        {spk:'thomas',   txt:"I'm sorry for calling like this. I didn't know what else to do."},
        {spk:'lea',      txt:"It's… it's okay."},
        {spk:'thomas',   txt:"I missed you."},
        {spk:'lea',      txt:"(breathes out) I missed you too…"},
        {spk:'thomas',   txt:"Why didn't you say anything? You know you could talk to me…"},
        {spk:'lea',      txt:"I thought about it… so many times.\nI even started writing messages… and then I deleted them."},
      ],
      prompt:'What do you answer her?',
      choices:[
        { emp:2, txt:"“You didn't need to find the right words. I'd have listened, even with no explanation.”",
          fb:{type:'good', msg:"You remove the pressure of finding words. She can breathe."},
          reply:{spk:'lea', txt:"(silence) …I know. I think I was ashamed."}},
        { emp:1, txt:"“I understand… it's hard to know how to say these things.”",
          fb:{type:'ok', msg:'True, but a little general.'},
          reply:{spk:'lea', txt:"Yeah… that's it."}},
        { emp:0, txt:"“Why did you delete those messages? I would have answered, you know.”",
          fb:{type:'bad', msg:"\"Why did you delete them?\": you're asking her to justify herself, and bringing the conversation back to you (\"I would have answered\"). She's already ashamed of staying silent: questioning her about it puts her in the wrong."},
          reply:{spk:'lea', txt:"(coldly) I don't know…"}},
      ]
    },

    { id:'L2', phase:'2', phaseName:'Phase 2 - Clara', stepLabel:'Question 2 / 4',
      pdotCount:4, pdotActive:1,
      dialogueBefore:[
        {spk:'lea', txt:"At first, it was just remarks… little digs.\nI told myself it would pass.\nBut then… it got worse. Group mockery. Comments about everything.\nAnd then it continued online. Messages. Screenshots. Rumors.\nI couldn't escape it anymore… even at home."},
      ],
      prompt:"What do you feel hearing that?",
      choices:[
        { emp:2, txt:"“Even at home you couldn't breathe… You had nowhere left to feel safe. I'm sorry.”",
          fb:{type:'good', msg:'You name her reality precisely. She feels understood.'},
          reply:{spk:'lea', txt:"(voice breaking) Yes… that's exactly it."}},
        { emp:1, txt:"“That's horrible… being bullied even at home.”",
          fb:{type:'ok', msg:'Sincere, but you remain on the surface.'},
          reply:{spk:'lea', txt:"Yeah…"}},
        { emp:0, txt:"“You could have blocked those people, disabled your social media.”",
          fb:{type:'bad', msg:"Advice she didn't ask for, and it sounds like blame: \"you could have avoided this\". She is telling you what she went through, not handing you a problem to solve. And blocking isn't enough: anonymous accounts come back under another name. Before advising, listen."},
          reply:{spk:'lea', txt:"(coldly) Thanks, I hadn't thought of that."}},
      ]
    },

    { id:'L3', phase:'2', phaseName:'Phase 2 - Clara', stepLabel:'Question 3 / 4',
      pdotCount:4, pdotActive:2,
      dialogueBefore:[
        {spk:'lea', txt:"You know what the worst part is?\nIt's when I started to believe it.\nWhen I looked at myself in the mirror and saw what they were saying."},
      ],
      prompt:'How do you answer her?',
      choices:[
        { emp:2, txt:"“It makes sense you ended up believing it, they told you a hundred times. But it's not true. They're the problem, not you.”",
          fb:{type:'good', msg:'You explain the mechanism. You give reality back to her.'},
          reply:{spk:'lea', txt:"(long pause) No one had ever said it like that before."}},
        { emp:1, txt:"“No. What you saw was their lies - not you.”",
          fb:{type:'ok', msg:'Clear and direct. Useful.'},
          reply:{spk:'lea', txt:"I try to tell myself that… it's hard."}},
        { emp:0, txt:"“You know very well that what they say is false.”",
          fb:{type:'bad', msg:"\"You know very well it's not true\": if she knew, she wouldn't be here. Heard a hundred times, bullying ends up making the victim believe what she's told. \"You know very well\" blames her for believing it."},
          reply:{spk:'lea', txt:"(silence) If I really knew that, I wouldn't have broken down."}},
      ]
    },

    { id:'L4', phase:'2', phaseName:'Phase 2 - Clara', stepLabel:'Question 4 / 4',
      pdotCount:4, pdotActive:3,
      dialogueBefore:[
        {spk:'lea',    txt:"I've been here five days…\nThe first two, I couldn't even leave the bedroom.\nNow… it hurts a little less. But I'm still scared.\nScared to go back to school. Scared it will start again. Scared that nothing will change."},
        {spk:'thomas', txt:"Have you talked to your aunt about it? To your parents?"},
        {spk:'lea',    txt:"My parents think I'm just tired. They told the school I was ill.\nMy aunt knows a little… She's kind. But I don't want to worry them.\nI feel like if I really talk about it… it becomes real."},
      ],
      prompt:'What do you say to her?',
      choices:[
        { emp:2, txt:"“It's already real, Clara. And that's exactly why you need adults who can act: your aunt, your parents, the school counsellor. Not to fix everything at once. Just so you're not carrying it alone anymore.”",
          fb:{type:'good', msg:"You show her that seeking help from adults is an act of courage - not a weakness."},
          reply:{spk:'lea', txt:"(silence) …Maybe. My aunt offered to call the school.\nI said no. But now… maybe yes."}},
        { emp:1, txt:"“You don't have to deal with this alone. If you want, I can be there when you talk to someone - any trusted adult.”",
          fb:{type:'ok', msg:"Supportive. But she has to take the first step - and you remind her of that well."},
          reply:{spk:'lea', txt:"(hesitant) …Okay. I'll think about it."}},
        { emp:0, txt:"“Don't worry, I'll handle it myself. Those people are going to be in trouble.”",
          fb:{type:'bad', msg:"\"I'll sort it out myself\": you want to protect her, but taking on the group alone could make things worse, for her and for you. It's not your role: it's the job of adults who can act - the school counsellor, her parents, her aunt."},
          reply:{spk:'lea', txt:"(coldly) No… please, don't do anything. It will only make things worse."}},
      ]
    }

  ]

};

const UI = {
  recapUrl: "recapitulatif_en.html",
  invalidCode: "Invalid code - check the 7 characters."
};
