# Référence de l'Architecture et des Composants Carbivio

Ce document sert de sauvegarde de l'architecture, des composants et des animations clés du site Carbivio. Il permet de s'y référer à tout moment en cas de régression ou pour conserver l'ADN de conception initial.

## 1. Technologies & Stack
- **Framework :** Next.js (App Router)
- **Styling :** Tailwind CSS (avec `tw-animate-css` et variables CSS personnalisées)
- **Animations :** Framer Motion, CSS pur (Keyframes), Tailwind Transitions

## 2. Typographie & Couleurs
### Polices
- `Special Gothic Expanded One` : Titres principaux (font-special-gothic)
- `Heuvel Grotesk` : Police globale du body (font-heuvel)
- `IDGrotesk` : Police exclusive pour TOUS les chiffres (font-idgrotesk, numbers-idgrotesk)
- `Montserrat` : Sous-titres et UI spécifique (font-montserrat)
- `Inter` : Police sans-serif standard (font-sans)

### Palette de Couleurs Principale (Mode Sombre par défaut)
- **Background :** `#000000` / `#151514`
- **Foreground :** `#ffffff`
- **Primaire (Orange) :** `#eca226` (utilisé pour les boutons, accents, textes mis en évidence)
- **Variantes d'Orange :** `#d4911f` (hover)

## 3. Architecture Globale (Layout & Providers)
Fichier : `app/layout.tsx`
- Force le mode sombre (`className="dark"`).
- `NumberFontEnforcer` : Composant utilitaire assurant que tous les chiffres utilisent IDGrotesk.
- `LoaderProvider` : Contexte pour l'écran de chargement.
- `TooltipProvider` & `Toaster` : Pour l'UI (infobulles et notifications).

## 4. Composants Clés & Animations

### 4.1 Page d'Accueil (`app/page.tsx`)
- **Navbar :** Fixée en haut (`fixed`), avec effet de "hide-on-scroll-down" et "show-on-scroll-up". Arrière-plan flouté (`backdrop-blur-2xl`).
- **Section Avantages :** Grille de 3 colonnes avec effet hover. Utilise des bordures pointillées et des icônes "+" aux coins des cartes (design bento minimaliste).
- **FAQ :** Composant `FAQAccordion` avec ouverture/fermeture fluide animée par Tailwind (`max-h-0` vers `max-h-96` et rotation de l'icône chevron).

### 4.2 Le Hero (`components/Hero.tsx`)
- **Fond :** Vidéo d'arrière-plan en boucle (`/video_hero.mp4`) avec overlays assombris et un "glow blob" cyan/orange (`bg-[#eca226]/10 blur-[100px]`).
- **Animation FlipWords :** Utilisé pour faire défiler les mots "Carburant", "Batterie", "Huile moteur", "Pneus", "Urgence" de façon dynamique grâce à `framer-motion` (`components/ui/flip-words.tsx`).
- **Cartes de sélection (Services) :** 5 boutons avec images qui gèrent un état partagé. L'état sélectionné met en surbrillance le bouton avec `bg-white/10`.

### 4.3 Les Bento Cards des Services (`components/ui/ruixen-bento-cards.tsx`)
- **Structure :** Grille de cartes asymétriques (Bento design).
- **Communication avec Hero :** Utilise un système d'abonnement (EventEmitter custom `subscribeToServiceSelection`) pour lier la sélection depuis la navbar ou le hero et faire un scroll fluide vers la carte correspondante.
- **Design de Carte (`PlusCard`) :** Bordures pointillées avec icônes "Plus" SVG positionnées aux 4 coins en absolue. Effet hover orange fluo si la carte est sélectionnée (`bg-[#eca226]`).

### 4.4 Les Témoignages (`components/blocks/carbivio-testimonials.tsx`)
- **Animation :** Effet "Marquee" horizontal infini défini dans `globals.css` (`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`). Pause au survol (`group-hover:[animation-play-state:paused]`).
- **Design de Carte (`carbivio-testimonial-card.tsx`) :** Image de voiture rectangulaire (`w-40`), dégradé sombre (`from-muted/50 to-muted/10`), texte de l'auteur et citation.

### 4.5 Le Footer (`components/ui/modem-animated-footer.tsx`)
- **Texte en Arrière-plan :** Énorme texte CARBIVIO semi-transparent en fond.
- **Design :** Effet de flou et de lumière (`backdrop-blur-sm`, gradients `to-transparent`), liens sociaux et liens de navigation.

### 4.6 Le Loader (`components/Loader.tsx`)
- **Affichage :** Contrôlé par le context `SmartLoaderContext`.
- **Animation :** Barre de chargement orange horizontale animée en CSS pur (`@keyframes moving` avec largeur passant de 0% à 100% puis retour).

## 5. Règles Strictes de Développement et de Design (À SUIVRE IMPÉRATIVEMENT)

En tant qu'assistant de code, **VOUS DEVEZ IMPÉRATIVEMENT** respecter ces règles lors de toute création de page, de composant ou de modification du code :

### Règle n°1 : La Règle d'Or des Chiffres (IDGrotesk)
- **OBLIGATION :** Dès qu'un chiffre (prix, pourcentage, statistique, quantité, numéro de téléphone, heure) doit être affiché sur l'interface, il **DOIT ABSOLUMENT** utiliser la police `IDGrotesk`.
- **Comment l'appliquer :** Enveloppez les chiffres dans un `<span className="numbers-idgrotesk">...</span>` ou utilisez le composant dédié `<NumberText>...</NumberText>` si disponible. Le composant global `NumberFontEnforcer` s'assure d'une couverture globale, mais la classe doit être utilisée explicitement lors de la création de nouveaux éléments UI (ex: badges de notification, tableaux de bord, prix).

### Règle n°2 : Cohérence des Couleurs et du Thème
- **Thème Sombre Exclusif :** L'application est fondamentalement pensée pour le mode sombre. N'ajoutez pas de styles spécifiques au mode clair qui casseraient l'interface. Le fond par défaut est noir (`#000000` ou `#151514`).
- **Couleur Primaire (Orange Carbivio) :** Utilisez **uniquement** la couleur `#eca226` pour les appels à l'action (CTA), les bordures actives, ou la mise en valeur de texte important.
- **Transparence et Glassmorphism :** Privilégiez les fonds semi-transparents avec un flou en arrière-plan (`bg-white/5 backdrop-blur-md` ou `bg-white/10`) plutôt que des couleurs pleines pour les cartes et les popovers, afin de conserver l'aspect "Premium SaaS".

### Règle n°3 : Typographie et Hiérarchie
- **Titres (H1, H2, H3) :** Utilisez toujours `Special Gothic Expanded One` (`font-special-gothic`) pour les très gros titres (Hero, sections principales).
- **Textes Courants :** Le corps du texte doit utiliser `Heuvel Grotesk` (`font-heuvel`), sauf cas particuliers nécessitant de la lisibilité dense où `Inter` (`font-sans`) ou `Montserrat` (`font-montserrat`) peut être utilisé.

### Règle n°4 : Animation et Interactivité
- **Micro-interactions :** Tous les boutons et cartes cliquables doivent avoir un effet au survol (ex: `hover:bg-white/10`, `hover:border-[#eca226]`, `transition-all duration-300`). Ne créez pas d'éléments d'interface statiques "morts".
- **Bordures Pointillées & Icônes '+' :** Pour les cartes de type "Bento", maintenez le design system existant : bordures `border-dashed` avec les icônes 'Plus' (SVG) positionnées en absolu aux quatre coins.

### Règle n°5 : Intégrité Architecturale
- **Gestion des États Partagés :** Ne cassez pas les systèmes d'événements personnalisés (ex: la communication entre `Hero.tsx` et `ruixen-bento-cards.tsx` via `subscribeToServiceSelection`). Si vous devez refactoriser, utilisez un Context React valide.
- **Ressources Locales :** Ne modifiez pas les chemins des polices locales déclarées dans `globals.css` (`../assets/fonts/...`).
