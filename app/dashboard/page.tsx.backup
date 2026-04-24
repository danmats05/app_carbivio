import { getSession } from "@/lib/session";
import { getUserRequests } from "@/services/requests";
import Link from "next/link";
import {
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

const statusConfig: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  PENDING: { label: "En attente", color: "#FFAA00", icon: Clock },
  APPROVED: { label: "Approuvée", color: "#eca226", icon: Loader2 },
  REJECTED: { label: "Rejetée", color: "#FF4D4D", icon: XCircle },
  COMPLETED: { label: "Terminée", color: "#00D68F", icon: CheckCircle2 },
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const requests = await getUserRequests(session.id as string);

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 lg:space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-white/30 text-xs font-medium uppercase tracking-widest mb-2">
            Tableau de bord
          </p>
          <h1 className="font-montserrat font-extrabold text-3xl lg:text-4xl text-white">
            Mes demandes
          </h1>
          <p className="text-white/40 mt-1 text-sm">
            Vos demandes de service sont validées automatiquement !
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#eca226] text-black font-bold text-sm hover:bg-[#d4911f] transition-all duration-200 shadow-[0_0_24px_rgba(236,162,38,0.35)] shrink-0"
        >
          <Plus className="h-4 w-4" /> Nouvelle demande
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl bg-[#231304] border border-white/5">
          <div className="w-14 h-14 rounded-full bg-[#eca226]/10 flex items-center justify-center mb-4">
            <Plus className="h-6 w-6 text-[#eca226]" />
          </div>
          <h3 className="font-montserrat font-bold text-lg text-white mb-2">
            Prêt à commencer ?
          </h3>
          <p className="text-white/30 mb-6 text-sm text-center px-4">
            Créez votre première demande de service. Validation instantanée
            garantie !
          </p>
          <Link
            href="/dashboard/create"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#eca226] text-black font-bold text-sm hover:bg-[#d4911f] transition-all"
          >
            Créer une demande <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {(requests as any[]).map((r) => {
            const config = statusConfig[r.status] || statusConfig.PENDING;
            const StatusIcon = config.icon;
            return (
              <div
                key={r.id}
                className="flex items-center gap-3 lg:gap-4 rounded-2xl lg:rounded-3xl bg-[#231304] border border-white/5 p-4 lg:p-5 hover:border-white/10 transition-all duration-200"
              >
                <div
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${config.color}18`,
                    color: config.color,
                  }}
                >
                  <StatusIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm lg:text-base truncate">
                    {r.serviceType}
                  </div>
                  <div className="text-white/30 text-xs lg:text-sm truncate">
                    {r.location}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    className="text-[11px] lg:text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: `${config.color}18`,
                      color: config.color,
                    }}
                  >
                    {config.label}
                  </div>
                  <div className="text-white/20 text-[10px] lg:text-xs mt-1.5">
                    {new Date(r.createdAt).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
