"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Target,
  Lightning,
  Users,
  Trophy,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  Phone,
} from "@phosphor-icons/react";
import { ExpandingCards, CardItem } from "@/components/ui/expanding-cards";
import { Footer } from "@/components/ui/modem-animated-footer";
import { BackgroundPlus } from "@/components/ui/background-plus";
import { CarbivioNavbar } from "@/components/navbar";

const valuesData: CardItem[] = [
  {
    id: "mission",
    title: "Mission",
    description:
      "Transformer les idées complexes en solutions simples et efficaces qui créent de la valeur réelle.",
    imgSrc: "/Mission.png",
    icon: <Target className="w-6 h-6" weight="duotone" />,
    linkHref: "#",
  },
  {
    id: "innovation",
    title: "Innovation",
    description:
      "Explorer constamment de nouvelles technologies et approches pour rester à la pointe du progrès.",
    imgSrc: "/Innovation.png",
    icon: <Lightning className="w-6 h-6" weight="duotone" />,
    linkHref: "#",
  },
  {
    id: "collaboration",
    title: "Collaboration",
    description:
      "Travailler main dans la main avec nos clients pour atteindre ensemble des objectifs exceptionnels.",
    imgSrc: "/Collaboration.png",
    icon: <Users className="w-6 h-6" weight="duotone" />,
    linkHref: "#",
  },
  {
    id: "excellence",
    title: "Excellence",
    description:
      "Ne jamais compromettre la qualité et toujours viser le meilleur dans tout ce que nous entreprenons.",
    imgSrc: "/Succes.png",
    icon: <Trophy className="w-6 h-6" weight="duotone" />,
    linkHref: "#",
  },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* ─── NAV ─── */}
      <CarbivioNavbar onServiceClick={(service) => router.push(`/?service=${service}`)} />

      {/* ─── HERO SECTION ─── */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <BackgroundPlus
          plusColor="#eca226"
          backgroundColor="transparent"
          plusSize={80}
          fade={true}
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-special-gothic text-5xl md:text-7xl text-white leading-tight mb-6">
              À Propos de Carbivio
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Nous sommes passionnés par la création d'expériences numériques
              exceptionnelles qui transforment les idées en réalité.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SEPARATOR ─── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-linear-to-r from-transparent via-[#eca226] to-transparent opacity-50"></div>
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
              <div className="absolute inset-0 bg-linear-to-r from-[#eca226]/20 to-transparent rounded-2xl"></div>
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
      <section id="values" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nos Valeurs</h2>
          </div>
          <div className="flex justify-center">
            <ExpandingCards
              items={valuesData}
              defaultActiveIndex={0}
              className="w-full"
            />
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
        creatorName="DJ"
        creatorUrl="https://danjoris.com"
        creatorLogo="/dj-logo.png"
        brandIcon={
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-bold text-black text-2xl">C</span>
          </div>
        }
      />
    </div>
  );
}
