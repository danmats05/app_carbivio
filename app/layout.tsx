import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoaderProvider } from "@/contexts/SmartLoaderContext";
import { NumberFontEnforcer } from "@/components/ui/number-font-enforcer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Carbivio SaaS",
  description: "Professional SaaS Platform",
  // Empêche la traduction automatique du navigateur (Google Translate) :
  // elle modifie le DOM et fait planter React ("removeChild NotFoundError").
  other: { google: "notranslate" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" translate="no" className="dark">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <NumberFontEnforcer />
        <LoaderProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
