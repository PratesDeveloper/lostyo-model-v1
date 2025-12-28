"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
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

export const Navbar = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const loggedCookie = Cookies.get('lostyo_roblox_logged');
      if (loggedCookie === 'true') {
        setIsLogged(true);
        
        // Tenta buscar o perfil mais recente (que é o que acabou de logar)
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();
        
        if (data) {
          setProfile(data);
        } else {
          // Se o cookie estiver lá, mas o perfil não for encontrado, desloga
          Cookies.remove('lostyo_roblox_logged');
          setIsLogged(false);
        }
      }
    };
    checkLogin();
  }, []);

  const handleLogout = () => {
    Cookies.remove('lostyo_roblox_logged');
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
      <div className="w-full max-w-5xl h-16 glass rounded-full flex items-center justify-between px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="https://cdn.lostyo.com/logo.png" 
            alt="Lostyo Studios" 
            className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-500" 
          />
          <span className="font-black tracking-tighter text-xl text-white">Lostyo Studios</span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          <Link href="#games" className="hover:text-white transition-colors">Experiences</Link>
          <Link href="#services" className="hover:text-white transition-colors">Services</Link>
          {!isLogged && <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>}
        </div>

        <div className="flex items-center gap-4">
          {isLogged && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-3 pl-1 pr-4 py-1 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/5 cursor-pointer group">
                  <Avatar className="w-9 h-9 border-2 border-transparent group-hover:border-blue-500 transition-all">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback className="bg-blue-600 text-white"><User size={16} /></AvatarFallback>
                  </Avatar>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest hidden sm:block">
                    {profile.roblox_display_name}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#0F0F11] border-white/10 text-white rounded-2xl p-2 mt-2">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer">
                    <LayoutDashboard size={18} className="text-blue-500" />
                    <span className="font-bold text-xs uppercase tracking-widest">Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 cursor-pointer">
                  <LogOut size={18} />
                  <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <button className="px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-white/5">
                Work with us
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};