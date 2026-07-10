"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Bell,
  BellRinging,
  MapPin,
  User,
  EnvelopeSimple,
  FireSimple,
  Lightning,
  Drop,
  Tire,
  Siren,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  SignOut,
  CaretRight,
  Spinner,
} from "@phosphor-icons/react";
import Image from "next/image";
import { toast } from "sonner";

// Import dynamique pour éviter erreur SSR avec Leaflet
const DriverMap = dynamic(
  () => import("@/components/driver/driver-map").then((m) => m.DriverMap),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div className="w-full h-[360px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
      <Spinner weight="duotone" className="w-8 h-8 text-[#eca226] animate-spin" />
    </div>
  );
}

interface Assignment {
  requestId: string;
  driverId: string;
  clientName: string;
  clientEmail: string;
  serviceType: string;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  status?: "PENDING" | "APPROVED" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
}

interface DriverOrder {
  id: string;
  serviceType: string;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  status: "PENDING" | "APPROVED" | "IN_PROGRESS" | "COMPLETED" | "REJECTED";
  createdAt: string;
  user: { name: string; email: string };
}

const SERVICE_LABELS: Record<string, string> = {
  carburant: "Carburant",
  batterie: "Batterie",
  huile: "Huile moteur",
  pneus: "Pneus",
  urgence: "Urgence",
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  carburant: <FireSimple weight="duotone" className="w-5 h-5" />,
  batterie: <Lightning weight="duotone" className="w-5 h-5" />,
  huile: <Drop weight="duotone" className="w-5 h-5" />,
  pneus: <Tire weight="duotone" className="w-5 h-5" />,
  urgence: <Siren weight="duotone" className="w-5 h-5" />,
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: { label: "En attente", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: <Clock weight="duotone" className="w-3.5 h-3.5" /> },
  APPROVED: { label: "Assignée", color: "text-[#eca226] bg-[#eca226]/10 border-[#eca226]/20", icon: <Truck weight="duotone" className="w-3.5 h-3.5" /> },
  IN_PROGRESS: { label: "En route", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: <Spinner weight="duotone" className="w-3.5 h-3.5 animate-spin" /> },
  COMPLETED: { label: "Terminée", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: <CheckCircle weight="duotone" className="w-3.5 h-3.5" /> },
  REJECTED: { label: "Annulée", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: <XCircle weight="duotone" className="w-3.5 h-3.5" /> },
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

export default function DriverPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [orders, setOrders] = useState<DriverOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Assignment | DriverOrder | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifs, setShowNotifs] = useState(false);
  const [driverName, setDriverName] = useState("Chauffeur");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Charger les commandes assignées existantes
  const loadOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/driver/orders");
      if (res.ok) {
        const data: DriverOrder[] = await res.json();
        setOrders(data);
        // Convertir en assignments pour l'affichage unifié
        const converted: Assignment[] = data.map((o) => ({
          requestId: o.id,
          driverId: "",
          clientName: o.user.name,
          clientEmail: o.user.email,
          serviceType: o.serviceType,
          description: o.description,
          location: o.location,
          latitude: o.latitude,
          longitude: o.longitude,
          createdAt: o.createdAt,
          status: o.status,
        }));
        setAssignments(converted);
      }
    } catch {
      // silencieux
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer le nom du chauffeur
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => { if (d?.name) setDriverName(d.name); })
      .catch(() => {});
    loadOrders();
  }, [loadOrders]);

  // SSE — nouvelles assignments en temps réel
  useEffect(() => {
    const es = new EventSource("/api/driver/notifications/stream");

    es.addEventListener("connected", () => {
      console.log("[Driver SSE] Connecté");
    });

    es.addEventListener("driver_assignment", (e) => {
      const notif: Assignment = JSON.parse(e.data);
      setAssignments((prev) => {
        const exists = prev.find((a) => a.requestId === notif.requestId);
        if (exists) return prev;
        return [{ ...notif, status: "APPROVED" }, ...prev];
      });
      setUnreadCount((n) => n + 1);
      toast(`🚚 Nouvelle mission — ${SERVICE_LABELS[notif.serviceType] ?? notif.serviceType}`, {
        description: `Client : ${notif.clientName} · ${notif.location}`,
        duration: 6000,
      });
    });

    es.onerror = () => es.close();

    return () => es.close();
  }, []);

  const updateOrderStatus = async (requestId: string, newStatus: "IN_PROGRESS" | "COMPLETED") => {
    setActionLoading(requestId);
    try {
      const res = await fetch(`/api/driver/orders/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setAssignments((prev) =>
          prev.map((a) => a.requestId === requestId ? { ...a, status: newStatus } : a)
        );
        if ((selectedOrder as Assignment)?.requestId === requestId) {
          setSelectedOrder((prev) => prev ? { ...prev as Assignment, status: newStatus } : null);
        }
        const label = newStatus === "IN_PROGRESS" ? "Mission démarrée !" : "Mission terminée !";
        toast(label, { description: newStatus === "IN_PROGRESS" ? "L'administrateur a été notifié." : "Bravo, livraison effectuée !" });
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const openNotifs = () => {
    setShowNotifs((v) => !v);
    setUnreadCount(0);
  };

  // L'ordre sélectionné pour la carte
  const activeForMap = selectedOrder ?? (assignments[0] ?? null);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151514] flex items-center justify-center">
        <Spinner weight="duotone" className="w-10 h-10 text-[#eca226] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#151514] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#151514]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-5 h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/navbar-logo.png"
              alt="Carbivio"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
            <span className="text-[10px] text-[#eca226] bg-[#eca226]/10 border border-[#eca226]/20 px-2 py-0.5 rounded-full">
              Chauffeur
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Cloche notifications */}
            <div className="relative">
              <button
                onClick={openNotifs}
                className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                {unreadCount > 0 ? (
                  <BellRinging weight="duotone" className="w-5 h-5 text-[#eca226]" />
                ) : (
                  <Bell weight="duotone" className="w-5 h-5 text-white/60" />
                )}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#eca226] text-[#151514] text-[10px] font-bold flex items-center justify-center numbers-idgrotesk">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown notifications */}
              {showNotifs && (
                <div className="absolute right-0 top-12 w-80 bg-[#1a1a18] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Missions reçues</span>
                    <span className="text-xs text-white/40 numbers-idgrotesk">{assignments.length}</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                    {assignments.length === 0 ? (
                      <p className="py-8 text-center text-white/30 text-sm">Aucune mission pour l'instant</p>
                    ) : (
                      assignments.map((a) => (
                        <button
                          key={a.requestId}
                          onClick={() => { setSelectedOrder(a); setShowNotifs(false); }}
                          className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#eca226]">{SERVICE_ICONS[a.serviceType]}</span>
                            <span className="text-sm font-medium text-white">{SERVICE_LABELS[a.serviceType]}</span>
                            <span className="ml-auto text-[10px] text-white/30 numbers-idgrotesk">{formatTime(a.createdAt)}</span>
                          </div>
                          <p className="text-xs text-white/50 truncate">{a.clientName} · {a.location}</p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Nom + déconnexion */}
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#eca226]/15 flex items-center justify-center">
                <User weight="duotone" className="w-4 h-4 text-[#eca226]" />
              </div>
              <span className="text-sm text-white/80 hidden sm:block">{driverName}</span>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/70 transition-all ml-1"
              >
                <SignOut weight="duotone" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-8 space-y-8">

        {/* État vide */}
        {assignments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Truck weight="duotone" className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/40 text-sm">En attente d'une mission de l'administrateur…</p>
            <div className="flex items-center gap-2 text-xs text-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Connecté et disponible
            </div>
          </div>
        )}

        {assignments.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Liste des missions */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="text-xs uppercase tracking-wider text-white/40 font-medium">
                Missions assignées
                <span className="ml-2 text-[#eca226] numbers-idgrotesk">{assignments.length}</span>
              </h2>

              {assignments.map((a) => {
                const isSelected = (selectedOrder as Assignment)?.requestId === a.requestId
                  || (!selectedOrder && assignments[0]?.requestId === a.requestId);
                const st = STATUS_CONFIG[a.status ?? "APPROVED"];

                return (
                  <button
                    key={a.requestId}
                    onClick={() => setSelectedOrder(a)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-[#eca226]/8 border-[#eca226]/30"
                        : "bg-white/3 border-white/8 hover:bg-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${isSelected ? "bg-[#eca226]/15" : "bg-white/5"}`}>
                          <span className={isSelected ? "text-[#eca226]" : "text-white/50"}>
                            {SERVICE_ICONS[a.serviceType]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {SERVICE_LABELS[a.serviceType] ?? a.serviceType}
                          </p>
                          <p className="text-xs text-white/40 mt-0.5">{a.clientName}</p>
                        </div>
                      </div>
                      <CaretRight weight="bold" className={`w-4 h-4 mt-1 shrink-0 ${isSelected ? "text-[#eca226]" : "text-white/20"}`} />
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${st.color}`}>
                        {st.icon}
                        {st.label}
                      </span>
                      <span className="text-[10px] text-white/30 numbers-idgrotesk">
                        {formatDate(a.createdAt)} {formatTime(a.createdAt)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Détail + carte */}
            <div className="lg:col-span-2 space-y-5">
              {activeForMap && (
                <>
                  {/* Fiche client */}
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-5 space-y-4">
                    <h2 className="text-xs uppercase tracking-wider text-white/40 font-medium">Détail de la mission</h2>

                    {/* Infos client */}
                    <div className="flex items-center gap-3 p-3 bg-[#eca226]/5 border border-[#eca226]/15 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#eca226]/15 flex items-center justify-center shrink-0">
                        <User weight="duotone" className="w-5 h-5 text-[#eca226]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{(activeForMap as Assignment).clientName}</p>
                        <div className="flex items-center gap-1.5 text-white/40 text-xs mt-0.5">
                          <EnvelopeSimple weight="duotone" className="w-3.5 h-3.5" />
                          {(activeForMap as Assignment).clientEmail}
                        </div>
                      </div>
                    </div>

                    {/* Service + description */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/3 border border-white/8 rounded-xl p-3">
                        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5">Service</p>
                        <div className="flex items-center gap-2 text-white font-medium text-sm">
                          <span className="text-[#eca226]">{SERVICE_ICONS[(activeForMap as Assignment).serviceType]}</span>
                          {SERVICE_LABELS[(activeForMap as Assignment).serviceType]}
                        </div>
                      </div>
                      <div className="bg-white/3 border border-white/8 rounded-xl p-3">
                        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5">Statut</p>
                        {(() => {
                          const st = STATUS_CONFIG[(activeForMap as Assignment).status ?? "APPROVED"];
                          return (
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${st.color}`}>
                              {st.icon} {st.label}
                            </span>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Localisation */}
                    <div className="flex items-start gap-2.5 p-3 bg-white/3 border border-white/8 rounded-xl">
                      <MapPin weight="duotone" className="w-4 h-4 text-[#eca226] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Localisation client</p>
                        <p className="text-white/80 text-sm">{(activeForMap as Assignment).location}</p>
                        {(activeForMap as Assignment).latitude && (
                          <p className="text-white/30 text-xs mt-0.5 numbers-idgrotesk">
                            {(activeForMap as Assignment).latitude?.toFixed(5)}, {(activeForMap as Assignment).longitude?.toFixed(5)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {(activeForMap as Assignment).description && (
                      <div className="p-3 bg-white/3 border border-white/8 rounded-xl">
                        <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1.5">Notes</p>
                        <p className="text-white/70 text-sm leading-relaxed">{(activeForMap as Assignment).description}</p>
                      </div>
                    )}

                    {/* Boutons d'action */}
                    {(activeForMap as Assignment).status === "APPROVED" && (
                      <button
                        onClick={() => updateOrderStatus((activeForMap as Assignment).requestId, "IN_PROGRESS")}
                        disabled={actionLoading === (activeForMap as Assignment).requestId}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#eca226] text-[#151514] font-bold text-sm hover:bg-[#d4911f] transition-all disabled:opacity-50 shadow-[0_0_24px_rgba(236,162,38,0.3)]"
                      >
                        {actionLoading === (activeForMap as Assignment).requestId ? (
                          <Spinner weight="duotone" className="w-4 h-4 animate-spin" />
                        ) : (
                          <Truck weight="duotone" className="w-4 h-4" />
                        )}
                        Démarrer la mission
                      </button>
                    )}

                    {(activeForMap as Assignment).status === "IN_PROGRESS" && (
                      <button
                        onClick={() => updateOrderStatus((activeForMap as Assignment).requestId, "COMPLETED")}
                        disabled={actionLoading === (activeForMap as Assignment).requestId}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-sm hover:bg-emerald-500/25 transition-all disabled:opacity-50"
                      >
                        {actionLoading === (activeForMap as Assignment).requestId ? (
                          <Spinner weight="duotone" className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle weight="duotone" className="w-4 h-4" />
                        )}
                        Terminer la livraison
                      </button>
                    )}

                    {(activeForMap as Assignment).status === "COMPLETED" && (
                      <div className="flex items-center justify-center gap-2 py-3 text-emerald-400 text-sm font-medium">
                        <CheckCircle weight="duotone" className="w-5 h-5" />
                        Mission accomplie
                      </div>
                    )}
                  </div>

                  {/* Carte */}
                  <div className="bg-white/3 border border-white/8 rounded-2xl p-5 space-y-3">
                    <h2 className="text-xs uppercase tracking-wider text-white/40 font-medium">Itinéraire vers le client</h2>
                    {(activeForMap as Assignment).latitude && (activeForMap as Assignment).longitude ? (
                      <DriverMap
                        clientLat={(activeForMap as Assignment).latitude!}
                        clientLng={(activeForMap as Assignment).longitude!}
                        clientAddress={(activeForMap as Assignment).location}
                      />
                    ) : (
                      <div className="w-full h-48 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-2">
                        <MapPin weight="duotone" className="w-8 h-8 text-white/20" />
                        <p className="text-white/30 text-sm">Coordonnées GPS non disponibles pour cette mission</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Overlay ferme le dropdown */}
      {showNotifs && (
        <div className="fixed inset-0 z-30" onClick={() => setShowNotifs(false)} />
      )}
    </div>
  );
}
