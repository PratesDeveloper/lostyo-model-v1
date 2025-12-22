"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Import Discord's gg sans font
import './style.css';

export default function SafeAlertPage() {
  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&permissions=8&redirect_uri=https%3A%2F%2Flostyo.com%2Fstart&integration_type=0&scope=bot`;

  return (
    <div className="min-h-screen bg-[#313338] flex items-center justify-center p-4" style={{ fontFamily: "'gg sans Normal Regular', sans-serif" }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] bg-[#2B2D31] rounded-[8px] shadow-[0_8px_16px_rgba(0,0,0,0.3)] overflow-hidden border border-[#1E1F22]"
      >
        {/* Main Content - Alert Card */}
        <div className="p-6 space-y-4">
          {/* Warning Banner */}
          <div className="bg-[#F0B232]/10 border border-[#F0B232]/20 rounded-[4px] p-3 flex gap-3">
            <AlertTriangle className="text-[#F0B232] shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-[#F0B232] text-[13px] font-bold" style={{ fontFamily: "'gg sans Bold', sans-serif" }}>
                Administrator Permission Required
              </p>
              <p className="text-[#F0B232] text-[12px] leading-relaxed mt-1">
                LostyoCord needs full Administrator access to function properly.
              </p>
            </div>
          </div>

          {/* Why Admin Permission - Info Box */}
          <div className="bg-[#4E5058]/10 border border-[#4E5058]/20 rounded-[4px] p-3 flex gap-3">
            <Info className="text-[#B5BAC1] shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-[#F2F3F5] text-[13px] font-bold" style={{ fontFamily: "'gg sans Bold', sans-serif" }}>
                Why this permission?
              </p>
              <p className="text-[#B5BAC1] text-[12px] leading-relaxed mt-1">
                LostyoCord releases <span className="font-bold">daily updates</span> with new features, security patches, and improvements. With Administrator permission, you won't need to manually update bot permissions every time we add a new feature. This ensures your community always has access to the latest tools without interruption.
              </p>
            </div>
          </div>

          {/* Permissions List */}
          <div className="bg-[#1E1F22] rounded-[4px] border border-[#1E1F22] overflow-hidden">
            <div className="px-4 py-3 bg-[#1E1F22] border-b border-[#1E1F22]">
              <p className="text-[#B5BAC1] text-[11px] font-bold uppercase tracking-wider" style={{ fontFamily: "'gg sans Bold', sans-serif" }}>
                Permissions
              </p>
            </div>
            
            <div className="divide-y divide-[#1E1F22]">
              {/* Administrator - Highlighted */}
              <div className="px-4 py-3 flex items-start gap-3 bg-[#5865F2]/5">
                <Check size={16} className="text-[#5865F2] mt-0.5" strokeWidth={3} />
                <div className="flex-1">
                  <p className="text-[#F2F3F5] text-[14px] font-bold flex items-center gap-2" style={{ fontFamily: "'gg sans Bold', sans-serif" }}>
                    Administrator
                    <span className="bg-[#5865F2] text-white text-[10px] px-1.5 py-0.5 rounded-[2px] font-black uppercase">Critical</span>
                  </p>
                  <p className="text-[#B5BAC1] text-[12px] leading-relaxed mt-1">
                    Bypasses all channel-specific permissions and grants full server control. Required for daily updates.
                  </p>
                </div>
              </div>

              {/* Other Permissions */}
              <div className="px-4 py-2.5 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-[13px]">Manage Roles</p>
              </div>
              <div className="px-4 py-2.5 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-[13px]">Manage Channels</p>
              </div>
              <div className="px-4 py-2.5 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-[13px]">Kick Members</p>
              </div>
              <div className="px-4 py-2.5 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-[13px]">Ban Members</p>
              </div>
              <div className="px-4 py-2.5 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-[13px]">Manage Webhooks</p>
              </div>
              <div className="px-4 py-2.5 flex items-center gap-3">
                <Check size={14} className="text-[#23A559]" />
                <p className="text-[#B5BAC1] text-[13px]">View Audit Log</p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="text-[#B5BAC1] text-[12px] text-center px-2">
            LostyoCord will only use these permissions for automation and moderation features. You can remove access anytime.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#1E1F22] p-4 flex gap-2 border-t border-[#1E1F22]">
          <Link href="/start" className="flex-1">
            <Button 
              variant="ghost" 
              className="w-full h-10 text-[14px] font-medium text-[#F2F3F5] hover:bg-[#404249] rounded-[4px] transition-colors"
              style={{ fontFamily: "'gg sans Medium Regular', sans-serif" }}
            >
              Cancel
            </Button>
          </Link>
          
          <Link href={discordOAuthUrl} className="flex-1">
            <Button 
              className="w-full h-10 bg-[#5865F2] hover:bg-[#4752C4] text-white text-[14px] font-bold rounded-[4px] transition-colors"
              style={{ fontFamily: "'gg sans Bold', sans-serif" }}
            >
              Authorize
            </Button>
          </Link>
        </div>
      </motion.div>

      <p className="mt-4 text-[#B5BAC1] text-[10px] opacity-40 text-center" style={{ fontFamily: "'gg sans Normal Regular', sans-serif" }}>
        LostyoCord is not affiliated with Discord Inc.
      </p>
    </div>
  );
}