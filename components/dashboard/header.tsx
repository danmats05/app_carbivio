"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Bell } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PeriodType } from "@/hooks/usePeriodData";

export function DashboardHeader({
  title,
  description,
  showControls = true,
  onPeriodChange,
  currentPeriod = "7d",
}: {
  title?: string;
  description?: string;
  showControls?: boolean;
  onPeriodChange?: (period: PeriodType) => void;
  currentPeriod?: PeriodType;
}) {
  const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod);

  const handlePeriodChange = (value: string) => {
    const period = value as PeriodType;
    console.log("DashboardHeader - handlePeriodChange appelé avec:", value);
    setSelectedPeriod(period);

    // Appeler la fonction de callback si elle existe
    if (onPeriodChange) {
      console.log("DashboardHeader - Appel de onPeriodChange avec:", period);
      onPeriodChange(period);
    } else {
      console.log("DashboardHeader - onPeriodChange est undefined");
    }

    // Logique de calcul selon la période sélectionnée
    switch (period) {
      case "today":
        console.log("Calcul pour aujourd'hui");
        break;
      case "7d":
        console.log("Calcul pour 7 derniers jours");
        break;
      case "30d":
        console.log("Calcul pour 30 derniers jours");
        break;
      case "90d":
        console.log("Calcul pour 3 mois (90 jours)");
        break;
      default:
        console.log("Période non reconnue");
    }
  };
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-background">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            {title || "Vue d'ensemble"}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {showControls && (
        <div className="flex items-center gap-4">
          {/* Date Range */}
          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-48 bg-secondary border-border">
              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">Ce trimestre</SelectItem>
            </SelectContent>
          </Select>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="relative bg-secondary border-border"
              >
                <Bell className="w-4 h-4 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-popover border-border"
            >
              <DropdownMenuLabel className="text-popover-foreground">
                Notifications
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="flex flex-col items-start gap-1 text-popover-foreground">
                <span className="font-medium">Alerte stock - Batterie 12V</span>
                <span className="text-xs text-muted-foreground">
                  Seulement 145 unités en stock
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 text-popover-foreground">
                <span className="font-medium">Nouvelle commande</span>
                <span className="text-xs text-muted-foreground">
                  Station Total Lyon - 15 000L Diesel
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 text-popover-foreground">
                <span className="font-medium">Livraison terminée</span>
                <span className="text-xs text-muted-foreground">
                  CMD-2026-004 livrée avec succès
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}
