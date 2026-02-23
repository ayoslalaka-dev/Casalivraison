# CasaLivraison - Backend

Application de livraison de repas à Casablanca.

## Stack Technique

- **Backend**: Node.js, Express, PostgreSQL, Sequelize
- **DevOps**: Docker, Docker Compose
- **Tests**: Jest, Supertest

## Prérequis

- Docker et Docker Compose installés
- Node.js 18+ (pour développement local)

## Démarrage avec Docker

### 1. Cloner le projet
```bash
git clone https://github.com/ayoslalaka-dev/Casalivraison.git
cd Casalivraison
```

### 2. Lancer avec Docker Compose
```bash
docker-compose up --build
```

L'API sera disponible sur `http://localhost:3000`
Adminer (interface DB) sur `http://localhost:8080`

### 3. Accéder à Adminer
- Serveur: `db`
- Utilisateur: `postgres`
- Mot de passe: `postgres`
- Base de données: `casalivraison`

## Développement Local

### 1. Installer les dépendances
```bash
cd backend
npm install
```

### 2. Configurer l'environnement
Créer un fichier `.env` basé sur `.env.example`:
```bash
cp .env.example .env
```

Modifier `DB_HOST=localhost` dans `.env` pour le développement local.

### 3. Créer la base de données
```bash
npm run db:create
```

### 4. Lancer les migrations
```bash
npm run db:migrate
```

### 5. Lancer les seeders (données de test)
```bash
npx sequelize-cli db:seed:all
```

### 6. Démarrer le serveur
```bash
npm run dev
```

## Tests

```bash
npm test
```

## Structure du Projet

```
backend/
├── config/
│   └── database.js          # Configuration Sequelize
├── src/
│   ├── controllers/         # Contrôleurs Express
│   ├── middlewares/         # Middlewares (erreurs, auth)
│   ├── models/              # Modèles Sequelize
│   ├── routes/              # Routes API
│   ├── services/            # Logique métier
│   ├── migrations/          # Migrations DB
│   ├── seeders/             # Données de test
│   ├── app.js               # Configuration Express
│   └── server.js            # Point d'entrée
├── tests/                   # Tests Jest
├── .env.example             # Variables d'environnement
├── Dockerfile               # Image Docker
└── package.json
```

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion

### Restaurants
- `GET /api/v1/restaurants` - Liste des restaurants
- `GET /api/v1/restaurants/:id` - Détails d'un restaurant

### Menus
- `GET /api/v1/menus/restaurant/:restaurantId` - Menus d'un restaurant

### Orders
- `POST /api/v1/orders` - Créer une commande
- `GET /api/v1/orders/:id` - Détails d'une commande
- `GET /api/v1/orders/user/:userId` - Historique utilisateur
- `PUT /api/v1/orders/:id/status` - Mettre à jour le statut

## Statuts de Commande

- `PENDING` - En attente
- `VALIDATED` - Validée
- `IN_DELIVERY` - En livraison
- `DELIVERED` - Livrée
- `CANCELLED` - Annulée
