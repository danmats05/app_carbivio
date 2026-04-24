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
  ChartLine,
  TrendUp,
  TrendDown,
  Calendar,
  FileText,
  CurrencyRub,
  Users,
  Package,
  Drop,
  Warning,
  CheckCircle,
  Truck,
  MapPin,
  Clock,
  ArrowUp,
  ArrowDown,
} from "@phosphor-icons/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Types pour les rapports
interface DailyReport {
  date: string;
  totalOrders: number;
  completedOrders: number;
  revenue: number;
  fuelConsumed: number;
  activeVehicles: number;
  newCustomers: number;
}

interface ReportStats {
  today: DailyReport;
  yesterday: DailyReport;
  thisWeek: DailyReport;
  lastWeek: DailyReport;
  thisMonth: DailyReport;
  lastMonth: DailyReport;
}

// Données pour les graphiques
const generateChartData = (days: number) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1.0;

    data.push({
      date: date.toLocaleDateString("fr-SN", { day: "numeric" }),
      orders: Math.floor((45 + Math.random() * 20) * weekendMultiplier),
      revenue: Math.floor(
        (850000 + Math.random() * 300000) * weekendMultiplier,
      ),
      fuel: Math.floor((120 + Math.random() * 80) * weekendMultiplier),
      deliveries: Math.floor((38 + Math.random() * 15) * weekendMultiplier),
    });
  }

  return data;
};

const generateLocationData = () => [
  { name: "Dakar", value: 45, color: "#eca226" },
  { name: "Thiès", value: 25, color: "#22c55e" },
  { name: "Kaolack", value: 15, color: "#3b82f6" },
  { name: "Saint-Louis", value: 10, color: "#f59e0b" },
  { name: "Autres", value: 5, color: "#8b5cf6" },
];

const generateTimeData = () => [
  { time: "00-06", orders: 5, fuel: 15 },
  { time: "06-12", orders: 25, fuel: 85 },
  { time: "12-18", orders: 35, fuel: 120 },
  { time: "18-24", orders: 20, fuel: 45 },
];

// Fonction pour générer les données du rapport
const generateDailyReport = (date: Date, offset: number = 0): DailyReport => {
  const targetDate = new Date(date);
  targetDate.setDate(targetDate.getDate() + offset);

  // Simuler des variations réalistes
  const baseOrders = 45 + Math.floor(Math.random() * 20);
  const baseRevenue = 850000 + Math.floor(Math.random() * 300000);
  const baseFuel = 120 + Math.floor(Math.random() * 80);
  const baseVehicles = 12 + Math.floor(Math.random() * 8);
  const baseCustomers = 2 + Math.floor(Math.random() * 5);

  // Ajouter des variations selon le jour de la semaine
  const dayOfWeek = targetDate.getDay();
  const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1.0;

  return {
    date: targetDate.toLocaleDateString("fr-SN"),
    totalOrders: Math.floor(baseOrders * weekendMultiplier),
    completedOrders: Math.floor(baseOrders * 0.85 * weekendMultiplier),
    revenue: Math.floor(baseRevenue * weekendMultiplier),
    fuelConsumed: Math.floor(baseFuel * weekendMultiplier),
    activeVehicles: Math.floor(baseVehicles * weekendMultiplier),
    newCustomers: Math.floor(baseCustomers * weekendMultiplier),
  };
};

// Générer les données du rapport
const generateReportData = (): ReportStats => {
  const today = new Date();

  return {
    today: generateDailyReport(today),
    yesterday: generateDailyReport(today, -1),
    thisWeek: generateDailyReport(today, -today.getDay()),
    lastWeek: generateDailyReport(today, -7 - today.getDay()),
    thisMonth: generateDailyReport(today, -today.getDate() + 1),
    lastMonth: generateDailyReport(today, -30),
  };
};

// Calculer les variations
const calculateVariation = (
  current: number,
  previous: number,
): { value: number; percentage: number; trend: "up" | "down" | "neutral" } => {
  const value = current - previous;
  const percentage = previous !== 0 ? Math.round((value / previous) * 100) : 0;

  if (value > 0) return { value, percentage, trend: "up" };
  if (value < 0) return { value, percentage, trend: "down" };
  return { value, percentage, trend: "neutral" };
};

export default function RapportsPage() {
  const [reportData, setReportData] =
    useState<ReportStats>(generateReportData());
  const [selectedPeriod, setSelectedPeriod] = useState<
    "today" | "week" | "month"
  >("today");
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-rafraîchissement toutes les heures
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setReportData(generateReportData());
    }, 60000); // Toutes les minutes

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const currentData =
    selectedPeriod === "today"
      ? reportData.today
      : selectedPeriod === "week"
        ? reportData.thisWeek
        : reportData.thisMonth;

  const previousData =
    selectedPeriod === "today"
      ? reportData.yesterday
      : selectedPeriod === "week"
        ? reportData.lastWeek
        : reportData.lastMonth;

  const ordersVariation = calculateVariation(
    currentData.totalOrders,
    previousData.totalOrders,
  );
  const revenueVariation = calculateVariation(
    currentData.revenue,
    previousData.revenue,
  );
  const fuelVariation = calculateVariation(
    currentData.fuelConsumed,
    previousData.fuelConsumed,
  );

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Rapports"
          description="Analyse intelligente des performances quotidiennes"
          showControls={true}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Commandes du jour
                    </p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {currentData.totalOrders.toLocaleString("fr-FR")}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {ordersVariation.trend !== "neutral" && (
                        <>
                          {ordersVariation.trend === "up" ? (
                            <TrendUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendDown className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm ${
                              ordersVariation.trend === "up"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {ordersVariation.percentage > 0 ? "+" : ""}
                            {ordersVariation.percentage}%
                          </span>
                        </>
                      )}
                      <span className="text-xs text-muted-foreground">
                        par rapport à hier
                      </span>
                    </div>
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
                      Chiffre d'affaires
                    </p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {currentData.revenue.toLocaleString("fr-FR")} FCFA
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {revenueVariation.trend !== "neutral" && (
                        <>
                          {revenueVariation.trend === "up" ? (
                            <TrendUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendDown className="w-4 h-4 text-red-500" />
                          )}
                          <span
                            className={`text-sm ${
                              revenueVariation.trend === "up"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {revenueVariation.percentage > 0 ? "+" : ""}
                            {revenueVariation.percentage}%
                          </span>
                        </>
                      )}
                      <span className="text-xs text-muted-foreground">
                        par rapport à hier
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                    <CurrencyRub className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Carburant consommé
                    </p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {currentData.fuelConsumed.toLocaleString("fr-FR")} L
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {fuelVariation.trend !== "neutral" && (
                        <>
                          {fuelVariation.trend === "up" ? (
                            <TrendUp className="w-4 h-4 text-red-500" />
                          ) : (
                            <TrendDown className="w-4 h-4 text-green-500" />
                          )}
                          <span
                            className={`text-sm ${
                              fuelVariation.trend === "up"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {fuelVariation.percentage > 0 ? "+" : ""}
                            {fuelVariation.percentage}%
                          </span>
                        </>
                      )}
                      <span className="text-xs text-muted-foreground">
                        par rapport à hier
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                    <Drop className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Véhicules actifs
                    </p>
                    <p className="text-2xl font-bold text-card-foreground">
                      {currentData.activeVehicles.toLocaleString("fr-FR")}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-sm ${
                          currentData.activeVehicles >= 10
                            ? "text-green-500"
                            : "text-orange-500"
                        }`}
                      >
                        {currentData.activeVehicles >= 10
                          ? "Optimal"
                          : "Insuffisant"}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contrôles */}
          <Card className="bg-secondary/50 border-border mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Contrôles du rapport</CardTitle>
              <CardDescription>
                Génération automatique et périodes d'analyse
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Période d'analyse
                  </label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) =>
                      setSelectedPeriod(
                        e.target.value as "today" | "week" | "month",
                      )
                    }
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="today">Aujourd'hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                  </select>
                </div>

                <Button
                  onClick={() => setReportData(generateReportData())}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 h-10"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Générer maintenant
                </Button>

                <Button
                  variant={autoRefresh ? "default" : "outline"}
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className="bg-background border border-border text-card-foreground hover:bg-secondary/50 h-10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Auto-rafraîchissement: {autoRefresh ? "ON" : "OFF"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tableau détaillé */}
          <Card className="bg-secondary/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Rapport détaillé</CardTitle>
              <CardDescription>
                Analyse comparative des performances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Période
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Commandes
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Complétées
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Revenus
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Carburant (L)
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Véhicules
                      </th>
                      <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                        Nouveaux clients
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span className="font-medium text-card-foreground">
                            Aujourd'hui
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-card-foreground">
                        {currentData.totalOrders.toLocaleString("fr-FR")}
                      </td>
                      <td className="p-4 text-sm text-card-foreground">
                        {currentData.completedOrders.toLocaleString("fr-FR")}
                      </td>
                      <td className="p-4 text-sm text-card-foreground">
                        {currentData.revenue.toLocaleString("fr-FR")} FCFA
                      </td>
                      <td className="p-4 text-sm text-card-foreground">
                        {currentData.fuelConsumed.toLocaleString("fr-FR")}
                      </td>
                      <td className="p-4 text-sm text-card-foreground">
                        {currentData.activeVehicles.toLocaleString("fr-FR")}
                      </td>
                      <td className="p-4 text-sm text-card-foreground">
                        {currentData.newCustomers.toLocaleString("fr-FR")}
                      </td>
                    </tr>
                    <tr className="border-b border-border hover:bg-secondary/50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-card-foreground">
                            Hier
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {previousData.totalOrders.toLocaleString("fr-FR")}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {previousData.completedOrders.toLocaleString("fr-FR")}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {previousData.revenue.toLocaleString("fr-FR")} FCFA
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {previousData.fuelConsumed.toLocaleString("fr-FR")}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {previousData.activeVehicles.toLocaleString("fr-FR")}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {previousData.newCustomers.toLocaleString("fr-FR")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Alertes intelligentes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-secondary/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Warning className="w-5 h-5 text-yellow-500" />
                  Alertes de performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ordersVariation.trend === "down" ? (
                    <div className="flex items-center gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                      <TrendDown className="w-4 h-4 text-red-500" />
                      <div>
                        <p className="font-medium text-card-foreground">
                          Baisse des commandes
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Math.abs(ordersVariation.percentage)}% de moins
                          qu'hier
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <TrendUp className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="font-medium text-card-foreground">
                          Bonne performance
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Les commandes sont en hausse de{" "}
                          {ordersVariation.percentage}%
                        </p>
                      </div>
                    </div>
                  )}

                  {fuelVariation.trend === "up" ? (
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <Warning className="w-4 h-4 text-yellow-500" />
                      <div>
                        <p className="font-medium text-card-foreground">
                          Consommation élevée
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {fuelVariation.percentage}% d'augmentation du
                          carburant
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium text-card-foreground">
                          Consommation optimisée
                        </p>
                        <p className="text-sm text-muted-foreground">
                          La consommation de carburant est stable
                        </p>
                      </div>
                    </div>
                  )}

                  {currentData.activeVehicles < 10 ? (
                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Users className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium text-card-foreground">
                          Flotte sous-utilisée
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Seulement {currentData.activeVehicles} véhicules
                          actifs sur {12} disponibles
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="font-medium text-card-foreground">
                          Flotte bien utilisée
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {currentData.activeVehicles} véhicules actifs
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Recommandations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="font-medium text-card-foreground">
                        Performance excellente
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Taux de complétion de{" "}
                        {Math.round(
                          (currentData.completedOrders /
                            currentData.totalOrders) *
                            100,
                        )}
                        %
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <ChartLine className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="font-medium text-card-foreground">
                        Optimisation possible
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Réduire la consommation de 15% pour économiser ~125 000
                        FCFA/mois
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
