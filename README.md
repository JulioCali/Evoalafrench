# Guía de supervivencia en Francia · Evoala

Application web du fascicule de survie Evoala : les phrases utiles pour voyager en France, avec traduction, prononciation écrite et audio.
Deux langues d'interface : espagnol (par défaut) et anglais (sélecteur ES / EN sur le billet de l'accueil).

## Ouvrir l'appli

C'est un site statique, sans serveur ni base de données. Il suffit de servir le dossier, par exemple :

```
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000. (Ouvrir `index.html` directement depuis le disque ne marche pas : le navigateur bloque le chargement des fichiers JSON.)

## Organisation des fichiers

| Fichier / dossier | Contenu |
|---|---|
| `index.html` | Page d'entrée |
| `app.js` | Tout l'affichage : accueil (sommaire), pages de phrases, Guía de Paris, recherche, audio, langue |
| `app.css` | Les styles (les couleurs principales sont en haut du fichier) |
| `content.json` | Contenu en espagnol : sections, phrases (`fr`, `es`, `pr` = prononciation), datos culturales, Guía de Paris |
| `content-en.json` | Même structure, version anglaise (traductions et prononciations pour anglophones) |
| `ui.json` | Correspondance entre les sections et leurs icônes |
| `img/icons/` | Illustrations des phrases (une planche par page, une image tous les 96 px) |
| `img/paris/` | Photos de la Guía de Paris |
| `img/ui/` | Logo, icônes des sections et du menu |
| `snd/` | Audios des phrases (un fichier par page du guide) |

## Modifier le contenu

- **Corriger une phrase, une traduction ou une prononciation :** dans `content.json` (espagnol) et `content-en.json` (anglais).
- **Changer un texte de l'interface (boutons, titres) :** dans `app.js`, objet `TXT` (une partie `es`, une partie `en`).
- **Changer les couleurs :** variables en haut de `app.css`.
