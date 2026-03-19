import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoaderProvider } from "@/contexts/SmartLoaderContext";
import Loader from "@/components/Loader";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <LoaderProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
          <Loader />
        </LoaderProvider>
      </body>
    </html>
  );
}
