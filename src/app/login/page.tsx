"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'auth_failed') {
      toast.error("Authentication failed. Please try again.");
    }
  }, [searchParams]);

  const handleRobloxLogin = () => {
    setIsLoading(true);
    // Redireciona para a nossa rota de API que inicia o OAuth
    window.location.href = "/api/auth/roblox";
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-[3rem] p-10 md:p-14 border border-white/5 text-center">
          <div className="mb-12">
            <Link href="/" className="inline-block mb-8 hover:scale-110 transition-transform">
              <img src="https://cdn.lostyo.com/logo.png" className="w-12 h-12 mx-auto" alt="Logo" />
            </Link>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-3 uppercase">Lostyo Gate.</h1>
            <p className="text-white/30 font-medium text-sm leading-relaxed">
              Our ecosystem uses secure Roblox identity <br /> to manage your digital assets.
            </p>
          </div>

          <div className="space-y-6">
            <Button 
              onClick={handleRobloxLogin}
              disabled={isLoading}
              className="w-full h-20 bg-[#00A2FF] hover:bg-[#0084D1] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-4 transition-all active:scale-95 disabled:opacity-50 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <img src="/roblox-logo.png" className="w-6 h-6 object-contain" alt="Roblox" />
              )}
              <span>{isLoading ? 'Redirecting...' : 'Sign in with Roblox'}</span>
              {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </Button>
            
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                By signing in, you agree to our <br /> 
                <Link href="/terms" className="text-blue-400 hover:underline">Security Protocols</Link> and <Link href="/terms" className="text-blue-400 hover:underline">TOS</Link>.
              </p>
            </div>
          </div>

          <p className="mt-12 text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
            Verified Developer Access
          </p>
        </div>
      </motion.div>
    </div>
  );
}