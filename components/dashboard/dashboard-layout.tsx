"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <div className="relative">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 max-w-[1600px] mx-auto">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
