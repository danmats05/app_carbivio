"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { ArrowLeft as ArrowLeftPhosphor } from "@phosphor-icons/react";
import NumberText from "@/components/ui/number-text";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.code === "EMAIL_EXISTS") {
          toast.error(data.error);
        } else {
          toast.error(data.error || "Inscription échouée");
        }
        return;
      }
      toast.success("Compte créé ! Bienvenue sur Carbivio !");
      router.push("/admin");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#151514] flex">
      {/* Panneau décoratif */}
      <div className="w-1/2 relative overflow-hidden lg:flex hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#eca226]/20 via-transparent to-transparent" />
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-[#eca226]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-100 h-100 rounded-full bg-[#eca226]/5 blur-[80px]" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <button
            onClick={() => router.push("/")}
            className="w-fit group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#eca226]/50 transition-all duration-300"
          >
            <ArrowLeftPhosphor
              className="w-5 h-5 text-[#eca226] group-hover:text-[#d4911f] transition-colors duration-300"
              weight="duotone"
            />
            <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-300">
              Retour
            </span>
          </button>

          <div>
            <h1 className="font-montserrat font-extrabold text-5xl text-white leading-tight mb-6">
              Rejoignez Carbivio
              <br />
              <span className="text-[#eca226]">aujourd'hui</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              Créez votre compte et accédez à des services de qualité.
            </p>
          </div>

          {/* Témoignage */}
          <div className="flex flex-col rounded-lg border-t bg-gradient-to-b from-muted/50 to-muted/10 p-4 text-start sm:p-6 hover:from-muted/60 hover:to-muted/20 max-w-[360px] sm:max-w-[360px] transition-colors duration-300">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-40 shrink-0 overflow-hidden">
                <img
                  alt="Marie Dubois"
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="object-cover"
                  style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: "transparent",
                  }}
                  sizes="160px"
                  src="/car__Honda_Civic.png"
                />
              </div>
              <div>
                <p className="font-semibold text-white">Marie Dubois</p>
                <p className="text-sm text-white/60">Directrice Marketing</p>
              </div>
            </div>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              Service exceptionnel ! J'avais une panne sur l'autoroute et
              Carbivio est intervenu en moins de 20 minutes. Le technicien était
              professionnel et a résolu le problème rapidement.
            </p>
          </div>
        </div>
      </div>

      {/* Panneau formulaire */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-12 lg:hidden">
            <button
              onClick={() => router.push("/")}
              className="w-fit group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#eca226]/50 transition-all duration-300 mb-8"
            >
              <ArrowLeftPhosphor
                className="w-5 h-5 text-[#eca226] group-hover:text-[#d4911f] transition-colors duration-300"
                weight="duotone"
              />
              <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-300">
                Retour
              </span>
            </button>
          </div>

          <div className="mb-10">
            <h2 className="font-montserrat font-extrabold text-4xl text-white mb-3">
              Créer un compte
            </h2>
            <p className="text-white/40 mb-8">
              Rejoignez-nous pour accéder à nos services premium.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder="Jean Dupont"
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226] focus:bg-white/[0.07] transition-all numbers-idgrotesk"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Adresse e-mail
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="vous@exemple.com"
                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226] focus:bg-white/[0.07] transition-all numbers-idgrotesk"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  minLength={6}
                  placeholder="Au moins 6 caractères"
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226] focus:bg-white/[0.07] transition-all pr-12 font-idgrotesk"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#eca226] text-black font-bold text-base hover:bg-[#d4911f] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 shadow-[0_0_30px_rgba(236,162,38,0.4)] mt-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Créer mon compte <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/40 text-sm">
              Déjà un compte ?{" "}
              <Link
                href="/login"
                className="text-[#eca226] hover:text-[#d4911f] transition-colors font-medium"
              >
                Connectez-vous
              </Link>
            </p>
            <p className="text-white/20 text-xs mt-2">
              Ou{" "}
              <Link
                href="/forgot-password"
                className="text-[#eca226]/80 hover:text-[#eca226] transition-colors underline"
              >
                mot de passe oublié ?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
