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
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, LayoutDashboard, PlusCircle, Puzzle, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-4xl h-14 bg-[#1A1A1E] rounded-full flex items-center justify-between px-2 shadow-xl border border-white/5">
        <div className="flex items-center gap-3 pl-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-7 h-7" />
            <span className="text-sm font-black tracking-tight text-white">LostyoCord</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <a href="/#features" className="hover:text-white transition-colors">Features</a>
          <a href="/#stats" className="hover:text-white transition-colors">Stats</a>
          <a href="/#preview" className="hover:text-white transition-colors">Preview</a>
        </div>

        <div className="flex items-center gap-1">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <Avatar className="h-10 w-10 border-2 border-[#5865F2] hover:scale-105 transition-transform cursor-pointer">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
                    <AvatarFallback className="bg-[#1A1A1E] text-white">
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 bg-[#1A1A1E] border-[#2A2A2E] text-white rounded-2xl p-2 shadow-2xl">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold truncate">{user.user_metadata?.full_name}</span>
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Discord Account</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5 mx-1" />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl hover:bg-white/5 transition-colors group">
                    <LayoutDashboard size={16} className="text-[#5865F2]" />
                    <span className="text-xs font-bold">Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/safe-alert" className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl hover:bg-white/5 transition-colors group">
                    <PlusCircle size={16} className="text-[#5865F2]" />
                    <span className="text-xs font-bold">Add Bot</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/start" className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl hover:bg-white/5 transition-colors group">
                    <Puzzle size={16} className="text-[#5865F2]" />
                    <span className="text-xs font-bold">Install Extension</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5 mx-1" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
                >
                  <LogOut size={16} />
                  <span className="text-xs font-bold">Logout</span>
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