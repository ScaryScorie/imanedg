# Portfolio d'Imane Djouadi-Gueham — guide de mise en ligne

Version mise à jour : tes vraies images sont maintenant intégrées
dans le site (dossier `images/`). Plus besoin de rien déposer
toi-même — le site est prêt à héberger tel quel.

## Ce qui a été corrigé par rapport à la version précédente

- **Extensions d'images** : le HTML référençait des `.jpg` par
  défaut ; il pointe maintenant vers tes vrais fichiers (`.png`,
  `.PNG`, `.jpeg`, `.gif` → converti en `.mp4`, voir plus bas).
- **Deux noms de fichiers cassés, corrigés automatiquement** :
  - un fichier avec une apostrophe inversée parasite au début du
    nom (`animation-doxu-stage.gif`) → renommé proprement.
  - `3d-texturing-01.jpg.png` (double extension, probablement un
    export qui a ajouté `.png` sans retirer l'ancien `.jpg`) →
    renommé `3d-texturing-01.png`.
- **Comptages d'images par projet, réajustés aux fichiers réels** :
  plusieurs groupes avaient un nombre d'images estimé au moment de
  la reconstitution (avant que je voie tes vraies images). Corrections :
  - **3D** : `assets` (2→1), `houdini` (1→2, fichiers 01 et 03),
    `metro` (2→4), `pixar-ref` (4→2), `quickrig` (2→3), `sculpt`
    (3→4), `texturing` (2→1), `timed-ref` (3→2).
  - **Animation** : `bruine` (2→1), `duik` (2→1), `3d` (2→4),
    `pinkfloyd` (2→3, la 3ᵉ image a une légende provisoire — voir
    note ci-dessous).
  - **Chara Design** : `prout-oursin` (3→1), et le groupe
    « Bruine — posing » a été retiré car aucun fichier
    correspondant n'était présent.
  - Tous les autres groupes (Concept & Background, Team Projects,
    etc.) correspondaient déjà exactement — aucun changement.

  J'ai vérifié automatiquement que chaque image du dossier est
  utilisée quelque part sur le site, et que chaque référence du
  site pointe vers un fichier qui existe réellement — donc plus
  aucun cadre vide ni fichier orphelin.

- **⚠️ À vérifier toi-même** : sur `animation.html`, la 3ᵉ image
  Pink Floyd (`animation-pinkfloyd-03`) a une légende provisoire
  (« légende à préciser / caption to be confirmed ») — je n'avais
  pas de texte d'origine pour celle-ci puisqu'elle n'existait pas
  dans ma reconstitution initiale. Cherche « à préciser » dans
  `animation.html` et remplace par la vraie légende.

- **GIFs convertis en vidéos MP4** : tes 11 animations (`animation-*.gif`)
  pesaient au total plus de 90 Mo (jusqu'à 20 Mo pièce). Un GIF est un
  format très inefficace pour de l'animation — je les ai converties en
  vidéos MP4 en boucle automatique et muettes (même rendu visuel,
  lecture en boucle infinie dès l'affichage) : le tout ne pèse plus
  que 2,2 Mo au total. Elles s'affichent exactement au même endroit,
  avec le même style de cadre.
- **Images statiques compressées** : les PNG/JPEG étaient souvent
  exportés en très haute résolution (jusqu'à 24 Mo pièce, parfois en
  16 bits par couleur). Je les ai redimensionnées à une largeur
  maximale de 1800 px et recompressées — aucune perte visible à
  l'écran, mais le dossier `images/` est passé de 350 Mo à 100 Mo.
- **Favicon ajouté** : j'ai remarqué `stick_favicon.png` dans ton
  dossier et l'ai relié comme icône d'onglet sur toutes les pages.

## Le formulaire de contact

Le formulaire "About Me" est recréé visuellement à l'identique
(Name / Email / Message / Submit → "Thank you!"), mais **il n'envoie
rien pour l'instant** car ton ancien hébergeur (Adobe Portfolio)
gérait cette partie côté serveur. Pour le rendre fonctionnel sur ton
nouvel hébergeur, la solution la plus simple est un service gratuit
comme [Formspree](https://formspree.io) ou Netlify Forms (si tu
héberges sur Netlify) : il suffit d'ajouter un attribut `action` sur
la balise `<form>` dans `about-me.html`. Dis-moi si tu veux que je le
configure une fois que tu as choisi ton hébergeur.

## Les vidéos et liens externes

Les 3 lecteurs vidéo intégrés (Demoreel, Animation, 3D) utilisent tes
liens d'origine (Adobe) — ils fonctionnent automatiquement. Idem pour
les liens vers Google Drive (CV, Christmas Mouse) et YouTube (Bruine,
Pink Floyd, Dinostore).

## Structure du dossier

```
portfolio/
├── index.html                   (Accueil)
├── about-me.html
├── demoreel.html
├── concepts-illustrations.html
├── animation.html
├── 3d.html
├── character-design.html
├── team-projects.html
├── style.css
├── script.js
└── images/                      ← toutes tes images, déjà en place
```

## Mise en ligne

Ce dossier est un site statique classique : il suffit de l'uploader
tel quel sur ton nouvel hébergeur (via FTP, ou en le glissant dans
Netlify/Vercel, ou `git push` sur GitHub Pages). Aucune installation,
aucune dépendance à installer.
