"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Fuel,
  BatteryCharging,
  Wrench,
  CircleDot,
  TriangleAlert,
  X,
  Menu,
  type LucideIcon,
} from "lucide-react";

type ServiceLink = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const serviceLinks: ServiceLink[] = [
  {
    title: "Carburant",
    description: "Livraison en moins de 20 min, 24h/24",
    icon: Fuel,
  },
  {
    title: "Batterie",
    description: "Recharge et remplacement sur place",
    icon: BatteryCharging,
  },
  {
    title: "Huile moteur",
    description: "Vidange et maintenance moteur",
    icon: Wrench,
  },
  {
    title: "Pneus",
    description: "Dépannage et remplacement immédiat",
    icon: CircleDot,
  },
  {
    title: "Urgence",
    description: "Assistance d'urgence 24h/24 et 7j/7",
    icon: TriangleAlert,
  },
];

function ServiceItem({
  item,
  onClick,
}: {
  item: ServiceLink;
  onClick?: () => void;
}) {
  return (
    <NavigationMenuLink asChild>
      <a
        href="#services"
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        className="flex flex-row gap-x-3 hover:bg-white/10 focus:bg-white/10 rounded-lg p-2.5 transition-colors cursor-pointer outline-none"
      >
        <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/5 shadow-sm">
          <item.icon className="size-5 text-[#eca226]" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-medium text-white text-sm">{item.title}</span>
          <span className="text-white/50 text-xs leading-tight">
            {item.description}
          </span>
        </div>
      </a>
    </NavigationMenuLink>
  );
}

function MobileServiceItem({
  item,
  onClick,
}: {
  item: ServiceLink;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={() => onClick?.()}
      className="flex flex-row gap-x-3 hover:bg-white/10 rounded-lg p-2.5 transition-colors cursor-pointer outline-none text-left w-full"
    >
      <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-md border border-white/20 bg-white/5 shadow-sm">
        <item.icon className="size-5 text-[#eca226]" />
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-medium text-white text-sm">{item.title}</span>
        <span className="text-white/50 text-xs leading-tight">
          {item.description}
        </span>
      </div>
    </button>
  );
}

type MobileMenuProps = React.ComponentProps<"div"> & { open: boolean };

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setHasMounted(true); }, []);

  useEffect(() => {
    if (!hasMounted) return;
    if (open) {
      setIsRendered(true);
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setIsVisible(true))
      );
      return () => cancelAnimationFrame(raf);
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setIsRendered(false), 350);
      return () => clearTimeout(t);
    }
  }, [open, hasMounted]);

  if (!hasMounted || !isRendered) return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        "fixed top-25 left-0 right-0 bottom-0 z-40 flex flex-col overflow-hidden md:hidden",
        "transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3",
      )}
    >
      {/* Fond — transparent en haut pour effacer la ligne, opaque ensuite */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent from-[0%] via-[#0f0f0e]/95 via-[40%] to-[#0f0f0e]/95 backdrop-blur-2xl" />

      {/* Contenu */}
      <div
        className={cn("relative z-10 size-full p-4 overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

interface CarbivioNavbarProps {
  onServiceClick?: (service: string) => void;
}

export function CarbivioNavbar({ onServiceClick }: CarbivioNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Avantages", href: "#avantages" },
    { label: "À propos", href: "/about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "/contact" },
  ];

  const handleServiceSelect = (title: string) => {
    onServiceClick?.(title);
    setMobileOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 ease-in-out",
        isVisible || mobileOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0",
      )}
    >
      <div className="flex items-center justify-between px-5 py-3.5 md:rounded-full md:bg-white/[0.07] md:backdrop-blur-2xl md:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/navbar-logo.png"
            alt="Carbivio"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop NavigationMenu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white/60 hover:text-white hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white h-auto py-1.5 px-3 text-sm rounded-md">
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <div className="w-120 bg-[#1c1c1a]">
                  <ul className="grid grid-cols-2 gap-1 p-2">
                    {serviceLinks.map((item) => (
                      <li key={item.title}>
                        <ServiceItem
                          item={item}
                          onClick={() => handleServiceSelect(item.title)}
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-2.5 border-t border-white/10">
                    <p className="text-white/40 text-xs">
                      Service disponible{" "}
                      <span className="text-[#eca226]">24h/24, 7j/7</span>
                    </p>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {navLinks.map((link) => (
              <NavigationMenuItem key={link.label}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="px-3 py-1.5 text-sm text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/10 inline-flex"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTAs + Hamburger */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden md:block px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            className="hidden md:inline-flex px-4 py-2 rounded-full bg-[#eca226] text-black font-bold text-sm hover:bg-[#d4911f] transition-all shadow-[0_0_20px_rgba(236,162,38,0.3)]"
          >
            S&apos;inscrire
          </Link>
          <button
            className="md:hidden p-2 ml-1 text-white rounded-md hover:bg-white/10 transition-colors size-9 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu via portal */}
      <MobileMenu
        open={mobileOpen}
        className="flex flex-col justify-between gap-6"
      >
        <div className="flex flex-col gap-1">
          {/* Bloc services — même style que le dropdown desktop */}
          <div className="rounded-xl overflow-hidden border border-white/10 bg-[#1c1c1a]">
            <ul className="grid grid-cols-2 gap-1 p-2">
              {serviceLinks.map((item) => (
                <li key={item.title}>
                  <MobileServiceItem
                    item={item}
                    onClick={() => handleServiceSelect(item.title)}
                  />
                </li>
              ))}
            </ul>
            <div className="px-4 py-2.5 border-t border-white/10">
              <p className="text-white/40 text-xs">
                Service disponible{" "}
                <span className="text-[#eca226]">24h/24, 7j/7</span>
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10 my-3" />

          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 px-2 text-white/70 hover:text-white transition-colors font-medium border-b border-white/5 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 pb-2">
          <Link
            href="/login"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center py-3 text-white/70 hover:text-white transition-colors border border-white/20 rounded-full font-medium text-sm"
          >
            Connexion
          </Link>
          <Link
            href="/register"
            onClick={() => setMobileOpen(false)}
            className="w-full text-center py-3 bg-[#eca226] text-black font-bold rounded-full hover:bg-[#d4911f] transition-all text-sm"
          >
            S&apos;inscrire
          </Link>
        </div>
      </MobileMenu>
    </nav>
  );
}
