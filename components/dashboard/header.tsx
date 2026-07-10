"use client";

import { useState, useEffect, useRef } from "react";
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
import { toast } from "sonner";
import type { OrderNotification } from "@/lib/notifications";

const SERVICE_LABELS: Record<string, string> = {
  carburant: "Carburant",
  batterie:  "Batterie",
  huile:     "Huile moteur",
  pneus:     "Pneus",
  urgence:   "Urgence",
};

const STORAGE_KEY = "carbivio_unread_notifs";

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)   return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  return `Il y a ${Math.floor(diff / 3600)} h`;
}

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
  const [notifications, setNotifications]   = useState<OrderNotification[]>([]);
  const [unreadCount, setUnreadCount]        = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const stored = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
    return isNaN(stored) ? 0 : stored;
  });
  const [open, setOpen]                      = useState(false);
  const esRef                                = useRef<EventSource | null>(null);

  // Charger les notifications historiques depuis l'API
  useEffect(() => {
    fetch("/api/notifications/recent")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: OrderNotification[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data);
        }
      })
      .catch(() => {});
  }, []);

  // SSE — nouvelles commandes en temps réel
  useEffect(() => {
    const es = new EventSource("/api/notifications/stream");
    esRef.current = es;

    es.addEventListener("new_order", (e) => {
      const notif: OrderNotification = JSON.parse(e.data);
      const label = SERVICE_LABELS[notif.serviceType] ?? notif.serviceType;

      toast(`🛎 Nouvelle commande — ${label}`, {
        description: `${notif.clientName} · ${notif.location}`,
        duration: 8000,
        action: {
          label: "Voir",
          onClick: () => (window.location.href = "/commandes"),
        },
      });

      setNotifications((prev) => {
        if (prev.some((p) => p.id === notif.id)) return prev;
        return [notif, ...prev].slice(0, 20);
      });

      setUnreadCount((n) => {
        const next = n + 1;
        localStorage.setItem(STORAGE_KEY, String(next));
        return next;
      });
    });

    return () => { es.close(); };
  }, []);

  // Quand le dropdown s'ouvre : marquer tout comme lu
  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val) {
      setUnreadCount(0);
      localStorage.setItem(STORAGE_KEY, "0");
    }
  };

  const handlePeriodChange = (value: string) => {
    const period = value as PeriodType;
    setSelectedPeriod(period);
    onPeriodChange?.(period);
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

      <div className="flex items-center gap-3">
        {/* Sélecteur de période — uniquement sur les pages avec controls */}
        {showControls && (
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
        )}

        {/* Cloche notifications — toujours visible */}
        <DropdownMenu open={open} onOpenChange={handleOpenChange}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="relative bg-secondary border-border"
            >
              <Bell
                className="w-4 h-4 text-foreground"
                weight={unreadCount > 0 ? "fill" : "regular"}
              />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center leading-none">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 bg-popover border-border">
            <DropdownMenuLabel className="text-popover-foreground flex items-center justify-between">
              <span>Notifications</span>
              {notifications.length > 0 && (
                <span className="text-xs text-muted-foreground font-normal">
                  {notifications.length} commande{notifications.length > 1 ? "s" : ""}
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />

            {notifications.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Aucune notification pour l&apos;instant
              </div>
            ) : (
              notifications.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="flex flex-col items-start gap-1 text-popover-foreground cursor-pointer"
                  onClick={() => (window.location.href = "/commandes")}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold text-sm">
                      {SERVICE_LABELS[n.serviceType] ?? n.serviceType}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {timeAgo(n.createdAt)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {n.clientName} · {n.location}
                  </span>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
