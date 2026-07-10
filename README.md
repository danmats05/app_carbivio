# Carbivio — SaaS Platform

Application SaaS professionnelle de gestion de demandes de services automobiles (livraison carburant, batterie, huile, pneus, urgence), construite avec **Next.js**, **TypeScript**, **TailwindCSS**, **shadcn/ui**, **Prisma** et **MySQL**.

Interface inspirée du design premium de [cafu.com](https://cafu.com) — fond noir pur, accent orange `#eca226`, boutons pill-shaped avec effets de glow.

---

## Sommaire

1. [Démarrage rapide](#1-démarrage-rapide)
2. [Identifiants par défaut](#2-identifiants-par-défaut)
3. [Stack technique](#3-stack-technique)
4. [Architecture du projet](#4-architecture-du-projet)
5. [Fonctionnalités implémentées](#5-fonctionnalités-implémentées)
6. [Rôles et accès](#6-rôles-et-accès)
7. [Base de données](#7-base-de-données)
8. [Variables d'environnement](#8-variables-denvironnement)
9. [Scripts disponibles](#9-scripts-disponibles)
10. [Passage en production](#10-passage-en-production)

---

## 1. Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# 3. Générer le client Prisma
npx prisma generate

# 4. Seeder la base de données (compte admin)
npx tsx prisma/seed.ts

# 5. Lancer le serveur de développement
npm run dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000).

---

## 2. Identifiants par défaut

> Créés via `prisma/seed.ts`

### Administrateur

| Champ            | Valeur               |
| ---------------- | -------------------- |
| **Email**        | `admin@carbivio.com` |
| **Mot de passe** | `admin123456`        |
| **Rôle**         | `ADMIN`              |

### Chauffeur

Créer un compte via `/register`, puis assigner le rôle `DRIVER` :

```bash
# Via script
npx tsx scripts/set-driver.ts

# Ou via Prisma Studio
npx prisma studio
# → Table User → changer role → DRIVER → Save
```

### Client (utilisateur standard)

S'inscrire sur `/register` → rôle `USER` par défaut.

---

## 3. Stack technique

### Backend

| Catégorie                | Technologie             |
| ------------------------ | ----------------------- |
| **Framework**            | Next.js (App Router)    |
| **Langage**              | TypeScript v5           |
| **Base de données**      | MySQL                   |
| **ORM**                  | Prisma v6               |
| **Authentification**     | JWT via `jose`          |
| **Hachage mot de passe** | `bcrypt`                |
| **Validation**           | Zod                     |
| **Emails**               | Nodemailer (SMTP Gmail) |
| **Temps réel**           | SSE (Server-Sent Events)|
| **Rate limiting**        | In-memory sliding window|

### Frontend

| Catégorie         | Technologie                  |
| ----------------- | ---------------------------- |
| **Framework**     | React 19                     |
| **Style**         | TailwindCSS v4 + shadcn/ui   |
| **Animations**    | Motion (Framer Motion v12)   |
| **Icônes**        | Lucide React                 |
| **Notifications** | Sonner (toasts)              |
| **Formulaires**   | React Hook Form + Zod        |
| **Cartes**        | Leaflet + OpenStreetMap      |
| **Routing**       | OSRM (calcul d'itinéraire)   |
| **Graphiques**    | Recharts                     |

### Design

| Élément                | Valeur                              |
| ---------------------- | ----------------------------------- |
| **Fond principal**     | `#151514` (noir profond)            |
| **Accent primaire**    | `#eca226` (orange Carbivio)         |
| **Police texte**       | Heuvel Grotesk (locale)             |
| **Police chiffres**    | IDGrotesk (locale)                  |
| **Police titres**      | Montserrat (Google Fonts)           |

---

## 4. Architecture du projet

```
app_carbivio/
│
├── app/                            # Pages et routes Next.js (App Router)
│   ├── (auth)/                     # Routes publiques d'authentification
│   │   ├── login/page.tsx          # Connexion (CLIENT + DRIVER)
│   │   ├── register/page.tsx       # Inscription (crée un USER)
│   │   ├── forgot-password/page.tsx# Demande de réinitialisation mot de passe
│   │   └── reset-password/page.tsx # Formulaire de nouveau mot de passe (token URL)
│   │
│   ├── client/                     # Portail client (rôle USER)
│   │   └── page.tsx                # Formulaire de demande de service
│   │
│   ├── driver/                     # Portail chauffeur (rôle DRIVER)
│   │   └── page.tsx                # Liste des missions en temps réel
│   │
│   ├── admin/                      # Dashboard administrateur (rôle ADMIN)
│   │   ├── layout.tsx              # Mise en page admin (sidebar + header)
│   │   └── page.tsx                # KPIs globaux
│   │
│   ├── commandes/page.tsx          # Gestion des commandes (admin)
│   ├── flotte/page.tsx             # Gestion de la flotte et des chauffeurs (admin)
│   ├── ressources/page.tsx         # Gestion des stocks (admin)
│   ├── parametres/page.tsx         # Paramètres de l'application (admin)
│   ├── about/page.tsx              # Page À propos (publique)
│   ├── contact/page.tsx            # Page Contact (publique)
│   ├── services/                   # Page Services (publique)
│   │
│   └── api/                        # API Routes REST
│       ├── auth/
│       │   ├── login/route.ts          # POST /api/auth/login
│       │   ├── register/route.ts       # POST /api/auth/register
│       │   ├── logout/route.ts         # POST /api/auth/logout
│       │   ├── me/route.ts             # GET  /api/auth/me
│       │   ├── forgot-password/route.ts# POST /api/auth/forgot-password
│       │   └── reset-password/route.ts # POST /api/auth/reset-password
│       ├── requests/
│       │   ├── route.ts                # GET/POST /api/requests
│       │   └── [id]/route.ts           # PATCH/DELETE /api/requests/:id
│       ├── drivers/route.ts            # GET/POST/DELETE /api/drivers
│       ├── driver/
│       │   ├── orders/route.ts         # GET /api/driver/orders
│       │   ├── orders/[id]/route.ts    # PATCH /api/driver/orders/:id
│       │   └── notifications/stream    # GET SSE chauffeur
│       └── notifications/
│           ├── recent/route.ts         # GET /api/notifications/recent
│           └── stream/route.ts         # GET SSE admin
│
├── components/
│   ├── dashboard/
│   │   ├── sidebar.tsx             # Sidebar admin
│   │   └── header.tsx              # Header admin
│   ├── driver/                     # Composants portail chauffeur
│   │   └── DriverMap.tsx           # Carte Leaflet (itinéraire chauffeur → client)
│   └── ui/                         # Composants shadcn/ui
│       ├── ruixen-bento-cards.tsx  # Grille de services synchronisée
│       └── ...
│
├── controllers/
│   └── authController.ts           # Logique register / login / logout
│
├── services/
│   ├── auth.ts                     # bcrypt + JWT (sign/verify)
│   └── requests.ts                 # CRUD des demandes de service
│
├── lib/
│   ├── mailer.ts                   # Envoi d'emails (Nodemailer SMTP)
│   ├── notifications.ts            # EventEmitter SSE (admin + chauffeur)
│   ├── rate-limit.ts               # Rate limiting in-memory
│   ├── services-data.ts            # Données statiques des services
│   ├── session.ts                  # Lecture JWT depuis les cookies
│   └── utils.ts                    # Utilitaire cn() Tailwind
│
├── proxy.ts                        # Middleware Edge : protection des routes + RBAC
│
├── prisma/
│   ├── schema.prisma               # Modèles : User, ServiceRequest, PasswordResetToken, Vehicle, StockItem, AdminLog
│   └── seed.ts                     # Création du compte admin initial
│
├── scripts/
│   └── set-driver.ts               # Script pour assigner le rôle DRIVER à un utilisateur
│
└── .env                            # Variables d'environnement (non commité)
```

---

## 5. Fonctionnalités implémentées

### Page d'accueil (`/`)

| Fonctionnalité              | Description                                                                 |
| --------------------------- | --------------------------------------------------------------------------- |
| **Hero Section**            | Vidéo background, badge "24h/24 — 7j/7" avec voyant vert animé             |
| **Services interactifs**    | 5 icônes cliquables synchronisées avec le menu et les cartes                |
| **RuixenBentoCards**        | Grille de 5 cartes services avec descriptions et animations                 |
| **Synchronisation triple**  | Menu navbar ↔ Icônes Hero ↔ Cartes (sélection unifiée + scroll automatique) |
| **Section Stats**           | 4 statistiques en grille responsive (IDGrotesk pour les chiffres)           |
| **Section Avantages**       | Bénéfices du service                                                        |
| **Section Témoignages**     | Avis clients                                                                |
| **Section FAQ**             | Questions fréquentes                                                        |

### Pages publiques

| Page          | Fonctionnalités                                                      |
| ------------- | -------------------------------------------------------------------- |
| **À propos**  | Histoire, valeurs et mission de Carbivio avec cartes images animées  |
| **Contact**   | Formulaire complet (nom, email, téléphone, service, message)         |
| **Services**  | Présentation détaillée des services proposés                         |

### Authentification

| Fonctionnalité                   | Description                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------ |
| **Inscription**                  | Création de compte (rôle USER par défaut), validation Zod                      |
| **Connexion**                    | Email + mot de passe, génération JWT (7 jours), cookie `auth_token`            |
| **Déconnexion**                  | Suppression du cookie JWT                                                      |
| **Mot de passe oublié**          | Envoi d'un email avec lien de réinitialisation sécurisé (token 1h)             |
| **Réinitialisation mot de passe**| Formulaire avec validation du token, mise à jour du mot de passe en base       |
| **Rate limiting**                | 3 tentatives/minute sur `/api/auth/forgot-password` (anti-brute-force)         |
| **Session actuelle**             | Endpoint `GET /api/auth/me` pour récupérer l'utilisateur connecté              |

### Portail Client (`/client`)

| Fonctionnalité               | Description                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| **Sélection de service**     | 5 services : Carburant, Batterie, Huile, Pneus, Urgence                      |
| **Spécifications dynamiques**| Champs conditionnels selon le service sélectionné                            |
| — Carburant                  | Type (diesel/essence), quantité (plein/litres), véhicule en panne            |
| — Batterie                   | Type de problème, type de véhicule, câbles disponibles                       |
| — Huile                      | Type d'huile (5W30/5W40/10W40), quantité, vidange complète                   |
| — Pneus                      | Type de problème, nombre de pneus, cric disponible                           |
| — Urgence                    | Type d'urgence (panne/accident/autre)                                        |
| **Géolocalisation**          | Détection GPS automatique + carte OpenStreetMap interactive                   |
| **Confirmation**             | Écran de confirmation après soumission de la demande                         |

### Portail Chauffeur (`/driver`)

| Fonctionnalité               | Description                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| **Liste des missions**       | Affichage en temps réel des missions assignées via SSE                       |
| **Notifications temps réel** | Badge avec compteur de missions non lues, mise à jour automatique            |
| **Détail de mission**        | Infos client, type de service, localisation, coordonnées GPS                 |
| **Carte interactive**        | Carte Leaflet avec marqueur client et calcul d'itinéraire via OSRM           |
| **Mise à jour de statut**    | Boutons : "Démarrer la mission" (APPROVED → IN_PROGRESS), "Livraison effectuée" (IN_PROGRESS → COMPLETED) |

### Dashboard Admin

| Page / Fonctionnalité        | Description                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------- |
| **KPIs globaux**             | Vue d'ensemble : utilisateurs, commandes, revenus, graphiques (Recharts)     |
| **Gestion des commandes**    | Liste de toutes les demandes, filtres par statut, assignation d'un chauffeur |
| **Assignation chauffeur**    | Dropdown pour assigner un chauffeur → notification SSE envoyée en temps réel |
| **Gestion de la flotte**     | CRUD des véhicules (plaque, modèle, statut, localisation, carburant)         |
| **Gestion des chauffeurs**   | Ajout et suppression de chauffeurs via l'interface admin                     |
| **Gestion des stocks**       | Suivi des stocks (carburant, batteries, huiles, pneus) avec quantités        |
| **Paramètres**               | Configuration de l'application                                               |
| **Notifications admin**      | Stream SSE pour recevoir les nouvelles commandes en temps réel               |

---

## 6. Rôles et accès

| Route                    | Non connecté         | `USER`                   | `DRIVER`                 | `ADMIN`      |
| ------------------------ | -------------------- | ------------------------ | ------------------------ | ------------ |
| `/login`, `/register`    | ✅ Accès             | Redirigé → `/client`     | Redirigé → `/driver`     | Redirigé → `/admin` |
| `/forgot-password`       | ✅ Accès             | ✅ Accès                 | ✅ Accès                 | ✅ Accès     |
| `/client`                | Redirigé → `/login`  | ✅ Accès                 | ❌ Bloqué                | ✅ Accès     |
| `/driver`                | Redirigé → `/login`  | ❌ Bloqué                | ✅ Accès                 | ✅ Accès     |
| `/admin`, `/commandes`…  | Redirigé → `/login`  | ❌ Bloqué                | ❌ Bloqué                | ✅ Accès     |
| `/about`, `/contact`…    | ✅ Accès             | ✅ Accès                 | ✅ Accès                 | ✅ Accès     |

---

## 7. Base de données

### Tables

#### `User`

| Colonne      | Type         | Description                          |
| ------------ | ------------ | ------------------------------------ |
| `id`         | VARCHAR(191) | Identifiant unique (UUID)            |
| `name`       | VARCHAR(191) | Nom complet                          |
| `email`      | VARCHAR(191) | Email (unique)                       |
| `password`   | VARCHAR(191) | Mot de passe haché (bcrypt, 10 rounds)|
| `role`       | ENUM         | `USER`, `ADMIN`, `DRIVER`            |
| `createdAt`  | DATETIME     | Date de création                     |

#### `ServiceRequest`

| Colonne       | Type         | Description                                              |
| ------------- | ------------ | -------------------------------------------------------- |
| `id`          | VARCHAR(191) | Identifiant unique                                       |
| `userId`      | VARCHAR(191) | Référence → `User.id` (client)                           |
| `driverId`    | VARCHAR(191) | Référence → `User.id` (chauffeur assigné, nullable)      |
| `serviceType` | VARCHAR(191) | Type de service demandé                                  |
| `description` | TEXT         | Détails et spécifications de la demande                  |
| `location`    | VARCHAR(191) | Adresse textuelle                                        |
| `latitude`    | DOUBLE       | Coordonnée GPS latitude (nullable)                       |
| `longitude`   | DOUBLE       | Coordonnée GPS longitude (nullable)                      |
| `status`      | ENUM         | `PENDING`, `APPROVED`, `IN_PROGRESS`, `REJECTED`, `COMPLETED` |
| `price`       | DOUBLE       | Prix (nullable)                                          |
| `createdAt`   | DATETIME     | Date de création                                         |
| `updatedAt`   | DATETIME     | Dernière mise à jour                                     |

#### `PasswordResetToken`

| Colonne     | Type         | Description                                  |
| ----------- | ------------ | -------------------------------------------- |
| `id`        | VARCHAR(191) | Identifiant unique                           |
| `userId`    | VARCHAR(191) | Référence → `User.id`                        |
| `token`     | VARCHAR(191) | Token sécurisé unique                        |
| `expiresAt` | DATETIME     | Expiration (1 heure après création)          |
| `used`      | BOOLEAN      | Token déjà utilisé                           |
| `createdAt` | DATETIME     | Date de création                             |

#### `Vehicle`

| Colonne              | Type         | Description                                            |
| -------------------- | ------------ | ------------------------------------------------------ |
| `id`                 | VARCHAR(191) | Identifiant unique                                     |
| `plaque`             | VARCHAR(191) | Plaque d'immatriculation                               |
| `modele`             | VARCHAR(191) | Modèle du véhicule                                     |
| `chauffeur`          | VARCHAR(191) | Nom du chauffeur assigné (nullable)                    |
| `statut`             | ENUM         | `EN_ROUTE`, `DISPONIBLE`, `MAINTENANCE`, `HORS_SERVICE`|
| `localisation`       | VARCHAR(191) | Position actuelle (nullable)                           |
| `carburant`          | INT          | Niveau de carburant en % (nullable)                    |
| `dernierEntretien`   | DATETIME     | Date du dernier entretien (nullable)                   |
| `prochainEntretien`  | DATETIME     | Date du prochain entretien (nullable)                  |

#### `StockItem`

| Colonne      | Type         | Description                                        |
| ------------ | ------------ | -------------------------------------------------- |
| `id`         | VARCHAR(191) | Identifiant unique                                 |
| `name`       | VARCHAR(191) | Nom de l'article                                   |
| `category`   | ENUM         | `FUEL`, `BATTERY`, `OIL`, `TIRE`                   |
| `quantity`   | DOUBLE       | Quantité en stock                                  |
| `unit`       | VARCHAR(191) | Unité (litres, unités, kg…)                        |
| `unitPrice`  | DOUBLE       | Prix unitaire (nullable)                           |
| `supplier`   | VARCHAR(191) | Fournisseur (nullable)                             |
| `location`   | VARCHAR(191) | Emplacement en entrepôt (nullable)                 |
| `status`     | VARCHAR(191) | Statut du stock (nullable)                         |

#### `AdminLog`

| Colonne      | Type         | Description                                                          |
| ------------ | ------------ | -------------------------------------------------------------------- |
| `id`         | VARCHAR(191) | Identifiant unique                                                   |
| `adminId`    | VARCHAR(191) | ID de l'admin ayant effectué l'action                                |
| `action`     | VARCHAR(191) | Description (ex: `UPDATED_REQUEST_STATUS_TO_COMPLETED`)              |
| `targetId`   | VARCHAR(191) | ID de l'entité cible (nullable)                                      |
| `createdAt`  | DATETIME     | Horodatage                                                           |

---

## 8. Variables d'environnement

```env
# Connexion MySQL
DATABASE_URL="mysql://root:@localhost:3306/carbivio_saas"

# Clé secrète JWT (générer une valeur aléatoire longue en production)
JWT_SECRET="votre-cle-secrete"

# URL de l'application (pour les liens dans les emails)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Configuration SMTP (envoi d'emails)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="votre-email@gmail.com"
SMTP_PASS="votre-mot-de-passe-application-gmail"
```

> **Note Gmail :** Utiliser un "Mot de passe d'application" généré sur [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).

---

## 9. Scripts disponibles

```bash
# Développement
npm run dev

# Production
npm run build && npm start

# Base de données
npx prisma generate        # Régénérer le client Prisma
npx prisma studio          # Interface visuelle de la BDD
npx tsx prisma/seed.ts     # Créer le compte admin

# Utilitaires
npx tsx scripts/set-driver.ts   # Assigner le rôle DRIVER à un utilisateur
```

---

## 10. Passage en production

| Élément             | État actuel (dev)                  | À faire en production                              |
| ------------------- | ---------------------------------- | -------------------------------------------------- |
| **Email SMTP**      | Gmail personnel (app password)     | Email professionnel (`noreply@carbivio.com`)        |
| **JWT_SECRET**      | Clé de développement               | Chaîne aléatoire longue et sécurisée               |
| **Base de données** | MySQL local (XAMPP)                | Serveur MySQL distant (PlanetScale, Railway, RDS…) |
| **URL application** | `http://localhost:3000`            | Domaine officiel (`https://carbivio.com`)          |
| **Rôle DRIVER**     | Assigné via script / Prisma Studio | Interface admin dédiée (à implémenter)             |
| **Paiement**        | Non implémenté                     | Intégrer Stripe ou solution locale                 |
