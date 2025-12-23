"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useUser } from '@/contexts/user-context';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Loader2 } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout, isLoading } = useUser();

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-4xl h-14 bg-[#1A1A1E] rounded-full flex items-center justify-between px-2 shadow-xl">
        <div className="flex items-center gap-3 pl-4">
          <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-7 h-7" />
          <span className="text-sm font-black tracking-tight text-white">LostyoCord</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#stats" className="hover:text-white transition-colors">Stats</a>
          <a href="#preview" className="hover:text-white transition-colors">Preview</a>
        </div>
        <div className="flex items-center gap-1">
          {isLoading ? (
            <Loader2 className="animate-spin text-[#5865F2] w-5 h-5" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="bg-[#5865F2] text-white">
                      {user.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#1A1A1E] border-[#2A2A2E]" align="end" forceMount>
                <DropdownMenuItem className="text-white/80 hover:bg-[#2A2A2E] focus:bg-[#2A2A2E]">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-white/80 hover:bg-[#2A2A2E] focus:bg-[#2A2A2E]"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
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