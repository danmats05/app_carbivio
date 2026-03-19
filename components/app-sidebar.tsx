"use client";

import {
  BarChart3,
  Contact,
  Home,
  Settings,
  Zap,
  CheckSquare,
  DollarSign,
  Wrench,
  Users,
  FileText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Tableau de bord",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Demandes",
    url: "/admin/requests",
    icon: FileText,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Wrench,
  },
  {
    title: "Clients",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Revenus",
    url: "/admin/revenue",
    icon: DollarSign,
  },
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Paramètres",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-white/10 bg-[#151514]">
      <SidebarHeader className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eca226] text-black">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold text-white">
            Carbivio Admin
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-white hover:bg-white/10 data-[active]:bg-[#eca226] data-[active]:text-black"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="John Doe"
              className="object-cover"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Sales Manager</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
