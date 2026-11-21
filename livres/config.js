// Collez ici l'URL de l'application web Apps Script (se termine par /exec)
const API_URL = "https://script.google.com/macros/s/AKfycbyxjrhij_p-mExuJsbLgFHHRWvxEQ-RoUoKbf-XcN2GIytXwPOLdpvDtP76czDEV6cR/exec";

// Textes affichés en en-tête des deux pages
const ETABLISSEMENT = "Faculté des Sciences d'Errachidia";
const UNIVERSITE = "Université Moulay Ismaïl";

// Appel commun au script Google (texte brut : pas de requête CORS préalable)
async function apiCall(payload) {
  if (!API_URL || API_URL.indexOf("COLLEZ_ICI") === 0) {
    throw new Error("L'adresse du script n'est pas configurée (fichier config.js).");
  }
  const res = await fetch(API_URL, { method: "POST", body: JSON.stringify(payload) });
  if (!res.ok) throw new Error("Le serveur a répondu " + res.status + ".");
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Erreur inconnue.");
  return data;
}
