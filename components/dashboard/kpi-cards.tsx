"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendUp,
  TrendDown,
  Truck,
  GasPump,
  CurrencyDollar,
  Users,
  Lightning,
  Drop,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useFont } from "@/hooks/useFont";

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  subtitle?: string;
}

function KpiCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  subtitle,
}: KpiCardProps) {
  const { kpiTitle, kpiValue, kpiChange } = useFont();

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle
          className={cn("text-sm font-medium text-muted-foreground", kpiTitle)}
        >
          {title}
        </CardTitle>
        <div className="p-3 rounded-full border-2 border-dashed border-primary">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={cn("text-2xl font-bold text-card-foreground", kpiValue)}
        >
          {value}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div
            className={cn(
              "flex items-center text-xs font-medium",
              changeType === "positive" && "text-primary",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground",
              kpiChange,
            )}
          >
            {changeType === "positive" && <TrendUp className="w-3 h-3 mr-1" />}
            {changeType === "negative" && (
              <TrendDown className="w-3 h-3 mr-1" />
            )}
            {change}
          </div>
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiCards() {
  const kpis: KpiCardProps[] = [
    {
      title: "Livraisons aujourd'hui",
      value: "52",
      change: "+15%",
      changeType: "positive",
      icon: Truck,
      subtitle: "vs hier",
    },
    {
      title: "Carburant livré",
      value: "145 200 L",
      change: "+18.5%",
      changeType: "positive",
      icon: Drop,
      subtitle: "cette semaine",
    },
    {
      title: "Chiffre d'affaires",
      value: "142 770 000 FCFA",
      change: "+12.3%",
      changeType: "positive",
      icon: CurrencyDollar,
      subtitle: "ce mois",
    },
    {
      title: "Clients actifs",
      value: "1 589",
      change: "+8.7%",
      changeType: "positive",
      icon: Users,
      subtitle: "vs mois dernier",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
