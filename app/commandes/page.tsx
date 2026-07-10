"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Package,
  Clock,
  MagnifyingGlass,
  Truck,
  MapPin,
  CheckCircle,
  ArrowsClockwise,
  X,
  User,
  EnvelopeSimple,
  TextAlignLeft,
  CalendarBlank,
  FireSimple,
  Lightning,
  Drop,
  Tire,
  Siren,
  Spinner,
  Warning,
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
  latitude: number | null;
  longitude: number | null;
  status: "PENDING" | "APPROVED" | "IN_PROGRESS" | "REJECTED" | "COMPLETED";
  price: number | null;
  createdAt: string;
  updatedAt: string;
  driverId: string | null;
  user: { name: string; email: string };
  driver: Driver | null;
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
  batterie:  <Lightning weight="duotone" className="w-4 h-4" />,
  huile:     <Drop weight="duotone" className="w-4 h-4" />,
  pneus:     <Tire weight="duotone" className="w-4 h-4" />,
  urgence:   <Siren weight="duotone" className="w-4 h-4" />,
};

function getStatusDisplay(r: ServiceRequest): { label: string; className: string } {
  if (r.status === "COMPLETED")  return { label: "Terminée",     className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" };
  if (r.status === "REJECTED")   return { label: "Rejetée",      className: "bg-red-500/10 text-red-400 border border-red-500/20" };
  if (r.status === "IN_PROGRESS") return { label: "En route",    className: "bg-blue-500/10 text-blue-400 border border-blue-500/20" };
  if (!r.driver)                  return { label: "Non assignée", className: "bg-muted/50 text-muted-foreground border border-border" };
  return { label: "Assignée", className: "bg-primary/10 text-primary border border-primary/20" };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}
function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function CommandesPage() {
  const [requests, setRequests]         = useState<ServiceRequest[]>([]);
  const [drivers, setDrivers]           = useState<Driver[]>([]);
  const [loading, setLoading]           = useState(true);
  const [searchTerm, setSearchTerm]     = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected]         = useState<ServiceRequest | null>(null);
  const [pendingDriver, setPendingDriver] = useState("");
  const [assigning, setAssigning]       = useState(false);

  useEffect(() => {
    loadOrders();
    loadDrivers();
  }, []);

  // SSE — mises à jour chauffeur en temps réel
  useEffect(() => {
    const es = new EventSource("/api/notifications/stream");
    es.addEventListener("driver_status_update", (e) => {
      const n = JSON.parse(e.data) as {
        requestId: string; driverName: string; clientName: string;
        serviceType: string; newStatus: "IN_PROGRESS" | "COMPLETED";
      };
      setRequests((prev) =>
        prev.map((r) => r.id === n.requestId ? { ...r, status: n.newStatus } : r)
      );
      setSelected((prev) =>
        prev?.id === n.requestId ? { ...prev, status: n.newStatus } : prev
      );
      const label = n.newStatus === "IN_PROGRESS"
        ? `🚚 ${n.driverName} a démarré sa mission`
        : `✅ ${n.driverName} a terminé la livraison`;
      toast(label, {
        description: `Client : ${n.clientName} — ${SERVICE_LABELS[n.serviceType] ?? n.serviceType}`,
        duration: 6000,
      });
    });
    es.onerror = () => es.close();
    return () => es.close();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/requests");
      if (res.ok) setRequests(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const loadDrivers = async () => {
    try {
      const res = await fetch("/api/drivers");
      if (res.ok) setDrivers(await res.json());
    } catch { /* silencieux */ }
  };

  const assignDriver = async () => {
    if (!selected || !pendingDriver) return;
    setAssigning(true);
    try {
      const res = await fetch(`/api/requests/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId: pendingDriver }),
      });
      if (res.ok) {
        const driver = drivers.find((d) => d.id === pendingDriver) ?? null;
        setRequests((prev) =>
          prev.map((r) => r.id === selected.id ? { ...r, driver, driverId: pendingDriver } : r)
        );
        setSelected((prev) => prev ? { ...prev, driver, driverId: pendingDriver } : null);
        toast(`🚚 Commande attribuée à ${driver?.name}`, {
          description: "Le chauffeur a été notifié en temps réel.",
        });
      }
    } finally {
      setAssigning(false);
    }
  };

  const openDetail = (r: ServiceRequest) => {
    setSelected(r);
    setPendingDriver(r.driver?.id ?? "");
  };

  const filtered = requests.filter((r) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      r.user.name.toLowerCase().includes(q) ||
      r.user.email.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      (SERVICE_LABELS[r.serviceType] ?? r.serviceType).toLowerCase().includes(q);

    if (statusFilter === "all") return matchSearch;
    if (statusFilter === "NON_ASSIGNEE") return matchSearch && !r.driver && r.status !== "COMPLETED" && r.status !== "REJECTED";
    return matchSearch && r.status === statusFilter;
  });

  const counts = {
    total:       requests.length,
    nonAssigned: requests.filter((r) => !r.driver && r.status !== "COMPLETED" && r.status !== "REJECTED").length,
    active:      requests.filter((r) => r.driver && (r.status === "APPROVED" || r.status === "IN_PROGRESS")).length,
    completed:   requests.filter((r) => r.status === "COMPLETED").length,
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Commandes"
          description="Attribution et suivi des demandes de service clients"
          showControls={false}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-7xl mx-auto">

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total",        value: counts.total,       icon: Package,     color: "text-primary",    border: "border-primary/50" },
                { label: "Non assignées",value: counts.nonAssigned, icon: Warning,     color: "text-yellow-500", border: "border-yellow-500/50" },
                { label: "En cours",     value: counts.active,      icon: Truck,       color: "text-blue-500",   border: "border-blue-500/50" },
                { label: "Terminées",    value: counts.completed,   icon: CheckCircle, color: "text-green-500",  border: "border-green-500/50" },
              ].map(({ label, value, icon: Icon, color, border }) => (
                <Card key={label} className="bg-card border-border">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="text-2xl font-bold text-card-foreground numbers-idgrotesk">{value}</p>
                      </div>
                      <div className={`w-11 h-11 rounded-full border-2 border-dashed ${border} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filtres + actualiser */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher par client, service, localisation…"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="NON_ASSIGNEE">Non assignées</option>
                    <option value="APPROVED">Assignées</option>
                    <option value="IN_PROGRESS">En route</option>
                    <option value="COMPLETED">Terminées</option>
                    <option value="REJECTED">Rejetées</option>
                  </select>
                  <button
                    onClick={loadOrders}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-card-foreground hover:bg-secondary/80 transition-colors text-sm"
                  >
                    <ArrowsClockwise className="w-4 h-4" />
                    Actualiser
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Tableau */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Liste des commandes</CardTitle>
                <CardDescription>
                  {loading ? "Chargement…" : `${filtered.length} commande${filtered.length > 1 ? "s" : ""}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center py-16">
                    <ArrowsClockwise className="w-7 h-7 text-primary animate-spin" />
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground text-sm">
                    {requests.length === 0 ? "Aucune commande pour l'instant" : "Aucun résultat"}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          {["Client", "Service", "Localisation", "Chauffeur", "Statut", "Date", ""].map((h) => (
                            <th key={h} className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((r) => {
                          const st = getStatusDisplay(r);
                          return (
                            <tr key={r.id} className="border-b border-border hover:bg-secondary/40 transition-colors">
                              <td className="p-4">
                                <div className="font-medium text-card-foreground text-sm">{r.user.name}</div>
                                <div className="text-xs text-muted-foreground">{r.user.email}</div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2 text-card-foreground text-sm">
                                  <span className="text-primary">{SERVICE_ICONS[r.serviceType]}</span>
                                  {SERVICE_LABELS[r.serviceType] ?? r.serviceType}
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                                  <span className="max-w-40 truncate">{r.location}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                {r.driver ? (
                                  <div className="flex items-center gap-1.5 text-sm">
                                    <User weight="duotone" className="w-3.5 h-3.5 text-primary shrink-0" />
                                    <span className="text-card-foreground font-medium">{r.driver.name}</span>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground text-sm italic">—</span>
                                )}
                              </td>
                              <td className="p-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${st.className}`}>
                                  {st.label}
                                </span>
                              </td>
                              <td className="p-4 text-sm text-card-foreground numbers-idgrotesk">
                                {formatDate(r.createdAt)}
                                <div className="text-xs text-muted-foreground">{formatTime(r.createdAt)}</div>
                              </td>
                              <td className="p-4">
                                <button
                                  onClick={() => openDetail(r)}
                                  className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-medium border border-primary/20"
                                >
                                  Détail
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </main>
      </div>

      {/* Modale détail */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* En-tête modale */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-lg font-bold text-card-foreground">Détail de la commande</h2>
                <p className="text-muted-foreground text-xs mt-0.5 numbers-idgrotesk">
                  #{selected.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-card-foreground transition-colors">
                <X weight="bold" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">

              {/* Client */}
              <div className="bg-background border border-border rounded-xl p-4">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-3">Client</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <User weight="duotone" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-card-foreground font-semibold text-sm">{selected.user.name}</div>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-0.5">
                      <EnvelopeSimple weight="duotone" className="w-3.5 h-3.5" />
                      {selected.user.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service + statut */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-background border border-border rounded-xl p-4">
                  <h3 className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-2">Service</h3>
                  <div className="flex items-center gap-2 text-card-foreground font-medium text-sm">
                    <span className="text-primary">{SERVICE_ICONS[selected.serviceType]}</span>
                    {SERVICE_LABELS[selected.serviceType] ?? selected.serviceType}
                  </div>
                </div>
                <div className="bg-background border border-border rounded-xl p-4">
                  <h3 className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-2">Statut</h3>
                  {(() => {
                    const st = getStatusDisplay(selected);
                    return (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${st.className}`}>
                        {st.label}
                      </span>
                    );
                  })()}
                </div>
              </div>

              {/* Localisation */}
              <div className="bg-background border border-border rounded-xl p-4">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-2">Localisation</h3>
                <div className="flex items-start gap-2 text-card-foreground text-sm">
                  <MapPin weight="duotone" className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {selected.location}
                </div>
              </div>

              {/* Description */}
              {selected.description && (
                <div className="bg-background border border-border rounded-xl p-4">
                  <h3 className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-2">Notes</h3>
                  <div className="flex items-start gap-2 text-muted-foreground text-sm">
                    <TextAlignLeft weight="duotone" className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{selected.description}</span>
                  </div>
                </div>
              )}

              {/* Date */}
              <div className="bg-background border border-border rounded-xl p-4">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-2">Date</h3>
                <div className="flex items-center gap-2 text-card-foreground text-sm numbers-idgrotesk">
                  <CalendarBlank weight="duotone" className="w-4 h-4 text-primary" />
                  {formatDate(selected.createdAt)} à {formatTime(selected.createdAt)}
                </div>
              </div>

              {/* Attribution chauffeur */}
              <div className="bg-background border border-border rounded-xl p-4 space-y-3">
                <h3 className="text-muted-foreground text-xs uppercase tracking-wider font-medium flex items-center gap-2">
                  <Truck weight="duotone" className="w-4 h-4 text-primary" />
                  Attribution chauffeur
                </h3>

                {selected.driver ? (
                  <div className="flex items-center gap-3 p-2.5 bg-primary/8 border border-primary/20 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User weight="duotone" className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-card-foreground font-semibold text-sm">{selected.driver.name}</div>
                      <div className="text-muted-foreground text-xs">{selected.driver.email}</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm italic">Aucun chauffeur assigné</p>
                )}

                {selected.status !== "COMPLETED" && selected.status !== "REJECTED" && (
                  drivers.length > 0 ? (
                    <div className="flex gap-2">
                      <select
                        value={pendingDriver}
                        onChange={(e) => setPendingDriver(e.target.value)}
                        disabled={assigning}
                        className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-card-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      >
                        <option value="">— Sélectionner un chauffeur —</option>
                        {drivers.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={assignDriver}
                        disabled={assigning || !pendingDriver}
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all disabled:opacity-40 flex items-center gap-1.5 shrink-0"
                      >
                        {assigning
                          ? <Spinner weight="duotone" className="w-4 h-4 animate-spin" />
                          : <Truck weight="duotone" className="w-4 h-4" />
                        }
                        Attribuer
                      </button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-xs">
                      Aucun chauffeur disponible. Ajoutez-en un depuis la page <strong>Flotte</strong>.
                    </p>
                  )
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
