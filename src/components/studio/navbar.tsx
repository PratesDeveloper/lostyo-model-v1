"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, LayoutDashboard, Code, Shield } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Cookies from 'js-cookie';

export const Navbar = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const loggedCookie = Cookies.get('lostyo_roblox_logged');
      const robloxId = Cookies.get('lostyo_roblox_id');

      if (loggedCookie === 'true' && robloxId) {
        setIsLogged(true);
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('roblox_id', robloxId)
          .single();
        
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
      <div className="w-full max-w-5xl h-14 glass rounded-full flex items-center justify-between px-6 border-white/5">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-5 h-5 object-contain" />
          <span className="font-black tracking-tighter text-sm text-white uppercase">Lostyo</span>
        </Link>

        <div className="flex items-center gap-4">
          {isLogged && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-2 pl-1 pr-3 py-1 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5 cursor-pointer">
                  <Avatar className="w-8 h-8 border border-white/10">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback className="bg-blue-600 text-white"><User size={14} /></AvatarFallback>
                  </Avatar>
                  <span className="text-[10px] font-black text-white/70 uppercase tracking-widest hidden xs:block">
                    Account
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#0D0D0F] border-white/10 text-white rounded-2xl p-2 mt-4 shadow-2xl">
                <div className="px-3 py-4 border-b border-white/5 mb-2">
                  <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Authenticated as</div>
                  <div className="text-sm font-black truncate">{profile.roblox_display_name}</div>
                </div>

                <DropdownMenuItem asChild>
                  <Link href={isDeveloper ? "/dashboard-admin" : "/"} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                    <LayoutDashboard size={16} className="text-blue-500" />
                    <span className="font-bold text-xs uppercase tracking-widest">
                      {isDeveloper ? "Admin Panel" : "Dashboard"}
                    </span>
                  </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-white/5 mx-2 my-2" />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-red-500 cursor-pointer transition-colors">
                  <LogOut size={16} />
                  <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <button className="px-5 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                Authorize
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};