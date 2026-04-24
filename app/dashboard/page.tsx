"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { DeliveryChart } from "@/components/dashboard/delivery-chart";
import { FuelInventory } from "@/components/dashboard/fuel-inventory";
import { FleetStatus } from "@/components/dashboard/fleet-status";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { usePeriodData } from "@/hooks/usePeriodData";

export default function DashboardPage() {
  const { period, data, updatePeriod } = usePeriodData("7d");

  return (
    <div className="flex h-screen bg-background">
      <div className="relative">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onPeriodChange={updatePeriod} currentPeriod={period} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-400 mx-auto">
            <KpiCards />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <DeliveryChart data={data} period={period} />
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
