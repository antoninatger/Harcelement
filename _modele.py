# -*- coding: utf-8 -*-
"""
_modele.py - construit le plan du document partenaires à partir du jeu lui-même.

Le document était tapé à la main : il a dérivé dès la première modification des
textes. Ici, tout vient de _textes_dump.json, produit par dump_textes.js à
partir des fichiers de jeu. Le document ne peut donc plus être faux.

Le plan est une liste de blocs ; gen_doc.py les rend en .docx et en .html.
"""
import json, re, datetime

D = json.load(open('_textes_dump.json', encoding='utf-8'))

# Les textes portent les marques d'accord de prenom.js : on rend la forme
# masculine (Léo), celle par défaut du jeu.
def net(s):
    if not isinstance(s, str): return s
    s = re.sub(r'\{([^{}|]*)\|[^{}]*\}', r'\1', s)
    return s.replace('{e}', '')

B = []
def bloc(*a): B.append(a)

MOIS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']
d = datetime.date.today()
DATE = "%d %s %d" % (d.day, MOIS[d.month-1], d.year)

# ── Couverture ──────────────────────────────────────────────────────────────
bloc('cover', 'Retrouver Clara',
     'Textes complets - Parties 1, 2, 3 et 4\nDocument à destination des partenaires',
     'Version du %s  ·  Usage interne' % DATE)

bloc('h2', 'Présentation générale')
bloc('p', "Retrouver Clara est un jeu pédagogique destiné aux collégiens sur le thème du "
          "harcèlement scolaire et de son prolongement en ligne. Le joueur incarne Léo - ou Léa, "
          "au choix - un ami de Clara, quatorze ans, qui ne vient plus au collège depuis presque une semaine. "
          "En traversant quatre scènes, il reconstitue ce qu'elle a vécu et apprend à lui parler.")
bloc('p', "Ce document présente l'intégralité des textes jouables des quatre parties, tels qu'ils "
          "apparaissent à l'écran.")
bloc('note', "Ce document est produit automatiquement à partir des fichiers du jeu "
             "(dump_textes.js puis gen_doc.py). Il ne se met pas à jour tout seul : relancez la "
             "génération après chaque modification des textes, et il restera exact.")

bloc('h2', 'Structure du jeu')
bloc('table', ['Partie', 'Titre', 'Mécanique', 'Durée'], [
    ['1', "Le téléphone d'Inès", "Dialogue à choix, jauge de confiance", "5–8 min"],
    ['2', "L'Instaclasse de Clara", "Exploration, identification de 6 types sur 9, signalement", "12–18 min"],
    ['3', "Le groupe Whatsupp secret", "Lecture au rythme du joueur, 5 comptes à démasquer, 2 QCM", "8–12 min"],
    ['4', "Convaincre Clara", "Dialogue d'empathie, 8 scènes, 3 fins", "8–12 min"],
])
bloc('p', "Le jeu se termine sur un récapitulatif imprimable (recapitulatif.html) qui reprend ce que "
          "le groupe a identifié, les numéros d'aide, et deux lignes à compléter à la main.")

# ── PARTIE 1 ────────────────────────────────────────────────────────────────
T1 = D['p1']['TEXTES']; U1 = D['p1']['UI']
bloc('h1', 'Partie 1', "Le téléphone d'Inès")
bloc('p', "Léo écrit à Inès, la meilleure amie de Clara. Une jauge de confiance monte ou descend à "
          "chaque réponse. Sous −3, Inès coupe la conversation ; sous −2, une crise de confiance se "
          "déclenche une seule fois.")

bloc('h2', 'Ouverture')
for m in T1['ouverture']:
    bloc('dial', 'leo' if m['type'] == 's' else 'ines',
         'Léo' if m['type'] == 's' else 'Inès', net(m['t']))

for i, g in enumerate(T1['G']):
    bloc('h2', 'Échange %d sur %d' % (i + 1, len(T1['G'])))
    for ligne in g.get('intro', []):
        bloc('dial', 'ines', 'Inès', net(ligne))
    if g.get('edu'):
        bloc('pensee', net(g['edu']))
    bloc('prompt', T1['choiceHint'])
    for c in g['c']:
        kind = 'good' if c['e'] > 0 else ('bad' if c['e'] < 0 else 'ok')
        bloc('choix', kind, c['l'], net(c['t']),
             ('confiance %+d' % c['e']),
             net(c['r']) if c.get('r') else None, 'Inès')

CR = T1['CRISIS']
bloc('h2', 'Crise de confiance (une seule fois, si la confiance passe sous −2)')
for ligne in CR['intro']:
    bloc('dial', 'ines', 'Inès', net(ligne))
bloc('prompt', T1['choiceHintCrise'])
for c in CR['c']:
    kind = 'good' if c['e'] > 0 else ('bad' if c['e'] < 0 else 'ok')
    bloc('choix', kind, c['l'], net(c['t']), 'confiance %+d' % c['e'], None, 'Inès')

F = T1['fins']
bloc('h2', 'Les cinq fins de la Partie 1')
bloc('fin', 'neutral', F['imm']['titre'], [net(F['imm']['corps'])])
bloc('fin', 'bad', F['blocage']['titre'], [net(F['blocage']['ines']), net(F['blocage']['sys'])])
bloc('fin', 'bad', F['echec']['titre'], [net(F['echec']['ines']), net(F['echec']['sys'])])
for cle, kind in [('fragile', 'ok'), ('succes', 'good')]:
    f = F[cle]
    lignes = [net(f['p1ines']), '→ ' + net(f['p1leo'])]
    if f.get('p1suite'): lignes.append(net(f['p1suite']))
    lignes += [net(f['p2ines']), '→ ' + net(f['p2leo']), net(f['codesMsg']),
               'Identifiants remis : %s / %s' % (f['ig']['compte'], f['ig']['mdp']),
               net(f['ig']['warn'])]
    bloc('fin', kind, f['titre'], lignes)

bloc('h2', "Deuxième conversation avec Inès (après la Partie 3)")
S = U1['secondConvo']
bloc('p', "Elle s'ouvre quand le joueur revient sur la Partie 1 après avoir lu le groupe Whatsupp (et, une fois le numéro obtenu, elle se réaffiche d'emblée, déjà résolue). "
          "Le joueur écrit librement ; les mots acceptés sont « tante », « campagne », « havre » et "
          "« secret ».")
bloc('dial', 'leo', 'Léo', net(S['playerMsg']))
bloc('dial', 'ines', 'Inès', net(S['q']))
bloc('p', "Si le joueur parle du « havre secret » :")
bloc('dial', 'ines', 'Inès', ' '.join(net(t) for t in S['foundHavre']))
bloc('p', "S'il parle de la tante ou de la campagne :")
bloc('dial', 'ines', 'Inès', ' '.join(net(t) for t in S['foundTante']))
bloc('dial', 'ines', 'Inès', ' '.join(net(t) for t in S['foundSuite']) + ' 04 54 78 95 32 ' + net(S['apresNumero']))
bloc('dial', 'ines', 'Inès', 'Si la réponse ne convient pas : « %s »' % net(S['wrongAnswer']))

bloc('h2', "Ce que le joueur apprend sur Clara")
for r in T1['REVELATIONS']:
    bloc('carte', r['icon'] + ' ' + r['title'], net(r['txt']))

# ── PARTIE 2 ────────────────────────────────────────────────────────────────
P2 = D['p2']; U2 = P2['UI']
bloc('h1', 'Partie 2', "L'Instaclasse de Clara")
bloc('p', "Le joueur se connecte au compte de Clara avec les identifiants qu'Inès lui a donnés. Un "
          "avertissement de contenu s'affiche avant l'exploration. Après deux photos et deux "
          "conversations ouvertes, le jeu demande ce qu'il observe ; puis la mission commence.")
bloc('p', "Objectif : identifier six des neuf types de harcèlement. Chaque conversation de harceleur "
          "peut être signalée (capture, blocage, signalement, adulte). En sortant, un écran revient "
          "sur ce que le joueur vient de faire du compte de Clara.")

bloc('h2', 'Les neuf types de harcèlement')
for k, t in P2['HARCEL_TYPES'].items():
    bloc('carte', t['icon'] + ' ' + t['label'], t['desc'])

bloc('h2', 'Messages directs reçus par Clara')
bloc('note', "Les conversations sont rangées de la plus récente à la plus ancienne. Le type indiqué "
             "entre crochets est celui que le joueur doit retrouver ; les conversations sans type ne "
             "sont pas identifiables (elles font le nombre et le climat).")

def type_de(txt, carte):
    n = txt.lower()
    for e in carte:
        f = e['frag'].lower()
        if f in n.replace("'", '').replace('’', ''): return e['type']
    return None

import unicodedata
def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return s.replace('œ', 'oe').replace("'", '').replace('’', '')

section = None
for c in P2['CONVOS']:
    if c.get('section'):
        section = c['section']; bloc('h3', section)
    if c['id'] == 99:
        continue
    types = []
    for m in c['messages']:
        nm = norm(m['text'])
        for e in P2['HARCEL_MAP']:
            if norm(e['frag']) in nm and e['type'] not in types:
                types.append(e['type'])
    lib = ', '.join(P2['HARCEL_TYPES'][t]['label'] for t in types) if types else None
    bloc('dm', c['name'], c['time'], lib, [net(m['text']) for m in c['messages']],
         c['id'] == 30)

j = [c for c in P2['CONVOS'] if c['id'] == 99][0]
bloc('h2', 'Message de Kevin (se débloque à six types identifiés)')
for m in j['messages']:
    bloc('dial', 'kevin', 'Kevin', net(m['text']))
bloc('note', "Un bouton en bas du fil ouvre l'écran du code d'accès du groupe Whatsupp (4827), "
             "envoyé par Kevin, qui ouvre la Partie 3.")

bloc('h2', 'Publications et commentaires')
for i, ph in enumerate(P2['photoData']):
    lignes = ['%s - %s' % (c['user'], net(c['text'])) for c in ph.get('comments', [])]
    bloc('photo', i, net(ph['caption']), ph['likes'], lignes)

bloc('h2', "Points d'analyse (QCM)")
bloc('note', "Ils se déclenchent à la première ouverture des conversations et des photos concernées. "
             "Le type est acquis même sur une mauvaise réponse : l'explication vient d'être lue, et une "
             "erreur ne doit pas fermer l'accès à la suite.")
QT = {'4': 'menaces', '7': 'rumeurs', '11': 'manipulation', '22': 'exclusion', '23': None}
for cle, q in P2['QUIZZES'].items():
    conv = [c for c in P2['CONVOS'] if str(c['id']) == str(cle)]
    ou = 'conversation « %s »' % conv[0]['name'] if conv else 'conversation %s' % cle
    bloc('quiz', ou, net(q['question']), [net(o) for o in q['options']], q['correct'], net(q['explanation']))
for cle, q in P2['PHOTO_QUIZZES'].items():
    ph = P2['photoData'][int(cle)]
    bloc('quiz', 'photo « %s »' % net(ph['caption']), net(q['question']),
         [net(o) for o in q['options']], q['correct'], net(q['explanation']))

bloc('h2', 'Signalement')
bloc('p', "Sur chaque conversation de harceleur, un bouton « %s » ouvre les trois gestes, dans "
          "l'ordre qui compte." % U2['reportBtn'])
bloc('bullet', "Faire une capture d'écran d'abord - une fois le compte signalé ou bloqué, on perd "
               "l'accès aux messages, et ce sont eux la preuve.")
bloc('bullet', "Bloquer le compte.")
bloc('bullet', "Signaler au réseau, puis en parler à un adulte. Un signalement seul suffit rarement.")
bloc('p', net(U2['reportAfter']))

# ── PARTIE 3 ────────────────────────────────────────────────────────────────
W = D['p3']['WA_DATA']
bloc('h1', 'Partie 3', 'Le groupe Whatsupp secret - « %s »' % W['group']['name'])
bloc('p', "Le joueur lit les échanges à son rythme : chaque message attend un appui. Membres : %s."
          % W['group']['subtitle'])
bloc('h2', 'Avertissement puis mission')
bloc('p', net(W['warning']['body']))
bloc('p', net(W['mission']['body']))

bloc('h2', 'Les cinq comptes anonymes à démasquer')
bloc('note', net(W['comptes']['cardNote']))
for e in W['comptes']['liste']:
    bloc('compte', '@' + e['handle'], e['qui'])

bloc('h2', 'La conversation')
for m in W['messages']:
    t = m.get('type')
    if t == 'time-sep':
        bloc('sep', net(m['text']))
    elif t == 'system':
        bloc('note', net(m['text']))
    elif t == 'post-card':
        bloc('note', "[ Publication Instaclasse partagée dans le groupe : « %s » ]"
             % net(W['postCard']['caption']))
    elif t == 'quiz':
        q = W['quizzes'][m['quizId']]
        bloc('quiz', 'point d\'analyse « %s »' % m['quizId'], net(q['question']),
             [net(o) for o in q['options']], q['correct'], net(q['explanation']))
    elif t == 'end':
        pass
    else:
        bloc('dial', m['sender'].lower(), m['sender'], net(m['text']))

bloc('h2', 'Commentaires qui envahissent la publication')
for c in W['postComments']:
    bloc('dial', 'anon', c['user'], net(c['text']))

bloc('h2', 'Fin de la Partie 3')
bloc('p', net(W['endMessage']['title']))
for pt in W['endMessage']['points']:
    bloc('bullet', net(pt))
bloc('p', net(W['endMessage']['note']))
bloc('h3', net(W['synthesis']['title']))
for it in W['synthesis']['items']:
    bloc('carte', it['icon'] + ' ' + it['type'], net(it['exp']))
K = W['kevin']
bloc('h3', K['icon'] + ' ' + net(K['title']))
bloc('p', net(K['body']))
for it in K['items']:
    bloc('bullet', net(it))
bloc('note', net(K['note']))
M = W['mobile']
bloc('h3', M['icon'] + ' ' + net(M['title']))
bloc('p', net(M['corps'] if 'corps' in M else M['body']))

# ── PARTIE 4 ────────────────────────────────────────────────────────────────
T4 = D['p4']['TEXTES']
bloc('h1', 'Partie 4', 'Convaincre Clara')
bloc('p', net(T4['titre']['sub']))
bloc('h2', "Composer le numéro")
bloc('p', "L'écran d'appel demande le numéro de la tante, que seule Inès peut donner (Partie 1, "
          "après la Partie 3). À chaque numéro faux, une pensée de Léo apparaît :")
for pe in T4['titre']['pensees']:
    bloc('bullet', net(pe))
bloc('note', "« Accéder directement » n'apparaît qu'après la troisième pensée.")

LOC = {k: v for k, v in T4['locuteurs'].items()}
for sc in T4['SCENES']:
    titre = net(sc['phaseName']) + (' - ' + net(sc['stepLabel']) if sc.get('stepLabel') else '')
    bloc('h2', titre)
    for l in sc['dialogueBefore']:
        who = l['spk']
        bloc('dial', 'narr' if who == 'narrator' else who,
             '' if who == 'narrator' else LOC.get(who, who), net(l['txt']),
             who == 'narrator')
    if sc.get('prompt'):
        bloc('prompt', net(sc['prompt']))
    for c in sc.get('choices', []):
        kind = {2: 'good', 1: 'ok', 0: 'bad'}.get(c['emp'], 'neutral')
        rep = net(c['reply']['txt']) if c.get('reply') else None
        bloc('choix', kind, {2: '++', 1: '+', 0: '–'}.get(c['emp'], '?'), net(c['txt']),
             net(c['fb']['msg']) if c.get('fb') else None, rep,
             LOC.get(c['reply']['spk'], '') if c.get('reply') else '')
        if c.get('recovery'):
            r = c['recovery']
            bloc('rattrapage', net(r['auntLine']),
                 net(r['good']['txt']), net(r['good']['reply']['txt']),
                 net(r['bad']['txt']), net(r['bad']['reply']['txt']))

bloc('h2', 'Les fins')
for f in T4['fins']:
    kind = f['cls'] if f['cls'] in ('good', 'ok', 'bad') else 'neutral'
    bloc('fin', kind, '%s %s (empathie ≥ %d sur 10)' % (f['icon'], net(f['titre']), f['minScore']),
         [net(f['corps']), net(f['citation'])])
G = T4['gameover']
bloc('fin', 'neutral', G['icon'] + ' ' + net(G['titre']),
     [net(G['corps']), net(G['lecon'])])
bloc('note', "Les cœurs et le score chiffré ont été retirés : le joueur ne voit que le retour écrit "
             "après chaque réponse. Le compte d'empathie reste interne et choisit la fin.")

S4 = T4['suite']
bloc('h2', S4['icon'] + ' ' + net(S4['titre']))
for it in S4['items']:
    bloc('bullet', net(it))
E4 = T4['epilogue']
bloc('h2', E4['icon'] + ' ' + net(E4['titre']))
bloc('p', net(E4['corps']))

R = D['ressources']
bloc('h2', R['titre'])
for r in R['liste']:
    bloc('ressource', r['label'], r['txt'])
bloc('note', "Ces numéros sont dans ressources.js - c'est le seul fichier à modifier pour adapter le "
             "jeu à un autre pays. La version anglaise (ressources_en.js) donne les numéros européens.")
