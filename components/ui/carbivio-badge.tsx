"use client";

import { cn } from "@/lib/utils";
import { Dot } from "@/components/foundations/dot-icon";

interface CarbivioBadgeProps {
  children: React.ReactNode;
  variant: "disponible" | "en-route" | "hors-service" | "maintenance";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CarbivioBadge({
  children,
  variant,
  size = "sm",
  className,
}: CarbivioBadgeProps) {
  const variantStyles = {
    disponible: "bg-green-500/20 text-green-600 border-green-500/30",
    "en-route": "bg-white/20 text-white border-white/30",
    "hors-service": "bg-red-500/20 text-red-600 border-red-500/30",
    maintenance: "bg-red-500/20 text-red-600 border-red-500/30",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      <Dot className="w-1.5 h-1.5" />
      <span>{children}</span>
    </div>
  );
}
