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
import { OrderDetailsModal } from "@/components/ui/order-details-modal";
import {
  Package,
  Clock,
  Plus,
  MagnifyingGlass,
  TrendUp,
  Truck,
  MapPin,
} from "@phosphor-icons/react";

// Types pour les commandes
interface Order {
  id: string;
  customer: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  status:
    | "en-attente"
    | "confirmee"
    | "en-preparation"
    | "prete"
    | "en-livraison"
    | "livree"
    | "annulee";
  priority: "basse" | "normale" | "haute" | "urgente";
  totalAmount: number;
  orderDate: string;
  estimatedDelivery: string;
  deliveryAddress: string;
  paymentMethod: "especes" | "carte" | "mobile" | "virement";
  paymentStatus: "en-attente" | "payee" | "partiel" | "annulee";
  notes?: string;
}

interface OrderItem {
  id: string;
  name: string;
  category: "carburant" | "huile" | "pneu" | "batterie" | "service";
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Configuration des statuts
const statusConfig = {
  "en-attente": { label: "En attente", color: "en-route" },
  confirmee: { label: "Confirmée", color: "disponible" },
  "en-preparation": { label: "En préparation", color: "en-route" },
  prete: { label: "Prête", color: "disponible" },
  "en-livraison": { label: "En livraison", color: "en-route" },
  livree: { label: "Livrée", color: "disponible" },
  annulee: { label: "Annulée", color: "hors-service" },
};

const priorityConfig = {
  basse: { label: "Basse", color: "disponible" },
  normale: { label: "Normale", color: "en-route" },
  haute: { label: "Haute", color: "hors-service" },
  urgente: { label: "Urgente", color: "hors-service" },
};

const paymentConfig = {
  "en-attente": { label: "En attente", color: "hors-service" },
  payee: { label: "Payé", color: "disponible" },
  partiel: { label: "Partiel", color: "en-route" },
  annulee: { label: "Annulé", color: "hors-service" },
};

// Données factices pour les commandes
const mockOrders: Order[] = [
  {
    id: "CMD-2024-001",
    customer: "Société Sénégal Transport",
    customerPhone: "+221 33 123 45 67",
    customerEmail: "contact@senegal-transport.sn",
    items: [
      {
        id: "1",
        name: "Sans Plomb 95",
        category: "carburant",
        quantity: 100,
        unitPrice: 850,
        totalPrice: 85000,
      },
      {
        id: "2",
        name: "Huile moteur 5W-30",
        category: "huile",
        quantity: 5,
        unitPrice: 12000,
        totalPrice: 60000,
      },
    ],
    status: "en-preparation",
    priority: "haute",
    totalAmount: 145000,
    orderDate: "12/04/2024",
    estimatedDelivery: "13/04/2024",
    deliveryAddress: "Dakar, Plateau, Rue 123",
    paymentMethod: "carte",
    paymentStatus: "payee",
    notes: "Client VIP - Livraison prioritaire",
  },
  {
    id: "CMD-2024-002",
    customer: "Distribution Kaolack",
    customerPhone: "+221 33 987 65 43",
    customerEmail: "info@kaolack-dist.sn",
    items: [
      {
        id: "3",
        name: "Gazole",
        category: "carburant",
        quantity: 200,
        unitPrice: 780,
        totalPrice: 156000,
      },
    ],
    status: "confirmee",
    priority: "normale",
    totalAmount: 156000,
    orderDate: "12/04/2024",
    estimatedDelivery: "14/04/2024",
    deliveryAddress: "Kaolack, Centre, Avenue 45",
    paymentMethod: "virement",
    paymentStatus: "en-attente",
  },
  {
    id: "CMD-2024-003",
    customer: "Service Logistique Thiès",
    customerPhone: "+221 33 456 78 90",
    customerEmail: "logistics@thies-service.sn",
    items: [
      {
        id: "4",
        name: "Pneu 205/55 R16",
        category: "pneu",
        quantity: 4,
        unitPrice: 45000,
        totalPrice: 180000,
      },
      {
        id: "5",
        name: "Batterie 12V 60Ah",
        category: "batterie",
        quantity: 2,
        unitPrice: 55000,
        totalPrice: 110000,
      },
    ],
    status: "livree",
    priority: "basse",
    totalAmount: 290000,
    orderDate: "11/04/2024",
    estimatedDelivery: "12/04/2024",
    deliveryAddress: "Thiès, Zone Industrielle",
    paymentMethod: "especes",
    paymentStatus: "payee",
  },
  {
    id: "CMD-2024-004",
    customer: "Entreprise Saint-Louis",
    customerPhone: "+221 33 234 56 78",
    customerEmail: "contact@stlouis-entreprise.sn",
    items: [
      {
        id: "6",
        name: "Service dépannage",
        category: "service",
        quantity: 1,
        unitPrice: 25000,
        totalPrice: 25000,
      },
      {
        id: "7",
        name: "Super 98",
        category: "carburant",
        quantity: 50,
        unitPrice: 920,
        totalPrice: 46000,
      },
    ],
    status: "en-livraison",
    priority: "urgente",
    totalAmount: 71000,
    orderDate: "12/04/2024",
    estimatedDelivery: "12/04/2024",
    deliveryAddress: "Saint-Louis, Port",
    paymentMethod: "mobile",
    paymentStatus: "partiel",
    notes: "Urgence - Camion en panne",
  },
  {
    id: "CMD-2024-005",
    customer: "Fournisseur Tambacounda",
    customerPhone: "+221 33 345 67 89",
    customerEmail: "orders@tamba-fournisseur.sn",
    items: [
      {
        id: "8",
        name: "Huile transmission",
        category: "huile",
        quantity: 10,
        unitPrice: 15000,
        totalPrice: 150000,
      },
    ],
    status: "annulee",
    priority: "normale",
    totalAmount: 150000,
    orderDate: "11/04/2024",
    estimatedDelivery: "13/04/2024",
    deliveryAddress: "Tambacounda, Marché",
    paymentMethod: "carte",
    paymentStatus: "annulee",
    notes: "Annulation client",
  },
];

// Composant pour les statistiques des commandes
function OrderStats({ orders }: { orders: Order[] }) {
  const totalOrders = orders.length;
  const enAttente = orders.filter((o) => o.status === "en-attente").length;
  const enPreparation = orders.filter(
    (o) => o.status === "en-preparation",
  ).length;
  const enLivraison = orders.filter((o) => o.status === "en-livraison").length;
  const livrees = orders.filter((o) => o.status === "livree").length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total commandes</p>
              <p className="text-2xl font-bold text-card-foreground">
                {totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">En attente</p>
              <p className="text-2xl font-bold text-card-foreground">
                {enAttente}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-yellow-500/50 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">En préparation</p>
              <p className="text-2xl font-bold text-card-foreground">
                {enPreparation}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">En livraison</p>
              <p className="text-2xl font-bold text-card-foreground">
                {enLivraison}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-orange-500/50 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Chiffre d'affaires
              </p>
              <p className="text-2xl font-bold text-card-foreground">
                {(totalRevenue / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-green-500/50 flex items-center justify-center">
              <TrendUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrer les commandes
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || order.priority === priorityFilter;
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesPayment;
  });

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Commandes"
          description="Gérez toutes les commandes clients et suivez leur évolution"
          showControls={true}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Statistiques */}
            <OrderStats orders={orders} />

            {/* Filtres et recherche */}
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher une commande..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="en-attente">En attente</option>
                      <option value="confirmee">Confirmée</option>
                      <option value="en-preparation">En préparation</option>
                      <option value="prete">Prête</option>
                      <option value="en-livraison">En livraison</option>
                      <option value="livree">Livrée</option>
                      <option value="annulee">Annulée</option>
                    </select>

                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">Toutes les priorités</option>
                      <option value="basse">Basse</option>
                      <option value="normale">Normale</option>
                      <option value="haute">Haute</option>
                      <option value="urgente">Urgente</option>
                    </select>

                    <select
                      value={paymentFilter}
                      onChange={(e) => setPaymentFilter(e.target.value)}
                      className="px-4 py-2 bg-background border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">Tous les paiements</option>
                      <option value="en-attente">En attente</option>
                      <option value="payee">Payé</option>
                      <option value="partiel">Partiel</option>
                      <option value="annulee">Annulé</option>
                    </select>
                  </div>

                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle commande
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tableau des commandes */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Liste des commandes</CardTitle>
                <CardDescription>
                  Gérez les informations de vos commandes clients
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Commande
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Client
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Articles
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Statut
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Priorité
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Paiement
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Montant
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-border hover:bg-secondary/50 hover:text-card-foreground cursor-pointer transition-colors duration-200"
                          onClick={() => handleOrderClick(order)}
                        >
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-card-foreground">
                                {order.id}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {order.orderDate}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium text-card-foreground">
                                {order.customer}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {order.customerPhone}
                              </p>
                              <p className="text-xs text-muted-foreground truncate max-w-50">
                                {order.customerEmail}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              {order.items.slice(0, 2).map((item) => (
                                <div key={item.id} className="text-xs">
                                  <span className="text-card-foreground">
                                    {item.name}
                                  </span>
                                  <span className="text-muted-foreground ml-1">
                                    x{item.quantity}
                                  </span>
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-xs text-muted-foreground">
                                  +{order.items.length - 2} autres
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <CarbivioBadge
                              variant={
                                statusConfig[order.status].color as
                                  | "disponible"
                                  | "en-route"
                                  | "hors-service"
                              }
                              size="sm"
                            >
                              {statusConfig[order.status].label}
                            </CarbivioBadge>
                          </td>
                          <td className="p-4">
                            <CarbivioBadge
                              variant={
                                priorityConfig[order.priority].color as
                                  | "disponible"
                                  | "en-route"
                                  | "hors-service"
                              }
                              size="sm"
                            >
                              {priorityConfig[order.priority].label}
                            </CarbivioBadge>
                          </td>
                          <td className="p-4">
                            <CarbivioBadge
                              variant={
                                paymentConfig[order.paymentStatus].color as
                                  | "disponible"
                                  | "en-route"
                                  | "hors-service"
                              }
                              size="sm"
                            >
                              {paymentConfig[order.paymentStatus].label}
                            </CarbivioBadge>
                          </td>
                          <td className="p-4 text-sm text-card-foreground">
                            {order.estimatedDelivery}
                          </td>
                          <td className="p-4 text-sm font-medium text-card-foreground">
                            {(order.totalAmount / 1000).toFixed(0)}K FCFA
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Modal de détails de commande */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
