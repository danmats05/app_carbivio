import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex h-screen bg-[#151514] overflow-hidden">
      <Sidebar isAdmin={false} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName={session?.name as string | undefined} />
        <main className="flex-1 overflow-y-auto pt-[65px] lg:pt-0">
          {children}
        </main>
      </div>
    </div>
  );
}
