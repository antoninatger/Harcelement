/* =========================================================================
   ressources.js - les numéros d'aide, en un seul endroit
   -------------------------------------------------------------------------
   Ce fichier est le seul à modifier pour adapter le jeu à un autre pays ou
   à un autre partenaire. Il alimente l'écran de fin de la Partie 4 et le
   récapitulatif imprimable : rien d'autre n'est à toucher.

   Une zone par pays, dans chaque langue : un élève français en Croatie
   trouve aussi les numéros croates, un élève croate ceux de France, etc.
   La langue du joueur passe en premier, puis la Croatie.
   Versions anglaise et croate : ressources_en.js et ressources_hr.js.

   Le 3018 est le numéro national unique contre le harcèlement, à l'école
   comme en ligne. L'ancien 3020 n'est plus en service.
   ========================================================================= */
window.RESSOURCES = {
  titre: "Si jamais tu veux parler, voici les numéros qui peuvent t'aider",
  pays: [
    { nom: "En France", liste: [
      { label: "3018",          txt: "Harcèlement et cyberharcèlement - gratuit, anonyme, 7 j/7" },
      { label: "3114",          txt: "Souffrance psychique et prévention du suicide - 24 h/24" },
      { label: "e-enfance.org", txt: "Tchat du 3018, conseils et signalement en ligne - accessible aussi depuis l'étranger" }
    ]},
    { nom: "En Croatie", liste: [
      { label: "116 111",      txt: "Hrabri telefon - gratuit pour les enfants, en semaine 9 h-20 h. Tchat sur hrabritelefon.hr" },
      { label: "0800 606 606", txt: "Centar za sigurniji internet - cyberharcèlement, gratuit, en semaine 8 h-16 h" },
      { label: "192",          txt: "Police. L'application Red Button permet aussi un signalement anonyme" }
    ]},
    { nom: "Au Royaume-Uni", liste: [
      { label: "0800 1111",    txt: "Childline - gratuit, 24 h/24, tchat sur childline.org.uk" },
      { label: "116 123",      txt: "Samaritans - écoute et prévention du suicide, gratuit, 24 h/24" },
      { label: "85258",        txt: "Shout - envoie SHOUT par SMS, gratuit, 24 h/24" }
    ]}
  ],
  commun: [
    { label: "112",         txt: "Urgence - partout en Europe, Royaume-Uni compris" },
    { label: "Ton école",   txt: "Le CPE, l'infirmière, un prof en qui tu as confiance" }
  ]
};
