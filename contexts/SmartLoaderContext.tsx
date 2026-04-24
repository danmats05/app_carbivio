"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LoaderContextType {
  showLoader: boolean;
  setShowLoader: (show: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(true); // Commence à true
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Vérifier si c'est un refresh ou premier chargement
    const checkIfRefreshOrFirstLoad = () => {
      // Navigation performance API pour détecter les refreshs
      const navigationEntries = performance.getEntriesByType(
        "navigation",
      ) as PerformanceNavigationTiming[];
      const navigationEntry = navigationEntries[0];

      // Type de navigation: 0 = navigate, 1 = reload, 2 = back_forward
      const navigationType = navigationEntry?.type;

      // Si c'est un reload ou si pas de sessionStorage (premier chargement)
      if (navigationType === "reload" || !sessionStorage.getItem("appLoaded")) {
        sessionStorage.setItem("appLoaded", "true");
        setShowLoader(true);
        setIsInitialLoad(true);

        // Masquer après 2 secondes
        setTimeout(() => {
          setShowLoader(false);
          setIsInitialLoad(false);
        }, 2000);
      } else {
        // Navigation normale (pas de loader)
        setShowLoader(false);
        setIsInitialLoad(false);
      }
    };

    // Petite attente pour s'assurer que le loader est visible dès le début
    const timer = setTimeout(() => {
      checkIfRefreshOrFirstLoad();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      {/* Afficher le loader en premier pendant le chargement initial */}
      {isInitialLoad ? (
        <div className="fixed inset-0 bg-[#151514] flex flex-col items-center justify-center z-[9999]">
          {/* Logo */}
          <div className="mb-4">
            <img
              src="/logo.png"
              alt="Carbivio"
              width={210}
              height={210}
              className="object-contain"
            />
          </div>

          {/* Loader */}
          <div className="loader" />

          {/* Styles CSS */}
          <style jsx>{`
            .loader {
              display: block;
              --height-of-loader: 4px;
              --loader-color: #eca226;
              width: 250px;
              height: var(--height-of-loader);
              border-radius: 30px;
              background-color: rgba(0, 0, 0, 0.2);
              position: relative;
            }

            .loader::before {
              content: "";
              position: absolute;
              background: var(--loader-color);
              top: 0;
              left: 0;
              width: 0%;
              height: 100%;
              border-radius: 30px;
              animation: moving 1s ease-in-out infinite;
            }

            @keyframes moving {
              50% {
                width: 100%;
              }
              100% {
                width: 0;
                right: 0;
                left: unset;
              }
            }
          `}</style>
        </div>
      ) : (
        children
      )}
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
