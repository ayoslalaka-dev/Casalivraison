# API REST — La Grande Soirée Gnawa

## Installation
- `cd backend`
- `npm install`

## Variables d’environnement (`.env`)
```
PORT=3000
DB_NAME=gnawa
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
JWT_SECRET=change_me
ADMIN_EMAIL=admin@gnawa.local
ADMIN_PASSWORD_HASH=$2b$10$replace_with_bcrypt_hash
```

Générez le hash avec `bcrypt` (exemple Node):
```js
require('bcrypt').hash('votre_mot_de_passe', 10).then(console.log)
```

## Migrations et Seeders
- Migrer: `npm run db:migrate`
- Seeder: `npm run db:seed`
- Annuler: `npm run db:undo`

Tables créées:
- `event_info` — Informations de l’événement (1 ligne)
- `artists` — Liste des artistes
- `bookings` — Réservations (avec `confirmation_code`)

Seed initial: 1 événement + 2 artistes.

## Démarrer le serveur
- `npm run dev`
- URL: `http://localhost:3000/`

## Endpoints
- `GET /api/event` — Infos événement
- `GET /api/artists` — Liste artistes
- `GET /api/artists/:id` — Détail artiste
- `GET /api/bookings/:code` — Réservation par code
- `GET /api/bookings/email/:email` — Réservations par email (validation)
- `POST /api/bookings` — Créer réservation (validation + `confirmation_code`)
- `POST /api/auth/login` — Connexion admin → `token` JWT
- `POST /api/artists` — Créer artiste (JWT)
- `PUT /api/artists/:id` — Modifier artiste (JWT)
- `DELETE /api/artists/:id` — Supprimer artiste (JWT)

## Tests (Postman)
Importez une collection Postman et testez les statuts:
- 200/201 pour succès
- 400 pour validation
- 401/403 pour auth

