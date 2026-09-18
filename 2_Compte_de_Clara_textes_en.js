// ─── DATA ─────────────────────────────────────────────────────────────────

const CONVOS = [
  // ── TODAY ──
  {
    id:1, avatar:"👤", name:"utilisateur_4729", sub:"Unknown account",
    unread:true, time:"4 min ago", section:"Today",
    preview:"did you see your face this morning seriously",
    messages:[
      { from:"them", text:"did you see your face this morning seriously", time:"10:42" },
      { from:"them", text:"your haircut is a disaster", time:"10:42" },
      { from:"them", text:"honestly make an effort before coming to class", time:"10:43" },
    ]
  },
  {
    id:2, avatar:"🙈", name:"anonymous_x0", sub:"Unknown account",
    unread:true, time:"12 min ago", section:null,
    preview:"everyone knows what you did with Nathan",
    messages:[
      { from:"them", text:"everyone knows what you did with Nathan in the bathrooms", time:"10:31" },
      { from:"them", text:"aren't you ashamed?", time:"10:31" },
      { from:"them", text:"you don't behave like that", time:"10:32" },
      { from:"them", text:"you're going to regret it", time:"10:33" },
    ]
  },
  {
    id:3, avatar:"💀", name:"_noreply_ghost_", sub:"Unknown account",
    unread:true, time:"28 min ago", section:null,
    preview:"your profile picture is pathetic",
    messages:[
      { from:"them", text:"your profile picture is really pathetic", time:"10:15" },
      { from:"them", text:"do you think you're pretty or what", time:"10:15" },
      { from:"them", text:"even the 6th graders laugh at you when you pass in the hallway", time:"10:16" },
    ]
  },
  {
    id:4, avatar:"🐍", name:"vrai_info_colleg", sub:"Unknown account",
    unread:true, time:"45 min ago", section:null,
    preview:"you're the one who snitched on the group and everyone knows it",
    messages:[
      { from:"them", text:"you're the one who snitched on the group and everyone knows it", time:"09:58" },
      { from:"them", text:"you shouldn't have done that", time:"09:59" },
      { from:"them", text:"you think there won't be consequences?", time:"09:59" },
      { from:"them", text:"there are several of us watching you now", time:"10:00" },
    ]
  },
  {
    id:5, avatar:"😈", name:"user_fake8847", sub:"Unknown account",
    unread:true, time:"1h ago", section:null,
    preview:"i screenshotted your story from yesterday you looked pathetic",
    messages:[
      { from:"them", text:"i screenshotted your story from yesterday", time:"09:22" },
      { from:"them", text:"you looked really pathetic with your crocodile tears", time:"09:22" },
      { from:"them", text:"it's been going around the whole class since this morning", time:"09:23" },
    ]
  },
  // ── YESTERDAY ──
  {
    id:6, avatar:"👤", name:"xxxxxxxxx_011", sub:"Unknown account",
    unread:false, time:"yesterday 22:14", section:"Yesterday",
    preview:"you know you have a real problem with your weight",
    messages:[
      { from:"them", text:"you know you have a real problem with your weight?", time:"22:14" },
      { from:"them", text:"every time we see you in class it's getting worse", time:"22:15" },
      { from:"them", text:"don't you have a mirror at home?", time:"22:15" },
    ]
  },
  {
    id:7, avatar:"🕷️", name:"anon_colleg_real", sub:"Unknown account",
    unread:false, time:"yesterday 20:37", section:null,
    preview:"we made a poll about you in class",
    messages:[
      { from:"them", text:"we made a poll about you in class", time:"20:37" },
      { from:"them", text:"the question was: Is Clara the most useless person in school", time:"20:38" },
      { from:"them", text:"94% voted yes", time:"20:38" },
      { from:"them", text:"are you going to stop showing off now?", time:"20:39" },
    ]
  },
  {
    id:8, avatar:"👁️", name:"jevoustrouve", sub:"Unknown account",
    unread:false, time:"yesterday 18:02", section:null,
    preview:"your photos are awful stop posting",
    messages:[
      { from:"them", text:"your photos are really awful stop posting", time:"18:02" },
      { from:"them", text:"you copy other people's style but it doesn't look the same on you obviously", time:"18:03" },
      { from:"them", text:"unsubscribe from insta you're embarrassing", time:"18:03" },
    ]
  },
  {
    id:9, avatar:"💬", name:"sansnom_2024", sub:"Unknown account",
    unread:false, time:"yesterday 16:44", section:null,
    preview:"you're so sensitive it's becoming exhausting for everyone",
    messages:[
      { from:"them", text:"you're so sensitive it's becoming exhausting for everyone", time:"16:44" },
      { from:"them", text:"you cry over nothing it's pathological", time:"16:44" },
      { from:"them", text:"people can't stand you anymore but nobody wants to tell you to your face", time:"16:45" },
      { from:"them", text:"now you know", time:"16:45" },
    ]
  },
  // ── THIS WEEK ──
  {
    id:10, avatar:"🔇", name:"xx_nobody_xx", sub:"Unknown account",
    unread:false, time:"Monday 21:10", section:"This week",
    preview:"the way you dress is really embarrassing",
    messages:[
      { from:"them", text:"the way you dress is really embarrassing", time:"21:10" },
      { from:"them", text:"it looks like you dress out of trash cans", time:"21:10" },
      { from:"them", text:"even the teachers noticed", time:"21:11" },
      { from:"them", text:"honestly you should stay home", time:"21:11" },
    ]
  },
  {
    id:11, avatar:"🤡", name:"super_secret_info", sub:"Unknown account",
    unread:false, time:"Monday 19:55", section:null,
    preview:"people have been talking about you in the group since last night",
    messages:[
      { from:"them", text:"you know people have been talking about you in the group since last night?", time:"19:55" },
      { from:"them", text:"what the guys in your class are saying about you isn't pretty", time:"19:56" },
      { from:"them", text:"I won't tell you what it is, it would hurt you too much", time:"19:56" },
      { from:"them", text:"or maybe you deserve to know actually", time:"19:57" },
    ]
  },
  {
    id:12, avatar:"👤", name:"0000_mask_0000", sub:"Unknown account",
    unread:false, time:"Sunday 23:41", section:null,
    preview:"your photo was shared in several groups lol",
    messages:[
      { from:"them", text:"your photo was shared in several groups lol", time:"23:41" },
      { from:"them", text:"you're funny without meaning to be, that's pretty strong", time:"23:41" },
      { from:"them", text:"everyone is laughing thanks to you", time:"23:42" },
    ]
  },
  {
    id:13, avatar:"🌑", name:"dark_mode_user", sub:"Unknown account",
    unread:false, time:"Sunday 20:18", section:null,
    preview:"your friends still talk to you out of pity you know that right",
    messages:[
      { from:"them", text:"your friends still talk to you out of pity you know that right?", time:"20:18" },
      { from:"them", text:"I asked someone in your group and they said they can't stand you anymore", time:"20:19" },
      { from:"them", text:"you don't have much of a future in this class", time:"20:19" },
    ]
  },
  // ── LAST MONTH ──
  {
    id:14, avatar:"👻", name:"fantome_reseau", sub:"Unknown account",
    unread:false, time:"3 weeks ago", section:"Last month",
    preview:"4 likes on your photo with 600 followers is pathetic",
    messages:[
      { from:"them", text:"did you see the number of likes on your latest photo?", time:"14:22" },
      { from:"them", text:"4 likes in 2 hours with 600 followers is pathetic", time:"14:22" },
      { from:"them", text:"even your own followers ignore you lol", time:"14:23" },
      { from:"them", text:"take that as a message", time:"14:23" },
    ]
  },
  {
    id:15, avatar:"🎭", name:"truth_teller_99", sub:"Unknown account",
    unread:false, time:"3 weeks ago", section:null,
    preview:"i don't understand how you still have friends",
    messages:[
      { from:"them", text:"I really don't understand how you still have friends", time:"09:50" },
      { from:"them", text:"there's nothing interesting about you seriously", time:"09:51" },
      { from:"them", text:"it's not mean it's just the truth", time:"09:51" },
      { from:"them", text:"you should think about it", time:"09:52" },
    ]
  },
  {
    id:16, avatar:"🕶️", name:"incognito_user21", sub:"Unknown account",
    unread:false, time:"3 weeks ago", section:null,
    preview:"you were filmed in the cafeteria yesterday did you know",
    messages:[
      { from:"them", text:"you were filmed in the cafeteria yesterday did you know?", time:"18:05" },
      { from:"them", text:"you looked completely lost as usual", time:"18:05" },
      { from:"them", text:"don't worry it's going to go everywhere", time:"18:06" },
    ]
  },
  {
    id:30, avatar:"💛", name:"sarah.girard", sub:"Friend · Lyon",
    unread:false, time:"3 weeks ago", section:null,
    preview:"clara please answer i'm worried",
    messages:[
      { from:"them", text:"Clara you didn't answer last night are you okay?", time:"09:12" },
      { from:"them", text:"I saw you posted a story at midnight and I was worried", time:"09:13" },
      { from:"me",   text:"sarah I can't do this anymore", time:"09:41" },
      { from:"me",   text:"I don't know how to explain it it's every day now", time:"09:42" },
      { from:"me",   text:"the messages the comments the looks in class", time:"09:42" },
      { from:"me",   text:"I don't want to come to school anymore", time:"09:43" },
      { from:"them", text:"oh no clara... I didn't know it was that bad", time:"09:51" },
      { from:"them", text:"why didn't you tell me before", time:"09:51" },
      { from:"me",   text:"I didn't dare I was ashamed", time:"09:53" },
      { from:"me",   text:"sarah can I come to your place next weekend", time:"09:54" },
      { from:"me",   text:"I need to get away from here even just for 2 days", time:"09:54" },
      { from:"them", text:"OF COURSE you can come whenever you want you know that right", time:"09:55" },
      { from:"them", text:"I'll talk to my mom tonight and we'll arrange it", time:"09:56" },
      { from:"them", text:"and clara please talk to your parents or an adult at school", time:"09:57" },
      { from:"them", text:"you don't have to go through this alone", time:"09:57" },
      { from:"me",   text:"thank you sarah really", time:"10:02" },
      { from:"me",   text:"you're the only one with Ines who understands me", time:"10:02" },
      { from:"me",   text:"but Ines already has so many problems at home that I don't want to bother her", time:"10:03" },
      { from:"me",   text:"so I make her believe everything is fine", time:"10:03" },
      { from:"me",   text:"sarah I think I'm going to go to my aunt's", time:"10:05" },
      { from:"me",   text:"that's the only place I'll feel okay", time:"10:05" },
    ]
  },
  {
    id:28, avatar:"😤", name:"vrai_garcon_2024", sub:"Unknown account",
    unread:false, time:"3 weeks ago", section:null,
    preview:"girls like you don't know how to behave",
    messages:[
      { from:"them", text:"girls like you don't know how to behave", time:"19:44" },
      { from:"them", text:"you don't belong expressing yourself like that in front of everyone", time:"19:45" },
      { from:"them", text:"you're a girl stay in your place", time:"19:46" },
      { from:"them", text:"you're too much in your head for a girl", time:"19:47" },
    ]
  },
  {
    id:29, avatar:"🏫", name:"colleg_info_2024", sub:"Unknown account",
    unread:false, time:"3 weeks ago", section:null,
    preview:"everyone was laughing behind your back in the cafeteria",
    messages:[
      { from:"them", text:"did you see the face you had in the cafeteria today", time:"17:21" },
      { from:"them", text:"everyone was laughing behind your back in the cafeteria", time:"17:22" },
      { from:"them", text:"the math teacher embarrassed you in front of everyone again right", time:"17:23" },
      { from:"them", text:"even the teachers can't stand you it was crazy", time:"17:24" },
    ]
  },
  {
    id:17, avatar:"🔴", name:"rouge_anonyme", sub:"Unknown account",
    unread:false, time:"4 weeks ago", section:null,
    preview:"did you see the comment E. left on your photo",
    messages:[
      { from:"them", text:"did you see the comment E. left on your photo?", time:"20:12" },
      { from:"them", text:"everyone liked his comment but not your photo that's funny right", time:"20:12" },
      { from:"them", text:"that says everything", time:"20:13" },
    ]
  },
  // ── 2 MONTHS AGO ──
  {
    id:18, avatar:"🫥", name:"user_invisible_00", sub:"Unknown account",
    unread:false, time:"2 months ago", section:"2 months ago",
    preview:"nobody defended you when M. insulted you did you notice",
    messages:[
      { from:"them", text:"nobody defended you when M. insulted you did you notice?", time:"17:34" },
      { from:"them", text:"it's because everyone thinks the same", time:"17:34" },
      { from:"them", text:"they just don't have the courage to tell you to your face", time:"17:35" },
    ]
  },
  {
    id:19, avatar:"🧨", name:"explosif_2024", sub:"Unknown account",
    unread:false, time:"2 months ago", section:null,
    preview:"did you see the stories the 9th graders posted about you",
    messages:[
      { from:"them", text:"did you see the stories the 9th graders posted about you?", time:"22:01" },
      { from:"them", text:"they gave you a nickname and it worked really well as a joke", time:"22:01" },
      { from:"them", text:"the whole school knows now", time:"22:02" },
      { from:"them", text:"congrats", time:"22:02" },
    ]
  },
  {
    id:20, avatar:"🪲", name:"bug_report_xx", sub:"Unknown account",
    unread:false, time:"2 months ago", section:null,
    preview:"your ex told his friends everything did you know",
    messages:[
      { from:"them", text:"your ex told his friends everything did you know?", time:"16:18" },
      { from:"them", text:"like really everything", time:"16:18" },
      { from:"them", text:"you'll do better next time if there is one", time:"16:19" },
    ]
  },
  {
    id:27, avatar:"🔐", name:"anon_blackmail_x", sub:"Unknown account",
    unread:false, time:"2 months ago", section:null,
    preview:"i have photos of you that you wouldn't want everyone to see",
    messages:[
      { from:"them", text:"I have photos of you that you wouldn't want everyone to see", time:"23:12" },
      { from:"them", text:"photos from the party at Lena's last month", time:"23:13" },
      { from:"them", text:"if you talk to anyone about what's happening at school I'll send them to your whole contact list", time:"23:13" },
      { from:"them", text:"do you understand the message?", time:"23:14" },
    ]
  },
  // ── 3 MONTHS AGO ──
  {
    id:21, avatar:"⚫", name:"xX_shadow_Xx", sub:"Unknown account",
    unread:false, time:"3 months ago", section:"3 months ago",
    preview:"can you still sleep at night knowing everyone hates you",
    messages:[
      { from:"them", text:"can you still sleep at night knowing everyone hates you?", time:"23:47" },
      { from:"them", text:"because if I were you I couldn't", time:"23:47" },
      { from:"them", text:"you must be made of stone or completely blind", time:"23:48" },
    ]
  },
  {
    id:22, avatar:"🗑️", name:"delete_clara", sub:"Unknown account",
    unread:false, time:"3 months ago", section:null,
    preview:"you can delete your account nobody would notice",
    messages:[
      { from:"them", text:"you can delete your account nobody would notice", time:"11:03" },
      { from:"them", text:"you have 612 followers but zero real friends on there", time:"11:03" },
      { from:"them", text:"that's sad isn't it", time:"11:04" },
    ]
  },
  {
    id:23, avatar:"👾", name:"ghost_account_333", sub:"Unknown account",
    unread:false, time:"3 months ago", section:null,
    preview:"i created an account just to tell you you're useless",
    messages:[
      { from:"them", text:"I created this account just to tell you you're useless", time:"19:22" },
      { from:"them", text:"it was necessary", time:"19:22" },
    ]
  },
  {
    id:24, avatar:"🎯", name:"target_clara_f", sub:"Unknown account",
    unread:false, time:"3 months ago", section:null,
    preview:"you're the easiest person to hate i've ever seen",
    messages:[
      { from:"them", text:"you're the easiest person to hate I've ever seen", time:"20:55" },
      { from:"them", text:"no effort needed honestly", time:"20:55" },
      { from:"them", text:"congratulations", time:"20:56" },
    ]
  },
  // ── MORE THAN 6 MONTHS AGO ──
  {
    id:25, avatar:"🕳️", name:"void_user_xx", sub:"Unknown account",
    unread:false, time:"7 months ago", section:"More than 6 months ago",
    preview:"we've wanted to tell you for a while that you don't belong here",
    messages:[
      { from:"them", text:"we've wanted to tell you for a while that you don't belong here", time:"08:14" },
      { from:"them", text:"in this school in this class and on this network", time:"08:14" },
      { from:"them", text:"take that as advice", time:"08:15" },
    ]
  },
  {
    id:26, avatar:"🧊", name:"froid_comme_toi", sub:"Unknown account",
    unread:false, time:"8 months ago", section:null,
    preview:"we made up a nickname for you in class do you want to know which one",
    messages:[
      { from:"them", text:"we made up a nickname for you in class do you want to know which one?", time:"13:30" },
      { from:"them", text:"everyone already uses it except you", time:"13:30" },
      { from:"them", text:"ask around if you have the courage", time:"13:31" },
    ]
  },
  {
    id:99, avatar:"👤", name:"kevin.4b", sub:"Kevin",
    unread:true, time:"3 days ago", section:null,
    secret:true,
    preview:"I'm sorry, I didn't think it would go this far...",
    messages:[
      { from:"them", text:"I'm sorry, I didn't think it would go this far", time:"23:41" },
      { from:"them", text:"but if you want to see what they're saying about you, it's here", time:"23:42" },
      { from:"them", text:"the Whatsupp group \"the real 4B 🔥\", code 4827", time:"23:42" },
    ]
  },
];

// ─── PHOTO QUIZZES, triggered from the lightbox ──────────────────────────

const PHOTO_QUIZZES = {
  3: {
    icon:'⚖️',
    type:'Body shaming',
    question:'In your opinion, what do we call the kind of comment you just read under the photo?',
    options:[
      'Clumsy diet advice',
      'Body shaming - harassment targeting physical appearance',
      'A simple joke between friends',
      'Spam'
    ],
    correct:1,
    explanation:'Body shaming consists of criticizing a person\'s body, weight, or eating habits in order to hurt and humiliate them. When repeated, these comments can cause long-lasting body image issues.'
  },
  7: {
    icon:'🎂',
    type:'Online isolation and social exclusion',
    question:'The comments on Clara\'s birthday photo mock her loneliness ("was nobody there?", "did you eat it all by yourself?"). What type of bullying is this?',
    options:[
      'Light teasing with no consequences',
      'Deliberate social exclusion meant to isolate and humiliate the victim',
      'Phishing',
      'A simple disagreement'
    ],
    correct:1,
    explanation:'Mocking someone for being isolated is meant to make them feel excluded and unwanted. On social media, these comments are visible to everyone and intensify the pain of loneliness.'
  },
  5: {
    icon:'📸',
    type:'Non-consensual sharing of images and cyber-surveillance',
    question:'Strangers comment on Clara\'s concert photo, saying she "didn\'t belong there" and that "the people around her must have been happy." What is this?',
    options:[
      'An aesthetic comment on the photo',
      'Harassment targeting the victim\'s identity and sense of belonging, with collective intimidation',
      'A music review',
      'A friendly joke'
    ],
    correct:1,
    explanation:'Hostile comments about Clara\'s presence in everyday spaces, such as a concert or cafeteria, are meant to make her believe she does not "belong" anywhere. This is a form of permanent exclusion that also affects physical spaces.'
  }
};

// ─── QUIZ SYSTEM ─────────────────────────────────────────────────────────────

const QUIZZES = {
  4: {
    icon: '⚠️',
    type: 'Online intimidation and threats',
    question: 'These messages, "there are several of us watching you," represent what form of cyberbullying?',
    options: [
      'Light teasing between students',
      'Unwanted advertising, spam',
      'Collective intimidation and online threats',
      'A simple misunderstanding'
    ],
    correct: 2,
    explanation: 'Threatening a victim as a group in order to scare them or silence them is collective intimidation. Even without physical violence, these messages create a constant state of anxiety.'
  },
  7: {
    icon: '📊',
    type: 'Public humiliation poll',
    question: '"Is Clara the most useless person in school?" - What type of cyberbullying is this?',
    options: [
      'A public humiliation poll',
      'Phishing, data theft',
      'Exclusion from an online gaming group',
      'Advertising spam'
    ],
    correct: 0,
    explanation: 'A humiliation poll publicly targets one person to ridicule them in front of a group. Over time, the victim often internalizes this collective judgment as a truth about themselves.'
  },
  11: {
    icon: '🕸️',
    type: 'Rumors and psychological manipulation',
    question: '"People are talking badly about you, but I won\'t tell you what they\'re saying." - What is this?',
    options: [
      'Clumsy advice from a friend',
      'Manipulation meant to isolate and distress the victim',
      'Doxxing, revealing personal data',
      'A harmless troll'
    ],
    correct: 1,
    explanation: 'Hinting that "everyone is talking badly about you" without ever saying exactly what is being said is psychological manipulation. The goal is to create constant anxiety and cut the victim off from people close to them.'
  },
  22: {
    icon: '🚪',
    type: 'Forced exclusion',
    question: '"Delete your account, nobody would notice." - What mechanism is at work?',
    options: [
      'Clumsy friendly advice',
      'Pressure to force the victim to exclude themselves',
      'Spam',
      'Identity theft'
    ],
    correct: 1,
    explanation: 'Pushing the victim to exclude themselves is forced exclusion. The goal is to make the person disappear without the bully being held directly responsible.'
  },
  23: {
    icon: '👤',
    type: 'Fake account created to harass',
    question: '"I created this account just to tell you you\'re useless." What is the specific danger?',
    options: [
      'It collects personal data',
      'It impersonates one of Clara\'s friends',
      'It was created solely to harass, protected by anonymity',
      'It sends viruses'
    ],
    correct: 2,
    explanation: 'Creating an account solely to harass illustrates the cowardice enabled by online anonymity. The victim cannot identify or truly block the aggressor.'
  }
};

// ─── TYPES OF BULLYING ────────────────────────────────────────────────────

const HARCEL_TYPES = {
  body_shaming:     { label:'Body shaming',                         desc:'Mockery targeting the body, weight, or appearance.',                    color:'#e07040', icon:'🪞' },
  menaces:          { label:'Threats and intimidation',              desc:'Threatening messages meant to scare or silence the victim.',             color:'#cc3333', icon:'⚠️' },
  rumeurs:          { label:'Rumors and defamation',                 desc:'Spreading false information to damage someone\'s reputation.',           color:'#cc6600', icon:'🗣️' },
  exclusion:        { label:'Exclusion and forced isolation',         desc:'Pushing the victim to feel excluded from every social space.',           color:'#8844cc', icon:'🚪' },
  diffusion_images: { label:'Sharing images without consent',         desc:'Sharing or threatening to share images without permission.',             color:'#0088cc', icon:'📸' },
  manipulation:     { label:'Psychological manipulation',             desc:'Insinuations and mind games that create anxiety and confusion.',          color:'#669900', icon:'🕸️' },
  sextorsion:       { label:'Blackmail / Sextortion',                 desc:'Using intimate images or secrets to pressure someone.',                  color:'#aa0044', icon:'🔐' },
  sexiste:          { label:'Sexist harassment',                      desc:'Attacks based on gender meant to humiliate and belittle.',               color:'#cc44aa', icon:'😤' },
  scolaire:         { label:'Long-term school bullying',              desc:'The extension of school bullying onto social media.',                    color:'#447799', icon:'🏫' },
};

const HARCEL_MAP = [
  { frag:'problem with your weight',                          type:'body_shaming' },
  { frag:'eat more',                                          type:'body_shaming' },
  { frag:'real problem with your weight',                     type:'body_shaming' },
  { frag:'you wonder why',                                    type:'body_shaming' },
  { frag:'there are several of us watching you',              type:'menaces' },
  { frag:"going to regret it",                                type:'menaces' },
  { frag:"there won't be consequences",                       type:'menaces' },
  { frag:'everyone knows what you did with Nathan',           type:'rumeurs' },
  { frag:"been going around the whole class",                 type:'rumeurs' },
  { frag:'we made a poll about you',                          type:'rumeurs' },
  { frag:'nickname',                                          type:'rumeurs' },
  { frag:'delete your account nobody would notice',           type:'exclusion' },
  { frag:"we've wanted to tell you for a while",              type:'exclusion' },
  { frag:'in this school in this class',                      type:'exclusion' },
  { frag:'nobody was there for your birthday',                type:'exclusion' },
  { frag:'eat the whole cake by yourself',                    type:'exclusion' },
  { frag:'you don\'t belong here',                            type:'exclusion' },
  { frag:'screenshotted your story',                          type:'diffusion_images' },
  { frag:'your photo was shared in several groups',           type:'diffusion_images' },
  { frag:'you were filmed',                                   type:'diffusion_images' },
  { frag:'stories the 9th graders posted',                    type:'diffusion_images' },
  { frag:"I won't tell you what it is",                       type:'manipulation' },
  { frag:'or maybe you deserve to know',                      type:'manipulation' },
  { frag:'your friends still talk to you out of pity',        type:'manipulation' },
  { frag:'nobody defended you',                               type:'manipulation' },
  { frag:"photos of you that you wouldn't want",              type:'sextorsion' },
  { frag:"if you talk to anyone about what's happening at school", type:'sextorsion' },
  { frag:'girls like you',                                    type:'sexiste' },
  { frag:'stay in your place',                                type:'sexiste' },
  { frag:'too much in your head for a girl',                  type:'sexiste' },
  { frag:"don't belong expressing yourself",                  type:'sexiste' },
  { frag:'everyone was laughing behind your back in the cafeteria', type:'scolaire' },
  { frag:"even the teachers can't stand you",                 type:'scolaire' },
  { frag:'the math teacher embarrassed you',                  type:'scolaire' },
];

// ─── PROFILE PHOTOS ────────────────────────────────────────────────────────

var photoData = [
  { likes: 3,  caption: "sunrise this morning 🌅",
    comments: [
      { user: "utilisateur_4729", text: "what photo quality lol" },
      { user: "anonymous_x0",     text: "your photo is blurry you have no talent at all" },
      { user: "_noreply_ghost_",  text: "your photo is seriously so ugly" },
    ]
  },
  { likes: 34, caption: "love playing so much 🎸🎵",
    comments: [
      { user: "sarah.girard",     text: "SINCE WHEN do you play that well" },
      { user: "ines_l",           text: "same song for 3 weeks straight lol but I love it" },
      { user: "sarah.girard",     text: "please play at the end of year show" },
    ]
  },
  { likes: 1,  caption: "my kitten 🐱❤️",
    comments: [
      { user: "anon_colleg_real", text: "even your cat looks as useless as you" },
      { user: "jevoustrouve",     text: "your photo is so ugly" },
    ]
  },
  { likes: 4,  caption: "Sunday ice cream 🍦",
    comments: [
      { user: "sansnom_2024",     text: "and you wonder why you have a problem with your weight" },
      { user: "xx_nobody_xx",     text: "honestly you have no shame posting that" },
      { user: "anonymous_x0",     text: "eat more don't worry" },
    ]
  },
  { likes: 21, caption: "evening reading 📚",
    comments: [
      { user: "ines_l",           text: "which book are you on now ??" },
      { user: "sarah.girard",     text: "lend it to me when you're done" },
    ]
  },
  { likes: 7,  caption: "concert tonight 🎤🔥",
    comments: [
      { user: "vrai_info_colleg", text: "what? you like this artist? you're useless poor girl" },
      { user: "user_fake8847",    text: "you shouldn't have gone, it's obvious you don't belong there" },
      { user: "0000_mask_0000",   text: "the people around you in the crowd must have been thrilled lol" },
    ]
  },
  { likes: 2,  caption: "flowers from the market 🌸",
    comments: [
      { user: "dark_mode_user",   text: "even the flowers look like they want to leave" },
      { user: "fantome_reseau",   text: "flowers? nobody's ever gonna give you any lol" },
    ]
  },
  { likes: 4,  caption: "birthday cake 🎂",
    comments: [
      { user: "anon_colleg_real", text: "nobody was there for your birthday is that it?" },
      { user: "sansnom_2024",     text: "did you eat the whole cake by yourself?" },
      { user: "xx_nobody_xx",     text: "sad party" },
    ]
  },
  { likes: 0,  caption: "starry night 🌙",
    comments: [
      { user: "truth_teller_99",  text: "0 likes in 3 hours that's a message clara" },
      { user: "utilisateur_4729", text: "even the sky doesn't want you" },
      { user: "_noreply_ghost_",  text: "you should have gone to sleep instead of posting this" },
    ]
  },
];

// ─── UI STRINGS ───────────────────────────────────────────────────────────────

const UI = {
  unread:          "unread",
  typesIdentified: "types identified",
  today:           "Today",
  quizLabel:       "Identify the type of harassment",
  cancelSelect:    "✕ Cancel selection",
  identifyBtn:     "🔍 Identify harassment",
  firstToLike:     "Be the first to like",
  likes:           " likes",
  synthBtn:        "📋 View summary - What happened to Clara",
  synthNote:       "These forms of bullying are real. Each one leaves marks on the victim - even without physical contact.",
  backToWA:        "← Back to the group",
  backToWAUrl:     "3_Groupe_Secret_en.html",
  correct:         "Correct!",
  wrong:           "Not quite.",
  demasqueSub:     "Unmasked in the group: ",
  reportBtn:       "⚠ Report this account",
  reportDone:      "✓ Account reported",
  reportAfter:     "Account reported. Clara could have done it from the very first message - nobody had told her.",
  synthFound:      "found",
  synthMissed:     "missed",
  noteCode:        "🔐 The code for what comes next",
  codeClose:       "← Back to Kevin's message",
  observeBtn:      "🗣 Say what I observe",
  notTagged:       "That one hurts too - but it isn't enough to name a type of harassment. Look for a more revealing message."
};
