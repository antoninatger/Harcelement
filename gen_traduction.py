# -*- coding: utf-8 -*-
"""
gen_traduction.py - document de traduction de « Retrouver Clara » (FR → HR).

Tous les textes français que voit le joueur (cf. _extraire_textes.py), dans
l'ordre du jeu, avec pour chacun : un numéro, l'endroit où il s'affiche, qui
parle, le texte français, une colonne vide pour le croate et des remarques
(accords masculin/féminin, retours à la ligne, mots à ne pas traduire…).

    node dump_textes.js && python gen_traduction.py
    → textes_a_traduire_FR-HR.docx

La clé technique (petite, en gris sous le contexte) sert à remettre chaque
traduction à sa place dans le jeu : les traducteurs n'ont pas à y toucher.
"""
import re, json, datetime
from collections import OrderedDict
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.section import WD_ORIENT
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

import _extraire_textes as X

OUT = 'textes_a_traduire_FR-HR.docx'
CLES = '_traduction_cles.json'     # où va chaque phrase dans le jeu (pas pour les traducteurs)
GRIS = RGBColor(0x88, 0x88, 0x88)
BLEU = RGBColor(0x1e, 0x3a, 0x5f)
ROUGE = RGBColor(0xb0, 0x3a, 0x2e)

# ── Qui parle ────────────────────────────────────────────────────────────────
SPK4 = {'aunt': 'la tante', 'lea': 'Clara', 'thomas': 'Léo (le joueur)', 'narrator': 'didascalie (bruitage, action)'}
ABC = 'ABCDEF'


def n(i):
    return int(i) + 1


def contexte(l):
    """Phrase lisible : où le texte apparaît, et qui le dit."""
    c, p, num = l['id'], l['parent'], l['num']
    if l['ecran'] != 'Données':
        e = l['ecran']
        att = re.search(r'\((placeholder|title|aria-label|alt)\)', e)
        if att:
            return {'placeholder': 'Texte d’exemple grisé dans un champ de saisie',
                    'title': 'Infobulle (au survol de la souris)',
                    'aria-label': 'Libellé lu par les lecteurs d’écran (non affiché)',
                    'alt': 'Description d’image (non affichée)'}[att.group(1)]
        if l['id'].endswith('.js') or '(' in l['id']:
            return 'Message affiché par le jeu'
        ou = c.split('#', 1)[1]
        for cle, txt in (('i1-line', 'Écran d’introduction (lignes qui défilent)'), ('intro', 'Écran d’introduction'),
                         ('skip', 'Bouton « passer »'), ('btn', 'Bouton'), ('go', 'Bouton'), ('close', 'Bouton'),
                         ('cancel', 'Bouton'), ('modal', 'Fenêtre'), ('overlay', 'Fenêtre'), ('box', 'Fenêtre'),
                         ('card', 'Carte du menu'), ('hero', 'En-tête du menu'), ('prev', 'Aperçu dans le menu'),
                         ('footer', 'Pied de page'), ('gate', 'Écran du code d’accès'), ('notif', 'Notification')):
            if cle in ou:
                return txt
        return 'Écran / interface'
    m = re.match
    # Partie 1
    if num.startswith('P1'):
        if m(r'TEXTES\.ouverture', c):
            return 'SMS - ' + ('Léo (le joueur)' if p.get('type') == 's' else 'Inès')
        if m(r'TEXTES\.(finImmediate|blocageMessages)', c):
            return 'SMS d’Inès (elle coupe la conversation)'
        if r := m(r'TEXTES\.G\[(\d+)\]\.intro', c):
            return f'Échange {n(r[1])} - SMS d’Inès'
        if r := m(r'TEXTES\.G\[(\d+)\]\.edu', c):
            return f'Échange {n(r[1])} - encadré pédagogique'
        if r := m(r'TEXTES\.G\[(\d+)\]\.c\[(\d+)\]\.(\w)', c):
            q, ch, k = n(r[1]), ABC[int(r[2])], r[3]
            return {'t': f'Échange {q} - réponse {ch} proposée au joueur (SMS de Léo)',
                    'r': f'Échange {q} - réplique d’Inès après la réponse {ch}',
                    'p': f'Échange {q} - pensée de Léo après la réponse {ch} (bulle hors du téléphone)'}[k]
        if m(r'TEXTES\.CRISIS\.intro', c):
            return 'Moment de crise - SMS d’Inès (méfiante)'
        if r := m(r'TEXTES\.CRISIS\.c\[(\d+)\]\.(\w)', c):
            ch = ABC[int(r[1])]
            return {'t': f'Moment de crise - réponse {ch} proposée (SMS de Léo)',
                    'p': f'Moment de crise - pensée de Léo après la réponse {ch}'}.get(r[2], 'Moment de crise')
        if m(r'TEXTES\.trustLabels', c) or 'trustInitial' in c:
            return 'Jauge de confiance d’Inès (état affiché)'
        if r := m(r'TEXTES\.REVELATIONS\[(\d+)\]', c):
            return f'Révélation {n(r[1])} (fiche qui s’ouvre)'
        if r := m(r'TEXTES\.fins\.(\w+)\.(\w+)', c):
            fin = {'imm': 'Fin immédiate', 'blocage': 'Fin « Inès bloque »', 'succes': 'Fin réussie',
                   'fragile': 'Fin fragile (Inès hésite)', 'echec': 'Fin ratée'}.get(r[1], r[1])
            qui = 'SMS d’Inès' if 'ines' in r[2] else 'SMS de Léo' if 'leo' in r[2] else \
                  'Message système' if r[2] == 'sys' else 'Écran de fin'
            return f'{fin} - {qui}'
        if 'UI.secondConvo' in c:
            if 'playerMsg' in c or 'reponseResolue' in c:
                return 'Deuxième conversation avec Inès (après la Partie 3) - SMS de Léo'
            if any(k in c for k in ('Btn', 'Title', 'status')):
                return 'Deuxième conversation avec Inès - interface'
            return 'Deuxième conversation avec Inès (après la Partie 3) - SMS d’Inès'
        return 'Interface de la conversation'
    # Partie 2
    if num.startswith('P2'):
        if r := m(r'HARCEL_TYPES\.\w+\.(\w+)', c):
            return 'Type de harcèlement - ' + ('nom' if r[1] == 'label' else 'définition')
        if r := m(r'CONVOS\[(\d+)\]\.messages\[(\d+)\]', c):
            qui = 'Clara' if p.get('from') == 'me' else 'l’autre compte'
            return f'Messages privés - conversation {n(r[1])}, message {n(r[2])} ({qui})'
        if r := m(r'CONVOS\[(\d+)\]\.(\w+)', c):
            return f'Messages privés - conversation {n(r[1])} : ' + {
                'sub': 'sous-titre du contact', 'preview': 'aperçu dans la liste',
                'section': 'intertitre de la liste (date)',
                'why': 'explication affichée quand le joueur a identifié le harcèlement'}.get(r[2], r[2])
        if r := m(r'photoData\[(\d+)\]\.comments\[(\d+)\]', c):
            return f'Photo {n(r[1])} - commentaire de @{p.get("user", "?")}'
        if r := m(r'photoData\[(\d+)\]\.(\w+)', c):
            return f'Photo {n(r[1])} - ' + {'caption': 'légende écrite par Clara',
                                            'why': 'explication après identification'}.get(r[2], r[2])
        if 'enquetes' in c:
            return 'Enquête « compte de Marine » (venue de la Partie 3)'
        return 'Interface de l’Instaclasse'
    # Partie 3
    if num.startswith('P3'):
        if r := m(r'WA_DATA\.messages\[(\d+)\]', c):
            t = p.get('type')
            if t == 'system': return 'Groupe - message système'
            if t == 'time-sep': return 'Groupe - séparateur de temps'
            if t == 'thought': return 'Pensée de Léo (bulle hors du téléphone)'
            if t == 'enquete': return 'Encadré « enquête » (renvoie vers la Partie 2)'
            if t == 'end': return 'Fin du groupe'
            return f'Groupe Whatsupp - message de {p.get("sender", "?")}'
        if m(r'WA_DATA\.postComments', c):
            return f'Photo partagée - commentaire de @{p.get("user", "?")}'
        if 'quizzes' in c:
            return 'Question d’analyse (quiz) pendant la lecture du groupe'
        if 'comptes' in c:
            return 'Fiche « compte démasqué »'
        for k, t in (('mission', 'Fenêtre de mission'), ('warning', 'Avertissement avant la lecture'),
                     ('banner', 'Bandeau'), ('synthesis', 'Synthèse finale'), ('endMessage', 'Écran de fin'),
                     ('endThought', 'Pensée de Léo à la fin du groupe'), ('kevin', 'Encadré « Kevin »'),
                     ('mobile', 'Message pour petit écran'), ('navigation', 'Bouton de navigation'),
                     ('postCard', 'Photo partagée dans le groupe')):
            if k in c:
                return t
        return 'Interface du groupe'
    # Partie 4
    if num.startswith('P4'):
        if r := m(r'TEXTES\.SCENES\[(\d+)\]\.(dialogueBefore|dialogueRappel)\[\d+\]', c):
            quand = 'au rappel, après avoir raccroché' if r[2] == 'dialogueRappel' else 'avant les choix'
            return f'Appel, scène {n(r[1])} ({quand}) - {SPK4.get(p.get("spk"), "?")}'
        if r := m(r'TEXTES\.SCENES\[(\d+)\]\.choices\[(\d+)\]\.(.*)', c):
            s, ch, k = n(r[1]), ABC[int(r[2])], r[3]
            base = f'Appel, scène {s}, réponse {ch}'
            if k == 'txt': return f'{base} - proposée au joueur (ce que dit Léo)'
            if k == 'fb.msg': return f'{base} - explication ({p.get("type", "")})'.replace('(good)', '(bonne réponse)').replace('(bad)', '(mauvaise réponse)').replace('(ok)', '(réponse moyenne)')
            if k == 'reply.txt': return f'{base} - réplique de {SPK4.get(p.get("spk"), "?")}'
            if 'recovery' in k:
                b = f'{base} - rattrapage'
                if 'auntLine' in k: return f'{b} : réplique de la tante'
                if k.endswith('prompt'): return f'{b} : consigne'
                gb = 'bonne' if '.good' in k else 'mauvaise'
                if k.endswith('fb.msg'): return f'{b} : explication de la {gb} réponse'
                if k.endswith('reply.txt'): return f'{b} : réplique après la {gb} réponse'
                return f'{b} : {gb} réponse proposée (Léo)'
        if r := m(r'TEXTES\.SCENES\[(\d+)\]\.(\w+)', c):
            return f'Appel, scène {n(r[1])} - ' + {'phaseName': 'nom de la phase', 'stepLabel': 'étape',
                                                     'prompt': 'consigne au-dessus des choix'}.get(r[2], r[2])
        if 'conclusion' in c: return 'Conclusion (lignes qui s’affichent une à une)'
        if 'fins' in c: return 'Écran de fin'
        if 'titre' in c: return 'Écran d’accueil de la Partie 4'
        if 'gameover' in c: return 'Écran « on a raccroché »'
        if 'jeu.' in c: return 'Pendant l’appel'
        return 'Interface de l’appel'
    if num.startswith('R'):
        return 'Encadré « numéros d’aide »'
    return ''


PRENOMS = {'Clara', 'Inès', 'Léo', 'Léa', 'Kevin', 'Enzo', 'Jade', 'Marine', 'Théo', 'Sarah', 'Nathan', 'Lena'}

# ── Remarques automatiques ───────────────────────────────────────────────────
def remarques(l, premiers):
    fr, c, R = l['fr'], l['id'], []
    if re.search(r'\{[^{}|]*\|[^{}]*\}', fr) or '{e}' in fr:
        R.append('Accord selon le joueur (Léo / Léa) : garder la forme {masculin|féminin}.')
    if 'Léo' in fr:
        R.append('« Léo » devient « Léa » si le joueur choisit Léa.')
    if '\n' in fr:
        R.append('Garder les retours à la ligne.')
    if '{cap}' in fr:
        R.append('{cap} est remplacé par la légende d’une photo : ne pas traduire.')
    if re.search(r'\b4827\b', fr):
        R.append('4827 est un code du jeu : le garder tel quel.')
    if '@' in fr or re.search(r'\b\w+_\w+\b', fr) or re.fullmatch(r'[a-z]+\.[a-z]+', fr.strip()):
        R.append('Les pseudos (@…, xx_…_xx) restent tels quels.')
    ado = l['num'][:2] in ('P2', 'P3') and ('messages[' in c or 'comments[' in c or 'postComments' in c) \
        and 'Pensée' not in l['contexte'] and 'système' not in l['contexte']
    if ado:
        R.append('Écrit d’ado, sans accents ni majuscules : garder ce registre.' if l['num'].startswith('P2')
                 else 'Langage d’ado (mdr, lol, émojis) : garder ce registre.')
    if 'France' in fr or '2022' in fr:
        R.append('Loi française : à adapter à la loi croate.')
    if c.startswith('RESSOURCES_HR'):
        R.append('Numéro croate 116 111 : le numéro reste tel quel, seule la description est à traduire.')
    if fr.strip() in PRENOMS:
        R.append('Prénom (voir les consignes).')
    n = l.get('fois', 1)
    if n > 1:
        R.append(f'Revient {n} fois dans le jeu : une seule traduction.')
    return ' '.join(R)


def a_traduire(fr):
    """Faux pour ce qui reste tel quel en croate : un prénom seul, un pseudo
    ou une adresse (clara.fontaine, @…, e-enfance.org). Le jeu croate
    reprendra ces lignes telles quelles."""
    t = fr.strip()
    if t in PRENOMS:
        return False
    if re.fullmatch(r'@?[a-z0-9]+([._-][a-z0-9]+)+', t) or re.fullmatch(r'@\w+', t):
        return False
    return True


# ── Mise en forme Word ───────────────────────────────────────────────────────
def ombre(cell, hexa):
    tcPr = cell._tc.get_or_add_tcPr()
    sh = OxmlElement('w:shd')
    sh.set(qn('w:val'), 'clear'); sh.set(qn('w:color'), 'auto'); sh.set(qn('w:fill'), hexa)
    tcPr.append(sh)


def entete_repetee(row):
    trPr = row._tr.get_or_add_trPr()
    e = OxmlElement('w:tblHeader'); e.set(qn('w:val'), 'true'); trPr.append(e)


def pas_coupee(row):
    trPr = row._tr.get_or_add_trPr()
    e = OxmlElement('w:cantSplit'); e.set(qn('w:val'), 'true'); trPr.append(e)


def ecrire(cell, texte, taille=9, gras=False, couleur=None, italique=False):
    p = cell.paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    lignes = texte.split('\n')
    for i, li in enumerate(lignes):
        r = p.add_run(li)
        r.font.size = Pt(taille); r.bold = gras; r.italic = italique
        if couleur: r.font.color.rgb = couleur
        if i < len(lignes) - 1:
            r.add_break()
    return p


def para(doc, texte, taille=10.5, gras=False, couleur=None, apres=4, style=None):
    p = doc.add_paragraph(style=style)
    p.paragraph_format.space_after = Pt(apres)
    # **gras** dans le texte
    for i, morceau in enumerate(re.split(r'\*\*', texte)):
        if morceau:
            r = p.add_run(morceau); r.font.size = Pt(taille); r.bold = gras or i % 2 == 1
            if couleur: r.font.color.rgb = couleur
    return p


LARG = [Cm(1.5), Cm(5.0), Cm(8.2), Cm(8.2), Cm(3.8)]


def tableau(doc, lignes):
    t = doc.add_table(rows=1, cols=5)
    t.style = 'Table Grid'
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.autofit = False
    h = t.rows[0]
    entete_repetee(h)
    for i, titre in enumerate(['N°', 'Où / qui parle', 'Français', 'Hrvatski (à remplir)', 'Remarques']):
        ecrire(h.cells[i], titre, 9, True, RGBColor(0xff, 0xff, 0xff))
        ombre(h.cells[i], '1E3A5F')
    for l in lignes:
        row = t.add_row()
        pas_coupee(row)
        cs = row.cells
        ecrire(cs[0], l['num'], 8, True, BLEU)
        ecrire(cs[1], l['contexte'], 8)
        ecrire(cs[2], l['fr'], 9.5)
        ombre(cs[3], 'FFFDF2')
        if l['rem']:
            ecrire(cs[4], l['rem'], 8, couleur=ROUGE if 'adapter' in l['rem'] or 'équivalent' in l['rem'] else None)
    # Largeurs : grille + chaque cellule (LibreOffice lit l'une, Word l'autre).
    for i, w in enumerate(LARG):
        t.columns[i].width = w
    for row in t.rows:
        for i, w in enumerate(LARG):
            row.cells[i].width = w
    tblPr = t._tbl.tblPr
    lay = OxmlElement('w:tblLayout'); lay.set(qn('w:type'), 'fixed'); tblPr.append(lay)
    return t


CONSIGNES = [
    "Ce document contient **tous les textes** du jeu « Retrouver Clara » que voit le joueur, dans l’ordre où il les découvre : menu, puis les quatre parties, puis le récapitulatif imprimable.",
    "Écrivez la traduction croate dans la colonne **Hrvatski**, sur la même ligne. Ne modifiez pas les colonnes N° et Français : elles nous servent à remettre chaque phrase à sa place dans le jeu.",
    "Le jeu est joué par des élèves de 11 à 15 ans. Les messages entre ados (Instaclasse, groupe Whatsupp) sont volontairement écrits « comme sur un téléphone » : sans accents, sans majuscules, avec des fautes et des abréviations. Gardez ce registre en croate, sans le corriger.",
    "**Léo ou Léa.** Le joueur choisit son personnage. Quand le français s’accorde, la phrase porte la marque **{masculin|féminin}** (ex. « je suis {inquiet|inquiète} ») ou **{e}** (ex. « désolé{e} »). Le croate s’accorde plus souvent que le français (passé : « bio sam / bila sam ») : en croate, utilisez **uniquement la marque {masculin|féminin}**, partout où il le faut, même si le français n’en a pas. Exemple : « {bio sam zabrinut|bila sam zabrinuta} ». La marque {e} ne fonctionne que pour le français.",
    "**Ne pas traduire :** les pseudos (@anon_colleg_real, xx_nobody_xx…), les identifiants et mots de passe, le code 4827, l’adresse antoninatger.com. Les prénoms (Clara, Inès, Léo, Léa, Kevin, Enzo, Jade, Marine, Théo, Sarah, Nathan, Lena) peuvent rester ; si vous préférez des prénoms croates, donnez-nous la liste de correspondance et nous les changerons partout, images comprises.",
    "**Instaclasse** et **Whatsupp** sont des parodies d’Instagram et de WhatsApp. Vous pouvez garder ces noms ou proposer une parodie croate : dites-le nous, pour que le nom soit le même partout.",
    "**Numéros d’aide :** la version croate affichera le **116 111** (Hrabri telefon) à la place des numéros français ; sa description est à traduire en fin de tableau. Si d’autres numéros croates doivent figurer dans l’encadré (soutien psychologique, signalement en ligne), indiquez-les dans la colonne Remarques.",
    "**À adapter, pas à traduire :** la phrase sur la loi française (2022). Ces lignes sont signalées en rouge dans la colonne Remarques.",
    "**Réponse libre (Partie 1, deuxième conversation).** Après la Partie 3, Inès demande où est Clara et le joueur tape sa réponse. Le jeu accepte les réponses contenant « tante », « campagne », « havre » ou « secret ». Donnez-nous les mots croates qu’un élève taperait (ex. teta, selo…), avec leurs formes déclinées.",
    "« **havre secret** » est le nom que Clara donne à la maison de sa tante. Il revient dans plusieurs parties : traduisez-le toujours de la même façon.",
    "Les guillemets « » des choix de la Partie 4 indiquent que Léo parle à voix haute. Les crochets [ … ] et parenthèses ( … ) au début d’une réplique sont des didascalies (bruit, ton de voix).",
    "Chaque phrase n’apparaît qu’une fois, même si le jeu l’affiche à plusieurs endroits (« Revient 31 fois » dans les Remarques) : nous reporterons votre traduction partout. Si un endroit demande une autre formulation en croate, dites-le dans la colonne Remarques.",
    "Les prénoms seuls, les pseudos et les adresses web ne figurent pas dans le tableau : ils restent tels quels.",
]


def main():
    TOUS = X.tout()
    # Une ligne par phrase : la première fois qu'on la rencontre. Les autres
    # endroits reprendront la même traduction (clé : le texte français).
    vus, L = {}, []
    for l in TOUS:
        l['contexte'] = contexte(l)
        if not a_traduire(l['fr']):
            continue
        if l['fr'] in vus:
            vus[l['fr']]['fois'] += 1
            continue
        l['fois'] = 1
        vus[l['fr']] = l
        L.append(l)
    # Numéros d'aide : ceux de la France (3018, 3114, e-enfance.org) ne
    # concernent pas les joueurs croates. L'encadré croate donne le 116 111.
    L = [l for l in L if not l['id'].startswith('RESSOURCES.liste')]
    L.append({'partie': 'Récapitulatif imprimable', 'num': 'R-HR1', 'id': 'RESSOURCES_HR.liste[0].txt',
              'contexte': 'Encadré « numéros d’aide » - à côté du 116 111',
              'fr': 'Hrabri telefon - écoute pour les enfants et les ados, gratuite et anonyme', 'fois': 1})
    for l in L:
        l['rem'] = remarques(l, None)
    # Pour remettre les traductions dans le jeu : chaque endroit du jeu, son
    # texte français et la ligne du tableau qui porte sa traduction.
    json.dump([{'num': l['num'], 'cle': l['id'], 'fr': l['fr'],
                'ligne': vus[l['fr']]['num'] if l['fr'] in vus else None} for l in TOUS],
              open(CLES, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)

    doc = Document()
    sec = doc.sections[0]
    sec.orientation = WD_ORIENT.LANDSCAPE
    sec.page_width, sec.page_height = Cm(29.7), Cm(21.0)
    for k in ('left_margin', 'right_margin'):
        setattr(sec, k, Cm(1.5))
    sec.top_margin = sec.bottom_margin = Cm(1.4)
    st = doc.styles['Normal']; st.font.name = 'Calibri'; st.font.size = Pt(10)
    st.element.rPr.rFonts.set(qn('w:eastAsia'), 'Calibri')

    # Pied de page : titre + numéro de page
    fp = sec.footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r = fp.add_run('Retrouver Clara - textes à traduire (FR → HR) · page '); r.font.size = Pt(8); r.font.color.rgb = GRIS
    for typ, txt in (('begin', None), (None, 'PAGE'), ('end', None)):
        rr = fp.add_run(); rr.font.size = Pt(8); rr.font.color.rgb = GRIS
        if typ:
            e = OxmlElement('w:fldChar'); e.set(qn('w:fldCharType'), typ); rr._r.append(e)
        else:
            e = OxmlElement('w:instrText'); e.set(qn('xml:space'), 'preserve'); e.text = txt; rr._r.append(e)

    para(doc, 'Retrouver Clara', 26, True, BLEU, 2)
    para(doc, 'Un jeu sur le harcèlement scolaire - textes à traduire du français vers le croate', 13, False, GRIS, 10)
    compte = OrderedDict()
    for l in L:
        compte[l['partie']] = compte.get(l['partie'], 0) + 1
    mots = sum(len(l['fr'].split()) for l in L)
    para(doc, f"Version du {datetime.date.today().strftime('%d/%m/%Y')} · {len(L)} phrases à traduire · environ {mots:,} mots".replace(',', ' '), 10, False, GRIS, 14)

    para(doc, 'Consignes', 15, True, BLEU, 6)
    for c in CONSIGNES:
        p = para(doc, c, 10, apres=3, style='List Bullet')

    para(doc, 'Contenu : ' + ' · '.join(f'{partie.split(" - ")[0]} ({nb})' for partie, nb in compte.items()),
         9.5, False, GRIS, 0).paragraph_format.space_before = Pt(6)

    for i, partie in enumerate(compte):
        h = para(doc, partie, 15, True, BLEU, 5)
        h.paragraph_format.keep_with_next = True
        h.paragraph_format.space_before = Pt(16)
        if i == 0:
            h.paragraph_format.page_break_before = True
        tableau(doc, [l for l in L if l['partie'] == partie])

    doc.save(OUT)
    print(OUT, len(L), 'phrases (sur', len(TOUS), 'textes),', mots, 'mots')


if __name__ == '__main__':
    main()
