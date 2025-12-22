"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Corrected Discord OAuth URL to redirect to /start with guild_id parameter
const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&permissions=8&redirect_uri=${encodeURIComponent('https://lostyo.com/start')}&response_type=code&scope=bot`;

export default function SafeAlertPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#141417] rounded-3xl p-6 border border-[#1A1A1E]">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5865F2]/10 mb-4">
              <Shield className="w-8 h-8 text-[#5865F2]" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">All Good Here</h1>
            <p className="text-white/50 text-sm">
              Why LostyoCord needs admin permissions
            </p>
          </div>

          {/* Permission Screenshot */}
          <div className="mb-6 rounded-xl overflow-hidden border border-[#2A2A2E]">
            <img 
              src="https://cdn.lostyo.com/discord-admin-permissions.png" 
              alt="Discord Admin Permissions"
              className="w-full h-auto"
            />
          </div>

          {/* Benefits List */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">Constant Updates</p>
                <p className="text-white/40 text-xs">
                  New features work instantly without reconfiguring permissions
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">Full Automation</p>
                <p className="text-white/40 text-xs">
                  Auto-moderation, role management, and analytics without manual setup
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-semibold text-sm">Your Control</p>
                <p className="text-white/40 text-xs">
                  Remove the bot anytime. No data stored. GDPR compliant.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <Link href={discordOAuthUrl} className="block w-full">
              <Button className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-full">
                Add LostyoCord
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            
            <Link href="/start" className="block w-full">
              <Button variant="ghost" className="w-full h-12 text-white/60 hover:text-white hover:bg-white/5 rounded-full font-bold">
                Go Back
              </Button>
            </Link>
          </div>

          {/* Footer */}
          <p className="text-white/30 text-[10px] text-center mt-4 leading-relaxed">
            Admin permissions are required for LostyoCord to function properly. 
            You can revoke access anytime through Discord server settings.
          </p>
        </div>
      </div>
    </div>
  );
}