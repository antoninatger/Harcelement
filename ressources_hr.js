/* =========================================================================
   ressources_hr.js - brojevi za pomoć (version croate), en un seul endroit
   -------------------------------------------------------------------------
   Même rôle que ressources.js : écran de fin de la Partie 4 et
   récapitulatif imprimable. Une zone par pays : la Croatie d'abord, puis la
   France et le Royaume-Uni. Contacts croates fournis par la traduction
   (Centar za sigurniji internet, Hrabri telefon, MUP Red Button).
   ========================================================================= */
window.RESSOURCES = {
  titre: "Ako poželiš razgovarati s nekim, evo brojeva na kojima možeš dobiti pomoć",
  pays: [
    { nom: "U Hrvatskoj", liste: [
      { label: "116 111",      txt: "Hrabri telefon – besplatno za djecu, radnim danom 9–20 h. Chat i e-mail (savjet@hrabritelefon.hr) na hrabritelefon.hr" },
      { label: "0800 606 606", txt: "Centar za sigurniji internet – elektroničko nasilje, besplatno, radnim danom 8–16 h. Moguća je i anonimna online prijava" },
      { label: "192",          txt: "Policija. Aplikacija MUP-a Red Button omogućuje i anonimnu prijavu nasilja nad djecom" }
    ]},
    { nom: "U Francuskoj", liste: [
      { label: "3018",          txt: "Vršnjačko i elektroničko nasilje – besplatno, anonimno, svaki dan (na francuskom)" },
      { label: "3114",          txt: "Psihološka pomoć i prevencija samoubojstva – 0–24 h (na francuskom)" },
      { label: "e-enfance.org", txt: "Chat broja 3018 i online prijava – dostupno i iz inozemstva" }
    ]},
    { nom: "U Ujedinjenom Kraljevstvu", liste: [
      { label: "0800 1111",    txt: "Childline – besplatno, 0–24 h, chat na childline.org.uk (na engleskom)" },
      { label: "116 123",      txt: "Samaritans – emocionalna podrška i prevencija samoubojstva, besplatno, 0–24 h" },
      { label: "85258",        txt: "Shout – pošalji SMS s riječju SHOUT, besplatno, 0–24 h" }
    ]}
  ],
  commun: [
    { label: "112",         txt: "Hitni slučajevi – u cijeloj Europi, uključujući Ujedinjeno Kraljevstvo" },
    { label: "Tvoja škola", txt: "Razrednik, školski pedagog ili psiholog, nastavnik kojem vjeruješ" }
  ]
};
