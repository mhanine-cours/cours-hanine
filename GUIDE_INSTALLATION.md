# Demandes de livres – Guide d'installation

Application de demande d'achat de livres pour la Faculté des Sciences d'Errachidia (UMI).

- **index.html** : formulaire des étudiants. L'étudiant saisit son CNE ou son n° Apogée, son nom, sa filière et son semestre, puis un ou plusieurs livres (jusqu'à 10 par envoi).
- **admin.html** : espace d'administration protégé par mot de passe. Il permet de :
  - filtrer les demandes par filière, semestre et statut ;
  - changer le statut (En attente, Validée, Achetée, Refusée) ;
  - voir les livres regroupés (doublons fusionnés) ;
  - gérer la liste des filières et des modules ;
  - exporter en Excel.
- **config.js** : contient l'adresse du script Google. C'est le seul fichier à modifier.
- **Code.gs** : le script à coller dans Google Apps Script. La feuille Google sert de base de données.

Comptez environ 15 minutes pour l'installation.

---

## Étape 1 – Créer la feuille Google et le script

1. Ouvrez Google Drive avec le compte qui gardera les données, de préférence un compte de la faculté. Créez une **feuille Google vide** et nommez-la, par exemple, « Demandes de livres FSE ».
2. Dans la feuille, ouvrez le menu **Extensions > Apps Script**.
3. Supprimez le contenu du fichier `Code.gs` qui s'ouvre, puis **collez tout le contenu** du fichier `Code.gs` fourni. Enregistrez avec l'icône de disquette.
4. Dans la liste des fonctions, en haut, choisissez **setup** puis cliquez sur **Exécuter**.
   - Google vous demande une autorisation. Cliquez sur **Examiner les autorisations**, choisissez votre compte, puis **Paramètres avancés > Accéder au projet (non sécurisé)** et **Autoriser**. Ce message est normal pour un script personnel.
   - Les onglets **Demandes** et **Filieres** apparaissent dans la feuille.

## Étape 2 – Choisir le mot de passe administrateur

1. Dans Apps Script, cliquez sur l'icône ⚙ **Paramètres du projet**, en bas de la colonne de gauche.
2. Descendez jusqu'à **Propriétés du script**, puis cliquez sur **Modifier les propriétés du script**.
3. La propriété `ADMIN_PASSWORD` vaut `ChangezMoi2026`. **Remplacez cette valeur** par votre propre mot de passe, puis enregistrez.

## Étape 3 – Publier le script comme application web

1. En haut à droite, cliquez sur **Déployer > Nouveau déploiement**.
2. Cliquez sur l'icône ⚙ à côté de « Sélectionner le type » et choisissez **Application Web**.
3. Remplissez les champs ainsi :
   - Description : `Demandes de livres`
   - Exécuter en tant que : **Moi**
   - Qui peut accéder : **Tout le monde**
4. Cliquez sur **Déployer** et copiez l'**URL de l'application Web**. Elle se termine par `/exec`.

## Étape 4 – Configurer les pages

Ouvrez `config.js` avec un éditeur de texte (Bloc-notes, VS Code…) et collez l'URL à la place du texte entre guillemets :

```js
const API_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
```

## Étape 5 – Mettre les pages en ligne sur GitHub Pages

1. Dans votre dépôt `mhanine-cours.github.io`, créez un dossier `livres`.
2. Déposez-y les trois fichiers `index.html`, `admin.html` et `config.js`. Utilisez **Add file > Upload files**, puis **Commit**.
3. Après une à deux minutes, les pages sont en ligne :
   - Pour les étudiants : `https://mhanine-cours.github.io/livres/`
   - Pour l'administration : `https://mhanine-cours.github.io/livres/admin.html`

Ne donnez aux étudiants que le premier lien.

## Étape 6 – Saisir les filières et les modules

1. Ouvrez `admin.html`, connectez-vous et allez dans l'onglet **Filières et modules**.
2. Supprimez les trois lignes d'exemple.
3. Ajoutez une ligne par module, sous la forme Filière, Semestre (S1, S2…) et Module.
4. Cliquez sur **Enregistrer la liste**. Le formulaire des étudiants est aussitôt à jour.

Vous pouvez aussi remplir directement l'onglet **Filieres** de la feuille Google, à raison d'une ligne par module.

---

## Utilisation au quotidien

- **Onglet Demandes** : chaque livre demandé par chaque étudiant, avec un menu pour changer son statut.
- **Onglet Livres regroupés** : un livre demandé par plusieurs étudiants n'apparaît qu'une fois. Les demandes sont regroupées par ISBN identique, ou à défaut par titre et auteur identiques, sans tenir compte des accents et des majuscules. Vous y voyez le nombre de demandes, le nombre d'étudiants, les filières et les modules. Le statut choisi sur une ligne s'applique à tout le groupe.
- **Exporter en Excel** : le fichier tient compte des filtres actifs et contient deux feuilles :
  1. **Livres à acheter** : la liste regroupée pour le service des achats, avec des colonnes *Quantité à commander* et *Prix unitaire* à remplir. La colonne *Total* se calcule toute seule.
  2. **Demandes détaillées** : une ligne par demande.
- Les données restent aussi dans la feuille Google. **Fichier > Télécharger > Microsoft Excel** en donne une copie complète à tout moment.

## Protections intégrées

- Un même étudiant ne peut pas demander deux fois le même livre. Le doublon est ignoré et l'étudiant en est averti.
- Seuls les couples filière/semestre de votre liste sont acceptés.
- Un champ invisible bloque les robots.
- Le texte saisi ne peut pas être interprété comme une formule dans la feuille.
- Les fonctions d'administration (liste, statuts, filières) exigent le mot de passe.

## Bon à savoir

- **Le CNE n'est pas vérifié auprès d'Apogée.** Un étudiant peut saisir le numéro d'un camarade. Si cela pose problème, l'onglet Demandes permet de repérer et de refuser les demandes douteuses.
- **Si vous modifiez `Code.gs` plus tard**, allez dans **Déployer > Gérer les déploiements > ✎ (modifier) > Version : Nouvelle version > Déployer**. L'URL reste la même.
- Le mot de passe est conservé dans le navigateur jusqu'à la fermeture de l'onglet. Pensez à cliquer sur **Se déconnecter** sur un poste partagé.
