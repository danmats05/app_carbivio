"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LoaderContextType {
  isLoading: boolean;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simplement vérifier sessionStorage et agir en conséquence
    const checkFirstVisit = () => {
      const hasVisited = sessionStorage.getItem("hasVisited");

      if (hasVisited) {
        setIsLoading(false);
      } else {
        sessionStorage.setItem("hasVisited", "true");
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    checkFirstVisit();
  }, []);

  const hideLoader = () => setIsLoading(false);

  return (
    <LoaderContext.Provider value={{ isLoading, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}
