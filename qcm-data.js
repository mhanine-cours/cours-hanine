/* =====================================================================
   QCM d'auto-évaluation — 100 questions par module, réparties en 3 niveaux.
   Les questions de chaque module sont dans le dossier qcm/ :
   qcm/c.js, qcm/ii.js, qcm/scratch.js, qcm/langues.js, qcm/tourisme.js, qcm/droit.js
   Format d'une question :
   [niveau (1 facile, 2 moyen, 3 difficile), "question", ["choix 1","choix 2","choix 3","choix 4"], n° de la bonne réponse (0 à 3), "explication"],
   ===================================================================== */
const QCM = {};
const NIVEAUX = {1:"Niveau 1 – Facile", 2:"Niveau 2 – Moyen", 3:"Niveau 3 – Difficile"};
