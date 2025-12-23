"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useExtensionDetector } from '@/hooks/useExtensionDetector';
import Cookies from 'js-cookie';

function StartPageContent() {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingExtension, setCheckingExtension] = useState(false);
  const [checkingBot, setCheckingBot] = useState(false);
  const isExtensionInstalled = useExtensionDetector();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Verifica se o usuário está logado através do cookie
    const loggedIn = Cookies.get('lostyo_logged_in') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
      setCompletedSteps(prev => prev.includes(1) ? prev : [...prev, 1]);
    }
    setLoading(false);
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
      const pollBotStatus = async () => {
        try {
          // Busca o status do bot na API
          const response = await fetch(`/api/check-bot?guild_id=${guildId}`);
          const data = await response.json();
          if (data.active === true) {
            setCompletedSteps(prev => prev.includes(3) ? prev : [...prev, 3]);
            setCheckingBot(false);
            return true;
          }
        } catch (err) {
          console.error("Bot check failed", err);
        }
        return false;
      };

      pollBotStatus();
      const interval = setInterval(async () => {
        const isFound = await pollBotStatus();
        if (isFound) clearInterval(interval);
      }, 3500);

      return () => clearInterval(interval);
    }
  }, [searchParams, completedSteps, checkingBot]);

  useEffect(() => {
    if (completedSteps.length >= 3) setShowFinalButton(true);
  }, [completedSteps]);

  const handleStepAction = async (id: number) => {
    if (id === 1) router.push('/login');
    if (id === 2) {
      window.open('https://google.com', '_blank'); // Link de exemplo para extensão
      setCheckingExtension(true);
    }
    if (id === 3) router.push('/safe-alert');
  };

  if (loading) return <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center"><Loader2 className="animate-spin text-[#5865F2] w-12 h-12" /></div>;

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-4xl font-black text-white mb-8 tracking-tight"
          >
            Get Started
          </motion.h1>
          <div className="flex justify-center items-center mb-12">
            {[1, 2, 3].map((id, idx) => {
              const icons = [Lock, Puzzle, Bot];
              const titles = ["Login", "Extension", "Add Bot"];
              const Icon = icons[idx];
              const isDone = completedSteps.includes(id);
              
              return (
                <React.Fragment key={id}>
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2",
                      isDone 
                        ? "bg-green-500/20 border-green-500 text-green-500" 
                        : "bg-[#141417] border-[#1A1A1E] text-white/20"
                    )}>
                      {isDone ? <Check size={24} /> : <Icon size={24} />}
                    </div>
                    <span className={cn(
                      "text-xs font-bold mt-2",
                      isDone ? "text-green-500" : "text-white/20"
                    )}>
                      {titles[idx]}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={cn(
                      "w-16 h-0.5 mx-2",
                      isDone && completedSteps.includes(id + 1) 
                        ? "bg-green-500" 
                        : "bg-white/5"
                    )} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[1, 2, 3].map((id, idx) => {
            const icons = [Lock, Puzzle, Bot];
            const titles = ["Login", "Extension", "Add Bot"];
            const isDone = completedSteps.includes(id);
            const isLocked = idx > 0 && !completedSteps.includes(id - 1);
            const Icon = icons[idx];
            
            let buttonLabel = "Action";
            if (id === 1) buttonLabel = "Login";
            if (id === 2) buttonLabel = "Install";
            if (id === 3) buttonLabel = "Add Bot";
            
            return (
              <div 
                key={id} 
                className={cn(
                  "bg-[#141417] p-8 rounded-3xl border flex flex-col items-center text-center",
                  isDone 
                    ? "border-green-500/30" 
                    : isLocked 
                      ? "opacity-40" 
                      : "border-[#1A1A1E]"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                  isDone 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-white/5 text-white/20"
                )}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-6">{titles[idx]}</h3>
                <Button 
                  className={cn(
                    "w-full rounded-2xl font-bold h-12",
                    isDone 
                      ? "bg-green-500 text-white" 
                      : "bg-[#5865F2] text-white"
                  )}
                  disabled={
                    isLocked || 
                    (id === 1 && isAuthenticated) || 
                    (id === 2 && (checkingExtension || isDone)) || 
                    (id === 3 && (checkingBot || isDone))
                  }
                  onClick={() => handleStepAction(id)}
                >
                  {isDone 
                    ? "Completed" 
                    : (id === 2 && checkingExtension) || (id === 3 && checkingBot) 
                      ? "Checking..." 
                      : buttonLabel}
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
                "px-12 h-14 rounded-full font-black text-lg",
                showFinalButton 
                  ? "bg-green-500 text-white" 
                  : "bg-white/5 text-white/20"
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
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5865F2]" />
      </div>
    }>
      <StartPageContent />
    </Suspense>
  );
}