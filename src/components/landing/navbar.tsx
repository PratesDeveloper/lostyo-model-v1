"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, Settings, User } from 'lucide-react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Cookies.get('lostyo_logged_in') === 'true');
    setOnboardingComplete(Cookies.get('onboarding_complete') === 'true');
  }, []);

  const handleLogout = () => {
    Cookies.remove('lostyo_logged_in');
    Cookies.remove('onboarding_complete');
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
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none pr-2">
                  <Avatar className="w-10 h-10 border-2 border-[#5865F2] hover:scale-105 transition-transform">
                    <AvatarImage src="https://cdn.discordapp.com/embed/avatars/0.png" />
                    <AvatarFallback className="bg-[#1A1A1E] text-white">U</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#141417] border-[#2A2A2E] text-white rounded-2xl p-2 mt-2">
                <DropdownMenuLabel className="font-bold text-xs uppercase tracking-widest text-white/40 px-3 py-2">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                
                {onboardingComplete && (
                  <Link href="/dashboard">
                    <DropdownMenuItem className="focus:bg-[#5865F2] focus:text-white rounded-xl cursor-pointer gap-2 py-2">
                      <LayoutDashboard size={16} />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                
                <DropdownMenuItem className="focus:bg-[#5865F2] focus:text-white rounded-xl cursor-pointer gap-2 py-2">
                  <User size={16} />
                  Profile
                </DropdownMenuItem>
                
                <DropdownMenuItem className="focus:bg-[#5865F2] focus:text-white rounded-xl cursor-pointer gap-2 py-2">
                  <Settings size={16} />
                  Settings
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-white/5" />
                
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="focus:bg-destructive focus:text-white rounded-xl cursor-pointer gap-2 py-2 text-destructive"
                >
                  <LogOut size={16} />
                  Logout
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