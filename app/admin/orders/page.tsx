"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  MagnifyingGlass,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  MapPin,
  User,
  EnvelopeSimple,
  CalendarBlank,
  TextAlignLeft,
  FireSimple,
  Lightning,
  Drop,
  Tire,
  Siren,
  ArrowsClockwise,
  Spinner,
} from "@phosphor-icons/react";
import { toast } from "sonner";

interface Driver {
  id: string;
  name: string;
  email: string;
}

interface ServiceRequest {
  id: string;
  serviceType: string;
  description: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
  status: "PENDING" | "APPROVED" | "IN_PROGRESS" | "REJECTED" | "COMPLETED";
  price: number | null;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  driver?: Driver | null;
}

const SERVICE_LABELS: Record<string, string> = {
  carburant: "Carburant",
  batterie: "Batterie",
  huile: "Huile moteur",
  pneus: "Pneus",
  urgence: "Urgence",
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  carburant: <FireSimple weight="duotone" className="w-4 h-4" />,
  batterie: <Lightning weight="duotone" className="w-4 h-4" />,
  huile: <Drop weight="duotone" className="w-4 h-4" />,
  pneus: <Tire weight="duotone" className="w-4 h-4" />,
  urgence: <Siren weight="duotone" className="w-4 h-4" />,
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: {
    label: "En attente",
    color: "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20",
    icon: <Clock weight="duotone" className="w-3.5 h-3.5" />,
  },
  APPROVED: {
    label: "Assignée",
    color: "text-[#eca226] bg-[#eca226]/10 border border-[#eca226]/20",
    icon: <Truck weight="duotone" className="w-3.5 h-3.5" />,
  },
  IN_PROGRESS: {
    label: "En route",
    color: "text-blue-400 bg-blue-400/10 border border-blue-400/20",
    icon: <Spinner weight="duotone" className="w-3.5 h-3.5 animate-spin" />,
  },
  COMPLETED: {
    label: "Terminée",
    color: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20",
    icon: <CheckCircle weight="duotone" className="w-3.5 h-3.5" />,
  },
  REJECTED: {
    label: "Rejetée",
    color: "text-red-400 bg-red-400/10 border border-red-400/20",
    icon: <XCircle weight="duotone" className="w-3.5 h-3.5" />,
  },
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<ServiceRequest[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<ServiceRequest | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [pendingDriverId, setPendingDriverId] = useState<string>("");

  useEffect(() => {
    loadOrders();
    loadDrivers();
  }, []);

  // SSE — mises à jour statut chauffeur en temps réel
  useEffect(() => {
    const es = new EventSource("/api/notifications/stream");

    es.addEventListener("driver_status_update", (e) => {
      const notif = JSON.parse(e.data) as {
        requestId: string;
        driverName: string;
        clientName: string;
        serviceType: string;
        newStatus: "IN_PROGRESS" | "COMPLETED";
      };

      // Mettre à jour la liste et la modale si ouverte
      setOrders((prev) =>
        prev.map((o) =>
          o.id === notif.requestId ? { ...o, status: notif.newStatus } : o
        )
      );
      setSelectedOrder((prev) =>
        prev?.id === notif.requestId ? { ...prev, status: notif.newStatus } : prev
      );

      const label =
        notif.newStatus === "IN_PROGRESS"
          ? `🚚 ${notif.driverName} a démarré sa mission`
          : `✅ ${notif.driverName} a terminé la livraison`;
      const desc = `Client : ${notif.clientName} — ${SERVICE_LABELS[notif.serviceType] ?? notif.serviceType}`;
      toast(label, { description: desc, duration: 6000 });
    });

    es.onerror = () => es.close();
    return () => es.close();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/requests");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDrivers = async () => {
    try {
      const res = await fetch("/api/drivers");
      if (res.ok) setDrivers(await res.json());
    } catch { /* silencieux */ }
  };

  const assignDriver = async (orderId: string, driverId: string) => {
    if (!driverId) return;
    setAssigningId(orderId);
    try {
      const res = await fetch(`/api/requests/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId }),
      });
      if (res.ok) {
        const driver = drivers.find((d) => d.id === driverId) ?? null;
        setOrders((prev) =>
          prev.map((o) => o.id === orderId ? { ...o, driver } : o)
        );
        if (selectedOrder?.id === orderId) {
          setSelectedOrder((prev) => prev ? { ...prev, driver } : null);
        }
        toast(`🚚 Commande attribuée à ${driver?.name ?? "le chauffeur"}`, {
          description: "Le chauffeur a été notifié en temps réel.",
          duration: 4000,
        });
      }
    } finally {
      setAssigningId(null);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const typedStatus = status as ServiceRequest["status"];
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: typedStatus } : o))
        );
        if (selectedOrder?.id === id) {
          setSelectedOrder((prev) => prev ? { ...prev, status: typedStatus } : null);
        }
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = orders.filter((o) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      o.user.name.toLowerCase().includes(q) ||
      o.user.email.toLowerCase().includes(q) ||
      o.location.toLowerCase().includes(q) ||
      (SERVICE_LABELS[o.serviceType] ?? o.serviceType).toLowerCase().includes(q);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "PENDING").length,
    active: orders.filter((o) => o.status === "APPROVED" || o.status === "IN_PROGRESS").length,
    completed: orders.filter((o) => o.status === "COMPLETED").length,
  };

  return (
    <div className="flex h-screen bg-[#151514]">
      <div className="relative">
        <DashboardSidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Commandes"
          description="Attribution et suivi des demandes de service"
          showControls={false}
        />
        <main className="flex-1 overflow-y-auto">
    <div className="p-6 space-y-6">
      {loading && (
        <div className="flex items-center justify-center h-64">
          <ArrowsClockwise weight="duotone" className="w-8 h-8 text-[#eca226] animate-spin" />
        </div>
      )}
      {!loading && <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-montserrat">Commandes</h1>
          <p className="text-white/50 text-sm mt-0.5">Toutes les demandes de service des clients</p>
        </div>
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
        >
          <ArrowsClockwise weight="duotone" className="w-4 h-4" />
          Actualiser
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: counts.total, color: "text-white", bg: "bg-white/5 border-white/10" },
          { label: "En attente", value: counts.pending, color: "text-yellow-400", bg: "bg-yellow-400/5 border-yellow-400/20" },
          { label: "Actives", value: counts.active, color: "text-[#eca226]", bg: "bg-[#eca226]/5 border-[#eca226]/20" },
          { label: "Terminées", value: counts.completed, color: "text-emerald-400", bg: "bg-emerald-400/5 border-emerald-400/20" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 border ${s.bg}`}>
            <div className={`text-3xl font-bold numbers-idgrotesk ${s.color}`}>{s.value}</div>
            <div className="text-white/50 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" weight="bold" />
          <input
            type="text"
            placeholder="Rechercher par client, email, localisation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[#eca226]/50 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#eca226]/50 text-sm"
        >
          <option value="all">Tous les statuts</option>
          <option value="PENDING">En attente</option>
          <option value="APPROVED">Assignée</option>
          <option value="IN_PROGRESS">En route</option>
          <option value="COMPLETED">Terminées</option>
          <option value="REJECTED">Rejetées</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white/3 border border-white/10 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-white/40 text-sm">
            {orders.length === 0 ? "Aucune commande pour l'instant" : "Aucun résultat pour cette recherche"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  {["Client", "Service", "Localisation", "Statut", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-white/40 font-medium text-xs uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const st = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="font-medium text-white text-sm">{order.user.name}</div>
                        <div className="text-white/40 text-xs mt-0.5">{order.user.email}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-white text-sm">
                          <span className="text-[#eca226]">{SERVICE_ICONS[order.serviceType]}</span>
                          {SERVICE_LABELS[order.serviceType] ?? order.serviceType}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-white/70 text-sm">
                          <MapPin weight="duotone" className="w-3.5 h-3.5 text-[#eca226]/70 shrink-0" />
                          <span className="max-w-45 truncate">{order.location}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${st.color}`}>
                          {st.icon}
                          {st.label}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-white/70 text-sm numbers-idgrotesk">{formatDate(order.createdAt)}</div>
                        <div className="text-white/30 text-xs numbers-idgrotesk">{formatTime(order.createdAt)}</div>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => { setSelectedOrder(order); setPendingDriverId(order.driver?.id ?? ""); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eca226]/10 text-[#eca226] hover:bg-[#eca226]/20 transition-colors text-xs font-medium"
                        >
                          <Eye weight="duotone" className="w-3.5 h-3.5" />
                          Voir
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-[#1a1a18] border border-white/10 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white font-montserrat">Détail de la commande</h2>
                <p className="text-white/40 text-xs mt-0.5 numbers-idgrotesk">#{selectedOrder.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-white/40 hover:text-white transition-colors">
                <XCircle weight="duotone" className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Client */}
              <div className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-3">
                <h3 className="text-white/50 text-xs uppercase tracking-wider font-medium">Client</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#eca226]/15 flex items-center justify-center">
                    <User weight="duotone" className="w-5 h-5 text-[#eca226]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{selectedOrder.user.name}</div>
                    <div className="flex items-center gap-1.5 text-white/40 text-sm mt-0.5">
                      <EnvelopeSimple weight="duotone" className="w-3.5 h-3.5" />
                      {selectedOrder.user.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service */}
              <div className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-3">
                <h3 className="text-white/50 text-xs uppercase tracking-wider font-medium">Service demandé</h3>
                <div className="flex items-center gap-2 text-white font-medium">
                  <span className="text-[#eca226] text-lg">{SERVICE_ICONS[selectedOrder.serviceType]}</span>
                  {SERVICE_LABELS[selectedOrder.serviceType] ?? selectedOrder.serviceType}
                </div>
                <div className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin weight="duotone" className="w-4 h-4 text-[#eca226]/70 shrink-0 mt-0.5" />
                  {selectedOrder.location}
                </div>
                {selectedOrder.description && (
                  <div className="flex items-start gap-2 text-white/60 text-sm">
                    <TextAlignLeft weight="duotone" className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                    <span>{selectedOrder.description}</span>
                  </div>
                )}
              </div>

              {/* Status + Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                  <h3 className="text-white/50 text-xs uppercase tracking-wider font-medium mb-2">Statut</h3>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[selectedOrder.status]?.color}`}>
                    {STATUS_CONFIG[selectedOrder.status]?.icon}
                    {STATUS_CONFIG[selectedOrder.status]?.label}
                  </span>
                </div>
                <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                  <h3 className="text-white/50 text-xs uppercase tracking-wider font-medium mb-2">Date</h3>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm">
                    <CalendarBlank weight="duotone" className="w-4 h-4 text-[#eca226]/70" />
                    <span className="numbers-idgrotesk">{formatDate(selectedOrder.createdAt)}</span>
                  </div>
                  <div className="text-white/30 text-xs mt-1 numbers-idgrotesk pl-5">{formatTime(selectedOrder.createdAt)}</div>
                </div>
              </div>

              {/* Assignation chauffeur */}
              <div className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-3">
                <h3 className="text-white/50 text-xs uppercase tracking-wider font-medium flex items-center gap-2">
                  <Truck weight="duotone" className="w-4 h-4 text-[#eca226]" />
                  Chauffeur assigné
                </h3>
                {selectedOrder.driver ? (
                  <div className="flex items-center gap-2 p-2.5 bg-[#eca226]/8 border border-[#eca226]/20 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-[#eca226]/20 flex items-center justify-center">
                      <User weight="duotone" className="w-3.5 h-3.5 text-[#eca226]" />
                    </div>
                    <div>
                      <span className="font-semibold text-white text-sm">{selectedOrder.driver.name}</span>
                      <p className="text-white/40 text-xs">{selectedOrder.driver.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-white/30 text-sm italic">Aucun chauffeur assigné</p>
                )}
                {drivers.length > 0 ? (
                  <div className="flex gap-2">
                    <select
                      value={pendingDriverId}
                      onChange={(e) => setPendingDriverId(e.target.value)}
                      disabled={assigningId === selectedOrder.id}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#eca226]/50 disabled:opacity-50"
                    >
                      <option value="">— Sélectionner un chauffeur —</option>
                      {drivers.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => assignDriver(selectedOrder.id, pendingDriverId)}
                      disabled={assigningId === selectedOrder.id || !pendingDriverId}
                      className="px-4 py-2 rounded-lg bg-[#eca226] text-[#151514] font-bold text-sm hover:bg-[#d4911f] transition-all disabled:opacity-40 flex items-center gap-1.5 shrink-0"
                    >
                      {assigningId === selectedOrder.id ? (
                        <Spinner weight="duotone" className="w-4 h-4 animate-spin" />
                      ) : (
                        <Truck weight="duotone" className="w-4 h-4" />
                      )}
                      Attribuer
                    </button>
                  </div>
                ) : (
                  <p className="text-white/20 text-xs">
                    Aucun chauffeur disponible. Ajoutez-en un depuis la page <span className="text-[#eca226]/60">Flotte</span>.
                  </p>
                )}
              </div>

              {/* Actions statut */}
              {selectedOrder.status !== "COMPLETED" && selectedOrder.status !== "REJECTED" && (
                <div className="flex gap-2">
                  <button
                    disabled={updatingId === selectedOrder.id}
                    onClick={() => updateStatus(selectedOrder.id, "COMPLETED")}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all text-sm font-medium disabled:opacity-50"
                  >
                    <CheckCircle weight="duotone" className="w-4 h-4" />
                    Marquer terminée
                  </button>
                  <button
                    disabled={updatingId === selectedOrder.id}
                    onClick={() => updateStatus(selectedOrder.id, "REJECTED")}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium disabled:opacity-50"
                  >
                    <XCircle weight="duotone" className="w-4 h-4" />
                    Rejeter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </>}
    </div>
        </main>
      </div>
    </div>
  );
}
