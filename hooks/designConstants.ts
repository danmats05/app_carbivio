/**
 * Constants de design centralisées pour l'application Carbivio
 * Frames, couleurs, espacements, et styles cohérents
 */

// Couleurs principales Carbivio
export const COLORS = {
  // Palette principale
  primary: "#eca226",        // Orange Carbivio
  primaryLight: "#f4b873",   // Orange clair
  primaryDark: "#d4911f",   // Orange foncé
  background: "#151514",     // Fond sombre
  surface: "#1a1a19",       // Surface des composants
  border: "#2a2a28",        // Bordures
  text: "#ffffff",           // Texte principal
  textSecondary: "#a0a09e", // Texte secondaire
  
  // Couleurs sémantiques
  success: "#22c55e",       // Vert succès
  warning: "#f59e0b",       // Orange warning
  error: "#ef4444",         // Rouge erreur
  info: "#3b82f6",         // Bleu info
  
  // Opacités
  opacity: {
    light: 0.1,
    medium: 0.2,
    strong: 0.3,
    full: 1.0,
  },
} as const;

// Styles de frames avec traits interrompus
export const FRAME_STYLES = {
  // Frames principales
  primary: {
    className: "border-2 border-dashed border-[#eca226] bg-[#151514] rounded-lg",
    description: "Frame principale avec bordure orange en pointillés"
  },
  secondary: {
    className: "border border-dashed border-[#2a2a28] bg-[#1a1a19] rounded-lg",
    description: "Frame secondaire avec bordure grise en pointillés"
  },
  accent: {
    className: "border-2 border-dotted border-[#eca226]/50 bg-[#151514] rounded-lg",
    description: "Frame d'accent avec bordure orange en points"
  },
  
  // Frames spécifiques
  card: {
    className: "border border-dashed border-[#2a2a28]/50 bg-[#1a1a19] rounded-lg p-4",
    description: "Frame pour cartes avec bordure subtile"
  },
  cardHover: {
    className: "hover:border-[#eca226]/50 hover:bg-[#1f1f1e] transition-all duration-200",
    description: "Frame de carte au survol avec bordure orange"
  },
  selected: {
    className: "border-2 border-solid border-[#eca226] bg-[#eca226]/10 rounded-lg",
    description: "Frame sélectionnée avec bordure orange solide"
  },
  
  // Frames pour tableaux
  table: {
    className: "border border-dashed border-[#2a2a28] rounded-lg overflow-hidden",
    description: "Frame de tableau avec bordure en pointillés"
  },
  tableHeader: {
    className: "border-b-2 border-dashed border-[#eca226] bg-[#eca226]/10",
    description: "Header de tableau avec bordure orange"
  },
  tableRow: {
    className: "border-b border-dotted border-[#2a2a28]/30 hover:bg-[#1f1f1e]",
    description: "Ligne de tableau avec bordure subtile"
  },
  
  // Frames pour formulaires
  input: {
    className: "border border-dashed border-[#2a2a28] bg-[#151514] rounded-lg px-3 py-2 focus:border-[#eca226] focus:outline-none",
    description: "Input avec bordure en pointillés et focus orange"
  },
  button: {
    className: "border border-dashed border-[#eca226] bg-[#eca226] text-white rounded-lg px-4 py-2 hover:bg-[#d4911f] transition-colors",
    description: "Bouton principal avec bordure orange"
  },
  
  // Frames pour KPIs
  kpi: {
    className: "border border-dashed border-[#2a2a28] bg-[#1a1a19] rounded-lg p-4",
    description: "Frame de KPI standard"
  },
  kpiPositive: {
    className: "border-l-4 border-l-[#22c55e] border-dashed border-[#2a2a28] bg-[#1a1a19] rounded-lg p-4",
    description: "Frame de KPI positif avec bordure verte"
  },
  kpiNegative: {
    className: "border-l-4 border-l-[#ef4444] border-dashed border-[#2a2a28] bg-[#1a1a19] rounded-lg p-4",
    description: "Frame de KPI négatif avec bordure rouge"
  },
  
  // Frames pour graphiques
  chart: {
    className: "border border-dotted border-[#eca226]/30 bg-[#151514] rounded-lg p-4",
    description: "Frame de graphique avec bordure subtile"
  },
  chartGrid: {
    className: "border-dashed border-[#2a2a28]/20",
    description: "Grille de graphique avec bordure subtile"
  },
  chartAxis: {
    className: "border-dotted border-[#2a2a28]/40",
    description: "Axe de graphique avec bordure très subtile"
  },
} as const;

// Styles de symboles et icônes
export const SYMBOL_STYLES = {
  // Symboles orange Carbivio
  primary: {
    className: "text-[#eca226]",
    description: "Symbole orange principal"
  },
  primaryLight: {
    className: "text-[#f4b873]",
    description: "Symbole orange clair"
  },
  primaryDark: {
    className: "text-[#d4911f]",
    description: "Symbole orange foncé"
  },
  
  // Symboles avec fond
  iconBg: {
    className: "bg-[#eca226]/20 text-[#eca226] p-2 rounded-lg",
    description: "Icône avec fond orange subtil"
  },
  iconBgHover: {
    className: "hover:bg-[#eca226]/30 hover:text-[#d4911f] transition-colors",
    description: "Icône avec fond orange au survol"
  },
  
  // Symboles pour statuts
  success: {
    className: "text-[#22c55e] bg-[#22c55e]/20 p-1 rounded",
    description: "Symbole de succès vert"
  },
  warning: {
    className: "text-[#f59e0b] bg-[#f59e0b]/20 p-1 rounded",
    description: "Symbole d'avertissement orange"
  },
  error: {
    className: "text-[#ef4444] bg-[#ef4444]/20 p-1 rounded",
    description: "Symbole d'erreur rouge"
  },
  info: {
    className: "text-[#3b82f6] bg-[#3b82f6]/20 p-1 rounded",
    description: "Symbole d'information bleu"
  },
  
  // Symboles pour badges
  badge: {
    className: "bg-[#eca226]/20 text-[#eca226] text-xs font-medium px-2 py-1 rounded-full",
    description: "Badge orange avec fond subtil"
  },
  badgeOutline: {
    className: "border border-dashed border-[#eca226] text-[#eca226] text-xs font-medium px-2 py-1 rounded-full",
    description: "Badge orange avec bordure en pointillés"
  },
} as const;

// Animations et transitions
export const ANIMATIONS = {
  // Transitions
  smooth: "transition-all duration-200 ease-in-out",
  fast: "transition-all duration-150 ease-in-out",
  slow: "transition-all duration-300 ease-in-out",
  
  // Animations de survol
  hover: "hover:scale-105 hover:shadow-lg",
  hoverGlow: "hover:shadow-[0_0_20px_rgba(236,162,38,0.3)]",
  hoverBorder: "hover:border-[#eca226] hover:border-solid",
  
  // Animations de chargement
  pulse: "animate-pulse",
  spin: "animate-spin",
  bounce: "animate-bounce",
  
  // Animations spécifiques Carbivio
  glowOrange: "shadow-[0_0_20px_rgba(236,162,38,0.2)]",
  borderPulse: "animate-pulse border-[#eca226]",
} as const;

// Layouts et grilles
export const LAYOUTS = {
  // Layouts principaux
  dashboard: "min-h-screen bg-[#151514] p-6",
  sidebar: "w-64 bg-[#1a1a19] border-r border-dashed border-[#2a2a28] min-h-screen",
  content: "flex-1 bg-[#151514] overflow-hidden",
  
  // Grilles
  grid: "grid gap-6",
  gridCols: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    6: "grid-cols-6",
    12: "grid-cols-12",
  },
  
  // Flexbox
  flex: "flex gap-4",
  flexCol: "flex flex-col gap-4",
  flexBetween: "flex justify-between items-center",
  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-start items-center",
  flexEnd: "flex justify-end items-center",
} as const;

// Espacements
export const SPACING = {
  padding: {
    xs: "p-2",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  },
  margin: {
    xs: "m-2",
    sm: "m-3",
    md: "m-4",
    lg: "m-6",
    xl: "m-8",
  },
  gap: {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  },
} as const;

// Typographie
export const TYPOGRAPHY = {
  // Tailles
  sizes: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  },
  
  // Épaisseurs
  weights: {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  },
  
  // Couleurs
  colors: {
    primary: "text-white",
    secondary: "text-[#a0a09e]",
    muted: "text-[#6b6a68]",
    accent: "text-[#eca226]",
  },
  
  // Alignements
  alignment: {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  },
} as const;

// Breakpoints responsives
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Ombres
export const SHADOWS = {
  primary: "shadow-[0_4px_20px_rgba(236,162,38,0.3)]",
  success: "shadow-[0_4px_20px_rgba(34,197,94,0.3)]",
  warning: "shadow-[0_4px_20px_rgba(245,158,11,0.3)]",
  error: "shadow-[0_4px_20px_rgba(239,68,68,0.3)]",
  info: "shadow-[0_4px_20px_rgba(59,130,246,0.3)]",
  subtle: "shadow-[0_1px_3px_rgba(0,0,0,0.12)]",
  medium: "shadow-[0_4px_6px_rgba(0,0,0,0.07)]",
  large: "shadow-[0_10px_15px_rgba(0,0,0,0.1)]",
} as const;

// Utilitaires pour les frames
export const FRAME_UTILS = {
  /**
   * Crée une classe de frame personnalisée
   */
  createFrame: (options: {
    borderStyle?: "solid" | "dashed" | "dotted";
    borderWidth?: number;
    borderColor?: string;
    backgroundColor?: string;
    rounded?: string;
    padding?: string;
  }) => {
    const {
      borderStyle = "dashed",
      borderWidth = 1,
      borderColor = COLORS.primary,
      backgroundColor = COLORS.background,
      rounded = "lg",
      padding = "",
    } = options;

    const borderClass = borderStyle === "solid" ? "border-solid" : 
                     borderStyle === "dotted" ? "border-dotted" : "border-dashed";
    
    return [
      `border-${borderWidth}`,
      borderClass,
      `border-[${borderColor}]`,
      `bg-[${backgroundColor}]`,
      `rounded-${rounded}`,
      padding
    ].filter(Boolean).join(" ");
  },
  
  /**
   * Crée une classe de frame avec animation
   */
  createAnimatedFrame: (baseClass: string, animationType: "hover" | "pulse" | "glow" = "hover") => {
    const animations = {
      hover: "hover:border-[#eca226] hover:border-solid hover:bg-[#1f1f1e] transition-all duration-200",
      pulse: "animate-pulse border-[#eca226]",
      glow: "hover:shadow-[0_0_20px_rgba(236,162,38,0.3)]",
    };
    
    return `${baseClass} ${animations[animationType]}`;
  },
} as const;

// Export par défaut pour usage facile
export const DEFAULTS = {
  frame: FRAME_STYLES.primary,
  symbol: SYMBOL_STYLES.primary,
  animation: ANIMATIONS.smooth,
  layout: LAYOUTS.dashboard,
  spacing: SPACING.md,
  typography: TYPOGRAPHY.sizes.base,
} as const;
