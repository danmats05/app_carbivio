"use client";

import { useMemo } from "react";

/**
 * Hook centralisé pour gérer la logique des polices dans toute l'application
 * - font-idgrotesk : Pour tous les textes
 * - numbers-idgrotesk : Pour tous les nombres
 */
export function useFont() {
  const fontClasses = useMemo(() => ({
    // Classes de polices principales
    text: "font-idgrotesk",
    numbers: "numbers-idgrotesk",
    
    // Classes combinées pour éléments mixtes
    textAndNumbers: "font-idgrotesk numbers-idgrotesk",
    
    // Classes pour les éléments spécifiques
    heading: "font-idgrotesk font-bold",
    subheading: "font-idgrotesk font-semibold",
    body: "font-idgrotesk font-normal",
    caption: "font-idgrotesk text-sm",
    small: "font-idgrotesk text-xs",
    
    // Classes pour les nombres spécifiques
    largeNumbers: "numbers-idgrotesk text-2xl font-bold",
    mediumNumbers: "numbers-idgrotesk text-lg font-semibold",
    smallNumbers: "numbers-idgrotesk text-sm",
    currency: "numbers-idgrotesk font-mono",
    
    // Classes pour les éléments interactifs
    button: "font-idgrotesk font-medium",
    link: "font-idgrotesk hover:underline",
    input: "font-idgrotesk placeholder:font-idgrotesk",
    label: "font-idgrotesk text-sm font-medium",
    
    // Classes pour les éléments de tableau
    tableHeader: "font-idgrotesk font-semibold text-xs uppercase",
    tableCell: "font-idgrotesk text-sm",
    tableNumber: "numbers-idgrotesk text-sm font-mono",
    
    // Classes pour les KPIs
    kpiTitle: "font-idgrotesk text-sm font-medium",
    kpiValue: "numbers-idgrotesk text-2xl font-bold",
    kpiChange: "font-idgrotesk text-xs",
    
    // Classes pour les graphiques
    chartLabel: "font-idgrotesk text-xs",
    chartLegend: "font-idgrotesk text-sm",
    chartValue: "numbers-idgrotesk font-mono",
    
    // Classes pour les formulaires
    formTitle: "font-idgrotesk text-lg font-semibold",
    formLabel: "font-idgrotesk text-sm font-medium",
    formError: "font-idgrotesk text-sm text-red-500",
    formHelper: "font-idgrotesk text-xs text-gray-500",
    
    // Classes pour les notifications
    notificationTitle: "font-idgrotesk font-semibold",
    notificationMessage: "font-idgrotesk text-sm",
    
    // Classes pour les badges
    badge: "font-idgrotesk text-xs font-medium",
    
    // Classes pour les modales
    modalTitle: "font-idgrotesk text-lg font-semibold",
    modalContent: "font-idgrotesk text-sm",
  }), []);

  /**
   * Détermine la classe de police à utiliser en fonction du contenu
   * @param content - Le contenu à analyser
   * @param fallback - Classe de police par défaut si le contenu n'est pas clair
   * @returns La classe de police appropriée
   */
  const getFontClass = (content: string | number, fallback: string = fontClasses.text): string => {
    // Si c'est un nombre, utiliser la police de nombres
    if (typeof content === "number") {
      return fontClasses.numbers;
    }
    
    // Si c'est une chaîne, vérifier si elle contient principalement des nombres
    if (typeof content === "string") {
      // Patterns pour détecter les nombres avec formatage
      const numberPatterns = [
        /^\d+$/, // Nombres purs
        /^\d+[.,]\d+$/, // Nombres décimaux
        /^\d+[\s%]$/, // Pourcentages
        /^\d+[\sFCFA|€|$]$/, // Montants monétaires
        /^\d+[\s\/]\d+$/, // Ratios
        /^\+?\d+[\s-]?\d*[\s]?\d*$/, // Numéros de téléphone
        /^\d{4}[-]\d{2}[-]\d{2}$/, // Dates
      ];
      
      const isNumericString = numberPatterns.some(pattern => pattern.test(content.trim()));
      
      if (isNumericString) {
        return fontClasses.numbers;
      }
    }
    
    return fallback;
  };

  /**
   * Combine les classes de police avec d'autres classes CSS
   * @param fontClass - Classe de police de base
   * @param additionalClasses - Classes additionnelles
   * @returns Classes combinées
   */
  const combineClasses = (fontClass: string, ...additionalClasses: string[]): string => {
    return [fontClass, ...additionalClasses].filter(Boolean).join(" ");
  };

  return {
    // Classes prédéfinies
    ...fontClasses,
    
    // Fonctions utilitaires
    getFontClass,
    combineClasses,
    
    // Fonctions spécifiques pour les cas courants
    getTextClass: (additionalClasses?: string[]) => combineClasses(fontClasses.text, ...(additionalClasses || [])),
    getNumbersClass: (additionalClasses?: string[]) => combineClasses(fontClasses.numbers, ...(additionalClasses || [])),
    getHeadingClass: (level: 1 | 2 | 3 | 4 | 5 | 6 = 1, additionalClasses?: string[]) => {
      const headingClasses = {
        1: "text-4xl font-bold",
        2: "text-3xl font-bold",
        3: "text-2xl font-bold",
        4: "text-xl font-bold",
        5: "text-lg font-bold",
        6: "text-base font-bold",
      };
      return combineClasses(fontClasses.text, headingClasses[level], ...(additionalClasses || []));
    },
    getButtonClass: (variant: "primary" | "secondary" | "ghost" = "primary", additionalClasses?: string[]) => {
      const variantClasses = {
        primary: "bg-[#eca226] text-white hover:bg-[#d4911f]",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        ghost: "text-white hover:bg-white/10",
      };
      return combineClasses(fontClasses.button, variantClasses[variant], ...(additionalClasses || []));
    },
  };
}
