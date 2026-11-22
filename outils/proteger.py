#!/usr/bin/env python3
"""Protection par mot de passe des pages de l'espace enseignants.

Le contenu de la page est chiffré (AES-256-GCM, clé dérivée du mot de passe
par PBKDF2-SHA256, 600 000 itérations). Sans le mot de passe, il est illisible,
même en lisant le code de la page.

  Chiffrer   : python3 outils/proteger.py chiffrer  page-en-clair.html  page.html
  Déchiffrer : python3 outils/proteger.py dechiffrer page.html  page-en-clair.html

Le mot de passe est demandé au clavier. Ne jamais déposer la version en clair
sur GitHub.
"""
import base64, getpass, html, json, os, re, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ITER = 600_000
GABARIT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gabarit-protege.html")


def cle(mdp, sel):
    return PBKDF2HMAC(hashes.SHA256(), 32, sel, ITER).derive(mdp.encode("utf-8"))


def chiffrer(src, dst, mdp):
    clair = open(src, encoding="utf-8").read()
    m = re.search(r"<title>(.*?)</title>", clair, re.S)
    titre = html.unescape(m.group(1).strip()) if m else "Espace enseignants"
    sel, iv = os.urandom(16), os.urandom(12)
    ct = AESGCM(cle(mdp, sel)).encrypt(iv, clair.encode("utf-8"), None)
    bloc = base64.b64encode(sel + iv + ct).decode()
    page = open(GABARIT, encoding="utf-8").read()
    page = page.replace("__TITRE__", html.escape(titre)).replace("__ITER__", str(ITER)).replace("__DONNEES__", json.dumps(bloc))
    open(dst, "w", encoding="utf-8").write(page)


def dechiffrer(src, dst, mdp):
    page = open(src, encoding="utf-8").read()
    bloc = base64.b64decode(json.loads(re.search(r"const DONNEES=(\".*?\");", page).group(1)))
    sel, iv, ct = bloc[:16], bloc[16:28], bloc[28:]
    open(dst, "w", encoding="utf-8").write(AESGCM(cle(mdp, sel)).decrypt(iv, ct, None).decode("utf-8"))


if __name__ == "__main__":
    if len(sys.argv) != 4 or sys.argv[1] not in ("chiffrer", "dechiffrer"):
        sys.exit(__doc__)
    mdp = os.environ.get("MDP_ENSEIGNANTS") or getpass.getpass("Mot de passe : ")
    (chiffrer if sys.argv[1] == "chiffrer" else dechiffrer)(sys.argv[2], sys.argv[3], mdp)
    print("OK :", sys.argv[3])
