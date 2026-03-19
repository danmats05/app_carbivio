"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { 
  FileText, 
  MapPin, 
  Calendar, 
  User,
  Filter,
  Search,
  Eye,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { getAllRequests, updateRequestStatus } from "@/services/requests";

interface Request {
  id: string;
  serviceType: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function AdminRequests() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchTerm, statusFilter]);

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      const data = await getAllRequests();
      setRequests(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des demandes");
      console.error("Requests error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = requests;

    // Filtrer par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Filtrer par recherche
    if (searchTerm) {
      filtered = filtered.filter(req => 
        req.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  };

  const handleStatusUpdate = async (requestId: string, newStatus: string) => {
    try {
      await updateRequestStatus(requestId, newStatus, "admin");
      toast.success("Statut mis à jour avec succès");
      loadRequests();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut");
      console.error("Status update error:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-500/20 text-emerald-500";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-500";
      case "REJECTED":
        return "bg-red-500/20 text-red-500";
      case "COMPLETED":
        return "bg-blue-500/20 text-blue-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "Approuvée";
      case "PENDING":
        return "En attente";
      case "REJECTED":
        return "Rejetée";
      case "COMPLETED":
        return "Terminée";
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#eca226] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            href="/admin"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-heuvel">Retour au tableau de bord</span>
          </Link>
        </div>
        <h1 className="font-montserrat font-extrabold text-4xl text-white mb-2">
          Gestion des demandes
        </h1>
        <p className="text-white/60">
          {filteredRequests.length} demande{filteredRequests.length > 1 ? "s" : ""} trouvée{filteredRequests.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Rechercher par service, utilisateur ou localisation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#eca226] font-heuvel"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#eca226] font-heuvel appearance-none cursor-pointer"
          >
            <option value="all" className="bg-[#151514">Tous les statuts</option>
            <option value="PENDING" className="bg-[#151514">En attente</option>
            <option value="APPROVED" className="bg-[#151514">Approuvées</option>
            <option value="REJECTED" className="bg-[#151514">Rejetées</option>
            <option value="COMPLETED" className="bg-[#151514">Terminées</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 text-lg font-heuvel">Aucune demande trouvée</p>
            <p className="text-white/40 text-sm mt-2 font-heuvel">
              {searchTerm || statusFilter !== "all" 
                ? "Essayez de modifier vos filtres" 
                : "Les demandes apparaîtront ici quand les clients en feront"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/60 font-medium font-heuvel">Service</th>
                  <th className="text-left p-4 text-white/60 font-medium font-heuvel">Client</th>
                  <th className="text-left p-4 text-white/60 font-medium font-heuvel">Localisation</th>
                  <th className="text-left p-4 text-white/60 font-medium font-heuvel">Date</th>
                  <th className="text-left p-4 text-white/60 font-medium font-heuvel">Statut</th>
                  <th className="text-left p-4 text-white/60 font-medium font-heuvel">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium font-heuvel">{request.serviceType}</p>
                        <p className="text-white/40 text-sm mt-1 font-heuvel line-clamp-2">
                          {request.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-white font-medium font-heuvel">{request.user.name}</p>
                        <p className="text-white/40 text-sm font-heuvel">{request.user.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#eca226]" />
                        <span className="text-white font-heuvel">{request.location}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-white/60 text-sm font-heuvel">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium font-heuvel ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/requests/${request.id}`}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </Link>
                        
                        {request.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(request.id, "APPROVED")}
                              className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 rounded-lg transition-colors text-sm font-heuvel"
                            >
                              Approuver
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(request.id, "REJECTED")}
                              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg transition-colors text-sm font-heuvel"
                            >
                              Rejeter
                            </button>
                          </>
                        )}
                        
                        {request.status === "APPROVED" && (
                          <button
                            onClick={() => handleStatusUpdate(request.id, "COMPLETED")}
                            className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 rounded-lg transition-colors text-sm font-heuvel"
                          >
                            Terminer
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
