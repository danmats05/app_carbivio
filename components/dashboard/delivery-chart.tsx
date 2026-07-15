"use client";

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useFont } from "@/hooks/useFont";
import { ChartData } from "@/hooks/usePeriodData";

interface DeliveryChartProps {
  data: ChartData[];
  period: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-card-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DeliveryChart({ data, period }: DeliveryChartProps) {
  const { chartValue, chartLabel } = useFont();

  // Le graphique n'est rendu qu'après le montage côté client : Recharts mesure
  // ainsi un conteneur déjà dimensionné et n'obtient plus width/height = -1,
  // ce qui pouvait faire planter la page sous React 19 (exception côté client).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getPeriodDescription = (period: string) => {
    switch (period) {
      case "today":
        return "Aujourd'hui";
      case "7d":
        return "7 derniers jours";
      case "30d":
        return "30 derniers jours";
      case "90d":
        return "3 derniers mois";
      default:
        return "7 derniers jours";
    }
  };

  // Système hybride : utiliser les données dynamiques si valides, sinon fallback
  const chartData =
    data && data.length > 0
      ? data
      : [
          { date: "Lun", livraisons: 32, volume: 45000 },
          { date: "Mar", livraisons: 45, volume: 62000 },
          { date: "Mer", livraisons: 38, volume: 51000 },
          { date: "Jeu", livraisons: 52, volume: 73000 },
          { date: "Ven", livraisons: 61, volume: 89000 },
          { date: "Sam", livraisons: 28, volume: 38000 },
          { date: "Dim", livraisons: 15, volume: 21000 },
        ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Activité de livraison
        </CardTitle>
        <CardDescription>
          Nombre de livraisons et volumes sur {getPeriodDescription(period)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: "300px" }}>
          {mounted && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorLivraisons"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#eca226" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#eca226" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-2)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="livraisons"
                stroke="#eca226"
                strokeWidth={2}
                fill="url(#colorLivraisons)"
              />
            </AreaChart>
          </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
