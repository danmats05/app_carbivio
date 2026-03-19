"use client";

import { Bell } from "lucide-react";

interface HeaderProps {
  userName?: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className="hidden lg:flex sticky top-0 z-40 items-center justify-between px-6 py-4 border-b border-white/5 bg-[#151514]/80 backdrop-blur-xl">
      <div />
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all text-white/60 hover:text-white border border-white/5">
          <Bell className="h-4 w-4" />
        </button>
        {userName && (
          <div className="flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-[#eca226]/20 border border-[#eca226]/30 flex items-center justify-center">
              <span className="text-[#eca226] font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium text-white/70">
              {userName}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
