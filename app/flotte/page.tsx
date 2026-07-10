"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  MapPin,
  Plus,
  Trash,
  X,
  Users,
  Path,
  Wrench as MaintenanceIcon,
  UserCircle,
  EnvelopeSimple,
  Lock,
} from "@phosphor-icons/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarbivioBadge } from "@/components/ui/carbivio-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFont } from "@/hooks/useFont";
import { NumberTextWrapper } from "@/components/ui/number-text-wrapper";

interface Driver {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface Vehicle {
  id: string;
  plaque: string;
  modele: string;
  chauffeur: string;
  statut: "en-route" | "disponible" | "maintenance" | "hors-service";
  localisation: string;
  dernierEntretien: string;
  prochainEntretien: string;
  carburant: number;
}

const statusConfig = {
  "en-route": {
    label: "En route",
  },
  disponible: {
    label: "Disponible",
  },
  maintenance: {
    label: "Maintenance",
  },
  "hors-service": {
    label: "Hors service",
  },
};

export default function FlottePage() {
  const { largeNumbers } = useFont();

  // État pour les véhicules et l'état de chargement
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // État pour les chauffeurs
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [driversLoading, setDriversLoading] = useState(true);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [driverForm, setDriverForm] = useState({ name: "", email: "", password: "" });
  const [driverFormError, setDriverFormError] = useState("");
  const [savingDriver, setSavingDriver] = useState(false);

  // Charger les véhicules et chauffeurs au montage
  useEffect(() => {
    fetchVehicles();
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setDriversLoading(true);
      const res = await fetch("/api/drivers");
      if (res.ok) setDrivers(await res.json());
    } catch { /* silencieux */ }
    finally { setDriversLoading(false); }
  };

  const handleAddDriver = async () => {
    if (!driverForm.name || !driverForm.email || !driverForm.password) {
      setDriverFormError("Tous les champs sont requis");
      return;
    }
    setSavingDriver(true);
    setDriverFormError("");
    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(driverForm),
      });
      const data = await res.json();
      if (!res.ok) {
        setDriverFormError(data.error ?? "Erreur lors de la création");
        return;
      }
      setDrivers((prev) => {
        const exists = prev.find((d) => d.id === data.id);
        return exists ? prev.map((d) => d.id === data.id ? data : d) : [...prev, data];
      });
      setDriverForm({ name: "", email: "", password: "" });
      setShowAddDriver(false);
    } finally {
      setSavingDriver(false);
    }
  };

  const handleDeleteDriver = async (id: string) => {
    if (!confirm("Supprimer ce chauffeur ?")) return;
    await fetch(`/api/drivers?id=${id}`, { method: "DELETE" });
    setDrivers((prev) => prev.filter((d) => d.id !== id));
  };

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/vehicles");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des véhicules");
      }
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      console.error("Erreur lors du chargement des véhicules:", err);
      setError("Impossible de charger les véhicules");
    } finally {
      setLoading(false);
    }
  };

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    plaque: "",
    modele: "",
    chauffeur: "",
    statut: "disponible",
    localisation: "",
    dernierEntretien: "",
    prochainEntretien: "",
    carburant: 100,
  });

  // Calculer les statistiques à partir des véhicules chargés
  const totalVehicles = vehicles.length;
  const enRoute = vehicles.filter((v) => v.statut === "en-route").length;
  const disponibles = vehicles.filter((v) => v.statut === "disponible").length;
  const maintenance = vehicles.filter((v) => v.statut === "maintenance").length;

  const handleAddVehicle = async () => {
    if (newVehicle.plaque && newVehicle.modele && newVehicle.chauffeur) {
      try {
        const response = await fetch("/api/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVehicle),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Erreur lors de la création du véhicule",
          );
        }

        const createdVehicle = await response.json();
        setVehicles([...vehicles, createdVehicle]);
        setNewVehicle({
          plaque: "",
          modele: "",
          chauffeur: "",
          statut: "disponible",
          localisation: "",
          dernierEntretien: "",
          prochainEntretien: "",
          carburant: 100,
        });
        setShowAddDialog(false);
      } catch (error) {
        console.error("Erreur lors de l'ajout du véhicule:", error);
        alert(
          error instanceof Error
            ? error.message
            : "Erreur lors de l'ajout du véhicule",
        );
      }
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    try {
      const response = await fetch(`/api/vehicles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la suppression du véhicule",
        );
      }

      setVehicles(vehicles.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression du véhicule",
      );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="relative">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Flotte"
          description="Gérez votre flotte de véhicules et suivez leurs statuts en temps réel"
          showControls={false}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header Section with Add Button */}
            <div className="flex items-center justify-end">
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter un véhicule
              </Button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">
                  Chargement des véhicules...
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>{error}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchVehicles}
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Réessayer
                  </Button>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total véhicules
                        </p>
                        <NumberTextWrapper
                          className={cn(
                            "text-2xl font-bold text-card-foreground",
                            largeNumbers,
                          )}
                        >
                          {totalVehicles}
                        </NumberTextWrapper>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          En route
                        </p>
                        <NumberTextWrapper
                          className={cn(
                            "text-2xl font-bold text-card-foreground",
                            largeNumbers,
                          )}
                        >
                          {enRoute}
                        </NumberTextWrapper>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-green-500/50 flex items-center justify-center">
                        <Path className="w-6 h-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Disponibles
                        </p>
                        <NumberTextWrapper
                          className={cn(
                            "text-2xl font-bold text-card-foreground",
                            largeNumbers,
                          )}
                        >
                          {disponibles}
                        </NumberTextWrapper>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Maintenance
                        </p>
                        <NumberTextWrapper
                          className={cn(
                            "text-2xl font-bold text-card-foreground",
                            largeNumbers,
                          )}
                        >
                          {maintenance}
                        </NumberTextWrapper>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-orange-500/50 flex items-center justify-center">
                        <MaintenanceIcon className="w-6 h-6 text-orange-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Vehicle Table */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Liste des véhicules</CardTitle>
                <CardDescription>
                  Gérez les informations de vos véhicules
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                          Plaque
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                          Modèle
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                          Chauffeur
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                          Statut
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                          Localisation
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                          Carburant
                        </th>
                        <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr
                          key={vehicle.id}
                          className="border-b border-border hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-3">
                            <NumberTextWrapper className="font-medium text-card-foreground">
                              {vehicle.plaque}
                            </NumberTextWrapper>
                          </td>
                          <td className="p-3 text-sm text-card-foreground">
                            {vehicle.modele}
                          </td>
                          <td className="p-3 text-sm text-card-foreground">
                            {vehicle.chauffeur}
                          </td>
                          <td className="p-3">
                            <CarbivioBadge
                              variant={
                                vehicle.statut === "en-route"
                                  ? "en-route"
                                  : vehicle.statut === "disponible"
                                    ? "disponible"
                                    : vehicle.statut === "maintenance"
                                      ? "hors-service"
                                      : "hors-service"
                              }
                              size="sm"
                            >
                              {statusConfig[vehicle.statut].label}
                            </CarbivioBadge>
                          </td>
                          <td className="p-3 text-sm text-card-foreground">
                            {vehicle.localisation}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-20 bg-muted/30 rounded-full h-2">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-all duration-300",
                                    vehicle.carburant > 70
                                      ? "bg-green-500"
                                      : vehicle.carburant > 40
                                        ? "bg-orange-500"
                                        : "bg-red-500",
                                  )}
                                  style={{ width: `${vehicle.carburant}%` }}
                                />
                              </div>
                              <NumberTextWrapper
                                className={cn(
                                  "text-xs font-medium",
                                  vehicle.carburant > 70
                                    ? "text-green-500"
                                    : vehicle.carburant > 40
                                      ? "text-orange-500"
                                      : "text-red-500",
                                )}
                              >
                                {vehicle.carburant}%
                              </NumberTextWrapper>
                            </div>
                          </td>
                          <td className="p-3">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteVehicle(vehicle.id)}
                              className="flex items-center gap-1"
                            >
                              <Trash className="w-3 h-3" />
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* ── Section Chauffeurs ── */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-primary" />
                      Chauffeurs
                    </CardTitle>
                    <CardDescription>
                      Comptes chauffeurs autorisés à recevoir des missions
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => { setShowAddDriver(true); setDriverFormError(""); }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter un chauffeur
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {driversLoading ? (
                  <div className="py-6 text-center text-muted-foreground text-sm">Chargement…</div>
                ) : drivers.length === 0 ? (
                  <div className="py-10 text-center">
                    <UserCircle className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">Aucun chauffeur enregistré.</p>
                    <p className="text-muted-foreground/60 text-xs mt-1">Ajoutez un chauffeur pour pouvoir lui attribuer des commandes.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          {["Nom", "Email", "Membre depuis", "Actions"].map((h) => (
                            <th key={h} className="text-left p-3 text-sm font-medium text-muted-foreground">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {drivers.map((d) => (
                          <tr key={d.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                                  <UserCircle className="w-4 h-4 text-primary" />
                                </div>
                                <span className="font-medium text-card-foreground text-sm">{d.name}</span>
                              </div>
                            </td>
                            <td className="p-3 text-sm text-muted-foreground">{d.email}</td>
                            <td className="p-3 text-sm text-muted-foreground numbers-idgrotesk">
                              {new Date(d.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                            </td>
                            <td className="p-3">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteDriver(d.id)}
                                className="flex items-center gap-1"
                              >
                                <Trash className="w-3 h-3" />
                                Supprimer
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Add Driver Dialog */}
            {showAddDriver && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-md w-full mx-4">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                      <UserCircle className="w-5 h-5 text-primary" />
                      Nouveau chauffeur
                    </h3>
                    <button onClick={() => setShowAddDriver(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {driverFormError && (
                    <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                      {driverFormError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="d-name" className="flex items-center gap-1.5">
                        <UserCircle className="w-3.5 h-3.5" /> Nom complet
                      </Label>
                      <Input
                        id="d-name"
                        value={driverForm.name}
                        onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                        className="bg-muted border-border"
                        placeholder="Mamadou Diallo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d-email" className="flex items-center gap-1.5">
                        <EnvelopeSimple className="w-3.5 h-3.5" /> Adresse e-mail
                      </Label>
                      <Input
                        id="d-email"
                        type="email"
                        value={driverForm.email}
                        onChange={(e) => setDriverForm({ ...driverForm, email: e.target.value })}
                        className="bg-muted border-border numbers-idgrotesk"
                        placeholder="chauffeur@carbivio.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="d-pass" className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Mot de passe
                      </Label>
                      <Input
                        id="d-pass"
                        type="password"
                        value={driverForm.password}
                        onChange={(e) => setDriverForm({ ...driverForm, password: e.target.value })}
                        className="bg-muted border-border"
                        placeholder="••••••••"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Si l&apos;email correspond à un compte existant, il sera promu au rôle Chauffeur.
                    </p>
                    <div className="flex gap-3 justify-end pt-2">
                      <Button variant="outline" onClick={() => setShowAddDriver(false)} className="border-border">
                        Annuler
                      </Button>
                      <Button
                        onClick={handleAddDriver}
                        disabled={savingDriver}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {savingDriver ? "Création…" : "Créer le chauffeur"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add Vehicle Dialog */}
            {showAddDialog && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-md w-full mx-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-card-foreground">
                      Ajouter un véhicule
                    </h3>
                    <button
                      onClick={() => setShowAddDialog(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="plaque">
                          Plaque d&apos;immatriculation
                        </Label>
                        <Input
                          id="plaque"
                          value={newVehicle.plaque}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              plaque: e.target.value,
                            })
                          }
                          className="bg-muted border-border"
                          placeholder="DK-1234-AB"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="modele">Modèle</Label>
                        <Input
                          id="modele"
                          value={newVehicle.modele}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              modele: e.target.value,
                            })
                          }
                          className="bg-muted border-border"
                          placeholder="Mercedes Actros"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chauffeur">Chauffeur</Label>
                      <Input
                        id="chauffeur"
                        value={newVehicle.chauffeur}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            chauffeur: e.target.value,
                          })
                        }
                        className="bg-muted border-border"
                        placeholder="Nom du chauffeur"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="statut">Statut</Label>
                      <select
                        id="statut"
                        value={newVehicle.statut}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            statut: e.target.value as Vehicle["statut"],
                          })
                        }
                        className="w-full p-2 bg-muted border border-border rounded-md"
                      >
                        <option value="disponible">Disponible</option>
                        <option value="en-route">En route</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="hors-service">Hors service</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="localisation">Localisation</Label>
                      <Input
                        id="localisation"
                        value={newVehicle.localisation}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            localisation: e.target.value,
                          })
                        }
                        className="bg-muted border-border"
                        placeholder="Dakar"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carburant">Carburant (%)</Label>
                      <Input
                        id="carburant"
                        type="number"
                        min="0"
                        max="100"
                        value={newVehicle.carburant}
                        onChange={(e) =>
                          setNewVehicle({
                            ...newVehicle,
                            carburant: parseInt(e.target.value) || 0,
                          })
                        }
                        className="bg-muted border-border"
                        placeholder="100"
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setShowAddDialog(false)}
                        className="border-border"
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handleAddVehicle}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
