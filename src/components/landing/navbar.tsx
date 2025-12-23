"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSupabase } from '@/context/SupabaseProvider';
import { ProfileDropdown } from '@/components/ProfileDropdown';

export const Navbar = () => {
  const { user, isLoading } = useSupabase();

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
        <div className="flex items-center gap-1 pr-2">
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
          ) : user ? (
            <ProfileDropdown />
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