"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'identify guilds guilds.join',
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-16 h-16 mx-auto mb-6 opacity-90" />
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Login Required</h1>
        <p className="text-white/40 text-lg mb-8 font-medium">
          Please log in with your Discord account to continue securely.
        </p>
        
        <Button 
          onClick={handleLogin}
          className="w-full h-14 text-lg font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all"
        >
          <Lock size={20} className="mr-2" />
          Login with Discord
        </Button>
      </div>
    </div>
  );
}