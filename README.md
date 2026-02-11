# CasaLivraison

Application mobile de livraison de repas à Casablanca.

## 📱 Description

CasaLivraison est une plateforme de livraison de repas permettant aux utilisateurs de :
- Consulter la liste des restaurants disponibles
- Parcourir les menus par restaurant
- Ajouter des plats au panier
- Passer des commandes
- Suivre l'état de leurs commandes en temps réel
- Consulter l'historique des commandes

## 🛠️ Stack Technique

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Base de données**: PostgreSQL 15
- **ORM**: Sequelize
- **Authentification**: JWT + bcrypt
- **Tests**: Jest + Supertest

### Frontend Mobile
- **Framework**: React Native
- **Plateforme**: Expo
- **Navigation**: React Navigation
- **Gestion d'état**: Context API
- **HTTP Client**: Axios

### DevOps
- **Conteneurisation**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Interface DB**: Adminer

## 🚀 Démarrage Rapide

### Prérequis
- Docker et Docker Compose
- Node.js 18+ (pour développement local)
- Expo CLI (pour le mobile)

### 1. Cloner le projet
```bash
git clone https://github.com/ayoslalaka-dev/Casalivraison.git
cd Casalivraison
```

### 2. Lancer le backend avec Docker
```bash
docker-compose up --build
```

Le backend sera disponible sur `http://localhost:3000`

### 3. Lancer l'application mobile
```bash
cd mobile
npm install
npx expo start
```

Scannez le QR code avec Expo Go (Android/iOS) ou appuyez sur `a` pour l'émulateur Android.

## 📂 Structure du Projet

```
CasaLivraison/
├── backend/                 # API Node.js/Express
│   ├── config/             # Configuration DB
│   ├── src/
│   │   ├── controllers/    # Contrôleurs
│   │   ├── models/         # Modèles Sequelize
│   │   ├── routes/         # Routes API
│   │   ├── services/       # Logique métier
│   │   ├── middlewares/    # Middlewares
│   │   ├── migrations/     # Migrations DB
│   │   └── seeders/        # Données de test
│   ├── tests/              # Tests Jest
│   └── Dockerfile
├── mobile/                  # Application React Native
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── context/        # Context API (Auth, Cart, Orders)
│   │   ├── navigation/     # Navigation
│   │   ├── screens/        # Écrans
│   │   └── services/       # API client
│   └── App.js
├── .github/
│   └── workflows/          # GitHub Actions CI
└── docker-compose.yml
```

## 🔌 API Endpoints

### Authentification
- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion

### Restaurants
- `GET /api/v1/restaurants` - Liste des restaurants
- `GET /api/v1/restaurants/:id` - Détails + menus

### Menus
- `GET /api/v1/menus/restaurant/:restaurantId` - Menus par restaurant

### Commandes
- `POST /api/v1/orders` - Créer une commande
- `GET /api/v1/orders/:id` - Détails d'une commande
- `GET /api/v1/orders/user/:userId` - Historique utilisateur
- `PUT /api/v1/orders/:id/status` - Mettre à jour le statut

## 📊 Statuts de Commande

- **PENDING** - En attente de validation
- **VALIDATED** - Validée, en préparation
- **IN_DELIVERY** - En cours de livraison
- **DELIVERED** - Livrée
- **CANCELLED** - Annulée

## 🧪 Tests

### Backend
```bash
cd backend
npm test
```

### CI/CD
Les tests sont automatiquement exécutés via GitHub Actions à chaque push.

## 🗄️ Base de Données

### Accéder à Adminer
URL: `http://localhost:8080`
- Serveur: `db`
- Utilisateur: `postgres`
- Mot de passe: `postgres`
- Base: `casalivraison`

### Modèles
- **User** - Utilisateurs (CLIENT, ADMIN, DRIVER)
- **Category** - Catégories de restaurants
- **Restaurant** - Restaurants
- **Menu** - Plats/Menus
- **Order** - Commandes
- **OrderItem** - Détails des commandes
- **DeliveryDriver** - Livreurs

## 🔧 Configuration

### Variables d'environnement (Backend)
Créer un fichier `.env` dans `backend/`:
```env
PORT=3000
NODE_ENV=development
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=casalivraison
DB_HOST=db
DB_PORT=5432
JWT_SECRET=your_secret_key
```

### Configuration Mobile
Modifier `mobile/src/services/api.js`:
- Émulateur Android: `http://10.0.2.2:3000/api/v1`
- Device physique: `http://YOUR_IP:3000/api/v1`
- iOS Simulator: `http://localhost:3000/api/v1`

## 👥 Données de Test

Les seeders créent automatiquement :
- 1 Admin
- 1 Client (email: `client@test.com`, password: `123456`)
- 3 Catégories (Pizza, Sushi, Marocain)
- 3 Restaurants avec menus
- 2 Livreurs

## 📝 Licence

Ce projet est un projet pédagogique réalisé dans le cadre de la formation Simplon / JOBINtech.

## 🤝 Contribution

Projet individuel - Yassine
