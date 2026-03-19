"use client";

import React from "react";

interface NumberTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Composant qui applique automatiquement la police IDGrotesk aux chiffres
 * Suivant la règle : TOUS les chiffres doivent utiliser IDGrotesk
 */
export default function NumberText({ children, className = "" }: NumberTextProps) {
  return (
    <span className={`numbers-idgrotesk ${className}`}>
      {children}
    </span>
  );
}
