"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, X, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SafeAlertPage() {
  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&permissions=8&redirect_uri=https%3A%2F%2Flostyo.com%2Fstart&integration_type=0&scope=bot`;

  return (
    <div className="min-h-screen bg-[#1E1F22] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] bg-[#313338] rounded-lg shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#2B2D31] px-6 py-4 flex items-center gap-3 border-b border-[#1E1F22]">
          <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center">
            <span className="text-white font-bold text-xs">LC</span>
          </div>
          <div className="flex-1">
            <h2 className="text-[#F2F3F5] text-sm font-bold">LostyoCord</h2>
            <p className="text-[#B5BAC1] text-xs">bot</p>
          </div>
          <div className="text-[#B5BAC1] text-xs">wants to join</div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-4">
          {/* Warning Banner */}
          <div className="bg-[#F0B232]/10 border border-[#F0B232]/20 rounded p-3 flex gap-3">
            <AlertTriangle className="text-[#F0B232] shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-[#F0B232] text-xs font-bold">High Privileges Required</p>
              <p className="text-[#F0B232] text-[11px] leading-relaxed mt-1">
                LostyoCord needs Administrator permission to function properly. This gives full control over your server.
              </p>
            </div>
          </div>

          {/* Permissions List */}
          <div className="bg-[#1E1F22] rounded border border-[#2A2D31] overflow-hidden">
            <div className="px-4 py-3 bg-[#2B2D31]/50 border-b border-[#2A2D31]">
              <p className="text-[#B5BAC1] text-[11px] font-bold uppercase tracking-wider">Permissions</p>
            </div>
            
            <div className="divide-y divide-[#2A2D31]">
              {/* Administrator - Highlighted */}
              <div className="px-4 py-3 flex items-start gap-3 bg-[#5865F2]/5">
                <Check size={16} className="text-[#5865F2] mt-0.5" strokeWidth={3} />
                <div className="flex-1">
                  <p className="text-[#F2F3F5] text-sm font-bold flex items-center gap-2">
                    Administrator
                    <span className="bg-[#5865F2] text-white text-[9px] px-1.5 py-0.5 rounded font-black uppercase">Critical</span>
                  </p>
                  <p className="text-[#B5BAC1] text-[11px] leading-relaxed mt-1">
                    Bypasses all channel-specific permissions and grants full server control
                  </p>
                </div>
              </div>

              {/* Other Permissions */}
              <div className="px-4 py-2 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-xs">Manage Roles</p>
              </div>
              <div className="px-4 py-2 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-xs">Manage Channels</p>
              </div>
              <div className="px-4 py-2 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-xs">Kick Members</p>
              </div>
              <div className="px-4 py-2 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-xs">Ban Members</p>
              </div>
              <div className="px-4 py-2 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-xs">Manage Webhooks</p>
              </div>
              <div className="px-4 py-2 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-xs">View Audit Log</p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="text-[#B5BAC1] text-[11px] text-center px-2">
            LostyoCord will only use these permissions for automation and moderation features. You can remove access anytime.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#2B2D31] p-4 flex gap-2 border-t border-[#1E1F22]">
          <Link href="/start" className="flex-1">
            <Button 
              variant="ghost" 
              className="w-full h-10 text-sm font-medium text-[#F2F3F5] hover:bg-[#404249] rounded transition-colors"
            >
              Cancel
            </Button>
          </Link>
          
          <Link href={discordOAuthUrl} className="flex-1">
            <Button 
              className="w-full h-10 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-bold rounded transition-colors"
            >
              Authorize
            </Button>
          </Link>
        </div>
      </motion.div>

      <p className="mt-4 text-[#B5BAC1] text-[10px] opacity-40 text-center">
        LostyoCord is not affiliated with Discord Inc.
      </p>
    </div>
  );
}