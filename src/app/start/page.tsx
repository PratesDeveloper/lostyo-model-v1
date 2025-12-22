"use client";
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { cn } from "@/lib/utils";
import Cookies from 'js-cookie';
import { useExtensionDetector } from '@/hooks/useExtensionDetector';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

function StartPageContent() {
  const searchParams = useSearchParams();
  const guildId = searchParams.get('guild_id');
  
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingExtension, setCheckingExtension] = useState(false);
  const [isVerifyingBot, setIsVerifyingBot] = useState(false);
  const [botVerificationAttempts, setBotVerificationAttempts] = useState(0);
  
  const isExtensionInstalled = useExtensionDetector();
  const DiscordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fauth%2Fcallback&scope=identify+guilds+guilds.join`;

  const MAX_ATTEMPTS = 3;
  const RETRY_INTERVAL = 2000;

  // 1. Initial Auth Check
  useEffect(() => {
    const accessToken = Cookies.get('discord_access_token');
    if (accessToken) {
      setIsAuthenticated(true);
      if (!completedSteps.includes(1)) {
        setCompletedSteps(prev => prev.includes(1) ? prev : [...prev, 1]);
      }
    }
    setLoading(false);
  }, [completedSteps]);

  // 2. Extension Check
  useEffect(() => {
    if (isExtensionInstalled && completedSteps.includes(1)) {
      if (!completedSteps.includes(2)) {
        setCompletedSteps(prev => prev.includes(2) ? prev : [...prev, 2]);
      }
      setCheckingExtension(false);
    }
  }, [isExtensionInstalled, completedSteps]);

  // 3. Bot Polling Verification
  const verifyBot = useCallback(async (currentAttempt: number) => {
    if (!guildId) return;
    
    setIsVerifyingBot(true);
    setBotVerificationAttempts(currentAttempt);

    try {
      const { data } = await supabase
        .from('guilds')
        .select('state')
        .eq('guild_id', guildId)
        .single();

      if (data?.state === true) {
        if (!completedSteps.includes(3)) {
          setCompletedSteps(prev => [...prev, 3]);
        }
        setIsVerifyingBot(false);
        toast.success("Bot verified successfully!");
        return;
      }

      if (currentAttempt < MAX_ATTEMPTS) {
        setTimeout(() => verifyBot(currentAttempt + 1), RETRY_INTERVAL);
      } else {
        setIsVerifyingBot(false);
        toast.error("Could not verify bot. Please try adding it again.");
      }
    } catch (err) {
      if (currentAttempt >= MAX_ATTEMPTS) {
        setIsVerifyingBot(false);
      } else {
        setTimeout(() => verifyBot(currentAttempt + 1), RETRY_INTERVAL);
      }
    }
  }, [guildId, completedSteps]);

  // Trigger bot verification if guild_id is present in URL
  useEffect(() => {
    if (guildId && completedSteps.includes(1) && !completedSteps.includes(3) && !isVerifyingBot) {
      verifyBot(1);
    }
  }, [guildId, completedSteps, isVerifyingBot, verifyBot]);

  useEffect(() => {
    if (completedSteps.length === 3) {
      const timer = setTimeout(() => setShowFinalButton(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowFinalButton(false);
    }
  }, [completedSteps]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
        <Loader2 className="animate-spin text-[#5865F2] w-12 h-12" />
      </div>
    );
  }

  const steps = [
    { id: 1, title: "Login", icon: Lock, action: "Login", link: DiscordOAuthUrl },
    { id: 2, title: "Extension", icon: Puzzle, action: "Install Extension" },
    { id: 3, title: "Add Bot", icon: Bot, action: "Add to Discord" }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Setup LostyoCord</h1>
          <p className="text-white/40 text-lg mb-8 font-medium">Complete the steps below to start managing your server.</p>

          <div className="flex justify-center items-center mb-12">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={cn("flex flex-col items-center", completedSteps.includes(step.id) ? 'text-green-500' : 'text-red-500')}>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2", 
                    completedSteps.includes(step.id) ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500')}>
                    {completedSteps.includes(step.id) ? <Check size={20} /> : <step.icon size={20} />}
                  </div>
                  <span className="text-xs font-bold">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("w-16 h-0.5 mx-2", completedSteps.includes(step.id) && completedSteps.includes(steps[index+1].id) ? 'bg-green-500' : 'bg-gray-700')} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isDisabled = index > 0 && !completedSteps.includes(steps[index-1].id);
            const isVerifying = step.id === 3 && isVerifyingBot;

            return (
              <div key={step.id} className={cn("bg-[#141417] p-6 rounded-2xl flex flex-col items-center text-center border border-[#1A1A1E]", !isCompleted && !isDisabled && "hover:border-[#5865F2]/30")}>
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", isCompleted ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500")}>
                  <step.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-4">{step.title}</h3>
                
                {step.id === 1 ? (
                  <Button className={cn("w-full h-10 rounded-full font-bold", isCompleted ? "bg-green-500" : "bg-[#5865F2]")} disabled={isCompleted} onClick={() => !isCompleted && (window.location.href = step.link!)}>
                    {isCompleted ? "Logged In" : "Login"}
                  </Button>
                ) : step.id === 2 ? (
                  <Button className={cn("w-full h-10 rounded-full font-bold", isCompleted ? "bg-green-500" : "bg-[#5865F2]")} disabled={isDisabled || isCompleted} onClick={() => window.open('https://google.com', '_blank')}>
                    {isCompleted ? "Installed" : "Install"}
                  </Button>
                ) : (
                  <Button 
                    className={cn("w-full h-10 rounded-full font-bold", isCompleted ? "bg-green-500" : isVerifying ? "bg-yellow-500" : "bg-[#5865F2]")} 
                    disabled={isDisabled || isCompleted || isVerifying}
                    onClick={() => window.location.href = '/safe-alert'}
                  >
                    {isVerifying ? (
                      <><RefreshCw size={14} className="mr-2 animate-spin" /> Verifying ({botVerificationAttempts})</>
                    ) : isCompleted ? "Bot Added" : "Add Bot"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center">
          <Link href={showFinalButton ? "/dashboard" : "#"} className="w-full max-w-xs">
            <Button 
              className={cn("w-full h-14 rounded-full font-bold text-lg transition-all", showFinalButton ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-800 text-white/20 cursor-not-allowed")}
              disabled={!showFinalButton}
            >
              {showFinalButton ? "Go to Dashboard" : "Complete all steps"}
              {showFinalButton && <ArrowRight className="ml-2" size={20} />}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={null}>
      <StartPageContent />
    </Suspense>
  );
}