"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Facebook, Instagram, Phone } from "lucide-react";
import { Footer } from "@/components/ui/modem-animated-footer";
import { BackgroundPlus } from "@/components/ui/background-plus";
import {
  Phone as PhonePhosphor,
  Envelope as EnvelopePhosphor,
  MapPin as MapPinPhosphor,
  Clock as ClockPhosphor,
  PaperPlaneRight as PaperPlaneRightPhosphor,
} from "@phosphor-icons/react";
import { CarbivioNavbar } from "@/components/navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Message envoyé avec succès !");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <CarbivioNavbar />

      {/* Header */}
      <div className="relative overflow-hidden">
        <BackgroundPlus
          plusColor="#eca226"
          backgroundColor="transparent"
          plusSize={80}
          fade={true}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-16 lg:pt-44 lg:pb-24">
          <div className="text-center">
            <h1 className="font-special-gothic text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Contactez
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eca226] to-[#d4911f]">
                Carbivio
              </span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Une question ? Une urgence ? Notre équipe est à votre disposition{" "}
              <span className="numbers-idgrotesk">24/7</span> pour vous
              assister.
            </p>
          </div>
        </div>
      </div>

      {/* Separator Line */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[#eca226] to-transparent opacity-50"></div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info - LEFT */}
          <div className="space-y-8">
            <div>
              <h2 className="font-montserrat font-bold text-3xl text-white mb-6">
                Restons en contact
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Que ce soit pour une urgence, une demande d'information ou pour
                planifier un service, nous sommes là pour vous. Plusieurs façons
                de nous joindre selon vos besoins.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="relative border border-dashed rounded-lg p-6 min-h-[200px] flex flex-col justify-between transition-all duration-500 bg-white/5 backdrop-blur-sm border-white/20 hover:border-[#eca226]/30 hover:bg-white/10">
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
                  ></path>
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
                  ></path>
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
                  ></path>
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
                  ></path>
                </svg>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-[#eca226]/30 flex items-center justify-center flex-shrink-0">
                      <PhonePhosphor
                        className="w-6 h-6 text-[#eca226]"
                        weight="duotone"
                      />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-xl text-white mb-2 group-hover:text-[#eca226] transition-colors duration-500">
                        Urgence <span className="numbers-idgrotesk">24/7</span>
                      </h3>
                      <p className="text-white/60 mb-2 leading-relaxed">
                        Intervention immédiate en cas de panne
                      </p>
                      <a
                        href="tel:0800CARBIVIO"
                        className="text-[#eca226] font-semibold hover:underline"
                      >
                        0800 CARBIVIO
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative border border-dashed rounded-lg p-6 min-h-[200px] flex flex-col justify-between transition-all duration-500 bg-white/5 backdrop-blur-sm border-white/20 hover:border-[#eca226]/30 hover:bg-white/10">
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
                  ></path>
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
                  ></path>
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
                  ></path>
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
                  ></path>
                </svg>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-[#eca226]/30 flex items-center justify-center flex-shrink-0">
                      <EnvelopePhosphor
                        className="w-6 h-6 text-[#eca226]"
                        weight="duotone"
                      />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-xl text-white mb-2 group-hover:text-[#eca226] transition-colors duration-500">
                        Email
                      </h3>
                      <p className="text-white/60 mb-2 leading-relaxed">
                        Pour toutes vos questions et demandes
                      </p>
                      <a
                        href="mailto:contact@carbivio.com"
                        className="text-[#eca226] font-semibold hover:underline"
                      >
                        contact@carbivio.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative border border-dashed rounded-lg p-6 min-h-[200px] flex flex-col justify-between transition-all duration-500 bg-white/5 backdrop-blur-sm border-white/20 hover:border-[#eca226]/30 hover:bg-white/10">
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
                  ></path>
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
                  ></path>
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
                  ></path>
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
                  ></path>
                </svg>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-[#eca226]/30 flex items-center justify-center flex-shrink-0">
                      <ClockPhosphor
                        className="w-6 h-6 text-[#eca226]"
                        weight="duotone"
                      />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-xl text-white mb-2 group-hover:text-[#eca226] transition-colors duration-500">
                        Horaires
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        Service d'urgence :{" "}
                        <span className="numbers-idgrotesk">24h/24</span>,{" "}
                        <span className="numbers-idgrotesk">7j/7</span>
                        <br />
                        Service client : Lun-Dim{" "}
                        <span className="numbers-idgrotesk">8h-20h</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative border border-dashed rounded-lg p-6 min-h-[200px] flex flex-col justify-between transition-all duration-500 bg-white/5 backdrop-blur-sm border-white/20 hover:border-[#eca226]/30 hover:bg-white/10">
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
                  ></path>
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
                  ></path>
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
                  ></path>
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
                  ></path>
                </svg>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border-2 border-dashed border-[#eca226]/30 flex items-center justify-center flex-shrink-0">
                      <MapPinPhosphor
                        className="w-6 h-6 text-[#eca226]"
                        weight="duotone"
                      />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-xl text-white mb-2 group-hover:text-[#eca226] transition-colors duration-500">
                        Zone d'intervention
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        Toute la ville et périphérie
                        <br />
                        Rayon de <span className="numbers-idgrotesk">50km</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - RIGHT */}
          <div className="relative border border-dashed rounded-lg p-8 lg:p-10 min-h-[600px] flex flex-col justify-between transition-all duration-500 bg-white/5 backdrop-blur-sm border-white/20 hover:border-[#eca226]/30 hover:bg-white/10">
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
              ></path>
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
              ></path>
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
              ></path>
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
              ></path>
            </svg>
            <div className="relative z-10 space-y-6">
              <h2 className="font-montserrat font-bold text-3xl text-white mb-6 group-hover:text-[#eca226] transition-colors duration-500">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#eca226] focus:bg-white/15 transition-all numbers-idgrotesk"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#eca226] focus:bg-white/15 transition-all numbers-idgrotesk"
                      placeholder="jean@exemple.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#eca226] focus:bg-white/15 transition-all numbers-idgrotesk"
                      placeholder="77 123 45 67"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Service *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-[#eca226] focus:bg-white/15 transition-all numbers-idgrotesk"
                    >
                      <option value="" className="bg-black">
                        Choisissez un service
                      </option>
                      <option value="urgence" className="bg-black">
                        Urgence / Dépannage
                      </option>
                      <option value="carburant" className="bg-black">
                        Livraison de carburant
                      </option>
                      <option value="entretien" className="bg-black">
                        Entretien / Révision
                      </option>
                      <option value="devis" className="bg-black">
                        Demande de devis
                      </option>
                      <option value="autre" className="bg-black">
                        Autre
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#eca226] focus:bg-white/15 transition-all resize-none"
                    placeholder="Décrivez votre besoin..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#eca226] text-black font-bold text-lg hover:bg-[#d4911f] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_50px_rgba(236,162,38,0.35)] hover:shadow-[0_0_70px_rgba(236,162,38,0.5)]"
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer le message
                      <PaperPlaneRightPhosphor
                        className="h-5 w-5"
                        weight="duotone"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-white/40 text-sm">
                  Ou appelez-nous directement pour une urgence :{" "}
                  <a
                    href="tel:0800CARBIVIO"
                    className="text-[#eca226] font-semibold hover:underline"
                  >
                    0800 CARBIVIO
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FOOTER ANIMÉ ─── */}
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
