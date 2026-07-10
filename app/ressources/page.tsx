"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CarbivioBadge } from "@/components/ui/carbivio-badge";
import {
  Drop,
  BatteryLow,
  Wrench,
  Circle,
  Plus,
  MagnifyingGlass,
  User,
  Package,
  Warning,
  CheckCircle,
} from "@phosphor-icons/react";

// Types pour les ressources
interface Resource {
  id: string;
  name: string;
  type: "fuel" | "battery" | "oil" | "tire";
  unit: string;
  totalStock: number;
  availableStock: number;
  allocatedAmount: number;
  lastUpdated: string;
  status: "sufficient" | "low" | "critical";
  icon: typeof BatteryLow;
  color: string;
}

interface ResourceAllocation {
  id: string;
  resourceId: string;
  resourceName: string;
  driverId: string;
  driverName: string;
  driverPhone: string;
  amount: number;
  unit: string;
  allocatedAt: string;
  status: "pending" | "confirmed" | "used";
}

interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plate: string;
  status: "available" | "on-duty" | "off-duty";
}

// Données mockées
const mockResources: Resource[] = [
  {
    id: "1",
    name: "Sans Plomb 95",
    type: "fuel",
    unit: "L",
    totalStock: 15000,
    availableStock: 8750,
    allocatedAmount: 6250,
    lastUpdated: "2024-04-13 10:30",
    status: "sufficient",
    icon: Drop,
    color: "text-orange-500",
  },
  {
    id: "2",
    name: "Gazole",
    type: "fuel",
    unit: "L",
    totalStock: 12000,
    availableStock: 3200,
    allocatedAmount: 8800,
    lastUpdated: "2024-04-13 09:15",
    status: "low",
    icon: Drop,
    color: "text-orange-500",
  },
  {
    id: "3",
    name: "Batterie 12V",
    type: "battery",
    unit: "unités",
    totalStock: 50,
    availableStock: 42,
    allocatedAmount: 8,
    lastUpdated: "2024-04-13 11:00",
    status: "sufficient",
    icon: BatteryLow,
    color: "text-green-500",
  },
  {
    id: "4",
    name: "Huile 5W-30",
    type: "oil",
    unit: "L",
    totalStock: 200,
    availableStock: 156,
    allocatedAmount: 44,
    lastUpdated: "2024-04-13 08:45",
    status: "sufficient",
    icon: Wrench,
    color: "text-blue-500",
  },
  {
    id: "5",
    name: "Huile 10W-40",
    type: "oil",
    unit: "L",
    totalStock: 150,
    availableStock: 23,
    allocatedAmount: 127,
    lastUpdated: "2024-04-13 10:00",
    status: "critical",
    icon: Wrench,
    color: "text-blue-500",
  },
  {
    id: "6",
    name: "Pneu 205/55R16",
    type: "tire",
    unit: "unités",
    totalStock: 80,
    availableStock: 68,
    allocatedAmount: 12,
    lastUpdated: "2024-04-13 07:30",
    status: "sufficient",
    icon: Circle,
    color: "text-purple-500",
  },
];

const mockAllocations: ResourceAllocation[] = [
  {
    id: "1",
    resourceId: "1",
    resourceName: "Sans Plomb 95",
    driverId: "1",
    driverName: "Dumix MABANZA",
    driverPhone: "+221 77 123 45 67",
    amount: 45,
    unit: "L",
    allocatedAt: "2024-04-13 10:30",
    status: "confirmed",
  },
  {
    id: "2",
    resourceId: "2",
    resourceName: "Gazole",
    driverId: "2",
    driverName: "Ousmane Diop",
    driverPhone: "+221 76 987 65 43",
    amount: 60,
    unit: "L",
    allocatedAt: "2024-04-13 09:15",
    status: "used",
  },
  {
    id: "3",
    resourceId: "3",
    resourceName: "Batterie 12V",
    driverId: "3",
    driverName: "Ibrahim Faye",
    driverPhone: "+221 78 456 78 90",
    amount: 1,
    unit: "unités",
    allocatedAt: "2024-04-13 11:00",
    status: "confirmed",
  },
];

const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Dumix MABANZA",
    phone: "+221 77 123 45 67",
    vehicle: "Toyota Hilux",
    plate: "DK 1234 AB",
    status: "on-duty",
  },
  {
    id: "2",
    name: "Ousmane Diop",
    phone: "+221 76 987 65 43",
    vehicle: "Nissan Navara",
    plate: "DK 5678 CD",
    status: "on-duty",
  },
  {
    id: "3",
    name: "Ibrahim Faye",
    phone: "+221 78 456 78 90",
    vehicle: "Ford Ranger",
    plate: "DK 9012 EF",
    status: "available",
  },
];

// Configuration des statuts
const statusConfig = {
  sufficient: { label: "Suffisant", color: "disponible" },
  low: { label: "Faible", color: "en-route" },
  critical: { label: "Critique", color: "hors-service" },
};

const allocationStatusConfig = {
  pending: { label: "En attente", color: "en-route" },
  confirmed: { label: "Confirmé", color: "disponible" },
  used: { label: "Utilisé", color: "hors-service" },
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [allocations, setAllocations] =
    useState<ResourceAllocation[]>(mockAllocations);
  const drivers = mockDrivers;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResourceType, setSelectedResourceType] =
    useState<string>("all");
  const [showAllocationDialog, setShowAllocationDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [allocationAmount, setAllocationAmount] = useState<string>("");

  // Filtrer les ressources
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedResourceType === "all" || resource.type === selectedResourceType;
    return matchesSearch && matchesType;
  });

  // Filtrer les allocations
  const filteredAllocations = allocations.filter((allocation) => {
    const matchesSearch =
      allocation.resourceName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      allocation.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      allocation.driverPhone.includes(searchTerm);
    return matchesSearch;
  });

  // Statistiques
  const totalResources = resources.length;
  const criticalResources = resources.filter(
    (r) => r.status === "critical",
  ).length;
  const lowResources = resources.filter((r) => r.status === "low").length;
  const todayAllocations = allocations.filter((a) =>
    a.allocatedAt.startsWith("2024-04-13"),
  ).length;

  const handleAllocateResource = () => {
    if (!selectedResource || !selectedDriver || !allocationAmount) return;

    const amount = parseFloat(allocationAmount);
    if (
      isNaN(amount) ||
      amount <= 0 ||
      amount > selectedResource.availableStock
    ) {
      alert("Montant invalide ou insuffisant");
      return;
    }

    // Mettre à jour le stock disponible
    setResources((prev) =>
      prev.map((resource) =>
        resource.id === selectedResource.id
          ? {
              ...resource,
              availableStock: resource.availableStock - amount,
              allocatedAmount: resource.allocatedAmount + amount,
              lastUpdated: new Date().toLocaleString("fr-SN"),
              status:
                resource.availableStock - amount <= resource.totalStock * 0.1
                  ? "critical"
                  : resource.availableStock - amount <=
                      resource.totalStock * 0.3
                    ? "low"
                    : "sufficient",
            }
          : resource,
      ),
    );

    // Ajouter l'allocation
    const newAllocation: ResourceAllocation = {
      id: Date.now().toString(),
      resourceId: selectedResource.id,
      resourceName: selectedResource.name,
      driverId: selectedDriver.id,
      driverName: selectedDriver.name,
      driverPhone: selectedDriver.phone,
      amount,
      unit: selectedResource.unit,
      allocatedAt: new Date().toLocaleString("fr-SN"),
      status: "confirmed",
    };

    setAllocations((prev) => [newAllocation, ...prev]);

    // Réinitialiser le formulaire
    setShowAllocationDialog(false);
    setSelectedResource(null);
    setSelectedDriver(null);
    setAllocationAmount("");
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Ressources"
          description="Gérez le carburant, les batteries, l'huile et les pneus"
          showControls={true}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total ressources
                    </p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {totalResources}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Stock critique
                    </p>
                    <p className="text-2xl font-bold text-red-500">
                      {criticalResources}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-red-500/50 flex items-center justify-center">
                    <Warning className="w-5 h-5 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Stock faible
                    </p>
                    <p className="text-2xl font-bold text-yellow-500">
                      {lowResources}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-yellow-500/50 flex items-center justify-center">
                    <Warning className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Allocations du jour
                    </p>
                    <p className="text-2xl font-bold text-green-500">
                      {todayAllocations}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-green-500/50 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtres et recherche */}
          <Card className="bg-secondary/50 border-border mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher une ressource..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={selectedResourceType}
                    onChange={(e) => setSelectedResourceType(e.target.value)}
                    className="px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">Tous les types</option>
                    <option value="fuel">Carburant</option>
                    <option value="battery">Batteries</option>
                    <option value="oil">Huile moteur</option>
                    <option value="tire">Pneus</option>
                  </select>
                  <Button
                    onClick={() => setShowAllocationDialog(true)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Allouer une ressource
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des ressources */}
          <Card className="bg-secondary/50 border-border mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Stock des ressources</CardTitle>
              <CardDescription>
                État actuel des ressources disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Ressource
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Stock total
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Disponible
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Alloué
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Statut
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Dernière mise à jour
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource) => {
                      const Icon = resource.icon;
                      const percentage =
                        (resource.availableStock / resource.totalStock) * 100;
                      return (
                        <tr
                          key={resource.id}
                          className="border-b border-border hover:bg-secondary/50"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full border border-dashed ${resource.color.replace("text", "border")}/50 flex items-center justify-center`}
                              >
                                <Icon className={`w-4 h-4 ${resource.color}`} />
                              </div>
                              <div>
                                <p className="font-medium text-card-foreground">
                                  {resource.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {resource.unit}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <CarbivioBadge variant="disponible" size="sm">
                              {resource.type === "fuel"
                                ? "Carburant"
                                : resource.type === "battery"
                                  ? "Batterie"
                                  : resource.type === "oil"
                                    ? "Huile"
                                    : "Pneu"}
                            </CarbivioBadge>
                          </td>
                          <td className="p-4 text-sm text-card-foreground">
                            {resource.totalStock.toLocaleString("fr-FR")}{" "}
                            {resource.unit}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-card-foreground">
                                {resource.availableStock.toLocaleString(
                                  "fr-FR",
                                )}{" "}
                                {resource.unit}
                              </span>
                              <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-300 ${
                                    percentage > 50
                                      ? "bg-green-500"
                                      : percentage > 20
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-card-foreground">
                            {resource.allocatedAmount.toLocaleString("fr-FR")}{" "}
                            {resource.unit}
                          </td>
                          <td className="p-4">
                            <CarbivioBadge
                              variant={
                                statusConfig[resource.status].color as
                                  | "disponible"
                                  | "en-route"
                                  | "hors-service"
                              }
                              size="sm"
                            >
                              {statusConfig[resource.status].label}
                            </CarbivioBadge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">
                            {resource.lastUpdated}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tableau des allocations */}
          <Card className="bg-secondary/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Allocations récentes</CardTitle>
              <CardDescription>
                Dernières allocations de ressources aux chauffeurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Ressource
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Chauffeur
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Contact
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Quantité
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllocations.slice(0, 10).map((allocation) => (
                      <tr
                        key={allocation.id}
                        className="border-b border-border hover:bg-secondary/50"
                      >
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-card-foreground">
                              {allocation.resourceName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {allocation.unit}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full border border-dashed border-blue-500/50 flex items-center justify-center">
                              <User className="w-3 h-3 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium text-card-foreground">
                                {allocation.driverName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {
                                  drivers.find(
                                    (d) => d.id === allocation.driverId,
                                  )?.vehicle
                                }
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {allocation.driverPhone}
                        </td>
                        <td className="p-4 text-sm font-medium text-card-foreground">
                          {allocation.amount} {allocation.unit}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {allocation.allocatedAt}
                        </td>
                        <td className="p-4">
                          <CarbivioBadge
                            variant={
                              allocationStatusConfig[allocation.status]
                                .color as
                                | "disponible"
                                | "en-route"
                                | "hors-service"
                            }
                            size="sm"
                          >
                            {allocationStatusConfig[allocation.status].label}
                          </CarbivioBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal d'allocation */}
      {showAllocationDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAllocationDialog(false)}
          />
          <div className="relative bg-card border border-border rounded-lg shadow-2xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-card-foreground">
                Allouer une ressource
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllocationDialog(false)}
                className="text-muted-foreground hover:text-card-foreground"
              >
                ×
              </Button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Ressource
                </label>
                <select
                  value={selectedResource?.id || ""}
                  onChange={(e) =>
                    setSelectedResource(
                      resources.find((r) => r.id === e.target.value) || null,
                    )
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Sélectionner une ressource</option>
                  {resources
                    .filter((r) => r.availableStock > 0)
                    .map((resource) => (
                      <option key={resource.id} value={resource.id}>
                        {resource.name} ({resource.availableStock}{" "}
                        {resource.unit} disponibles)
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Chauffeur
                </label>
                <select
                  value={selectedDriver?.id || ""}
                  onChange={(e) =>
                    setSelectedDriver(
                      drivers.find((d) => d.id === e.target.value) || null,
                    )
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Sélectionner un chauffeur</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.vehicle} ({driver.plate})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Quantité ({selectedResource?.unit || ""})
                </label>
                <input
                  type="number"
                  value={allocationAmount}
                  onChange={(e) => setAllocationAmount(e.target.value)}
                  placeholder={`Max: ${selectedResource?.availableStock || 0}`}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-6 border-t border-border bg-secondary/30">
              <Button
                variant="outline"
                onClick={() => setShowAllocationDialog(false)}
              >
                Annuler
              </Button>
              <Button
                onClick={handleAllocateResource}
                disabled={
                  !selectedResource || !selectedDriver || !allocationAmount
                }
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Allouer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
