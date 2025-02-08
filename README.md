# GenZ Deezer

Je voulais créer une application en quelques jours afin de la présenter lors de mon entretien technique chez Deezer avec Souhail Jebali et Julie Baret.

### 🤔 Contexte

L'objectif initial était de refaire un petit lecteur de musique avec l'API gratuite de Deezer. Mais petite contrainte technique, l'API ne propose que des previews et non les sons en entier. Je sais que ma génération a en moyenne 8 secondes d'attention, d'où l'idée de GenZ Deezer : profitez de 8 secondes de musique et vivez la musique comme la GenZ.

### 💭 Réflexion

Ce petit projet soulève des points de réflexion intéressants. Avec l'industrie de la musique qui propose des morceaux de plus en plus courts grâce à l'essor des vidéos courtes telles que TikTok, Reels, Shorts... On peut se demander si l'avenir de la musique ne serait pas là ? En 2050, on aurait "Bip Bap Boop", le nouveau tube de l'été qui cartonne et qui dure à peine 8 secondes. Je preshot le moi dans 25 ans devenu beaucoup trop aigri : "C'était mieux avant !"

## 🏗️ Architecture

Le projet utilise une architecture monorepo organisée comme suit :

```
genz-deezer/
├── apps/
│   ├── web/         # Application React
│   └── backend/     # Serveur GraphQL
├── packages/
│   ├── core/        # Logique métier partagée
│   └── infrastructure/  # Code d'infrastructure
```

## 🛠️ Stack Technique

### Frontend
- React
- TypeScript
- Apollo Client
- Tailwind CSS

### Backend
- Bun
- GraphQL
- PostgreSQL

### Infrastructure
- PNPM Workspaces
- Docker & Docker Compose

## 🚀 Installation

### Prérequis

- Node.js ≥ 18
- PNPM
- Docker & Docker Compose

### Étapes d'installation

1. Cloner le dépôt
```bash
git clone <url-du-depot>
cd genz-deezer
```

2. Installer les dépendances
```bash
pnpm install
```

3. Configurer l'environnement
```bash
cp .env.example .env
```

4. Lancer la base de données
```bash
docker-compose up -d
```

## 💻 Développement

### Démarrer l'application

Lancer le backend :
```bash
pnpm backend
```

Lancer le frontend :
```bash
pnpm web
```

### Scripts disponibles

- `pnpm build` - Construction de tous les packages
- `pnpm test` - Exécution des tests
- `pnpm lint` - Vérification du code
- `pnpm dev` - Mode développement

## ⚙️ Configuration

Les variables d'environnement nécessaires sont listées dans `.env.example` :

### Base de données PostgreSQL
- `DB_HOST` - Nom d'hôte PostgreSQL (ex: auth-postgres)
- `DB_NAME` - Nom de la base de données (ex: auth_db)
- `DB_USER` - Nom d'utilisateur PostgreSQL (ex: admin)
- `DB_PASSWORD` - Mot de passe PostgreSQL
- `DB_PORT` - Port PostgreSQL (ex: 5433)

### PGAdmin
- `PGADMIN_EMAIL` - Email de connexion PGAdmin
- `PGADMIN_PASSWORD` - Mot de passe PGAdmin
- `PGADMIN_PORT` - Port d'accès PGAdmin (ex: 5050)

### Authentification
- `JWT_SECRET` - Clé secrète pour les tokens JWT
- `JWT_EXPIRATION` - Durée de validité des tokens en secondes (ex: 3600)

### API
- `SERVER_PORT` - Port du serveur backend (ex: 4000)
- `DEEZER_API_URI` - URL de base de l'API Deezer
- `VITE_API_URI` - URL de l'API backend pour le frontend


## 👥 Contributeurs

- [Victor Huang](https://github.com/theVicoH) - Développeur principal
