/* Extrait toutes les données de jeu des fichiers de textes vers un seul JSON.
   Sert au générateur du document partenaires : le document est produit à
   partir du jeu, il ne peut donc plus dériver. */
const fs = require('fs'), vm = require('vm');
function charger(fichier, noms) {
  const ctx = { window: {}, localStorage: { getItem: () => null, setItem: () => {} }, document: null };
  vm.createContext(ctx);
  const code = [].concat(fichier).map(f => fs.readFileSync(f, 'utf8')).join(';\n');
  vm.runInContext(code + ';this.__out={' +
    noms.map(n => `${n}: typeof ${n}!=="undefined" ? ${n} : null`).join(',') + '};', ctx);
  return ctx.__out;
}
const out = {
  p1: charger('1_Telephone_Ines_textes.js', ['TEXTES', 'UI']),
  // La classification des messages est dans un fichier à part, commun FR/EN.
  p2: charger(['2_Compte_de_Clara_textes.js', '2_Compte_de_Clara_types.js'], ['CONVOS', 'photoData', 'HARCEL_TYPES', 'TYPES_DM', 'TYPES_PHOTO', 'UI']),
  p3: charger('3_Groupe_Secret_textes.js', ['WA_DATA', 'UI']),
  p4: charger('4_Convaincre_Clara_textes.js', ['TEXTES', 'UI']),
  ressources: charger('ressources.js', []) && (() => { const c = { window: {} }; vm.createContext(c); vm.runInContext(fs.readFileSync('ressources.js', 'utf8'), c); return c.window.RESSOURCES; })()
};
fs.writeFileSync('_textes_dump.json', JSON.stringify(out, null, 1));
console.log('écrit : _textes_dump.json',
  '| P1 étapes', out.p1.TEXTES.G.length,
  '| P2 conversations', out.p2.CONVOS.length,
  '| P3 messages', out.p3.WA_DATA.messages.length,
  '| P4 scènes', out.p4.TEXTES.SCENES.length,
  '| ressources', out.ressources.liste.length);
