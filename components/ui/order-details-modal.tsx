"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CarbivioBadge } from "@/components/ui/carbivio-badge";
import {
  X,
  MapPin,
  Phone,
  Envelope,
  Calendar,
  Clock,
  CurrencyDollar,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Compass,
  Star,
  Note,
} from "@phosphor-icons/react";

// Types pour le modal
interface OrderDetailsModalProps {
  order: {
    id: string;
    customer: string;
    customerPhone: string;
    customerEmail: string;
    items: Array<{
      id: string;
      name: string;
      category: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }>;
    status: string;
    priority: string;
    totalAmount: number;
    orderDate: string;
    estimatedDelivery: string;
    deliveryAddress: string;
    paymentMethod: string;
    paymentStatus: string;
    notes?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

// Configuration des statuts
const statusConfig = {
  "en-attente": { label: "En attente", color: "en-route" },
  confirmee: { label: "Confirmée", color: "disponible" },
  "en-preparation": { label: "En préparation", color: "en-route" },
  prete: { label: "Prête", color: "disponible" },
  "en-livraison": { label: "En livraison", color: "en-route" },
  livree: { label: "Livrée", color: "disponible" },
  annulee: { label: "Annulée", color: "hors-service" },
};

const priorityConfig = {
  basse: { label: "Basse", color: "disponible" },
  normale: { label: "Normale", color: "en-route" },
  haute: { label: "Haute", color: "hors-service" },
  urgente: { label: "Urgente", color: "hors-service" },
};

const paymentConfig = {
  "en-attente": { label: "En attente", color: "hors-service" },
  payee: { label: "Payé", color: "disponible" },
  partiel: { label: "Partiel", color: "en-route" },
  annulee: { label: "Annulé", color: "hors-service" },
};

const paymentMethodConfig = {
  especes: { label: "Espèces", icon: CurrencyDollar },
  carte: { label: "Carte", icon: CreditCard },
  mobile: { label: "Mobile", icon: Phone },
  virement: { label: "Virement", icon: Bank },
};

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  const [isGettingDirections, setIsGettingDirections] = useState(false);

  if (!isOpen || !order) return null;

  const handleGetDirections = () => {
    setIsGettingDirections(true);
    // Simuler l'obtention des directions GPS
    setTimeout(() => {
      setIsGettingDirections(false);
      // Ouvrir Google Maps avec l'adresse
      const encodedAddress = encodeURIComponent(order.deliveryAddress);
      window.open(
        `https://maps.google.com/maps?q=${encodedAddress}&daddr=${encodedAddress}`,
        "_blank",
      );
    }, 1500);
  };

  const handleTrackDelivery = () => {
    // Simuler le suivi de livraison
    console.log("Suivi de livraison pour", order.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay avec effet blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal centré */}
      <div className="relative bg-card border border-border rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header du modal */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-card-foreground">
                {order.id}
              </h2>
              <p className="text-sm text-muted-foreground">
                Détails de la commande
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-card-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Contenu du modal */}
        <div className="p-6 space-y-6">
          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-dashed border-primary/50 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Date de commande
                    </p>
                    <p className="text-sm font-medium text-card-foreground">
                      {order.orderDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-dashed border-orange-500/50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Livraison prévue
                    </p>
                    <p className="text-sm font-medium text-card-foreground">
                      {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-dashed border-green-500/50 flex items-center justify-center">
                    <CurrencyDollar className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Montant total
                    </p>
                    <p className="text-sm font-medium text-card-foreground">
                      {(order.totalAmount / 1000).toFixed(0)}K FCFA
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statuts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Statut</p>
                    <CarbivioBadge
                      variant={
                        statusConfig[order.status as keyof typeof statusConfig]
                          .color as "disponible" | "en-route" | "hors-service"
                      }
                      size="sm"
                      className="mt-1"
                    >
                      {
                        statusConfig[order.status as keyof typeof statusConfig]
                          .label
                      }
                    </CarbivioBadge>
                  </div>
                  {order.status === "livree" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : order.status === "annulee" ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Priorité</p>
                    <CarbivioBadge
                      variant={
                        priorityConfig[
                          order.priority as keyof typeof priorityConfig
                        ].color as "disponible" | "en-route" | "hors-service"
                      }
                      size="sm"
                      className="mt-1"
                    >
                      {
                        priorityConfig[
                          order.priority as keyof typeof priorityConfig
                        ].label
                      }
                    </CarbivioBadge>
                  </div>
                  <Star className="w-5 h-5 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Paiement</p>
                    <CarbivioBadge
                      variant={
                        paymentConfig[
                          order.paymentStatus as keyof typeof paymentConfig
                        ].color as "disponible" | "en-route" | "hors-service"
                      }
                      size="sm"
                      className="mt-1"
                    >
                      {
                        paymentConfig[
                          order.paymentStatus as keyof typeof paymentConfig
                        ].label
                      }
                    </CarbivioBadge>
                  </div>
                  <CurrencyDollar className="w-5 h-5 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations client */}
          <Card className="bg-secondary/50 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-dashed border-blue-500/50 flex items-center justify-center">
                  <Phone className="w-3 h-3 text-blue-500" />
                </div>
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-card-foreground mb-1">
                    {order.customer}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      <span>{order.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Envelope className="w-3 h-3" />
                      <span className="truncate max-w-50">
                        {order.customerEmail}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground mb-1">
                    Méthode de paiement
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {(() => {
                      const method =
                        paymentMethodConfig[
                          order.paymentMethod as keyof typeof paymentMethodConfig
                        ];
                      const Icon = method?.icon || CurrencyDollar;
                      return <Icon className="w-3 h-3" />;
                    })()}
                    <span>
                      {
                        paymentMethodConfig[
                          order.paymentMethod as keyof typeof paymentMethodConfig
                        ]?.label
                      }
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Localisation de livraison */}
          <Card className="bg-secondary/50 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-dashed border-orange-500/50 flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-orange-500" />
                </div>
                Localisation de livraison
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-card-foreground">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>{order.deliveryAddress}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGetDirections}
                    disabled={isGettingDirections}
                    className="flex items-center gap-2"
                  >
                    {isGettingDirections ? (
                      <>
                        <div className="w-3 h-3 border border-primary border-t-transparent rounded-full animate-spin" />
                        <span>Chargement...</span>
                      </>
                    ) : (
                      <>
                        <Compass className="w-3 h-3" />
                        <span>Obtenir l'itinéraire</span>
                      </>
                    )}
                  </Button>
                  {order.status === "en-livraison" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleTrackDelivery}
                      className="flex items-center gap-2"
                    >
                      <Truck className="w-3 h-3" />
                      <span>Suivre la livraison</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Articles commandés */}
          <Card className="bg-secondary/50 border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border border-dashed border-purple-500/50 flex items-center justify-center">
                  <Package className="w-3 h-3 text-purple-500" />
                </div>
                Articles commandés ({order.items.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.category} • {item.quantity} ×{" "}
                        {(item.unitPrice / 1000).toFixed(0)}K FCFA
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">
                        {(item.totalPrice / 1000).toFixed(0)}K FCFA
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {order.notes && (
            <Card className="bg-secondary/50 border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-dashed border-yellow-500/50 flex items-center justify-center">
                    <Note className="w-3 h-3 text-yellow-500" />
                  </div>
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-card-foreground bg-background p-3 rounded-lg border border-border">
                  {order.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer du modal */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary/30">
          <div className="text-sm text-muted-foreground">
            Dernière mise à jour: {new Date().toLocaleString("fr-SN")}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            {order.status === "en-livraison" && (
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Confirmer livraison
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons manquants
import { CreditCard, Bank } from "@phosphor-icons/react";
