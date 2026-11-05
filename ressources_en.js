/* =========================================================================
   ressources_en.js - helplines, in one single place
   -------------------------------------------------------------------------
   This is the only file to edit when adapting the game to another country
   or another partner. It feeds the Part 4 ending screen and the printable
   summary; nothing else needs touching.

   One section per country, in every language: a British pupil in Croatia
   also finds the Croatian numbers, and so on. The player's own country
   comes first, then Croatia.
   ========================================================================= */
window.RESSOURCES = {
  titre: "If you ever need to talk, these numbers can help",
  pays: [
    { nom: "In the United Kingdom", liste: [
      { label: "0800 1111",    txt: "Childline - free, 24/7, online chat at childline.org.uk" },
      { label: "116 123",      txt: "Samaritans - someone to talk to, suicide prevention, free, 24/7" },
      { label: "85258",        txt: "Shout - text SHOUT, free, 24/7" }
    ]},
    { nom: "In Croatia", liste: [
      { label: "116 111",      txt: "Hrabri telefon - free for children, weekdays 9 am-8 pm. Chat at hrabritelefon.hr" },
      { label: "0800 606 606", txt: "Centar za sigurniji internet - online bullying, free, weekdays 8 am-4 pm" },
      { label: "192",          txt: "Police. The Red Button app also lets you report anonymously" }
    ]},
    { nom: "In France", liste: [
      { label: "3018",          txt: "Bullying and online bullying - free, anonymous, 7 days a week (in French)" },
      { label: "3114",          txt: "Mental health and suicide prevention - 24/7 (in French)" },
      { label: "e-enfance.org", txt: "3018 online chat and reporting - also from abroad" }
    ]}
  ],
  commun: [
    { label: "112",         txt: "Emergency - anywhere in Europe, UK included" },
    { label: "Your school", txt: "A counsellor, a nurse, a teacher you trust" }
  ]
};
