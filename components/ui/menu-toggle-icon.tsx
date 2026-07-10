"use client";
import { cn } from "@/lib/utils";

interface MenuToggleIconProps {
  open: boolean;
  className?: string;
  duration?: number;
}

export function MenuToggleIcon({ open, className, duration = 300 }: MenuToggleIconProps) {
  return (
    <span className={cn("flex w-full flex-col gap-1.25 items-center justify-center", className)}>
      <span
        className="block w-full h-0.5 bg-current rounded-full origin-center"
        style={{
          transition: `transform ${duration}ms ease`,
          transform: open ? "rotate(45deg) translateY(7px)" : "none",
        }}
      />
      <span
        className="block w-full h-0.5 bg-current rounded-full"
        style={{
          transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
          opacity: open ? 0 : 1,
          transform: open ? "scaleX(0)" : "none",
        }}
      />
      <span
        className="block w-full h-0.5 bg-current rounded-full origin-center"
        style={{
          transition: `transform ${duration}ms ease`,
          transform: open ? "rotate(-45deg) translateY(-7px)" : "none",
        }}
      />
    </span>
  );
}
