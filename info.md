# Sigles & Abréviations — Technologies du projet Carbivio

Liste complète par ordre alphabétique de toutes les technologies, bibliothèques, outils et standards utilisés dans ce projet.

---

| Sigle / Abréviation | Signification complète | Rôle dans le projet |
|---|---|---|
| **API** | Application Programming Interface | Interface de communication entre le client et le serveur (routes `/api/`) |
| **App Router** | Application Router | Système de routage basé sur les dossiers de Next.js 13+ |
| **bcrypt** | Blowfish Crypt | Algorithme de hachage des mots de passe |
| **bcryptjs** | Blowfish Crypt (JavaScript) | Implémentation JS pure de bcrypt |
| **CRUD** | Create, Read, Update, Delete | Opérations de base sur la base de données |
| **CSS** | Cascading Style Sheets | Mise en forme des interfaces |
| **CVA** | Class Variance Authority | Gestion des variantes de classes Tailwind CSS |
| **clsx** | Class Names (utilitaire) | Concaténation conditionnelle de classes CSS |
| **cmdk** | Command (bibliothèque) | Composant palette de commandes |
| **DB** | Database | Base de données MySQL du projet |
| **DOM** | Document Object Model | Représentation en arbre du HTML dans le navigateur |
| **DQL** | Data Query Language | Requêtes de lecture SQL (SELECT) |
| **ESLint** | ECMAScript Lint | Outil d'analyse statique du code JavaScript/TypeScript |
| **FCFA** | Franc CFA (Communauté Financière Africaine) | Devise utilisée dans le projet |
| **GPS** | Global Positioning System | Géolocalisation automatique du client via `navigator.geolocation` (portail client) |
| **HTML** | HyperText Markup Language | Structure des pages web |
| **HTTP** | HyperText Transfer Protocol | Protocole de communication client-serveur |
| **HTTPS** | HyperText Transfer Protocol Secure | Version sécurisée de HTTP |
| **IDE** | Integrated Development Environment | Environnement de développement (VS Code, etc.) |
| **JS** | JavaScript | Langage de programmation principal |
| **JSON** | JavaScript Object Notation | Format d'échange de données (API, configuration) |
| **jose** | JavaScript Object Signing and Encryption | Bibliothèque de gestion des JWT |
| **JWT** | JSON Web Token | Token d'authentification signé (cookie `auth_token`) |
| **Leaflet** | Leaflet.js | Bibliothèque de carte interactive (marqueurs chauffeur + client, itinéraire) |
| **MCP** | Model Context Protocol | Protocole de contexte pour modèles IA (Next.js 16 feature) |
| **MDX** | Markdown + JSX | Format de documentation mixte |
| **motion** | Motion (Framer Motion v12) | Bibliothèque d'animations React |
| **MySQL** | My Structured Query Language | Système de gestion de base de données relationnelle |
| **Next.js** | Next (framework React) | Framework fullstack React (version 16.1.6) |
| **Nodemailer** | Node Mailer | Bibliothèque d'envoi d'emails via SMTP (réinitialisation mot de passe) |
| **npm** | Node Package Manager | Gestionnaire de paquets Node.js |
| **ORM** | Object-Relational Mapping | Couche d'abstraction base de données (Prisma) |
| **OSM** | OpenStreetMap | Service de cartographie open source (cartes client) |
| **OSRM** | OpenStreetMap Routing Machine | API de calcul d'itinéraire routier (trajet chauffeur → client) |
| **PostCSS** | Post Cascading Style Sheets | Outil de transformation CSS (autoprefixer, Tailwind) |
| **Prisma** | Prisma ORM | ORM TypeScript pour MySQL |
| **RBAC** | Role-Based Access Control | Contrôle d'accès par rôle (ADMIN / DRIVER / USER via middleware) |
| **React** | React (bibliothèque UI) | Bibliothèque JavaScript pour les interfaces (version 19) |
| **Recharts** | Responsive Charts | Bibliothèque de graphiques React (dashboard admin) |
| **REST** | Representational State Transfer | Architecture des routes API du projet |
| **RSC** | React Server Components | Composants rendus côté serveur (App Router) |
| **shadcn/ui** | shadcn UI | Bibliothèque de composants UI basée sur Radix |
| **SMTP** | Simple Mail Transfer Protocol | Protocole d'envoi d'emails (Nodemailer + Gmail pour réinitialisation mot de passe) |
| **SQL** | Structured Query Language | Langage de requête pour MySQL |
| **SSE** | Server-Sent Events | Notifications temps réel admin et chauffeur (`/api/notifications/stream`) |
| **SSR** | Server-Side Rendering | Rendu côté serveur (Next.js) |
| **Tailwind** | Tailwind CSS | Framework CSS utilitaire (version 4) |
| **TS** | TypeScript | Sur-ensemble typé de JavaScript (version 5) |
| **TSX** | TypeScript XML | Fichiers TypeScript avec syntaxe JSX |
| **UI** | User Interface | Interface utilisateur |
| **UUID** | Universally Unique Identifier | Identifiant unique généré pour chaque entité en base |
| **UX** | User Experience | Expérience utilisateur |
| **Vercel** | Vercel (plateforme cloud) | Plateforme de déploiement Next.js (`@vercel/analytics`) |
| **Zod** | Zod (bibliothèque) | Validation de schémas TypeScript côté client et serveur |

---

## Librairies Radix UI utilisées

| Sigle | Composant Radix |
|---|---|
| **Radix** | @radix-ui — bibliothèque de composants UI accessibles sans style |
| Accordion | Accordéon dépliable |
| Alert Dialog | Boîte de dialogue d'alerte |
| Avatar | Composant avatar utilisateur |
| Checkbox | Case à cocher |
| Dialog | Fenêtre modale |
| Dropdown Menu | Menu déroulant |
| Label | Étiquette de formulaire |
| Navigation Menu | Menu de navigation |
| Popover | Bulle contextuelle |
| Progress | Barre de progression |
| Radio Group | Groupe de boutons radio |
| Select | Sélecteur déroulant |
| Separator | Séparateur visuel |
| Slider | Curseur de valeur |
| Slot | Composition de composants |
| Switch | Interrupteur on/off |
| Tabs | Onglets |
| Toast | Notification temporaire |
| Toggle | Bouton bascule |
| Tooltip | Info-bulle |

---

*Mis à jour le 03/06/2026 — Projet Carbivio*
