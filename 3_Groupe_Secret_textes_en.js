const WA_DATA = {

  // ─── Group ──────────────────────────────────────────────────────────────────

  group: {
    name:    "the real 4B 🔥",
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

  // ─── UI Texts ───────────────────────────────────────────────────────────────

  banner: {
    strong: "Educational exercise on cyberbullying",
    tail:   " - All characters and messages are fictional. Created for educational purposes."
  },

  warning: {
    icon:  "⚠️",
    title: "Educational simulation",
    body:  "I am going to observe a secret group that Clara is not part of.\n\nThese exchanges show how bullying is coordinated behind the scenes - how anonymous accounts are created to attack someone and how aggression is organized collectively.",
    btn:   "Continue →"
  },

  // ─── The anonymous accounts named inside the group ─────────────────────────
  comptes: {
    label:      "accounts identified",
    cardTitle:  "Account unmasked",
    cardIntro:  "Behind this account:",
    cardNote:   "Clara cannot know this. You can - because you are reading a group you are not in.",
    cardSee:    "See their messages on Clara's Instaclasse →",
    cardClose:  "Close",
    already:    "Already spotted.",
    liste: [
      { handle: "utilisateur_4729", qui: "Enzo" },
      { handle: "_noreply_ghost_",  qui: "Jade" },
      { handle: "anonymous_x0",     qui: "Enzo and Théo" },
      { handle: "vrai_info_colleg", qui: "Jade" },
      { handle: "jevoustrouve",     qui: "Théo" }
    ]
  },

  kevin: {
    icon:  "🫥",
    title: "And Kevin?",
    body:  "Kevin hesitated five times. \"We're going a bit far here.\" \"This might be serious.\" \"Nobody has seen her for 2 days.\" \"Maybe we went too far.\" Then \"…\". Every time he was cut off, and every time he went quiet. He eventually wrote to Clara, but too late: she had already gone.",
    items: [
      "Write to Clara privately, at the very first doubt - one sentence. He didn't have to take on the group: she only needed to stop feeling alone.",
      "Leave the group. Leaving is visible, and it takes one voice away from the crowd.",
      "Keep a screenshot. It is the only proof this group ever existed.",
      "Tell an adult. It is the only move that could have stopped the others."
    ],
    note: "In a classroom there are rarely many Claras and many Enzos. There are mostly a lot of Kevins."
  },

  mobile: {
    icon:  "❓",
    title: "Why Clara?",
    body:  "Read the group again: they never say. The only justification that comes back is \"she asked for it\". There is no reason - and looking for one would already be blaming Clara.",
  },

  mission: {
    icon:  "👁",
    title: "What you need to understand",
    body:  "I am going to observe how the members of this group organized the bullying against Clara.\n\nQuestions will appear during the reading to help me analyze what is happening.\n\nBy the end, I will have a complete view of what happened.",
    btn:   "Start →"
  },

  startLabel: "▶ See what is being said in the group",

  // ─── Instaclasse card shared in the group ─────────────────────────────────────

  postCard: {
    account: "clara.fontaine",
    caption: "sunrise this morning 🌅",
    photo:   "images_clara/plage.png",
    seeBtn:  "👁 See the comments flood her post"
  },

  postComments: [
    { user: "utilisateur_4729", text: "what photo quality lol",                         delay:  400 },
    { user: "anonymous_x0",     text: "your photo is blurry you have no talent at all", delay: 1600 },
    { user: "_noreply_ghost_",  text: "your photo is seriously so ugly",                delay: 2800 }
  ],

  // ─── Message sequence ───────────────────────────────────────────────────────

  messages: [

    { id:  1, sender: "Enzo",  text: "guys this is so funny, clara tried to talk to us again at break 💀",                    time: "17:14", delay:  800 },
    { id:  2, sender: "Jade",   text: "seriously does she not get that she's not in the group anymore or what",                time: "17:14", delay:  900 },
    { id:  3, sender: "Théo",   text: "I totally ignored her in front of everyone, she looked like a clown",                   time: "17:15", delay:  800 },
    { id:  4, sender: "Kevin",  text: "lmaooo 💀",                                                                            time: "17:16", delay:  500 },
    { id:  5, sender: "Marine", text: "how long has it been since we stopped talking to her actually?",                        time: "17:16", delay:  700 },
    { id:  6, sender: "Enzo",  text: "like 3 weeks and she still doesn't get it lol",                                         time: "17:17", delay:  700 },
    { id:  7, sender: "Jade",   text: "I'm sick of seeing her post stuff on insta like nothing happened",                      time: "17:17", delay:  900 },
    { id:  8, sender: "Enzo",  text: "yeah she acts like everything's fine when no one talks to her at school",               time: "17:18", delay: 1000 },
    { id:  9, sender: "Jade",   text: "we should flood her comments",                                                         time: "17:18", delay:  800 },
    { id: 10, sender: "Kevin",  text: "good idea, wait until she posts something 👀",                                          time: "17:19", delay:  700 },

    { id: 11, type: "system",         text:   "Enzo shared an Instaclasse post", time: "17:21", delay: 1500 },
    { id: 12, type: "post-card", sender: "Enzo",                          time: "17:21", delay:  600 },
    { id: 13, sender: "Enzo",  text: "EVERYONE GO NOW this is the moment 🔥🔥",                                          time: "17:21", delay:  600 },
    { id: 14, sender: "Théo",   text: "I'm going now",                                                                  time: "17:22", delay:  500 },
    { id: 15, sender: "Jade",   text: "me too, wait I'm looking for my anon account",                                    time: "17:22", delay:  800 },
    { id: 16, sender: "Marine", text: "make sure you use your fake accounts so she doesn't know it's us",                 time: "17:22", delay: 1000 },
    { id: 17, sender: "Kevin",  text: "yeah like even if she screenshots it we can still deny it",                        time: "17:23", delay:  800 },

    { id: 18, sender: "Enzo",  text: "I'm using @utilisateur_4729, I've had it for a while",                            time: "17:23", delay:  900 },
    { id: 19, sender: "Jade",   text: `mine is @_noreply_ghost_ lol I put "your photo is seriously so ugly"`,             time: "17:24", delay: 1000 },
    { id: 20, sender: "Théo",   text: `I put "your photo is blurry you have no talent at all" from @anonymous_x0 💀`,     time: "17:24", delay: 1100 },
    { id: 21, sender: "Marine", text: "hahaha I'm waiting a bit so it doesn't all arrive at the same time",               time: "17:25", delay: 1000 },
    { id: 22, sender: "Kevin",  text: "strategy 🧠",                                                                     time: "17:25", delay:  500 },
    { id: 23, sender: "Enzo",  text: "yeah leave pauses between each one so it looks natural",                           time: "17:26", delay:  900 },

    { type: "time-sep", text: "25 minutes later", delay: 1000 },

    { id: 24, sender: "Jade",   text: "look at her number of likes 💀 3 likes in 2h with 612 followers that's dead",      time: "17:51", delay: 1800 },
    { id: 25, sender: "Théo",   text: "even her real followers ignore her now hahaha",                                   time: "17:51", delay:  800 },
    { id: 26, sender: "Enzo",  text: "we managed to contaminate her image 😈",                                          time: "17:52", delay:  800 },
    { id: 27, sender: "Kevin",  text: "seriously don't you think we're going a bit too far now...",                       time: "17:53", delay: 1000 },
    { id: 28, sender: "Enzo",  text: "don't worry it's just for fun, she takes it way too seriously anyway",             time: "17:53", delay:  900 },
    { id: 29, sender: "Kevin",  text: "yeah okay...",                                                                    time: "17:54", delay:  500 },
    { id: 30, sender: "Marine", text: "what about her DMs too? we could send her stuff at night",                        time: "17:54", delay: 1000 },
    { id: 31, sender: "Enzo",  text: "yes with anon accounts again, so she can't sleep peacefully",                      time: "17:55", delay:  900 },
    { id: 32, sender: "Jade",   text: "like harass her until she finally leaves insta",                                  time: "17:55", delay:  800 },

    { type: "quiz", quizId: "coordination", delay: 400 },

    { id: 34, sender: "Enzo",  text: "@anonymous_x0 is mine, I made it, Théo uses it too btw",                                        time: "17:57", delay:  700 },
    { id: 35, sender: "Jade",   text: "mine is @vrai_info_colleg, created to spread rumors about her",                   time: "17:57", delay: 1000 },
    { id: 36, sender: "Théo",   text: "I have @jevoustrouve to scare her at night",                                      time: "17:58", delay:  900 },
    { id: 37, sender: "Marine", text: "for tonight we organize it like this: messages every hour after midnight",        time: "17:59", delay: 1000 },
    { id: 38, sender: "Enzo",  text: "so she thinks about us even at home, even when she's trying to sleep 💀",         time: "18:00", delay: 1000 },
    { id: 39, sender: "Jade",   text: "and we flood her DMs from the anon accounts, especially stuff about her looks",   time: "18:01", delay: 1000 },

    { type: "quiz", quizId: "anonymat", delay: 400 },

    { type: "time-sep", text: "Next day - 09:14" },
    { id: 40, sender: "Jade",   text: "did you see? Clara hasn't posted since last night",                               time: "09:14", delay: 1200 },
    { id: 41, sender: "Enzo",  text: "hahaha we really broke her 💀",                                                   time: "09:15", delay:  700 },
    { id: 42, sender: "Théo",   text: "she hasn't even been seen online since this morning",                             time: "09:15", delay:  800 },
    { id: 43, sender: "Marine", text: "and she wasn't in class today either 😂",                                          time: "09:16", delay:  900 },
    { id: 44, sender: "Kevin",  text: "seriously... this might actually be bad now",                                      time: "09:17", delay: 1200 },
    { id: 45, sender: "Enzo",  text: "relax she just needs a break, she brought it on herself 😂",                       time: "09:17", delay:  700 },
    { id: 46, sender: "Kevin",  text: "it's been 2 days since anyone saw her anywhere. that's not normal",                time: "09:18", delay: 1000 },
    { id: 47, sender: "Jade",   text: "kevin stop being dramatic it's fine",                                             time: "09:18", delay:  600 },
    { id: 48, sender: "Marine", text: "I heard she went to her \"secret haven\" lmao",                                    time: "09:20", delay: 1500 },
    { id: 49, sender: "Enzo",  text: "her WHAT 💀💀💀",                                                                 time: "09:20", delay:  500 },
    { id: 50, sender: "Jade",   text: "this girl is seriously so weird with her 40-year-old words",                      time: "09:21", delay:  800 },
    { id: 51, sender: "Théo",   text: "what is this \"secret haven\" omg who does she think she is",                      time: "09:21", delay:  700 },
    { id: 52, sender: "Marine", text: "at her aunt's I think, somewhere, nobody really knows",                           time: "09:22", delay: 1000 },
    { id: 53, sender: "Enzo",  text: "lmao she ran away to her secret castle 🏰 so pathetic",                           time: "09:22", delay:  800 },
    { id: 54, sender: "Kevin",  text: "guys honestly... maybe we went too far",                                          time: "09:24", delay: 1500 },
    { id: 55, sender: "Théo",   text: "no, she brought it on herself. she just shouldn't have reacted like that",         time: "09:24", delay:  700 },
    { id: 56, sender: "Jade",   text: "exactly, it's her fault if she can't take it",                                    time: "09:25", delay:  600 },
    { id: 57, sender: "Enzo",  text: "well she can come back from her \"haven\" whenever she wants 😂 we'll be here",    time: "09:25", delay:  900 },
    { id: 58, sender: "Kevin",  text: "...",                                                                            time: "09:26", delay:  400 },

    { type: "end", delay: 300 }

  ],

  // ─── Quiz ────────────────────────────────────────────────────────────────────

  quizzes: {

    coordination: {
      icon:     "👥",
      label:    "Analysis point",
      question: "Kevin hesitates but stays silent and goes along with it. What does this scene reveal?",
      options: [
        "Kevin is too cowardly to stand up to them",
        "Group pressure can silence even the person who has doubts - this is a key mechanism in collective bullying",
        "Kevin is not really involved in the bullying",
        "It is an individual and free decision for each person"
      ],
      correct: 1,
      explanation: "Group bullying works because social pressure silences dissenting voices. Kevin has doubts, but he conforms so he will not be excluded in turn. Meanwhile, Clara is facing an entire group - which makes her isolation total and her sense of injustice even stronger."
    },

    anonymat: {
      icon:     "👤",
      label:    "Analysis point",
      question: "Why do they create anonymous accounts specifically to harass Clara?",
      options: [
        "To test Instaclasse's privacy settings",
        "To avoid being identified, multiply the apparent number of attackers, and make blocking impossible",
        "Because their real accounts have already been blocked by Clara",
        "To play a fictional role with no real consequences"
      ],
      correct: 1,
      explanation: "Anonymous accounts are used to hide the bullies' identities while making it seem as if the attacks are coming from everywhere. Clara cannot identify her attackers, block them effectively, or prove who is doing what. The anxiety becomes constant because the threat seems to come out of nowhere - even at home, even at night."
    }

  },

  // ─── Final summary ──────────────────────────────────────────────────────────

  synthesis: {
    title: "📋 Mechanisms of group bullying",
    items: [
      {
        icon: "👥",
        type: "Collective pressure",
        exp:  "Kevin hesitates but conforms so he will not be excluded. When no one dares to object, the whole group becomes complicit - even those who have doubts. The victim faces a crowd, not just one individual."
      },
      {
        icon: "👤",
        type: "Anonymity as a shield",
        exp:  "Fake accounts make it possible to multiply the apparent number of attackers and avoid identification. The victim cannot block anyone effectively. The anxiety becomes constant because the threat comes from nowhere."
      },
      {
        icon: "🗓️",
        type: "Invisible coordination",
        exp:  "The bullying is planned and spread out over time so it appears natural. It is not spontaneous: it is an invisible organization. The victim perceives widespread hostility without seeing its source."
      },
      {
        icon: "🌙",
        type: "The invasion of private space",
        exp:  "By sending messages after midnight, the group makes sure Clara can no longer find refuge at home. The bullying follows the victim everywhere - even in her bed, even at night."
      }
    ]
  },

  // ─── Final state ────────────────────────────────────────────────────────────

  endMessage: {
    title: "This group existed while Clara…",
    points: [
      "was receiving anonymous messages at night - they are in this group.",
      "saw her comments being flooded - they organized it here.",
      "thought that \"everyone\" hated her - they created that together.",
      "no longer dared to post - that was their goal.",
      "ran away to her \"secret haven\"... but where is it?"
    ],
    note: "Group bullying turns every space into a danger. Clara has gone somewhere to take refuge. Someone must know where."
  },

  // ─── Navigation ─────────────────────────────────────────────────────────────

  navigation: {
    prev: { label: "← Clara's Instaclasse", url: "2_Compte_de_Clara_en.html" },
    next: { label: "Back to the investigation →", url: "index_en.html" }
  }

};

const UI = {
  today: "Today",
  likes: "3 likes",
  mentionTooltip: "See their messages on Clara's Instaclasse",
  correct: "✓ Correct!",
  wrong: "✗ Not quite.",
  tapHint: "▼ Tap to read on",
  inputPlaceholder: "Message…"
};
