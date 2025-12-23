"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useExtensionDetector } from '@/hooks/useExtensionDetector';
import Cookies from 'js-cookie';

function StartPageContent() {
  const searchParams = useSearchParams();
  const isExtensionInstalled = useExtensionDetector();
  
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingBot, setCheckingBot] = useState(false);
  const [transitioning, setTransitioning] = useState<number | null>(null);

  // URLs Diretas
  const EXTENSION_URL = "https://chromewebstore.google.com"; // Substituir pela URL real da extensão
  const BOT_URL = "/safe-alert";

  // Verificação de Login (Passo 1)
  useEffect(() => {
    const loggedIn = Cookies.get('lostyo_logged_in') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
      setCompletedSteps(prev => prev.includes(1) ? prev : [...prev, 1]);
    }
    setLoading(false);
  }, []);

  // Verificação de Extensão (Passo 2)
  useEffect(() => {
    if (isExtensionInstalled && isAuthenticated && !completedSteps.includes(2) && !transitioning) {
      setTransitioning(2);
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, 2]);
        setTransitioning(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isExtensionInstalled, isAuthenticated, completedSteps, transitioning]);

  // Verificação do Bot (Passo 3)
  useEffect(() => {
    const guildId = searchParams.get('guild_id');
    if (guildId && completedSteps.includes(2) && !completedSteps.includes(3) && !checkingBot && !transitioning) {
      setCheckingBot(true);
      
      const pollBotStatus = async () => {
        try {
          const response = await fetch(`/api/check-bot?guild_id=${guildId}`);
          const data = await response.json();
          if (data.active === true) {
            setTransitioning(3);
            setTimeout(() => {
              setCompletedSteps(prev => [...prev, 3]);
              setCheckingBot(false);
              setTransitioning(null);
            }, 1000);
            return true;
          }
        } catch (err) {
          console.error("Bot check failed", err);
        }
        return false;
      };

      const interval = setInterval(async () => {
        const isFound = await pollBotStatus();
        if (isFound) clearInterval(interval);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [searchParams, completedSteps, checkingBot, transitioning]);

  if (loading) return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#5865F2] w-10 h-10" />
    </div>
  );

  const steps = [
    { 
      id: 1, 
      title: "Identity", 
      icon: Lock, 
      label: "Login with Discord", 
      desc: "Connect your account to sync preferences.",
      href: "/login",
      isExternal: false
    },
    { 
      id: 2, 
      title: "Enhance", 
      icon: Puzzle, 
      label: "Install Extension", 
      desc: "Unlock advanced dashboard features.",
      href: EXTENSION_URL,
      isExternal: true
    },
    { 
      id: 3, 
      title: "Connect", 
      icon: Bot, 
      label: "Add our Bot", 
      desc: "Bring LostyoCord to your community.",
      href: BOT_URL,
      isExternal: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white flex flex-col items-center justify-center p-6 selection:bg-[#5865F2]/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5865F2]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5865F2]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1E] border border-white/5 mb-6"
          >
            <Sparkles className="w-3 h-3 text-[#5865F2]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Setup Wizard</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-4"
          >
            Finish your <span className="text-[#5865F2]">installation.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-medium text-lg max-w-xl mx-auto"
          >
            Complete these three simple steps to unlock the full power of your community dashboard.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, idx) => {
            const isDone = completedSteps.includes(step.id);
            const isCurrent = (completedSteps.length + 1 === step.id) || (step.id === 1 && !isAuthenticated);
            const isLocked = step.id > completedSteps.length + 1;
            const Icon = step.icon;
            const isChecking = (step.id === 3 && checkingBot) || transitioning === step.id;

            const buttonContent = (
              <Button 
                disabled={isDone || isLocked || isChecking}
                className={cn(
                  "w-full h-12 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all",
                  isDone ? "bg-green-500/10 text-green-500 cursor-default" :
                  isChecking ? "bg-[#1A1A1E] text-white/30" :
                  isLocked ? "bg-[#1A1A1E] text-white/10" :
                  "bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865F2]/20"
                )}
              >
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="done">Success</motion.span>
                  ) : isChecking ? (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="check" className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" /> Verifying
                    </motion.span>
                  ) : (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="action">{step.label}</motion.span>
                  )}
                </AnimatePresence>
              </Button>
            );

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={cn(
                  "relative group bg-[#141417] p-8 rounded-[2.5rem] border transition-all duration-500",
                  isDone ? "border-green-500/20 bg-green-500/[0.02]" : 
                  isCurrent ? "border-[#5865F2]/30 shadow-[0_0_40px_-15px_rgba(88,101,242,0.1)]" : 
                  "border-white/5 opacity-40 grayscale"
                )}
              >
                <div className={cn(
                  "absolute top-6 right-8 text-[10px] font-black uppercase tracking-widest",
                  isDone ? "text-green-500" : "text-white/10"
                )}>
                  Step 0{step.id}
                </div>

                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500",
                  isDone ? "bg-green-500/10 text-green-500" : 
                  isCurrent ? "bg-[#5865F2]/10 text-[#5865F2]" : "bg-white/5 text-white/20"
                )}>
                  {isDone ? <Check size={28} strokeWidth={3} /> : <Icon size={28} />}
                </div>

                <h3 className="text-xl font-bold mb-2 tracking-tight">{step.title}</h3>
                <p className="text-white/30 text-sm font-medium leading-relaxed mb-8">
                  {step.desc}
                </p>

                {isDone || isLocked ? (
                  buttonContent
                ) : step.isExternal ? (
                  <a href={step.href} target="_blank" rel="noopener noreferrer" className="block w-full">
                    {buttonContent}
                  </a>
                ) : (
                  <Link href={step.href} className="block w-full">
                    {buttonContent}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <div className={cn(
              "absolute inset-0 bg-[#5865F2] blur-2xl opacity-0 transition-opacity duration-500",
              completedSteps.length === 3 && "group-hover:opacity-20"
            )} />
            <Link href={completedSteps.length === 3 ? "/dashboard" : "#"}>
              <Button 
                disabled={completedSteps.length < 3}
                className={cn(
                  "relative px-16 h-16 rounded-full font-black text-lg transition-all duration-500",
                  completedSteps.length === 3 
                    ? "bg-white text-black hover:scale-105 active:scale-95" 
                    : "bg-white/5 text-white/10 cursor-not-allowed"
                )}
              >
                Go to Dashboard
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5865F2] w-10 h-10" />
      </div>
    }>
      <StartPageContent />
    </Suspense>
  );
}