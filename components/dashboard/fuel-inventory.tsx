"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useFont } from "@/hooks/useFont";
import { NumberTextWrapper } from "@/components/ui/number-text-wrapper";
import { CarbivioBadge } from "@/components/ui/carbivio-badge";
import { useState, useEffect } from "react";

interface StockItem {
  id: string;
  name: string;
  type: "Carburant" | "Batterie" | "Huile moteur" | "Pneus";
  capacity: number;
  current: number;
  status: "normal" | "low" | "critical";
}

const stocks: StockItem[] = [
  {
    id: "1",
    name: "Diesel",
    type: "Carburant",
    capacity: 50000,
    current: 45200,
    status: "normal",
  },
  {
    id: "2",
    name: "Sans Plomb 95",
    type: "Carburant",
    capacity: 30000,
    current: 12300,
    status: "low",
  },
  {
    id: "3",
    name: "Batterie 12V",
    type: "Batterie",
    capacity: 500,
    current: 145,
    status: "critical",
  },
  {
    id: "4",
    name: "Huile moteur 15W40",
    type: "Huile moteur",
    capacity: 5000,
    current: 3800,
    status: "normal",
  },
  {
    id: "5",
    name: "Pneus 195/65R15",
    type: "Pneus",
    capacity: 200,
    current: 87,
    status: "low",
  },
  {
    id: "6",
    name: "GPL",
    type: "Carburant",
    capacity: 20000,
    current: 18500,
    status: "normal",
  },
];

const statusConfig = {
  normal: { label: "Normal", className: "bg-primary/20 text-primary" },
  low: { label: "Bas", className: "bg-accent/20 text-accent" },
  critical: {
    label: "Critique",
    className: "bg-destructive/20 text-destructive",
  },
};

export function FuelInventory() {
  const { smallNumbers, small } = useFont();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Démarrer l'animation après un court délai
    const timeout = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">
          Inventaire Carbivio
        </CardTitle>
        <CardDescription>
          Stock des produits et services (Carburant, Batteries, Huile, Pneus)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 max-h-64 overflow-y-auto">
        {stocks.map((item, index) => {
          const percentage = Math.round((item.current / item.capacity) * 100);
          const unit =
            item.type === "Pneus"
              ? "unités"
              : item.type === "Batterie"
                ? "unités"
                : "L";
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <NumberTextWrapper className="font-medium text-card-foreground">
                    {item.name}
                  </NumberTextWrapper>
                  <CarbivioBadge variant="disponible" size="sm">
                    {item.type}
                  </CarbivioBadge>
                </div>
                <CarbivioBadge
                  variant={
                    item.status === "normal"
                      ? "disponible"
                      : item.status === "low"
                        ? "en-route"
                        : "hors-service"
                  }
                  size="sm"
                >
                  {statusConfig[item.status].label}
                </CarbivioBadge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        item.status === "normal" &&
                          "bg-linear-to-r from-primary/80 to-primary",
                        item.status === "low" &&
                          "bg-linear-to-r from-accent/80 to-accent",
                        item.status === "critical" &&
                          "bg-linear-to-r from-destructive/80 to-destructive",
                      )}
                      style={{
                        width: isAnimated ? `${percentage}%` : "0%",
                        transitionDelay: isAnimated
                          ? `${index * 150}ms`
                          : "0ms",
                      }}
                    />
                  </div>
                </div>
                <span
                  className={cn(
                    "text-sm text-muted-foreground w-24 text-right font-medium",
                    smallNumbers,
                  )}
                >
                  {item.current.toLocaleString("fr-FR")} {unit}
                </span>
              </div>
              <div
                className={cn(
                  "flex justify-between text-xs text-muted-foreground",
                  small,
                )}
              >
                <span className={smallNumbers}>{percentage}% de capacité</span>
                <span>
                  Max:{" "}
                  <span className={smallNumbers}>
                    {item.capacity.toLocaleString("fr-FR")}
                  </span>{" "}
                  {unit}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
