import { Topbar } from "@/components/topbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
import { DataTable } from "@/components/data-table";
import {
  DollarSign,
  TrendingUp,
  Users,
  Target,
  Plus,
  Car,
  MapPin,
  Wrench,
  Clock,
} from "lucide-react";

const dashboardStats = [
  {
    title: "Revenus mensuels",
    value: "2 850 000 FCFA",
    description: "+12.5% par rapport au mois dernier",
    icon: DollarSign,
  },
  {
    title: "Services terminés",
    value: "47",
    description: "+8 par rapport au mois dernier",
    icon: Wrench,
  },
  {
    title: "Nouveaux clients",
    value: "23",
    description: "+15% d'acquisition client",
    icon: Users,
  },
  {
    title: "Taux de satisfaction",
    value: "94.2%",
    description: "+2.1% satisfaction globale",
    icon: TrendingUp,
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight font-heuvel">
            Tableau de bord Carbivio
          </h2>
          <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button className="bg-[#eca226] hover:bg-[#d4911f] text-black font-heuvel">
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle demande
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-[#151514] border border-white/10">
            <TabsTrigger
              value="overview"
              className="text-white data-[state=active]:bg-[#eca226] data-[state=active]:text-black font-heuvel"
            >
              Aperçu
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-white data-[state=active]:bg-[#eca226] data-[state=active]:text-black font-heuvel"
            >
              Analytiques
            </TabsTrigger>
            <TabsTrigger
              value="deals"
              className="text-white data-[state=active]:bg-[#eca226] data-[state=active]:text-black font-heuvel"
            >
              Demandes
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="text-white data-[state=active]:bg-[#eca226] data-[state=active]:text-black font-heuvel"
            >
              Rapports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat, index) => (
                <Card
                  key={index}
                  className="bg-[#151514] border border-white/10"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white font-heuvel">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-[#eca226]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white font-heuvel numbers-idgrotesk">
                      {stat.value}
                    </div>
                    <p className="text-xs text-white/60 font-heuvel">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-[#151514] border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-heuvel">
                    Aperçu des revenus
                  </CardTitle>
                  <CardDescription className="text-white/60 font-heuvel">
                    Revenus mensuels et services terminés
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3 bg-[#151514] border border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-heuvel">
                    Services récents
                  </CardTitle>
                  <CardDescription className="text-white/60 font-heuvel">
                    Derniers services terminés par l'équipe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="deals" className="space-y-4">
            <Card className="bg-[#151514] border border-white/10">
              <CardHeader>
                <CardTitle className="text-white font-heuvel">
                  Toutes les demandes
                </CardTitle>
                <CardDescription className="text-white/60 font-heuvel">
                  Vue complète de toutes les demandes avec filtrage avancé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {dashboardStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Detailed analytics and performance metrics coming soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  Advanced analytics features will be available here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and download comprehensive sales reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                  Report generation features will be available here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
