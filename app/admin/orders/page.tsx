"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  Wrench,
  MapPin,
} from "lucide-react";

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
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      // Simuler des données de commandes plus complètes
      const mockOrders: Order[] = [
        {
          id: "1",
          customerName: "Marie Dubois",
          customerEmail: "marie.dubois@email.com",
          customerPhone: "+221 77 123 45 67",
          serviceType: "Livraison d'essence",
          items: [
            "Essence SP95 - 20L",
            "Service d'urgence",
            "Livraison express",
          ],
          totalAmount: 25000,
          status: "completed",
          location: "Dakar, Plateau - Rue de Thiong",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(
            Date.now() + 30 * 60 * 1000,
          ).toISOString(),
          notes: "Client satisfait, demande rapide",
          paymentMethod: "Wave",
          paymentStatus: "paid",
        },
        {
          id: "2",
          customerName: "Jean Pierre",
          customerEmail: "jean.pierre@email.com",
          customerPhone: "+221 76 987 65 43",
          serviceType: "Vidange",
          items: [
            "Vidange complète",
            "Filtre à huile",
            "Huile 5W30 - 5L",
            "Main d'œuvre",
          ],
          totalAmount: 35000,
          status: "in_progress",
          location: "Dakar, Almadies - Villa N°123",
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(
            Date.now() + 60 * 60 * 1000,
          ).toISOString(),
          notes: "Client régulier, demande fidélisation",
          paymentMethod: "Orange Money",
          paymentStatus: "paid",
        },
        {
          id: "3",
          customerName: "Aminata Fall",
          customerEmail: "aminata.fall@email.com",
          customerPhone: "+221 78 234 56 78",
          serviceType: "Réparation pneu",
          items: [
            "Changement pneu avant",
            "Équilibrage 4 pneus",
            "Chambre à air",
          ],
          totalAmount: 15000,
          status: "pending",
          location: "Pikine - Quartier Guédiawaye",
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(
            Date.now() + 90 * 60 * 1000,
          ).toISOString(),
          notes: "Urgent, client bloqué sur route",
          paymentMethod: "Espèces",
          paymentStatus: "pending",
        },
        {
          id: "4",
          customerName: "Baba Cissé",
          customerEmail: "baba.cisse@email.com",
          customerPhone: "+221 77 456 78 90",
          serviceType: "Batterie",
          items: ["Nouvelle batterie 12V", "Installation", "Garantie 1 an"],
          totalAmount: 45000,
          status: "confirmed",
          location: "Thiaroye - Marché",
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          estimatedDelivery: new Date(
            Date.now() + 45 * 60 * 1000,
          ).toISOString(),
          notes: "Batterie complètement morte",
          paymentMethod: "Carte bancaire",
          paymentStatus: "paid",
        },
        {
          id: "5",
          customerName: "Fatou Sarr",
          customerEmail: "fatou.sarr@email.com",
          customerPhone: "+221 76 345 67 89",
          serviceType: "Livraison d'essence",
          items: ["Diesel - 30L", "Livraison express", "Canne de 20L"],
          totalAmount: 35000,
          status: "completed",
          location: "Dakar, Ouakam - STADE",
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          notes: "Livraison rapide, client content",
          paymentMethod: "Wave",
          paymentStatus: "paid",
        },
        {
          id: "6",
          customerName: "Moussa Diop",
          customerEmail: "moussa.diop@email.com",
          customerPhone: "+221 78 567 89 01",
          serviceType: "Diagnostic complet",
          items: [
            "Diagnostic moteur",
            "Diagnostic électrique",
            "Rapport détaillé",
          ],
          totalAmount: 20000,
          status: "cancelled",
          location: "Dakar, Grand Yoff",
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          notes: "Annulation par le client",
          paymentMethod: "Orange Money",
          paymentStatus: "failed",
        },
      ];

      setOrders(mockOrders);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500 bg-yellow-500/10";
      case "confirmed":
        return "text-blue-500 bg-blue-500/10";
      case "in_progress":
        return "text-purple-500 bg-purple-500/10";
      case "completed":
        return "text-green-500 bg-green-500/10";
      case "cancelled":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "confirmed":
        return "Confirmée";
      case "in_progress":
        return "En cours";
      case "completed":
        return "Terminée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <Eye className="w-4 h-4" />;
      case "in_progress":
        return <Wrench className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-500 bg-green-500/10";
      case "pending":
        return "text-yellow-500 bg-yellow-500/10";
      case "failed":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Payée";
      case "pending":
        return "En attente";
      case "failed":
        return "Échouée";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          <h1 className="text-3xl font-bold text-white">Commandes</h1>
          <p className="text-white/60 mt-1">
            Gérez toutes les commandes des clients
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher par client, email ou service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#eca226]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#eca226]"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmées</option>
          <option value="in_progress">En cours</option>
          <option value="completed">Terminées</option>
          <option value="cancelled">Annulées</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white numbers-idgrotesk">
                {orders.length}
              </div>
              <div className="text-white/60 text-sm">Total commandes</div>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Filter className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white numbers-idgrotesk">
                {orders.filter((o) => o.status === "pending").length}
              </div>
              <div className="text-white/60 text-sm">En attente</div>
            </div>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white numbers-idgrotesk">
                {orders.filter((o) => o.status === "in_progress").length}
              </div>
              <div className="text-white/60 text-sm">En cours</div>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Wrench className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white numbers-idgrotesk">
                {orders.filter((o) => o.status === "completed").length}
              </div>
              <div className="text-white/60 text-sm">Terminées</div>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">
                  Commande
                </th>
                <th className="text-left p-4 text-white/60 font-medium">
                  Client
                </th>
                <th className="text-left p-4 text-white/60 font-medium">
                  Service
                </th>
                <th className="text-left p-4 text-white/60 font-medium">
                  Articles
                </th>
                <th className="text-left p-4 text-white/60 font-medium">
                  Montant
                </th>
                <th className="text-left p-4 text-white/60 font-medium">
                  Statut
                </th>
                <th className="text-left p-4 text-white/60 font-medium">
                  Paiement
                </th>
                <th className="text-left p-4 text-white/60 font-medium">
                  Date
                </th>
                <th className="text-left p-4 text-white/60 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="text-white font-medium font-idgrotesk">
                      #{order.id}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-white font-medium font-idgrotesk">
                        {order.customerName}
                      </div>
                      <div className="text-white/40 text-sm font-idgrotesk">
                        {order.customerEmail}
                      </div>
                      <div className="text-white/40 text-sm font-idgrotesk">
                        {order.customerPhone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-idgrotesk">
                      {order.serviceType}
                    </div>
                    <div className="text-white/40 text-sm flex items-center gap-1 font-idgrotesk">
                      <MapPin className="w-3 h-3" />
                      {order.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white text-sm max-w-xs font-idgrotesk">
                      {order.items.slice(0, 2).join(", ")}
                      {order.items.length > 2 && (
                        <span className="text-white/40 font-idgrotesk">
                          {" "}
                          +{order.items.length - 2} autres
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium numbers-idgrotesk">
                      {order.totalAmount.toLocaleString()} FCFA
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}
                    >
                      {getPaymentStatusText(order.paymentStatus)}
                    </div>
                    <div className="text-white/40 text-xs mt-1">
                      {order.paymentMethod}
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[#eca226] hover:text-[#d4911f] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-white/60 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#151514] border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">
                  Détails de la commande #{selectedOrder.id}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-white/60 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-white font-medium mb-3">
                  Informations client
                </h3>
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Nom:</span>
                    <span className="text-white">
                      {selectedOrder.customerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Email:</span>
                    <span className="text-white font-idgrotesk">
                      {selectedOrder.customerEmail}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Téléphone:</span>
                    <span className="text-white font-idgrotesk">
                      {selectedOrder.customerPhone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Localisation:</span>
                    <span className="text-white">{selectedOrder.location}</span>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div>
                <h3 className="text-white font-medium mb-3">
                  Détails de la commande
                </h3>
                <div className="bg-white/5 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/60">Service:</span>
                    <span className="text-white">
                      {selectedOrder.serviceType}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/60">Articles:</span>
                    <ul className="mt-2 space-y-1">
                      {selectedOrder.items.map((item, index) => (
                        <li key={index} className="text-white ml-4">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Montant total:</span>
                    <span className="text-white font-medium numbers-idgrotesk">
                      {selectedOrder.totalAmount.toLocaleString()} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Méthode de paiement:</span>
                    <span className="text-white">
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Statut paiement:</span>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}
                    >
                      {getPaymentStatusText(selectedOrder.paymentStatus)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-white font-medium mb-3">Historique</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#eca226] rounded-full mt-2"></div>
                    <div>
                      <div className="text-white text-sm">Commande créée</div>
                      <div className="text-white/40 text-xs numbers-idgrotesk">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {selectedOrder.estimatedDelivery && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <div className="text-white text-sm">
                          Livraison estimée
                        </div>
                        <div className="text-white/40 text-xs numbers-idgrotesk">
                          {new Date(
                            selectedOrder.estimatedDelivery,
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h3 className="text-white font-medium mb-3">Notes</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white">{selectedOrder.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
