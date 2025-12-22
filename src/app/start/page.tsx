"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, Loader2 } from 'lucide-react';
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
  
  const isExtensionInstalled = useExtensionDetector();
  const searchParams = useSearchParams();

  const DiscordOAuthUrl = `https://discord.com/oauth2/authorize?client_id=1399625245585051708&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fauth%2Fcallback&scope=identify+guilds+guilds.join`;

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = Cookies.get('discord_access_token');
      if (accessToken) {
        setIsAuthenticated(true);
        setCompletedSteps(prev => prev.includes(1) ? prev : [...prev, 1]);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isExtensionInstalled && completedSteps.includes(1) && !completedSteps.includes(2)) {
      setCompletedSteps(prev => [...prev, 2]);
      setCheckingExtension(false);
    }
  }, [isExtensionInstalled, completedSteps]);

  useEffect(() => {
    const guildId = searchParams.get('guild_id');
    if (guildId && completedSteps.includes(1) && !completedSteps.includes(3) && !checkingBot) {
      setCheckingBot(true);
      
      const verifyBot = async () => {
        console.log(`[BotCheck] Verifying guild: ${guildId}`);
        
        // Método 1: RPC Padrão
        try {
          const { data: rpc1, error: err1 } = await supabase.rpc('is_bot_in_guild', { guild_id_input: guildId });
          if (!err1 && rpc1 === true) return true;
          if (err1) console.warn("[BotCheck] Method 1 (RPC) failed:", err1.message);
        } catch (e) {}

        // Método 2: Query Direta na Tabela (Fallback mais confiável)
        try {
          const { data: table, error: err2 } = await supabase
            .from('guilds')
            .select('state')
            .eq('guild_id', guildId)
            .eq('state', true)
            .maybeSingle();
          if (!err2 && table) return true;
          if (err2) console.warn("[BotCheck] Method 2 (Table) failed:", err2.message);
        } catch (e) {}

        // Método 3: RPC V2 com JSON
        try {
          const { data: rpc2, error: err3 } = await supabase.rpc('check_bot_v2', { payload: { guild_id: guildId } });
          if (!err3 && rpc2 === true) return true;
          if (err3) console.warn("[BotCheck] Method 3 (RPC V2) failed:", err3.message);
        } catch (e) {}

        return false;
      };

      const interval = setInterval(async () => {
        const success = await verifyBot();
        if (success) {
          console.log("[BotCheck] Bot detected via one of the methods!");
          setCompletedSteps(prev => prev.includes(3) ? prev : [...prev, 3]);
          setCheckingBot(false);
          clearInterval(interval);
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [searchParams, completedSteps, checkingBot]);

  useEffect(() => {
    if (completedSteps.length >= 3) {
      setShowFinalButton(true);
    }
  }, [completedSteps]);

  const steps = [
    { id: 1, title: "Login", icon: Lock, requiresAuth: false },
    { id: 2, title: "Extension", icon: Puzzle, requiresAuth: true },
    { id: 3, title: "Add Bot", icon: Bot, requiresAuth: true }
  ];

  const handleStepAction = (id: number) => {
    if (id === 1) window.location.href = DiscordOAuthUrl;
    if (id === 2) {
      window.open('https://google.com', '_blank');
      setCheckingExtension(true);
    }
    if (id === 3) window.location.href = '/safe-alert';
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#5865F2]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-black text-white mb-8 tracking-tight">Get Started</motion.h1>
          
          <div className="flex justify-center items-center mb-12">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                    completedSteps.includes(step.id) 
                      ? "bg-green-500/20 border-green-500 text-green-500" 
                      : "bg-[#141417] border-[#1A1A1E] text-white/20"
                  )}>
                    {completedSteps.includes(step.id) ? <Check size={24} /> : <step.icon size={24} />}
                  </div>
                  <span className={cn("text-xs font-bold mt-2", completedSteps.includes(step.id) ? "text-green-500" : "text-white/20")}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-16 h-0.5 mx-2 transition-colors duration-500",
                    completedSteps.includes(step.id) && completedSteps.includes(steps[index+1].id) ? "bg-green-500" : "bg-white/5"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {steps.map((step, idx) => {
            const isDone = completedSteps.includes(step.id);
            const isLocked = idx > 0 && !completedSteps.includes(steps[idx-1].id);
            
            return (
              <div key={step.id} className={cn(
                "bg-[#141417] p-6 rounded-3xl border transition-all",
                isDone ? "border-green-500/30" : isLocked ? "opacity-40 border-transparent" : "border-[#1A1A1E]"
              )}>
                <h3 className="text-white font-bold mb-4">{step.title}</h3>
                <Button 
                  className={cn(
                    "w-full rounded-2xl font-bold h-12",
                    isDone ? "bg-green-500 hover:bg-green-600 text-white" : "bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  )}
                  disabled={isLocked || (step.id === 1 && isAuthenticated) || (step.id === 2 && checkingExtension) || (step.id === 3 && checkingBot)}
                  onClick={() => handleStepAction(step.id)}
                >
                  {isDone ? "Completed" : (step.id === 2 && checkingExtension) || (step.id === 3 && checkingBot) ? "Checking..." : "Action"}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link href={showFinalButton ? "/dashboard" : "#"}>
            <Button 
              disabled={!showFinalButton}
              className={cn(
                "px-12 h-14 rounded-full font-black text-lg transition-all",
                showFinalButton ? "bg-green-500 hover:bg-green-600 text-white" : "bg-white/5 text-white/20"
              )}
            >
              Go to Dashboard
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