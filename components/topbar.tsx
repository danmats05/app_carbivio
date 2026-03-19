"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Topbar() {
  return (
    <div className="flex items-center justify-between p-6 border-b bg-[#151514] border-white/10">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
          <Input
            placeholder="Rechercher des demandes, clients, services..."
            className="pl-10 bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#eca226]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-white hover:text-[#eca226]"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#eca226] text-black">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 bg-[#151514] border-white/10"
          >
            <DropdownMenuLabel className="text-white">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Nouvelle demande créée</p>
                <p className="text-xs text-white/60">
                  Sarah a créé une demande de livraison de carburant
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Service à terminer</p>
                <p className="text-xs text-white/60">
                  Suivre avec Acme Inc dans 2 heures
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Service terminé</p>
                <p className="text-xs text-white/60">
                  Mike a terminé une vidange pour StartupXYZ
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full text-white hover:text-[#eca226]"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Admin Carbivio"
                  className="object-cover"
                />
                <AvatarFallback className="bg-[#eca226] text-black">
                  AC
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#151514] border-white/10"
          >
            <DropdownMenuLabel className="text-white">
              Mon compte
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-white hover:bg-white/10">
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              Paramètres
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-white hover:bg-white/10 font-heuvel">
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
