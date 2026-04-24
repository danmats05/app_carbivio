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
  icons: {
    icon: "/vraifav.png",
    shortcut: "/vraifav.png",
    apple: "/vraifav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/vraifav.png" type="image/png" />
        <link rel="apple-touch-icon" href="/vraifav.png" />
      </head>
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
