"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LockKey, CheckCircle, Warning } from "@phosphor-icons/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) setError("Lien invalide. Faites une nouvelle demande de réinitialisation.");
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      } else {
        setError(data.error ?? "Une erreur est survenue");
      }
    } catch {
      setError("Impossible de contacter le serveur");
    } finally {
      setIsLoading(false);
    }
  };

  const strength = password.length === 0 ? 0
    : password.length < 8 ? 1
    : password.length < 12 ? 2
    : 3;

  const strengthConfig = [
    { label: "", color: "bg-white/10" },
    { label: "Faible", color: "bg-red-500" },
    { label: "Moyen", color: "bg-yellow-500" },
    { label: "Fort", color: "bg-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-[#151514] flex items-center justify-center p-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#eca226]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-10 group"
        >
          <ArrowLeft weight="bold" className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Retour à la connexion
        </Link>

        <div className="bg-[#1a1a18] border border-white/8 rounded-2xl p-8">
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-6">
                <CheckCircle weight="duotone" className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="font-montserrat font-bold text-xl text-white mb-3">
                Mot de passe mis à jour !
              </h2>
              <p className="text-white/40 text-sm mb-2">
                Votre mot de passe a été réinitialisé avec succès.
              </p>
              <p className="text-white/30 text-xs">
                Redirection vers la connexion dans quelques secondes…
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#eca226]/15 flex items-center justify-center mb-5">
                  <LockKey weight="duotone" className="w-6 h-6 text-[#eca226]" />
                </div>
                <h1 className="font-montserrat font-extrabold text-2xl text-white mb-2">
                  Nouveau mot de passe
                </h1>
                <p className="text-white/40 text-sm">
                  Choisissez un mot de passe sécurisé d'au moins 8 caractères.
                </p>
              </div>

              {error && (
                <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
                  <Warning weight="duotone" className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {token && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nouveau mot de passe */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Nouveau mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Minimum 8 caractères"
                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226] focus:bg-white/[0.07] transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Indicateur de force */}
                    {password.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                i <= strength ? strengthConfig[strength].color : "bg-white/10"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-white/30">
                          Force : <span className={`font-medium ${strength === 1 ? "text-red-400" : strength === 2 ? "text-yellow-400" : "text-emerald-400"}`}>
                            {strengthConfig[strength].label}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirmation */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                      placeholder="Répétez le mot de passe"
                      className={`w-full px-5 py-4 rounded-2xl bg-white/5 border text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.07] transition-all ${
                        confirm && confirm !== password
                          ? "border-red-500/50 focus:border-red-500"
                          : confirm && confirm === password
                          ? "border-emerald-500/50 focus:border-emerald-500"
                          : "border-white/10 focus:border-[#eca226]"
                      }`}
                    />
                    {confirm && confirm !== password && (
                      <p className="text-red-400 text-xs mt-1">Les mots de passe ne correspondent pas</p>
                    )}
                    {confirm && confirm === password && (
                      <p className="text-emerald-400 text-xs mt-1">Les mots de passe correspondent</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !token}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#eca226] text-black font-bold hover:bg-[#d4911f] transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(236,162,38,0.3)] mt-2"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Réinitialiser le mot de passe"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#151514] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#eca226] animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
