# -*- coding: utf-8 -*-
"""
_extraire_textes.py - tous les textes français que voit le joueur, avec un
identifiant pour chacun. Sert au document de traduction (gen_traduction.py).

Trois sources :
  1. les fichiers de textes (via _textes_dump.json, écrit par dump_textes.js) ;
  2. le HTML des pages françaises (écrans d'introduction, consignes, boutons) ;
  3. les quelques phrases écrites en dur dans les scripts (TEXTES_EN_DUR).

Renvoie une liste de dicts : partie, ecran, id, fr, note.
"""
import json, re
from html.parser import HTMLParser

D = json.load(open('_textes_dump.json', encoding='utf-8'))

# ── 1. Fichiers de textes ────────────────────────────────────────────────────
# Clés qui ne sont pas du texte (identifiants, heures, couleurs, chemins, codes).
CLES_IGNOREES = {'id', 'avatar', 'type', 'l', 'e', 'spk', 'cls', 'icon', 'color', 'from',
                 'time', 'unread', 'section_id', 'photo', 'mdp', 'compte', 'key', 'handle',
                 'quizId', 'delay', 'likes', 'correct', 'emp', 'minScore', 'pdotCount',
                 'pdotActive', 'phase', 'senderColors', 'user', 'name', 'sender', 'qui',
                 'avatar', 'TYPES_DM', 'TYPES_PHOTO', 'enquete', 'secret', 'isContinue'}
# Clés dont la valeur est un chemin ou une adresse.
RE_PAS_TEXTE = re.compile(r'^(https?:|[\w./-]+\.(html|png|jpg|js)(\?|#|$)|#[0-9a-f]{3,8}$|[\d\s:.,/-]*$)', re.I)


def lettres(s):
    return bool(re.search(r'[A-Za-zÀ-ÿ]', s or ''))


def parcourir(obj, chemin, sortie, parent=None):
    """(chemin, texte, objet parent) ; le parent donne le locuteur (spk,
    sender, user, from, type) pour situer la réplique."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            # « Enzo et Théo » : deux prénoms, mais un « et » à traduire.
            if k in CLES_IGNOREES and not (k == 'qui' and isinstance(v, str) and ' et ' in v):
                continue
            parcourir(v, f'{chemin}.{k}' if chemin else k, sortie, obj)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            parcourir(v, f'{chemin}[{i}]', sortie, parent if not isinstance(v, (dict, list)) else None)
    elif isinstance(obj, str):
        if lettres(obj) and not RE_PAS_TEXTE.match(obj.strip()):
            sortie.append((chemin, obj, parent or {}))


# ── 2. HTML ──────────────────────────────────────────────────────────────────
class Textes(HTMLParser):
    """Nœuds de texte et attributs visibles, hors <script> et <style>. Le texte
    d'un même bloc (p, div, bouton…) forme une seule entrée, balises de mise en
    forme comprises (« Lis les <strong>messages</strong>… » reste une phrase).
    Chaque entrée est située par l'identifiant (ou la classe) le plus proche."""
    VIDES = {'br', 'img', 'input', 'meta', 'link', 'hr', 'source', 'wbr'}
    EN_LIGNE = {'strong', 'b', 'em', 'i', 'u', 'small', 'mark', 'code', 'sup', 'sub', 'abbr'}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.pile, self.sortie, self.cache, self.n = [], [], 0, 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        for att in ('placeholder', 'title', 'aria-label', 'alt'):
            if a.get(att) and lettres(a[att]):
                self.sortie.append((-1, self._ou(a), att, a[att]))
        if tag in self.VIDES:
            return
        self.n += 1
        self.pile.append((tag, a.get('id') or (a.get('class') or '').split(' ')[0], self.n))
        if tag in ('script', 'style', 'svg', 'title'):
            self.cache += 1

    def handle_endtag(self, tag):
        if tag in self.VIDES:
            return
        while self.pile:
            t, _, _ = self.pile.pop()
            if t in ('script', 'style', 'svg', 'title'):
                self.cache -= 1
            if t == tag:
                break

    def _ou(self, a=None):
        if a and (a.get('id') or a.get('class')):
            return a.get('id') or a.get('class').split(' ')[0]
        for t, i, _ in reversed(self.pile):
            if i:
                return i
        return ''

    def _bloc(self):
        for t, _, n in reversed(self.pile):
            if t not in self.EN_LIGNE:
                return n
        return 0

    def handle_data(self, data):
        if self.cache:
            return
        s = ' '.join(data.split())
        if s:
            self.sortie.append((self._bloc(), self._ou(), 'texte', s))


def textes_html(fichier):
    h = Textes()
    h.feed(open(fichier, encoding='utf-8-sig').read())
    res, bloc_prec = [], None
    for bloc, ou, att, s in h.sortie:
        if att == 'texte' and res and bloc == bloc_prec and res[-1][1] == 'texte':
            colle = s[:1] in ',.;:!?)»' or res[-1][2].endswith(('«', '('))
            res[-1] = (res[-1][0], 'texte', res[-1][2] + ('' if colle else ' ') + s)
        else:
            res.append((ou, att, s))
        bloc_prec = bloc if att == 'texte' else None
    return [r for r in res if lettres(r[2])]


# ── 3. Écrits en dur dans les scripts ────────────────────────────────────────
TEXTES_EN_DUR = {
    'index': [
        ('index.js', "Rien à sauvegarder pour l'instant"),
        ('index.js', 'Code inconnu - vérifie les 7 caractères.'),
        ('index.js', "Parle d'abord à Inès - c'est elle qui a les identifiants de Clara."),
        ('index.js', 'Kevin te donne le code du groupe à la fin de la Partie 2.'),
        ('index.js', "Il me faut le numéro de la tante de Clara. Comment l'obtenir ?"),
        ('index.js', "Lis d'abord le groupe Whatsupp."),
        ('index.js', "Reprendre l'enquête"),
        ('index.js', '↩ Continuer'),
    ],
    'p2': [
        ('2_Compte_de_Clara.html (connexion)', "Identifiants incorrects. Relis les messages d'Inès."),
    ],
    'p4': [
        ('4_Convaincre_Clara.html (appel)', 'Ce numéro ne répond pas.'),
    ],
}


def tout():
    lignes = []

    def ajouter(partie, ecran, ident, fr, parent=None):
        lignes.append({'partie': partie, 'ecran': ecran, 'id': ident, 'fr': fr,
                       'parent': parent or {}})

    pages = [('menu', 'Menu (accueil)', 'index.html'),
             ('p1', 'Partie 1 - Le téléphone d’Inès', '1_Telephone_Ines.html'),
             ('p2', 'Partie 2 - L’Instaclasse de Clara', '2_Compte_de_Clara.html'),
             ('p3', 'Partie 3 - Le groupe Whatsupp', '3_Groupe_Secret.html'),
             ('p4', 'Partie 4 - Convaincre Clara', '4_Convaincre_Clara.html'),
             ('recap', 'Récapitulatif imprimable', 'recapitulatif.html')]
    donnees = {'p1': [('TEXTES', D['p1']['TEXTES']), ('UI', D['p1']['UI'])],
               'p2': [('HARCEL_TYPES', D['p2']['HARCEL_TYPES']), ('CONVOS', D['p2']['CONVOS']),
                      ('photoData', D['p2']['photoData']), ('UI', D['p2']['UI'])],
               'p3': [('WA_DATA', D['p3']['WA_DATA']), ('UI', D['p3']['UI'])],
               'p4': [('TEXTES', D['p4']['TEXTES']), ('UI', D['p4']['UI'])],
               'recap': [('RESSOURCES', D['ressources'])]}
    for cle, titre, fichier in pages:
        for ou, att, s in textes_html(fichier):
            ajouter(titre, f'Écran : {ou or "page"}' + ('' if att == 'texte' else f' ({att})'),
                    f'{fichier}#{ou}' + ('' if att == 'texte' else f'@{att}'), s)
        for f, s in TEXTES_EN_DUR.get(cle if cle != 'menu' else 'index', []):
            ajouter(titre, 'Message affiché par le jeu', f, s)
        for nom, obj in donnees.get(cle, []):
            sortie = []
            parcourir(obj, nom, sortie)
            for chemin, s, parent in sortie:
                ajouter(titre, 'Données', chemin, s, parent)
    # Partie 4 : le rappel (après un raccroché) est rangé dans le fichier
    # avant le premier appel ; on le remet après sa scène, dans l'ordre du jeu.
    rappels = [l for l in lignes if '.dialogueRappel[' in l['id']]
    if rappels:
        lignes = [l for l in lignes if l not in rappels]
        scene = rappels[0]['id'].split('.dialogueRappel')[0] + '.'
        fin = max(i for i, l in enumerate(lignes) if l['id'].startswith(scene))
        lignes[fin + 1:fin + 1] = rappels
    # Numérotation stable : P1-001…
    pref = {'Menu': 'M', 'Partie 1': 'P1', 'Partie 2': 'P2', 'Partie 3': 'P3', 'Partie 4': 'P4', 'Récap': 'R'}
    compte = {}
    for l in lignes:
        p = next(v for k, v in pref.items() if l['partie'].startswith(k))
        compte[p] = compte.get(p, 0) + 1
        l['num'] = f'{p}-{compte[p]:03d}'
    return lignes


if __name__ == '__main__':
    L = tout()
    for l in L:
        print(l['num'], '|', l['id'][:60], '|', l['fr'][:90].replace('\n', '⏎'))
    print(len(L), 'textes')
