"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, EnvelopeSimple, CheckCircle } from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error ?? "Une erreur est survenue");
      }
    } catch {
      setError("Impossible de contacter le serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#151514] flex items-center justify-center p-6">
      {/* Halo décoratif */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#eca226]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative">
        {/* Retour */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-10 group"
        >
          <ArrowLeft weight="bold" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Retour à la connexion
        </Link>

        <div className="bg-[#1a1a18] border border-white/8 rounded-2xl p-8">
          {!sent ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#eca226]/15 flex items-center justify-center mb-5">
                  <EnvelopeSimple weight="duotone" className="w-6 h-6 text-[#eca226]" />
                </div>
                <h1 className="font-montserrat font-extrabold text-2xl text-white mb-2">
                  Mot de passe oublié ?
                </h1>
                <p className="text-white/40 text-sm leading-relaxed">
                  Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              {/* Erreur */}
              {error && (
                <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="vous@exemple.com"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226] focus:bg-white/[0.07] transition-all numbers-idgrotesk"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#eca226] text-black font-bold hover:bg-[#d4911f] transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(236,162,38,0.3)]"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Envoyer le lien de réinitialisation"
                  )}
                </button>
              </form>
            </>
          ) : (
            /* État succès */
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
                <CheckCircle weight="duotone" className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="font-montserrat font-bold text-xl text-white mb-3">
                Email envoyé !
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-2">
                Si un compte existe avec <span className="text-white/70">{email}</span>, vous recevrez un email avec le lien de réinitialisation.
              </p>
              <p className="text-white/30 text-xs mb-8">
                Le lien expire dans 1 heure. Vérifiez aussi vos spams.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[#eca226] hover:text-[#d4911f] transition-colors text-sm font-medium"
              >
                <ArrowLeft weight="bold" className="w-4 h-4" />
                Retour à la connexion
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
