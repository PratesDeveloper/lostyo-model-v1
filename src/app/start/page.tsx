"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
          Get Started with LostyoCord
        </h1>
        <p className="text-white/40 text-lg md:text-xl mb-12 font-medium leading-relaxed">
          Choose how you want to use LostyoCord for your Discord community
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#141417] p-8 rounded-[2rem]">
            <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Add Bot</h3>
            <p className="text-white/30 text-sm mb-6">
              Add the LostyoCord bot to your Discord server
            </p>
            <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
              Add to Discord
            </Button>
          </div>
          
          <div className="bg-[#141417] p-8 rounded-[2rem]">
            <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"/>
                <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
                <path d="M12 8v4"/>
                <path d="M12 16h.01"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Install Extension</h3>
            <p className="text-white/30 text-sm mb-6">
              Enhance your Discord experience with our browser extension
            </p>
            <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
              Install Extension
            </Button>
          </div>
          
          <div className="bg-[#141417] p-8 rounded-[2rem]">
            <div className="w-16 h-16 rounded-2xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" x2="3" y1="12" y2="12"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Login</h3>
            <p className="text-white/30 text-sm mb-6">
              Access your dashboard and manage your communities
            </p>
            <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
              Login
            </Button>
          </div>
        </div>
        
        <Link href="/">
          <Button variant="ghost" className="text-white/30 hover:text-white hover:bg-white/5 h-10 px-5 rounded-full text-xs font-bold">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}