# Carbivio — SaaS Platform

Application SaaS professionnelle de gestion de demandes de services (type fuel delivery, lavage, etc.), construite avec **Next.js 16**, **TypeScript**, **TailwindCSS**, **shadcn/ui**, **Prisma** et **MySQL**.

Interface inspirée du design premium de [cafu.com](https://cafu.com) — fond noir pur, accent cyan, boutons pill-shaped avec effets de glow.

---

## Sommaire

1. [Démarrage rapide](#1-démarrage-rapide)
2. [Identifiants par défaut](#2-identifiants-par-défaut)
3. [Stack technique](#3-stack-technique)
4. [Architecture du projet](#4-architecture-du-projet)
5. [Description de chaque fichier](#5-description-de-chaque-fichier)
6. [Fonctionnalités du site](#6-fonctionnalités-du-site)
7. [Rôles et accès](#7-rôles-et-accès)
8. [Base de données](#8-base-de-données)
9. [Variables d'environnement](#9-variables-denvironnement)
10. [Scripts disponibles](#10-scripts-disponibles)

---

## 1. Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer la base de données (voir section 8)
# Importer database.sql dans phpMyAdmin

# 3. Configurer les variables d'environnement
# Fichier .env déjà configuré pour MySQL local sans mot de passe

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000).

---

## 2. Identifiants par défaut

> Ces identifiants ont été créés automatiquement via le script `prisma/seed.ts`.

### Administrateur

| Champ            | Valeur               |
| ---------------- | -------------------- |
| **Email**        | `admin@carbivio.com` |
| **Mot de passe** | `admin123456`        |
| **Rôle**         | `ADMIN`              |

### Utilisateur normal

Il n'y a pas d'utilisateur standard créé par défaut. Pour en créer un :

1. Allez sur [http://localhost:3000/register](http://localhost:3000/register)
2. Remplissez le formulaire (nom, email, mot de passe)
3. Connectez-vous ensuite sur [http://localhost:3000/login](http://localhost:3000/login)

---

## 3. Stack technique

### Backend (Node.js)

| Catégorie                | Technologie             | Version |
| ------------------------ | ----------------------- | ------- |
| **Runtime**              | Node.js                 | v20+    |
| **Framework**            | Next.js 16 (App Router) | v16.1.6 |
| **Langage**              | TypeScript              | v5      |
| **Base de données**      | MySQL                   | -       |
| **ORM**                  | Prisma v6               | v6.19.2 |
| **Authentification**     | JWT (via `jose`)        | v6.1.3  |
| **Hachage mot de passe** | `bcrypt`                | v6.0.0  |
| **Validation**           | Zod                     | v4.3.6  |

### Frontend

| Catégorie         | Technologie                | Version  |
| ----------------- | -------------------------- | -------- |
| **Framework**     | React 19                   | v19.2.3  |
| **Routing**       | Next.js App Router         | v16.1.6  |
| **Style**         | TailwindCSS v4 + shadcn/ui | v4       |
| **Animations**    | Motion                     | v12.35.0 |
| **Icônes**        | Lucide React               | v0.577.0 |
| **Notifications** | Sonner (toasts)            | v2.0.7   |
| **Formulaires**   | React Hook Form + Zod      | v7.71.2  |

### Design & UX

| Catégorie              | Technologie               | Description            |
| ---------------------- | ------------------------- | ---------------------- |
| **Polices locales**    | Heuvel Grotesk, IDGrotesk | Polices personnalisées |
| **Police principale**  | Inter                     | Corps du texte         |
| **Police titres**      | Montserrat                | Titres et headers      |
| **Police chiffres**    | IDGrotesk                 | Tous les chiffres      |
| **Couleur principale** | #eca226                   | Orange Carbivio        |
| **Design System**      | shadcn/ui                 | Composants UI          |

### Architecture complète

- **Full-stack Next.js** : Frontend + Backend sur Node.js
- **API Routes** : RESTful endpoints dans `/app/api/`
- **Middleware** : Protection des routes + RBAC
- **Database** : MySQL avec Prisma ORM
- **Auth** : JWT tokens avec bcrypt
- **State Management** : React hooks + shared state pattern

---

## 4. Architecture du projet

```
app_carbivio/
│
├── app/                        # Pages et routes Next.js (App Router)
│   ├── (auth)/                 # Groupe de routes publiques
│   │   ├── login/page.tsx      # Page de connexion
│   │   └── register/page.tsx   # Page d'inscription
│   ├── admin/                  # Dashboard administrateur (protégé)
│   │   ├── layout.tsx          # Mise en page admin (sidebar + header)
│   │   ├── page.tsx            # Vue d'ensemble / KPIs
│   │   ├── users/page.tsx      # Liste des utilisateurs
│   │   ├── requests/page.tsx   # Liste de toutes les demandes
│   │   └── logs/page.tsx       # Journal d'activité admin
│   ├── dashboard/              # Dashboard utilisateur (protégé)
│   │   ├── layout.tsx          # Mise en page utilisateur
│   │   ├── page.tsx            # Mes demandes
│   │   └── create/page.tsx     # Créer une nouvelle demande
│   ├── api/                    # API Routes (REST)
│   │   ├── auth/
│   │   │   ├── login/route.ts   # POST /api/auth/login
│   │   │   ├── register/route.ts# POST /api/auth/register
│   │   │   └── logout/route.ts  # POST /api/auth/logout
│   │   └── requests/
│   │       ├── route.ts         # GET/POST /api/requests
│   │       └── [id]/route.ts    # PATCH/DELETE /api/requests/:id
│   ├── globals.css             # Tokens CSS (couleurs, typographie, utilitaires)
│   ├── layout.tsx              # Layout racine (polices, providers)
│   └── page.tsx                # Redirection / → /login
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         # Navigation latérale (admin + user)
│   │   └── Header.tsx          # En-tête avec cloche + avatar
│   ├── admin/
│   │   └── RequestsTable.tsx   # Table interactive des demandes (côté client)
│   ├── ui/                     # Composants shadcn/ui auto-générés
│   │   ├── ruixen-bento-cards.tsx  # Grille de services avec synchronisation
│   │   ├── number-text.tsx         # Utilitaire pour police IDGrotesk sur les chiffres
│   │   └── display-cards.tsx       # Cartes d'affichage
│   ├── Hero.tsx                # Section principale avec icônes interactives
│   ├── Loader.tsx              # Loader personnalisé
│   └── ui/flip-words.tsx       # Animation de mots (Hero)
│
├── controllers/
│   └── authController.ts       # Logique métier : register, login, logout
│
├── services/
│   ├── auth.ts                 # bcrypt (hash/verify) + jose (JWT sign/verify)
│   ├── admin.ts                # Agrégations KPIs admin
│   ├── adminLogs.ts            # Récupération des logs d'activité
│   ├── requests.ts             # CRUD des demandes de service
│   └── users.ts                # Récupération des utilisateurs
│
├── lib/
│   ├── prisma.ts               # Singleton client Prisma
│   ├── session.ts              # Lecture du JWT depuis les cookies
│   └── utils.ts                # Utilitaire cn() pour Tailwind
│
├── middleware.ts               # (Ancien nom — voir proxy.ts)
├── proxy.ts                    # Middleware Edge : protection des routes + RBAC
│
├── prisma/
│   ├── schema.prisma           # Schéma des modèles (User, ServiceRequest, AdminLog)
│   └── seed.ts                 # Script de création du compte admin initial
│
├── database.sql                # Script SQL complet pour créer les tables dans phpMyAdmin
├── .env                        # Variables d'environnement (DATABASE_URL, JWT_SECRET)
└── package.json                # Dépendances et scripts npm
```

---

## 5. Description de chaque fichier

### `proxy.ts` — Middleware de protection des routes

Intercepte **chaque requête** avant qu'elle n'atteigne une page. Il vérifie si :

- L'utilisateur est connecté (présence du cookie JWT `auth_token`).
- Le rôle dans le JWT correspond à la route demandée.
- Un visiteur non connecté est redirigé vers `/login`.
- Un utilisateur standard est bloqué sur `/admin/*`.

### `services/auth.ts` — Service d'authentification

- `hashPassword(password)` : Hache le mot de passe avec bcrypt (10 rounds).
- `verifyPassword(password, hash)` : Compare un mot de passe brut avec son hash.
- `signToken(payload)` : Génère un JWT signé (expire dans 7 jours).
- `verifyToken(token)` : Vérifie et décode un JWT.

### `lib/session.ts` — Lecture de la session

Lit le cookie `auth_token` depuis les cookies de la requête serveur et retourne le payload JWT décodé (id, email, role, name).

### `controllers/authController.ts` — Contrôleur d'authentification

Contient la logique pour :

- `register` : Valide les données, vérifie l'unicité de l'email, hash le mot de passe, insère l'utilisateur.
- `login` : Vérifie l'email/mot de passe, génère un JWT, pose le cookie `auth_token`.
- `logout` : Supprime le cookie.

### `services/requests.ts` — CRUD des demandes

- `getUserRequests(userId)` : Demandes d'un utilisateur.
- `getAllRequests()` : Toutes les demandes (pour l'admin).
- `createRequest(data)` : Créer une nouvelle demande.
- `updateRequestStatus(id, status, adminId)` : Changer le statut + créer un log admin.
- `deleteRequest(id, adminId)` : Supprimer une demande + créer un log admin.

### `components/admin/RequestsTable.tsx` — Table des demandes (interactif)

Composant client. Affiche les demandes sous forme de **cartes** avec un menu déroulant d'actions pour chaque ligne :

- Marquer comme Pending / Approved / Completed / Rejected.
- Supprimer la demande.
  Chaque action appelle l'API `/api/requests/[id]`.

---

## 6. Fonctionnalités du site

### Page d'accueil (`/`)

| Fonctionnalité             | Description                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------- |
| **Hero Section**           | Section principale avec vidéo background, badge "24h/24 — 7j/7" avec voyant vert animé |
| **Services Interactifs**   | 5 icônes de services cliquables avec synchronisation                                   |
| **RuixenBentoCards**       | Grille de 5 cartes services avec design moderne et descriptions détaillées             |
| **Menu Navbar**            | Menu déroulant "Services" avec 5 options synchronisées                                 |
| **Synchronisation Triple** | Menu navbar ↔ Icônes Hero ↔ Cartes (sélection unifiée)                                 |
| **Scroll Automatique**     | Scroll smooth vers les cartes lors de la sélection                                     |
| **Polices Personnalisées** | Heuvel Grotesk pour le texte, IDGrotesk pour tous les chiffres                         |
| **Animations Fluides**     | Transitions de 500ms, effets de glow, micro-interactions                               |
| **Section Stats**          | 4 statistiques en grille responsive avec chiffres en IDGrotesk                         |

### Pages d'Authentification

| Page         | Fonctionnalités                                             | Statut      |
| ------------ | ----------------------------------------------------------- | ----------- |
| **Register** | Création compte, validation formulaire, bouton retour       | ✅ Complété |
| **Login**    | Connexion compte, mot de passe visible/caché, bouton retour | ✅ Complété |

### Page Contact

| Fonctionnalité         | Description                             | Statut      |
| ---------------------- | --------------------------------------- | ----------- |
| **Formulaire complet** | Nom, email, téléphone, service, message | ✅ Complété |
| **Validation**         | Champs requis, format email, téléphone  | ✅ Complété |
| **Polices IDGrotesk**  | Tous les chiffres dans les inputs       | ✅ Complété |

### Dashboard

| Page               | Fonctionnalités                                        | Statut      |
| ------------------ | ------------------------------------------------------ | ----------- |
| **Create Request** | Création demande de service, localisation, description | ✅ Complété |

---

## 7. Fonctionnalités à Implémenter (Roadmap)

### 🎯 Fonctionnalités Client Prioritaires

#### 7.1 Géolocalisation et Suivi

- **Statut** : 🔄 À implémenter
- **Description** : Géolocalisation automatique pour localiser le client rapidement
- **Technologies** : Geolocation API, Maps Integration, GPS Tracking
- **Priorité** : 🔴 Haute

#### 7.2 Choix Étendu de Services

- **Statut** : 🔄 À implémenter
- **Description** : Menu complet des services avec options détaillées
- **Services** :
  - Livraison carburant (✅ existant)
  - Recharge batterie (🔄 à ajouter)
  - Pression pneus (🔄 à ajouter)
  - Camion dépannage (🔄 à ajouter)
- **Priorité** : 🔴 Haute

#### 7.3 Système de Paiement Sécurisé

- **Statut** : 🔄 À implémenter
- **Description** : Intégration paiement en ligne sécurisé
- **Technologies** : Stripe/PayPal, cryptage SSL, 3D Secure
- **Priorité** : 🔴 Haute

#### 7.4 Suivi des Interventions en Temps Réel

- **Statut** : 🔄 À implémenter
- **Description** : Tracking GPS des techniciens, ETA en direct
- **Technologies** : WebSocket, Real-time Database, Push Notifications
- **Priorité** : 🟡 Moyenne

#### 7.5 Historique et Avis Clients

- **Statut** : 🔄 À implémenter
- **Description** : Espace client avec historique complet et système d'avis
- **Fonctionnalités** : Historique interventions, notes, étoiles, commentaires
- **Priorité** : 🟡 Moyenne

---

## 8. Plan d'Implémentation Progressive

### Phase 1 : Géolocalisation (Semaine 1)

```typescript
// À implémenter
- API de géolocalisation
- Interface de sélection de position
- Intégration avec les cartes de service
- Stockage des préférences de localisation
```

### Phase 2 : Services Étendus (Semaine 2)

```typescript
// À implémenter
- Composants ServiceCard pour chaque type
- Interface de sélection avec descriptions
- Tarification dynamique par service
- Synchronisation avec le système existant
```

### Phase 3 : Paiement Sécurisé (Semaine 3)

```typescript
// À implémenter
- Intégration Stripe/PayPal
- Interface de paiement
- Validation et sécurité
- Historique des transactions
```

### Phase 4 : Suivi Temps Réel (Semaine 4)

```typescript
// À implémenter
- WebSocket pour tracking temps réel
- Interface de suivi pour clients
- Notifications de statut
- Dashboard technicien
```

### Phase 5 : Historique Client (Semaine 5)

```typescript
// À implémenter
- Espace client authentifié
- Historique complet des interventions
- Système d'avis et notations
- Export des données
```

### Synchronisation Inter-Composants

**Architecture Publisher-Subscriber :**

```typescript
// Système de communication entre composants
export function selectServiceFromHero(service: string) {
  notifyServiceSelection(service);
}

export function subscribeToServiceSelection(
  callback: (service: string | null) => void,
) {
  listeners.push(callback);
  return () =>
    (listeners = listeners.filter((listener) => listener !== callback));
}
```

**Flux de synchronisation :**

1. **Menu navbar** → `selectServiceFromHero("Batterie")`
2. **Hero** → Écoute via `subscribeToServiceSelection()` → met à jour `selectedService`
3. **RuixenBentoCards** → Écoute via `subscribeToServiceSelection()` → met à jour `selectedService`
4. **Résultat** → Icône Batterie surlignée + carte "Solutions Batterie" orange + scroll automatique

### Gestion des Polices

**Règle IDGrotesk pour les chiffres :**

```css
/* Font-face pour IDGrotesk */
@font-face {
  font-family: "IDGrotesk";
  src: url("../assets/fonts/IDGrotesk-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Application automatique aux chiffres */
.numbers-idgrotesk {
  font-family: "IDGrotesk", sans-serif;
}

/* Détection automatique des patterns numériques */
.number,
.stats,
.count,
.amount,
.price,
.time,
.duration,
.percentage,
.ratio {
  font-family: "IDGrotesk", sans-serif;
}
```

**Application dans les composants :**

```tsx
// Hero Section
<span className="numbers-idgrotesk">24h/24</span> — <span className="numbers-idgrotesk">7j/7</span>

// RuixenBentoCards
description: "Livraison <span class='numbers-idgrotesk'>24/7</span> en moins de <span class='numbers-idgrotesk'>20</span> minutes"

// Stats Section avec NumberText
<div className="font-idgrotesk font-extrabold text-3xl lg:text-4xl text-[#eca226] mb-2">
  <NumberText>10 000+</NumberText>
</div>

// Page Login avec NumberText
<div className="font-idgrotesk font-extrabold text-3xl text-white">
  <NumberText>10K+</NumberText>
</div>
```

### Côté Utilisateur (`/dashboard`)

| Fonctionnalité        | Description                                                                |
| --------------------- | -------------------------------------------------------------------------- |
| **Inscription**       | Création d'un compte utilisateur standard                                  |
| **Connexion**         | Authentification par email/mot de passe                                    |
| **Mes demandes**      | Vue de toutes ses propres demandes de service avec statuts colorés         |
| **Créer une demande** | Formulaire avec sélection du type de service, localisation, description    |
| **Suivi de statut**   | Chaque demande affiche son statut : Pending, Approved, Rejected, Completed |

### Côté Administrateur (`/admin`)

| Fonctionnalité               | Description                                                        |
| ---------------------------- | ------------------------------------------------------------------ |
| **Tableau de bord**          | KPIs globaux : nombre d'utilisateurs, de demandes, et revenu total |
| **Gestion des demandes**     | Voir toutes les demandes, changer leur statut, les supprimer       |
| **Gestion des utilisateurs** | Voir tous les comptes inscrits avec leur rôle                      |
| **Logs d'activité**          | Journal de toutes les actions effectuées par les admins            |

---

## 7. Rôles et accès

| Route                 | Visiteur non connecté | Utilisateur (`USER`)    | Administrateur (`ADMIN`) |
| --------------------- | --------------------- | ----------------------- | ------------------------ |
| `/login`, `/register` | ✅ Accès              | Redirigé → `/dashboard` | Redirigé → `/admin`      |
| `/dashboard/*`        | Redirigé → `/login`   | ✅ Accès                | ✅ Accès                 |
| `/admin/*`            | Redirigé → `/login`   | ❌ Bloqué               | ✅ Accès                 |

---

## 8. Base de données

### Configuration locale (phpMyAdmin)

1. Ouvrez **phpMyAdmin** dans votre navigateur.
2. Cliquez sur l'onglet **SQL**.
3. Copiez-collez le contenu du fichier `database.sql`.
4. Cliquez **Exécuter**.

Cela crée la base `carbivio_saas` avec les trois tables :

### Tables

#### `users`

| Colonne      | Type         | Description                 |
| ------------ | ------------ | --------------------------- |
| `id`         | VARCHAR(191) | Identifiant unique (UUID)   |
| `name`       | VARCHAR(191) | Nom complet                 |
| `email`      | VARCHAR(191) | Email (unique)              |
| `password`   | VARCHAR(191) | Mot de passe haché (bcrypt) |
| `role`       | ENUM         | `USER` ou `ADMIN`           |
| `created_at` | DATETIME     | Date de création            |

#### `service_requests`

| Colonne                     | Type         | Description                                    |
| --------------------------- | ------------ | ---------------------------------------------- |
| `id`                        | VARCHAR(191) | Identifiant unique                             |
| `user_id`                   | VARCHAR(191) | Référence vers `users.id`                      |
| `service_type`              | VARCHAR(191) | Type de service demandé                        |
| `description`               | TEXT         | Détails de la demande                          |
| `location`                  | VARCHAR(191) | Adresse / localisation                         |
| `status`                    | ENUM         | `PENDING`, `APPROVED`, `REJECTED`, `COMPLETED` |
| `price`                     | DOUBLE       | Prix (optionnel)                               |
| `created_at` / `updated_at` | DATETIME     | Horodatages                                    |

#### `admin_logs`

| Colonne      | Type         | Description                                                         |
| ------------ | ------------ | ------------------------------------------------------------------- |
| `id`         | VARCHAR(191) | Identifiant unique                                                  |
| `admin_id`   | VARCHAR(191) | ID de l'admin ayant effectué l'action                               |
| `action`     | VARCHAR(191) | Description de l'action (ex: `UPDATED_REQUEST_STATUS_TO_COMPLETED`) |
| `target_id`  | VARCHAR(191) | ID de l'entité cible (optionnel)                                    |
| `created_at` | DATETIME     | Horodatage                                                          |

---

## 9. Variables d'environnement

Fichier `.env` à la racine du projet :

```env
# Connexion MySQL
# Format : mysql://UTILISATEUR:MOT_DE_PASSE@HOTE:PORT/NOM_BASE
DATABASE_URL="mysql://root:@localhost:3306/carbivio_saas"

# Clé secrète pour signer les JWT
# ⚠️ À changer impérativement en production !
JWT_SECRET="super-secret-key-change-me-in-production"
```

> **Note :** Si votre MySQL a un mot de passe, remplacez `root:@` par `root:VOTRE_MOT_DE_PASSE@`.

---

## 10. Scripts disponibles

```bash
# Démarrer le serveur de développement (avec hot-reload)
npm run dev

# Construire l'application pour la production
npm run build

# Démarrer le serveur de production (après build)
npm start

# Créer le compte admin par défaut en base de données
npx tsx prisma/seed.ts

# Valider le schéma Prisma
npx prisma validate

# Régénérer le client Prisma (après modification du schema)
npx prisma generate
```

---

## Patterns & Fonctionnalités Avancées

### Synchronisation d'État Inter-Composants

**Pattern Publisher-Subscriber pour la synchronisation :**

```typescript
// État partagé global
let sharedSelectedService: string | null = null;
let listeners: ((service: string | null) => void)[] = [];

// Notification à tous les abonnés
function notifyServiceSelection(service: string | null) {
  sharedSelectedService = service;
  listeners.forEach((callback) => callback(service));
}

// Export pour utilisation dans les composants
export function selectServiceFromHero(service: string) {
  notifyServiceSelection(service);
}

export function subscribeToServiceSelection(
  callback: (service: string | null) => void,
) {
  listeners.push(callback);
  return () =>
    (listeners = listeners.filter((listener) => listener !== callback));
}
```

### Détection Automatique des Chiffres

**Application systématique d'IDGrotesk :**

```css
/* Règle principale : TOUS les chiffres en IDGrotesk */
.numbers-idgrotesk {
  font-family: "IDGrotesk", sans-serif;
}

/* Détection automatique des patterns numériques */
.number,
.numbers,
[class*="number-"],
[class*="stats-"],
[class*="count-"],
[class*="amount-"],
[class*="price-"],
[class*="time-"],
[class*="duration-"],
[class*="percentage-"],
[class*="ratio-"] {
  font-family: "IDGrotesk", sans-serif;
}

/* Application sur les tailles de texte */
.text-4xl .numbers-idgrotesk,
.text-5xl .numbers-idgrotesk,
.text-6xl .numbers-idgrotesk,
.text-7xl .numbers-idgrotesk,
.text-8xl .numbers-idgrotesk,
.text-9xl .numbers-idgrotesk {
  font-family: "IDGrotesk", sans-serif;
}
```

### Transitions & Animations

**Standardisation des animations :**

```css
/* Durée standard pour toutes les transitions */
.transition-all {
  transition-duration: 500ms;
}

/* Smooth scroll automatique */
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Micro-interactions */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Animations de pulse */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## Design

L'interface s'inspire du site [cafu.com](https://cafu.com) :

### Couleurs & Thème

- **Fond principal** : `#151514` (noir profond)
- **Accent primaire** : `#eca226` (orange Carbivio)
- **Texte principal** : Blanc avec variations d'opacité
- **Dark mode** : Support natif complet

### Typographie

- **Heuvel Grotesk** : Texte corporatif (fichiers locaux `/assets/fonts/heuvel_grotesk/`)
- **IDGrotesk** : Chiffres et nombres (fichier local `/assets/fonts/IDGrotesk-Regular.ttf`)
- **Montserrat** : Titres et headers (Google Fonts)
- **Inter** : Texte de secours (Google Fonts)

### Composants UI

- **Boutons pill-shaped** : Entièrement arrondis avec effets de glow
- **Cartes avec coins arrondis** : `rounded-3xl` pour un design moderne
- **Glassmorphism** : Effets `backdrop-blur` dans la navbar
- **Grille responsive** : Layout adaptatif pour tous les écrans

### Animations

- **Hero video** : Background vidéo en boucle
- **FlipWords** : Animation de mots rotatifs
- **Service cards** : Transitions fluides au survol et sélection
- **Badge pulse** : Voyant vert animé dans le Hero

### Règles de Développement

1. **Police IDGrotesk obligatoire** pour tous les chiffres
2. **Documentation obligatoire** de toute nouvelle fonctionnalité dans ce README
3. **Synchronisation** des trois composants (menu ↔ icônes ↔ cartes)
4. **Transitions standardisées** à 500ms
5. **Design system cohérent** avec shadcn/ui
