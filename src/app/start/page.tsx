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
      <div className="max-w-4xl w-full"> {/* Increased max-width */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight"
          >
            Setup Your Community
          </motion.h1>
          
          {/* Step Indicator Bar */}
          <div className="flex justify-center items-center mb-16">
            {[1, 2, 3].map((id, idx) => {
              const icons = [Lock, Puzzle, Bot];
              const titles = ["Discord Login", "Install Extension", "Add Bot to Server"];
              const Icon = icons[idx];
              const isDone = completedSteps.includes(id);
              
              return (
                <React.Fragment key={id}>
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-500",
                        isDone 
                          ? "bg-green-500/20 border-green-500 text-green-500 shadow-lg shadow-green-500/20" 
                          : "bg-[#141417] border-[#1A1A1E] text-white/20"
                      )}
                    >
                      {isDone ? <Check size={32} /> : <Icon size={28} />}
                    </motion.div>
                    <span className={cn(
                      "text-sm font-bold mt-3 whitespace-nowrap",
                      isDone ? "text-green-500" : "text-white/40"
                    )}>
                      {titles[idx]}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div className={cn(
                      "w-20 h-1 mx-4 transition-colors duration-500",
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
        
        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3].map((id, idx) => {
            const icons = [Lock, Puzzle, Bot];
            const titles = ["Login", "Extension", "Add Bot"];
            const descriptions = [
              "Securely connect your Discord account to manage your servers.",
              "Install the LostyoCord browser extension for enhanced features.",
              "Invite the bot to your desired Discord server with necessary permissions."
            ];
            
            const isDone = completedSteps.includes(id);
            const isLocked = idx > 0 && !completedSteps.includes(id - 1);
            const Icon = icons[idx];
            
            let buttonLabel = "Action";
            if (id === 1) buttonLabel = "Login";
            if (id === 2) buttonLabel = "Install";
            if (id === 3) buttonLabel = "Add Bot";
            
            return (
              <motion.div 
                key={id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={!isLocked && !isDone ? { y: -5 } : {}}
                className={cn(
                  "bg-[#141417] p-10 rounded-[3rem] border flex flex-col items-center text-center transition-all duration-300",
                  isDone 
                    ? "border-green-500/50 shadow-xl shadow-green-500/10" 
                    : isLocked 
                      ? "opacity-50 border-[#1A1A1E]" 
                      : "border-[#1A1A1E] hover:border-[#5865F2]/30"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                  isDone 
                    ? "bg-green-500/10 text-green-500" 
                    : "bg-[#5865F2]/10 text-[#5865F2]"
                )}>
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{titles[idx]}</h3>
                <p className="text-white/40 text-sm mb-8 flex-grow">{descriptions[idx]}</p>
                
                <Button 
                  className={cn(
                    "w-full rounded-full font-bold h-12 transition-all duration-300",
                    isDone 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "bg-[#5865F2] hover:bg-[#4752C4] text-white"
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
                      ? <><Loader2 className="animate-spin w-4 h-4 mr-2" /> Checking...</>
                      : buttonLabel}
                </Button>
              </motion.div>
            );
          })}
        </div>
        
        {/* Final Button */}
        <div className="flex justify-center">
          <Link href={showFinalButton ? "/dashboard" : "#"}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={showFinalButton ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            >
              <Button 
                disabled={!showFinalButton}
                className={cn(
                  "px-16 h-16 rounded-full font-black text-xl transition-all duration-500",
                  showFinalButton 
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-2xl shadow-green-500/30" 
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                )}
              >
                Go to Dashboard
              </Button>
            </motion.div>
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
        <Loader2 className="animate-spin text-[#5865F2] w-12 h-12" />
      </div>
    }>
      <StartPageContent />
    </Suspense>
  );
}