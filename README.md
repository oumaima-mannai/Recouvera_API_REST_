# Recouvra+ – API de gestion du recouvrement

## Présentation du projet
Recouvra+ est une API REST développée avec Express.js permettant de gérer les clients, les factures impayées et les actions de recouvrement d’une entreprise. Ce projet est uniquement backend et respecte les bonnes pratiques de développement.

## Stack technique
- **Node.js 22**
- **Express.js**
- **MongoDB** (avec Mongoose)
- **JWT** (Authentification)
- **Joi** (Validation des données)
- **Swagger** (Documentation API)
- **Jest / Supertest** (Tests unitaires)

## Architecture
```text
recouvra-api/
├── src/
│   ├── config/          # Configurations (db, swagger)
│   ├── controllers/     # Logique métier par route
│   ├── middlewares/     # Middlewares (auth, rôles)
│   ├── models/          # Modèles Mongoose
│   ├── routes/          # Définition des endpoints
│   ├── validators/      # Validation Joi
│   └── tests/           # Tests unitaires
├── .env                 # Variables d'environnement
├── app.js               # Application Express (sans DB)
└── server.js            # Démarrage du serveur et DB
```

## Installation

1. **Cloner projet**
```bash
git clone https://github.com/oumaima-mannai/Recouvera_API_REST_.git
cd Recouvera_API_REST_
```

2. **Installer dépendances**
```bash
npm install
```

3. **Configuration .env**
Créez un fichier `.env` à la racine avec le contenu suivant :
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/recouvra
JWT_SECRET=secret
```

4. **Lancer le serveur**
```bash
npm run dev
```

## Tester API
Vous pouvez tester l'API avec des outils comme **Postman** ou **Thunder Client** (VSCode).
- Créez d'abord un compte via `/api/auth/register` (POST).
- Récupérez le token et ajoutez-le dans le header `Authorization: Bearer <token>`.

## Documentation API
La documentation complète des routes (Swagger) est disponible sur :
🔗 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Lancer les tests
Pour lancer les tests unitaires (Jest) :
```bash
npm test
```
