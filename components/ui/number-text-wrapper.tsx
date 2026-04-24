"use client";

import { cn } from "@/lib/utils";

interface NumberTextWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component that forces numbers-idgrotesk font on all content
 * Use this for any text that contains numbers or mixed content
 */
export function NumberTextWrapper({ children, className }: NumberTextWrapperProps) {
  return (
    <span className={cn("numbers-idgrotesk", className)}>
      {children}
    </span>
  );
}
