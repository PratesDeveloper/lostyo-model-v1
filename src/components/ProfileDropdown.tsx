"use client";

import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User as UserIcon, Loader2 } from 'lucide-react';
import { useSupabase } from '@/context/SupabaseProvider';
import { supabase } from '@/integrations/supabase/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const ProfileDropdown = () => {
  const { user, profile } = useSupabase();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    } else {
      // Clear custom login cookie
      Cookies.remove('lostyo_logged_in');
      toast.success("Successfully logged out.");
      router.push('/');
    }
    setIsLoggingOut(false);
  };

  if (!user) return null;

  // Prioriza dados do perfil, mas usa metadados do Discord se o perfil não tiver avatar_url
  const displayName = profile?.first_name || user.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url || user.user_metadata.avatar_url;
  const fallback = displayName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none transition-transform active:scale-95">
          <Avatar className="w-10 h-10 border-2 border-[#5865F2] hover:border-white transition-colors">
            <AvatarImage src={avatarUrl || undefined} alt={displayName} />
            <AvatarFallback className="bg-[#5865F2] text-white font-bold text-sm">{fallback}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-[#1A1A1E] border-[#2A2A2E] text-white rounded-xl p-2" align="end">
        <DropdownMenuLabel className="font-bold text-white/80 px-2 py-1">
          {displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#2A2A2E] my-1" />
        
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-white/60 hover:bg-[#2A2A2E] rounded-lg px-2 py-2" onClick={() => router.push('/dashboard')}>
          <UserIcon size={16} />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-white/60 hover:bg-[#2A2A2E] rounded-lg px-2 py-2" onClick={() => router.push('/settings')}>
          <Settings size={16} />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-[#2A2A2E] my-1" />
        
        <DropdownMenuItem 
          className="cursor-pointer flex items-center gap-2 text-red-400 hover:bg-red-900/30 rounded-lg px-2 py-2" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <LogOut size={16} />
          )}
          <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};