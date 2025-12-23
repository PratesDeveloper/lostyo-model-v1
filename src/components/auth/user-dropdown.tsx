"use client";

import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser } from '@/integrations/supabase/auth/session-provider';
import { LogOut, Settings, LayoutDashboard, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const UserDropdown = () => {
  const { user, profile } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to log out.");
      console.error(error);
    } else {
      // Clear local state and redirect
      router.push('/');
      toast.success("Logged out successfully.");
    }
  };

  // Discord user metadata usually contains full_name and avatar_url
  const displayName = profile?.first_name || user?.user_metadata.full_name || user?.email || 'User';
  const avatarUrl = profile?.avatar_url || user?.user_metadata.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar className="h-10 w-10 cursor-pointer transition-transform hover:scale-105">
            <AvatarImage src={avatarUrl || undefined} alt={displayName} />
            <AvatarFallback className="bg-[#5865F2] text-white font-bold">
              {displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#1A1A1E] border-[#2A2A2E] text-white p-2 rounded-xl" align="end">
        <DropdownMenuLabel className="text-white/80 font-semibold truncate">
          {displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#2A2A2E]" />
        
        <DropdownMenuItem 
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 cursor-pointer hover:bg-[#2A2A2E] rounded-lg p-2"
        >
          <LayoutDashboard size={16} className="text-[#5865F2]" />
          Dashboard
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => router.push('/settings')}
          className="flex items-center gap-2 cursor-pointer hover:bg-[#2A2A2E] rounded-lg p-2"
        >
          <Settings size={16} className="text-white/60" />
          Settings
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-[#2A2A2E]" />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="flex items-center gap-2 cursor-pointer hover:bg-red-500/20 text-red-400 rounded-lg p-2"
        >
          <LogOut size={16} />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};