"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useExtensionDetector } from '@/hooks/useExtensionDetector';
import Cookies from 'js-cookie';

function StartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExtensionInstalled = useExtensionDetector();
  
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingExtension, setCheckingExtension] = useState(false);
  const [checkingBot, setCheckingBot] = useState(false);
  const [transitioning, setTransitioning] = useState<number | null>(null);

  // Inicialização e verificação do Passo 1 (Login)
  useEffect(() => {
    const loggedIn = Cookies.get('lostyo_logged_in') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
      if (!completedSteps.includes(1)) {
        setCompletedSteps(prev => [...prev, 1]);
      }
    }
    setLoading(false);
  }, [completedSteps]);

  // Verificação do Passo 2 (Extensão) com delay
  useEffect(() => {
    if (isExtensionInstalled && completedSteps.includes(1) && !completedSteps.includes(2) && !transitioning) {
      setTransitioning(2);
      setCheckingExtension(true);
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, 2]);
        setCheckingExtension(false);
        setTransitioning(null);
      }, 1500); // 1.5s de atraso para parecer mais orgânico
      return () => clearTimeout(timer);
    }
  }, [isExtensionInstalled, completedSteps, transitioning]);

  // Verificação do Passo 3 (Bot) com delay e polling
  useEffect(() => {
    const guildId = searchParams.get('guild_id');
    if (guildId && completedSteps.includes(2) && !completedSteps.includes(3) && !checkingBot && !transitioning) {
      setCheckingBot(true);
      setTransitioning(3);
      
      const pollBotStatus = async () => {
        try {
          const response = await fetch(`/api/check-bot?guild_id=${guildId}`);
          const data = await response.json();
          if (data.active === true) {
            setTimeout(() => {
              setCompletedSteps(prev => [...prev, 3]);
              setCheckingBot(false);
              setTransitioning(null);
            }, 1500);
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

  const handleStepAction = (id: number) => {
    if (id === 1) router.push('/login');
    if (id === 2) {
      window.open('https://google.com', '_blank'); // Link da extensão
      setCheckingExtension(true);
    }
    if (id === 3) router.push('/safe-alert');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#5865F2] w-10 h-10" />
    </div>
  );

  const steps = [
    { id: 1, title: "Identity", icon: Lock, label: "Login with Discord", desc: "Connect your account to sync preferences." },
    { id: 2, title: "Enhance", icon: Puzzle, label: "Install Extension", desc: "Unlock advanced dashboard features." },
    { id: 3, title: "Connect", icon: Bot, label: "Add our Bot", desc: "Bring LostyoCord to your community." }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white flex flex-col items-center justify-center p-4 md:p-6 selection:bg-[#5865F2]/30">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5865F2]/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#5865F2]/5 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <header className="text-center mb-12 md:mb-16">
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
            className="text-3xl md:text-5xl font-black tracking-tight mb-4"
          >
            Finish your <span className="text-[#5865F2]">installation.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-medium text-base md:text-lg max-w-xl mx-auto px-4"
          >
            Complete these three simple steps to unlock the full power of your community dashboard.
          </motion.p>
        </header>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {steps.map((step, idx) => {
            const isDone = completedSteps.includes(step.id);
            const isCurrent = (completedSteps.length + 1 === step.id) || (step.id === 1 && !isAuthenticated);
            const isLocked = step.id > completedSteps.length + 1;
            const Icon = step.icon;
            const isChecking = (step.id === 2 && checkingExtension) || (step.id === 3 && checkingBot) || transitioning === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={cn(
                  "relative group bg-[#141417] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-500",
                  isDone ? "border-green-500/20 bg-green-500/[0.02]" : 
                  isCurrent ? "border-[#5865F2]/30 shadow-[0_0_30px_-10px_rgba(88,101,242,0.1)]" : 
                  "border-white/5 opacity-40 grayscale"
                )}
              >
                {/* Step Number Badge */}
                <div className={cn(
                  "absolute top-4 right-4 md:top-6 md:right-8 text-[9px] md:text-[10px] font-black uppercase tracking-widest",
                  isDone ? "text-green-500" : "text-white/10"
                )}>
                  Step 0{step.id}
                </div>

                <div className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500",
                  isDone ? "bg-green-500/10 text-green-500" : 
                  isCurrent ? "bg-[#5865F2]/10 text-[#5865F2]" : "bg-white/5 text-white/20"
                )}>
                  {isDone ? <Check size={24} strokeWidth={3} /> : <Icon size={24} />}
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-2 tracking-tight">{step.title}</h3>
                <p className="text-white/30 text-xs md:text-sm font-medium leading-relaxed mb-6">
                  {step.desc}
                </p>

                <Button 
                  onClick={() => handleStepAction(step.id)}
                  disabled={isDone || isLocked || isChecking}
                  className={cn(
                    "w-full h-10 md:h-12 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all",
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
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <div className={cn(
              "absolute inset-0 bg-[#5865F2] blur-xl opacity-0 transition-opacity duration-500",
              completedSteps.length === 3 && "group-hover:opacity-20"
            )} />
            <Link href={completedSteps.length === 3 ? "/dashboard" : "#"}>
              <Button 
                disabled={completedSteps.length < 3}
                className={cn(
                  "relative px-8 md:px-16 h-14 md:h-16 rounded-full font-black text-base md:text-lg transition-all duration-500",
                  completedSteps.length === 3 
                    ? "bg-white text-black hover:scale-105 active:scale-95" 
                    : "bg-white/5 text-white/10 cursor-not-allowed"
                )}
              >
                Go to Dashboard
                <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-5 md:h-5" />
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