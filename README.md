# Guía de supervivencia en Francia · Evoala

Application web du fascicule de survie Evoala : les phrases utiles pour voyager en France, avec traduction, prononciation écrite et audio.
Deux langues d'interface : espagnol (par défaut) et anglais (sélecteur ES / EN sur le billet de l'accueil).

## Ouvrir l'appli

Pour regarder l'affichage, il suffit de servir le dossier, par exemple :

```
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000. (Ouvrir `index.html` directement depuis le disque ne marche pas : le navigateur bloque le chargement des fichiers JSON.)

## Organisation des fichiers

| Fichier / dossier | Contenu |
|---|---|
| `index.html` | Page d'entrée |
| `app.js` | Tout l'affichage : accueil (sommaire), pages de phrases, Guía de Paris, recherche, audio, langue |
| `auth.js` | Comptes (Firebase) : création de compte, connexion e-mail ou Google, sauvegarde de la langue et de la dernière page. Actif seulement sur le site Netlify |
| `app.css` | Les styles (les couleurs principales sont en haut du fichier) |
| `content.json` | Contenu en espagnol : sections, phrases (`fr`, `es`, `pr` = prononciation), datos culturales, Guía de Paris |
| `content-en.json` | Même structure, version anglaise (traductions et prononciations pour anglophones) |
| `worker.js` | Le petit serveur Cloudflare : reconnaissance vocale, contenu réservé aux acheteurs, récepteur Hotmart |
| `ui.json` | Correspondance entre les sections et leurs icônes |
| `img/icons/` | Illustrations des phrases (une planche par page, une image tous les 96 px) |
| `img/paris/` | Photos de la Guía de Paris |
| `img/ui/` | Logo, icônes des sections et du menu |
| `snd/` | Audios des phrases (un fichier par page du guide) |

## Modifier le contenu

- **Corriger une phrase, une traduction ou une prononciation :** dans `content.json` (espagnol) et `content-en.json` (anglais).
- **Changer un texte de l'interface (boutons, titres) :** dans `app.js`, objet `TXT` (une partie `es`, une partie `en`).
- **Changer les couleurs :** variables en haut de `app.css`.

## Vente avec Hotmart : version gratuite et version complète

Toutes les demandes passent par `worker.js`, qui envoie :
- **à tout le monde** : les pages gratuites (Esenciales › Indispensables, Comida › El restaurante › Pedir, Imprevistos › Emergencias) et « Sobre París ». Les autres pages s'affichent avec un cadenas et le bouton « Comprar la guía ».
- **aux acheteurs** : tout le contenu et tous les audios.

Pour changer les pages gratuites : `FREE` et `FREE_SND` en haut de `worker.js`.
Pour mettre le lien de paiement : `CHECKOUT` en haut de `app.js`.

**Qui est acheteur ?** Un document Firestore `entitlements/{e-mail en minuscules}` avec le champ `survie = true`.
Hotmart l'écrit tout seul via `/api/hotmart` (achat approuvé → accès, remboursement ou chargeback → plus d'accès).
On peut aussi l'ajouter à la main dans la console Firebase (par exemple pour un testeur).
La personne doit se connecter avec cet e-mail ; un compte e-mail/mot de passe doit avoir confirmé son adresse.

Secrets Cloudflare (Worker → Settings → Variables and Secrets) : `HOTMART_HOTTOK`, `FIREBASE_SA` (clé de service JSON), `HOTMART_PRODUCT_ID` (facultatif).

Règles Firestore :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /entitlements/{email} {
      allow read: if request.auth != null && request.auth.token.email_verified == true
                  && request.auth.token.email.lower() == email;
      allow write: if false;
    }
  }
}
```
