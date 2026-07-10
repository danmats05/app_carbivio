import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carbivio — Espace Chauffeur",
};

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#151514]">
      {children}
    </div>
  );
}
