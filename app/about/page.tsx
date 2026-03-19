"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Target,
  Lightning,
  Users,
  Trophy,
  CaretDown,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  Phone,
} from "@phosphor-icons/react";
import { ArrowLeft as ArrowLeftPhosphor } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";
import { Footer } from "@/components/ui/modem-animated-footer";
import { BackgroundPlus } from "@/components/ui/background-plus";

export default function AboutPage() {
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      console.log("Scroll Y:", currentScrollY, "Last Y:", lastScrollY); // Debug

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scroll vers le bas - cacher la navbar
        setIsVisible(false);
        console.log("Cacher navbar");
      } else {
        // Scroll vers le haut - montrer la navbar
        setIsVisible(true);
        console.log("Montrer navbar");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const services = [
    { name: "Carburant" },
    { name: "Batterie" },
    { name: "Pneus" },
    { name: "Entretien" },
    { name: "Urgence" },
  ];

  const handleServiceSelect = (serviceName: string) => {
    setIsServicesMenuOpen(false);
    router.push(`/?service=${serviceName}`);
  };

  return (
    <div
      className="bg-[#151514] text-white overflow-x-hidden"
      onClick={() => setIsServicesMenuOpen(false)}
    >
      {/* ─── NAV ─── */}
      <nav
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3.5 rounded-full bg-white/[0.07] backdrop-blur-2xl  shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/navbar-logo.png"
              alt="Carbivio"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Links (desktop) - Centered */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60 absolute left-1/2 -translate-x-1/2">
            {/* Services dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                Services
                <CaretDown
                  className={`h-4 w-4 transition-transform ${isServicesMenuOpen ? "rotate-180" : ""}`}
                  weight="duotone"
                />
              </button>

              {/* Dropdown menu */}
              {isServicesMenuOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-[#151514] shadow-[0_8px_32px_rgba(0,0,0,0.8)] py-2 z-50"
                  style={{ backdropFilter: "blur(20px)" }}
                >
                  {services.map((service) => (
                    <button
                      key={service.name}
                      onClick={() => handleServiceSelect(service.name)}
                      className="block w-full text-left px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-[#eca226]/20 transition-colors"
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#avantages"
              className="hover:text-white transition-colors scroll-smooth"
            >
              Avantages
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              À propos de nous
            </Link>
            <Link
              href="/#faq"
              className="hover:text-white transition-colors scroll-smooth"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8"></div>

          {/* CTAs */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-full bg-[#eca226] text-black font-bold text-sm hover:bg-[#d4911f] transition-all shadow-[0_0_20px_rgba(236,162,38,0.3)]"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <BackgroundPlus
          plusColor="#eca226"
          backgroundColor="transparent"
          plusSize={80}
          fade={true}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              À Propos de Carbivio
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Nous sommes passionnés par la création d'expériences numériques
              exceptionnelles qui transforment les idées en réalité.
            </p>
          </div>

          {/* Back to home button */}
          <div className="fixed top-6 left-6 z-50">
            <Link
              href="/"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#eca226]/50 transition-all duration-300"
            >
              <ArrowLeftPhosphor
                className="w-5 h-5 text-[#eca226] group-hover:text-[#d4911f] transition-colors duration-300"
                weight="duotone"
              />
              <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-300">
                Accueil
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SEPARATOR ─── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#eca226] to-transparent opacity-50"></div>
      </div>

      {/* ─── STORY SECTION ─── */}
      <section id="story" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Carbivio est né d'une vision simple : rendre la technologie
                accessible et puissante pour tous. Depuis nos débuts, nous nous
                sommes engagés à repousser les limites de l'innovation tout en
                gardant l'humain au cœur de chaque projet.
              </p>
              <p className="text-white/70 leading-relaxed">
                Notre équipe de passionnés travaille sans relâche pour créer des
                solutions qui non seulement répondent aux besoins d'aujourd'hui,
                mais anticipent également les défis de demain.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eca226]/20 to-transparent rounded-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/Camion-orange.png"
                  alt="Camion Carbivio"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUES SECTION ─── */}
      <section id="values" className="py-0 px-0 h-screen">
        <div className="w-full">
          <div className="text-center mb-16 pt-20">
            <h2 className="text-4xl font-bold mb-4">Nos Valeurs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 h-[calc(100vh-5rem)]">
            {/* Mission Card */}
            <div className="relative group overflow-hidden border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:border-[#eca226]/50 transition-all duration-500 cursor-pointer border-r-0">
              {/* Text Content - Visible by default */}
              <div className="absolute inset-0 p-8 flex flex-col justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-[#ff8c00]/50 flex items-center justify-center mb-6 group-hover:border-[#eca226]/50 transition-colors duration-300">
                  <Target className="w-8 h-8 text-[#eca226]" weight="duotone" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mission</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  Transformer les idées complexes en solutions simples et
                  efficaces qui créent de la valeur réelle.
                </p>
              </div>

              {/* Image Content - Visible on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-full relative">
                  <Image
                    src="/Mission.png"
                    alt="Mission"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#eca226]/30 to-[#d4911f]/30 flex items-end justify-start p-8">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Target
                          className="w-6 h-6 text-white"
                          weight="duotone"
                        />
                        <h3 className="text-2xl font-bold text-white">
                          Mission
                        </h3>
                      </div>
                      <p className="text-white/90 text-sm max-w-xs">
                        Excellence et innovation au cœur de notre démarche
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Innovation Card */}
            <div className="relative group overflow-hidden border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:border-[#eca226]/50 transition-all duration-500 cursor-pointer border-r-0">
              {/* Text Content - Visible by default */}
              <div className="absolute inset-0 p-8 flex flex-col justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-[#ff8c00]/50 flex items-center justify-center mb-6 group-hover:border-[#eca226]/50 transition-colors duration-300">
                  <Lightning
                    className="w-8 h-8 text-[#eca226]"
                    weight="duotone"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  Explorer constamment de nouvelles technologies et approches
                  pour rester à la pointe du progrès.
                </p>
              </div>

              {/* Image Content - Visible on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-full relative">
                  <Image
                    src="/Innovation.png"
                    alt="Innovation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#eca226]/30 to-[#d4911f]/30 flex items-end justify-start p-8">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Lightning
                          className="w-6 h-6 text-white"
                          weight="duotone"
                        />
                        <h3 className="text-2xl font-bold text-white">
                          Innovation
                        </h3>
                      </div>
                      <p className="text-white/90 text-sm max-w-xs">
                        Créativité et technologie pour un avenir meilleur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collaboration Card */}
            <div className="relative group overflow-hidden border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:border-[#eca226]/50 transition-all duration-500 cursor-pointer border-r-0">
              {/* Text Content - Visible by default */}
              <div className="absolute inset-0 p-8 flex flex-col justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-[#ff8c00]/50 flex items-center justify-center mb-6 group-hover:border-[#eca226]/50 transition-colors duration-300">
                  <Users className="w-8 h-8 text-[#eca226]" weight="duotone" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  Travailler main dans la main avec nos clients pour atteindre
                  ensemble des objectifs exceptionnels.
                </p>
              </div>

              {/* Image Content - Visible on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-full relative">
                  <Image
                    src="/Collaboration.png"
                    alt="Collaboration"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#eca226]/30 to-[#d4911f]/30 flex items-end justify-start p-8">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Users
                          className="w-6 h-6 text-white"
                          weight="duotone"
                        />
                        <h3 className="text-2xl font-bold text-white">
                          Collaboration
                        </h3>
                      </div>
                      <p className="text-white/90 text-sm max-w-xs">
                        Union des talents pour des résultats exceptionnels
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Excellence Card */}
            <div className="relative group overflow-hidden border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:border-[#eca226]/50 transition-all duration-500 cursor-pointer">
              {/* Text Content - Visible by default */}
              <div className="absolute inset-0 p-8 flex flex-col justify-center z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-[#ff8c00]/50 flex items-center justify-center mb-6 group-hover:border-[#eca226]/50 transition-colors duration-300">
                  <Trophy className="w-8 h-8 text-[#eca226]" weight="duotone" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  Ne jamais compromettre la qualité et toujours viser le
                  meilleur dans tout ce que nous entreprenons.
                </p>
              </div>

              {/* Image Content - Visible on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-full relative">
                  <Image
                    src="/Succes.png"
                    alt="Excellence"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#eca226]/30 to-[#d4911f]/30 flex items-end justify-start p-8">
                    <div className="text-left">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy
                          className="w-6 h-6 text-white"
                          weight="duotone"
                        />
                        <h3 className="text-2xl font-bold text-white">
                          Excellence
                        </h3>
                      </div>
                      <p className="text-white/90 text-sm max-w-xs">
                        Qualité irréprochable et dépassement de soi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer
        brandName="CARBIVIO"
        brandDescription={
          <>
            Service automobile <span className="numbers-idgrotesk">24/7</span>.
            Intervention rapide, livraison de carburant et assistance d'urgence
            où que vous soyez.
          </>
        }
        socialLinks={[
          {
            icon: <Envelope className="w-full h-full" />,
            href: "mailto:contact@carbivio.com",
            label: "Email",
          },
          {
            icon: <FacebookLogo className="w-full h-full" />,
            href: "https://facebook.com/carbivio",
            label: "Facebook",
          },
          {
            icon: <InstagramLogo className="w-full h-full" />,
            href: "https://instagram.com/carbivio",
            label: "Instagram",
          },
          {
            icon: <Phone className="w-full h-full" />,
            href: "tel:+33612345678",
            label: "WhatsApp",
          },
        ]}
        navLinks={[
          { label: "Services", href: "/#services" },
          { label: "Avantages", href: "/#avantages" },
          { label: "FAQ", href: "/#faq" },
          { label: "Contact", href: "/contact" },
          { label: "À propos de nous", href: "/about" },
        ]}
        creatorName="Avento"
        creatorUrl="https://avento-agency.com"
        brandIcon={
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-bold text-black text-2xl">C</span>
          </div>
        }
      />
    </div>
  );
}
