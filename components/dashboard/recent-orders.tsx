"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarbivioBadge } from "@/components/ui/carbivio-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DotsThree, Eye, ArrowRight } from "@phosphor-icons/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useFont } from "@/hooks/useFont";
import { NumberTextWrapper } from "@/components/ui/number-text-wrapper";

interface Order {
  id: string;
  client: string;
  product: string;
  quantity: string;
  status: "pending" | "confirmed" | "in-transit" | "delivered";
  deliveryDate: string;
  amount: string;
}

const orders: Order[] = [
  {
    id: "CMD-2026-001",
    client: "Station Total Dakar",
    product: "Diesel",
    quantity: "15 000 L",
    status: "in-transit",
    deliveryDate: "21 mars 2026",
    amount: "13 500 000 FCFA",
  },
  {
    id: "CMD-2026-002",
    client: "Carrefour Thiès",
    product: "Batterie 12V",
    quantity: "85 unités",
    status: "confirmed",
    deliveryDate: "21 mars 2026",
    amount: "5 610 000 FCFA",
  },
  {
    id: "CMD-2026-003",
    client: "BP Autoroute Dakar",
    product: "Diesel Premium",
    quantity: "20 000 L",
    status: "pending",
    deliveryDate: "22 mars 2026",
    amount: "19 200 000 FCFA",
  },
  {
    id: "CMD-2026-004",
    client: "Shell Saint-Louis",
    product: "Huile moteur 15W40",
    quantity: "450 L",
    status: "delivered",
    deliveryDate: "20 mars 2026",
    amount: "2 430 000 FCFA",
  },
  {
    id: "CMD-2026-005",
    client: "Intermarché Kaolack",
    product: "Pneus 195/65R15",
    quantity: "40 unités",
    status: "confirmed",
    deliveryDate: "22 mars 2026",
    amount: "4 320 000 FCFA",
  },
];

const statusConfig = {
  pending: {
    label: "En attente",
    className: "bg-muted text-muted-foreground",
  },
  confirmed: {
    label: "Confirmée",
    className: "bg-chart-2/20 text-chart-2",
  },
  "in-transit": {
    label: "En transit",
    className: "bg-primary/20 text-primary",
  },
  delivered: {
    label: "Livrée",
    className: "bg-accent/20 text-accent",
  },
};

export function RecentOrders() {
  const { tableNumber, currency } = useFont();

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">
              Commandes récentes
            </CardTitle>
            <CardDescription>
              Suivi des dernières commandes clients
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
          >
            Voir tout
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Commande</TableHead>
              <TableHead className="text-muted-foreground">Client</TableHead>
              <TableHead className="text-muted-foreground">Produit</TableHead>
              <TableHead className="text-muted-foreground">Quantité</TableHead>
              <TableHead className="text-muted-foreground">Statut</TableHead>
              <TableHead className="text-muted-foreground">
                Date de livraison
              </TableHead>
              <TableHead className="text-muted-foreground text-right">
                Montant
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="border-border hover:bg-muted/50"
              >
                <TableCell className="font-medium text-card-foreground">
                  {order.id}
                </TableCell>
                <TableCell className="text-card-foreground">
                  {order.client}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.product}
                </TableCell>
                <TableCell className={cn("text-muted-foreground", tableNumber)}>
                  {order.quantity}
                </TableCell>
                <TableCell>
                  <CarbivioBadge
                    variant={
                      order.status === "delivered"
                        ? "disponible"
                        : order.status === "in-transit"
                          ? "en-route"
                          : order.status === "pending"
                            ? "disponible"
                            : "hors-service"
                    }
                    size="sm"
                  >
                    {statusConfig[order.status].label}
                  </CarbivioBadge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {order.deliveryDate}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium text-card-foreground",
                    currency,
                  )}
                >
                  {order.amount}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <DotsThree className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-popover border-border"
                    >
                      <DropdownMenuItem className="text-popover-foreground">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir détails
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
