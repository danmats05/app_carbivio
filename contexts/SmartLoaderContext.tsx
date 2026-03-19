"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LoaderContextType {
  showLoader: boolean;
  setShowLoader: (show: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Vérifier si c'est un refresh ou premier chargement
    const checkIfRefreshOrFirstLoad = () => {
      // Navigation performance API pour détecter les refreshs
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const navigationEntry = navigationEntries[0];
      
      // Type de navigation: 0 = navigate, 1 = reload, 2 = back_forward
      const navigationType = navigationEntry?.type;
      
      // Si c'est un reload ou si pas de sessionStorage (premier chargement)
      if (navigationType === 'reload' || !sessionStorage.getItem('appLoaded')) {
        sessionStorage.setItem('appLoaded', 'true');
        setShowLoader(true);
        
        // Masquer après 2 secondes
        setTimeout(() => {
          setShowLoader(false);
        }, 2000);
      }
    };

    checkIfRefreshOrFirstLoad();
  }, []);

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
