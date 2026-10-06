/* =========================================================================
   2_Compte_de_Clara_types.js - quel message relève de quel type
   -------------------------------------------------------------------------
   Commun aux versions française et anglaise : les textes changent de langue,
   la classification non. Une seule table à corriger, et les deux versions
   ne peuvent plus diverger.

   Une liste par conversation (clé : id dans CONVOS) ou par photo (clé :
   position dans photoData), un élément par message ou commentaire, dans
   l'ordre. Un message peut relever de plusieurs types : n'importe lequel
   est accepté comme bonne réponse, et tous sont alors comptés.
   Liste vide = message violent, mais qui ne suffit pas à nommer un type.

   Clés : body_shaming, menaces, rumeurs, exclusion, diffusion_images,
          manipulation, sextorsion, sexiste, scolaire
   ========================================================================= */
var TYPES_DM = {
  1:  [['body_shaming'], ['body_shaming'], ['exclusion','scolaire']],
  2:  [['rumeurs','sexiste'], ['rumeurs'], ['rumeurs','sexiste'], ['menaces']],
  3:  [['body_shaming'], ['body_shaming'], ['scolaire','exclusion']],
  4:  [['rumeurs'], ['rumeurs'], ['rumeurs','exclusion'], ['rumeurs','manipulation']],
  5:  [['diffusion_images'], ['manipulation'], ['diffusion_images']],
  6:  [['body_shaming'], ['body_shaming'], ['body_shaming']],
  7:  [['exclusion','scolaire'], ['exclusion','scolaire'], ['exclusion','manipulation'], ['exclusion']],
  9:  [['manipulation'], ['manipulation'], ['manipulation','exclusion'], ['manipulation']],
  8:  [['menaces'], ['menaces'], ['menaces'], ['menaces']],
  10: [['body_shaming'], ['body_shaming'], ['manipulation','scolaire'], ['exclusion']],
  11: [['manipulation','rumeurs'], ['rumeurs','manipulation'], ['manipulation'], ['manipulation']],
  12: [['diffusion_images'], ['diffusion_images'], ['diffusion_images']],
  13: [['manipulation','exclusion'], ['manipulation'], ['exclusion','scolaire']],
  14: [['exclusion'], ['exclusion'], ['exclusion'], ['exclusion']],
  15: [['manipulation','exclusion'], ['manipulation'], ['manipulation'], ['manipulation']],
  16: [['diffusion_images'], ['diffusion_images'], ['diffusion_images','menaces']],
  30: [],  // Sarah, une amie
  28: [['sexiste'], ['sexiste'], ['sexiste'], ['sexiste']],
  29: [['scolaire','body_shaming'], ['scolaire'], ['scolaire'], ['scolaire','manipulation']],
  17: [['exclusion'], ['exclusion'], ['exclusion']],
  18: [['exclusion','manipulation'], ['manipulation','exclusion'], ['manipulation']],
  19: [['rumeurs','scolaire'], ['rumeurs'], ['rumeurs','scolaire'], ['rumeurs']],
  20: [['rumeurs','sexiste'], ['rumeurs'], ['sexiste']],
  27: [['sextorsion','diffusion_images'], ['sextorsion'], ['sextorsion','menaces'], ['sextorsion','menaces']],
  21: [['manipulation','exclusion'], ['manipulation'], ['manipulation']],
  22: [['exclusion'], ['exclusion'], ['exclusion']],
  23: [[], []],  // un compte créé pour insulter : violent, mais pas un type à lui seul
  24: [['exclusion','manipulation'], ['exclusion'], ['exclusion']],
  25: [['exclusion'], ['exclusion','scolaire'], ['exclusion']],
  26: [['rumeurs','scolaire'], ['rumeurs','manipulation'], ['manipulation']],
  99: []   // Kevin
};

var TYPES_PHOTO = {
  0: [[], [], []],                                   // lever de soleil : insultes génériques
  2: [[], []],                                       // chaton
  3: [['body_shaming'], ['body_shaming'], ['body_shaming']],
  5: [[], ['exclusion'], ['exclusion']],
  6: [['exclusion'], ['exclusion']],
  7: [['exclusion'], ['exclusion','body_shaming'], ['exclusion']],
  8: [['exclusion'], ['exclusion'], []]
};
