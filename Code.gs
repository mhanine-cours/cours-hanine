/**
 * Demandes de livres – Faculté des Sciences d'Errachidia (UMI)
 * Back-end Google Apps Script : la feuille Google sert de base de données.
 *
 * Feuilles créées par setup() :
 *   - Demandes : une ligne par livre demandé
 *   - Filieres : Filière | Semestre | Module (liste proposée aux étudiants)
 *
 * Mot de passe admin : Projet > Paramètres du projet > Propriétés du script
 *   clé ADMIN_PASSWORD (setup() en crée un par défaut : à changer !)
 */

var SHEET_DEMANDES = 'Demandes';
var SHEET_FILIERES = 'Filieres';
var HEAD_DEMANDES = ['ID', 'Date', 'CNE/Apogée', 'Nom', 'Prénom', 'Filière', 'Semestre', 'Module',
  'Titre', 'Auteur(s)', 'Éditeur', 'ISBN', 'Édition/Année', 'Statut', 'Remarque admin'];
var HEAD_FILIERES = ['Filière', 'Semestre', 'Module'];
var STATUTS = ['En attente', 'Validée', 'Achetée', 'Refusée'];
var MAX_LIVRES_PAR_ENVOI = 10;

/* ---------- Installation (à exécuter une fois depuis l'éditeur) ---------- */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var d = ss.getSheetByName(SHEET_DEMANDES) || ss.insertSheet(SHEET_DEMANDES);
  if (d.getLastRow() === 0) {
    d.appendRow(HEAD_DEMANDES);
    d.setFrozenRows(1);
    d.getRange(1, 1, 1, HEAD_DEMANDES.length).setFontWeight('bold').setBackground('#dbe7f3');
    d.getRange('C:C').setNumberFormat('@'); // CNE en texte
    d.getRange('L:L').setNumberFormat('@'); // ISBN en texte
  }
  var f = ss.getSheetByName(SHEET_FILIERES) || ss.insertSheet(SHEET_FILIERES);
  if (f.getLastRow() === 0) {
    f.appendRow(HEAD_FILIERES);
    f.setFrozenRows(1);
    f.getRange(1, 1, 1, 3).setFontWeight('bold').setBackground('#dbe7f3');
    // Exemple à remplacer depuis la page admin ou directement dans la feuille
    f.appendRow(['Licence Digitalisation', 'S1', 'Programmation Python 1']);
    f.appendRow(['Licence Digitalisation', 'S1', 'Electronique numérique']);
    f.appendRow(['Licence Digitalisation', 'S3', 'Recherche opérationnelle et optimisation']);
  }
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('ADMIN_PASSWORD')) props.setProperty('ADMIN_PASSWORD', 'ChangezMoi2026');
}

/* ---------- Points d'entrée web ---------- */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'config';
  if (action === 'config') return json_(handleConfig_());
  return json_({ ok: false, error: 'Action inconnue.' });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return json_({ ok: false, error: 'Requête illisible.' });
  }
  try {
    return json_(route_(body));
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function route_(body) {
  switch (body.action) {
    case 'config': return handleConfig_();
    case 'submit': return handleSubmit_(body);
    case 'login': requireAdmin_(body); return { ok: true, statuts: STATUTS };
    case 'list': requireAdmin_(body); return handleList_();
    case 'setStatus': requireAdmin_(body); return handleSetStatus_(body);
    case 'saveConfig': requireAdmin_(body); return handleSaveConfig_(body);
    default: return { ok: false, error: 'Action inconnue.' };
  }
}

/* ---------- Public ---------- */
function handleConfig_() {
  var sh = sheet_(SHEET_FILIERES);
  var rows = [];
  if (sh.getLastRow() > 1) {
    rows = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getDisplayValues()
      .filter(function (r) { return r[0] && r[1]; })
      .map(function (r) { return { filiere: r[0].trim(), semestre: r[1].trim(), module: r[2].trim() }; });
  }
  return { ok: true, filieres: rows };
}

function handleSubmit_(b) {
  if (b.website) return { ok: true, count: 0 }; // champ piège anti-robots
  var cne = clean_(b.cne, 20).toUpperCase().replace(/\s+/g, '');
  var nom = clean_(b.nom, 60);
  var prenom = clean_(b.prenom, 60);
  var filiere = clean_(b.filiere, 120);
  var semestre = clean_(b.semestre, 10);
  var livres = Array.isArray(b.livres) ? b.livres : [];

  if (!/^[A-Z0-9]{6,14}$/.test(cne)) throw new Error('CNE ou numéro Apogée invalide.');
  if (!nom || !prenom) throw new Error('Nom et prénom obligatoires.');
  if (!livres.length) throw new Error('Ajoutez au moins un livre.');
  if (livres.length > MAX_LIVRES_PAR_ENVOI) throw new Error('Maximum ' + MAX_LIVRES_PAR_ENVOI + ' livres par envoi.');

  var conf = handleConfig_().filieres;
  var okPair = conf.some(function (c) { return c.filiere === filiere && c.semestre === semestre; });
  if (!okPair) throw new Error('Filière ou semestre inconnu.');

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = sheet_(SHEET_DEMANDES);
    var existing = readDemandes_(sh);
    var now = new Date();
    var out = [];
    var doublons = 0;
    livres.forEach(function (l) {
      var titre = clean_(l.titre, 200);
      var auteur = clean_(l.auteur, 150);
      if (!titre || !auteur) throw new Error('Titre et auteur obligatoires pour chaque livre.');
      var rec = {
        cne: cne, titre: titre, auteur: auteur, isbn: cleanIsbn_(l.isbn)
      };
      var k = bookKey_(rec);
      var deja = existing.some(function (x) { return x.cne === cne && bookKey_(x) === k; }) ||
        out.some(function (r) { return r[2] === cne && bookKey_({ titre: r[8], auteur: r[9], isbn: r[11] }) === k; });
      if (deja) { doublons++; return; }
      out.push([
        Utilities.getUuid().slice(0, 8), now, cne, nom.toUpperCase(), prenom, filiere, semestre,
        clean_(l.module, 150), titre, auteur, clean_(l.editeur, 120), rec.isbn, clean_(l.edition, 40),
        STATUTS[0], ''
      ]);
    });
    if (out.length) {
      sh.getRange(sh.getLastRow() + 1, 1, out.length, HEAD_DEMANDES.length).setValues(out.map(safeRow_));
    }
    return { ok: true, count: out.length, doublons: doublons };
  } finally {
    lock.releaseLock();
  }
}

/* ---------- Admin ---------- */
function handleList_() {
  var rows = readDemandes_(sheet_(SHEET_DEMANDES));
  return { ok: true, demandes: rows, statuts: STATUTS, filieres: handleConfig_().filieres };
}

function handleSetStatus_(b) {
  var ids = Array.isArray(b.ids) ? b.ids.map(String) : [];
  var statut = String(b.statut || '');
  if (STATUTS.indexOf(statut) < 0) throw new Error('Statut invalide.');
  if (!ids.length) return { ok: true, updated: 0 };
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = sheet_(SHEET_DEMANDES);
    var n = sh.getLastRow() - 1;
    if (n < 1) return { ok: true, updated: 0 };
    var idCol = sh.getRange(2, 1, n, 1).getDisplayValues();
    var stCol = sh.getRange(2, 14, n, 2).getValues();
    var set = {};
    ids.forEach(function (id) { set[id] = true; });
    var updated = 0;
    for (var i = 0; i < n; i++) {
      if (set[idCol[i][0]]) {
        stCol[i][0] = statut;
        if (b.remarque !== undefined) stCol[i][1] = clean_(b.remarque, 200);
        updated++;
      }
    }
    sh.getRange(2, 14, n, 2).setValues(stCol);
    return { ok: true, updated: updated };
  } finally {
    lock.releaseLock();
  }
}

function handleSaveConfig_(b) {
  var rows = Array.isArray(b.filieres) ? b.filieres : [];
  var clean = rows.map(function (r) {
    return [clean_(r.filiere, 120), clean_(r.semestre, 10).toUpperCase(), clean_(r.module, 150)];
  }).filter(function (r) { return r[0] && r[1]; });
  var sh = sheet_(SHEET_FILIERES);
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 3).clearContent();
  if (clean.length) sh.getRange(2, 1, clean.length, 3).setValues(clean.map(safeRow_));
  return { ok: true, count: clean.length };
}

function requireAdmin_(b) {
  var pwd = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!pwd || String(b.password || '') !== pwd) throw new Error('Mot de passe administrateur incorrect.');
}

/* ---------- Utilitaires ---------- */
function readDemandes_(sh) {
  var n = sh.getLastRow() - 1;
  if (n < 1) return [];
  var v = sh.getRange(2, 1, n, HEAD_DEMANDES.length).getValues();
  var tz = Session.getScriptTimeZone();
  return v.filter(function (r) { return r[0]; }).map(function (r) {
    return {
      id: String(r[0]),
      date: r[1] instanceof Date ? Utilities.formatDate(r[1], tz, 'yyyy-MM-dd HH:mm') : String(r[1]),
      cne: String(r[2]), nom: String(r[3]), prenom: String(r[4]),
      filiere: String(r[5]), semestre: String(r[6]), module: String(r[7]),
      titre: String(r[8]), auteur: String(r[9]), editeur: String(r[10]),
      isbn: String(r[11]), edition: String(r[12]),
      statut: String(r[13] || STATUTS[0]), remarque: String(r[14] || '')
    };
  });
}

function bookKey_(r) {
  var isbn = cleanIsbn_(r.isbn);
  if (isbn) return 'isbn:' + isbn;
  return 't:' + norm_(r.titre) + '|' + norm_(r.auteur);
}

function norm_(s) {
  return String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9؀-ۿ]+/g, ' ').trim();
}

function cleanIsbn_(s) {
  return String(s || '').toUpperCase().replace(/[^0-9X]/g, '').slice(0, 13);
}

function clean_(s, max) {
  return String(s == null ? '' : s).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max || 200);
}

// Empêche l'interprétation de formules (=, +, -, @) injectées dans la feuille
function safeRow_(row) {
  return row.map(function (c) {
    return (typeof c === 'string' && /^[=+\-@]/.test(c)) ? "'" + c : c;
  });
}

function sheet_(name) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh) { setup(); sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name); }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
