"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// État partagé pour le service sélectionné
let sharedSelectedService: string | null = null;
let listeners: ((service: string | null) => void)[] = [];

// Export de la fonction d'abonnement pour la synchronisation
export function subscribeToServiceSelection(
  callback: (service: string | null) => void,
) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((listener) => listener !== callback);
  };
}

function notifyServiceSelection(service: string | null) {
  sharedSelectedService = service;
  listeners.forEach((callback) => callback(service));
}

export function selectServiceFromHero(service: string) {
  notifyServiceSelection(service);
}

const carbivioServices = [
  {
    title: "Carburant Premium",
    description:
      "Livraison de carburant <span class='numbers-idgrotesk'>24/7</span> en moins de <span class='numbers-idgrotesk'>20</span> minutes. Service rapide et fiable partout où vous êtes, avec du carburant de qualité supérieure pour tous types de véhicules.",
  },
  {
    title: "Solutions Batterie",
    description:
      "Recharge, diagnostic et remplacement de batterie. Service complet pour vous éviter les pannes et assurer le démarrage de votre véhicule.",
  },
  {
    title: "Entretien Moteur",
    description:
      "Vidange professionnelle et huile moteur de haute qualité. Nos experts garantissent une maintenance optimale pour prolonger la durée de vie de votre moteur.",
  },
  {
    title: "Service Pneus",
    description:
      "Dépannage et remplacement de pneus rapide sur place. Intervention d'urgence pour crevaisons, usure ou dommages. Nos techniciens vous redonnent la mobilité avec des pneus adaptés à votre véhicule, garantissant sécurité et performance sur tous types de routes.",
  },
  {
    title: "Assistance <span class='numbers-idgrotesk'>24/7</span>",
    description:
      "Intervention d'urgence immédiate disponible <span class='numbers-idgrotesk'>24h/24</span> et <span class='numbers-idgrotesk'>7j/7</span>. Dépannage rapide sur route pour tous types de problèmes mécaniques.",
  },
];

const PlusCard: React.FC<{
  className?: string;
  title: string;
  description: string;
  isSelected?: boolean;
}> = ({ className = "", title, description, isSelected = false }) => {
  return (
    <div
      className={cn(
        "relative border border-dashed border-[#eca226]/30 rounded-lg p-6 min-h-[200px]",
        "flex flex-col justify-between transition-all duration-500",
        isSelected
          ? "bg-[#eca226] border-[#eca226] shadow-lg shadow-[#eca226]/30"
          : "bg-white dark:bg-zinc-950 border-gray-200 dark:border-gray-800",
        className,
      )}
    >
      <Link href="#">
        <CornerPlusIcons isSelected={isSelected} />
        {/* Content */}
        <div className="relative z-10 space-y-2">
          <h3
            className={cn(
              "text-xl font-bold transition-colors duration-500",
              isSelected
                ? "text-black dark:text-black"
                : "text-gray-900 dark:text-gray-100",
            )}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className={cn(
              "transition-colors duration-500",
              isSelected
                ? "text-black/80 dark:text-black/80"
                : "text-gray-700 dark:text-gray-300",
            )}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Link>
    </div>
  );
};

const CornerPlusIcons = ({ isSelected = false }: { isSelected?: boolean }) => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" isSelected={isSelected} />
    <PlusIcon className="absolute -top-3 -right-3" isSelected={isSelected} />
    <PlusIcon className="absolute -bottom-3 -left-3" isSelected={isSelected} />
    <PlusIcon className="absolute -bottom-3 -right-3" isSelected={isSelected} />
  </>
);

const PlusIcon = ({
  className,
  isSelected = false,
}: {
  className?: string;
  isSelected?: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={cn(
      "size-6 transition-colors duration-500",
      isSelected
        ? "text-black dark:text-black"
        : "text-[#eca226] dark:text-[#eca226]",
      className,
    )}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

export default function RuixenBentoCards() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    // S'abonner aux changements de sélection
    const unsubscribe = subscribeToServiceSelection((service) => {
      setSelectedService(service);

      // Scroll automatique vers la section
      if (service && sectionRef.current) {
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="ruixen-cards"
      className="bg-white dark:bg-black dark:bg-transparent border border-gray-200 dark:border-gray-800"
    >
      <div className="mx-auto container border border-gray-200 dark:border-gray-800 py-12 border-t-0 px-4">
        {/* Section Header */}
        <div className="text-center mb-16 px-4">
          <h2 className="font-special-gothic font-extrabold text-4xl lg:text-5xl text-gray-900 dark:text-gray-100 leading-tight mb-6">
            Services Premium <span className="text-[#eca226]">Carbivio</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-xl max-w-4xl mx-auto leading-relaxed">
            La qualité et la fiabilité au cœur de nos services. Intervention
            rapide <span className="numbers-idgrotesk">24/7</span>, pièces
            certifiées et techniciens experts pour votre tranquillité
            d&apos;esprit.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4">
          <PlusCard
            {...carbivioServices[0]}
            className="lg:col-span-3 lg:row-span-2"
            isSelected={selectedService === "Carburant"}
          />
          <PlusCard
            {...carbivioServices[1]}
            className="lg:col-span-2 lg:row-span-2"
            isSelected={selectedService === "Batterie"}
          />
          <PlusCard
            {...carbivioServices[2]}
            className="lg:col-span-4 lg:row-span-1"
            isSelected={selectedService === "Huile moteur"}
          />
          <PlusCard
            {...carbivioServices[3]}
            className="lg:col-span-2 lg:row-span-1"
            isSelected={selectedService === "Pneus"}
          />
          <PlusCard
            {...carbivioServices[4]}
            className="lg:col-span-2 lg:row-span-1"
            isSelected={selectedService === "Urgence"}
          />
        </div>

        {/* Section Footer Heading */}
        <div className="max-w-4xl ml-auto text-right px-4 mt-6 lg:-mt-8">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
            L&apos;excellence en mouvement
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Carbivio vous offre des services automobiles de qualité supérieure
            avec une réactivité exceptionnelle. Chaque intervention est garantie
            par des professionnels formés, utilisant des pièces d&apos;origine
            pour assurer la durabilité et la performance de votre véhicule.
          </p>
        </div>
      </div>
    </section>
  );
}
