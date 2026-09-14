#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
edit_textes.py  -  Éditeur graphique pour 1_Telephone_Ines_textes.js
Double-clique pour lancer.
"""

import os, sys, json, subprocess
import tkinter as tk
from tkinter import ttk, messagebox

# ── Couleurs ────────────────────────────────────────────────────────────────
BG      = '#0f172a'
SURFACE = '#1e293b'
BORDER  = '#334155'
TEXT    = '#e2e8f0'
DIM     = '#64748b'
ACCENT  = '#3b82f6'
RED_BG  = '#2d1a1a'
RED_FG  = '#f87171'

DIR = os.path.dirname(os.path.abspath(__file__))
JS  = os.path.join(DIR, '1_Telephone_Ines_textes.js')

MSG_TYPES = [('s','→ Envoyé'), ('r','← Reçu'), ('sy','● Système'), ('cr','⚠ Crise'), ('ed','📋 Info')]
EFF_OPTS  = [(-2,'−2'), (-1,'−1'), (0,'0'), (1,'+1'), (2,'+2')]

# ── Auto-install json5 ───────────────────────────────────────────────────────
def get_json5():
    try:
        import json5
        return json5
    except ImportError:
        print("Installation de json5 (première fois uniquement)...")
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'json5', '-q'])
        import json5
        return json5

# ── Application ──────────────────────────────────────────────────────────────
class App:
    def __init__(self, root):
        self.root  = root
        self.T     = None
        self.json5 = get_json5()

        root.title("Éditeur Textes - Inès")
        root.configure(bg=BG)
        root.geometry("940x680")
        root.minsize(700, 500)

        # Style ttk
        style = ttk.Style()
        style.theme_use('clam')
        style.configure('TCombobox', fieldbackground='#0f172a', background=SURFACE,
                        foreground=TEXT, selectbackground=ACCENT)
        style.configure('TScrollbar', background=SURFACE, troughcolor=BG, bordercolor=BG)

        self._build_ui()
        self._load()

    # ── UI ────────────────────────────────────────────────────────────────────

    def _build_ui(self):
        # Barre du haut
        bar = tk.Frame(self.root, bg=SURFACE, pady=8)
        bar.pack(fill='x')
        tk.Label(bar, text="✏  Éditeur - Inès", bg=SURFACE, fg=TEXT,
                 font=('Segoe UI', 12, 'bold')).pack(side='left', padx=16)
        tk.Button(bar, text="💾  Sauvegarder", bg=ACCENT, fg='white',
                  font=('Segoe UI', 10, 'bold'), relief='flat', padx=14, pady=4,
                  cursor='hand2', command=self._save).pack(side='right', padx=14)

        # Corps principal
        body = tk.Frame(self.root, bg=BG)
        body.pack(fill='both', expand=True)

        # Sidebar
        self.nav_btns = {}
        sidebar = tk.Frame(body, bg=SURFACE, width=155)
        sidebar.pack(side='left', fill='y')
        sidebar.pack_propagate(False)

        tabs = [
            ('general',     '⚙  Général'),
            ('ouverture',   '💬  Ouverture'),
            ('scenario',    '📖  Scénario G'),
            ('crisis',      '⚠  Crise'),
            ('revelations', '📋  Révélations'),
            ('fins',        '🏁  Fins'),
        ]
        for key, label in tabs:
            btn = tk.Button(sidebar, text=label, bg=SURFACE, fg='#94a3b8',
                            font=('Segoe UI', 10), relief='flat', anchor='w',
                            padx=14, pady=9, cursor='hand2',
                            command=lambda k=key: self._show(k))
            btn.pack(fill='x', padx=4, pady=2)
            self.nav_btns[key] = btn

        # Zone de contenu scrollable
        wrap = tk.Frame(body, bg=BG)
        wrap.pack(fill='both', expand=True)

        self.canvas = tk.Canvas(wrap, bg=BG, highlightthickness=0)
        vsb = ttk.Scrollbar(wrap, orient='vertical', command=self.canvas.yview)
        self.canvas.configure(yscrollcommand=vsb.set)
        vsb.pack(side='right', fill='y')
        self.canvas.pack(side='left', fill='both', expand=True)

        self.pane = tk.Frame(self.canvas, bg=BG)
        self._win = self.canvas.create_window((0, 0), window=self.pane, anchor='nw')

        self.pane.bind('<Configure>',
                       lambda e: self.canvas.configure(scrollregion=self.canvas.bbox('all')))
        self.canvas.bind('<Configure>',
                         lambda e: self.canvas.itemconfig(self._win, width=e.width))
        self.canvas.bind_all('<MouseWheel>',
                             lambda e: self.canvas.yview_scroll(-1*(e.delta//120), 'units'))

    # ── Chargement / sauvegarde ───────────────────────────────────────────────

    def _load(self):
        if not os.path.exists(JS):
            messagebox.showerror("Erreur", f"Fichier introuvable :\n{JS}")
            return
        with open(JS, 'r', encoding='utf-8-sig') as f:
            content = f.read()
        start, end = content.find('{'), content.rfind('}')
        try:
            self.T = self.json5.loads(content[start:end+1])
        except Exception as e:
            messagebox.showerror("Erreur de parsing", str(e))
            return
        self._show('general')

    def _save(self):
        if not self.T:
            return
        with open(JS, 'w', encoding='utf-8') as f:
            f.write('var TEXTES = ' + json.dumps(self.T, ensure_ascii=False, indent=2) + ';\n')
        messagebox.showinfo("Sauvegardé", f"✓  {os.path.basename(JS)} mis à jour.")

    # ── Navigation ────────────────────────────────────────────────────────────

    def _show(self, tab):
        for k, btn in self.nav_btns.items():
            btn.configure(bg='#1d4ed8' if k == tab else SURFACE,
                          fg='white'   if k == tab else '#94a3b8')
        for w in self.pane.winfo_children():
            w.destroy()
        self.canvas.yview_moveto(0)
        if self.T:
            {'general':     self._tab_general,
             'ouverture':   self._tab_ouverture,
             'scenario':    self._tab_scenario,
             'crisis':      self._tab_crisis,
             'revelations': self._tab_revelations,
             'fins':        self._tab_fins,
             }.get(tab, lambda: None)()
        self._cur_tab = tab

    # ── Helpers UI ────────────────────────────────────────────────────────────

    def _section(self, title):
        tk.Label(self.pane, text=title, bg=BG, fg=TEXT,
                 font=('Segoe UI', 12, 'bold')).pack(anchor='w', padx=20, pady=(16,4))
        tk.Frame(self.pane, bg=BORDER, height=1).pack(fill='x', padx=20, pady=(0,10))

    def _card(self, title=None):
        outer = tk.Frame(self.pane, bg=SURFACE)
        outer.pack(fill='x', padx=20, pady=5)
        if title:
            tk.Label(outer, text=title, bg=SURFACE, fg=DIM,
                     font=('Segoe UI', 9, 'bold')).pack(anchor='w', padx=12, pady=(8,2))
        inner = tk.Frame(outer, bg=SURFACE)
        inner.pack(fill='x', padx=12, pady=(0,10))
        return inner

    def _field(self, parent, label, obj, key, multi=False):
        row = tk.Frame(parent, bg=SURFACE)
        row.pack(fill='x', pady=3)
        tk.Label(row, text=label, bg=SURFACE, fg=DIM,
                 font=('Segoe UI', 9), width=20, anchor='w').pack(side='left')
        val = obj[key] if isinstance(obj, list) else obj.get(key, '')
        if multi:
            t = tk.Text(row, bg='#0f172a', fg=TEXT, insertbackground=TEXT,
                        font=('Segoe UI', 10), relief='flat', bd=4, height=3, wrap='word')
            t.insert('1.0', val or '')
            t.pack(side='left', fill='x', expand=True)
            t.bind('<KeyRelease>', lambda e, o=obj, k=key, w=t:
                   (o.__setitem__(k, w.get('1.0','end-1c'))))
        else:
            v = tk.StringVar(value=val or '')
            e = tk.Entry(row, textvariable=v, bg='#0f172a', fg=TEXT,
                         insertbackground=TEXT, font=('Segoe UI', 10), relief='flat', bd=4)
            e.pack(side='left', fill='x', expand=True)
            v.trace_add('write', lambda *a, o=obj, k=key, sv=v:
                        o.__setitem__(k, sv.get()))

    def _add_btn(self, parent, text, cmd):
        tk.Button(parent, text=text, bg='#0f172a', fg=DIM,
                  font=('Segoe UI', 9), relief='flat', cursor='hand2',
                  bd=1, pady=6, command=cmd).pack(fill='x', padx=20, pady=4)

    def _del_btn(self, parent, text, cmd):
        tk.Button(parent, text=text, bg=RED_BG, fg=RED_FG,
                  font=('Segoe UI', 9), relief='flat', cursor='hand2',
                  command=cmd).pack(anchor='e', pady=(4,0))

    # ── Onglet Général ────────────────────────────────────────────────────────

    def _tab_general(self):
        self._section('Général')

        c = self._card('Contact')
        for k, lbl in [('name','Nom'), ('avatar','Avatar'),
                        ('statusOnline','En ligne'), ('statusTyping','Écrit…')]:
            self._field(c, lbl, self.T['contact'], k)

        tl = self._card('Labels de confiance  (index 0 = −4  …  4 = neutre  …  8 = +4)')
        labels_off = ['−4','−3','−2','−1',' 0','+1','+2','+3','+4']
        for i, lbl in enumerate(self.T['trustLabels']):
            row = tk.Frame(tl, bg=SURFACE); row.pack(fill='x', pady=2)
            tk.Label(row, text=labels_off[i], bg=SURFACE, fg=DIM,
                     font=('Segoe UI', 9, 'bold'), width=4).pack(side='left')
            v = tk.StringVar(value=lbl)
            tk.Entry(row, textvariable=v, bg='#0f172a', fg=TEXT,
                     insertbackground=TEXT, font=('Segoe UI', 10),
                     relief='flat', bd=4).pack(side='left', fill='x', expand=True)
            v.trace_add('write', lambda *a, i=i, sv=v:
                        self.T['trustLabels'].__setitem__(i, sv.get()))

        ui = self._card("Textes d'interface")
        for k, lbl in [('trustInitial','Confiance init.'), ('choiceHint','Hint choix'),
                        ('choiceHintCrise','Hint crise'), ('restartBtn','Bouton restart'),
                        ('revelationsHeader','En-tête révél.')]:
            self._field(ui, lbl, self.T, k)

    # ── Onglet Ouverture ──────────────────────────────────────────────────────

    def _tab_ouverture(self):
        self._section("Séquence d'ouverture")
        self._msg_list(self.T['ouverture'], 'ouverture')

    # ── Onglet Scénario ───────────────────────────────────────────────────────

    def _tab_scenario(self):
        self._section('Scénario principal (G)')
        for i, step in enumerate(self.T['G']):
            self._step_block(i, step)
        self._add_btn(self.pane, '+ Ajouter une étape', lambda: (
            self.T['G'].append({'intro':[''],'c':[{'l':'A','t':'','e':1},{'l':'B','t':'','e':-1}]}),
            self._show('scenario')))

    def _step_block(self, i, step):
        outer = tk.Frame(self.pane, bg=SURFACE)
        outer.pack(fill='x', padx=20, pady=5)

        preview = (step.get('intro') or [''])[0][:55]
        hdr  = tk.Frame(outer, bg='#263448', cursor='hand2')
        hdr.pack(fill='x')
        tk.Label(hdr, text=f'  Étape {i}', bg='#1d4ed8', fg='white',
                 font=('Segoe UI', 9, 'bold'), padx=8, pady=7).pack(side='left')
        tk.Label(hdr, text=preview, bg='#263448', fg=DIM,
                 font=('Segoe UI', 9, 'italic')).pack(side='left', padx=8)
        arr_var = tk.StringVar(value='▼')
        tk.Label(hdr, textvariable=arr_var, bg='#263448', fg=DIM,
                 font=('Segoe UI', 9)).pack(side='right', padx=8)

        body = tk.Frame(outer, bg=SURFACE)
        def toggle(e=None):
            if body.winfo_ismapped():
                body.pack_forget(); arr_var.set('▼')
            else:
                body.pack(fill='x', padx=12, pady=8); arr_var.set('▲')
        for w in [hdr] + hdr.winfo_children():
            w.bind('<Button-1>', toggle)

        # Intro messages
        tk.Label(body, text="Messages d'Inès (intro)", bg=SURFACE, fg=DIM,
                 font=('Segoe UI', 9, 'bold')).pack(anchor='w', pady=(2,2))
        self._intro_rows(body, step.get('intro', []), 'scenario')

        # Choices
        tk.Label(body, text='Choix', bg=SURFACE, fg=DIM,
                 font=('Segoe UI', 9, 'bold')).pack(anchor='w', pady=(8,2))
        self._choice_rows(body, step['c'], 'scenario')

        # Delete step
        tk.Button(body, text=f'× Supprimer l\'étape {i}', bg=RED_BG, fg=RED_FG,
                  font=('Segoe UI', 9), relief='flat', cursor='hand2',
                  command=lambda: (self.T['G'].pop(i), self._show('scenario'))
                  ).pack(fill='x', pady=(8,0))

    # ── Onglet Crise ──────────────────────────────────────────────────────────

    def _tab_crisis(self):
        self._section('Crise de confiance')
        tk.Label(self.pane, text="Messages d'intro", bg=BG, fg=DIM,
                 font=('Segoe UI', 9)).pack(anchor='w', padx=20)
        self._intro_rows(self.pane, self.T['CRISIS']['intro'], 'crisis', padx=20)
        tk.Label(self.pane, text='Choix', bg=BG, fg=DIM,
                 font=('Segoe UI', 9)).pack(anchor='w', padx=20, pady=(10,0))
        self._choice_rows(self.pane, self.T['CRISIS']['c'], 'crisis', padx=20)

    # ── Onglet Révélations ────────────────────────────────────────────────────

    def _tab_revelations(self):
        self._section('Révélations')
        for i, rev in enumerate(self.T['REVELATIONS']):
            c = self._card(f'Révélation {i+1}')
            self._field(c, 'Icône',  rev, 'icon')
            self._field(c, 'Titre',  rev, 'title')
            self._field(c, 'Texte',  rev, 'txt', multi=True)
            self._del_btn(c, '× Supprimer', lambda i=i: (
                self.T['REVELATIONS'].pop(i), self._show('revelations')))
        self._add_btn(self.pane, '+ Ajouter une révélation', lambda: (
            self.T['REVELATIONS'].append({'icon':'❓','title':'','txt':''}),
            self._show('revelations')))

    # ── Onglet Fins ───────────────────────────────────────────────────────────

    def _tab_fins(self):
        self._section('Fins')
        labels = {'imm':'🔵 Fin immédiate','blocage':'🔴 Blocage',
                  'succes':'🟢 Succès','fragile':'🟡 Succès fragile','echec':'🔴 Échec'}
        for key, title in labels.items():
            c = self._card(title)
            self._fin_fields(c, self.T['fins'][key])

    def _fin_fields(self, parent, obj, prefix=''):
        for k, v in obj.items():
            if isinstance(v, str):
                self._field(parent, prefix + k, obj, k, multi=len(v) > 70)
            elif isinstance(v, dict):
                tk.Label(parent, text=f'- {k} -', bg=SURFACE, fg=DIM,
                         font=('Segoe UI', 8)).pack(anchor='w', pady=(6,0))
                self._fin_fields(parent, v, prefix=k+'.')

    # ── Listes réutilisables ──────────────────────────────────────────────────

    def _msg_list(self, arr, tab, parent=None):
        if parent is None:
            parent = self.pane
        frame = tk.Frame(parent, bg=BG)
        frame.pack(fill='x', padx=20)

        type_map  = {v: l for v, l in MSG_TYPES}
        type_vals = [v for v, _ in MSG_TYPES]
        type_lbls = [l for _, _ in MSG_TYPES]
        type_lbl_map = {v: l for v, l in MSG_TYPES}
        type_val_map = {l: v for v, l in MSG_TYPES}

        for i, msg in enumerate(arr):
            row = tk.Frame(frame, bg=SURFACE, pady=3)
            row.pack(fill='x', pady=3)

            cb = ttk.Combobox(row, values=[l for _,l in MSG_TYPES],
                              width=13, state='readonly', font=('Segoe UI', 9))
            cb.set(type_lbl_map.get(msg.get('type','s'), MSG_TYPES[0][1]))
            cb.pack(side='left', padx=(6,4), pady=4)
            def on_type(e, i=i, c=cb):
                arr[i]['type'] = type_val_map.get(c.get(), 's')
            cb.bind('<<ComboboxSelected>>', on_type)

            v = tk.StringVar(value=msg.get('t',''))
            tk.Entry(row, textvariable=v, bg='#0f172a', fg=TEXT,
                     insertbackground=TEXT, font=('Segoe UI', 10),
                     relief='flat', bd=4).pack(side='left', fill='x', expand=True, padx=4)
            v.trace_add('write', lambda *a, i=i, sv=v: arr[i].__setitem__('t', sv.get()))

            tk.Button(row, text='×', bg=RED_BG, fg=RED_FG,
                      font=('Segoe UI', 11, 'bold'), relief='flat', cursor='hand2', padx=6,
                      command=lambda i=i: (arr.pop(i), self._show(tab))
                      ).pack(side='right', padx=4)

        tk.Button(frame, text='+ Ajouter un message', bg='#0f172a', fg=DIM,
                  font=('Segoe UI', 9), relief='flat', cursor='hand2', bd=1, pady=6,
                  command=lambda: (arr.append({'t':'','type':'s'}), self._show(tab))
                  ).pack(fill='x', pady=4)

    def _intro_rows(self, parent, arr, tab, padx=0):
        frame = tk.Frame(parent, bg=SURFACE if padx == 0 else BG)
        frame.pack(fill='x', padx=padx)
        for i, txt in enumerate(arr):
            row = tk.Frame(frame, bg='#0f172a', pady=3)
            row.pack(fill='x', pady=2)
            v = tk.StringVar(value=txt)
            tk.Entry(row, textvariable=v, bg='#0f172a', fg=TEXT,
                     insertbackground=TEXT, font=('Segoe UI', 10),
                     relief='flat', bd=4).pack(side='left', fill='x', expand=True, padx=6)
            v.trace_add('write', lambda *a, i=i, sv=v: arr.__setitem__(i, sv.get()))
            tk.Button(row, text='×', bg=RED_BG, fg=RED_FG,
                      font=('Segoe UI', 10), relief='flat', cursor='hand2',
                      command=lambda i=i: (arr.pop(i), self._show(tab))
                      ).pack(side='right', padx=4)
        tk.Button(frame, text="+ Message d'Inès", bg='#0f172a', fg=DIM,
                  font=('Segoe UI', 9), relief='flat', cursor='hand2', bd=1, pady=5,
                  command=lambda: (arr.append(''), self._show(tab))
                  ).pack(fill='x', pady=3)

    def _choice_rows(self, parent, arr, tab, padx=0):
        frame = tk.Frame(parent, bg=SURFACE if padx == 0 else BG)
        frame.pack(fill='x', padx=padx)
        eff_vals = [str(v) for v, _ in EFF_OPTS]
        eff_lbls = [l for _, l in EFF_OPTS]
        eff_lbl  = {str(v): l for v, l in EFF_OPTS}
        eff_val  = {l: int(v) for v, l in EFF_OPTS}

        for i, ch in enumerate(arr):
            row = tk.Frame(frame, bg='#0f172a', pady=3)
            row.pack(fill='x', pady=2)

            lv = tk.StringVar(value=ch.get('l',''))
            tk.Entry(row, textvariable=lv, bg='#0f172a', fg=ACCENT,
                     font=('Segoe UI', 10, 'bold'), relief='flat', bd=4, width=3
                     ).pack(side='left', padx=(6,2))
            lv.trace_add('write', lambda *a, i=i, sv=lv:
                         arr[i].__setitem__('l', sv.get().upper()))

            tv = tk.StringVar(value=ch.get('t',''))
            tk.Entry(row, textvariable=tv, bg='#0f172a', fg=TEXT,
                     insertbackground=TEXT, font=('Segoe UI', 10),
                     relief='flat', bd=4).pack(side='left', fill='x', expand=True, padx=4)
            tv.trace_add('write', lambda *a, i=i, sv=tv:
                         arr[i].__setitem__('t', sv.get()))

            cb = ttk.Combobox(row, values=eff_lbls, width=6,
                              state='readonly', font=('Segoe UI', 9))
            cb.set(eff_lbl.get(str(ch.get('e', 0)), '0'))
            cb.pack(side='left', padx=4)
            def on_eff(e, i=i, c=cb): arr[i]['e'] = eff_val.get(c.get(), 0)
            cb.bind('<<ComboboxSelected>>', on_eff)

            tk.Button(row, text='×', bg=RED_BG, fg=RED_FG,
                      font=('Segoe UI', 10), relief='flat', cursor='hand2',
                      command=lambda i=i: (arr.pop(i), self._show(tab))
                      ).pack(side='right', padx=4)

        tk.Button(frame, text='+ Choix', bg='#0f172a', fg=DIM,
                  font=('Segoe UI', 9), relief='flat', cursor='hand2', bd=1, pady=5,
                  command=lambda: (
                      arr.append({'l': chr(65+len(arr)), 't':'', 'e':0}),
                      self._show(tab))
                  ).pack(fill='x', pady=3)


# ── Lancement ─────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    root = tk.Tk()
    App(root)
    root.mainloop()
