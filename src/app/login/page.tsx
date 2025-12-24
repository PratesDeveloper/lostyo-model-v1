"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const handleLogin = () => {
    // URL exata fornecida pelo usuário
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1399625245585051708&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fauth%2Fcallback&scope=guilds+identify+guilds.join";
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-[#141417] rounded-[3rem] p-10 md:p-14 border border-[#1A1A1E] shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-[2rem] bg-white/5 mb-8 border border-white/5">
              <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Access Lostyo.</h1>
            <p className="text-white/40 font-medium text-lg leading-relaxed">
              Everything you need to grow your community in one place.
            </p>
          </div>

          <div className="space-y-3 mb-12">
            {[
              { icon: ShieldCheck, text: "Secure OAuth2 Integration" },
              { icon: Zap, text: "Instant Data Synchronization" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-8 h-8 rounded-xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2]">
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-bold text-white/80">{item.text}</span>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full h-16 text-sm font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all active:scale-95 group shadow-[0_0_20px_rgba(88,101,242,0.2)]"
          >
            <Lock size={18} className="mr-3 opacity-50" />
            Continue with Discord
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        <p className="mt-8 text-center text-white/10 text-[10px] font-bold uppercase tracking-[0.2em]">
          Powered by Lostyo Ecosystem
        </p>
      </motion.div>
    </div>
  );
}