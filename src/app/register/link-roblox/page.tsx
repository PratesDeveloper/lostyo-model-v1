"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function LinkRobloxPage() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="glass rounded-[3rem] p-10 md:p-16 border border-white/5 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-10">
            Final Step: Identity
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">Almost there.</h1>
          <p className="text-white/40 font-medium text-lg mb-12">
            To access the Studio Dashboard and your projects, we need to verify your Roblox identity.
          </p>

          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 mb-12 text-left space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Secure OAuth 2.0</h4>
                <p className="text-xs text-white/30 leading-relaxed">We use Roblox's official authorization system. We never see your password.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                <Info size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Required Permissions</h4>
                <p className="text-xs text-white/30 leading-relaxed">Profile access, Group roles, and Experience management rights.</p>
              </div>
            </div>
          </div>

          <Link href="/dashboard">
            <Button className="w-full h-20 bg-[#00A2FF] hover:bg-[#0084D1] text-white rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-[#00A2FF]/20 flex items-center justify-center gap-4 transition-transform active:scale-95 group">
              <img src="/roblox-logo.png" className="w-6 h-6 object-contain" alt="Roblox" />
              Sign with Roblox
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <p className="mt-10 text-[10px] font-bold text-white/10 uppercase tracking-[0.3em]">
            Verified by Roblox Developer Program
          </p>
        </div>
      </motion.div>
    </div>
  );
}