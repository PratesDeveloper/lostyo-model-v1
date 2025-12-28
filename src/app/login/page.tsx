"use client";
import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

function LoginContent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRobloxLogin = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/roblox";
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Estética de Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-blue-600/[0.03] blur-[120px] pointer-events-none" />
      <div className="noise opacity-[0.03]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[400px] relative z-10"
      >
        <div className="glass rounded-[3rem] p-10 md:p-12 border border-white/5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          
          <div className="mb-12">
            <div className="w-16 h-16 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <img src="https://cdn.lostyo.com/logo.png" className="w-8 h-8 object-contain" alt="Logo" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter mb-3 uppercase">Identity Gate</h1>
            <p className="text-white/20 font-bold text-[10px] uppercase tracking-[0.3em] leading-relaxed">
              Secure Access Protocol v2.1
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleRobloxLogin}
              disabled={isLoading}
              className="w-full h-16 bg-white text-black hover:bg-blue-500 hover:text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 group border-none shadow-2xl shadow-black/50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <img src="/roblox-logo.png" className="w-5 h-5 object-contain invert group-hover:invert-0" alt="R$" />
              )}
              <span>{isLoading ? 'Establishing...' : 'Login with Roblox'}</span>
              {!isLoading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
            
            <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="flex items-center justify-center gap-2 text-[9px] font-black text-white/10 uppercase tracking-widest">
                <ShieldCheck size={12} /> Encrypted Session
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/" className="text-[9px] font-black text-white/20 hover:text-white uppercase tracking-[0.3em] transition-colors">
              Return to Terminal
            </Link>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[8px] font-black text-white/5 uppercase tracking-[0.5em]">
          Lostyo Studios Core Systems
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#030303]" />}>
      <LoginContent />
    </Suspense>
  );
}