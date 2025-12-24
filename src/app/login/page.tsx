"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, Star, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos Decorativos de Background */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#5865F2]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#5865F2]/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full"
      >
        <div className="bg-[#141417] rounded-[3rem] p-10 border border-[#1A1A1E] shadow-2xl relative z-10">
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block p-4 rounded-3xl bg-white/5 mb-6"
            >
              <img 
                src="https://cdn.lostyo.com/logo.png" 
                alt="LostyoCord" 
                className="w-12 h-12 opacity-90" 
              />
            </motion.div>
            
            <h1 className="text-3xl font-black text-white mb-3 tracking-tight">Welcome back</h1>
            <p className="text-white/40 text-sm font-medium leading-relaxed">
              Sign in to manage your communities and access your dashboard.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2]">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-white text-xs font-bold uppercase tracking-wider">Secure Access</p>
                <p className="text-white/30 text-[11px] font-medium">Your data is always encrypted</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                <Star size={20} />
              </div>
              <div>
                <p className="text-white text-xs font-bold uppercase tracking-wider">Premium Tools</p>
                <p className="text-white/30 text-[11px] font-medium">Advanced analytics included</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleLogin}
            className="w-full h-16 text-sm font-black rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all shadow-lg shadow-[#5865F2]/20 group uppercase tracking-widest"
          >
            Login with Discord
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="mt-8 flex items-center justify-center gap-2">
            <Zap size={14} className="text-white/20" />
            <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
              Powered by Discord OAuth2
            </span>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center mt-8 text-white/20 text-[11px] font-medium">
          By logging in, you agree to our <a href="#" className="text-white/40 hover:text-white underline underline-offset-4">Terms of Service</a>.
        </p>
      </motion.div>
    </div>
  );
}