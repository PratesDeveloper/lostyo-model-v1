"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const handleLogin = () => {
    const clientId = "1399625245585051708";
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    // Usando state aleatório para CSRF manual
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('discord_oauth_state', state);

    const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20guilds%20guilds.join&state=${state}`;
    
    window.location.href = discordUrl;
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5865F2]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5865F2]/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-[#141417] rounded-[3rem] p-10 md:p-12 border border-[#1A1A1E] shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-block p-4 rounded-[2rem] bg-white/5 mb-6 border border-white/5">
              <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Welcome Back.</h1>
            <p className="text-white/40 font-medium">Connect your Discord manually to continue.</p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2]">
                <ShieldCheck size={20} />
              </div>
              <p className="text-sm font-bold text-white">Manual OAuth2 Verification</p>
            </div>
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full h-16 text-sm font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all active:scale-95 group shadow-[0_0_20px_rgba(88,101,242,0.3)]"
          >
            <Lock size={18} className="mr-3 opacity-50" />
            Login with Discord
            <ArrowRight size={18} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Button>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/20">
              Direct API Integration
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}