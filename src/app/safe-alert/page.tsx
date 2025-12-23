"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, CheckCircle2, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function SafeAlertPage() {
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    setIsComplete(Cookies.get('onboarding_complete') === 'true');
  }, []);

  const discordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fstart&integration_type=0&scope=guilds.join+bot`;

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#141417] rounded-3xl p-6 border border-[#1A1A1E]">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#5865F2]/10 mb-4">
              <Shield className="w-8 h-8 text-[#5865F2]" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Almost Ready</h1>
            <p className="text-white/50 text-sm">Why LostyoCord needs admin permissions</p>
          </div>

          <div className="mb-6 rounded-xl overflow-hidden border border-[#2A2A2E]">
            <img src="https://cdn.lostyo.com/discord-admin-permissions.png" alt="Discord Admin Permissions" className="w-full h-auto" />
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-white font-semibold text-xs">Constant Updates & Full Automation</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-white font-semibold text-xs">Automod, Roles & Analytics</p>
            </div>
          </div>

          <div className="space-y-2">
            <Link href={discordOAuthUrl} className="block w-full">
              <Button className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-full">
                Add LostyoCord
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            
            {isComplete ? (
              <Link href="/dashboard" className="block w-full">
                <Button variant="outline" className="w-full h-12 border-green-500/50 text-green-500 hover:bg-green-500/10 rounded-full font-bold gap-2">
                  <LayoutDashboard size={18} />
                  Open Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/start" className="block w-full">
                <Button variant="ghost" className="w-full h-12 text-white/60 hover:text-white hover:bg-white/5 rounded-full font-bold">
                  Go Back to Setup
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}