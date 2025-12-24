"use client";

import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, PlusCircle, Puzzle, LogOut, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface ProfileDropdownProps {
  user: {
    avatar_url?: string;
    username?: string;
  };
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    Cookies.remove('lostyo_logged_in');
    Cookies.remove('lostyo_onboarding_done');
    router.push('/');
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="flex items-center gap-2 p-1 pr-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer group">
          <Avatar className="w-8 h-8 border border-white/10 group-hover:border-[#5865F2]/50 transition-colors">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback className="bg-[#5865F2] text-white">
              <User size={16} />
            </AvatarFallback>
          </Avatar>
          <span className="text-[11px] font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-wider">
            Account
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-[#1A1A1E] border-[#2A2A2E] text-white rounded-[1.5rem] p-2 mt-2">
        <DropdownMenuItem 
          onClick={() => router.push('/dashboard')}
          className="rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer py-3 gap-3"
        >
          <LayoutDashboard size={18} className="text-[#5865F2]" />
          <span className="font-bold text-sm">Dashboard</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-white/5 mx-2" />
        
        <DropdownMenuItem 
          onClick={() => router.push('/safe-alert')}
          className="rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer py-3 gap-3"
        >
          <PlusCircle size={18} className="text-white/40" />
          <span className="font-bold text-sm text-white/70">Add Bot</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => window.open('https://google.com', '_blank')}
          className="rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer py-3 gap-3"
        >
          <Puzzle size={18} className="text-white/40" />
          <span className="font-bold text-sm text-white/70">Install Extension</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-white/5 mx-2" />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          className="rounded-xl hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer py-3 gap-3 text-red-400"
        >
          <LogOut size={18} />
          <span className="font-bold text-sm">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};