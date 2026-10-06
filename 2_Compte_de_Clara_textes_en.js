// ─── DATA ─────────────────────────────────────────────────────────────────

const CONVOS = [
  // ── TODAY ──
  {
    id:1, avatar:"👤", name:"utilisateur_4729", sub:"Unknown account",
    unread:true, time:"4 min ago", section:"Today",
    preview:"did you see your face in your last photo seriously",
    why:"He goes after her face and her hair: that's body shaming. And \"good thing you stopped coming to class\" pushes her out of school: that's exclusion, carrying school bullying online.",
    messages:[
      { from:"them", text:"did you see your face in your last photo seriously", time:"10:42" },
      { from:"them", text:"your haircut is a disaster", time:"10:42" },
      { from:"them", text:"honestly good thing you stopped coming to class", time:"10:43" },
    ]
  },
  {
    id:2, avatar:"🙈", name:"anonymous_x0", sub:"Unknown account",
    unread:true, time:"12 min ago", section:null,
    preview:"everyone knows what you did with Nathan",
    why:"A story about her private life, with no proof, that \"everyone\" supposedly knows: that's a rumor. It targets Clara because she's a girl - nobody would blame Nathan: so it's sexist too. The last line is a threat.",
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
    why:"Mocking her face and her looks is body shaming. \"Even the 6th graders laugh at you\" brings the humiliation into the school corridors, and shuts her out.",
    messages:[
      { from:"them", text:"your profile picture is really pathetic", time:"10:15" },
      { from:"them", text:"do you think you're pretty or what", time:"10:15" },
      { from:"them", text:"even the 6th graders laugh at you when you pass in the hallway", time:"10:16" },
    ]
  },
  {
    id:4, avatar:"🐍", name:"vrai_info_colleg", sub:"Unknown account",
    unread:true, time:"45 min ago", section:null,
    preview:"apparently you stole from lena's locker",
    why:"A made-up accusation (\"apparently…\") spread to the whole class to damage her reputation: that's a rumor. \"It's not me saying it, it's everyone\" is there to make it believable.",
    messages:[
      { from:"them", text:"apparently you stole from lena's locker", time:"09:58" },
      { from:"them", text:"that's why she doesn't talk to you anymore", time:"09:59" },
      { from:"them", text:"i warned the whole class, watch your stuff 😂", time:"09:59" },
      { from:"them", text:"it's not me saying it it's everyone", time:"10:00" },
    ]
  },
  {
    id:5, avatar:"😈", name:"user_fake8847", sub:"Unknown account",
    unread:true, time:"1h ago", section:null,
    preview:"i screenshotted your last story you looked pathetic",
    why:"Screenshotting her story and passing it around without her consent is sharing her image without consent. Calling her tears \"crocodile tears\" denies her pain so she doubts herself: that's manipulation.",
    messages:[
      { from:"them", text:"i screenshotted your last story before you deleted it", time:"09:22" },
      { from:"them", text:"you looked really pathetic with your crocodile tears", time:"09:22" },
      { from:"them", text:"it's been going around the whole class since this morning", time:"09:23" },
    ]
  },
  // ── YESTERDAY ──
  {
    id:6, avatar:"👤", name:"xxxxxxxxx_011", sub:"Unknown account",
    unread:false, time:"yesterday 22:14", section:"Yesterday",
    preview:"you know you have a real problem with your weight",
    why:"Her weight, her reflection in the mirror: attacking someone's body to humiliate them is body shaming. Repeated, it can damage how a person sees themselves for a long time.",
    messages:[
      { from:"them", text:"you know you have a real problem with your weight?", time:"22:14" },
      { from:"them", text:"every time we saw you in class it was getting worse", time:"22:15" },
      { from:"them", text:"don't you have a mirror at home?", time:"22:15" },
    ]
  },
  {
    id:7, avatar:"🕷️", name:"anon_colleg_real", sub:"Unknown account",
    unread:false, time:"yesterday 20:37", section:null,
    preview:"we made a poll about you in class",
    why:"A poll on \"the most useless person in school\" turns a whole class against one person: exclusion, starting at school. The \"94%\" is probably made up: it's there to make her feel alone against everyone.",
    messages:[
      { from:"them", text:"we made a poll about you in class", time:"20:37" },
      { from:"them", text:"the question was: Is Clara the most useless person in school", time:"20:38" },
      { from:"them", text:"94% voted yes", time:"20:38" },
      { from:"them", text:"are you going to stop showing off now?", time:"20:39" },
    ]
  },
  {
    id:9, avatar:"💬", name:"sansnom_2024", sub:"Unknown account",
    unread:false, time:"yesterday 16:44", section:null,
    preview:"you're so sensitive it's becoming exhausting for everyone",
    why:"Telling her she's \"too sensitive\", that her crying is \"pathological\", turns the blame back on her: she ends up believing she is the problem. That's manipulation. \"People can't stand you anymore\" adds isolation.",
    messages:[
      { from:"them", text:"you're so sensitive it's becoming exhausting for everyone", time:"16:44" },
      { from:"them", text:"you cry over nothing it's pathological", time:"16:44" },
      { from:"them", text:"people can't stand you anymore but nobody wants to tell you to your face", time:"16:45" },
      { from:"them", text:"now you know", time:"16:45" },
    ]
  },
  {
    id:8, avatar:"👁️", name:"jevoustrouve", sub:"Unknown account",
    unread:false, time:"yesterday 02:47", section:null,
    preview:"you asleep?",
    why:"Writing \"tomorrow we'll still be here\" at 2:47 a.m. tells her she's safe nowhere, not even at night, not even at home: these are threats.",
    messages:[
      { from:"them", text:"you asleep?", time:"02:47" },
      { from:"them", text:"we're sleeping just fine", time:"02:47" },
      { from:"them", text:"you can turn your phone off it won't change anything", time:"02:48" },
      { from:"them", text:"tomorrow we'll still be here", time:"02:48" },
    ]
  },
  // ── THIS WEEK ──
  {
    id:10, avatar:"🔇", name:"xx_nobody_xx", sub:"Unknown account",
    unread:false, time:"Monday 21:10", section:"This week",
    preview:"the way you dress is really embarrassing",
    why:"Her clothes, her appearance: that's body shaming. \"Even the teachers noticed\" is probably false, but makes her believe everyone is judging her. And \"stay home\" pushes her to disappear: exclusion.",
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
    why:"\"People are talking about you, but I won't say what\": creating anxiety with nothing she can check is manipulation. Bringing up what \"the guys in your class say about you\" also lets a rumor spread.",
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
    why:"Her photo is going around in groups she isn't in, so people can laugh at her: that's sharing her image without consent.",
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
    why:"Making her believe her friends only put up with her out of pity pushes her away from the very people who could help: manipulation that leads to isolation.",
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
    preview:"4 likes on your photo with 612 followers is pathetic",
    why:"Counting her likes to prove that \"even your followers ignore you\" makes her feel she no longer belongs, even online: that's exclusion.",
    messages:[
      { from:"them", text:"did you see the number of likes on your latest photo?", time:"14:22" },
      { from:"them", text:"4 likes in 2 hours with 612 followers is pathetic", time:"14:22" },
      { from:"them", text:"even your own followers ignore you lol", time:"14:23" },
      { from:"them", text:"take that as a message", time:"14:23" },
    ]
  },
  {
    id:15, avatar:"🎭", name:"truth_teller_99", sub:"Unknown account",
    unread:false, time:"3 weeks ago", section:null,
    preview:"i don't understand how you still have friends",
    why:"\"It's not mean, it's just the truth\": presenting an insult as a fact, until she believes it, is manipulation. \"How do you still have friends\" also tries to isolate her.",
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
    why:"Filming her without her knowing and promising the video \"will go everywhere\" is sharing her image without consent - and threatening her.",
    messages:[
      { from:"them", text:"you were filmed in the cafeteria yesterday did you know?", time:"18:05" },
      { from:"them", text:"you looked completely lost as usual", time:"18:05" },
      { from:"them", text:"don't worry it's going to go everywhere", time:"18:06" },
    ]
  },
  {
    id:30, avatar:"💛", name:"sarah.girard", sub:"Friend · Lyon",
    unread:true, time:"3 weeks ago", section:null,
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
      { from:"me",   text:"but a weekend won't be enough", time:"10:04" },
      { from:"me",   text:"sarah I think I'm going to go to my aunt's", time:"10:05" },
      { from:"me",   text:"that's the only place I'll feel okay", time:"10:05" },
    ]
  },
  {
    id:28, avatar:"😤", name:"vrai_garcon_2024", sub:"Unknown account",
    unread:false, time:"3 weeks ago", section:null,
    preview:"girls like you don't know how to behave",
    why:"\"You're a girl, stay in your place\": she's attacked because she's a girl, to shut her up. That's sexist harassment.",
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
    why:"The canteen, math class, the teachers: what happens at school is picked up online that same evening. The bullying no longer stops when classes end.",
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
    why:"Showing her that everyone liked the mocking comment and not her photo makes her feel the group rejects her: that's exclusion.",
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
    why:"\"Nobody stood up for you\": making her believe everyone is against her cuts her off from others. That's manipulation, used to isolate her.",
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
    why:"A nickname made up and posted in stories for \"the whole school\": her reputation is trashed in front of everyone. That's a rumor, carrying school bullying further.",
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
    why:"Her ex supposedly \"told everything\" about her private life: true or not, that's a rumor. And \"you'll do better next time\" judges a girl on her love life: that's sexist.",
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
    why:"\"If you talk, I send the photos\": that's blackmail. Using embarrassing or intimate images to silence someone is sextortion - a crime, to be reported right away.",
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
    why:"\"Everyone hates you\": nothing proves it, but hear it enough and you start believing it. That's manipulation, and it isolates her.",
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
    why:"Pushing her to delete her account means wanting her to disappear without looking responsible: forced exclusion.",
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
    why:"\"The easiest person to hate\": making her believe everyone rejects her is exclusion - and manipulation.",
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
    why:"\"You don't belong here, in this school, in this class, on this network\": she's told she belongs nowhere. That's exclusion, starting at school.",
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
    why:"A nickname that \"everyone uses except you\": the whole class mocks her behind her back. That's a rumor. \"Ask around if you dare\" pushes her to distrust everyone: manipulation.",
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

// ─── TYPES OF BULLYING ────────────────────────────────────────────────────

const HARCEL_TYPES = {
  body_shaming:     { label:'Body shaming',                         desc:'Mockery targeting the body, weight, or appearance.',                    color:'#e07040', icon:'🪞' },
  menaces:          { label:'Threats and intimidation',              desc:'Threatening messages meant to scare or silence the victim.',             color:'#cc3333', icon:'⚠️' },
  rumeurs:          { label:'Rumors and defamation',                 desc:'Spreading false or intimate stories, or a nickname, to damage someone\'s reputation.',           color:'#cc6600', icon:'🗣️' },
  exclusion:        { label:'Exclusion and forced isolation',         desc:'Pushing the victim to feel excluded from every social space.',           color:'#8844cc', icon:'🚪' },
  diffusion_images: { label:'Sharing images without consent',         desc:'Sharing or threatening to share images without permission.',             color:'#0088cc', icon:'📸' },
  manipulation:     { label:'Psychological manipulation',             desc:'Insinuations and mind games that create anxiety and confusion.',          color:'#669900', icon:'🕸️' },
  sextorsion:       { label:'Blackmail / Sextortion',                 desc:'Using intimate images or secrets to pressure someone.',                  color:'#aa0044', icon:'🔐' },
  sexiste:          { label:'Sexist harassment',                      desc:'Attacks based on gender meant to humiliate and belittle.',               color:'#cc44aa', icon:'😤' },
  scolaire:         { label:'Long-term school bullying',              desc:'What happens at school (canteen, corridors, classes) carries on online, and the other way round.',                    color:'#447799', icon:'🏫' },
};

// Which message belongs to which type(s): see 2_Compte_de_Clara_types.js,
// shared by the French and English versions.

// ─── PROFILE PHOTOS ────────────────────────────────────────────────────────

var photoData = [
  { likes: 3,  caption: "sunrise this morning 🌅", time: "1 week ago",
    comments: [
      { user: "utilisateur_4729", text: "what photo quality lol" },
      { user: "anonymous_x0",     text: "your photo is blurry you have no talent at all" },
      { user: "_noreply_ghost_",  text: "your photo is seriously so ugly" },
    ]
  },
  { likes: 34, caption: "loved playing tonight 🎸🎵", time: "2 weeks ago",
    comments: [
      { user: "sarah.girard",     text: "SINCE WHEN do you play that well" },
      { user: "ines_l",           text: "same song for 3 weeks straight lol but I love it" },
      { user: "sarah.girard",     text: "please play at the end of year show" },
    ]
  },
  { likes: 1,  caption: "my kitten 🐱❤️", time: "3 weeks ago",
    comments: [
      { user: "anon_colleg_real", text: "even your cat looks as useless as you" },
      { user: "jevoustrouve",     text: "your photo is so ugly" },
    ]
  },
  { likes: 4,  caption: "Sunday ice cream 🍦", time: "1 month ago",
    why: "A photo of ice cream, and they talk about her weight: that's body shaming. These comments are public: all her followers read them.",
    comments: [
      { user: "sansnom_2024",     text: "and you wonder why you have a problem with your weight" },
      { user: "xx_nobody_xx",     text: "honestly you have no shame posting that" },
      { user: "xX_shadow_Xx",     text: "eat more don't worry" },
    ]
  },
  { likes: 21, caption: "evening reading 📚", time: "2 months ago",
    comments: [
      { user: "ines_l",           text: "which book are you on now ??" },
      { user: "sarah.girard",     text: "lend it to me when you're done" },
    ]
  },
  { likes: 7,  caption: "concert tonight 🎤🔥", time: "3 months ago",
    why: "\"You don't belong there\", \"the people around you must have been thrilled\": she's made to feel she's in the way everywhere, even at a concert. That's exclusion.",
    comments: [
      { user: "explosif_2024",    text: "what? you like this artist? you're useless poor girl" },
      { user: "user_fake8847",    text: "you shouldn't have gone, it's obvious you don't belong there" },
      { user: "0000_mask_0000",   text: "the people around you in the crowd must have been thrilled lol" },
    ]
  },
  { likes: 2,  caption: "flowers from the market 🌸", time: "4 months ago",
    why: "\"Even the flowers want to leave\", \"nobody will ever give you any\": she's told again and again she'll always be alone. That's exclusion.",
    comments: [
      { user: "dark_mode_user",   text: "even the flowers look like they want to leave" },
      { user: "fantome_reseau",   text: "flowers? nobody's ever gonna give you any lol" },
    ]
  },
  { likes: 4,  caption: "birthday cake 🎂", time: "6 months ago",
    why: "Mocking a birthday with \"nobody there\" makes her feel alone: that's exclusion. \"Did you eat it all by yourself?\" also targets her body: that's body shaming.",
    comments: [
      { user: "anon_colleg_real", text: "nobody was there for your birthday is that it?" },
      { user: "sansnom_2024",     text: "did you eat the whole cake by yourself?" },
      { user: "xx_nobody_xx",     text: "sad party" },
    ]
  },
  { likes: 0,  caption: "starry night 🌙", time: "8 months ago",
    why: "\"0 likes, that's a message\", \"even the sky doesn't want you\": she's told over and over that nobody wants her. That's exclusion.",
    comments: [
      { user: "truth_teller_99",  text: "0 likes in 3 hours that's a message clara" },
      { user: "void_user_xx",     text: "even the sky doesn't want you" },
      { user: "froid_comme_toi",  text: "you should have gone to sleep instead of posting this" },
    ]
  },
];

// ─── UI STRINGS ───────────────────────────────────────────────────────────────

var UI = {
  unread:          "unread",
  all:             "All",
  typesIdentified: "types found",
  typesBtn:        "📋 Types",
  today:           "Today",
  firstToLike:     "Be the first to like",
  likes:           " likes",
  searchPh:        "Search a username or a message",
  searchNone:      "No results.",
  searchComments:  "Comments under her photos",
  searchUnder:     "under \"{cap}\"",
  synthBtn:        "📋 View summary - What happened to Clara",
  synthNote:       "These forms of bullying are real. Each one leaves marks on the victim - even without physical contact.",
  listTitle:       "📋 The types of harassment to find",
  listIntro:       "Find at least 6 out of 9. Tap a message or a comment, then choose its type.",
  synthTitle:      "📋 What happened to Clara - Summary",
  backToWA:        "← Back to the group",
  backToWAUrl:     "3_Groupe_Secret_en.html",
  idLabel:         "What type of harassment?",
  idSeveral:       "A message can belong to several types: one is enough.",
  correct:         "That's it.",
  alsoTypes:       "This message also counts as:",
  wrong1:          "Not quite. Read the message again and try another type.",
  wrong2:          "Here is the answer.",
  wrongNote:       "This type doesn't count this time: find it in another message.",
  idClose:         "Close",
  idContinue:      "Continue →",
  synthFound:      "found",
  synthMissed:     "missed",
  synthTodo:       "to find",
  demasqueSub:     "Unmasked in the group: ",
  reportBtn:       "⚠ Report this account",
  reportDone:      "✓ Account reported",
  reportAfter:     "Account reported. Clara could have done it from the very first message - nobody had told her.",
  noteCode:        "🔐 The code for what comes next",
  codeClose:       "← Back to Kevin's message",
  // Investigations started from the group (Part 3)
  enquetes: {
    marine: {
      photo: 2, handle: "anon_colleg_real", qui: "Marine",
      bar: "🔎 <b>Investigation</b> - In the group, Marine says she wrote under the photo of Clara's cat that \"even her cat looks as useless as her\". Open that photo and tap the <b>username</b> of whoever wrote the comment.",
      lbHint: "🔎 Investigation: tap the username of whoever wrote Marine's comment.",
      wrongPhoto: "Wrong photo: Marine is talking about Clara's cat.",
      wrongUser: "Not that username. Read Marine's words again: \"even her cat looks as useless as her\".",
      okTitle: "Account unmasked",
      okNote: "Clara can't know this. You can: you matched what is said in the group with her comments."
    }
  },
  notTagged:       "Mean, yes. But this message alone isn't enough to tell what type of harassment it is: look for a more specific one."
};
