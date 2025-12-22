"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';
import Link from 'next/link';

const DiscordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fauth%2Fcallback&scope=guilds+identify+guilds.join`;

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-16 h-16 mx-auto mb-6 opacity-90" />
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Login Required</h1>
        <p className="text-white/40 text-lg mb-8 font-medium">
          Please log in with your Discord account to continue.
        </p>
        
        <Link href={DiscordOAuthUrl} passHref>
          <Button 
            className="w-full h-14 text-lg font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all"
          >
            <Lock size={20} className="mr-2" />
            Login with Discord
          </Button>
        </Link>
      </div>
    </div>
  );
}