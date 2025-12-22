"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import Cookies from 'js-cookie';
import { useExtensionDetector } from '@/hooks/useExtensionDetector';
import { supabase } from "@/integrations/supabase/client";

function StartPageContent() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingExtension, setCheckingExtension] = useState(false);
  const [checkingBot, setCheckingBot] = useState(false);
  const [extensionCheckTimer, setExtensionCheckTimer] = useState<NodeJS.Timeout | null>(null);
  const [botCheckTimer, setBotCheckTimer] = useState<NodeJS.Timeout | null>(null);
  
  const isExtensionInstalled = useExtensionDetector();
  const searchParams = useSearchParams();

  const DiscordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fauth%2Fcallback&scope=identify+guilds+guilds.join`;

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = Cookies.get('discord_access_token');
      if (accessToken) {
        setIsAuthenticated(true);
        if (!completedSteps.includes(1)) {
          setCompletedSteps([1]);
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    if (isExtensionInstalled && completedSteps.includes(1)) {
      if (!completedSteps.includes(2)) {
        setCompletedSteps(prev => [...prev, 2]);
      }
      setCheckingExtension(false);
      if (extensionCheckTimer) {
        clearTimeout(extensionCheckTimer);
        setExtensionCheckTimer(null);
      }
    }
  }, [isExtensionInstalled, completedSteps, extensionCheckTimer]);

  useEffect(() => {
    const guildId = searchParams.get('guild_id');
    
    if (guildId && completedSteps.includes(1) && !completedSteps.includes(3) && !checkingBot) {
      console.log(`[BotCheck] Guild ID detected: ${guildId}. Starting poll...`);
      setCheckingBot(true);
      
      const pollBotStatus = async () => {
        console.log(`[BotCheck] Requesting status for guild: ${guildId}`);
        try {
          // Chamada direta para o RPC com o parâmetro correto
          const { data, error } = await supabase.rpc('is_bot_in_guild', { 
            guild_id_input: String(guildId) 
          });
          
          if (error) {
            console.error("[BotCheck] Supabase RPC Error:", error.message, error.details);
            return false;
          }

          console.log(`[BotCheck] Server response:`, data);
          
          if (data === true) {
            console.log("[BotCheck] Success! Bot active. Completing step 3.");
            setCompletedSteps(prev => [...prev, 3]);
            setCheckingBot(false);
            return true;
          }
        } catch (err) {
          console.error("[BotCheck] Critical error:", err);
        }
        return false;
      };

      pollBotStatus();

      const interval = setInterval(async () => {
        const isFinished = await pollBotStatus();
        if (isFinished) {
          clearInterval(interval);
        }
      }, 5000);

      setBotCheckTimer(interval);
      return () => clearInterval(interval);
    }
  }, [searchParams, completedSteps, checkingBot]);

  const steps = [
    { id: 1, title: "Login", description: "Access your dashboard and manage your communities", icon: Lock, action: "Login", link: DiscordOAuthUrl, requiresAuth: false },
    { id: 2, title: "Install Extension", description: "Enhance your Discord experience with our browser extension", icon: Puzzle, action: "Install Extension", requiresAuth: true },
    { id: 3, title: "Add Bot", description: "Add the LostyoCord bot to your Discord server", icon: Bot, action: "Add to Discord", requiresAuth: true }
  ];

  const handleCompleteStep = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (step?.requiresAuth && !isAuthenticated) {
      window.location.href = DiscordOAuthUrl;
      return;
    }
    if (stepId === 2) {
      window.open('https://google.com', '_blank');
      setCheckingExtension(true);
      const timer = setInterval(() => { window.dispatchEvent(new CustomEvent('lostyo-ready')); }, 5000);
      setExtensionCheckTimer(timer);
      return;
    }
    if (stepId === 3) {
      window.location.href = '/safe-alert';
      return;
    }
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  useEffect(() => {
    return () => {
      if (extensionCheckTimer) clearTimeout(extensionCheckTimer);
      if (botCheckTimer) clearInterval(botCheckTimer);
    };
  }, [extensionCheckTimer, botCheckTimer]);

  useEffect(() => {
    if (completedSteps.length === steps.length) {
      const timer = setTimeout(() => { setShowFinalButton(true); }, 800);
      return () => clearTimeout(timer);
    } else {
      setShowFinalButton(false);
    }
  }, [completedSteps, steps.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
        <Loader2 className="animate-spin text-[#5865F2] w-12 h-12" />
        <p className="text-white/40 mt-4">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Get Started</motion.h1>
          <div className="flex justify-center items-center mb-12">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className={`flex flex-col items-center ${completedSteps.includes(step.id) ? 'text-green-500' : 'text-red-500'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${completedSteps.includes(step.id) ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'}`}>
                      {completedSteps.includes(step.id) ? <Check size={20} /> : <step.icon size={20} />}
                    </div>
                    <span className="text-xs font-bold">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && <div className={`w-16 h-0.5 mx-2 ${completedSteps.includes(step.id) && completedSteps.includes(steps[index + 1].id) ? 'bg-green-500' : 'bg-gray-700'}`}></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            const isStep1 = step.id === 1;
            const isStep2 = step.id === 2;
            const isStep3 = step.id === 3;
            const isDisabled = index > 0 && !completedSteps.includes(steps[index - 1].id) && !isCompleted;
            
            return (
              <div key={step.id} className={cn("bg-[#141417] p-6 rounded-2xl flex flex-col items-center text-center border", isDisabled ? "opacity-50" : "border-[#1A1A1E]")}>
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", isCompleted ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500")}><Icon size={24} /></div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                {isStep1 ? (
                  <Button className="w-full" disabled={isAuthenticated} onClick={() => handleCompleteStep(1)}>{isAuthenticated ? "Logged In" : "Login"}</Button>
                ) : isStep2 ? (
                  <Button className="w-full" disabled={isDisabled || isCompleted || checkingExtension} onClick={() => handleCompleteStep(2)}>
                    {isCompleted ? "Installed" : checkingExtension ? "Checking..." : "Install"}
                  </Button>
                ) : (
                  <Button className="w-full" disabled={isDisabled || isCompleted || checkingBot} onClick={() => handleCompleteStep(3)}>
                    {isCompleted ? "Bot Added" : checkingBot ? "Verifying..." : "Add Bot"}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center">
          <Link href={showFinalButton ? "/dashboard" : "#"} passHref>
            <Button size="lg" disabled={!showFinalButton} className={cn("px-12 h-14 rounded-full font-bold", showFinalButton ? "bg-green-500" : "bg-gray-600")}>
              {showFinalButton ? "Go to Dashboard" : "Complete all steps"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center"><Loader2 className="animate-spin text-[#5865F2]" /></div>}>
      <StartPageContent />
    </Suspense>
  );
}