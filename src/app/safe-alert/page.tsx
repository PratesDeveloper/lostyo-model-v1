"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Info, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SafeAlertPage() {
  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&permissions=8&redirect_uri=https%3A%2F%2Flostyo.com%2Fstart&integration_type=0&scope=bot`;

  const permissions = [
    "Manage Roles",
    "Manage Channels",
    "Kick Members",
    "Ban Members",
    "Manage Webhooks",
    "Manage Server",
  ];

  return (
    <div className="min-h-screen bg-[#1E1F22] flex flex-col items-center justify-center p-4 font-sans selection:bg-[#5865F2]/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] bg-[#313338] rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.24)] overflow-hidden"
      >
        {/* Discord Header Mockup */}
        <div className="p-8 pb-0 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-[#5865F2] flex items-center justify-center shadow-lg border-4 border-[#313338]">
              <img src="https://cdn.lostyo.com/logo.png" alt="LostyoCord" className="w-14 h-14" />
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#23A559] border-4 border-[#313338] rounded-full flex items-center justify-center">
              <Check size={14} className="text-white" strokeWidth={4} />
            </div>
          </div>
          
          <h1 className="text-[#F2F3F5] text-2xl font-bold mb-1">LostyoCord</h1>
          <p className="text-[#B5BAC1] text-sm font-medium mb-6">wants to access your Discord account</p>
        </div>

        {/* Permissions List Section */}
        <div className="px-8 pb-8">
          <div className="h-[1px] bg-[#3F4147] w-full mb-6" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-[#23A559]/10 flex items-center justify-center">
                <Check size={16} className="text-[#23A559]" strokeWidth={3} />
              </div>
              <span className="text-[#DBDEE1] text-sm font-semibold">Join servers for you</span>
            </div>

            <div className="h-[1px] bg-[#3F4147] w-full my-4" />

            <div className="flex flex-col gap-4">
               <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Check size={18} className="text-[#B5BAC1]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[#DBDEE1] text-sm font-bold block">Administrator</span>
                    <span className="text-[#B5BAC1] text-[13px] leading-tight block mt-1">
                      This allows LostyoCord to bypass channel-specific restrictions and manage the server with full access.
                    </span>
                  </div>
               </div>

               {/* The warning box identical to Discord */}
               <div className="bg-[#F0B232]/10 border border-[#F0B232]/20 rounded-md p-3 flex gap-3">
                  <ShieldAlert className="text-[#F0B232] shrink-0" size={20} />
                  <p className="text-[#F0B232] text-xs font-medium leading-normal">
                    The bot is requesting the <span className="font-bold underline">Administrator</span> permission. This is a high-level permission that allows full control over the server.
                  </p>
               </div>
            </div>

            <div className="h-[1px] bg-[#3F4147] w-full my-4" />
            
            <div className="space-y-3">
              <p className="text-[#B5BAC1] text-[11px] font-bold uppercase tracking-wider">Other permissions included:</p>
              <div className="grid grid-cols-2 gap-y-2">
                {permissions.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check size={12} className="text-[#B5BAC1]" />
                    <span className="text-[#B5BAC1] text-xs">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Discord Footer Action Bar */}
        <div className="bg-[#2B2D31] p-4 flex flex-row-reverse gap-3">
          <Link href={discordOAuthUrl} className="flex-1">
            <Button 
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium rounded-[3px] h-11 text-sm transition-colors"
            >
              Authorize
            </Button>
          </Link>
          
          <Link href="/start" className="flex-1">
            <Button 
              variant="ghost" 
              className="w-full text-white hover:underline font-medium h-11 text-sm bg-transparent border-none"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </motion.div>

      <p className="mt-4 text-[#B5BAC1] text-[12px] opacity-50">
        LostyoCord is not affiliated with Discord Inc.
      </p>
    </div>
  );
}