# -*- coding: utf-8 -*-
"""
gen_guide.py - le guide pédagogique, régénéré à partir du jeu.

    node dump_textes.js
    python gen_guide.py     → Retrouver_Clara_Guide_Pedagogique.docx

Le guide décrit le déroulement de chaque partie pour l'animateur. Les chiffres
qu'il cite (nombre de types, de conversations, de scènes, les numéros d'aide)
sont lus dans _textes_dump.json : ils ne peuvent pas être faux.
"""
import json, os, sys, datetime
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

ICI = os.path.dirname(os.path.abspath(__file__)) or '.'
os.chdir(ICI)
OUT = 'Retrouver_Clara_Guide_Pedagogique.docx'
if not os.path.exists('_textes_dump.json'):
    sys.exit("_textes_dump.json manquant - lancez d'abord : node dump_textes.js")
D = json.load(open('_textes_dump.json', encoding='utf-8'))

NOIR = RGBColor(0x1a, 0x1a, 0x1e); GRIS = RGBColor(0x66, 0x66, 0x70)
DIM = RGBColor(0x99, 0x99, 0xa2); BLEU = RGBColor(0x2a, 0x4a, 0x7a)
VERT = RGBColor(0x2a, 0x7a, 0x50); ORANGE = RGBColor(0xc0, 0x90, 0x30)
ROUGE = RGBColor(0xc0, 0x40, 0x30)

doc = Document()
for sec in doc.sections:
    sec.top_margin = Cm(2.2); sec.bottom_margin = Cm(2.2)
    sec.left_margin = Cm(2.4); sec.right_margin = Cm(2.4)
st = doc.styles['Normal']; st.font.name = 'Georgia'; st.font.size = Pt(10.5)
st.element.rPr.rFonts.set(qn('w:eastAsia'), 'Georgia')

def _pPr(p): return p._p.get_or_add_pPr()
def esp(para, before=0, after=90, line=278):
    sp = OxmlElement('w:spacing')
    for k, v in (('w:before', before), ('w:after', after), ('w:line', line)):
        sp.set(qn(k), str(int(v)))
    sp.set(qn('w:lineRule'), 'auto'); _pPr(para).append(sp)
def retrait(para, left=0, hanging=0):
    ind = OxmlElement('w:ind')
    if left: ind.set(qn('w:left'), str(int(left)))
    if hanging: ind.set(qn('w:hanging'), str(int(hanging)))
    _pPr(para).append(ind)
def bord_g(para, hexa, sz=16):
    pbd = OxmlElement('w:pBdr'); b = OxmlElement('w:left')
    b.set(qn('w:val'), 'single'); b.set(qn('w:sz'), str(sz))
    b.set(qn('w:space'), '10'); b.set(qn('w:color'), hexa)
    pbd.append(b); _pPr(para).append(pbd)
def bord_b(para, hexa='cccccc', sz=4):
    pbd = OxmlElement('w:pBdr'); b = OxmlElement('w:bottom')
    b.set(qn('w:val'), 'single'); b.set(qn('w:sz'), str(sz))
    b.set(qn('w:space'), '6'); b.set(qn('w:color'), hexa)
    pbd.append(b); _pPr(para).append(pbd)
def fond(para, hexa):
    sh = OxmlElement('w:shd'); sh.set(qn('w:val'), 'clear')
    sh.set(qn('w:fill'), hexa); _pPr(para).append(sh)
def saut(para): _pPr(para).append(OxmlElement('w:pageBreakBefore'))
def run(para, txt, bold=False, italic=False, color=None, size=None, font=None):
    r = para.add_run(txt); r.bold = bold; r.italic = italic
    if color is not None: r.font.color.rgb = color
    if size: r.font.size = Pt(size)
    if font:
        r.font.name = font; r._element.rPr.rFonts.set(qn('w:eastAsia'), font)
    return r

def P(txt='', size=10.5, before=0, after=90, italic=False, color=None, align=None):
    para = doc.add_paragraph(); esp(para, before, after)
    if align: para.alignment = align
    if txt: run(para, txt, italic=italic, color=color, size=size)
    return para
def H1(num, titre, page=True):
    para = doc.add_paragraph(); esp(para, before=0, after=40)
    if page: saut(para)
    fond(para, '1A1A1E'); retrait(para, left=120)
    run(para, num.upper() + '\n', bold=True, size=8.5, color=RGBColor(0xaa, 0xaa, 0xb2), font='Arial')
    run(para, titre, size=17, color=RGBColor(0xff, 0xff, 0xff))
def H2(txt):
    para = doc.add_paragraph(); esp(para, before=200, after=60); bord_b(para, 'dddddd')
    run(para, txt, bold=True, size=12, color=NOIR)
def H3(txt):
    para = doc.add_paragraph(); esp(para, before=140, after=40)
    run(para, txt, bold=True, size=10, color=BLEU, font='Arial')
def puce(txt, indent=300):
    para = doc.add_paragraph(); esp(para, after=40); retrait(para, left=indent, hanging=180)
    run(para, '-  ', color=DIM); run(para, txt, size=10.5)
def etape(n, titre, txt):
    para = doc.add_paragraph(); esp(para, before=80, after=50); retrait(para, left=160)
    bord_g(para, '2a4a7a', sz=12)
    run(para, 'Étape %s - %s' % (n, titre), bold=True, size=10, color=BLEU, font='Arial')
    para.add_run('\n'); run(para, txt, size=10.5)
def encart(titre, lignes, coul='2a7a50', fill='F4FAF7'):
    para = doc.add_paragraph(); esp(para, before=100, after=90); retrait(para, left=160)
    bord_g(para, coul, sz=16); fond(para, fill)
    run(para, titre, bold=True, size=10, color=RGBColor(int(coul[0:2], 16), int(coul[2:4], 16), int(coul[4:6], 16)), font='Arial')
    for l in lignes:
        para.add_run('\n'); run(para, l, size=10)
def tableau(entetes, lignes):
    t = doc.add_table(rows=1, cols=len(entetes)); t.style = 'Table Grid'
    for i, e in enumerate(entetes):
        c = t.rows[0].cells[i]; c.text = ''
        run(c.paragraphs[0], e, bold=True, size=8.5, font='Arial')
    for ln in lignes:
        cells = t.add_row().cells
        for i, v in enumerate(ln):
            cells[i].text = ''; run(cells[i].paragraphs[0], v, size=9.5)
    doc.add_paragraph()

MOIS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']
d = datetime.date.today(); DATE = '%d %s %d' % (d.day, MOIS[d.month - 1], d.year)

T2 = D['p2']; T3 = D['p3']['WA_DATA']; T4 = D['p4']['TEXTES']; RES = D['ressources']
NB_TYPES = len(T2['HARCEL_TYPES']); NB_CONV = len([c for c in T2['CONVOS'] if c['id'] != 99])
NB_QCM2 = len(T2['QUIZZES']) + len(T2['PHOTO_QUIZZES']); NB_PHOTOS = len(T2['photoData'])
NB_COMPTES = len(T3['comptes']['liste']); NB_SCENES = len(T4['SCENES'])
NB_MSG3 = len([m for m in T3['messages'] if not m.get('type')])

# ── COUVERTURE ──────────────────────────────────────────────────────────────
P('', after=800)
p = P(align=WD_ALIGN_PARAGRAPH.CENTER); run(p, 'Jeu de sensibilisation au harcèlement scolaire', size=9, color=DIM, font='Arial')
p = doc.add_paragraph(); p.alignment = WD_ALIGN_PARAGRAPH.CENTER; esp(p, before=60, after=60); bord_b(p, '1a1a1a', sz=12)
run(p, 'Retrouver Clara', italic=True, size=28)
p = P(align=WD_ALIGN_PARAGRAPH.CENTER, before=80, after=30)
run(p, 'Guide pédagogique - déroulement du jeu, partie par partie', size=11, color=GRIS)
p = P(align=WD_ALIGN_PARAGRAPH.CENTER, after=40)
run(p, "Document destiné aux animateurs et aux associations partenaires", size=10, color=GRIS)
p = P(align=WD_ALIGN_PARAGRAPH.CENTER, after=200)
run(p, 'Version du %s' % DATE, size=8.5, color=DIM, font='Arial')

H2('Présentation générale')
P("Retrouver Clara est un jeu de sensibilisation en ligne composé de quatre parties, jouables "
  "l'une après l'autre. Le joueur incarne Léo - ou Léa, au choix, sur l'écran d'accueil - un ami "
  "de Clara, quatorze ans, qui ne vient plus au collège depuis cinq jours. En reconstituant ce "
  "qu'elle a vécu, il apprend à reconnaître les formes du harcèlement, à faire les gestes qui "
  "protègent, et à trouver les mots pour parler à quelqu'un qui va mal.")
P("Le jeu se joue sur téléphone, tablette ou ordinateur, en individuel, en binôme ou en groupe "
  "sur écran partagé. Il dure entre trente-cinq et cinquante minutes selon le rythme du groupe, "
  "et se termine sur un récapitulatif imprimable.")

tableau(['Partie', 'Titre', 'Mécanique', 'Compétence', 'Durée'], [
    ['1', "Le téléphone d'Inès", "Dialogue à choix, jauge de confiance", "Écoute, formulation", "5–8 min"],
    ['2', "L'Instaclasse de Clara", "Exploration, identification, signalement", "Analyse, reconnaissance", "12–18 min"],
    ['3', "Le groupe Whatsupp secret", "Lecture au rythme du joueur, comptes à démasquer", "Déduction, esprit critique", "8–12 min"],
    ['4', "Convaincre Clara", "Dialogue d'empathie, %d scènes" % NB_SCENES, "Empathie, formulation", "8–12 min"],
])
encart("Ce qui a changé récemment", [
    "Le jeu affiche un avertissement de contenu avant la Partie 2, la plus dure des quatre.",
    "Le joueur peut signaler les comptes qui harcèlent : capture, blocage, signalement, adulte.",
    "La Partie 3 se lit au rythme du joueur (un appui par message), plus en défilement automatique.",
    "Un code de reprise à sept caractères permet de reprendre la partie sur un autre appareil.",
    "Un bouton « Nouvelle enquête » remet tout à zéro entre deux groupes sur la même tablette.",
], coul='2a4a7a', fill='F0F4FA')

# ── PARTIE 1 ────────────────────────────────────────────────────────────────
H1('Partie 1', "Le téléphone d'Inès")
P('📱  Durée estimée : 5 à 8 minutes', size=9.5, color=GRIS, after=110)
H2('Contexte narratif')
P("Inès est la meilleure amie de Clara. Le joueur lui écrit sans la connaître, et doit gagner "
  "assez de sa confiance pour qu'elle accepte de parler. Inès se méfie - et elle a raison de se "
  "méfier : c'est le premier point à faire remarquer aux élèves.")
H2('Ce que le joueur fait')
puce("Il répond à Inès par des choix multiples, six échanges plus une ouverture.")
puce("Une jauge de confiance monte ou descend à chaque réponse et s'affiche en haut de l'écran.")
puce("Si la confiance passe sous un certain seuil, une « crise » se déclenche une seule fois : "
     "Inès demande au joueur qui il est vraiment. C'est un rattrapage.")
puce("Sous un seuil plus bas, Inès coupe la conversation. Le joueur recommence.")
H2('Mécanique principale')
P("Dialogue à choix multiples. Chaque option vaut +1, 0 ou −1 en confiance. La bonne réponse est "
  "presque toujours celle qui parle de Clara plutôt que du joueur : c'est le cœur de l'exercice.")
encart("Point d'attention pour l'animateur", [
    "Depuis la dernière version, chaque option reçoit sa propre réponse d'Inès. Avant, la même "
    "réplique suivait les trois choix, et un élève attentif le remarquait.",
])
H2('Ce que le joueur apprend')
for r in D['p1']['TEXTES']['REVELATIONS']:
    puce('%s - %s' % (r['title'], r['txt']))
H2('Transition vers la Partie 2')
P("Si la confiance est suffisante, Inès fait promettre deux choses au joueur - faire attention à "
  "ce qu'il lit, et respecter la vie privée de Clara - puis lui donne les identifiants du compte "
  "Instaclasse de Clara. Elle explique pourquoi elle les a : elles se connectaient sur le même "
  "téléphone l'an dernier.")
encart("À discuter en débrief", [
    "Inès fait promettre de respecter la vie privée de Clara, et l'écran suivant demande au joueur "
    "d'entrer dans son compte. Le jeu y revient à la fin de la Partie 2 : entrer dans le compte de "
    "quelqu'un reste interdit, même quand on s'inquiète. C'est un bon point de départ de discussion.",
], coul='c09030', fill='FDFAF0')

# ── PARTIE 2 ────────────────────────────────────────────────────────────────
H1('Partie 2', "L'Instaclasse de Clara")
P('📸  Durée estimée : 12 à 18 minutes', size=9.5, color=GRIS, after=110)
H2('Contexte narratif')
P("Le joueur se connecte au compte de Clara et découvre %d publications et %d conversations "
  "privées, dont la plupart viennent de comptes anonymes. C'est la partie la plus dure du jeu."
  % (NB_PHOTOS, NB_CONV))
H2('Déroulement étape par étape')
etape('1', 'Connexion', "Le joueur saisit les identifiants qu'Inès lui a donnés. Un bouton en forme "
      "d'œil permet de vérifier ce qu'il tape - utile sur téléphone. Un lien « Accéder directement » "
      "existe pour l'animateur pressé.")
etape('2', 'Avertissement de contenu', "Un écran prévient que ce qui suit simule ce que vit une "
      "victime, que les messages sont fictifs mais représentent une réalité, et que l'objectif est "
      "de comprendre l'impact. Rien ne commence tant que le joueur n'a pas continué.")
etape('3', 'Exploration libre', "Le joueur parcourt les photos et les messages à son rythme. Aucun "
      "minuteur ne le presse.")
etape('4', "« Qu'est-ce que tu observes ? »", "La question arrive quand le joueur a réellement "
      "regardé - au moins deux photos et deux conversations - et jamais pendant qu'il lit. Un "
      "bouton « Dire ce que j'observe » permet de répondre plus tôt. Le jeu accepte harcèlement, "
      "cyberharcèlement, intimidation, bullying et leurs variantes.")
etape('5', 'Mission', "Identifier %d des %d types de harcèlement. Le bouton « Identifier un "
      "harcèlement » passe l'écran en mode sélection : les messages concernés se soulignent en "
      "pointillés, le joueur en choisit un et dit de quel type il s'agit." % (6, NB_TYPES))
etape('6', "Points d'analyse", "%d questions se déclenchent seules, à la première ouverture de "
      "certaines conversations et de certaines photos. Une mauvaise réponse n'est pas bloquante : "
      "l'explication est lue, le type est acquis." % NB_QCM2)
etape('7', 'Signalement', "Sur chaque conversation de harceleur, un bouton propose les trois gestes "
      "dans l'ordre qui compte : capture d'écran d'abord (sinon on perd la preuve), puis blocage, "
      "puis signalement au réseau et à un adulte.")
H2('Les %d types de harcèlement' % NB_TYPES)
for k, t in T2['HARCEL_TYPES'].items():
    puce('%s - %s' % (t['label'], t['desc']))
H2("Fin de la partie")
P("À six types identifiés, le journal intime de Clara apparaît dans la liste des messages. Elle y "
  "écrit qu'elle a découvert l'existence d'un groupe secret, qu'elle ne sait même pas comment elle "
  "l'a appris, et qu'elle ne peut ni y entrer ni rien prouver. Un bouton donne ensuite le code de "
  "l'exercice, 4827, qui ouvre la Partie 3.")
P("Une synthèse récapitule les neuf types en distinguant ceux que le joueur a trouvés de ceux "
  "qu'il a manqués : personne ne termine sans avoir lu les neuf.")
encart("Avant de passer à la Partie 3", [
    "Un écran rappelle que le joueur vient de lire tous les messages privés de Clara sans qu'elle "
    "l'ait autorisé, que Léo a eu peur pour elle mais que cela ne rend pas la chose normale, et "
    "que ce qu'on peut faire à sa place, c'est en parler à un adulte.",
], coul='c09030', fill='FDFAF0')

# ── PARTIE 3 ────────────────────────────────────────────────────────────────
H1('Partie 3', 'Le groupe Whatsupp secret')
P('💬  Durée estimée : 8 à 12 minutes', size=9.5, color=GRIS, after=110)
H2('Contexte narratif')
P("Le joueur lit %d messages échangés par les cinq élèves qui ont organisé le harcèlement : %s. "
  "Clara n'en fait pas partie et n'y a jamais eu accès."
  % (NB_MSG3, T3['group']['subtitle']))
H2('Déroulement étape par étape')
etape('1', "Code de l'exercice", "Le joueur saisit 4827. L'écran dit clairement qu'un vrai groupe "
      "Whatsupp n'a pas de code d'accès et que ce verrou est celui de l'exercice - ce qui suit, en "
      "revanche, est bien ce que le groupe a écrit.")
etape('2', 'Avertissement', "Un rappel que les échanges sont fictifs mais montrent comment le "
      "harcèlement se coordonne en coulisse.")
etape('3', 'Mission', "Repérer les %d comptes anonymes. Le groupe les nomme à voix haute ; chaque "
      "fois qu'un compte est cité, le joueur appuie dessus et découvre qui se cache derrière. Un "
      "compteur suit sa progression en haut de l'écran." % NB_COMPTES)
etape('4', 'Lecture au rythme du joueur', "Chaque message attend un appui. Personne n'est largué, "
      "et l'animateur peut s'arrêter quand il veut pour faire réagir le groupe.")
etape('5', "Points d'analyse", "Deux questions arrivent pendant la lecture : l'une sur Kevin, qui "
      "doute mais se tait ; l'autre sur l'intérêt des comptes anonymes pour les harceleurs.")
H2('Les comptes à démasquer')
for e_ in T3['comptes']['liste']:
    puce('@%s - %s' % (e_['handle'], e_['qui']))
P("Une fois démasqués, ces comptes portent le prénom de leur propriétaire quand le joueur retourne "
  "sur l'Instaclasse de Clara. C'est l'asymétrie que le jeu raconte : le joueur sait, Clara non.",
  before=40)
H2('Fin de la partie')
P("La synthèse reprend les mécanismes du harcèlement de groupe, puis deux blocs de discussion.")
puce("« Et Kevin ? » - ce que le témoin aurait pu faire, et qu'il n'a pas fait. C'est le rôle que "
     "la plupart des élèves occupent réellement.")
puce("« Pourquoi Clara ? » - le groupe ne le dit jamais. La seule justification est « elle l'a bien "
     "cherché ». Il n'y a pas de raison, et en chercher une revient déjà à donner tort à la victime.")

# ── PARTIE 4 ────────────────────────────────────────────────────────────────
H1('Partie 4', 'Convaincre Clara')
P('🤝  Durée estimée : 8 à 12 minutes', size=9.5, color=GRIS, after=110)
H2('Contexte narratif')
P(T4['titre']['sub'].replace('{e}', '').replace('\n', ' '))
P("C'est la partie la plus émotionnelle : il s'agit d'écouter, pas de résoudre.")
H2('Déroulement étape par étape')
etape('1', 'Composer le numéro', "Le numéro de la tante n'est donné que par Inès, dans la Partie 1, "
      "une fois la Partie 3 terminée. Le joueur qui ne l'a pas doit le déduire et y retourner. À "
      "chaque essai raté, une pensée de Léo l'oriente sans lui donner la réponse.")
etape('2', 'Convaincre la tante', "Trois questions. Une réponse maladroite ouvre un rattrapage ; "
      "deux maladresses de suite et la tante raccroche.")
etape('3', 'Parler à Clara', "Quatre questions. Chaque réponse reçoit un retour écrit qui explique "
      "pourquoi elle touche juste ou passe à côté.")
H2('Ce qui a changé')
P("Les cœurs et le score chiffré ont été retirés : ils poussaient à chercher la bonne réponse "
  "plutôt qu'à répondre. Le compte d'empathie reste interne et choisit la fin ; le joueur, lui, ne "
  "voit que le retour écrit après chaque choix.")
H2('Les trois fins')
for f in T4['fins']:
    coul = {'good': ('2a7a50', 'F4FAF7'), 'ok': ('c09030', 'FDFAF0'), 'bad': ('c04030', 'FDF4F4')}[f['cls']]
    encart('%s  %s  (empathie ≥ %d sur 10)' % (f['icon'], f['titre'], f['minScore']),
           [f['corps'].replace('\n\n', ' ').replace('\n', ' '), f['citation'].replace('\n', ' ')],
           coul=coul[0], fill=coul[1])
H2('Après la fin')
P("L'écran de fin ne s'arrête plus à Clara. Il dit ce que Léo fait le lendemain - il va voir le "
  "CPE, montre ses captures, signale les comptes - puis ce qui arrive aux cinq du groupe : le "
  "collège ouvre une enquête, et le harcèlement scolaire est un délit en France depuis 2022.")
P("Un bouton ouvre enfin le récapitulatif imprimable : les neuf types avec ceux que le groupe a "
  "identifiés, les comptes démasqués, la fin obtenue, les numéros d'aide, et deux lignes à "
  "compléter à la main.")

H2("Où trouver de l'aide")
for r in RES['liste']:
    puce('%s - %s' % (r['label'], r['txt']))
P("Ces numéros sont dans le fichier ressources.js : c'est le seul endroit à modifier pour adapter "
  "le jeu à un autre pays. La version anglaise donne les numéros européens.", size=9.5, color=GRIS)

# ── NOTES ANIMATEUR ─────────────────────────────────────────────────────────
H1("Notes pour l'animateur", "Avant, pendant, après")
H2('Avant la séance')
puce("Tester le parcours complet sur le matériel qui sera utilisé.")
puce("Ouvrir le jeu depuis index.html, jamais une partie directement : la progression et le prénom "
     "choisi passent par l'accueil.")
puce("Sur tablette partagée, penser au bouton « Nouvelle enquête » entre deux groupes - sans lui, "
     "le groupe suivant hérite de la progression du précédent.")
puce("Vérifier que les numéros affichés sont ceux du pays où se déroule la séance.")
H2('Pendant la séance')
puce("La Partie 2 est dure. Prévenir, et laisser la possibilité de s'arrêter sans se faire remarquer.")
puce("Les points d'analyse sont des supports de discussion : faire verbaliser le choix avant de "
     "valider.")
puce("La Partie 3 se lit au rythme du groupe : c'est le bon moment pour s'arrêter sur Kevin.")
puce("La Partie 4 peut se rejouer pour comparer les formulations.")
H2('Après la séance')
puce("Imprimer le récapitulatif et le faire compléter : « si je vois ça arriver autour de moi, la "
     "première chose que je fais » et « la personne à qui j'en parle ».")
puce("Débriefer sur ce que le joueur a fait, pas seulement sur ce qu'il a lu : il est entré dans le "
     "compte de quelqu'un, il a lu un groupe privé. Le jeu le dit ; il faut l'entendre.")
puce("Rappeler les numéros, et que la loi protège les victimes (article 222-33-2-2 du Code pénal).")

p = doc.add_paragraph(); esp(p, before=260, after=0); p.alignment = WD_ALIGN_PARAGRAPH.CENTER
bord_b(p, 'eeeeee', sz=4)
run(p, "Retrouver Clara - guide pédagogique produit à partir des fichiers du jeu, le %s." % DATE,
    size=8, color=DIM, font='Arial')

doc.save(OUT)
print('écrit :', OUT)
