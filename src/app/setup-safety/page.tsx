"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, RefreshCw, Zap, FileText, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/landing/navbar";

export default function SetupSafetyPage() {
  const [accepted, setAccepted] = useState(false);

  // Link de exemplo para o OAuth - O usuário pode alterar depois
  const DISCORD_OAUTH_URL = "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=8&scope=bot%20applications.commands";

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

          <div className="bg-[#141417] rounded-[2.5rem] p-8 md:p-12 mb-8 shadow-2xl border border-white/5">
            <p className="text-lg text-white/80 leading-relaxed mb-10 font-medium">
              LostyoCord operates as a high-performance hybrid ecosystem. To ensure all extension tools and bot features function instantly without interruption, we request <span className="text-white font-bold underline decoration-[#5865F2] decoration-2 underline-offset-4">Administrator</span> permissions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#5865F2]">
                  <RefreshCw size={20} />
                  <h3 className="font-bold uppercase text-xs tracking-widest">Continuous Deployment</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  We ship updates daily. Full access prevents the need for constant re-authorization as new moderation or interface features are added to the platform.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#5865F2]">
                  <Zap size={20} />
                  <h3 className="font-bold uppercase text-xs tracking-widest">Hybrid Sync</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">
                  Ensures the Browser Extension and Bot can immediately interact with any channel or role within your server hierarchy without permission conflicts.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-3xl p-6 flex gap-4 items-start border border-white/5">
              <div className="mt-1 text-white/40">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Your Safety Matters</h4>
                <p className="text-xs text-white/30 leading-relaxed">
                  Every action performed by LostyoCord is logged in your official Discord Audit Log. We never execute actions without a command triggered by an authorized user via our verified interface.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center space-x-3 group cursor-pointer">
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
                I understand the security protocols and agree to the Terms of Service.
              </Label>
            </div>

            <Button 
              disabled={!accepted}
              onClick={() => window.location.href = DISCORD_OAUTH_URL}
              className={`h-16 px-12 rounded-full font-bold text-base transition-all ${
                accepted 
                ? "bg-[#5865F2] hover:bg-[#4752C4] text-white scale-100" 
                : "bg-white/5 text-white/20 scale-95 cursor-not-allowed"
              }`}
            >
              Authorize on Discord <ArrowRight size={20} className="ml-2" />
            </Button>
            
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/10">
              Verified & Secured by Lostyo Ecosystem
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}