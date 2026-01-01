"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, LayoutDashboard } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Cookies from 'js-cookie';
import { getProfileByRobloxId } from '@/app/actions/profile';

export const Navbar = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const loggedCookie = Cookies.get('lostyo_roblox_logged');
      const robloxId = Cookies.get('lostyo_roblox_id');

      if (loggedCookie === 'true' && robloxId) {
        setIsLogged(true);
        const data = await getProfileByRobloxId(robloxId);
        if (data) setProfile(data);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = () => {
    Cookies.remove('lostyo_roblox_logged');
    Cookies.remove('lostyo_roblox_id');
    window.location.href = '/';
  };
  
  const isDeveloper = profile?.is_developer ?? false;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-8 px-4 md:px-6">
      <div className="w-full max-w-5xl h-14 md:h-16 bg-[#F5F5F5]/90 backdrop-blur-md rounded-full flex items-center justify-between px-6 md:px-8 shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
          <span className="font-black tracking-tighter text-sm md:text-base text-[#3B82F6] uppercase">Lostyo</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-6 md:gap-8 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-black/40">
            <a href="#games" className="hover:text-black transition-colors">Experience</a>
            <a href="#services" className="hover:text-black transition-colors">Services</a>
          </div>

          {/* O acesso ao dashboard agora é discreto e só aparece se já estiver logado */}
          {isLogged && profile && (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar className="w-8 h-8 md:w-9 md:h-9 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="bg-[#3B82F6] text-white"><User size={14} /></AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-none text-black rounded-[1.5rem] p-3 mt-4 shadow-xl">
                <div className="px-4 py-3 mb-2">
                  <div className="text-[9px] font-black text-[#3B82F6] uppercase tracking-widest mb-0.5">Connected</div>
                  <div className="text-xs font-black truncate">{profile.roblox_display_name}</div>
                </div>
                {isDeveloper && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard-admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 cursor-pointer transition-colors">
                      <LayoutDashboard size={14} className="text-[#3B82F6]" />
                      <span className="font-bold text-[10px] uppercase tracking-widest">Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-black/5 mx-2 my-2" />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500 cursor-pointer transition-colors">
                  <LogOut size={14} />
                  <span className="font-bold text-[10px] uppercase tracking-widest">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};