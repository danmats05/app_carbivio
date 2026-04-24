"use client";

import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import RuixenBentoCards from "@/components/ui/ruixen-bento-cards";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  Facebook,
  Instagram,
  Phone,
} from "lucide-react";
import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";
import { selectServiceFromHero } from "@/components/ui/ruixen-bento-cards";
import NumberText from "@/components/ui/number-text";
import { CarbivioTestimonialsSection } from "@/components/blocks/carbivio-testimonials";
import { Footer } from "@/components/ui/modem-animated-footer";

// FAQ Accordion Component
function FAQAccordion({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <h3 className="font-montserrat font-semibold text-lg text-white">
          {question}
        </h3>
        <ChevronDown
          className={`h-5 w-5 text-[#eca226] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-5">
          <p className="text-white/60 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scroll vers le bas - cacher la navbar
        setIsVisible(false);
      } else {
        // Scroll vers le haut - montrer la navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const services = [
    { name: "Carburant" },
    { name: "Batterie" },
    { name: "Huile moteur" },
    { name: "Pneus" },
    { name: "Urgence" },
  ];

  const handleServiceSelect = (serviceName: string) => {
    setIsServicesMenuOpen(false);
    selectServiceFromHero(serviceName);

    // Scroll vers la section des cartes
    setTimeout(() => {
      const cardsSection = document.querySelector(
        '[data-section="ruixen-cards"]',
      );
      cardsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <div
      className="min-h-screen bg-[#151514] text-white overflow-x-hidden"
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

            <a
              href="#avantages"
              className="hover:text-white transition-colors scroll-smooth"
            >
              Avantages
            </a>
            <Link href="/about" className="hover:text-white transition-colors">
              À propos de nous
            </Link>
            <a
              href="#faq"
              className="hover:text-white transition-colors scroll-smooth"
            >
              FAQ
            </a>
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

      {/* ─── HERO ─── */}
      <Hero />

      {/* ─── SERVICES CARBIVIO ─── */}
      <RuixenBentoCards />

      {/* ─── AVANTAGES ─── */}
      <section
        id="avantages"
        className="relative py-20 lg:py-24 px-6 overflow-hidden"
      >
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-special-gothic text-6xl sm:text-7xl lg:text-8xl text-white leading-tight mb-8">
              Pourquoi
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#eca226] to-[#d4911f] drop-shadow-[0_0_30px_rgba(236,162,38,0.5)]">
                  CARBIVIO ?
                </span>
                {/* Effet d'ombre derrière CARBIVIO */}
                <span className="absolute inset-0 text-black/50 blur-[2px] transform translate-x-1 translate-y-1 z-0">
                  CARBIVIO ?
                </span>
              </span>
            </h2>
            <p className="font-montserrat text-white/60 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              Découvrez pourquoi des milliers de conducteurs nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ultra rapide",
                desc: "Nos techniciens arrivent en moins de 30 minutes, où que vous soyez dans la ville.",
              },
              {
                title: "100% sécurisé",
                desc: "Paiements sécurisés, techniciens vérifiés, et suivi en temps réel de chaque intervention.",
              },
              {
                title: "Tout en un clic",
                desc: "Créez une demande en quelques secondes depuis votre tableau de bord, n'importe quand.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative border border-dashed rounded-lg p-6 min-h-[200px] flex flex-col justify-between transition-all duration-500 bg-white/5 backdrop-blur-sm border-white/20 hover:border-[#eca226]/30 hover:bg-white/10"
              >
                {/* Plus icons aux coins */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-6 transition-colors duration-500 text-[#eca226] absolute -top-3 -left-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-6 transition-colors duration-500 text-[#eca226] absolute -top-3 -right-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-6 transition-colors duration-500 text-[#eca226] absolute -bottom-3 -left-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  strokeWidth="1"
                  stroke="currentColor"
                  className="size-6 transition-colors duration-500 text-[#eca226] absolute -bottom-3 -right-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold transition-colors duration-500 text-white group-hover:text-[#eca226]">
                    {item.title}
                  </h3>
                  <p className="transition-colors duration-500 text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA final */}
          <div className="text-center mt-12">
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de conducteurs qui font confiance à
              Carbivio pour leurs besoins automobiles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#eca226] text-black font-bold text-lg hover:bg-[#d4911f] active:scale-[0.98] transition-all shadow-[0_0_50px_rgba(236,162,38,0.35)] hover:shadow-[0_0_70px_rgba(236,162,38,0.5)]"
              >
                Créer un compte gratuit <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-bold text-lg hover:border-white/40 hover:bg-white/10 transition-all"
              >
                Voir les services <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-white/20 text-sm mt-4">
              Déjà inscrit ?{" "}
              <Link href="/login" className="text-[#eca226] hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ─── */}
      <CarbivioTestimonialsSection
        title="Tout ce buzz"
        description="par rapport à Carbivio"
        testimonials={[
          {
            author: {
              name: "Marie Dubois",
              title: "Directrice Marketing",
              handle: "mariedubois",
              avatar: "/car__Honda_Civic.png",
            },
            text: "Service exceptionnel ! J'avais une panne sur l'autoroute et Carbivio est intervenu en moins de 20 minutes. Le technicien était professionnel et a résolu le problème rapidement.",
          },
          {
            author: {
              name: "Thomas Martin",
              title: "Consultant IT",
              handle: "tmartin",
              avatar: "/car__Porsche_Cayenne.png",
            },
            text: "J'utilise Carbivio pour toute ma flotte de véhicules. La plateforme est intuitive et les interventions toujours ponctuelles. Un gain de temps énorme pour mon entreprise.",
          },
          {
            author: {
              name: "Sophie Laurent",
              title: "Avocate",
              handle: "sophiel",
              avatar: "/car__Ford_Edge.png",
            },
            text: "La livraison de carburant à domicile a changé ma routine. Plus besoin de faire la queue à la station, tout se fait en quelques clics. Pratique et fiable !",
          },
          {
            author: {
              name: "Lucas Petit",
              title: "Chef d'entreprise",
              handle: "lucaspetit",
              avatar: "/car__Ford_Explorer.png",
            },
            text: "Le service premium en vaut vraiment le coût. Intervention prioritaire, techniciens experts, et un support client disponible 24/7. Je recommande sans hésiter.",
          },
          {
            author: {
              name: "Emma Rousseau",
              title: "Designer",
              handle: "emmar",
              avatar: "/car__Honda_Civic.png",
            },
            text: "J'ai eu une crevaison tard le soir et Carbivio m'a dépannée en 15 minutes. Le service client m'a tenue informée tout au long de l'intervention. Impressionnant !",
          },
          {
            author: {
              name: "Nicolas Bernard",
              title: "Architecte",
              handle: "nber",
              avatar: "/car__Porsche_Cayenne.png",
            },
            text: "L'application est très bien conçue, simple à utiliser et les notifications en temps réel sont très utiles. Carbivio a vraiment modernisé le service automobile.",
          },
        ]}
      />

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-16 lg:py-20 px-6 bg-[#151514]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#eca226] text-sm font-semibold uppercase tracking-widest mb-4">
              Questions fréquentes
            </p>
            <h2 className="font-special-gothic font-extrabold text-4xl lg:text-5xl text-white leading-tight mb-6">
              Tout ce que vous devez
              <br />
              <span className="text-[#eca226]">savoir sur Carbivio</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              Les réponses aux questions que nos clients nous posent le plus
              souvent
            </p>
          </div>

          <div className="space-y-4">
            <FAQAccordion
              question="Comment fonctionne le service de livraison de carburant ?"
              answer="Carbivio vous livre du carburant directement là où vous êtes, que ce soit à domicile, au bureau ou sur le bord de la route. Il suffit de commander via notre application, de choisir votre type de carburant et la quantité, et nos techniciens livrent en moins de 30 minutes. Le service est disponible 24/7 dans toute la ville."
            />
            <FAQAccordion
              question="Quels types de véhicules pouvez-vous assister ?"
              answer="Nous intervenons sur tous les types de véhicules : voitures particulières, SUV, utilitaires légers, motos et même certains véhicules de collection. Nos techniciens sont formés pour travailler sur toutes marques et tous modèles, avec les équipements adaptés à chaque type de véhicule."
            />
            <FAQAccordion
              question="Comment êtes-vous aussi rapides pour les interventions d'urgence ?"
              answer="Notre réseau de techniciens est stratégiquement positionné dans toute la ville. Lorsque vous appelez, notre système localise automatiquement le technicien le plus proche disponible. Nos véhicules d'intervention sont équipés de tout le matériel nécessaire, ce qui nous permet d'arriver sur place en moins de 30 minutes, 24/7."
            />
            <FAQAccordion
              question="Vos services sont-ils garantis et assurés ?"
              answer="Absolument. Tous nos services sont couverts par une assurance professionnelle complète. Nous garantissons la qualité de nos pièces et de nos interventions. En cas de problème lié à notre intervention, nous intervenons gratuitement pour corriger la situation. Votre tranquillité d'esprit est notre priorité."
            />
            <FAQAccordion
              question="Comment fixez-vous vos prix pour les différents services ?"
              answer="Nos prix sont transparents et compétitifs. Le tarif varie selon le type de service et la distance d'intervention. Vous recevez toujours un devis avant confirmation, sans frais cachés. Pour les livraisons de carburant, le prix inclut la livraison et le carburant au prix du marché local."
            />
            <FAQAccordion
              question="Puis-je planifier un rendez-vous à l'avance ?"
              answer="Oui, bien sûr ! Vous pouvez planifier jusqu'à 7 jours à l'avance via notre application. C'est idéal pour la maintenance régulière comme les vidanges ou les contrôls saisonniers. Bien sûr, nos services d'urgence restent disponibles 24/7 sans rendez-vous."
            />
            <FAQAccordion
              question="Que faire si j'ai une panne sur autoroute ?"
              answer="Appelez-nous immédiatement au numéro d'urgence dans l'application. Notre système détecte automatiquement votre position et dépêche le technicien le plus proche. Nous intervenons sur toutes les autoroutes et voies rapides, avec les équipements de sécurité nécessaires pour vous assister en toute sécurité."
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-white/40 text-sm mb-6">
              Vous ne trouvez pas votre réponse ?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#eca226] text-[#eca226] font-semibold hover:bg-[#eca226] hover:text-white transition-all"
            >
              Contacter le support <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ANIMÉ ─── */}
      <Footer
        brandName="CARBIVIO"
        brandDescription={
          <>
            Service automobile <span className="numbers-idgrotesk">24/7</span>.
            Intervention rapide, livraison de carburant et assistance
            d&apos;urgence où que vous soyez.
          </>
        }
        socialLinks={[
          {
            icon: <Mail className="w-full h-full" />,
            href: "mailto:contact@carbivio.com",
            label: "Email",
          },
          {
            icon: <Facebook className="w-full h-full" />,
            href: "https://facebook.com/carbivio",
            label: "Facebook",
          },
          {
            icon: <Instagram className="w-full h-full" />,
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
          { label: "Services", href: "#services" },
          { label: "Avantages", href: "#avantages" },
          { label: "FAQ", href: "#faq" },
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
