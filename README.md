# API_port_russell

Cette API a été développée avec express sur la base de données MongoDB, elle permet la gestion de réservation et de catway au sein d'un port

---

## Description

**Contenu** 
Dans cette API vous pourrez trouver : 

- 1 page de connexion à l'API,
- 1 page Tableau de bord permettant d'accéder à toutes les partie du site,
- 1 page CRUD permettant la gestion des catways,
- 1 page CRUD permettant la gestion des réservation,
- 1 page CRUD permettant la gestion des utilisateurs,
- 1 documentation d'API

**Module évalué**
Cette API a été réalisée à titre éducatif, elle permet de mettre en avant :

- Javascript côté serveur
- Le protocole Client-Serveur
- L'asynchrone en Javascript
- Construire une API avec Node.js
- Mettre en place une API REST avec Express


---

## Installation & Lancement

### Prérequis

Assure-toi d'avoir installé sur ta machine :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Étapes

1. **Clone le dépôt**
   ```bash
   git clone https://github.com/Anderson972/Devoir-portfolio-luce-anderson
   cd API_port_russell
   ```

2. **Installe les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure les variables d'environnement**
   Crée un fichier `env/.env` à la racine :
```
   PORT        = 3000
   MONGODB_URI = mongodb+srv://...
   SECRET_KEY  = ta_cle_secrete
```
4. **Lance le serveur de développement**
   ```bash
   npm start
   # ou
   yarn start
   ```

5. **Ouvre dans ton navigateur**
   ```
   http://localhost:3000            <- pour l'API
   http://localhost:3000/api-docs   <- pour la documentation
   ```

### Scripts

| Commande | Description |
|---|---|
| `npm start` | Lance le serveur (env par défaut) |
| `npm run dev` | Lance en mode développement |
| `npm run prod` | Lance en mode production |

---

## Dépendances

| Package | Version | Description |
|---|---|---|
| `express` | ~4.16.1 | Framework web Node.js |
| `mongoose` | ^9.5.0 | ODM pour MongoDB |
| `bcrypt` | ^6.0.0 | Hashage des mots de passe |
| `jsonwebtoken` | ^9.0.3 | Authentification JWT |
| `express-session` | ^1.19.0 | Gestion des sessions |
| `ejs` | ^5.0.2 | Moteur de template |
| `cors` | ^2.8.6 | Gestion des CORS |
| `cookie-parser` | ~1.4.4 | Parsing des cookies |
| `morgan` | ~1.9.1 | Logger HTTP |
| `swagger-jsdoc` | ^6.2.8 | Génération de la doc Swagger depuis JSDoc |
| `swagger-ui-express` | ^5.0.1 | Interface Swagger UI |
| `validator` | ^13.15.35 | Validation des champs |
| `debug` | ~2.6.9 | Utilitaire de débogage |


## Dépendances de développement

| Package | Version | Description |
|---|---|---|
| `env-cmd` | ^11.0.0 | Chargement des variables d'environnement |
| `nodemon` | ^3.1.14 | Redémarrage automatique du serveur |
---

##  Auteur

LUCE Anderson

---

##  Licence

Ce projet est à usage éducatif uniquement.
