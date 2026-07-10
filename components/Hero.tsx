"use client";

import Link from "next/link";
import Image from "next/image";
import { FlipWords } from "@/components/ui/flip-words";
import { useState, useEffect } from "react";
import NumberText from "@/components/ui/number-text";
import {
  selectServiceFromHero,
  subscribeToServiceSelection,
} from "@/components/ui/ruixen-bento-cards";

const flipWords = ["Carburant", "Batterie", "Huile moteur", "Pneus", "Urgence"];

const serviceIcons = [
  { src: "/pistolet.png", label: "Carburant" },
  { src: "/batterie.png", label: "Batterie" },
  { src: "/oil.png", label: "Huile moteur" },
  { src: "/5 copie.png", label: "Pneus" },
  { src: "/alert.png", label: "Urgence" },
];

export default function Hero() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    selectServiceFromHero(service);
  };

  // Écouter les sélections venant du menu navbar
  useEffect(() => {
    const unsubscribe = subscribeToServiceSelection((service) => {
      if (service) {
        setSelectedService(service);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/video_hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Cyan glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#eca226]/10 rounded-full blur-[100px]" />

      {/* Hero content — badge + titre + paragraphe, largeur contrainte */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#eca226]/30 bg-[#eca226]/10 text-[#eca226] text-xs font-semibold tracking-widest uppercase mb-4">
          <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          Service disponible <NumberText>24h/24</NumberText> — <NumberText>7j/7</NumberText>
        </div>

        <h1 className="font-special-gothic text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
          Tout ce dont vous avez besoin
          <br />
          <div className="font-special-gothic text-[#eca226] text-4xl sm:text-4xl md:text-5xl lg:text-6xl max-w-[90vw] mx-auto">
            <FlipWords words={flipWords} />
          </div>
        </h1>

        <p className="font-montserrat text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Des services fiables et rapides, là où vous êtes, pour que vous
          n&apos;ayez jamais à attendre.
        </p>
      </div>

      {/* Services icons — conteneur séparé full-width pour le scroll horizontal */}
      <div
        id="services"
        className="relative z-10 mt-4 lg:mt-8 w-full max-w-4xl lg:px-6"
      >
        <div className="flex lg:grid lg:grid-cols-5 overflow-x-auto lg:overflow-x-visible gap-6 lg:gap-8 px-6 lg:px-0 pb-3 lg:pb-0 snap-x snap-mandatory lg:snap-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {serviceIcons.map(({ src, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 shrink-0 lg:shrink snap-center">
              <button
                onClick={() => handleServiceClick(label)}
                className={`flex items-center justify-center w-28 h-28 md:w-36 md:h-36 lg:w-full lg:h-40 rounded-2xl transition-all duration-300 cursor-pointer group ${
                  selectedService === label ? "bg-white/10" : "bg-transparent"
                }`}
              >
                <Image
                  src={src}
                  alt={label}
                  width={120}
                  height={120}
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </button>
              <span className="text-xs md:text-sm font-medium text-white/80 font-montserrat text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
        {/* Hint swipe — visible uniquement sur mobile, disparaît après 3s */}
        <p className={`lg:hidden text-center text-white/30 text-[11px] font-montserrat mt-3 tracking-wide transition-opacity duration-700 ${showSwipeHint ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          ← Glissez pour découvrir →
        </p>
      </div>
    </section>
  );
}
