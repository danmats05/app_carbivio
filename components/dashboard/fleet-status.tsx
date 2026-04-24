"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarbivioBadge } from "@/components/ui/carbivio-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Truck, MapPin, Clock, GasPump } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useFont } from "@/hooks/useFont";
import { NumberTextWrapper } from "@/components/ui/number-text-wrapper";

interface Vehicle {
  id: string;
  plate: string;
  driver: string;
  driverInitials: string;
  status: "en-route" | "loading" | "available" | "maintenance";
  location: string;
  fuelLevel: number;
  currentDelivery?: string;
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    plate: "AB-123-CD",
    driver: "Pierre Martin",
    driverInitials: "PM",
    status: "en-route",
    location: "Dakar - Autoroute",
    fuelLevel: 75,
    currentDelivery: "Station Total #142",
  },
  {
    id: "2",
    plate: "EF-456-GH",
    driver: "Marie Leroy",
    driverInitials: "ML",
    status: "loading",
    location: "Dépôt Central",
    fuelLevel: 90,
    currentDelivery: "Chargement 25000L Diesel",
  },
  {
    id: "3",
    plate: "IJ-789-KL",
    driver: "Thomas Bernard",
    driverInitials: "TB",
    status: "available",
    location: "Dépôt Nord",
    fuelLevel: 60,
  },
  {
    id: "4",
    plate: "MN-012-OP",
    driver: "Sophie Dubois",
    driverInitials: "SD",
    status: "en-route",
    location: "Thiès - Route Nationale",
    fuelLevel: 45,
    currentDelivery: "Station BP #89",
  },
  {
    id: "5",
    plate: "QR-345-ST",
    driver: "Lucas Petit",
    driverInitials: "LP",
    status: "maintenance",
    location: "Garage Central",
    fuelLevel: 30,
  },
];

const statusConfig = {
  "en-route": {
    label: "En route",
    className: "bg-primary/20 text-primary",
    dotColor: "bg-primary",
  },
  loading: {
    label: "Chargement",
    className: "bg-chart-2/20 text-chart-2",
    dotColor: "bg-chart-2",
  },
  available: {
    label: "Disponible",
    className: "bg-accent/20 text-accent",
    dotColor: "bg-accent",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-destructive/20 text-destructive",
    dotColor: "bg-destructive",
  },
};

export function FleetStatus() {
  const { smallNumbers, small, tableNumber } = useFont();

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">
              État de la flotte
            </CardTitle>
            <CardDescription>Suivi en temps réel des véhicules</CardDescription>
          </div>
          <div className={cn("flex items-center gap-4 text-sm", small)}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">3 en route</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              {/* Driver Avatar */}
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/20 text-primary text-sm">
                  {vehicle.driverInitials}
                </AvatarFallback>
              </Avatar>

              {/* Vehicle & Driver Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <NumberTextWrapper className="font-medium text-card-foreground">
                    {vehicle.plate}
                  </NumberTextWrapper>
                  <CarbivioBadge
                    variant={
                      vehicle.status === "en-route"
                        ? "en-route"
                        : vehicle.status === "loading"
                          ? "disponible"
                          : vehicle.status === "available"
                            ? "disponible"
                            : "hors-service"
                    }
                    size="sm"
                  >
                    {statusConfig[vehicle.status].label}
                  </CarbivioBadge>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-4 mt-1 text-sm text-muted-foreground",
                    small,
                  )}
                >
                  <span>{vehicle.driver}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {vehicle.location}
                  </span>
                </div>
                {vehicle.currentDelivery && (
                  <div
                    className={cn(
                      "flex items-center gap-1 mt-1 text-xs text-primary",
                      small,
                    )}
                  >
                    <Clock className="w-3 h-3" />
                    {vehicle.currentDelivery}
                  </div>
                )}
              </div>

              {/* Fuel Level */}
              <div className={cn("flex items-center gap-2 text-sm", small)}>
                <GasPump className="w-4 h-4 text-muted-foreground" />
                <span
                  className={cn(
                    "font-medium",
                    vehicle.fuelLevel > 50
                      ? "text-primary"
                      : vehicle.fuelLevel > 25
                        ? "text-accent"
                        : "text-destructive",
                    smallNumbers,
                  )}
                >
                  {vehicle.fuelLevel}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
