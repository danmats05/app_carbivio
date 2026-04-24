"use client";

import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  message?: string;
}

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  );
}

export function LoadingSpinner({
  message = "Chargement...",
}: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-sm w-full mx-4">
        <div className="flex flex-col items-center gap-4">
          <SpinnerCustom />
          <p className="text-sm text-muted-foreground font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}
