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

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#eca226]/30 bg-[#eca226]/10 text-[#eca226] text-xs font-semibold tracking-widest uppercase mb-4">
          <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          Service disponible{" "}
          <span className="inline-flex items-center -translate-y-0.5">
            <NumberText>24h/24</NumberText>
          </span>{" "}
          —{" "}
          <span className="inline-flex items-center -translate-y-0.5">
            <NumberText>7j/7</NumberText>
          </span>
        </div>

        <h1 className="font-special-gothic text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
          Tout ce dont vous avez besoin
          <br />
          <div className="text-[#eca226] text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-[90vw] mx-auto">
            <FlipWords words={flipWords} />
          </div>
        </h1>

        <p className="font-montserrat text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Des services fiables et rapides, là où vous êtes, pour que vous
          n&apos;ayez jamais à attendre.
        </p>

        {/* Services icons row */}
        <div
          id="services"
          className="relative z-10 mt-16 lg:mt-20 px-4 w-full max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            <button
              onClick={() => handleServiceClick("Carburant")}
              className={`flex flex-col items-center justify-center w-full h-40 rounded-2xl transition-all duration-300 cursor-pointer group ${
                selectedService === "Carburant"
                  ? "bg-white/10"
                  : "bg-transparent"
              }`}
            >
              <Image
                src="/pistolet.png"
                alt="Carburant"
                width={120}
                height={120}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => handleServiceClick("Batterie")}
              className={`flex flex-col items-center justify-center w-full h-40 rounded-2xl transition-all duration-300 cursor-pointer group ${
                selectedService === "Batterie"
                  ? "bg-white/10"
                  : "bg-transparent"
              }`}
            >
              <Image
                src="/batterie.png"
                alt="Batterie"
                width={120}
                height={120}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => handleServiceClick("Huile moteur")}
              className={`flex flex-col items-center justify-center w-full h-40 rounded-2xl transition-all duration-300 cursor-pointer group ${
                selectedService === "Huile moteur"
                  ? "bg-white/10"
                  : "bg-transparent"
              }`}
            >
              <Image
                src="/oil.png"
                alt="Huile moteur"
                width={120}
                height={120}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => handleServiceClick("Pneus")}
              className={`flex flex-col items-center justify-center w-full h-40 rounded-2xl transition-all duration-300 cursor-pointer group ${
                selectedService === "Pneus" ? "bg-white/10" : "bg-transparent"
              }`}
            >
              <Image
                src="/5 copie.png"
                alt="Pneus"
                width={120}
                height={120}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => handleServiceClick("Urgence")}
              className={`flex flex-col items-center justify-center w-full h-40 rounded-2xl transition-all duration-300 cursor-pointer group ${
                selectedService === "Urgence" ? "bg-white/10" : "bg-transparent"
              }`}
            >
              <Image
                src="/alert.png"
                alt="Urgence"
                width={120}
                height={120}
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        {/* Service names row */}
        <div className="relative z-10 mt-2 px-4 w-full max-w-4xl mx-auto">
          <div className="hidden md:grid md:grid-cols-5 md:gap-6 lg:gap-8">
            <span className="text-center text-sm font-medium text-white/80 font-montserrat">
              Carburant
            </span>
            <span className="text-center text-sm font-medium text-white/80 font-montserrat">
              Batterie
            </span>
            <span className="text-center text-sm font-medium text-white/80 font-montserrat">
              Huile moteur
            </span>
            <span className="text-center text-sm font-medium text-white/80 font-montserrat">
              Pneus
            </span>
            <span className="text-center text-sm font-medium text-white/80 font-montserrat">
              Urgence
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
