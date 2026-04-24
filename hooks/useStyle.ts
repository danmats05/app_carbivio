"use client";

import { useMemo } from "react";

/**
 * Hook centralisé pour gérer les styles visuels Carbivio
 * Frames avec traits interrompus
 * Symboles orange (#eca226)
 * Styles cohérents dans toute l'application
 */
export function useStyle() {
  const styleClasses = useMemo(() => ({
    // Couleurs principales Carbivio
    colors: {
      primary: "#eca226", // Orange Carbivio
      primaryLight: "#f4b873", // Orange clair
      primaryDark: "#d4911f", // Orange foncé
      background: "#151514", // Fond sombre
      surface: "#1a1a19", // Surface légèrement plus claire
      border: "#2a2a28", // Bordures
      text: "#ffffff", // Texte principal
      textSecondary: "#a0a09e", // Texte secondaire
      success: "#22c55e", // Vert
      warning: "#f59e0b", // Orange warning
      error: "#ef4444", // Rouge
      info: "#3b82f6", // Bleu
    },
    
    // Classes de frames avec traits interrompus
    frames: {
      // Frame principale avec bordure en pointillés
      primary: "border-2 border-dashed border-[#eca226] bg-[#151514] rounded-lg",
      secondary: "border border-dashed border-[#2a2a28] bg-[#1a1a19] rounded-lg",
      accent: "border-2 border-dotted border-[#eca226]/50 bg-[#151514] rounded-lg",
      
      // Frames spécifiques
      card: "border border-dashed border-[#2a2a28]/50 bg-[#1a1a19] rounded-lg p-4",
      cardHover: "hover:border-[#eca226]/50 hover:bg-[#1f1f1e] transition-all duration-200",
      selected: "border-2 border-solid border-[#eca226] bg-[#eca226]/10 rounded-lg",
      
      // Frames pour les tableaux
      table: "border border-dashed border-[#2a2a28] rounded-lg overflow-hidden",
      tableHeader: "border-b-2 border-dashed border-[#eca226] bg-[#eca226]/10",
      tableRow: "border-b border-dotted border-[#2a2a28]/30 hover:bg-[#1f1f1e]",
      
      // Frames pour les formulaires
      input: "border border-dashed border-[#2a2a28] bg-[#151514] rounded-lg px-3 py-2 focus:border-[#eca226] focus:outline-none",
      button: "border border-dashed border-[#eca226] bg-[#eca226] text-white rounded-lg px-4 py-2 hover:bg-[#d4911f] transition-colors",
      
      // Frames pour les KPIs
      kpi: "border border-dashed border-[#2a2a28] bg-[#1a1a19] rounded-lg p-4",
      kpiPositive: "border-l-4 border-l-[#22c55e] border-dashed border-[#2a2a28] bg-[#1a1a19] rounded-lg p-4",
      kpiNegative: "border-l-4 border-l-[#ef4444] border-dashed border-[#2a2a28] bg-[#1a1a19] rounded-lg p-4",
      
      // Frames pour les graphiques
      chart: "border border-dotted border-[#eca226]/30 bg-[#151514] rounded-lg p-4",
      chartGrid: "border-dashed border-[#2a2a28]/20",
      chartAxis: "border-dotted border-[#2a2a28]/40",
    },
    
    // Classes pour les symboles et icônes
    symbols: {
      // Symboles orange Carbivio
      primary: "text-[#eca226]",
      primaryLight: "text-[#f4b873]",
      primaryDark: "text-[#d4911f]",
      
      // Symboles avec fond orange
      iconBg: "bg-[#eca226]/20 text-[#eca226] p-2 rounded-lg",
      iconBgHover: "hover:bg-[#eca226]/30 hover:text-[#d4911f] transition-colors",
      
      // Symboles pour les statuts
      success: "text-[#22c55e] bg-[#22c55e]/20 p-1 rounded",
      warning: "text-[#f59e0b] bg-[#f59e0b]/20 p-1 rounded",
      error: "text-[#ef4444] bg-[#ef4444]/20 p-1 rounded",
      info: "text-[#3b82f6] bg-[#3b82f6]/20 p-1 rounded",
      
      // Symboles pour les badges
      badge: "bg-[#eca226]/20 text-[#eca226] text-xs font-medium px-2 py-1 rounded-full",
      badgeOutline: "border border-dashed border-[#eca226] text-[#eca226] text-xs font-medium px-2 py-1 rounded-full",
    },
    
    // Classes pour les animations et transitions
    animations: {
      // Transitions douces
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
    },
    
    // Classes pour les layouts
    layouts: {
      // Layouts principaux
      dashboard: "min-h-screen bg-[#151514] p-6",
      sidebar: "w-64 bg-[#1a1a19] border-r border-dashed border-[#2a2a28] min-h-screen",
      content: "flex-1 bg-[#151514] overflow-hidden",
      
      // Layouts pour les grilles
      grid: "grid gap-6",
      gridCols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        6: "grid-cols-6",
        12: "grid-cols-12",
      },
      
      // Layouts flexbox
      flex: "flex gap-4",
      flexCol: "flex flex-col gap-4",
      flexBetween: "flex justify-between items-center",
      flexCenter: "flex justify-center items-center",
      flexStart: "flex justify-start items-center",
      flexEnd: "flex justify-end items-center",
    },
    
    // Classes pour les espacements
    spacing: {
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
    },
    
    // Classes pour la typographie
    typography: {
      // Tailles de texte
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      
      // Épaisseurs
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      
      // Couleurs de texte
      primary: "text-white",
      secondary: "text-[#a0a09e]",
      muted: "text-[#6b6a68]",
      accent: "text-[#eca226]",
      
      // Alignements
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  }), []);

  /**
   * Combine plusieurs classes de style
   */
  const combineClasses = (...classes: (string | undefined | null | false)[]): string => {
    return classes.filter(Boolean).join(" ");
  };

  /**
   * Crée une classe de frame personnalisée
   */
  const createFrame = (options: {
    borderStyle?: "solid" | "dashed" | "dotted";
    borderWidth?: number;
    borderColor?: string;
    backgroundColor?: string;
    rounded?: string;
    padding?: string;
  }): string => {
    const {
      borderStyle = "dashed",
      borderWidth = 1,
      borderColor = styleClasses.colors.primary,
      backgroundColor = styleClasses.colors.background,
      rounded = "lg",
      padding = "",
    } = options;

    const borderClass = borderStyle === "solid" ? "border-solid" : 
                     borderStyle === "dotted" ? "border-dotted" : "border-dashed";
    
    return combineClasses(
      `border-${borderWidth}`,
      borderClass,
      `border-[${borderColor}]`,
      `bg-[${backgroundColor}]`,
      `rounded-${rounded}`,
      padding
    );
  };

  /**
   * Crée une classe de symbole personnalisée
   */
  const createSymbol = (options: {
    type?: "primary" | "success" | "warning" | "error" | "info";
    background?: boolean;
    size?: "sm" | "md" | "lg";
  }): string => {
    const {
      type = "primary",
      background = false,
      size = "md",
    } = options;

    const sizeClasses = {
      sm: "p-1 text-xs",
      md: "p-2 text-sm",
      lg: "p-3 text-base",
    };

    const typeColors = {
      primary: styleClasses.colors.primary,
      success: styleClasses.colors.success,
      warning: styleClasses.colors.warning,
      error: styleClasses.colors.error,
      info: styleClasses.colors.info,
    };

    const bgClass = background ? `bg-[${typeColors[type]}/20` : "";
    
    return combineClasses(
      `text-[${typeColors[type]}]`,
      bgClass,
      sizeClasses[size],
      "rounded"
    );
  };

  return {
    // Classes prédéfinies
    ...styleClasses,
    
    // Fonctions utilitaires
    combineClasses,
    createFrame,
    createSymbol,
    
    // Fonctions rapides pour les cas courants
    getPrimaryFrame: (padding?: string) => createFrame({ padding }),
    getCardFrame: () => styleClasses.frames.card,
    getIconButton: (type: "primary" | "success" | "warning" | "error" | "info" = "primary") => 
      createSymbol({ type, background: true }),
    getBadgeClass: () => styleClasses.symbols.badge,
    
    // Fonctions pour les animations
    getHoverClass: (withGlow = false) => 
      combineClasses(styleClasses.animations.hover, withGlow ? styleClasses.animations.hoverGlow : ""),
    
    // Fonctions pour les layouts
    getGridClass: (cols: number) => styleClasses.layouts.gridCols[cols as keyof typeof styleClasses.layouts.gridCols] || "grid-cols-1",
    getFlexClass: (direction: "row" | "col" = "row") => 
      direction === "col" ? styleClasses.layouts.flexCol : styleClasses.layouts.flex,
  };
}
