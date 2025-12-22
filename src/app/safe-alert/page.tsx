"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Check, X, Info } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SafeAlertPage() {
  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&permissions=8&redirect_uri=https%3A%2F%2Flostyo.com%2Fstart&integration_type=0&scope=bot`;

  const permissions = [
    { name: "View Channels", checked: true },
    { name: "Manage Roles", checked: true },
    { name: "Manage Channels", checked: true },
    { name: "Administrator", checked: true, highlight: true },
    { name: "Create Expressions", checked: true },
    { name: "View Audit Log", checked: true },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-xl w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#141417] rounded-[2.5rem] overflow-hidden border border-[#1A1A1E] shadow-2xl"
        >
          {/* Header Section */}
          <div className="p-8 md:p-10 text-center border-b border-[#1A1A1E]">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5865F2]/10 mb-6">
              <Shield className="w-8 h-8 text-[#5865F2]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
              Safety Check
            </h1>
            <p className="text-white/40 text-sm font-medium leading-relaxed">
              LostyoCord requires specific permissions to automate your community management effectively.
            </p>
          </div>

          {/* Discord Mockup Permission List */}
          <div className="p-8 bg-[#0B0B0D]/50">
            <div className="bg-[#1A1C1E] rounded-2xl p-6 border border-white/5 shadow-inner">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Requested Permissions</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5865F2] animate-pulse" />
                  <span className="text-[9px] font-bold text-[#5865F2] uppercase tracking-tighter">Required for Core</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {permissions.map((perm, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                      perm.highlight ? 'bg-[#5865F2]/10 border border-[#5865F2]/20' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                        perm.checked ? 'bg-[#23A559]' : 'bg-white/10'
                      }`}>
                        {perm.checked ? <Check size={14} className="text-white" strokeWidth={3} /> : <X size={14} className="text-white/20" />}
                      </div>
                      <span className={`text-sm font-bold ${perm.highlight ? 'text-white' : 'text-white/60'}`}>
                        {perm.name}
                      </span>
                    </div>
                    {perm.highlight && (
                      <div className="px-2 py-0.5 bg-[#5865F2] rounded-md">
                        <span className="text-[8px] font-black text-white uppercase tracking-tighter">Critical</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <Info className="w-5 h-5 text-amber-500 shrink-0" />
                <p className="text-[11px] text-amber-500/80 font-medium leading-relaxed">
                  The <strong>Administrator</strong> permission is required to bypass channel-specific restrictions and ensure all automation modules (Moderation, Logs, Rewards) function without manual role adjustments.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-8 flex flex-col gap-3 border-t border-[#1A1A1E]">
            <Link href={discordOAuthUrl} className="w-full">
              <Button 
                className="w-full h-14 text-sm font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all active:scale-95 shadow-lg shadow-[#5865F2]/20"
              >
                I Understand - Continue
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            
            <Link href="/start" className="w-full">
              <Button 
                variant="ghost" 
                className="w-full h-14 text-sm font-bold rounded-full bg-transparent text-white/30 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel Setup
              </Button>
            </Link>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/10">
          Lostyo Security Protocol • v2.0
        </p>
      </div>
    </div>
  );
}