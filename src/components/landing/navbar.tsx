"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, LayoutDashboard, User, Settings } from 'lucide-react';

export const Navbar = () => {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-4xl h-14 bg-[#1A1A1E] rounded-full flex items-center justify-between px-2 shadow-xl border border-white/5">
        <Link href="/" className="flex items-center gap-3 pl-4">
          <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-7 h-7" />
          <span className="text-sm font-black tracking-tight text-white">LostyoCord</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          <a href="#preview" className="hover:text-white transition-colors">Preview</a>
        </div>

        <div className="flex items-center gap-1">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden hover:bg-white/5 border border-white/10">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={profile?.avatar_url} alt={profile?.username || 'User'} />
                    <AvatarFallback className="bg-[#5865F2] text-white text-[10px] font-bold">
                      {profile?.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#1A1A1E] border-[#2A2A2E] text-white p-2 rounded-2xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-4">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-black leading-none">{profile?.username}</p>
                    <p className="text-xs leading-none text-white/30 truncate">{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <DropdownMenuItem asChild className="p-3 rounded-xl focus:bg-white/5 cursor-pointer">
                  <Link href="/dashboard" className="flex items-center">
                    <LayoutDashboard className="mr-3 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 rounded-xl focus:bg-white/5 cursor-pointer">
                  <User className="mr-3 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 rounded-xl focus:bg-white/5 cursor-pointer">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5 mx-2" />
                <DropdownMenuItem onClick={handleLogout} className="p-3 rounded-xl focus:bg-red-500/10 text-red-400 cursor-pointer">
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/start">
              <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white h-10 px-6 rounded-full text-xs font-bold transition-transform active:scale-95">
                Start
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};