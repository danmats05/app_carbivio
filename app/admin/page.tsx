"use client";

import { useState, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Wrench, 
  ShoppingCart,
  Calendar,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

// Types
interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  items: string[];
  totalAmount: number;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  location: string;
  createdAt: string;
  estimatedDelivery?: string;
  notes?: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
    monthlyGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Simuler des données de commandes
      const mockOrders: Order[] = [
        {
          id: "1",
          customerName: "Marie Dubois",
          customerEmail: "marie.dubois@email.com",
          customerPhone: "+221 77 123 45 67",
          serviceType: "Livraison d'essence",
          items: ["Essence SP95 - 20L", "Service d'urgence"],
          totalAmount: 25000,
          status: "completed",
          location: "Dakar, Plateau",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          notes: "Client satisfait"
        },
        {
          id: "2",
          customerName: "Jean Pierre",
          customerEmail: "jean.pierre@email.com",
          customerPhone: "+221 76 987 65 43",
          serviceType: "Vidange",
          items: ["Vidange complète", "Filtre à huile", "Huile 5W30"],
          totalAmount: 35000,
          status: "in_progress",
          location: "Dakar, Almadies",
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        },
        {
          id: "3",
          customerName: "Aminata Fall",
          customerEmail: "aminata.fall@email.com",
          customerPhone: "+221 78 234 56 78",
          serviceType: "Réparation pneu",
          items: ["Changement pneu avant", "Équilibrage"],
          totalAmount: 15000,
          status: "pending",
          location: "Pikine",
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
        },
        {
          id: "4",
          customerName: "Baba Cissé",
          customerEmail: "baba.cisse@email.com",
          customerPhone: "+221 77 456 78 90",
          serviceType: "Batterie",
          items: ["Nouvelle batterie", "Installation"],
          totalAmount: 45000,
          status: "confirmed",
          location: "Thiaroye",
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
        },
        {
          id: "5",
          customerName: "Fatou Sarr",
          customerEmail: "fatou.sarr@email.com",
          customerPhone: "+221 76 345 67 89",
          serviceType: "Livraison d'essence",
          items: ["Diesel - 30L", "Livraison express"],
          totalAmount: 35000,
          status: "completed",
          location: "Dakar, Ouakam",
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          notes: "Livraison rapide"
        },
      ];

      setOrders(mockOrders);

      // Calculer les statistiques
      const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const totalOrders = mockOrders.length;
      const pendingOrders = mockOrders.filter(o => o.status === "pending").length;
      const completedOrders = mockOrders.filter(o => o.status === "completed").length;
      const totalCustomers = new Set(mockOrders.map(o => o.customerEmail)).size;
      const averageOrderValue = totalRevenue / totalOrders;

      setStats({
        totalRevenue,
        totalOrders,
        pendingOrders,
        completedOrders,
        totalCustomers,
        averageOrderValue,
        monthlyGrowth: 15.3,
      });

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-500 bg-yellow-500/10";
      case "confirmed": return "text-blue-500 bg-blue-500/10";
      case "in_progress": return "text-purple-500 bg-purple-500/10";
      case "completed": return "text-green-500 bg-green-500/10";
      case "cancelled": return "text-red-500 bg-red-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "En attente";
      case "confirmed": return "Confirmée";
      case "in_progress": return "En cours";
      case "completed": return "Terminée";
      case "cancelled": return "Annulée";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "confirmed": return <Eye className="w-4 h-4" />;
      case "in_progress": return <Wrench className="w-4 h-4" />;
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full border-2 border-[#eca226]/30 border-t-[#eca226] w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <p className="text-white/60 mt-1">Vue d'ensemble de votre activité Carbivio</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#eca226]"
          >
            <option value="7days">7 derniers jours</option>
            <option value="30days">30 derniers jours</option>
            <option value="90days">90 derniers jours</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#eca226] text-black rounded-lg hover:bg-[#d4911f] transition-colors">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#eca226]/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-[#eca226]" />
            </div>
            <span className="text-green-500 text-sm">+{stats.monthlyGrowth}%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stats.totalRevenue.toLocaleString()} FCFA
          </div>
          <p className="text-white/60 text-sm">Revenus totaux</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-blue-500 text-sm">{stats.pendingOrders} en attente</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stats.totalOrders}
          </div>
          <p className="text-white/60 text-sm">Commandes totales</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm">+12%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stats.totalCustomers}
          </div>
          <p className="text-white/60 text-sm">Clients actifs</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-purple-500 text-sm">+8%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {Math.round(stats.averageOrderValue).toLocaleString()} FCFA
          </div>
          <p className="text-white/60 text-sm">Panier moyen</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Évolution des revenus</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 80, 45, 90, 75, 85, 95].map((height, index) => (
              <div key={index} className="flex-1 bg-[#eca226]/20 rounded-t-lg relative group hover:bg-[#eca226]/30 transition-colors">
                <div 
                  className="bg-[#eca226] rounded-t-lg transition-all duration-300"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {Math.round(height * 1000)} FCFA
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-white/40">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>
        </div>

        {/* Services Distribution */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Répartition des services</h2>
          <div className="space-y-3">
            {[
              { name: "Livraison d'essence", value: 45, color: "bg-[#eca226]" },
              { name: "Vidange", value: 25, color: "bg-blue-500" },
              { name: "Réparation pneu", value: 15, color: "bg-green-500" },
              { name: "Batterie", value: 10, color: "bg-purple-500" },
              { name: "Autres", value: 5, color: "bg-gray-500" },
            ].map((service, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-20 text-sm text-white/60">{service.name}</div>
                <div className="flex-1 bg-white/10 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`h-full ${service.color} transition-all duration-500`}
                    style={{ width: `${service.value}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-white text-right">{service.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white/5 border border-white/10 rounded-xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Commandes récentes</h2>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-white/60 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <Filter className="w-4 h-4" />
                Filtrer
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">Client</th>
                <th className="text-left p-4 text-white/60 font-medium">Service</th>
                <th className="text-left p-4 text-white/60 font-medium">Articles</th>
                <th className="text-left p-4 text-white/60 font-medium">Montant</th>
                <th className="text-left p-4 text-white/60 font-medium">Statut</th>
                <th className="text-left p-4 text-white/60 font-medium">Date</th>
                <th className="text-left p-4 text-white/60 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium">{order.customerName}</div>
                      <div className="text-white/40 text-sm">{order.customerEmail}</div>
                      <div className="text-white/40 text-sm">{order.customerPhone}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{order.serviceType}</div>
                    <div className="text-white/40 text-sm">{order.location}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white text-sm">
                      {order.items.join(", ")}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">
                      {order.totalAmount.toLocaleString()} FCFA
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-white/40 text-xs">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="text-[#eca226] hover:text-[#d4911f] transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
