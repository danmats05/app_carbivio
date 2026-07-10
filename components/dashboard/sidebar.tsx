"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartLine,
  Truck,
  Package,
  ChartBar,
  Gear,
  CaretLeft,
  Toolbox,
  FileText,
} from "@phosphor-icons/react";

const menuItems = [
  { icon: ChartLine, label: "Vue d'ensemble", href: "/admin" },
  { icon: Package, label: "Stock", href: "/stock" },
  { icon: Truck, label: "Flotte", href: "/flotte", badge: "12" },
  { icon: FileText, label: "Commandes", href: "/commandes" },
  { icon: Toolbox, label: "Ressources", href: "/ressources", badge: "3" },
  { icon: ChartBar, label: "Rapports", href: "/rapports" },
];

const bottomMenuItems = [
  { icon: Gear, label: "Paramètres", href: "/parametres" },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center">
          <Image
            src="/Favicon_carbivio.png"
            alt="Carbivio"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground">
              Dashboard
            </span>
            <span className="text-xs text-muted-foreground">
              Admin: Dumix MABANZA
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/20 text-primary text-xs px-2"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 space-y-1 border-t border-sidebar-border">
        {bottomMenuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Collapse button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar border border-sidebar-border shadow-sm hover:bg-sidebar-accent"
      >
        <CaretLeft
          className={cn(
            "w-4 h-4 transition-transform",
            collapsed && "rotate-180",
          )}
        />
      </Button>
    </aside>
  );
}
