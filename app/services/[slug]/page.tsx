"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/services-data";
import { BackgroundPlus } from "@/components/ui/background-plus";
import { Footer } from "@/components/ui/modem-animated-footer";
import {
  CaretDown,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  Phone,
  Clock,
  CheckCircle,
  ShieldCheck,
  Lightning,
  MapPin,
  CaretRight,
} from "@phosphor-icons/react";
import { CarbivioNavbar } from "@/components/navbar";

// Icon mapper for Why Us section
const IconMap: Record<string, React.ElementType> = {
  clock: Clock,
  check: CheckCircle,
  shield: ShieldCheck,
  lightning: Lightning,
  "map-pin": MapPin,
};

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = use(params);
  const service = servicesData[unwrappedParams.slug];

  if (!service) {
    notFound();
  }

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <CarbivioNavbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        <BackgroundPlus
          plusColor="#eca226"
          backgroundColor="transparent"
          plusSize={80}
          fade={true}
        />
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[#eca226]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <div className="mb-2 inline-block">
            <Image
              src={service.iconImage}
              alt={`${service.title} Icon`}
              width={180}
              height={180}
              className="object-contain drop-shadow-2xl"
            />
          </div>
          
          <h1 className="font-special-gothic text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent leading-tight tracking-tight max-w-4xl">
            {service.title}
          </h1>
          
          <p 
            className="text-lg md:text-xl text-[#eca226] font-medium max-w-2xl mx-auto leading-relaxed mb-12"
            dangerouslySetInnerHTML={{ __html: service.subtitle }}
          />

          <Link
            href="/register"
            className="flex items-center gap-2 px-8 py-4 bg-[#eca226] hover:bg-[#d4911f] text-black font-bold rounded-full text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(236,162,38,0.3)] hover:shadow-[0_0_30px_rgba(236,162,38,0.4)]"
          >
            Commander maintenant
            <CaretRight weight="bold" />
          </Link>
        </div>
      </section>

      {/* ─── PRICING SECTION ─── */}
      {service.pricingList && service.pricingList.length > 0 && (
        <section className="py-12 bg-black flex flex-col items-center border-t border-white/5 relative z-20">
          {service.pricingNote && (
            <p className="text-white/60 mb-8 text-center text-lg">{service.pricingNote}</p>
          )}
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 max-w-5xl mx-auto px-6">
            {service.pricingList.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-xl hover:border-[#eca226]/50 hover:bg-white/10 transition-colors">
                {item.tag && (
                  <div className={`w-10 h-10 flex items-center justify-center rounded-md font-bold text-sm numbers-idgrotesk ${item.tagColor}`}>
                    {item.tag}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-white font-medium text-sm md:text-base">{item.name}</span>
                  <span className="text-[#eca226] font-bold text-lg numbers-idgrotesk">
                    {item.price} <span className="text-sm font-normal text-white/50">{item.unit}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── HOW IT WORKS (STEPS) ─── */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#eca226]/20 to-transparent mix-blend-overlay z-10" />
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Steps Side */}
            <div>
              <h2 className="font-montserrat text-3xl md:text-5xl font-bold text-white mb-4">
                Commencer en <span className="text-[#eca226] numbers-idgrotesk">3</span> étapes
              </h2>
              <p className="text-white/60 mb-12 text-lg">
                Simple, rapide et sans tracas. Suivez ces étapes pour profiter du service.
              </p>

              <div className="space-y-8">
                {service.steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#eca226] flex items-center justify-center text-[#eca226] font-bold text-xl numbers-idgrotesk">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2" dangerouslySetInnerHTML={{ __html: step.title }} />
                      <p className="text-white/60" dangerouslySetInnerHTML={{ __html: step.description }} />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-[#eca226] font-semibold hover:text-[#d4911f] transition-colors"
                >
                  Créer un compte maintenant <CaretRight weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <span className="text-[#eca226]">savoir sur ce service</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              Les réponses aux questions que nos clients nous posent le plus
              souvent
            </p>
          </div>

          <div className="space-y-4">
            {service.faq.map((item, index) => (
              <div 
                key={index}
                className="border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <h3 className="font-montserrat font-semibold text-lg text-white">
                    {item.question}
                  </h3>
                  <CaretDown
                    weight="bold"
                    className={`h-5 w-5 flex-shrink-0 ml-4 text-[#eca226] transition-transform duration-300 ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p 
                      className="text-white/60 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              </div>
            ))}
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
