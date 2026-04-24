"use client";

import { useState, useEffect } from "react";
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
  Package,
  Drop,
  BatteryLow,
  Wrench,
  Plus,
  MagnifyingGlass,
  TrendUp,
  TrendDown,
  Warning,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from "@phosphor-icons/react";

// Types pour les stocks
interface StockItem {
  id: string;
  name: string;
  category: "fuel" | "battery" | "oil" | "tire";
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  receivedDate: string;
  location: string;
  status: "available" | "low" | "critical";
  lastUpdated: string;
}

interface StockStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  criticalItems: number;
  categoriesCount: {
    fuel: number;
    battery: number;
    oil: number;
    tire: number;
  };
}

export default function StockPage() {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [stats, setStats] = useState<StockStats>({
    totalItems: 0,
    totalValue: 0,
    lowStockItems: 0,
    criticalItems: 0,
    categoriesCount: {
      fuel: 0,
      battery: 0,
      oil: 0,
      tire: 0,
    },
  });
  const [newItem, setNewItem] = useState({
    name: "",
    category: "fuel",
    quantity: 0,
    unit: "L",
    unitPrice: 0,
    supplier: "",
    receivedDate: "",
    location: "",
  });

  // Charger les données depuis la base de données
  useEffect(() => {
    fetchStockItems();
  }, []);

  const fetchStockItems = async () => {
    try {
      const response = await fetch("/api/stock");
      if (response.ok) {
        const data = await response.json();
        setStockItems(data);

        // Calculer les statistiques
        const totalItems = data.length;
        const totalValue = data.reduce(
          (sum: number, item: any) => sum + item.totalValue,
          0,
        );
        const lowStockItems = data.filter(
          (item: any) => item.status === "LOW",
        ).length;
        const criticalItems = data.filter(
          (item: any) => item.status === "CRITICAL",
        ).length;
        const categoriesCount = {
          fuel: data.filter((item: any) => item.category === "FUEL").length,
          battery: data.filter((item: any) => item.category === "BATTERY")
            .length,
          oil: data.filter((item: any) => item.category === "OIL").length,
          tire: data.filter((item: any) => item.category === "TIRE").length,
        };

        setStats({
          totalItems,
          totalValue,
          lowStockItems,
          criticalItems,
          categoriesCount,
        });
      }
    } catch (error) {
      console.error("Error fetching stock items:", error);
    }
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch("/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (response.ok) {
        const data = await response.json();
        setStockItems([...stockItems, data]);
        setShowAddDialog(false);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Filtrer les items
  const filteredItems = stockItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "fuel":
        return Drop;
      case "battery":
        return BatteryLow;
      case "oil":
        return Wrench;
      case "tire":
        return Package;
      default:
        return Package;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <CarbivioBadge variant="success">Disponible</CarbivioBadge>;
      case "low":
        return <CarbivioBadge variant="warning">Stock bas</CarbivioBadge>;
      case "critical":
        return <CarbivioBadge variant="danger">Critique</CarbivioBadge>;
      default:
        return <CarbivioBadge variant="secondary">Inconnu</CarbivioBadge>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="relative">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-400 mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-card-foreground">
                  Gestion des Stocks
                </h1>
                <p className="text-muted-foreground">
                  Suivi des marchandises reçues et disponibles
                </p>
              </div>
              <Button
                onClick={() => setShowAddDialog(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter au stock
              </Button>
            </div>

            {/* Modal d'ajout de stock */}
            {showAddDialog && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-background border border-border rounded-lg p-6 w-full max-w-md mx-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-card-foreground">
                      Ajouter un article au stock
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddDialog(false)}
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Nom de l'article
                      </label>
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: Sans Plomb 95"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Catégorie
                      </label>
                      <select
                        value={newItem.category}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            category: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="fuel">Carburant</option>
                        <option value="battery">Batterie</option>
                        <option value="oil">Huile moteur</option>
                        <option value="tire">Pneus</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Quantité
                        </label>
                        <input
                          type="number"
                          value={newItem.quantity}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              quantity: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Unité
                        </label>
                        <input
                          type="text"
                          value={newItem.unit}
                          onChange={(e) =>
                            setNewItem({ ...newItem, unit: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Ex: L, unités"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Prix unitaire (FCFA)
                        </label>
                        <input
                          type="number"
                          value={newItem.unitPrice}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              unitPrice: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Fournisseur
                        </label>
                        <input
                          type="text"
                          value={newItem.supplier}
                          onChange={(e) =>
                            setNewItem({ ...newItem, supplier: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Nom du fournisseur"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Date de réception
                        </label>
                        <input
                          type="date"
                          value={newItem.receivedDate}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              receivedDate: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-card-foreground mb-2">
                          Localisation
                        </label>
                        <input
                          type="text"
                          value={newItem.location}
                          onChange={(e) =>
                            setNewItem({ ...newItem, location: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Ex: Dakar - Principal"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddDialog(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleAddItem}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    {stats.totalItems}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Package className="w-3 h-3 inline mr-1" />
                    Différents types
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Valeur Totale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">
                    {stats.totalValue.toLocaleString("fr-FR")} FCFA
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <ArrowUp className="w-3 h-3 inline mr-1" />
                    Valeur du stock actuel
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Stock Bas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">
                    {stats.lowStockItems}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <TrendDown className="w-3 h-3 inline mr-1" />
                    Articles à recharger
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Stock Critique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    {stats.criticalItems}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Warning className="w-3 h-3 inline mr-1" />
                    Urgence
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filtres */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Filtres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">Toutes les catégories</option>
                    <option value="fuel">Carburant</option>
                    <option value="battery">Batteries</option>
                    <option value="oil">Huile moteur</option>
                    <option value="tire">Pneus</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Tableau des stocks */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  Articles en Stock ({filteredItems.length})
                </CardTitle>
                <CardDescription>
                  Liste des marchandises reçues et disponibles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 text-muted-foreground font-medium">
                          Article
                        </th>
                        <th className="text-left p-3 text-muted-foreground font-medium">
                          Catégorie
                        </th>
                        <th className="text-left p-3 text-muted-foreground font-medium">
                          Quantité
                        </th>
                        <th className="text-left p-3 text-muted-foreground font-medium">
                          Valeur totale
                        </th>
                        <th className="text-left p-3 text-muted-foreground font-medium">
                          Fournisseur
                        </th>
                        <th className="text-left p-3 text-muted-foreground font-medium">
                          Localisation
                        </th>
                        <th className="text-left p-3 text-muted-foreground font-medium">
                          Statut
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => {
                        const Icon = getCategoryIcon(item.category);
                        return (
                          <tr
                            key={item.id}
                            className="border-b border-border hover:bg-muted/50"
                          >
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-primary" />
                                <span className="font-medium text-card-foreground">
                                  {item.name}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 text-muted-foreground">
                              {item.category === "fuel" && "Carburant"}
                              {item.category === "battery" && "Batterie"}
                              {item.category === "oil" && "Huile moteur"}
                              {item.category === "tire" && "Pneus"}
                            </td>
                            <td className="p-3 text-card-foreground">
                              {item.quantity} {item.unit}
                            </td>
                            <td className="p-3 text-card-foreground">
                              {item.totalValue.toLocaleString("fr-FR")} FCFA
                            </td>
                            <td className="p-3 text-muted-foreground">
                              {item.supplier}
                            </td>
                            <td className="p-3 text-muted-foreground">
                              {item.location}
                            </td>
                            <td className="p-3">
                              {getStatusBadge(item.status)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
