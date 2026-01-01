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
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-8 px-6">
      <div className="w-full max-w-5xl h-16 bg-[#F5F5F5] rounded-full flex items-center justify-between px-8 shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-6 h-6 object-contain" />
          <span className="font-black tracking-tighter text-base text-[#3B82F6] uppercase">Lostyo</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-black/40">
            <a href="#games" className="hover:text-black transition-colors">Experience</a>
            <a href="#services" className="hover:text-black transition-colors">Services</a>
          </div>

          <div className="flex items-center gap-4">
            {isLogged && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="flex items-center gap-2 p-1 pr-4 bg-black/5 hover:bg-black/10 rounded-full transition-all cursor-pointer">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={profile.avatar_url} />
                      <AvatarFallback className="bg-[#3B82F6] text-white"><User size={16} /></AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] font-black text-black/60 uppercase tracking-widest hidden sm:block">
                      Account
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-none text-black rounded-[2rem] p-3 mt-4 shadow-xl">
                  <div className="px-4 py-4 mb-2">
                    <div className="text-[10px] font-black text-[#3B82F6] uppercase tracking-widest mb-1">User Cluster</div>
                    <div className="text-sm font-black truncate">{profile.roblox_display_name}</div>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link href={isDeveloper ? "/dashboard-admin" : "/"} className="flex items-center gap-3 p-4 rounded-2xl hover:bg-black/5 cursor-pointer transition-colors">
                      <LayoutDashboard size={16} className="text-[#3B82F6]" />
                      <span className="font-bold text-xs uppercase tracking-widest">
                        Dashboard
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-black/5 mx-2 my-2" />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 p-4 rounded-2xl hover:bg-red-50 text-red-500 cursor-pointer transition-colors">
                    <LogOut size={16} />
                    <span className="font-bold text-xs uppercase tracking-widest">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <button className="h-11 px-8 bg-[#3B82F6] text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                  Authorize
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};