"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  GasPump,
  Lightning,
  Engine,
  Tire,
  Warning,
  SignOut,
  User,
  CircleNotch,
  CheckCircle,
  ArrowRight,
  Clock,
  ShieldCheck,
  Smiley,
  MapPin,
  Drop,
  Fire,
  Wrench,
  XCircle,
} from "@phosphor-icons/react";
import { GeolocationPicker } from "@/components/ui/geolocation-picker";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

type Specs = Record<string, string | number | boolean>;

const SERVICES = [
  { id: "carburant", name: "Carburant",  tagline: "Livraison en 20 min",     icon: GasPump  },
  { id: "batterie",  name: "Batterie",   tagline: "Recharge & remplacement", icon: Lightning },
  { id: "huile",     name: "Huile",      tagline: "Vidange express",          icon: Engine   },
  { id: "pneus",     name: "Pneus",      tagline: "Gonflage & réparation",   icon: Tire     },
  { id: "urgence",   name: "Urgence",    tagline: "Intervention immédiate",  icon: Warning  },
];

/* ── Spec fields per service ──────────────────────────────────────────── */
type FieldType = "pills" | "toggle" | "number";
interface SpecField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string; icon?: React.ReactNode }[];
  dependsOn?: { key: string; value: string };   // show only when key === value
  min?: number; max?: number; unit?: string;
}

const SERVICE_SPECS: Record<string, SpecField[]> = {
  carburant: [
    {
      key: "fuelType", label: "Type de carburant", type: "pills", required: true,
      options: [
        { value: "diesel",  label: "Diesel",  icon: <Drop   weight="duotone" className="w-4 h-4" /> },
        { value: "essence", label: "Essence", icon: <Fire   weight="duotone" className="w-4 h-4" /> },
      ],
    },
    {
      key: "quantityType", label: "Quantité souhaitée", type: "pills", required: true,
      options: [
        { value: "plein",  label: "Faire le plein" },
        { value: "litres", label: "Nombre de litres" },
      ],
    },
    {
      key: "liters", label: "Combien de litres ?", type: "number",
      min: 1, max: 200, unit: "L",
      dependsOn: { key: "quantityType", value: "litres" },
    },
    {
      key: "empty", label: "Êtes-vous à sec ?", type: "toggle", required: true,
      options: [
        { value: "oui", label: "Oui, à sec" },
        { value: "non", label: "Non, il en reste" },
      ],
    },
  ],
  batterie: [
    {
      key: "problem", label: "Problème rencontré", type: "pills", required: true,
      options: [
        { value: "dechargee",  label: "Batterie déchargée" },
        { value: "hs",         label: "Batterie HS" },
        { value: "demarrage",  label: "Démarrage difficile" },
      ],
    },
    {
      key: "vehicleType", label: "Type de véhicule", type: "pills", required: true,
      options: [
        { value: "voiture", label: "Voiture" },
        { value: "moto",    label: "Moto" },
        { value: "camion",  label: "Camion" },
      ],
    },
    {
      key: "hasCables", label: "Avez-vous des câbles de démarrage ?", type: "toggle",
      options: [
        { value: "oui", label: "Oui" },
        { value: "non", label: "Non" },
      ],
    },
  ],
  huile: [
    {
      key: "oilType", label: "Type d'huile", type: "pills", required: true,
      options: [
        { value: "5w30",  label: "5W-30" },
        { value: "5w40",  label: "5W-40" },
        { value: "10w40", label: "10W-40" },
        { value: "autre", label: "Je ne sais pas" },
      ],
    },
    {
      key: "quantity", label: "Quantité estimée", type: "pills",
      options: [
        { value: "1l", label: "1 L" },
        { value: "2l", label: "2 L" },
        { value: "3l", label: "3 L" },
        { value: "5l", label: "5 L" },
      ],
    },
    {
      key: "fullChange", label: "Vidange complète souhaitée ?", type: "toggle",
      options: [
        { value: "oui", label: "Oui" },
        { value: "non", label: "Non, appoint seulement" },
      ],
    },
  ],
  pneus: [
    {
      key: "problem", label: "Problème constaté", type: "pills", required: true,
      options: [
        { value: "crevaison",    label: "Crevaison" },
        { value: "use",          label: "Pneu usé" },
        { value: "valve",        label: "Problème de valve" },
        { value: "equilibrage",  label: "Équilibrage" },
      ],
    },
    {
      key: "count", label: "Nombre de pneus concernés", type: "pills",
      options: [
        { value: "1", label: "1 pneu" },
        { value: "2", label: "2 pneus" },
        { value: "4", label: "4 pneus" },
      ],
    },
    {
      key: "hasJack", label: "Avez-vous un cric ?", type: "toggle",
      options: [
        { value: "oui", label: "Oui" },
        { value: "non", label: "Non" },
      ],
    },
  ],
  urgence: [
    {
      key: "urgencyType", label: "Nature de l'urgence", type: "pills", required: true,
      options: [
        { value: "panne",    label: "Panne moteur",    icon: <Wrench   weight="duotone" className="w-4 h-4" /> },
        { value: "accident", label: "Accident",        icon: <XCircle  weight="duotone" className="w-4 h-4" /> },
        { value: "autre",    label: "Autre urgence",   icon: <Warning  weight="duotone" className="w-4 h-4" /> },
      ],
    },
  ],
};

/* ── Build human-readable description from specs ─────────────────────── */
function buildDescription(serviceId: string, specs: Specs, notes: string): string {
  const lines: string[] = [];

  if (serviceId === "carburant") {
    if (specs.fuelType)     lines.push(`Carburant : ${specs.fuelType === "diesel" ? "Diesel" : "Essence"}`);
    if (specs.quantityType === "plein") lines.push("Quantité : Plein complet");
    if (specs.quantityType === "litres" && specs.liters) lines.push(`Quantité : ${specs.liters} L`);
    if (specs.empty)        lines.push(`À sec : ${specs.empty === "oui" ? "Oui" : "Non"}`);
  } else if (serviceId === "batterie") {
    const prob: Record<string, string> = { dechargee: "Batterie déchargée", hs: "Batterie HS", demarrage: "Démarrage difficile" };
    if (specs.problem)      lines.push(`Problème : ${prob[specs.problem as string] ?? specs.problem}`);
    if (specs.vehicleType)  lines.push(`Véhicule : ${specs.vehicleType}`);
    if (specs.hasCables)    lines.push(`Câbles dispo : ${specs.hasCables === "oui" ? "Oui" : "Non"}`);
  } else if (serviceId === "huile") {
    if (specs.oilType)      lines.push(`Huile : ${String(specs.oilType).toUpperCase()}`);
    if (specs.quantity)     lines.push(`Quantité : ${specs.quantity}`);
    if (specs.fullChange)   lines.push(`Vidange complète : ${specs.fullChange === "oui" ? "Oui" : "Non"}`);
  } else if (serviceId === "pneus") {
    const prob: Record<string, string> = { crevaison: "Crevaison", use: "Pneu usé", valve: "Valve", equilibrage: "Équilibrage" };
    if (specs.problem)      lines.push(`Problème : ${prob[specs.problem as string] ?? specs.problem}`);
    if (specs.count)        lines.push(`Pneus concernés : ${specs.count}`);
    if (specs.hasJack)      lines.push(`Cric disponible : ${specs.hasJack === "oui" ? "Oui" : "Non"}`);
  } else if (serviceId === "urgence") {
    const urg: Record<string, string> = { panne: "Panne moteur", accident: "Accident", autre: "Autre urgence" };
    if (specs.urgencyType)  lines.push(`Urgence : ${urg[specs.urgencyType as string] ?? specs.urgencyType}`);
  }

  if (notes.trim()) lines.push(`Notes : ${notes.trim()}`);
  return lines.join(" · ") || `Demande de service : ${serviceId}`;
}

/* ── Pill button ─────────────────────────────────────────────────────── */
function Pill({
  selected, urgent, onClick, children,
}: { selected: boolean; urgent?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-dashed text-sm font-medium transition-all duration-200 ${
        selected
          ? urgent
            ? "border-red-500/60 bg-red-500/10 text-white"
            : "border-[#eca226]/60 bg-[#eca226]/10 text-white"
          : "border-white/10 bg-white/3 text-white/45 hover:border-white/25 hover:text-white/70 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function ClientPortal() {
  const router = useRouter();
  const [location, setLocation]        = useState<Location | null>(null);
  const [selectedService, setSelected] = useState("carburant");
  const [specs, setSpecs]              = useState<Specs>({});
  const [notes, setNotes]              = useState("");
  const [isOrdering, setIsOrdering]    = useState(false);
  const [ordered, setOrdered]          = useState(false);
  const [userName, setUserName]        = useState("Client");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { if (d.name) setUserName(d.name); })
      .catch(() => {});
  }, []);

  // Reset specs when service changes
  useEffect(() => { setSpecs({}); }, [selectedService]);

  const setSpec = (key: string, value: string | number | boolean) =>
    setSpecs((prev) => ({ ...prev, [key]: value }));

  /* Required fields validation */
  const requiredFields = (SERVICE_SPECS[selectedService] ?? []).filter((f) => {
    if (!f.required) return false;
    if (f.dependsOn && specs[f.dependsOn.key] !== f.dependsOn.value) return false;
    return true;
  });
  const specsDone = requiredFields.every((f) => specs[f.key] !== undefined && specs[f.key] !== "");

  const handleOrder = async () => {
    if (!location)    { toast.error("Veuillez d'abord vous géolocaliser"); return; }
    if (!specsDone)   { toast.error("Veuillez remplir les spécifications obligatoires"); return; }
    setIsOrdering(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: selectedService,
          description: buildDescription(selectedService, specs, notes),
          location: location.address,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Erreur lors de la commande");
        return;
      }
      setOrdered(true);
    } catch {
      toast.error("Erreur de connexion au serveur");
    } finally {
      setIsOrdering(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const handleNewOrder = () => {
    setOrdered(false);
    setLocation(null);
    setNotes("");
    setSpecs({});
    setSelected("carburant");
  };

  const active     = SERVICES.find((s) => s.id === selectedService)!;
  const ActiveIcon = active.icon;
  const isUrgent   = selectedService === "urgence";

  const mapUrl = location
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.008},${location.latitude - 0.006},${location.longitude + 0.008},${location.latitude + 0.006}&layer=mapnik&marker=${location.latitude},${location.longitude}`
    : null;

  const canSubmit = location && !isOrdering && specsDone;

  return (
    <div className="min-h-screen bg-[#151514] text-white overflow-x-hidden">

      {/* Glow ambiance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(236,162,38,0.09) 0%, transparent 70%)" }} />
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(236,162,38,0.05) 0%, transparent 70%)" }} />
      </div>

      {/* ─── HEADER ─── */}
      <header className="relative z-20 px-6 py-4 flex items-center justify-between border-b border-white/[0.08] bg-[#151514]/80 backdrop-blur-xl">
        <Link href="/">
          <Image src="/navbar-logo.png" alt="Carbivio" width={110} height={36} className="object-contain" />
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/10">
            <User className="w-4 h-4 text-[#eca226]" weight="duotone" />
            <span className="text-sm text-white/70 hidden sm:block">{userName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full border-2 border-dashed border-[#ff8c00]/40 bg-white/4 hover:bg-white/10 hover:border-[#eca226]/60 transition-all duration-300"
          >
            <SignOut className="w-4 h-4 text-[#eca226]" weight="duotone" />
            <span className="text-sm text-white/60 group-hover:text-white transition-colors hidden sm:block">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* ─── BODY ─── */}
      {ordered ? (

        /* ══ CONFIRMATION ══ */
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-65px)] p-6">
          <div className="max-w-sm w-full text-center">
            <div className="relative flex items-center justify-center mb-10">
              <div className="absolute w-40 h-40 rounded-full border border-green-400/10 animate-ping" style={{ animationDuration: "2.5s" }} />
              <div className="absolute w-28 h-28 rounded-full border border-green-400/15 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
              <div className="w-20 h-20 rounded-2xl border border-dashed border-green-400/30 bg-white/4 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" weight="duotone" />
              </div>
            </div>
            <h2 className="font-montserrat font-black text-3xl text-white mb-3">C&apos;est parti !</h2>
            <p className="text-white/50 leading-relaxed mb-8">
              Votre demande a été enregistrée. Un technicien est en route vers votre position.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-[#ff8c00]/40 bg-white/4 mb-8 text-left">
              <div className="w-11 h-11 rounded-xl border border-dashed border-[#ff8c00]/50 bg-[#eca226]/10 flex items-center justify-center shrink-0">
                <ActiveIcon className="w-6 h-6 text-[#eca226]" weight="duotone" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white">{active.name}</p>
                <p className="text-white/40 text-sm truncate">{location?.address}</p>
              </div>
            </div>
            <button
              onClick={handleNewOrder}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#eca226] text-black font-bold font-montserrat hover:bg-[#d4911f] active:scale-[0.98] transition-all shadow-[0_0_40px_rgba(236,162,38,0.35)]"
            >
              Nouvelle commande <ArrowRight className="w-5 h-5" weight="bold" />
            </button>
          </div>
        </div>

      ) : (

        /* ══ FORMULAIRE ══ */
        <div className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-65px)]">

          {/* ── Formulaire ── */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-lg mx-auto px-5 sm:px-8 lg:px-10 py-10 space-y-8">

              {/* Titre mobile */}
              <div className="lg:hidden flex items-center gap-4">
                <Image src="/camion_voiture.png" alt="" width={80} height={60} className="object-contain" />
                <div>
                  <h1 className="font-montserrat font-black text-2xl text-white">Commander</h1>
                  <p className="text-white/40 text-sm">Intervention en 20 min</p>
                </div>
              </div>

              {/* ── Étape 1 : Service ── */}
              <section>
                <StepHeader n={1} label="Service souhaité" done={true} />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SERVICES.map((s) => {
                    const Icon = s.icon;
                    const isSel  = selectedService === s.id;
                    const isUrg  = s.id === "urgence";
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelected(s.id)}
                        className={`relative p-4 rounded-2xl border border-dashed text-left transition-all duration-300 ${
                          isSel
                            ? isUrg
                              ? "border-red-500/50 bg-red-500/8 scale-[1.02]"
                              : "border-[#eca226]/60 bg-[#eca226]/8 scale-[1.02]"
                            : "border-white/10 bg-white/3 hover:border-[#ff8c00]/40 hover:bg-white/[0.06]"
                        }`}
                      >
                        <Icon className={`w-6 h-6 mb-2.5 ${isSel ? (isUrg ? "text-red-400" : "text-[#eca226]") : "text-white/35"}`} weight="duotone" />
                        <p className={`font-bold text-sm ${isSel ? "text-white" : "text-white/55"}`}>{s.name}</p>
                        <p className={`text-xs mt-0.5 ${isSel ? (isUrg ? "text-red-400/55" : "text-[#eca226]/55") : "text-white/20"}`}>{s.tagline}</p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* ── Étape 2 : Spécifications ── */}
              <section>
                <StepHeader n={2} label="Spécifications" done={specsDone} />
                <div className="space-y-5">
                  {(SERVICE_SPECS[selectedService] ?? []).map((field) => {
                    // Conditional field
                    if (field.dependsOn && specs[field.dependsOn.key] !== field.dependsOn.value) return null;

                    return (
                      <div key={field.key}>
                        <p className="text-xs text-white/40 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          {field.label}
                          {field.required && <span className="text-[#eca226] text-[10px]">*</span>}
                        </p>

                        {/* Pills or Toggle */}
                        {(field.type === "pills" || field.type === "toggle") && (
                          <div className="flex flex-wrap gap-2">
                            {field.options?.map((opt) => (
                              <Pill
                                key={opt.value}
                                selected={specs[field.key] === opt.value}
                                urgent={isUrgent}
                                onClick={() => setSpec(field.key, opt.value)}
                              >
                                {opt.icon}
                                {opt.label}
                              </Pill>
                            ))}
                          </div>
                        )}

                        {/* Number input */}
                        {field.type === "number" && (
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min={field.min}
                              max={field.max}
                              value={(specs[field.key] as number) ?? ""}
                              onChange={(e) => setSpec(field.key, Number(e.target.value))}
                              placeholder={`Ex: 30`}
                              className="w-28 px-4 py-2.5 rounded-xl bg-white/4 border border-dashed border-white/15 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226]/50 text-sm numbers-idgrotesk"
                            />
                            {field.unit && <span className="text-white/40 text-sm">{field.unit}</span>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ── Étape 3 : Position + Carte ── */}
              <section>
                <StepHeader n={3} label="Votre position" done={!!location}>
                  {location && (
                    <span className="ml-auto flex items-center gap-1 text-xs text-green-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Localisé
                    </span>
                  )}
                </StepHeader>

                <div className="p-5 rounded-2xl border border-dashed border-white/10 bg-white/3 mb-3">
                  <GeolocationPicker onLocationSelect={setLocation} />
                </div>

                {mapUrl && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 relative">
                    <div className="absolute top-3 left-3 right-3 z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#151514]/90 backdrop-blur-sm border border-white/10">
                      <MapPin className="w-4 h-4 text-[#eca226] shrink-0" weight="duotone" />
                      <p className="text-white/70 text-xs truncate">{location?.address}</p>
                    </div>
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="260"
                      title="Votre position"
                      className="block w-full"
                      style={{ filter: "invert(92%) hue-rotate(180deg) saturate(0.6) brightness(0.88)", border: "none" }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#151514]/60 to-transparent pointer-events-none" />
                  </div>
                )}

                {!location && (
                  <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] h-[160px] flex flex-col items-center justify-center gap-2 text-white/20">
                    <MapPin className="w-8 h-8" weight="duotone" />
                    <p className="text-sm">La carte apparaîtra ici après localisation</p>
                  </div>
                )}
              </section>

              {/* ── Étape 4 : Notes ── */}
              <section>
                <StepHeader n={4} label="Notes complémentaires" optional />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Marque et modèle du véhicule, informations supplémentaires..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/3 border border-dashed border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#eca226]/50 focus:bg-white/[0.05] transition-all resize-none text-sm leading-relaxed"
                />
              </section>

              {/* ── CTA ── */}
              <button
                onClick={handleOrder}
                disabled={!canSubmit}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold font-montserrat text-base transition-all duration-300 ${
                  canSubmit
                    ? isUrgent
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-[0_0_40px_rgba(239,68,68,0.30)] active:scale-[0.98]"
                      : "bg-[#eca226] text-black hover:bg-[#d4911f] shadow-[0_0_40px_rgba(236,162,38,0.30)] hover:shadow-[0_0_55px_rgba(236,162,38,0.45)] active:scale-[0.98]"
                    : "bg-white/4 text-white/20 cursor-not-allowed border border-dashed border-white/10"
                }`}
              >
                {isOrdering ? (
                  <><CircleNotch className="w-5 h-5 animate-spin" weight="bold" /> Envoi en cours...</>
                ) : !location ? (
                  "Géolocalisez-vous pour commander"
                ) : !specsDone ? (
                  "Complétez les spécifications *"
                ) : (
                  <>Confirmer la commande <ArrowRight className="w-5 h-5" weight="bold" /></>
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Step header helper ────────────────────────────────────────────────── */
function StepHeader({
  n, label, done, optional, children,
}: {
  n: number;
  label: string;
  done?: boolean;
  optional?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-all duration-300 ${
        done ? "bg-[#eca226] text-black" : "border border-dashed border-white/20 text-white/40"
      }`}>{n}</span>
      <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest">
        {label}
        {optional && <span className="text-white/20 font-normal normal-case tracking-normal ml-1">(optionnel)</span>}
      </h2>
      {children}
    </div>
  );
}
