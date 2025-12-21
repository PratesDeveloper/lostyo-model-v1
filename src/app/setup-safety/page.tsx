"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, Zap, FileText, ArrowRight, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/landing/navbar";
import { useAuth } from '@/components/auth/auth-provider';
import { useRouter } from 'next/navigation';

const PermissionElement = () => (
  <div className="flex items-center gap-3 bg-[#2F3136] px-4 py-2.5 rounded-lg border border-white/5 inline-flex mb-6">
    <div className="w-5 h-5 bg-[#5865F2] rounded flex items-center justify-center">
      <Check size={14} className="text-white" strokeWidth={4} />
    </div>
    <span className="text-[15px] font-medium text-white tracking-wide">Administrador</span>
  </div>
);

export default function SetupSafetyPage() {
  const [accepted, setAccepted] = useState(false);
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login');
    }
  }, [session, loading, router]);

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#5865F2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // URL de OAuth do Discord fornecido pelo usuário
  const DISCORD_OAUTH_URL = "https://discord.com/oauth2/authorize?client_id=1399625245585051708&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fauth%2Fcallback&scope=guilds+identify+guilds.join";

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Security Protocol</h1>
              <p className="text-white/40 font-medium">Permission Request & Transparency</p>
            </div>
          </div>

          <div className="bg-[#141417] rounded-[2.5rem] p-8 md:p-12 mb-8 shadow-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <ShieldAlert size={120} />
            </div>

            <p className="text-lg text-white/80 leading-relaxed mb-6 font-medium max-w-2xl">
              LostyoCord requires the following permission to maintain a seamless hybrid connection between your server and our platform:
            </p>

            <PermissionElement />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#5865F2]">
                  <RefreshCw size={18} />
                  <h3 className="font-bold uppercase text-[10px] tracking-widest">Continuous Deployment</h3>
                </div>
                <p className="text-sm text-white/30 leading-relaxed">
                  Daily updates ensure your moderation tools stay ahead of threats without requiring constant manual re-authorizations.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#5865F2]">
                  <Zap size={18} />
                  <h3 className="font-bold uppercase text-[10px] tracking-widest">Hybrid Sync</h3>
                </div>
                <p className="text-sm text-white/30 leading-relaxed">
                  Ensures the Browser Extension and Bot interact perfectly across all channels and role hierarchies.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 flex gap-4 items-start border border-white/5">
              <div className="mt-1 text-white/40">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Full Audit Transparency</h4>
                <p className="text-xs text-white/30 leading-relaxed">
                  Every action is logged in your Discord Audit Log. LostyoCord only executes actions when explicitly triggered by authorized users via our verified interface.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center space-x-3 group cursor-pointer bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
              <Checkbox 
                id="terms" 
                checked={accepted}
                onCheckedChange={(checked) => setAccepted(checked as boolean)}
                className="border-white/20 data-[state=checked]:bg-[#5865F2] data-[state=checked]:border-[#5865F2]"
              />
              <Label 
                htmlFor="terms" 
                className="text-sm font-medium text-white/60 cursor-pointer group-hover:text-white transition-colors"
              >
                I understand the security protocols and authorize the Administrator request.
              </Label>
            </div>

            <Button 
              disabled={!accepted}
              onClick={() => window.location.href = DISCORD_OAUTH_URL}
              className={`h-16 px-12 rounded-full font-bold text-base transition-all ${
                accepted 
                ? "bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865F2]/20 scale-100" 
                : "bg-white/5 text-white/20 scale-95 cursor-not-allowed"
              }`}
            >
              Continue to Discord <ArrowRight size={20} className="ml-2" />
            </Button>
            
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/10">
              Account: {session.user.email}
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}