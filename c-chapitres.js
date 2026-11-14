/* =====================================================================
   C pas à pas — contenu des chapitres (Pr Mounir HANINE)
   Chaque chapitre contient :
     cours      : sections { h:"titre", p:"texte (HTML permis)", code:"exemple", liste:[...] }
     exemples   : programmes à exécuter { titre, code, entree }
     exercices  : type "sortie" (prédire l'affichage), "trou" (compléter le code : [[réponse|autre réponse]]),
                  "prog" (écrire un programme, vérifié par des tests { entree, sortie })
     quiz       : [ "question", ["choix 1","choix 2","choix 3","choix 4"], n° bonne réponse (0 à 3), "explication" ]
   ===================================================================== */
const R = String.raw;

const CHAPITRES = [
/* ------------------------------------------------------------------ 1 */
{ id:"ch1", titre:"Premier programme", resume:"Structure d'un programme, printf, commentaires et étapes de la compilation.",
  cours:[
    { h:"Structure d'un programme C", p:"Tout programme C contient une fonction <code>main</code> : c'est par elle que l'exécution commence. Les directives <code>#include</code> placées en tête donnent accès aux fonctions des bibliothèques, par exemple <code>printf</code> déclarée dans <code>stdio.h</code>.",
      code:R`#include <stdio.h>      /* bibliothèque d'entrées-sorties */

int main()              /* point d'entrée du programme   */
{
    printf("Bonjour !\n");
    return 0;           /* 0 : fin normale du programme  */
}` },
    { h:"Afficher avec printf", p:"<code>printf</code> affiche le texte placé entre guillemets. Les séquences d'échappement commencent par une barre oblique inverse :",
      liste:["<code>\\n</code> : retour à la ligne","<code>\\t</code> : tabulation","<code>\\\"</code> : guillemet","<code>\\\\</code> : barre oblique inverse"] },
    { h:"Les commentaires", p:"Un commentaire est ignoré par le compilateur. <code>//</code> commente jusqu'à la fin de la ligne ; <code>/* ... */</code> peut couvrir plusieurs lignes. Commentez ce que fait le programme, pas chaque instruction." },
    { h:"De l'écriture à l'exécution", p:"Le fichier source (<code>prog.c</code>) passe par plusieurs étapes avant de devenir un programme exécutable :",
      liste:["<b>Préprocesseur</b> : traite les lignes <code>#include</code> et <code>#define</code>","<b>Compilation</b> : traduit le code C en langage machine (fichier objet)","<b>Edition de liens</b> : réunit le code objet et les bibliothèques en un exécutable","Avec gcc : <code>gcc prog.c -o prog</code> puis <code>./prog</code>"] },
    { h:"A retenir", p:"Chaque instruction se termine par un point-virgule. Le C distingue majuscules et minuscules : <code>Printf</code> n'existe pas. Ici, les programmes sont exécutés directement dans votre navigateur, sans installation." }
  ],
  exemples:[
    { titre:"Mon premier programme", code:R`#include <stdio.h>

int main()
{
    printf("Bonjour, je m'appelle Sara.\n");
    printf("J'apprends le langage C.\n");
    return 0;
}` },
    { titre:"Séquences d'échappement", code:R`#include <stdio.h>

int main()
{
    // \t aligne les colonnes, \n passe à la ligne
    printf("Module\tProgrammation C\n");
    printf("Faculte\tSciences Errachidia\n");
    printf("Il a dit : \"Bravo !\"\n");
    return 0;
}` }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    printf("A\nB");
    printf("C\n\nD\n");
    return 0;
}`, reponse:"A\nBC\n\nD", aide:"Un printf sans \\n ne passe pas à la ligne : le texte suivant continue sur la même ligne." },
    { type:"sortie", enonce:"Qu'affiche ce programme ? Attention aux commentaires.", code:R`#include <stdio.h>

int main()
{
    printf("Un ");
    // printf("Deux ");
    /* printf("Trois ");
       printf("Quatre "); */
    printf("Cinq\n");
    return 0;
}`, reponse:"Un Cinq", aide:"Tout ce qui est commenté est ignoré." },
    { type:"trou", enonce:"Complétez le programme pour qu'il affiche <code>Salut</code> suivi d'un retour à la ligne.", code:R`#include <[[stdio.h]]>

int [[main]]()
{
    printf("Salut[[\n]]");
    return [[0]];
}`, sortie:"Salut" },
    { type:"prog", enonce:"Ecrivez un programme qui affiche exactement ces deux lignes :<pre>Faculte des Sciences\nErrachidia</pre>", depart:R`#include <stdio.h>

int main()
{

    return 0;
}`, tests:[{ entree:"", sortie:"Faculte des Sciences\nErrachidia" }], solution:R`#include <stdio.h>

int main()
{
    printf("Faculte des Sciences\n");
    printf("Errachidia\n");
    return 0;
}` },
    { type:"prog", enonce:"Ecrivez un programme qui affiche ce triangle :<pre>*\n**\n***\n****</pre>", depart:R`#include <stdio.h>

int main()
{

    return 0;
}`, tests:[{ entree:"", sortie:"*\n**\n***\n****" }], solution:R`#include <stdio.h>

int main()
{
    printf("*\n");
    printf("**\n");
    printf("***\n");
    printf("****\n");
    return 0;
}` }
  ],
  quiz:[
    ["Par quelle fonction commence l'exécution d'un programme C ?",["start","main","printf","include"],1,"L'exécution commence toujours par main."],
    ["Quelle directive faut-il pour utiliser printf ?",["#include <math.h>","#include <stdio.h>","#define printf","#include <string.h>"],1,"printf est déclarée dans stdio.h."],
    ["Quelle étape traite les lignes #include ?",["L'édition de liens","Le préprocesseur","L'exécution","Le débogage"],1,"Le préprocesseur remplace #include par le contenu du fichier d'en-tête."],
    ["Que manque-t-il dans : printf(\"Bonjour\")",["Un point-virgule","Une accolade","Un #define","Rien"],0,"Chaque instruction se termine par ;"],
    ["Que fait la commande gcc prog.c -o prog ?",["Elle exécute prog.c","Elle crée l'exécutable prog","Elle efface prog","Elle ouvre l'éditeur"],1,"gcc compile et fait l'édition de liens ; -o choisit le nom de l'exécutable."]
  ]
},
/* ------------------------------------------------------------------ 2 */
{ id:"ch2", titre:"Variables, types et constantes", resume:"Déclarer une variable, choisir son type, utiliser des constantes.",
  cours:[
    { h:"Déclarer une variable", p:"Une variable est une case mémoire qui porte un nom et un type. On la déclare avant de l'utiliser, et on peut l'initialiser en même temps.",
      code:R`int age;            /* déclaration                 */
age = 19;           /* affectation                 */
float note = 14.5;  /* déclaration + initialisation */
char lettre = 'A';  /* un caractère entre apostrophes */` },
    { h:"Les types de base", p:"Le type fixe la taille en mémoire et les valeurs possibles :",
      liste:["<code>char</code> : 1 octet, un caractère (son code ASCII)","<code>int</code> : 4 octets, entier (environ ±2 milliards)","<code>float</code> : 4 octets, réel simple précision (6 chiffres significatifs)","<code>double</code> : 8 octets, réel double précision (15 chiffres significatifs)","<code>sizeof(type)</code> donne la taille en octets"] },
    { h:"Règles de nommage", p:"Un identificateur commence par une lettre ou <code>_</code>, puis contient lettres, chiffres et <code>_</code>. Pas d'espace, pas d'accent, pas de mot-clé (<code>int</code>, <code>for</code>...). <code>Note</code> et <code>note</code> sont deux variables différentes." },
    { h:"Afficher une variable", p:"Dans <code>printf</code>, un code de format indique où et comment afficher chaque valeur :",
      code:R`printf("Age : %d ans\n", age);       /* %d : int    */
printf("Note : %.2f\n", note);        /* %f : float  */
printf("Lettre : %c\n", lettre);      /* %c : char   */` },
    { h:"Les constantes", p:"Une valeur qui ne change pas se déclare avec <code>#define</code> (remplacement par le préprocesseur, sans point-virgule) ou avec <code>const</code> (variable en lecture seule).",
      code:R`#define PI 3.14159
const int NB_MODULES = 6;` }
  ],
  exemples:[
    { titre:"Aire d'un disque", code:R`#include <stdio.h>
#define PI 3.14159

int main()
{
    float rayon = 2.5;
    float aire = PI * rayon * rayon;
    printf("Rayon = %.2f\n", rayon);
    printf("Aire  = %.2f\n", aire);
    return 0;
}` },
    { titre:"Taille des types", code:R`#include <stdio.h>

int main()
{
    printf("char   : %d octet\n",  (int)sizeof(char));
    printf("int    : %d octets\n", (int)sizeof(int));
    printf("float  : %d octets\n", (int)sizeof(float));
    printf("double : %d octets\n", (int)sizeof(double));
    return 0;
}` }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int a = 5;
    int b = a;
    a = 8;
    printf("%d %d\n", a, b);
    return 0;
}`, reponse:"8 5", aide:"b reçoit une copie de la valeur de a au moment de l'affectation." },
    { type:"sortie", enonce:"Qu'affiche ce programme ? (code ASCII de 'A' : 65)", code:R`#include <stdio.h>

int main()
{
    char c = 'A';
    printf("%c %d\n", c, c);
    c = c + 2;
    printf("%c\n", c);
    return 0;
}`, reponse:"A 65\nC", aide:"Un char est un petit entier : 'A' + 2 donne le code 67, c'est-à-dire 'C'." },
    { type:"trou", enonce:"Complétez : le prix TTC est le prix HT augmenté de la TVA à 20 %.", code:R`#include <stdio.h>
#define TVA [[0.2|0.20|.2]]

int main()
{
    [[float|double]] prixHT = 150.0;
    float prixTTC = prixHT * (1 + [[TVA]]);
    printf("TTC = %.2f\n", prixTTC);
    return 0;
}`, sortie:"TTC = 180.00" },
    { type:"prog", enonce:"Les variables <code>a</code> et <code>b</code> valent 3 et 7. Echangez leurs valeurs en utilisant une troisième variable, puis affichez :<pre>a = 7, b = 3</pre>", depart:R`#include <stdio.h>

int main()
{
    int a = 3, b = 7;

    printf("a = %d, b = %d\n", a, b);
    return 0;
}`, tests:[{ entree:"", sortie:"a = 7, b = 3" }], exige:[{ re:"a\\s*=\\s*b\\s*;", msg:"Echangez les valeurs avec des affectations (a = b; ...)." }], solution:R`#include <stdio.h>

int main()
{
    int a = 3, b = 7;
    int tmp;
    tmp = a;
    a = b;
    b = tmp;
    printf("a = %d, b = %d\n", a, b);
    return 0;
}` },
    { type:"prog", enonce:"Un rectangle mesure 12.5 de longueur et 4 de largeur. Déclarez deux variables réelles, calculez puis affichez :<pre>Perimetre = 33.00\nSurface = 50.00</pre>", depart:R`#include <stdio.h>

int main()
{

    return 0;
}`, tests:[{ entree:"", sortie:"Perimetre = 33.00\nSurface = 50.00" }], exige:[{ re:"(float|double)\\s+\\w+", msg:"Déclarez des variables de type float ou double." },{ re:"\\*", msg:"La surface doit être calculée (opérateur *)." }], solution:R`#include <stdio.h>

int main()
{
    float longueur = 12.5, largeur = 4;
    float perimetre = 2 * (longueur + largeur);
    float surface = longueur * largeur;
    printf("Perimetre = %.2f\n", perimetre);
    printf("Surface = %.2f\n", surface);
    return 0;
}` }
  ],
  quiz:[
    ["Quel type choisir pour stocker 3.75 ?",["int","char","float","void"],2,"float (ou double) stocke les nombres réels."],
    ["Quel identificateur est valide ?",["2note","note-finale","note_finale","int"],2,"Lettres, chiffres et _ uniquement, sans commencer par un chiffre ni utiliser un mot-clé."],
    ["Combien d'octets occupe un double ?",["1","2","4","8"],3,"Un double occupe 8 octets."],
    ["Quel format affiche un caractère ?",["%d","%c","%f","%s"],1,"%c affiche un char sous forme de caractère."],
    ["Quelle ligne est correcte ?",["#define PI = 3.14;","#define PI 3.14","define PI 3.14;","const PI 3.14"],1,"#define NOM valeur, sans = ni point-virgule."]
  ]
},
/* ------------------------------------------------------------------ 3 */
{ id:"ch3", titre:"Opérateurs et expressions", resume:"Calculs, division entière, incrémentation, comparaisons et logique.",
  cours:[
    { h:"Opérateurs arithmétiques", p:"<code>+ - * /</code> et <code>%</code> (reste de la division entière). Si les deux opérandes sont entiers, <code>/</code> donne une <b>division entière</b> : <code>7 / 2</code> vaut 3. Avec au moins un réel, la division est réelle : <code>7 / 2.0</code> vaut 3.5.",
      code:R`int q = 17 / 5;    /* 3 */
int r = 17 % 5;    /* 2 */
float x = 17 / 5.0; /* 3.4 */` },
    { h:"Affectation composée", p:"<code>x += 3</code> équivaut à <code>x = x + 3</code>. Même principe pour <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>%=</code>." },
    { h:"Incrémentation et décrémentation", p:"<code>i++</code> et <code>++i</code> ajoutent 1 à <code>i</code>. La différence apparaît dans une expression : <code>j = i++</code> utilise d'abord l'ancienne valeur de <code>i</code> ; <code>j = ++i</code> incrémente d'abord.",
      code:R`int i = 5, j;
j = i++;   /* j = 5, i = 6 */
j = ++i;   /* i = 7, j = 7 */` },
    { h:"Comparaisons et opérateurs logiques", p:"Les comparaisons <code>== != &lt; &gt; &lt;= &gt;=</code> valent 1 (vrai) ou 0 (faux). Les opérateurs logiques combinent des conditions :",
      liste:["<code>&amp;&amp;</code> : ET (vrai si les deux sont vraies)","<code>||</code> : OU (vrai si au moins une est vraie)","<code>!</code> : NON","En C, toute valeur non nulle est considérée comme vraie"] },
    { h:"Priorité des opérateurs", p:"Du plus prioritaire au moins prioritaire : <code>! ++ --</code>, puis <code>* / %</code>, puis <code>+ -</code>, puis les comparaisons, puis <code>&amp;&amp;</code>, puis <code>||</code>, enfin l'affectation. En cas de doute, mettez des parenthèses." },
    { h:"L'opérateur conditionnel", p:"<code>condition ? valeur1 : valeur2</code> vaut <code>valeur1</code> si la condition est vraie, sinon <code>valeur2</code>.",
      code:R`int max = (a > b) ? a : b;` }
  ],
  exemples:[
    { titre:"Division entière et réelle", code:R`#include <stdio.h>

int main()
{
    int a = 7, b = 2;
    printf("a / b   = %d\n", a / b);
    printf("a %% b   = %d\n", a % b);
    printf("a / 2.0 = %.1f\n", a / 2.0);
    return 0;
}` },
    { titre:"i++ ou ++i ?", code:R`#include <stdio.h>

int main()
{
    int i = 5, j;
    j = i++;
    printf("Apres j = i++ : i = %d, j = %d\n", i, j);
    j = ++i;
    printf("Apres j = ++i : i = %d, j = %d\n", i, j);
    return 0;
}` }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    printf("%d %d %d\n", 17 / 5, 17 % 5, 2 + 3 * 4);
    return 0;
}`, reponse:"3 2 14", aide:"Division entière, reste, puis * avant +." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int i = 3, j;
    j = i++;
    printf("%d %d\n", i, j);
    j = ++i * 2;
    printf("%d %d\n", i, j);
    return 0;
}`, reponse:"4 3\n5 10", aide:"j = i++ prend l'ancienne valeur ; ++i incrémente avant le calcul." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int a = 4, b = 9;
    printf("%d %d %d\n", a > 2 && b < 5, a > 2 || b < 5, !(a == 4));
    return 0;
}`, reponse:"0 1 0", aide:"Une comparaison vaut 1 (vrai) ou 0 (faux)." },
    { type:"trou", enonce:"Complétez pour convertir une durée en secondes en heures, minutes et secondes.", code:R`#include <stdio.h>

int main()
{
    int s = 7384;
    int h = s [[/]] 3600;
    int m = (s [[%]] 3600) / 60;
    int sec = s % [[60]];
    printf("%d h %d min %d s\n", h, m, sec);
    return 0;
}`, sortie:"2 h 3 min 4 s" },
    { type:"prog", enonce:"Les notes d'un étudiant sont 12, 15.5 et 9. Calculez la moyenne et affichez-la avec deux décimales :<pre>Moyenne = 12.17</pre>", depart:R`#include <stdio.h>

int main()
{
    float n1 = 12, n2 = 15.5, n3 = 9;

    return 0;
}`, tests:[{ entree:"", sortie:"Moyenne = 12.17" }], exige:[{ re:"/\\s*3", msg:"La moyenne doit être calculée en divisant par 3." }], solution:R`#include <stdio.h>

int main()
{
    float n1 = 12, n2 = 15.5, n3 = 9;
    float moyenne = (n1 + n2 + n3) / 3;
    printf("Moyenne = %.2f\n", moyenne);
    return 0;
}` },
    { type:"prog", enonce:"La variable <code>n</code> vaut 2026. Avec les opérateurs <code>/</code> et <code>%</code>, affichez la somme de ses chiffres :<pre>Somme des chiffres = 10</pre>", depart:R`#include <stdio.h>

int main()
{
    int n = 2026;

    return 0;
}`, tests:[{ entree:"", sortie:"Somme des chiffres = 10" }], exige:[{ re:"%\\s*10", msg:"Utilisez n % 10 pour obtenir le dernier chiffre." }], solution:R`#include <stdio.h>

int main()
{
    int n = 2026;
    int u = n % 10;          /* unités   */
    int d = (n / 10) % 10;   /* dizaines */
    int c = (n / 100) % 10;  /* centaines */
    int m = n / 1000;        /* milliers */
    printf("Somme des chiffres = %d\n", u + d + c + m);
    return 0;
}` }
  ],
  quiz:[
    ["Que vaut 9 / 2 en C (deux entiers) ?",["4.5","4","5","0"],1,"Entre deux entiers, / est une division entière."],
    ["Que vaut 9 % 2 ?",["4","1","0","4.5"],1,"9 = 2 × 4 + 1 : le reste est 1."],
    ["Après int i = 2; int j = i++; que valent i et j ?",["i=3, j=3","i=3, j=2","i=2, j=3","i=2, j=2"],1,"Post-incrémentation : j reçoit 2, puis i passe à 3."],
    ["Que vaut l'expression 5 > 3 && 2 > 4 ?",["1","0","2","Erreur"],1,"La seconde condition est fausse, donc le ET vaut 0."],
    ["x *= 3 + 1 équivaut à :",["x = x * 3 + 1","x = x * (3 + 1)","x = 3 * x + 1","x = x + 4"],1,"L'expression à droite est calculée en entier avant la multiplication."]
  ]
},
/* ------------------------------------------------------------------ 4 */
{ id:"ch4", titre:"Entrées-sorties", resume:"Formater l'affichage avec printf et lire des données avec scanf.",
  cours:[
    { h:"Les formats de printf", p:"Chaque code de format correspond à un type :",
      liste:["<code>%d</code> : int — <code>%f</code> : float ou double — <code>%c</code> : char — <code>%s</code> : chaîne","<code>%e</code> : notation scientifique — <code>%x</code> : hexadécimal — <code>%o</code> : octal","<code>%%</code> : affiche le caractère %"] },
    { h:"Largeur et précision", p:"On peut fixer la largeur d'affichage et le nombre de décimales :",
      code:R`printf("[%5d]\n", 42);    /* [   42]  largeur 5, aligné à droite */
printf("[%-5d]\n", 42);   /* [42   ]  aligné à gauche          */
printf("[%05d]\n", 42);   /* [00042]  complété par des zéros   */
printf("[%.2f]\n", 3.14159); /* [3.14] 2 décimales            */` },
    { h:"Lire avec scanf", p:"<code>scanf</code> lit des valeurs au clavier et les range dans des variables. Il faut donner l'<b>adresse</b> de la variable, avec <code>&amp;</code>.",
      code:R`int age;
float taille;
scanf("%d", &age);
scanf("%f", &taille);
scanf("%d %f", &age, &taille);  /* deux valeurs à la fois */` },
    { h:"Pièges de scanf", p:"Pour un <code>double</code>, utilisez <code>%lf</code> dans scanf. Pour lire un caractère après un nombre, mettez un espace : <code>scanf(\" %c\", &amp;c)</code>, sinon le retour à la ligne précédent est lu comme caractère. L'oubli de <code>&amp;</code> est l'erreur la plus fréquente." },
    { h:"Saisir les données dans cet outil", p:"Avant d'exécuter un programme qui utilise <code>scanf</code>, tapez les valeurs dans la zone <b>Entrée (clavier)</b>, séparées par des espaces ou des retours à la ligne." }
  ],
  exemples:[
    { titre:"Lire un âge et une taille", code:R`#include <stdio.h>

int main()
{
    int age;
    float taille;
    printf("Votre age : ");
    scanf("%d", &age);
    printf("Votre taille (m) : ");
    scanf("%f", &taille);
    printf("\nVous avez %d ans et mesurez %.2f m.\n", age, taille);
    return 0;
}`, entree:"19\n1.75" },
    { titre:"Une petite facture", code:R`#include <stdio.h>

int main()
{
    int quantite;
    float prix;
    printf("Quantite et prix unitaire : ");
    scanf("%d %f", &quantite, &prix);
    printf("\n%-10s%8s%10s\n", "Qte", "Prix", "Total");
    printf("%-10d%8.2f%10.2f\n", quantite, prix, quantite * prix);
    return 0;
}`, entree:"3 12.5" }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ? Comptez bien les espaces.", code:R`#include <stdio.h>

int main()
{
    printf("[%5d]\n", 42);
    printf("[%-5d]\n", 42);
    printf("[%05d]\n", 42);
    printf("[%.3f]\n", 3.14159);
    return 0;
}`, reponse:"[   42]\n[42   ]\n[00042]\n[3.142]", aide:"Largeur 5 : le nombre occupe 5 positions ; %.3f arrondit à 3 décimales." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    printf("%x %o %c %d%%\n", 255, 8, 66, 50);
    return 0;
}`, reponse:"ff 10 B 50%", aide:"255 en hexadécimal, 8 en octal, le caractère de code 66, puis %% affiche %." },
    { type:"trou", enonce:"Complétez la lecture d'un entier et d'un réel double.", code:R`#include <stdio.h>

int main()
{
    int n;
    double x;
    scanf("[[%d|%i]]", [[&]]n);
    scanf("[[%lf]]", &x);
    printf("%d %.1f\n", n, x);
    return 0;
}`, entree:"7 2.5", sortie:"7 2.5" },
    { type:"prog", enonce:"Lisez deux entiers puis affichez :<pre>Somme = ...\nDifference = ...\nProduit = ...</pre>Exemple : pour <code>7 5</code>, on obtient 12, 2 et 35.", depart:R`#include <stdio.h>

int main()
{
    int a, b;

    return 0;
}`, tests:[{ entree:"7 5", sortie:"Somme = 12\nDifference = 2\nProduit = 35" },{ entree:"-3 4", sortie:"Somme = 1\nDifference = -7\nProduit = -12" }], exige:[{ re:"scanf", msg:"Les valeurs doivent être lues avec scanf." }], solution:R`#include <stdio.h>

int main()
{
    int a, b;
    printf("Deux entiers : ");
    scanf("%d %d", &a, &b);
    printf("Somme = %d\n", a + b);
    printf("Difference = %d\n", a - b);
    printf("Produit = %d\n", a * b);
    return 0;
}` },
    { type:"prog", enonce:"Lisez un prix hors taxe (réel) et affichez le prix TTC (TVA 20 %) avec deux décimales :<pre>TTC = 120.00</pre>", depart:R`#include <stdio.h>

int main()
{

    return 0;
}`, tests:[{ entree:"100", sortie:"TTC = 120.00" },{ entree:"19.99", sortie:"TTC = 23.99" },{ entree:"0", sortie:"TTC = 0.00" }], exige:[{ re:"scanf", msg:"Le prix doit être lu avec scanf." }], solution:R`#include <stdio.h>

int main()
{
    float ht;
    printf("Prix HT : ");
    scanf("%f", &ht);
    printf("TTC = %.2f\n", ht * 1.2);
    return 0;
}` }
  ],
  quiz:[
    ["Quel format faut-il dans scanf pour un double ?",["%f","%d","%lf","%c"],2,"scanf a besoin de %lf pour un double."],
    ["Quelle instruction lit correctement un entier n ?",["scanf(\"%d\", n);","scanf(\"%d\", &n);","scanf(%d, &n);","scanf(\"&d\", n);"],1,"scanf attend l'adresse de la variable : &n."],
    ["Qu'affiche printf(\"%05d\", 42) ?",["42000","   42","00042","42"],2,"Le 0 complète la largeur 5 par des zéros à gauche."],
    ["Comment afficher le caractère % avec printf ?",["\\%","%%","%c","/%"],1,"%% affiche un seul %."],
    ["Pourquoi écrit-on scanf(\" %c\", &c) avec un espace ?",["Pour lire deux caractères","Pour ignorer les espaces et retours à la ligne en attente","Pour afficher un espace","Ce n'est pas utile"],1,"L'espace consomme les blancs restés dans le tampon d'entrée."]
  ]
},
/* ------------------------------------------------------------------ 5 */
{ id:"ch5", titre:"Conversions de type", resume:"Conversions implicites, troncature, cast explicite et codes ASCII.",
  cours:[
    { h:"Conversion implicite dans un calcul", p:"Quand une expression mélange des types, le C convertit automatiquement vers le type le plus large : <code>char → int → float → double</code>. Ainsi <code>5 / 2.0</code> est calculé en réel." },
    { h:"Conversion par affectation", p:"En affectant un réel à un entier, la partie décimale est <b>tronquée</b> (pas arrondie) :",
      code:R`int n = 9.99;    /* n vaut 9 */
float x = 7;     /* x vaut 7.0 */` },
    { h:"Le cast (conversion explicite)", p:"On force une conversion en écrivant le type entre parenthèses. C'est indispensable pour obtenir une division réelle entre deux entiers :",
      code:R`int somme = 47, n = 4;
float m1 = somme / n;          /* 11.0 : division entière d'abord ! */
float m2 = (float)somme / n;   /* 11.75 */
float m3 = (float)(somme / n); /* 11.0 : cast trop tard */` },
    { h:"Caractères et codes ASCII", p:"Un <code>char</code> est stocké sous forme de son code : <code>'A'</code> = 65, <code>'a'</code> = 97, <code>'0'</code> = 48. L'écart entre une minuscule et sa majuscule est 32. Le chiffre d'un caractère <code>c</code> vaut <code>c - '0'</code>." }
  ],
  exemples:[
    { titre:"Le piège de la moyenne", code:R`#include <stdio.h>

int main()
{
    int somme = 47, n = 4;
    printf("Sans cast      : %.2f\n", (float)(somme / n));
    printf("Avec cast      : %.2f\n", (float)somme / n);
    printf("Troncature     : %d\n", (int)11.75);
    return 0;
}` },
    { titre:"Minuscule vers majuscule", code:R`#include <stdio.h>

int main()
{
    char c = 'e';
    char maj = c - 32;            /* ou c - 'a' + 'A' */
    printf("%c -> %c\n", c, maj);
    printf("Codes : %d -> %d\n", c, maj);
    printf("Valeur du chiffre '7' : %d\n", '7' - '0');
    return 0;
}` }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int a = 7, b = 2;
    float x = a / b;
    float y = (float)a / b;
    float z = (float)(a / b);
    printf("%.1f %.1f %.1f\n", x, y, z);
    return 0;
}`, reponse:"3.0 3.5 3.0", aide:"Le cast doit porter sur un opérande, pas sur le résultat d'une division entière." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int n = 9.99;
    char c = 'a' - 32;
    double d = 5 / 2 + 5 / 2.0;
    printf("%d %c %.1f\n", n, c, d);
    return 0;
}`, reponse:"9 A 4.5", aide:"9.99 est tronqué ; 5/2 vaut 2 et 5/2.0 vaut 2.5." },
    { type:"trou", enonce:"Complétez pour obtenir la vraie moyenne réelle.", code:R`#include <stdio.h>

int main()
{
    int somme = 62, n = 5;
    float moyenne = [[(float)|(double)]] somme / n;
    printf("Moyenne = %.2f\n", moyenne);
    return 0;
}`, sortie:"Moyenne = 12.40" },
    { type:"prog", enonce:"Lisez une lettre minuscule et affichez sa majuscule et le code ASCII de la majuscule. Pour <code>b</code> :<pre>Majuscule : B (code 66)</pre>", depart:R`#include <stdio.h>

int main()
{
    char c;

    return 0;
}`, tests:[{ entree:"b", sortie:"Majuscule : B (code 66)" },{ entree:"z", sortie:"Majuscule : Z (code 90)" }], exige:[{ re:"scanf", msg:"Lisez la lettre avec scanf." }], solution:R`#include <stdio.h>

int main()
{
    char c, maj;
    printf("Une lettre minuscule : ");
    scanf(" %c", &c);
    maj = c - 32;
    printf("Majuscule : %c (code %d)\n", maj, maj);
    return 0;
}` },
    { type:"prog", enonce:"Lisez un réel et affichez sa partie entière (par conversion en int) et sa partie décimale avec deux chiffres :<pre>Partie entiere = 12\nPartie decimale = 0.75</pre>", depart:R`#include <stdio.h>

int main()
{
    float x;

    return 0;
}`, tests:[{ entree:"12.75", sortie:"Partie entiere = 12\nPartie decimale = 0.75" },{ entree:"3.5", sortie:"Partie entiere = 3\nPartie decimale = 0.50" }], exige:[{ re:"\\(\\s*int\\s*\\)|int\\s+\\w+\\s*=\\s*x", msg:"Obtenez la partie entière par conversion en int." }], solution:R`#include <stdio.h>

int main()
{
    float x;
    int e;
    printf("Un reel : ");
    scanf("%f", &x);
    e = (int)x;
    printf("Partie entiere = %d\n", e);
    printf("Partie decimale = %.2f\n", x - e);
    return 0;
}` }
  ],
  quiz:[
    ["Que vaut int n = 7.8; ?",["8","7","7.8","Erreur"],1,"Conversion par troncature : la partie décimale est perdue."],
    ["Quelle expression donne 2.5 ?",["5 / 2","(float)(5 / 2)","(float)5 / 2","(int)5 / 2.0f"],2,"Le cast porte sur 5 : la division devient réelle."],
    ["Quel est le code ASCII de 'a' ?",["65","97","48","32"],1,"'a' = 97 ; 'A' = 65."],
    ["Que vaut '8' - '0' ?",["8","56","48","'8'"],0,"Les chiffres ont des codes consécutifs : 56 - 48 = 8."],
    ["Dans 3 + 2.5, l'entier 3 est converti en :",["char","int","double","Il n'est pas converti"],2,"Le calcul se fait dans le type le plus large (double)."]
  ]
},
/* ------------------------------------------------------------------ 6 */
{ id:"ch6", titre:"Structures conditionnelles", resume:"if, else, else if et switch pour choisir entre plusieurs traitements.",
  cours:[
    { h:"if ... else", p:"Le bloc après <code>if</code> s'exécute si la condition est vraie, sinon c'est le bloc <code>else</code> (facultatif). Les accolades sont obligatoires dès qu'un bloc contient plusieurs instructions.",
      code:R`if (note >= 10) {
    printf("Admis\n");
} else {
    printf("Ajourne\n");
}` },
    { h:"else if : plusieurs cas", p:"Les conditions sont testées dans l'ordre ; seul le premier bloc dont la condition est vraie s'exécute.",
      code:R`if (note >= 16)      printf("Tres bien\n");
else if (note >= 14) printf("Bien\n");
else if (note >= 12) printf("Assez bien\n");
else                 printf("Passable ou moins\n");` },
    { h:"Conditions composées", p:"On combine les tests avec <code>&amp;&amp;</code> et <code>||</code> : <code>if (note &gt;= 0 &amp;&amp; note &lt;= 20)</code>. On ne peut pas écrire <code>0 &lt;= note &lt;= 20</code> comme en mathématiques." },
    { h:"switch", p:"<code>switch</code> compare une valeur entière (ou un caractère) à des constantes. Sans <code>break</code>, l'exécution continue dans le cas suivant.",
      code:R`switch (choix) {
    case 1:  printf("Ajouter\n");   break;
    case 2:  printf("Supprimer\n"); break;
    default: printf("Choix invalide\n");
}` },
    { h:"Le piège = au lieu de ==", p:"<code>if (x = 5)</code> <b>affecte</b> 5 à x et la condition est toujours vraie. Pour comparer, il faut <code>==</code>." }
  ],
  exemples:[
    { titre:"Mention d'un étudiant", code:R`#include <stdio.h>

int main()
{
    float note;
    printf("Note sur 20 : ");
    scanf("%f", &note);
    if (note < 0 || note > 20)
        printf("Note invalide\n");
    else if (note >= 16) printf("Tres bien\n");
    else if (note >= 14) printf("Bien\n");
    else if (note >= 12) printf("Assez bien\n");
    else if (note >= 10) printf("Passable\n");
    else                 printf("Ajourne\n");
    return 0;
}`, entree:"13.5" },
    { titre:"Calculatrice avec switch", code:R`#include <stdio.h>

int main()
{
    float a, b;
    char op;
    printf("Operation (ex : 8 * 5) : ");
    scanf("%f %c %f", &a, &op, &b);
    switch (op) {
        case '+': printf("= %.2f\n", a + b); break;
        case '-': printf("= %.2f\n", a - b); break;
        case '*': printf("= %.2f\n", a * b); break;
        case '/':
            if (b != 0) printf("= %.2f\n", a / b);
            else        printf("Division par zero !\n");
            break;
        default: printf("Operateur inconnu\n");
    }
    return 0;
}`, entree:"8 * 5" }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ? Lisez la condition attentivement.", code:R`#include <stdio.h>

int main()
{
    int x = 0;
    if (x = 5)
        printf("A\n");
    else
        printf("B\n");
    printf("%d\n", x);
    return 0;
}`, reponse:"A\n5", aide:"x = 5 est une affectation : elle vaut 5, donc la condition est vraie." },
    { type:"sortie", enonce:"Qu'affiche ce programme ? (n vaut 2)", code:R`#include <stdio.h>

int main()
{
    int n = 2;
    switch (n) {
        case 1: printf("un ");
        case 2: printf("deux ");
        case 3: printf("trois ");
                break;
        default: printf("autre");
    }
    printf("\n");
    return 0;
}`, reponse:"deux trois", aide:"Sans break après le cas 2, l'exécution continue dans le cas 3." },
    { type:"trou", enonce:"Complétez pour afficher le plus grand de trois entiers.", code:R`#include <stdio.h>

int main()
{
    int a = 8, b = 15, c = 11, max;
    if (a >= b [[&&]] a >= c)
        max = a;
    [[else if]] (b >= c)
        max = b;
    [[else]]
        max = c;
    printf("Max = %d\n", max);
    return 0;
}`, sortie:"Max = 15" },
    { type:"prog", enonce:"Lisez un entier et affichez <code>pair</code> ou <code>impair</code>.", depart:R`#include <stdio.h>

int main()
{
    int n;

    return 0;
}`, tests:[{ entree:"4", sortie:"pair" },{ entree:"7", sortie:"impair" },{ entree:"0", sortie:"pair" },{ entree:"-3", sortie:"impair" }], exige:[{ re:"if|\\?", msg:"Utilisez une structure if (ou l'opérateur ?:)." }], solution:R`#include <stdio.h>

int main()
{
    int n;
    printf("Un entier : ");
    scanf("%d", &n);
    if (n % 2 == 0)
        printf("pair\n");
    else
        printf("impair\n");
    return 0;
}` },
    { type:"prog", enonce:"Lisez trois longueurs (réels) et indiquez la nature du triangle :<pre>equilateral   (3 côtés égaux)\nisocele       (exactement 2 côtés égaux)\nquelconque    (aucun côté égal)</pre>Affichez uniquement le mot.", depart:R`#include <stdio.h>

int main()
{
    float a, b, c;

    return 0;
}`, tests:[{ entree:"3 3 3", sortie:"equilateral" },{ entree:"5 3 5", sortie:"isocele" },{ entree:"4 4 6", sortie:"isocele" },{ entree:"3 4 5", sortie:"quelconque" }], solution:R`#include <stdio.h>

int main()
{
    float a, b, c;
    printf("Trois longueurs : ");
    scanf("%f %f %f", &a, &b, &c);
    if (a == b && b == c)
        printf("equilateral\n");
    else if (a == b || b == c || a == c)
        printf("isocele\n");
    else
        printf("quelconque\n");
    return 0;
}` }
  ],
  quiz:[
    ["Quel opérateur compare deux valeurs ?",["=","==","=>","!"],1,"= affecte, == compare."],
    ["Comment tester que x est entre 0 et 20 inclus ?",["0 <= x <= 20","x >= 0 && x <= 20","x >= 0 || x <= 20","x => 0 and x <= 20"],1,"Il faut combiner deux comparaisons avec &&."],
    ["Dans un switch, à quoi sert break ?",["A arrêter le programme","A sortir du switch","A passer au cas suivant","A rien"],1,"Sans break, l'exécution continue dans les cas suivants."],
    ["Quel type de valeur ne peut pas être testé par switch ?",["int","char","float","Une constante caractère"],2,"switch accepte des valeurs entières (int, char), pas des réels."],
    ["Que fait default dans un switch ?",["Il est obligatoire","Il traite les valeurs qui ne correspondent à aucun case","Il remet la variable à 0","Il répète le switch"],1,"default est facultatif et traite les autres cas."]
  ]
},
/* ------------------------------------------------------------------ 7 */
{ id:"ch7", titre:"Les boucles", resume:"Répéter des instructions avec while, do ... while et for.",
  cours:[
    { h:"La boucle while", p:"Tant que la condition est vraie, le bloc est répété. La condition est testée <b>avant</b> chaque tour : le bloc peut ne jamais s'exécuter.",
      code:R`int i = 1;
while (i <= 5) {
    printf("%d ", i);
    i++;
}` },
    { h:"La boucle do ... while", p:"La condition est testée <b>après</b> le bloc : il s'exécute au moins une fois. Très utile pour contrôler une saisie.",
      code:R`do {
    printf("Note (0 a 20) : ");
    scanf("%f", &note);
} while (note < 0 || note > 20);` },
    { h:"La boucle for", p:"Elle regroupe initialisation, condition et mise à jour. On l'utilise quand le nombre de tours est connu.",
      code:R`for (i = 1; i <= 10; i++)
    printf("%d x 7 = %d\n", i, i * 7);` },
    { h:"Compteur et accumulateur", p:"Un <b>compteur</b> compte les tours (<code>n++</code>), un <b>accumulateur</b> cumule des valeurs (<code>somme += x</code>). Pensez à les initialiser avant la boucle (0 pour une somme, 1 pour un produit)." },
    { h:"break, continue et boucles imbriquées", p:"<code>break</code> sort de la boucle ; <code>continue</code> passe directement au tour suivant. Une boucle peut en contenir une autre : la boucle intérieure fait tous ses tours à chaque tour de la boucle extérieure. Attention aux boucles infinies : la condition doit finir par devenir fausse." }
  ],
  exemples:[
    { titre:"Somme des n premiers entiers", code:R`#include <stdio.h>

int main()
{
    int n, i, somme = 0;
    printf("n = ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++)
        somme += i;
    printf("1 + 2 + ... + %d = %d\n", n, somme);
    return 0;
}`, entree:"10" },
    { titre:"Saisie contrôlée", code:R`#include <stdio.h>

int main()
{
    int note;
    do {
        printf("Note entre 0 et 20 : ");
        scanf("%d", &note);
        if (note < 0 || note > 20) printf("Invalide !\n");
    } while (note < 0 || note > 20);
    printf("Note acceptee : %d\n", note);
    return 0;
}`, entree:"25\n-4\n14" }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int i;
    for (i = 1; i < 12; i += 3)
        printf("%d ", i);
    printf("\n");
    return 0;
}`, reponse:"1 4 7 10", aide:"i prend les valeurs 1, 4, 7, 10 ; 13 n'est pas < 12." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int i = 10, j = 5;
    while (i > 0)
        i -= 3;
    do {
        j++;
    } while (j < 3);
    printf("%d %d\n", i, j);
    return 0;
}`, reponse:"-2 6", aide:"i : 10, 7, 4, 1, -2. Le do ... while s'exécute une fois même si j < 3 est faux." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int i, j;
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= i; j++)
            printf("%d", j);
        printf("\n");
    }
    return 0;
}`, reponse:"1\n12\n123", aide:"Au tour i, la boucle intérieure affiche 1 à i." },
    { type:"trou", enonce:"Complétez le calcul de la factorielle de n (n! = 1 × 2 × ... × n).", code:R`#include <stdio.h>

int main()
{
    int n = 6, i, f = [[1]];
    for (i = 1; i [[<=]] n; i++)
        f [[*=]] i;
    printf("%d! = %d\n", n, f);
    return 0;
}`, sortie:"6! = 720" },
    { type:"prog", enonce:"Lisez un entier n et affichez la somme 1 + 2 + ... + n avec une boucle :<pre>Somme = 55</pre>(pour n = 10)", depart:R`#include <stdio.h>

int main()
{
    int n;

    return 0;
}`, tests:[{ entree:"10", sortie:"Somme = 55" },{ entree:"1", sortie:"Somme = 1" },{ entree:"100", sortie:"Somme = 5050" }], exige:[{ re:"\\b(for|while)\\b", msg:"Utilisez une boucle for ou while." }], solution:R`#include <stdio.h>

int main()
{
    int n, i, somme = 0;
    printf("n = ");
    scanf("%d", &n);
    for (i = 1; i <= n; i++)
        somme += i;
    printf("Somme = %d\n", somme);
    return 0;
}` },
    { type:"prog", enonce:"Lisez un entier n et affichez sa table de multiplication de 1 à 10, au format :<pre>7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70</pre>", depart:R`#include <stdio.h>

int main()
{

    return 0;
}`, tests:[{ entree:"7", sortie:"7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70" },{ entree:"3", sortie:"3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30" }], exige:[{ re:"\\b(for|while)\\b", msg:"Utilisez une boucle." }], solution:R`#include <stdio.h>

int main()
{
    int n, i;
    printf("n = ");
    scanf("%d", &n);
    for (i = 1; i <= 10; i++)
        printf("%d x %d = %d\n", n, i, n * i);
    return 0;
}` },
    { type:"prog", enonce:"Défi : lisez un entier n ≥ 2 et indiquez s'il est premier :<pre>17 est premier\n18 n'est pas premier</pre>", depart:R`#include <stdio.h>

int main()
{
    int n;

    return 0;
}`, tests:[{ entree:"17", sortie:"17 est premier" },{ entree:"18", sortie:"18 n'est pas premier" },{ entree:"2", sortie:"2 est premier" },{ entree:"91", sortie:"91 n'est pas premier" }], exige:[{ re:"\\b(for|while)\\b", msg:"Utilisez une boucle pour chercher un diviseur." }], solution:R`#include <stdio.h>

int main()
{
    int n, d, premier = 1;
    printf("n = ");
    scanf("%d", &n);
    for (d = 2; d * d <= n; d++)
        if (n % d == 0) {
            premier = 0;
            break;
        }
    if (premier) printf("%d est premier\n", n);
    else         printf("%d n'est pas premier\n", n);
    return 0;
}` }
  ],
  quiz:[
    ["Quelle boucle s'exécute toujours au moins une fois ?",["while","for","do ... while","Aucune"],2,"La condition de do ... while est testée après le bloc."],
    ["Combien de fois s'exécute for (i = 0; i < 5; i++) ?",["4","5","6","Infiniment"],1,"i prend les valeurs 0, 1, 2, 3, 4."],
    ["Que fait continue dans une boucle ?",["Il sort de la boucle","Il passe au tour suivant","Il recommence la boucle depuis le début","Il arrête le programme"],1,"continue saute la fin du bloc et passe au tour suivant."],
    ["Pourquoi while (i < 10) { printf(\"%d\", i); } tourne-t-il sans fin ?",["Il manque un point-virgule","i n'est jamais modifié","printf est mal écrit","La condition est fausse"],1,"La condition ne change jamais : il faut incrémenter i."],
    ["Pour calculer un produit dans une boucle, on initialise l'accumulateur à :",["0","1","-1","n"],1,"0 rendrait le produit toujours nul."]
  ]
},
/* ------------------------------------------------------------------ 8 */
{ id:"ch8", titre:"Les tableaux", resume:"Ranger plusieurs valeurs de même type, parcourir, chercher, trier.",
  cours:[
    { h:"Déclarer un tableau", p:"Un tableau regroupe N éléments de même type, rangés côte à côte en mémoire. Les indices vont de <b>0 à N-1</b>.",
      code:R`#define N 5
int notes[N];                      /* 5 entiers : notes[0] ... notes[4] */
int t[5] = {12, 8, 15, 10, 17};    /* avec initialisation */
float moy[30] = {0};               /* tous les éléments à 0 */` },
    { h:"Parcourir un tableau", p:"On utilise presque toujours une boucle <code>for</code> sur l'indice :",
      code:R`for (i = 0; i < N; i++)
    scanf("%d", &t[i]);        /* lecture  */
for (i = 0; i < N; i++)
    printf("%d ", t[i]);       /* affichage */` },
    { h:"Algorithmes classiques", liste:["<b>Somme / moyenne</b> : accumuler <code>t[i]</code> dans une boucle","<b>Maximum</b> : partir de <code>max = t[0]</code> et comparer avec chaque élément","<b>Recherche</b> : parcourir jusqu'à trouver la valeur cherchée","<b>Tri à bulles</b> : échanger deux voisins mal placés, jusqu'à ce que tout soit trié"] },
    { h:"Tableaux à deux dimensions", p:"Une matrice se déclare avec deux tailles : lignes puis colonnes. On la parcourt avec deux boucles imbriquées.",
      code:R`int m[2][3] = { {1, 2, 3},
                 {4, 5, 6} };
printf("%d\n", m[1][2]);   /* 6 : ligne 1, colonne 2 */` },
    { h:"Attention au débordement", p:"Le C ne vérifie pas les indices : écrire dans <code>t[5]</code> pour un tableau de 5 éléments corrompt la mémoire. Cet outil vous signale cette erreur, mais un vrai compilateur ne le fera pas." }
  ],
  exemples:[
    { titre:"Moyenne et meilleure note", code:R`#include <stdio.h>
#define N 6

int main()
{
    float notes[N] = {12.5, 8, 15, 10.5, 17, 13};
    float somme = 0, max = notes[0];
    int i;
    for (i = 0; i < N; i++) {
        somme += notes[i];
        if (notes[i] > max) max = notes[i];
    }
    printf("Moyenne = %.2f\n", somme / N);
    printf("Meilleure note = %.2f\n", max);
    return 0;
}` },
    { titre:"Tri à bulles", code:R`#include <stdio.h>
#define N 6

int main()
{
    int t[N] = {29, 4, 17, 8, 23, 1};
    int i, j, tmp;
    for (i = 0; i < N - 1; i++)
        for (j = 0; j < N - 1 - i; j++)
            if (t[j] > t[j + 1]) {
                tmp = t[j];
                t[j] = t[j + 1];
                t[j + 1] = tmp;
            }
    for (i = 0; i < N; i++)
        printf("%d ", t[i]);
    printf("\n");
    return 0;
}` }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int t[5] = {4, 8, 15, 16, 23};
    printf("%d %d %d\n", t[0], t[4], t[1] + t[2]);
    return 0;
}`, reponse:"4 23 23", aide:"Le premier élément a l'indice 0, le dernier l'indice 4." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int t[4] = {1, 2, 3, 4};
    int i;
    for (i = 0; i < 4; i++)
        t[i] = t[i] * t[i];
    for (i = 3; i >= 0; i--)
        printf("%d ", t[i]);
    printf("\n");
    return 0;
}`, reponse:"16 9 4 1", aide:"Chaque élément est élevé au carré, puis affiché de la fin vers le début." },
    { type:"trou", enonce:"Complétez la recherche du plus petit élément.", code:R`#include <stdio.h>
#define N 6

int main()
{
    int t[N] = {14, 9, 21, 3, 17, 8};
    int i, min = [[t[0]]];
    for (i = 1; i < [[N|6]]; i++)
        if (t[i] [[<|<=]] min)
            min = t[i];
    printf("Min = %d\n", min);
    return 0;
}`, sortie:"Min = 3" },
    { type:"prog", enonce:"Lisez un entier n (au plus 100), puis n entiers dans un tableau. Affichez :<pre>Somme = ...\nMoyenne = ...</pre>avec la moyenne à deux décimales.", depart:R`#include <stdio.h>

int main()
{
    int t[100], n, i;

    return 0;
}`, tests:[{ entree:"5\n1 2 3 4 5", sortie:"Somme = 15\nMoyenne = 3.00" },{ entree:"4\n10 -2 7 1", sortie:"Somme = 16\nMoyenne = 4.00" },{ entree:"3\n2 3 3", sortie:"Somme = 8\nMoyenne = 2.67" }], exige:[{ re:"t\\s*\\[\\s*i\\s*\\]", msg:"Rangez les valeurs dans le tableau t[i]." }], solution:R`#include <stdio.h>

int main()
{
    int t[100], n, i, somme = 0;
    printf("n = ");
    scanf("%d", &n);
    for (i = 0; i < n; i++)
        scanf("%d", &t[i]);
    for (i = 0; i < n; i++)
        somme += t[i];
    printf("Somme = %d\n", somme);
    printf("Moyenne = %.2f\n", (float)somme / n);
    return 0;
}` },
    { type:"prog", enonce:"Lisez 5 entiers dans un tableau, puis affichez-les dans l'ordre inverse, séparés par un espace.<br>Pour <code>1 2 3 4 5</code> : <code>5 4 3 2 1</code>", depart:R`#include <stdio.h>

int main()
{
    int t[5], i;

    return 0;
}`, tests:[{ entree:"1 2 3 4 5", sortie:"5 4 3 2 1" },{ entree:"9 -1 0 7 3", sortie:"3 7 0 -1 9" }], exige:[{ re:"\\bfor\\b|\\bwhile\\b", msg:"Utilisez des boucles." }], solution:R`#include <stdio.h>

int main()
{
    int t[5], i;
    for (i = 0; i < 5; i++)
        scanf("%d", &t[i]);
    for (i = 4; i >= 0; i--)
        printf("%d ", t[i]);
    printf("\n");
    return 0;
}` },
    { type:"prog", enonce:"Défi : lisez n puis n entiers, triez-les par ordre croissant et affichez-les séparés par un espace.", depart:R`#include <stdio.h>

int main()
{
    int t[100], n, i, j, tmp;

    return 0;
}`, tests:[{ entree:"5\n29 4 17 8 1", sortie:"1 4 8 17 29" },{ entree:"4\n3 3 -1 2", sortie:"-1 2 3 3" }], solution:R`#include <stdio.h>

int main()
{
    int t[100], n, i, j, tmp;
    scanf("%d", &n);
    for (i = 0; i < n; i++)
        scanf("%d", &t[i]);
    for (i = 0; i < n - 1; i++)
        for (j = 0; j < n - 1 - i; j++)
            if (t[j] > t[j + 1]) {
                tmp = t[j]; t[j] = t[j + 1]; t[j + 1] = tmp;
            }
    for (i = 0; i < n; i++)
        printf("%d ", t[i]);
    printf("\n");
    return 0;
}` }
  ],
  quiz:[
    ["Pour int t[10], quels sont les indices valides ?",["1 à 10","0 à 10","0 à 9","1 à 9"],2,"Les indices vont de 0 à N-1."],
    ["Comment lire le i-ème élément avec scanf ?",["scanf(\"%d\", t[i]);","scanf(\"%d\", &t[i]);","scanf(\"%d\", &t);","scanf(\"%d\", t);"],1,"Il faut l'adresse de l'élément : &t[i]."],
    ["Que contient m[1][0] pour int m[2][2] = {{1,2},{3,4}} ?",["1","2","3","4"],2,"Ligne 1 (la deuxième), colonne 0."],
    ["Pour chercher le maximum, on initialise max avec :",["0","Le premier élément t[0]","-1","La taille du tableau"],1,"Partir de t[0] fonctionne même si toutes les valeurs sont négatives."],
    ["Que se passe-t-il en C si l'on écrit t[10] pour int t[10] ?",["Le tableau s'agrandit","Le compilateur refuse toujours","On sort du tableau : comportement indéfini","t[10] vaut 0"],2,"Le C ne vérifie pas les indices : c'est une erreur grave."]
  ]
},
/* ------------------------------------------------------------------ 9 */
{ id:"ch9", titre:"Les chaînes de caractères", resume:"Tableaux de char terminés par '\\0' et fonctions de string.h.",
  cours:[
    { h:"Une chaîne est un tableau de char", p:"Une chaîne se termine par le caractère nul <code>'\\0'</code>, qui marque sa fin. <code>\"Maroc\"</code> occupe donc 6 cases : M, a, r, o, c et <code>'\\0'</code>.",
      code:R`char ville[20] = "Errachidia";
char mot[] = "Maroc";      /* taille calculée : 6 */
printf("%s\n", ville);
printf("%c\n", ville[0]);  /* E */` },
    { h:"Lire une chaîne", p:"<code>scanf(\"%s\", nom)</code> lit un mot (jusqu'au premier espace), <b>sans</b> <code>&amp;</code> car le nom d'un tableau est déjà une adresse. Pour lire une ligne avec des espaces : <code>fgets(nom, 50, stdin)</code>." },
    { h:"Parcourir une chaîne", p:"On avance jusqu'au caractère <code>'\\0'</code> :",
      code:R`int i = 0;
while (s[i] != '\0') {
    printf("%c-", s[i]);
    i++;
}` },
    { h:"Fonctions de string.h", liste:["<code>strlen(s)</code> : longueur, sans compter <code>'\\0'</code>","<code>strcpy(d, s)</code> : copie s dans d (on ne peut pas écrire <code>d = s</code>)","<code>strcat(d, s)</code> : ajoute s à la fin de d","<code>strcmp(a, b)</code> : 0 si égales, négatif si a avant b, positif sinon"] },
    { h:"Fonctions de ctype.h", p:"<code>toupper(c)</code> et <code>tolower(c)</code> changent la casse ; <code>isdigit(c)</code>, <code>isalpha(c)</code>, <code>isupper(c)</code> testent la nature d'un caractère." }
  ],
  exemples:[
    { titre:"Longueur calculée à la main", code:R`#include <stdio.h>
#include <string.h>

int main()
{
    char s[50];
    int i = 0;
    printf("Un mot : ");
    scanf("%s", s);
    while (s[i] != '\0')
        i++;
    printf("Longueur (boucle)  : %d\n", i);
    printf("Longueur (strlen)  : %d\n", (int)strlen(s));
    return 0;
}`, entree:"Errachidia" },
    { titre:"Copier, concaténer, comparer", code:R`#include <stdio.h>
#include <string.h>

int main()
{
    char nom[30] = "Hanine";
    char complet[60];
    strcpy(complet, "Pr ");
    strcat(complet, nom);
    printf("%s\n", complet);
    if (strcmp("abc", "abd") < 0)
        printf("abc vient avant abd\n");
    return 0;
}` }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>
#include <string.h>

int main()
{
    char s[] = "Maroc";
    int n = strlen(s);
    printf("%d %c %c\n", n, s[0], s[n - 1]);
    printf("%d\n", (int)sizeof(s));
    return 0;
}`, reponse:"5 M c\n6", aide:"strlen ne compte pas '\\0', mais le tableau a une case de plus pour lui." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>
#include <string.h>

int main()
{
    char a[20] = "Sci";
    strcat(a, "ences");
    printf("%s %d\n", a, (int)strlen(a));
    printf("%d\n", strcmp(a, "Sciences") == 0);
    return 0;
}`, reponse:"Sciences 8\n1", aide:"strcat ajoute à la fin ; strcmp vaut 0 pour deux chaînes égales." },
    { type:"trou", enonce:"Complétez pour mettre une chaîne en majuscules.", code:R`#include <stdio.h>
#include <ctype.h>

int main()
{
    char s[] = "umi fs";
    int i = 0;
    while (s[i] [[!=]] '[[\0]]') {
        s[i] = [[toupper]](s[i]);
        i++;
    }
    printf("%s\n", s);
    return 0;
}`, sortie:"UMI FS" },
    { type:"prog", enonce:"Lisez un mot et comptez ses voyelles (a, e, i, o, u, y, en minuscule ou en majuscule) :<pre>Voyelles : 5</pre>(pour Errachidia)", depart:R`#include <stdio.h>

int main()
{
    char s[100];

    return 0;
}`, tests:[{ entree:"Errachidia", sortie:"Voyelles : 5" },{ entree:"UMI", sortie:"Voyelles : 2" },{ entree:"rythme", sortie:"Voyelles : 2" }], solution:R`#include <stdio.h>
#include <ctype.h>

int main()
{
    char s[100];
    int i, n = 0;
    char c;
    scanf("%s", s);
    for (i = 0; s[i] != '\0'; i++) {
        c = tolower(s[i]);
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' || c == 'y')
            n++;
    }
    printf("Voyelles : %d\n", n);
    return 0;
}` },
    { type:"prog", enonce:"Lisez un mot et indiquez s'il est un palindrome (il se lit de la même façon dans les deux sens) :<pre>radar est un palindrome\nmaroc n'est pas un palindrome</pre>", depart:R`#include <stdio.h>
#include <string.h>

int main()
{
    char s[100];

    return 0;
}`, tests:[{ entree:"radar", sortie:"radar est un palindrome" },{ entree:"maroc", sortie:"maroc n'est pas un palindrome" },{ entree:"elle", sortie:"elle est un palindrome" },{ entree:"ab", sortie:"ab n'est pas un palindrome" }], solution:R`#include <stdio.h>
#include <string.h>

int main()
{
    char s[100];
    int i, n, pal = 1;
    scanf("%s", s);
    n = strlen(s);
    for (i = 0; i < n / 2; i++)
        if (s[i] != s[n - 1 - i]) {
            pal = 0;
            break;
        }
    if (pal) printf("%s est un palindrome\n", s);
    else     printf("%s n'est pas un palindrome\n", s);
    return 0;
}` }
  ],
  quiz:[
    ["Par quel caractère se termine une chaîne en C ?",["'\\n'","'\\0'","' '","'.'"],1,"Le caractère nul '\\0' marque la fin de la chaîne."],
    ["Combien de cases occupe char s[] = \"FSE\"; ?",["3","4","5","2"],1,"3 lettres + le '\\0'."],
    ["Comment copier la chaîne b dans a ?",["a = b;","strcpy(a, b);","strcat(a, b);","a == b;"],1,"On ne peut pas affecter un tableau : on utilise strcpy."],
    ["Quelle lecture de chaîne est correcte ?",["scanf(\"%s\", &nom);","scanf(\"%s\", nom);","scanf(\"%c\", nom);","scanf(\"%d\", nom);"],1,"Le nom du tableau est déjà une adresse : pas de &."],
    ["Que renvoie strcmp(\"Ali\", \"Ali\") ?",["1","0","-1","3"],1,"strcmp renvoie 0 quand les deux chaînes sont identiques."]
  ]
},
/* ------------------------------------------------------------------ 10 */
{ id:"ch10", titre:"Les pointeurs", resume:"Adresses, déréférencement, pointeurs et tableaux.",
  cours:[
    { h:"Adresse et pointeur", p:"Chaque variable occupe une place en mémoire repérée par son <b>adresse</b>, obtenue avec <code>&amp;</code>. Un <b>pointeur</b> est une variable qui contient une adresse.",
      code:R`int a = 10;
int *p;      /* p : pointeur sur un int */
p = &a;      /* p contient l'adresse de a */` },
    { h:"Déréférencer : l'opérateur *", p:"<code>*p</code> désigne la variable pointée. Modifier <code>*p</code>, c'est modifier <code>a</code>.",
      code:R`*p = 25;              /* a vaut maintenant 25 */
printf("%d\n", *p);   /* 25 */` },
    { h:"Pointeurs et tableaux", p:"Le nom d'un tableau est l'adresse de son premier élément : <code>t</code> équivaut à <code>&amp;t[0]</code>. Ajouter 1 à un pointeur le fait avancer d'<b>un élément</b> :",
      liste:["<code>*(t + i)</code> est équivalent à <code>t[i]</code>","<code>p++</code> fait passer à la case suivante du tableau","On peut parcourir un tableau avec un pointeur : <code>for (p = t; p &lt; t + N; p++)</code>"] },
    { h:"Pourquoi des pointeurs ?", p:"Ils permettent à une fonction de modifier les variables de l'appelant (passage par adresse, chapitre suivant), de parcourir efficacement tableaux et chaînes, et de gérer la mémoire dynamique (<code>malloc</code>, vu plus tard)." },
    { h:"Erreurs à éviter", p:"Ne jamais utiliser <code>*p</code> si <code>p</code> n'a pas reçu d'adresse. Un pointeur qui ne pointe sur rien vaut <code>NULL</code> ; testez-le avant de l'utiliser." }
  ],
  exemples:[
    { titre:"Modifier une variable via un pointeur", code:R`#include <stdio.h>

int main()
{
    int a = 10;
    int *p = &a;
    printf("a = %d, *p = %d\n", a, *p);
    *p = *p * 3;
    printf("Apres *p = *p * 3 : a = %d\n", a);
    return 0;
}` },
    { titre:"Parcourir un tableau avec un pointeur", code:R`#include <stdio.h>
#define N 5

int main()
{
    int t[N] = {3, 6, 9, 12, 15};
    int *p, somme = 0;
    for (p = t; p < t + N; p++) {
        printf("%d ", *p);
        somme += *p;
    }
    printf("\nSomme = %d\n", somme);
    return 0;
}` }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int a = 10;
    int *p = &a;
    *p = *p + 5;
    printf("%d %d\n", a, *p);
    return 0;
}`, reponse:"15 15", aide:"*p et a désignent la même case mémoire." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int t[4] = {2, 4, 6, 8};
    int *p = t;
    printf("%d ", *p);
    p = p + 2;
    printf("%d %d\n", *p, *(p + 1));
    return 0;
}`, reponse:"2 6 8", aide:"p + 2 avance de deux éléments : p pointe sur t[2]." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int main()
{
    int x = 1, y = 2;
    int *p = &x, *q = &y;
    *q = *p;
    p = q;
    *p = 5;
    printf("%d %d\n", x, y);
    return 0;
}`, reponse:"1 5", aide:"Après p = q, les deux pointeurs désignent y." },
    { type:"trou", enonce:"Complétez pour calculer la somme d'un tableau avec la notation pointeur.", code:R`#include <stdio.h>

int main()
{
    int t[5] = {1, 3, 5, 7, 9};
    int i, s = 0;
    for (i = 0; i < 5; i++)
        s += [[*(t + i)|*(t+i)|t[i]]];
    printf("Somme = %d\n", s);
    return 0;
}`, sortie:"Somme = 25" },
    { type:"prog", enonce:"Lisez deux entiers a et b. Déclarez deux pointeurs <code>pa</code> et <code>pb</code> sur a et b, échangez les valeurs <b>en passant uniquement par les pointeurs</b>, puis affichez :<pre>a = 9, b = 4</pre>(pour l'entrée <code>4 9</code>)", depart:R`#include <stdio.h>

int main()
{
    int a, b, tmp;
    int *pa = &a, *pb = &b;
    scanf("%d %d", &a, &b);

    printf("a = %d, b = %d\n", a, b);
    return 0;
}`, tests:[{ entree:"4 9", sortie:"a = 9, b = 4" },{ entree:"-1 3", sortie:"a = 3, b = -1" }], exige:[{ re:"\\*\\s*pa\\s*=", msg:"Modifiez a par l'intermédiaire de *pa." }], solution:R`#include <stdio.h>

int main()
{
    int a, b, tmp;
    int *pa = &a, *pb = &b;
    scanf("%d %d", &a, &b);
    tmp = *pa;
    *pa = *pb;
    *pb = tmp;
    printf("a = %d, b = %d\n", a, b);
    return 0;
}` },
    { type:"prog", enonce:"Lisez n puis n entiers dans un tableau. Parcourez le tableau <b>avec un pointeur</b> pour trouver le maximum :<pre>Max = ...</pre>", depart:R`#include <stdio.h>

int main()
{
    int t[100], n, i;
    int *p;

    return 0;
}`, tests:[{ entree:"5\n4 17 -2 9 11", sortie:"Max = 17" },{ entree:"3\n-5 -2 -9", sortie:"Max = -2" }], exige:[{ re:"\\*\\s*p\\b", msg:"Utilisez le pointeur p (*p) pour parcourir le tableau." }], solution:R`#include <stdio.h>

int main()
{
    int t[100], n, i, max;
    int *p;
    scanf("%d", &n);
    for (i = 0; i < n; i++)
        scanf("%d", &t[i]);
    max = t[0];
    for (p = t + 1; p < t + n; p++)
        if (*p > max)
            max = *p;
    printf("Max = %d\n", max);
    return 0;
}` }
  ],
  quiz:[
    ["Que contient un pointeur ?",["Une valeur entière quelconque","L'adresse d'une variable","Un caractère","Le nom d'une variable"],1,"Un pointeur stocke une adresse mémoire."],
    ["Avec int a = 3; int *p = &a; que vaut *p ?",["L'adresse de a","3","0","p"],1,"*p désigne la variable pointée, donc a."],
    ["Pour int t[5], quelle expression équivaut à t[2] ?",["*t + 2","*(t + 2)","&t + 2","t * 2"],1,"*(t + i) est équivalent à t[i]."],
    ["Quelle déclaration crée un pointeur sur float ?",["float p*;","float *p;","*float p;","pointer float p;"],1,"Le type pointé, puis * avant le nom."],
    ["Que vaut un pointeur qui ne pointe sur rien ?",["0 ou NULL","-1","Il n'existe pas","Toujours l'adresse de main"],0,"Par convention, il vaut NULL."]
  ]
},
/* ------------------------------------------------------------------ 11 */
{ id:"ch11", titre:"Les fonctions", resume:"Découper un programme, paramètres, valeur de retour, passage par adresse.",
  cours:[
    { h:"Définir et appeler une fonction", p:"Une fonction regroupe un traitement réutilisable. Elle a un type de retour, un nom et des paramètres.",
      code:R`float carre(float x)          /* en-tête */
{
    return x * x;             /* valeur renvoyée */
}

int main()
{
    printf("%.1f\n", carre(1.5));   /* appel : 2.2 */
    return 0;
}` },
    { h:"Prototype", p:"Si la fonction est écrite après <code>main</code>, on annonce son <b>prototype</b> avant : <code>float carre(float x);</code>. Une fonction qui ne renvoie rien est de type <code>void</code>." },
    { h:"Passage par valeur", p:"Les paramètres reçoivent une <b>copie</b> des valeurs : modifier un paramètre dans la fonction ne change pas la variable de l'appelant. Les variables déclarées dans une fonction sont <b>locales</b> : elles n'existent que pendant son exécution." },
    { h:"Passage par adresse", p:"Pour qu'une fonction modifie une variable de l'appelant, on lui passe son adresse et elle travaille avec un pointeur :",
      code:R`void echange(int *a, int *b)
{
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
/* appel : echange(&x, &y); */` },
    { h:"Tableaux en paramètre", p:"Un tableau est toujours passé par adresse : la fonction peut modifier ses éléments. On transmet aussi sa taille : <code>float moyenne(float t[], int n)</code>." },
    { h:"Récursivité", p:"Une fonction récursive s'appelle elle-même. Il faut un <b>cas d'arrêt</b>, sinon les appels ne finissent jamais : <code>n! = n × (n-1)!</code> et <code>0! = 1</code>." }
  ],
  exemples:[
    { titre:"Echange par adresse", code:R`#include <stdio.h>

void echange(int *a, int *b);   /* prototype */

int main()
{
    int x = 4, y = 9;
    echange(&x, &y);
    printf("x = %d, y = %d\n", x, y);
    return 0;
}

void echange(int *a, int *b)
{
    int tmp = *a;
    *a = *b;
    *b = tmp;
}` },
    { titre:"Moyenne d'un tableau", code:R`#include <stdio.h>

float moyenne(float t[], int n)
{
    float s = 0;
    int i;
    for (i = 0; i < n; i++)
        s += t[i];
    return s / n;
}

int main()
{
    float notes[5] = {12, 14.5, 9, 16, 11};
    printf("Moyenne = %.2f\n", moyenne(notes, 5));
    return 0;
}` }
  ],
  exercices:[
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int f(int x)
{
    return 2 * x + 1;
}

int main()
{
    printf("%d %d\n", f(3), f(f(0)));
    return 0;
}`, reponse:"7 3", aide:"f(0) = 1, puis f(1) = 3." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

void incr(int x)   { x++; }
void incr2(int *x) { (*x)++; }

int main()
{
    int a = 5;
    incr(a);
    printf("%d ", a);
    incr2(&a);
    printf("%d\n", a);
    return 0;
}`, reponse:"5 6", aide:"incr travaille sur une copie ; incr2 modifie a par son adresse." },
    { type:"sortie", enonce:"Qu'affiche ce programme ?", code:R`#include <stdio.h>

int s(int n)
{
    if (n == 0)
        return 0;
    return n + s(n - 1);
}

int main()
{
    printf("%d\n", s(4));
    return 0;
}`, reponse:"10", aide:"s(4) = 4 + 3 + 2 + 1 + 0." },
    { type:"trou", enonce:"Complétez la fonction qui renvoie le plus grand de deux entiers.", code:R`#include <stdio.h>

[[int]] max2(int a, int b)
{
    if (a > b)
        [[return]] a;
    return [[b]];
}

int main()
{
    printf("%d\n", max2(7, 12));
    return 0;
}`, sortie:"12" },
    { type:"prog", enonce:"Ecrivez une fonction <code>int estPremier(int n)</code> qui renvoie 1 si n est premier et 0 sinon. Dans <code>main</code>, lisez n et affichez :<pre>17 est premier\n18 n'est pas premier</pre>", depart:R`#include <stdio.h>

int estPremier(int n)
{

}

int main()
{
    int n;
    scanf("%d", &n);
    if (estPremier(n))
        printf("%d est premier\n", n);
    else
        printf("%d n'est pas premier\n", n);
    return 0;
}`, tests:[{ entree:"17", sortie:"17 est premier" },{ entree:"18", sortie:"18 n'est pas premier" },{ entree:"2", sortie:"2 est premier" },{ entree:"1", sortie:"1 n'est pas premier" }], exige:[{ re:"int\\s+estPremier\\s*\\(\\s*int", msg:"Gardez la fonction int estPremier(int n)." }], solution:R`#include <stdio.h>

int estPremier(int n)
{
    int d;
    if (n < 2)
        return 0;
    for (d = 2; d * d <= n; d++)
        if (n % d == 0)
            return 0;
    return 1;
}

int main()
{
    int n;
    scanf("%d", &n);
    if (estPremier(n))
        printf("%d est premier\n", n);
    else
        printf("%d n'est pas premier\n", n);
    return 0;
}` },
    { type:"prog", enonce:"Ecrivez une fonction récursive <code>int factorielle(int n)</code>. Dans <code>main</code>, lisez n (0 à 12) et affichez :<pre>5! = 120</pre>", depart:R`#include <stdio.h>

int factorielle(int n)
{

}

int main()
{

    return 0;
}`, tests:[{ entree:"5", sortie:"5! = 120" },{ entree:"0", sortie:"0! = 1" },{ entree:"10", sortie:"10! = 3628800" }], exige:[{ re:"factorielle\\s*\\(\\s*n\\s*-\\s*1\\s*\\)", msg:"La fonction doit être récursive : elle s'appelle avec factorielle(n - 1)." }], solution:R`#include <stdio.h>

int factorielle(int n)
{
    if (n == 0)
        return 1;
    return n * factorielle(n - 1);
}

int main()
{
    int n;
    scanf("%d", &n);
    printf("%d! = %d\n", n, factorielle(n));
    return 0;
}` }
  ],
  quiz:[
    ["Quel est le type d'une fonction qui ne renvoie rien ?",["int","null","void","empty"],2,"void indique l'absence de valeur de retour."],
    ["A quoi sert un prototype ?",["A exécuter la fonction","A annoncer la fonction avant son utilisation","A la rendre récursive","A rien"],1,"Il permet d'appeler une fonction définie plus loin dans le fichier."],
    ["Pour qu'une fonction modifie la variable x de main, on lui passe :",["x","&x","*x","x[]"],1,"On passe l'adresse ; la fonction reçoit un pointeur."],
    ["Que manque-t-il à une fonction récursive qui ne s'arrête jamais ?",["Un prototype","Un cas d'arrêt","Un paramètre","Un return void"],1,"Sans cas d'arrêt, les appels s'enchaînent indéfiniment."],
    ["Une variable déclarée dans une fonction est :",["Globale","Locale à cette fonction","Constante","Partagée avec main"],1,"Elle n'existe que pendant l'exécution de la fonction."]
  ]
}
];
