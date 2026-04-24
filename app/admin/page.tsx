"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { DeliveryChart } from "@/components/dashboard/delivery-chart";
import { FuelInventory } from "@/components/dashboard/fuel-inventory";
import { FleetStatus } from "@/components/dashboard/fleet-status";
import { RecentOrders } from "@/components/dashboard/recent-orders";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <div className="relative">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-400 mx-auto">
            <KpiCards />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DeliveryChart
                data={[
                  { date: "Lun", livraisons: 45, volume: 120 },
                  { date: "Mar", livraisons: 52, volume: 145 },
                  { date: "Mer", livraisons: 38, volume: 98 },
                  { date: "Jeu", livraisons: 65, volume: 178 },
                  { date: "Ven", livraisons: 48, volume: 132 },
                  { date: "Sam", livraisons: 28, volume: 76 },
                  { date: "Dim", livraisons: 15, volume: 42 },
                ]}
                period="7 jours"
              />
              <FuelInventory />
            </div>

            <FleetStatus />

            <RecentOrders />
          </div>
        </main>
      </div>
    </div>
  );
}
