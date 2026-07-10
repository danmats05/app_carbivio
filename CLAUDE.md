# CLAUDE.md — Instructions pour Claude Code

## Règle principale : listing des fonctionnalités

**Après chaque implémentation d'une nouvelle fonctionnalité, mettre à jour le README.md** en ajoutant la fonctionnalité dans la section correspondante (tableau des fonctionnalités implémentées, architecture, base de données si nouveau modèle, etc.).

Ne documenter que ce qui est **fonctionnel et en production dans le code**. Ne pas documenter les fichiers supprimés ni les fonctionnalités incomplètes.

## Règles de développement

- Police **IDGrotesk** obligatoire pour tous les chiffres affichés
- Secrets et clés API uniquement via `process.env` — jamais hardcodés
- Toujours valider les données avec **Zod** côté serveur
- Les routes protégées sont gérées par `proxy.ts` (middleware Edge)
- Les notifications temps réel passent par **SSE** via `lib/notifications.ts`

## Stack du projet

- **Next.js** App Router + TypeScript + TailwindCSS v4
- **Prisma** ORM + MySQL
- **JWT** via `jose` + cookies `auth_token`
- **3 rôles** : `USER` (client), `DRIVER` (chauffeur), `ADMIN`
- **Couleur principale** : `#eca226` (orange Carbivio)

## Structure des redirections après login

| Rôle     | Redirigé vers |
| -------- | ------------- |
| `USER`   | `/client`     |
| `DRIVER` | `/driver`     |
| `ADMIN`  | `/admin`      |
