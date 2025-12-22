"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SafeAlertPage() {
  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&permissions=8&redirect_uri=https%3A%2F%2Flostyo.com%2Fstart&integration_type=0&scope=bot`;

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-[#141417] rounded-[3rem] p-8 md:p-12 border border-[#1A1A1E]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-red-500/10 mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Admin Permissions Required
            </h1>
            <p className="text-white/40 text-lg font-medium">
              We need to explain why LostyoCord requires administrator access
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-5 h-5 text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Why Admin Access?</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  LostyoCord needs administrator permissions to automatically manage roles, 
                  moderate content, configure channels, and access server analytics. This 
                  allows the bot to provide full functionality without manual setup for every feature.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">What We Can't Access</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Despite admin permissions, we cannot: read your private messages with other users, 
                  access your payment information, or delete your server. Our permissions are strictly 
                  limited to bot operations within your community.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Security First</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  All bot actions are logged and auditable. You can remove the bot at any time, 
                  and all data associated with your server will be immediately deleted. We follow 
                  Discord's best practices for bot security and data privacy.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Link href={discordOAuthUrl} className="w-full">
              <Button 
                className="w-full h-14 text-lg font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all"
              >
                I Understand - Add Bot
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            
            <Link href="/start" className="w-full">
              <Button 
                variant="ghost" 
                className="w-full h-14 text-lg font-bold rounded-full bg-[#1A1A1E] hover:bg-[#2A2A2E] text-white/60 hover:text-white transition-all"
              >
                Cancel - Go Back
              </Button>
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/30 text-xs">
              By clicking "I Understand", you agree to grant LostyoCord the necessary permissions 
              to function properly in your Discord server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}