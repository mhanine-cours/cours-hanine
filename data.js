/* =====================================================================
   ✏️  FICHIER À MODIFIER — c'est le seul fichier à toucher pour mettre
   le site à jour. Gardez les guillemets "..." et les virgules.
   ===================================================================== */

const SITE = {
  annee:   "Année universitaire 2026 – 2027",
  maj:     "11/11/2026",
  email:   "m.hanine@umi.ac.ma",
  lieu:    "Département Sciences appliquées et technologies numériques.",
  permanence: "Permanence : sur rendez-vous par e-mail."
};

/* Les rubriques, dans l'ordre des onglets. */
const RUBRIQUES = ["Cours", "Diapositives", "Travaux pratiques corrigés", "Études de cas", "Examens corrigés"];

/* Les annonces : la plus récente en premier. */
const ANNONCES = [
  { jour:"12", mois:"nov", titre:"Nouveau : GénéLab", texte:"Simulateur du banc SEFRAM (générateur 4463 et oscilloscope 5062DC) piloté en SCPI. Rubrique Logiciels." },
  { jour:"11", mois:"nov", titre:"Site réorganisé", texte:"Les documents sont classés par rubrique : cours, diapositives, travaux pratiques corrigés et études de cas." },
  { jour:"11", mois:"nov", titre:"Nouvelle étude de cas", texte:"Excel appliqué au droit public des administrations territoriales." }
];

/* Les documents.
   - rubrique : une des RUBRIQUES ci-dessus
   - niveau   : "Licence" ou "Master" (sert au filtre)
   - fichier  : déposez le PDF portant exactement ce nom dans le dossier documents/ */
const DOCUMENTS = [
 // ---------- Cours ----------
 { rubrique:"Cours", niveau:"Licence", mid:"c", module:"Programmation en langage C", formation:"Licence Digitalisation – tronc commun Informatique appliquée",
   titre:"Support de cours avec exemples corrigés", pages:58, fichier:"documents/langage-c-digitalisation-polycopie.pdf",
   desc:"Architecture de l'ordinateur, numération, puis bases du langage C : variables, opérateurs, entrées-sorties, structures de contrôle." },
 { rubrique:"Cours", niveau:"Master", mid:"tourisme", module:"Culture digitale et tourisme", formation:"Master Communication touristique et valorisation du patrimoine (S7)",
   titre:"Polycopié de cours avec exercices corrigés", pages:44, fichier:"documents/culture-digitale-tourisme.pdf",
   desc:"La culture digitale dans le tourisme et Excel appliqué aux données touristiques, jusqu'au tableau de bord." },
 { rubrique:"Diapositives", niveau:"Master", mid:"ii", module:"Informatique industrielle", formation:"Master ST ESE · Cycle d'ingénieur SEIT",
   titre:"Cours d'informatique industrielle – diaporama", pages:112, fichier:"documents/info-industrielle-cours.pdf",
   desc:"Chaîne d'acquisition, instrument virtuel, programmation LabVIEW et contrôle d'instruments." },
 { rubrique:"Diapositives", niveau:"Licence", mid:"scratch", module:"TIC dans l'enseignement 2 – Scratch", formation:"Licence en Éducation – Enseignement primaire (S2)",
   titre:"Notions de coding avec Scratch – diaporama", pages:51, fichier:"documents/tic-scratch-diaporama.pdf",
   desc:"Présentation de Scratch, interface, blocs, premiers programmes et ateliers." },
 { rubrique:"Diapositives", niveau:"Licence", mid:"langues", module:"Informatique appliquée aux langues", formation:"Licence Professionnelle Enseignement du français",
   titre:"Informatique appliquée aux langues – diaporama", pages:70, fichier:"documents/info-francais-diaporama.pdf",
   desc:"Les six chapitres du module, de l'ordinateur à la recherche d'information sur Internet." },
 { rubrique:"Diapositives", niveau:"Licence", mid:"langues", module:"Informatique appliquée aux langues", formation:"Licence Professionnelle Enseignement du français",
   titre:"Informatique pour l'enseignement du français – diaporama", pages:70, fichier:"documents/info-francais-diaporama-2.pdf",
   desc:"Deuxième version du support : les six chapitres du module, de l'ordinateur à la recherche d'information." },

 // ---------- Travaux pratiques corrigés ----------
 { rubrique:"Travaux pratiques corrigés", niveau:"Licence", mid:"c", module:"Programmation C1", formation:"Licence Digitalisation – tronc commun Informatique appliquée",
   titre:"Travaux pratiques avec correction", pages:39, fichier:"documents/langage-c-tp-corriges.pdf",
   desc:"Numération, premiers programmes, opérateurs, conversions de type et structures de contrôle, avec corrigés." },
 { rubrique:"Travaux pratiques corrigés", niveau:"Master", mid:"ii", module:"Informatique industrielle", formation:"Master ST ESE · Cycle d'ingénieur SEIT",
   titre:"11 TP corrigés : LabVIEW et contrôle d'instruments", pages:35, fichier:"documents/info-industrielle-tp-corriges.pdf",
   desc:"TP 1 à 8 : programmation LabVIEW. TP 9 à 11 : pilotage GPIB du générateur SEFRAM 4463 et de l'oscilloscope SEFRAM 5062DC." },
 { rubrique:"Travaux pratiques corrigés", niveau:"Licence", mid:"scratch", module:"TIC dans l'enseignement 2 – Scratch", formation:"Licence en Éducation – Enseignement primaire (S2)",
   titre:"TP corrigés : Scratch, éthique et TIC", pages:21, fichier:"documents/tic-scratch-tp-corriges.pdf",
   desc:"Interface, scripts, animation, événements et dessin avec le stylo, avec corrections." },
 { rubrique:"Travaux pratiques corrigés", niveau:"Licence", mid:"scratch", module:"TIC dans l'enseignement 2 – Scratch", formation:"Licence en Éducation – Enseignement primaire (S2)",
   titre:"Travaux pratiques avec correction : Scratch, éthique et TIC (version 2)", pages:21, fichier:"documents/tic-scratch-tp-corriges-2.pdf",
   desc:"Deuxième version du fascicule de TP Scratch, avec corrections."},
 { rubrique:"Travaux pratiques corrigés", niveau:"Master", mid:"tourisme", module:"Culture digitale et tourisme", formation:"Master Communication touristique et valorisation du patrimoine (S7)",
   titre:"6 TP corrigés avec Excel", pages:22, fichier:"documents/culture-digitale-tourisme-tp.pdf",
   desc:"Données d'établissements, réservations, nuitées, avis en ligne, pilotage hôtelier et tableau de bord." },

 // ---------- Études de cas ----------
 { rubrique:"Études de cas", niveau:"Licence", mid:"droit", module:"Excel appliqué au droit public", formation:"Licence القانون والفاعل في التنمية",
   titre:"Études de cas sous Excel – administrations territoriales", pages:7, fichier:"documents/excel-droit-public-etudes-de-cas.pdf",
   desc:"Suivi budgétaire, marchés publics, demandes des citoyens, agents, délibérations, investissements et tableau de bord territorial." }
];

/* Les modules : une page par module (module.html?m=identifiant).
   - id : identifiant court, repris dans le champ mid des documents */
const MODULES = [
 { id:"c", titre:"Programmation en langage C", niveau:"Licence", formation:"Licence Digitalisation – tronc commun Informatique appliquée (S1-S2)",
   intro:"Ce module apprend à analyser un problème, à concevoir un algorithme et à le traduire en programme C correct et lisible.",
   objectifs:["Comprendre l'architecture d'un ordinateur et la représentation des données (binaire, hexadécimal, IEEE 754, ASCII)","Écrire, compiler et exécuter un programme C","Utiliser variables, types, opérateurs et conversions","Lire et afficher des données avec scanf et printf","Construire des programmes avec les structures de contrôle"],
   prerequis:"Aucun, en dehors de l'usage courant d'un ordinateur.",
   programme:["Architecture de l'ordinateur et systèmes de numération","Représentation des nombres et des caractères","Introduction au langage C et étapes de la compilation","Variables, types et constantes","Opérateurs et expressions","Entrées-sorties","Conversions de type","Structures conditionnelles et boucles"] },
 { id:"ii", titre:"Informatique industrielle", niveau:"Master", formation:"Master ST Électronique et systèmes embarqués (S9) · Cycle d'ingénieur SEIT (S1)",
   intro:"Ce module forme à la programmation graphique sous LabVIEW et au pilotage d'instruments de mesure depuis un ordinateur.",
   objectifs:["Comprendre la chaîne d'acquisition et de commande et la notion d'instrument virtuel","Programmer des applications LabVIEW structurées (sous-VI, boucles, tableaux, graphes, fichiers)","Communiquer avec un instrument par bus GPIB et commandes SCPI","Piloter un générateur et rapatrier une mesure d'oscilloscope sur le PC"],
   prerequis:"Bases de programmation et d'électronique (signaux, mesure).",
   programme:["Informatique industrielle et chaîne d'acquisition","Environnement LabVIEW, face-avant et diagramme","Débogage et sous-VI","Boucles, temporisation et registres à décalage","Tableaux, clusters et graphes","Structures Condition, chaînes de caractères et fichiers","Bus GPIB et commandes SCPI","Pilotage du générateur SEFRAM 4463 et de l'oscilloscope SEFRAM 5062DC"] },
 { id:"scratch", titre:"TIC dans l'enseignement 2 – Scratch", niveau:"Licence", formation:"Licence en Éducation – Enseignement primaire (S2)",
   intro:"Ce module initie les futurs enseignants au coding avec Scratch et à un usage éthique et responsable du numérique en classe.",
   objectifs:["Se repérer dans l'interface de Scratch (scène, lutins, blocs, scripts)","Créer des animations et des programmes interactifs simples","Utiliser boucles, événements et stylo","Adopter un usage éthique des TIC et des ressources numériques"],
   prerequis:"Aucun.",
   programme:["Présentation générale de Scratch","Interface : scène, lutins, palette des blocs, zone des scripts","Mon premier programme","Apparence et animation","Événements et clavier","Dessiner avec le stylo","Éthique, TIC et ressources numériques"] },
 { id:"langues", titre:"Informatique appliquée aux langues", niveau:"Licence", formation:"Licence Professionnelle Enseignement du français",
   intro:"Ce module rend le futur enseignant de français autonome avec les outils numériques utiles à son métier.",
   objectifs:["Comprendre le fonctionnement d'un ordinateur et d'un système d'exploitation","Organiser et sauvegarder ses fichiers","Produire des documents et des présentations professionnels","Utiliser le tableur pour le suivi des élèves","Rechercher et évaluer l'information sur Internet"],
   prerequis:"Aucun.",
   programme:["Introduction à l'informatique et à l'ordinateur","Système d'exploitation et gestion des fichiers","Traitement de texte appliqué au métier d'enseignant","Présentations assistées par ordinateur","Le tableur au service de l'enseignant","Internet et la recherche d'information","Communication et travail collaboratif en ligne","Outils numériques pour la classe de français","Sécurité, droit et éthique du numérique"] },
 { id:"tourisme", titre:"Culture digitale et tourisme", niveau:"Master", formation:"Master Communication touristique et valorisation du patrimoine (S7)",
   intro:"Ce module relie la culture digitale du tourisme à une pratique solide du tableur pour analyser les données et décider.",
   objectifs:["Comprendre le parcours du voyageur connecté et les données du tourisme","Maîtriser les formules, références et fonctions essentielles d'Excel","Analyser l'activité avec les tableaux croisés dynamiques","Construire des indicateurs et un tableau de bord"],
   prerequis:"Usage courant d'un ordinateur.",
   programme:["La culture digitale dans le tourisme","Prise en main d'Excel","Formules et fonctions essentielles","Fonctions logiques et de recherche","Organiser les données","Tableaux croisés dynamiques et graphiques","Tableau de bord touristique"] },
 { id:"droit", titre:"Excel appliqué au droit public", niveau:"Licence", formation:"Licence القانون والفاعل في التنمية",
   intro:"Des études de cas concrètes montrent comment Excel aide à suivre l'activité d'une administration territoriale.",
   objectifs:["Suivre un budget et calculer des taux d'exécution","Suivre des marchés publics, des demandes de citoyens et des délibérations","Utiliser fonctions conditionnelles, filtres et mise en forme conditionnelle","Construire un tableau de bord territorial"],
   prerequis:"Bases d'Excel.",
   programme:["Excel au service de l'administration territoriale","Suivi budgétaire d'une collectivité","Répartition des dépenses par service","Suivi d'un marché public","Gestion des demandes des citoyens","Suivi des agents et des délibérations","Projets d'investissement","Tableau de bord territorial et étude de synthèse"] }
];
