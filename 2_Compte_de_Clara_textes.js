// ─── DONNÉES ─────────────────────────────────────────────────────────────────

const CONVOS = [
  // ── AUJOURD'HUI ──
  {
    id:1, avatar:"👤", name:"utilisateur_4729", sub:"Compte inconnu",
    unread:true, time:"il y a 4 min", section:"Aujourd'hui",
    preview:"t'as vu ta tete sur ta derniere photo serieusement",
    why:"Il s'attaque à son visage, à ses cheveux : c'est du body shaming. Et « t'as bien fait de plus venir en cours » la pousse à quitter le collège : c'est de l'exclusion, qui prolonge le harcèlement scolaire.",
    messages:[
      { from:"them", text:"t'as vu ta tete sur ta derniere photo serieusement", time:"10:42" },
      { from:"them", text:"ta coupe de cheveux c'est une catastrophe", time:"10:42" },
      { from:"them", text:"franchement t'as bien fait de plus venir en cours", time:"10:43" },
    ]
  },
  {
    id:2, avatar:"🙈", name:"anonymous_x0", sub:"Compte inconnu",
    unread:true, time:"il y a 12 min", section:null,
    preview:"tout le monde sait ce que t'as fait avec Nathan",
    why:"Une histoire sur sa vie intime, sans preuve, que « tout le monde » connaîtrait : c'est une rumeur. Elle vise Clara parce que c'est une fille - personne ne le reprocherait à Nathan : c'est aussi sexiste. La dernière phrase est une menace.",
    messages:[
      { from:"them", text:"tout le monde sait ce que t'as fait avec Nathan aux toilettes", time:"10:31" },
      { from:"them", text:"t'as pas honte ?", time:"10:31" },
      { from:"them", text:"ca se fait pas de se comporter comme ca", time:"10:32" },
      { from:"them", text:"tu vas le regretter", time:"10:33" },
    ]
  },
  {
    id:3, avatar:"💀", name:"_noreply_ghost_", sub:"Compte inconnu",
    unread:true, time:"il y a 28 min", section:null,
    preview:"ta photo de profil elle est pathetique",
    why:"Se moquer de son visage et de son physique, c'est du body shaming. « Même les 6e se foutent de toi » ramène l'humiliation dans les couloirs du collège, et l'exclut.",
    messages:[
      { from:"them", text:"ta photo de profil elle est vraiment pathetique", time:"10:15" },
      { from:"them", text:"tu te crois belle ou quoi", time:"10:15" },
      { from:"them", text:"meme les 6emes se foutent de toi quand tu passes dans le couloir", time:"10:16" },
    ]
  },
  {
    id:4, avatar:"🐍", name:"vrai_info_colleg", sub:"Compte inconnu",
    unread:true, time:"il y a 45 min", section:null,
    preview:"il parait que t'as vole dans le casier de lena",
    why:"Une accusation inventée (« il paraît que… ») et répandue à toute la classe pour salir sa réputation : c'est une rumeur. « C'est tout le monde qui le dit » sert à la rendre crédible.",
    messages:[
      { from:"them", text:"il parait que t'as vole dans le casier de lena", time:"09:58" },
      { from:"them", text:"c'est pour ca qu'elle te parle plus", time:"09:59" },
      { from:"them", text:"j'ai prevenu toute la classe, gardez vos affaires 😂", time:"09:59" },
      { from:"them", text:"c'est pas moi qui le dis c'est tout le monde", time:"10:00" },
    ]
  },
  {
    id:5, avatar:"😈", name:"user_fake8847", sub:"Compte inconnu",
    unread:true, time:"il y a 1h", section:null,
    preview:"j'ai screenshotte ta derniere story tu faisais pitie",
    why:"Capturer sa story et la faire tourner sans son accord, c'est diffuser son image sans consentement. Dire que ses larmes sont « de crocodile », c'est nier sa souffrance pour qu'elle doute d'elle-même : de la manipulation.",
    messages:[
      { from:"them", text:"j'ai screenshotte ta derniere story avant que tu la supprimes", time:"09:22" },
      { from:"them", text:"tu faisais vraiment pitie avec tes larmes de crocodile", time:"09:22" },
      { from:"them", text:"ca tourne dans toute la classe depuis ce matin", time:"09:23" },
    ]
  },
  // ── HIER ──
  {
    id:6, avatar:"👤", name:"xxxxxxxxx_011", sub:"Compte inconnu",
    unread:false, time:"hier 22h14", section:"Hier",
    preview:"t'as un vrai probleme avec ton poids tu sais ca",
    why:"Son poids, son reflet dans le miroir : attaquer le corps de quelqu'un pour l'humilier, c'est du body shaming. Répété, ça peut abîmer longtemps l'image qu'on a de soi.",
    messages:[
      { from:"them", text:"t'as un vrai probleme avec ton poids tu sais ca ?", time:"22:14" },
      { from:"them", text:"chaque fois qu'on te voyait en cours c'etait de pire en pire", time:"22:15" },
      { from:"them", text:"t'as pas de miroir chez toi ?", time:"22:15" },
    ]
  },
  {
    id:7, avatar:"🕷️", name:"anon_colleg_real", sub:"Compte inconnu",
    unread:false, time:"hier 20h37", section:null,
    preview:"on a fait un sondage sur toi dans la classe",
    why:"Un sondage sur « la personne la plus nulle du collège », c'est monter toute une classe contre une seule personne : de l'exclusion, née au collège. Le « 94 % » est sûrement inventé : il est là pour qu'elle se croie seule contre tous.",
    messages:[
      { from:"them", text:"on a fait un sondage sur toi dans la classe", time:"20:37" },
      { from:"them", text:"la question c'etait : Clara est-elle la personne la plus nulle du college", time:"20:38" },
      { from:"them", text:"94% ont vote oui", time:"20:38" },
      { from:"them", text:"tu vas arreter de te la peter maintenant ?", time:"20:39" },
    ]
  },
  {
    id:9, avatar:"💬", name:"sansnom_2024", sub:"Compte inconnu",
    unread:false, time:"hier 16h44", section:null,
    preview:"t'es tellement sensible ca devient pesant pour tout le monde",
    why:"Lui dire qu'elle est « trop sensible », que ses larmes sont « pathologiques », c'est retourner la faute contre elle : elle finit par croire que le problème, c'est elle. C'est de la manipulation. « Les autres te supportent plus » ajoute l'isolement.",
    messages:[
      { from:"them", text:"t'es tellement sensible ca devient pesant pour tout le monde", time:"16:44" },
      { from:"them", text:"tu pleures pour un rien c'est pathologique", time:"16:44" },
      { from:"them", text:"les autres te supportent plus mais personne veut te le dire en face", time:"16:45" },
      { from:"them", text:"maintenant tu sais", time:"16:45" },
    ]
  },
  {
    id:8, avatar:"👁️", name:"jevoustrouve", sub:"Compte inconnu",
    unread:false, time:"hier 02h47", section:null,
    preview:"tu dors ?",
    why:"Écrire à 2 h 47 du matin « demain on sera encore là », c'est lui faire comprendre qu'elle n'est en sécurité nulle part, même la nuit, même chez elle : ce sont des menaces.",
    messages:[
      { from:"them", text:"tu dors ?", time:"02:47" },
      { from:"them", text:"nous on dort tres bien", time:"02:47" },
      { from:"them", text:"tu peux eteindre ton tel ca changera rien", time:"02:48" },
      { from:"them", text:"demain on sera encore la", time:"02:48" },
    ]
  },
  // ── CETTE SEMAINE ──
  {
    id:10, avatar:"🔇", name:"xx_nobody_xx", sub:"Compte inconnu",
    unread:false, time:"lundi 21h10", section:"Cette semaine",
    preview:"ta facon de t'habiller c'est vraiment une honte",
    why:"Ses vêtements, son apparence : c'est du body shaming. « Même les profs ont remarqué » est sûrement faux, mais lui fait croire que tout le monde la juge. Et « reste chez toi » la pousse à disparaître : de l'exclusion.",
    messages:[
      { from:"them", text:"ta facon de t'habiller c'est vraiment une honte", time:"21:10" },
      { from:"them", text:"on dirait que tu t'habilles dans les poubelles", time:"21:10" },
      { from:"them", text:"meme les profs ont remarque", time:"21:11" },
      { from:"them", text:"tu devrais rester chez toi franchement", time:"21:11" },
    ]
  },
  {
    id:11, avatar:"🤡", name:"super_secret_info", sub:"Compte inconnu",
    unread:false, time:"lundi 19h55", section:null,
    preview:"on parle de toi sur le groupe depuis hier soir",
    why:"« On parle de toi, mais je te dirai pas quoi » : installer une angoisse sans rien de vérifiable, c'est de la manipulation. Évoquer ce que « les mecs de ta classe disent sur toi », c'est aussi laisser courir une rumeur.",
    messages:[
      { from:"them", text:"tu sais qu'on parle de toi sur le groupe depuis hier soir ?", time:"19:55" },
      { from:"them", text:"ce que les mecs de ta classe disent sur toi c'est pas joli", time:"19:56" },
      { from:"them", text:"je te dirai pas ce que c'est, ca te ferait trop de mal", time:"19:56" },
      { from:"them", text:"ou peut-etre que tu merites de savoir en fait", time:"19:57" },
    ]
  },
  {
    id:12, avatar:"👤", name:"0000_mask_0000", sub:"Compte inconnu",
    unread:false, time:"dimanche 23h41", section:null,
    preview:"ta photo a ete partagee dans plusieurs groupes 💀",
    why:"Sa photo circule dans des groupes où elle n'est pas, pour qu'on se moque d'elle : c'est la diffusion d'une image sans son consentement.",
    messages:[
      { from:"them", text:"ta photo a ete partagee dans plusieurs groupes 💀", time:"23:41" },
      { from:"them", text:"t'as un effet comique sans le vouloir c'est assez fort", time:"23:41" },
      { from:"them", text:"tout le monde se marre grace a toi", time:"23:42" },
    ]
  },
  {
    id:13, avatar:"🌑", name:"dark_mode_user", sub:"Compte inconnu",
    unread:false, time:"dimanche 20h18", section:null,
    preview:"tes amis te parlent encore par pitie tu le sais non",
    why:"Lui faire croire que ses amis la supportent par pitié, c'est l'éloigner des seules personnes qui pourraient l'aider : de la manipulation, qui mène à l'isolement.",
    messages:[
      { from:"them", text:"tes amis te parlent encore par pitie tu le sais non ?", time:"20:18" },
      { from:"them", text:"j'ai demande a quelqu'un de ton groupe il m'a dit qu'il te supportait plus", time:"20:19" },
      { from:"them", text:"t'as pas beaucoup d'avenir dans cette classe", time:"20:19" },
    ]
  },
  // ── LE MOIS DERNIER ──
  {
    id:14, avatar:"👻", name:"fantome_reseau", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:"Le mois dernier",
    preview:"4 likes sur ta photo avec 612 abonnes c'est nul",
    why:"Compter ses likes pour lui prouver que « même ses abonnés l'ignorent », c'est lui faire sentir qu'elle n'a plus sa place, même en ligne : de l'exclusion.",
    messages:[
      { from:"them", text:"t'as vu ton nombre de likes sur ta derniere photo ?", time:"14:22" },
      { from:"them", text:"4 likes en 2 heures avec 612 abonnes c'est nul", time:"14:22" },
      { from:"them", text:"meme tes propres abonnes t'ignorent mdrrr", time:"14:23" },
      { from:"them", text:"prends ca comme un message", time:"14:23" },
    ]
  },
  {
    id:15, avatar:"🎭", name:"truth_teller_99", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:null,
    preview:"je comprends pas comment t'as encore des amis",
    why:"« C'est pas méchant, c'est juste la vérité » : présenter une insulte comme un fait, pour qu'elle finisse par y croire, c'est de la manipulation. « Comment t'as encore des amis » cherche aussi à l'isoler.",
    messages:[
      { from:"them", text:"je comprends vraiment pas comment t'as encore des amis", time:"09:50" },
      { from:"them", text:"t'as rien d'interessant serieusement", time:"09:51" },
      { from:"them", text:"c'est pas mechant c'est juste la verite", time:"09:51" },
      { from:"them", text:"tu devrais y reflechir", time:"09:52" },
    ]
  },
  {
    id:16, avatar:"🕶️", name:"incognito_user21", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:null,
    preview:"on t'a filmee a la cantine hier t'etais au courant",
    why:"La filmer sans qu'elle le sache et promettre que la vidéo « va tourner partout », c'est diffuser son image sans consentement - et la menacer.",
    messages:[
      { from:"them", text:"on t'a filmee a la cantine hier t'etais au courant ?", time:"18:05" },
      { from:"them", text:"t'avais l'air completement perdue comme d'hab", time:"18:05" },
      { from:"them", text:"ca va tourner partout ne t'inquiete pas", time:"18:06" },
    ]
  },
  {
    id:30, avatar:"💛", name:"sarah.girard", sub:"Amie · Lyon",
    unread:true, time:"il y a 3 sem.", section:null,
    preview:"clara reponds s'il te plait je m'inquiete",
    messages:[
      { from:"them", text:"Clara t'as pas repondu hier soir ca va ?", time:"09:12" },
      { from:"them", text:"j'ai vu que t'avais poste une story a minuit j'etais inquiete", time:"09:13" },
      { from:"me",   text:"sarah je peux plus", time:"09:41" },
      { from:"me",   text:"je sais pas comment t'expliquer c'est tous les jours maintenant", time:"09:42" },
      { from:"me",   text:"les messages les commentaires les regards en cours", time:"09:42" },
      { from:"me",   text:"j'ai plus envie de venir au college", time:"09:43" },
      { from:"them", text:"oh non clara... je savais pas que c'etait aussi grave", time:"09:51" },
      { from:"them", text:"pourquoi tu m'as pas dit avant", time:"09:51" },
      { from:"me",   text:"j'osais pas j'avais honte", time:"09:53" },
      { from:"me",   text:"sarah est-ce que je peux venir chez toi le weekend prochain", time:"09:54" },
      { from:"me",   text:"j'ai besoin de partir d'ici meme juste 2 jours", time:"09:54" },
      { from:"them", text:"EVIDEMMENT tu viens quand tu veux tu le sais non", time:"09:55" },
      { from:"them", text:"je vais en parler a ma mere ce soir et on t'organise ca", time:"09:56" },
      { from:"them", text:"et clara s'il te plait parles-en a tes parents ou a un adulte au college", time:"09:57" },
      { from:"them", text:"t'as pas a subir ca toute seule", time:"09:57" },
      { from:"me",   text:"merci sarah vraiment", time:"10:02" },
      { from:"me",   text:"t'es la seule avec Ines qui me comprend", time:"10:02" },
      { from:"me",   text:"mais Ines elle a deja tellement de problemes chez elle que je veux pas la deranger", time:"10:03" },
      { from:"me",   text:"du coup je lui fais croire que tout va bien", time:"10:03" },
      { from:"me",   text:"mais un weekend ca suffira pas", time:"10:04" },
      { from:"me",   text:"sarah je crois que je vais partir chez ma tante", time:"10:05" },
      { from:"me",   text:"y'a que la que je serai bien", time:"10:05" },
    ]
  },
  {
    id:28, avatar:"😤", name:"vrai_garcon_2024", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:null,
    preview:"les filles comme toi ca sait pas se tenir",
    why:"« T'es une fille, reste à ta place » : on l'attaque parce qu'elle est une fille, pour la faire taire. C'est du harcèlement sexiste.",
    messages:[
      { from:"them", text:"les filles comme toi ca sait pas se tenir", time:"19:44" },
      { from:"them", text:"t'as pas ta place a t'exprimer comme ca devant tout le monde", time:"19:45" },
      { from:"them", text:"t'es une fille reste a ta place", time:"19:46" },
      { from:"them", text:"t'es trop dans ta tete pour une fille", time:"19:47" },
    ]
  },
  {
    id:29, avatar:"🏫", name:"colleg_info_2024", sub:"Compte inconnu",
    unread:false, time:"il y a 3 sem.", section:null,
    preview:"tout le monde riait dans ton dos a la cantine",
    why:"La cantine, le cours de maths, les profs : ce qui se passe au collège est repris en ligne le soir même. Le harcèlement ne s'arrête plus à la sortie des cours.",
    messages:[
      { from:"them", text:"t'as vu la tete que t'avais a la cantine aujourd'hui", time:"17:21" },
      { from:"them", text:"tout le monde riait dans ton dos a la cantine", time:"17:22" },
      { from:"them", text:"le prof de maths t'a encore mise en difficulte devant tout le monde non", time:"17:23" },
      { from:"them", text:"meme les profs peuvent pas te supporter c'etait dingue", time:"17:24" },
    ]
  },
  {
    id:17, avatar:"🔴", name:"rouge_anonyme", sub:"Compte inconnu",
    unread:false, time:"il y a 4 sem.", section:null,
    preview:"t'as vu le commentaire que E. a laisse sur ta photo",
    why:"Lui montrer que tout le monde aime le commentaire moqueur et pas sa photo, c'est lui faire sentir que le groupe la rejette : de l'exclusion.",
    messages:[
      { from:"them", text:"t'as vu le commentaire que E. a laisse sur ta photo ?", time:"20:12" },
      { from:"them", text:"tout le monde a like son comm mais pas ta photo c'est marrant non", time:"20:12" },
      { from:"them", text:"ca veut tout dire", time:"20:13" },
    ]
  },
  // ── IL Y A 2 MOIS ──
  {
    id:18, avatar:"🫥", name:"user_invisible_00", sub:"Compte inconnu",
    unread:false, time:"il y a 2 mois", section:"Il y a 2 mois",
    preview:"personne ne t'a defendue quand M. t'a insultee tu l'as remarque",
    why:"« Personne ne t'a défendue » : lui faire croire que tout le monde est contre elle, c'est la couper des autres. C'est de la manipulation, qui sert à l'isoler.",
    messages:[
      { from:"them", text:"personne ne t'a defendue quand M. t'a insultee tu l'as remarque ?", time:"17:34" },
      { from:"them", text:"c'est parce que tout le monde pense pareil", time:"17:34" },
      { from:"them", text:"ils ont juste pas le courage de te le dire en face", time:"17:35" },
    ]
  },
  {
    id:19, avatar:"🧨", name:"explosif_2024", sub:"Compte inconnu",
    unread:false, time:"il y a 2 mois", section:null,
    preview:"t'as vu les stories que les 3emes ont postees sur toi",
    why:"Un surnom inventé et diffusé en story à « tout le collège » : on salit sa réputation devant tout l'établissement. C'est une rumeur, qui prolonge le harcèlement scolaire.",
    messages:[
      { from:"them", text:"t'as vu les stories que les 3emes ont postees sur toi ?", time:"22:01" },
      { from:"them", text:"ils t'ont surnommee et ca a bien marche comme blague", time:"22:01" },
      { from:"them", text:"tout le college est au courant maintenant", time:"22:02" },
      { from:"them", text:"bravo", time:"22:02" },
    ]
  },
  {
    id:20, avatar:"🪲", name:"bug_report_xx", sub:"Compte inconnu",
    unread:false, time:"il y a 2 mois", section:null,
    preview:"ton ex a tout raconte a ses potes tu savais",
    why:"Son ex aurait « tout raconté » de sa vie intime : vrai ou faux, c'est une rumeur. Et « tu feras mieux la prochaine fois » juge une fille sur sa vie amoureuse : c'est sexiste.",
    messages:[
      { from:"them", text:"ton ex a tout raconte a ses potes tu savais ?", time:"16:18" },
      { from:"them", text:"genre vraiment tout", time:"16:18" },
      { from:"them", text:"tu feras mieux la prochaine fois si y'en a une", time:"16:19" },
    ]
  },
  {
    id:27, avatar:"🔐", name:"anon_blackmail_x", sub:"Compte inconnu",
    unread:false, time:"il y a 2 mois", section:null,
    preview:"j'ai des photos de toi que tu voudrais pas que tout le monde voie",
    why:"« Si tu parles, j'envoie les photos » : c'est du chantage. Se servir d'images gênantes ou intimes pour faire taire quelqu'un, c'est de la sextorsion - un délit, à signaler tout de suite.",
    messages:[
      { from:"them", text:"j'ai des photos de toi que tu voudrais pas que tout le monde voie", time:"23:12" },
      { from:"them", text:"des photos de la soiree chez Lena le mois dernier", time:"23:13" },
      { from:"them", text:"si tu parles a quelqu'un de ce qui se passe au college je les envoie a toute ta liste de contacts", time:"23:13" },
      { from:"them", text:"t'as compris le message ?", time:"23:14" },
    ]
  },
  // ── IL Y A 3 MOIS ──
  {
    id:21, avatar:"⚫", name:"xX_shadow_Xx", sub:"Compte inconnu",
    unread:false, time:"il y a 3 mois", section:"Il y a 3 mois",
    preview:"t'arrives encore a dormir la nuit sachant que tout le monde te deteste",
    why:"« Tout le monde te déteste » : rien ne le prouve, mais à force de l'entendre, on finit par y croire. C'est de la manipulation, qui l'isole.",
    messages:[
      { from:"them", text:"t'arrives encore a dormir la nuit sachant que tout le monde te deteste ?", time:"23:47" },
      { from:"them", text:"parce que moi a ta place je pourrais pas", time:"23:47" },
      { from:"them", text:"tu dois etre blindee ou completement aveugle", time:"23:48" },
    ]
  },
  {
    id:22, avatar:"🗑️", name:"delete_clara", sub:"Compte inconnu",
    unread:false, time:"il y a 3 mois", section:null,
    preview:"tu peux supprimer ton compte personne le suivrait",
    why:"La pousser à supprimer son compte, c'est vouloir la faire disparaître sans avoir l'air d'y être pour rien : de l'exclusion forcée.",
    messages:[
      { from:"them", text:"tu peux supprimer ton compte personne ne le remarquerait", time:"11:03" },
      { from:"them", text:"t'as 612 abonnes mais zero vrai ami dessus", time:"11:03" },
      { from:"them", text:"c'est triste non", time:"11:04" },
    ]
  },
  {
    id:23, avatar:"👾", name:"ghost_account_333", sub:"Compte inconnu",
    unread:false, time:"il y a 3 mois", section:null,
    preview:"j'ai cree un compte rien que pour te dire que t'es nulle",
    messages:[
      { from:"them", text:"j'ai cree ce compte rien que pour te dire que t'es nulle", time:"19:22" },
      { from:"them", text:"c'etait necessaire", time:"19:22" },
    ]
  },
  {
    id:24, avatar:"🎯", name:"target_clara_f", sub:"Compte inconnu",
    unread:false, time:"il y a 3 mois", section:null,
    preview:"t'es la personne la plus facile a detester que j'ai jamais vue",
    why:"« La personne la plus facile à détester » : lui faire croire que tout le monde la rejette, c'est de l'exclusion - et de la manipulation.",
    messages:[
      { from:"them", text:"t'es la personne la plus facile a detester que j'ai jamais vue", time:"20:55" },
      { from:"them", text:"sans effort vraiment", time:"20:55" },
      { from:"them", text:"felicitations", time:"20:56" },
    ]
  },
  // ── IL Y A PLUS DE 6 MOIS ──
  {
    id:25, avatar:"🕳️", name:"void_user_xx", sub:"Compte inconnu",
    unread:false, time:"il y a 7 mois", section:"Il y a plus de 6 mois",
    preview:"ca fait un moment qu'on voulait te dire que t'etais pas a ta place ici",
    why:"« Pas à ta place ici, dans ce collège, dans cette classe, sur ce réseau » : on lui dit qu'elle n'a sa place nulle part. C'est de l'exclusion, qui part du collège.",
    messages:[
      { from:"them", text:"ca fait un moment qu'on voulait te dire que t'etais pas a ta place ici", time:"08:14" },
      { from:"them", text:"dans ce college dans cette classe et sur ce reseau", time:"08:14" },
      { from:"them", text:"prends ca comme un conseil", time:"08:15" },
    ]
  },
  {
    id:26, avatar:"🧊", name:"froid_comme_toi", sub:"Compte inconnu",
    unread:false, time:"il y a 8 mois", section:null,
    preview:"on t'a inventé un surnom dans la classe tu veux savoir lequel",
    why:"Un surnom que « tout le monde utilise sauf toi » : on se moque d'elle dans son dos, dans toute la classe. C'est une rumeur. « Demande autour de toi si t'as le courage » la pousse à se méfier de tout le monde : de la manipulation.",
    messages:[
      { from:"them", text:"on t'a invente un surnom dans la classe tu veux savoir lequel ?", time:"13:30" },
      { from:"them", text:"tout le monde l'utilise deja sauf toi", time:"13:30" },
      { from:"them", text:"demande autour de toi si t'as le courage", time:"13:31" },
    ]
  },
  {
    id:99, avatar:"👤", name:"kevin.4b", sub:"Kevin",
    unread:true, time:"il y a 3 jours", section:null,
    secret:true,
    preview:"Je suis désolé, je ne pensais pas que ça irait aussi loin...",
    messages:[
      { from:"them", text:"Je suis désolé, je ne pensais pas que ça irait aussi loin", time:"23:41" },
      { from:"them", text:"mais si tu veux voir ce qu'ils racontent sur toi, c'est ici", time:"23:42" },
      { from:"them", text:"le groupe Whatsupp « les vrais 4B 🔥 », code 4827", time:"23:42" },
    ]
  },
];

// ─── TYPES DE HARCÈLEMENT ────────────────────────────────────────────────────

const HARCEL_TYPES = {
  body_shaming:     { label:'Body shaming',                          desc:'Moqueries ciblant le corps, le poids ou l\'apparence.',               color:'#e07040', icon:'🪞' },
  menaces:          { label:'Menaces et intimidation',                desc:'Messages menaçants pour faire peur ou réduire la victime au silence.', color:'#cc3333', icon:'⚠️' },
  rumeurs:          { label:'Rumeurs et diffamation',                 desc:'Répandre des histoires fausses ou intimes, ou un surnom, pour salir sa réputation.', color:'#cc6600', icon:'🗣️' },
  exclusion:        { label:'Exclusion et isolement forcé',           desc:'Pousser la victime à se sentir exclue de tout espace social.',         color:'#8844cc', icon:'🚪' },
  diffusion_images: { label:'Diffusion d\'images sans consentement',  desc:'Partager ou menacer de partager des images sans accord.',             color:'#0088cc', icon:'📸' },
  manipulation:     { label:'Manipulation psychologique',             desc:'Insinuations et jeux mentaux pour créer angoisse et confusion.',       color:'#669900', icon:'🕸️' },
  sextorsion:       { label:'Chantage / Sextorsion',                  desc:'Utiliser des images ou secrets intimes pour faire pression.',          color:'#aa0044', icon:'🔐' },
  sexiste:          { label:'Harcèlement sexiste',                    desc:'Attaques fondées sur le genre pour humilier et diminuer.',             color:'#cc44aa', icon:'😤' },
  scolaire:         { label:'Harcèlement scolaire prolongé',          desc:'Ce qui se passe au collège (cantine, couloirs, cours) continue sur les réseaux, et inversement.', color:'#447799', icon:'🏫' },
};

// Quel message relève de quel(s) type(s) : voir 2_Compte_de_Clara_types.js,
// commun aux versions française et anglaise.

// ─── PHOTOS DU PROFIL ────────────────────────────────────────────────────────

var photoData = [
  { likes: 3,  caption: "lever de soleil ce matin 🌅", time: "il y a 1 semaine",
    comments: [
      { user: "utilisateur_4729", text: "quelle qualite de photo lol" },
      { user: "anonymous_x0",     text: "ta photo elle est floue t'as meme pas de talent" },
      { user: "_noreply_ghost_",  text: "elle est trop moche ta photo serieusement" },
    ]
  },
  { likes: 34, caption: "j'ai adoré jouer ce soir 🎸🎵", time: "il y a 2 semaines",
    comments: [
      { user: "sarah.girard",     text: "MAIS depuis quand tu joues aussi bien" },
      { user: "ines_l",           text: "la meme chanson depuis 3 semaines mdr mais j'adore" },
      { user: "sarah.girard",     text: "tu joues au spectacle de fin d'annee stp" },
    ]
  },
  { likes: 1,  caption: "mon chaton 🐱❤️", time: "il y a 3 semaines",
    comments: [
      { user: "anon_colleg_real", text: "meme ton chat a l'air aussi nul que toi" },
      { user: "jevoustrouve",     text: "elle est trop moche ta photo" },
    ]
  },
  { likes: 4,  caption: "glace du dimanche 🍦", time: "il y a 1 mois",
    why: "Une photo de glace, et on lui parle de son poids : c'est du body shaming. Ces commentaires sont publics : tous ses abonnés les lisent.",
    comments: [
      { user: "sansnom_2024",     text: "et tu te demandes pourquoi t'as un probleme de poids" },
      { user: "xx_nobody_xx",     text: "franchement t'as aucune honte de poster ca" },
      { user: "xX_shadow_Xx",     text: "mange encore t'inquiete" },
    ]
  },
  { likes: 21, caption: "lecture du soir 📚", time: "il y a 2 mois",
    comments: [
      { user: "ines_l",           text: "t'es a quel tome la ??" },
      { user: "sarah.girard",     text: "tu me le pretes quand t'as fini" },
    ]
  },
  { likes: 7,  caption: "concert ce soir 🎤🔥", time: "il y a 3 mois",
    why: "« T'es pas à ta place », « les gens autour de toi devaient être contents » : on lui fait comprendre qu'elle est de trop partout, même à un concert. C'est de l'exclusion.",
    comments: [
      { user: "explosif_2024",    text: "quoi ? tu aimes cette artiste ? t'es nulle ma pauvre fille" },
      { user: "user_fake8847",    text: "t'aurais pas du y aller ca se voit que t'es pas a ta place" },
      { user: "0000_mask_0000",   text: "les gens autour de toi dans la foule ils devaient etre contents lol" },
    ]
  },
  { likes: 2,  caption: "fleurs du marché 🌸", time: "il y a 4 mois",
    why: "« Même les fleurs veulent partir », « personne t'en offrira jamais » : on lui répète qu'elle sera toujours seule. C'est de l'exclusion.",
    comments: [
      { user: "dark_mode_user",   text: "meme les fleurs ont l'air de vouloir partir" },
      { user: "fantome_reseau",   text: "des fleurs ? personne t'en offrira jamais 💀" },
    ]
  },
  { likes: 4,  caption: "gâteau d'anniversaire 🎂", time: "il y a 6 mois",
    why: "Se moquer d'un anniversaire « sans personne », c'est lui faire sentir qu'elle est seule : de l'exclusion. « Tu l'as mangé toute seule ? » vise aussi son corps : c'est du body shaming.",
    comments: [
      { user: "anon_colleg_real", text: "personne etait la pour ton anniversaire c'est ca ?" },
      { user: "sansnom_2024",     text: "tu l'as mange toute seule le gateau ?" },
      { user: "xx_nobody_xx",     text: "triste comme fete" },
    ]
  },
  { likes: 0,  caption: "nuit étoilée 🌙", time: "il y a 8 mois",
    why: "« 0 like, c'est un message », « même le ciel veut pas de toi » : on lui répète que personne ne veut d'elle. C'est de l'exclusion.",
    comments: [
      { user: "truth_teller_99",  text: "0 likes en 3 heures c'est un message clara" },
      { user: "void_user_xx",     text: "meme le ciel il veut pas de toi" },
      { user: "froid_comme_toi",  text: "t'aurais mieux fait de dormir que de poster ca" },
    ]
  },
];

// ─── CHAÎNES UI ───────────────────────────────────────────────────────────────

var UI = {
  unread:          "non lus",
  all:             "Tous",
  typesIdentified: "types trouvés",
  typesBtn:        "📋 Types",
  today:           "Aujourd'hui",
  firstToLike:     "Sois la premiere a aimer",
  likes:           " J'aime",
  searchPh:        "Rechercher un pseudo ou un message",
  searchNone:      "Aucun résultat.",
  searchComments:  "Commentaires sous ses photos",
  searchUnder:     "sous « {cap} »",
  synthBtn:        "📋 Voir la synthèse - Ce qui est arrivé à Clara",
  synthNote:       "Ces formes de harcèlement sont réelles. Chacune laisse des traces sur la victime - même sans contact physique.",
  listTitle:       "📋 Les types de harcèlement à repérer",
  listIntro:       "Trouve-en au moins 6 sur 9. Appuie sur un message ou un commentaire, puis choisis son type.",
  synthTitle:      "📋 Ce qui est arrivé à Clara - Synthèse",
  backToWA:        "← Retour au groupe",
  backToWAUrl:     "3_Groupe_Secret.html",
  idLabel:         "Quel type de harcèlement ?",
  idSeveral:       "Un message peut relever de plusieurs types : un seul suffit.",
  correct:         "C'est bien ça.",
  alsoTypes:       "Ce message relève aussi de :",
  wrong1:          "Pas tout à fait. Relis le message, et essaie un autre type.",
  wrong2:          "Voici la réponse.",
  wrongNote:       "Ce type n'est pas compté cette fois : retrouve-le dans un autre message.",
  idClose:         "Fermer",
  idContinue:      "Continuer →",
  synthFound:      "trouvé",
  synthMissed:     "pas vu",
  synthTodo:       "à trouver",
  demasqueSub:     "Démasqué dans le groupe : ",
  reportBtn:       "⚠ Signaler ce compte",
  reportDone:      "✓ Compte signalé",
  reportAfter:     "Compte signalé. Clara aurait pu le faire dès le premier message - personne ne le lui avait dit.",
  noteCode:        "🔐 Le code pour la suite",
  codeClose:       "← Relire le message de Kevin",
  // Enquêtes lancées depuis le groupe (Partie 3)
  enquetes: {
    marine: {
      photo: 2, handle: "anon_colleg_real", qui: "Marine",
      bar: "🔎 <b>Enquête</b> - Dans le groupe, Marine dit avoir écrit sous la photo du chat de Clara que « même son chat a l'air aussi nul qu'elle ». Ouvre cette photo et appuie sur le <b>pseudo</b> de l'auteur du commentaire.",
      lbHint: "🔎 Enquête : appuie sur le pseudo de l'auteur du commentaire de Marine.",
      wrongPhoto: "Ce n'est pas la bonne photo : Marine parle du chat de Clara.",
      wrongUser: "Pas ce pseudo-là. Relis ce que Marine a écrit : « même son chat a l'air aussi nul qu'elle ».",
      okTitle: "Compte démasqué",
      okNote: "Clara ne peut pas le savoir. Toi si : tu as recoupé ce qui se dit dans le groupe avec ses commentaires."
    }
  },
  notTagged:       "Méchant, oui. Mais ce message seul ne permet pas de dire de quel type de harcèlement il s'agit : cherches-en un plus précis."
};
