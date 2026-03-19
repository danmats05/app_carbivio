"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  TrendingUp,
  User,
  Star
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: string;
  registrationDate: string;
  status: "active" | "inactive" | "vip";
  loyaltyPoints: number;
  preferredServices: string[];
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      
      // Simuler des données clients
      const mockCustomers: Customer[] = [
        {
          id: "1",
          name: "Marie Dubois",
          email: "marie.dubois@email.com",
          phone: "+221 77 123 45 67",
          location: "Dakar, Plateau",
          totalOrders: 15,
          totalSpent: 450000,
          averageOrderValue: 30000,
          lastOrderDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          registrationDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          status: "vip",
          loyaltyPoints: 1250,
          preferredServices: ["Livraison d'essence", "Vidange"]
        },
        {
          id: "2",
          name: "Jean Pierre",
          email: "jean.pierre@email.com",
          phone: "+221 76 987 65 43",
          location: "Dakar, Almadies",
          totalOrders: 8,
          totalSpent: 280000,
          averageOrderValue: 35000,
          lastOrderDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          registrationDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
          loyaltyPoints: 560,
          preferredServices: ["Vidange", "Réparation pneu"]
        },
        {
          id: "3",
          name: "Aminata Fall",
          email: "aminata.fall@email.com",
          phone: "+221 78 234 56 78",
          location: "Pikine",
          totalOrders: 3,
          totalSpent: 75000,
          averageOrderValue: 25000,
          lastOrderDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          registrationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
          loyaltyPoints: 180,
          preferredServices: ["Réparation pneu", "Batterie"]
        },
        {
          id: "4",
          name: "Baba Cissé",
          email: "baba.cisse@email.com",
          phone: "+221 77 456 78 90",
          location: "Thiaroye",
          totalOrders: 12,
          totalSpent: 380000,
          averageOrderValue: 31667,
          lastOrderDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          registrationDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
          loyaltyPoints: 920,
          preferredServices: ["Batterie", "Diagnostic"]
        },
        {
          id: "5",
          name: "Fatou Sarr",
          email: "fatou.sarr@email.com",
          phone: "+221 76 345 67 89",
          location: "Dakar, Ouakam",
          totalOrders: 6,
          totalSpent: 180000,
          averageOrderValue: 30000,
          lastOrderDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          registrationDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          status: "active",
          loyaltyPoints: 420,
          preferredServices: ["Livraison d'essence"]
        },
        {
          id: "6",
          name: "Moussa Diop",
          email: "moussa.diop@email.com",
          phone: "+221 78 567 89 01",
          location: "Dakar, Grand Yoff",
          totalOrders: 1,
          totalSpent: 20000,
          averageOrderValue: 20000,
          lastOrderDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          registrationDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          status: "inactive",
          loyaltyPoints: 50,
          preferredServices: ["Diagnostic"]
        }
      ];

      setCustomers(mockCustomers);
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip": return "text-[#eca226] bg-[#eca226]/10";
      case "active": return "text-green-500 bg-green-500/10";
      case "inactive": return "text-gray-500 bg-gray-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "vip": return "VIP";
      case "active": return "Actif";
      case "inactive": return "Inactif";
      default: return status;
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
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
          <h1 className="text-3xl font-bold text-white">Clients</h1>
          <p className="text-white/60 mt-1">Gérez votre base de clients</p>
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
            placeholder="Rechercher par nom, email ou localisation..."
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
          <option value="vip">VIP</option>
          <option value="active">Actifs</option>
          <option value="inactive">Inactifs</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{customers.length}</div>
              <div className="text-white/60 text-sm">Total clients</div>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <User className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{customers.filter(c => c.status === "active").length}</div>
              <div className="text-white/60 text-sm">Clients actifs</div>
            </div>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{customers.filter(c => c.status === "vip").length}</div>
              <div className="text-white/60 text-sm">Clients VIP</div>
            </div>
            <div className="p-2 bg-[#eca226]/10 rounded-lg">
              <Star className="w-5 h-5 text-[#eca226]" />
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round(customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / customers.length).toLocaleString()} FCFA
              </div>
              <div className="text-white/60 text-sm">Panier moyen</div>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">Client</th>
                <th className="text-left p-4 text-white/60 font-medium">Contact</th>
                <th className="text-left p-4 text-white/60 font-medium">Localisation</th>
                <th className="text-left p-4 text-white/60 font-medium">Commandes</th>
                <th className="text-left p-4 text-white/60 font-medium">Dépenses</th>
                <th className="text-left p-4 text-white/60 font-medium">Statut</th>
                <th className="text-left p-4 text-white/60 font-medium">Dernière commande</th>
                <th className="text-left p-4 text-white/60 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#eca226]/20 rounded-full flex items-center justify-center">
                        <span className="text-[#eca226] font-bold text-sm">
                          {customer.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{customer.name}</div>
                        <div className="text-white/40 text-sm">Points: {customer.loyaltyPoints}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Mail className="w-3 h-3 text-white/40" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Phone className="w-3 h-3 text-white/40" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <MapPin className="w-3 h-3 text-white/40" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{customer.totalOrders}</div>
                    <div className="text-white/40 text-sm">
                      Moy: {customer.averageOrderValue.toLocaleString()} FCFA
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">
                      {customer.totalSpent.toLocaleString()} FCFA
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      {getStatusText(customer.status)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white text-sm">
                      {new Date(customer.lastOrderDate).toLocaleDateString()}
                    </div>
                    <div className="text-white/40 text-xs">
                      {new Date(customer.lastOrderDate).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-[#eca226] hover:text-[#d4911f] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#151514] border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Détails du client</h2>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="text-white/60 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-white font-medium mb-3">Informations personnelles</h3>
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Nom:</span>
                    <span className="text-white">{selectedCustomer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Email:</span>
                    <span className="text-white">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Téléphone:</span>
                    <span className="text-white">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Localisation:</span>
                    <span className="text-white">{selectedCustomer.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Statut:</span>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCustomer.status)}`}>
                      {getStatusText(selectedCustomer.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-white font-medium mb-3">Statistiques</h3>
                <div className="bg-white/5 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">Total commandes:</span>
                    <span className="text-white">{selectedCustomer.totalOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Total dépensé:</span>
                    <span className="text-white">{selectedCustomer.totalSpent.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Panier moyen:</span>
                    <span className="text-white">{selectedCustomer.averageOrderValue.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Points de fidélité:</span>
                    <span className="text-white">{selectedCustomer.loyaltyPoints}</span>
                  </div>
                </div>
              </div>

              {/* Preferred Services */}
              <div>
                <h3 className="text-white font-medium mb-3">Services préférés</h3>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedCustomer.preferredServices.map((service, index) => (
                      <span key={index} className="px-3 py-1 bg-[#eca226]/10 text-[#eca226] rounded-full text-sm">
                        {service}
                      </span>
                    ))}
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
                      <div className="text-white text-sm">Inscription</div>
                      <div className="text-white/40 text-xs">
                        {new Date(selectedCustomer.registrationDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-white text-sm">Dernière commande</div>
                      <div className="text-white/40 text-xs">
                        {new Date(selectedCustomer.lastOrderDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
