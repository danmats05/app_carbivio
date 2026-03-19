"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  ScrollText,
  Plus,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface SidebarProps {
  isAdmin?: boolean;
}

const adminRoutes = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/requests", label: "Demandes", icon: FileText },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/logs", label: "Activité", icon: ScrollText },
];

const userRoutes = [
  { href: "/dashboard", label: "Mes demandes", icon: FileText },
  { href: "/dashboard/create", label: "Nouvelle demande", icon: Plus },
];

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const routes = isAdmin ? adminRoutes : userRoutes;

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
        <div className="w-8 h-8 rounded-full bg-[#eca226] flex items-center justify-center shrink-0">
          <span className="text-black font-bold text-sm">C</span>
        </div>
        <span className="font-montserrat font-bold text-lg text-white tracking-tight">
          Carbivio
        </span>
        {isAdmin && (
          <span className="ml-auto text-[10px] font-semibold tracking-widest uppercase bg-[#eca226]/10 text-[#eca226] border border-[#eca226]/20 rounded-full px-2 py-0.5 shrink-0">
            Admin
          </span>
        )}
        {/* Close button mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto lg:hidden text-white/40 hover:text-white p-1"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[#eca226] text-black shadow-[0_0_20px_rgba(236,162,38,0.3)]"
                  : "text-white/50 hover:text-white hover:bg-white/5",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {route.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-[#151514]/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#eca226] flex items-center justify-center">
            <span className="text-black font-bold text-xs">C</span>
          </div>
          <span className="font-montserrat font-bold text-base text-white">
            Carbivio
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#151514]/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-[#1a0d02] border-r border-white/5 z-50 transition-transform duration-300 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col h-full w-64 shrink-0 bg-[#1a0d02] border-r border-white/5">
        <SidebarContent />
      </aside>
    </>
  );
}
