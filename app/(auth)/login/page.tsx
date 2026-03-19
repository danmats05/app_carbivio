"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus } from "lucide-react";
import { ArrowLeft as ArrowLeftPhosphor } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import NumberText from "@/components/ui/number-text";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Connexion échouée");
        return;
      }

      // Rediriger selon le rôle
      if (data.user.role === "ADMIN") {
        toast.success("Connexion administrateur réussie !");
        router.push("/admin");
      } else {
        toast.success("Connexion réussie !");
        router.push("/dashboard");
      }
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#151514] flex">
      {/* Panneau décoratif gauche */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#eca226]/20 via-transparent to-transparent" />
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-[#eca226]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-100 h-100 rounded-full bg-[#eca226]/5 blur-[80px]" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link
            href="/"
            className="w-fit group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#eca226]/50 transition-all duration-300"
          >
            <ArrowLeftPhosphor
              className="w-5 h-5 text-[#eca226] group-hover:text-[#d4911f] transition-colors duration-300"
              weight="duotone"
            />
            <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-300">
              Accueil
            </span>
          </Link>
          <div>
            <h1 className="font-montserrat font-extrabold text-5xl text-white leading-tight mb-6">
              Le carburant livré
              <br />
              <span className="text-[#eca226]">à votre porte.</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-md">
              Gérez vos demandes de service, suivez vos livraisons et contrôlez
              tout depuis votre tableau de bord.
            </p>
          </div>
        </div>
      </div>

      {/* Panneau formulaire */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="lg:hidden w-fit group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-[#ff8c00]/50 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#eca226]/50 transition-all duration-300 mb-8"
          >
            <ArrowLeftPhosphor
              className="w-5 h-5 text-[#eca226] group-hover:text-[#d4911f] transition-colors duration-300"
              weight="duotone"
            />
            <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-300">
              Accueil
            </span>
          </Link>

          <div className="mb-10">
            <h2 className="font-montserrat font-extrabold text-4xl text-white mb-3">
              Bon retour
            </h2>
            <p className="text-white/40">
              Connectez-vous à votre compte pour continuer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="••••••••"
                  className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226] focus:bg-white/[0.07] transition-all pr-12 numbers-idgrotesk"
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
                  Se connecter <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-white/40 text-sm">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="text-[#eca226] font-medium hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
