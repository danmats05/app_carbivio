"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import NumberText from "@/components/ui/number-text";
import { GeolocationPicker } from "@/components/ui/geolocation-picker";
import { MapDisplay } from "@/components/ui/map-display";

const serviceTypes = [
  "Livraison de carburant",
  "Lavage de voiture",
  "Vidange d'huile",
  "Service pneus",
  "Remplacement de batterie",
  "Service d'urgence",
  "Autre",
];

export default function CreateRequestPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    description: "",
    location: "",
    coordinates: null as { latitude: number; longitude: number } | null,
  });

  const handleLocationSelect = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setForm((prev) => ({
      ...prev,
      location: location.address,
      coordinates: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Échec de la création");
        return;
      }
      toast.success(
        "Demande validée automatiquement ! Un technicien sera bientôt assigné.",
      );
      router.push("/dashboard");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-2xl">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-white/30 hover:text-white text-sm mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />{" "}
        <span className="font-heuvel">Retour au tableau de bord</span>
      </Link>

      <div className="mb-8 lg:mb-10">
        <p className="text-white/30 text-xs font-medium uppercase tracking-widest mb-2 font-heuvel">
          Nouveau
        </p>
        <h1 className="font-montserrat font-extrabold text-3xl lg:text-4xl text-white font-heuvel">
          Demande de service
        </h1>
        <p className="text-white/40 mt-2 text-sm font-heuvel">
          Remplissez les informations ci-dessous. Validation instantanée
          garantie !
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type de service */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-3 font-heuvel">
            Type de service
          </label>
          <div className="grid grid-cols-2 gap-2">
            {serviceTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm({ ...form, serviceType: type })}
                className={`px-3 py-3 rounded-2xl text-sm font-medium transition-all duration-200 text-left font-heuvel ${
                  form.serviceType === type
                    ? "bg-[#eca226] text-black shadow-[0_0_20px_rgba(236,162,38,0.3)]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Localisation */}
        <GeolocationPicker
          onLocationSelect={handleLocationSelect}
          initialLocation={
            form.coordinates
              ? {
                  latitude: form.coordinates.latitude,
                  longitude: form.coordinates.longitude,
                  address: form.location,
                }
              : undefined
          }
        />

        {/* Carte de localisation */}
        {form.coordinates && (
          <div className="mt-6">
            <MapDisplay
              location={{
                latitude: form.coordinates.latitude,
                longitude: form.coordinates.longitude,
                address: form.location,
              }}
            />
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white/60 mb-2 font-heuvel">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={4}
            placeholder="Décrivez votre besoin en détail..."
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226] focus:bg-white/[0.07] transition-all resize-none numbers-idgrotesk"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !form.serviceType}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-[#eca226] text-black font-bold text-base hover:bg-[#d4911f] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 shadow-[0_0_30px_rgba(236,162,38,0.35)]"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span className="font-heuvel">
                Envoyer la demande <ArrowRight className="h-5 w-5" />{" "}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
