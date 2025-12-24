"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

export default function LoginPage() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'identify guilds guilds.join'
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5865F2]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5865F2]/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-[#141417] rounded-[3rem] p-10 md:p-12 border border-[#1A1A1E] shadow-2xl">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block p-4 rounded-[2rem] bg-white/5 mb-6 border border-white/5"
            >
              <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-12 h-12" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              Welcome Back.
            </h1>
            <p className="text-white/40 font-medium text-base">
              Connect your Discord account to manage your community.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#5865F2]/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Secure Access</h3>
                <p className="text-[11px] text-white/30 font-medium uppercase tracking-wider">End-to-end encryption</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#5865F2]/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2]">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Instant Sync</h3>
                <p className="text-[11px] text-white/30 font-medium uppercase tracking-wider">Real-time dashboard</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full h-16 text-sm font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all active:scale-95 group shadow-[0_0_20px_rgba(88,101,242,0.3)]"
          >
            <Lock size={18} className="mr-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            Login with Discord
            <ArrowRight size={18} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Button>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <div className="flex justify-center -space-x-2 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#141417] bg-[#1A1A1E] flex items-center justify-center">
                  <Users size={12} className="text-white/20" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-[#141417] bg-[#5865F2] flex items-center justify-center text-[10px] font-bold text-white">
                +12k
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/20">
              Trusted by communities worldwide
            </p>
          </div>
        </div>
        
        <p className="mt-8 text-center text-white/20 text-[10px] font-medium uppercase tracking-widest">
          By logging in, you agree to our <a href="#" className="text-white/40 hover:text-white transition-colors">Terms of Service</a>
        </p>
      </motion.div>
    </div>
  );
}