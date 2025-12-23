"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, Loader2, Sparkles } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useExtensionDetector } from '@/hooks/useExtensionDetector';
import Cookies from 'js-cookie';

const StepIndicator = ({ id, isDone, title }: { id: number, isDone: boolean, title: string }) => {
  return (
    <div className="flex flex-col items-center relative z-10">
      <motion.div
        key={id}
        initial={false}
        animate={isDone ? "done" : "initial"}
        variants={{
          initial: { scale: 1, rotate: 0 },
          done: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
        }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 font-bold text-lg",
          isDone 
            ? "bg-green-500 border-green-500 text-white" 
            : "bg-[#141417] border-[#1A1A1E] text-white/40"
        )}
      >
        {isDone ? <Check size={24} /> : id}
      </motion.div>
      <span className={cn(
        "text-sm font-bold mt-3 transition-colors duration-500",
        isDone ? "text-white" : "text-white/40"
      )}>
        {title}
      </span>
    </div>
  );
};

function StartPageContent() {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingExtension, setCheckingExtension] = useState(false);
  const [checkingBot, setCheckingBot] = useState(false);
  const isExtensionInstalled = useExtensionDetector();
  const searchParams = useSearchParams();
  
  const titles = ["Login", "Extension", "Add Bot"];

  const completeStepWithDelay = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setTimeout(() => {
        setCompletedSteps(prev => {
          const newSteps = [...prev, stepId];
          if (stepId === 3) {
            Cookies.set('onboarding_complete', 'true', { expires: 30 });
          }
          return newSteps;
        });
      }, 1500);
    }
  };

  useEffect(() => {
    const loggedIn = Cookies.get('lostyo_logged_in') === 'true';
    if (loggedIn) {
      setIsAuthenticated(true);
      completeStepWithDelay(1);
    }
    
    if (Cookies.get('onboarding_complete') === 'true') {
      setCompletedSteps([1, 2, 3]);
      setShowFinalMessage(true);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isExtensionInstalled && completedSteps.includes(1) && !completedSteps.includes(2)) {
      setCheckingExtension(false);
      completeStepWithDelay(2);
    }
  }, [isExtensionInstalled, completedSteps]);

  useEffect(() => {
    const guildId = searchParams.get('guild_id');
    if (guildId && completedSteps.includes(2) && !completedSteps.includes(3) && !checkingBot) {
      setCheckingBot(true);
      const pollBotStatus = async () => {
        try {
          const response = await fetch(`/api/check-bot?guild_id=${guildId}`);
          const data = await response.json();
          if (data.active === true) {
            setCheckingBot(false);
            completeStepWithDelay(3);
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
    if (completedSteps.includes(3)) {
      setTimeout(() => {
        setShowFinalMessage(true);
      }, 1500);
    }
  }, [completedSteps]);

  const handleStepAction = async (id: number) => {
    if (id === 1) router.push('/login');
    if (id === 2) {
      window.open('https://google.com', '_blank');
      setCheckingExtension(true);
    }
    if (id === 3) router.push('/safe-alert');
  };

  if (loading) return <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center"><Loader2 className="animate-spin text-[#5865F2] w-12 h-12" /></div>;

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tight"
          >
            Setup Your Community
          </motion.h1>
          
          <div className="flex justify-center items-center mb-12">
            {[1, 2, 3].map((id, idx) => {
              const isDone = completedSteps.includes(id);
              const isNextDone = completedSteps.includes(id + 1);
              
              return (
                <React.Fragment key={id}>
                  <StepIndicator id={id} isDone={isDone} title={titles[idx]} />
                  {idx < 2 && (
                    <div className={cn(
                      "w-20 h-1 mx-2 transition-colors duration-500",
                      isNextDone ? "bg-green-500" : "bg-[#1A1A1E]"
                    )} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((id, idx) => {
            const icons = [Lock, Puzzle, Bot];
            const descriptions = [
              "Securely connect your Discord account to manage your servers.",
              "Install our browser extension for seamless integration and features.",
              "Invite LostyoCord to your server and grant necessary permissions."
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
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={cn(
                  "bg-[#141417] p-8 rounded-[2rem] border flex flex-col items-center text-center transition-all duration-500 h-full",
                  isDone 
                    ? "border-green-500/50" 
                    : isLocked 
                      ? "opacity-50 border-[#1A1A1E] cursor-not-allowed" 
                      : "border-[#1A1A1E] hover:border-[#5865F2]/50"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500",
                  isDone 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-white/5 text-white/40"
                )}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{titles[idx]}</h3>
                <p className="text-white/40 text-sm mb-8 flex-grow">{descriptions[idx]}</p>
                
                <Button 
                  className={cn(
                    "w-full rounded-full font-bold h-12 transition-all duration-300",
                    isDone 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "bg-[#5865F2] hover:bg-[#4752C4] text-white",
                    ((id === 2 && checkingExtension) || (id === 3 && checkingBot)) && "opacity-70 cursor-not-allowed"
                  )}
                  disabled={
                    isLocked || 
                    (id === 1 && isAuthenticated) || 
                    (id === 2 && (checkingExtension || isDone)) || 
                    (id === 3 && (checkingBot || isDone))
                  }
                  onClick={() => handleStepAction(id)}
                >
                  {(id === 2 && checkingExtension) || (id === 3 && checkingBot) 
                    ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> 
                    : null}
                  {isDone 
                    ? "Completed" 
                    : (id === 2 && checkingExtension) || (id === 3 && checkingBot) 
                      ? "Checking..." 
                      : buttonLabel}
                </Button>
              </motion.div>
            );
          })}
        </div>
        
        <AnimatePresence>
          {showFinalMessage && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center mt-16 p-8 bg-green-500/10 rounded-[3rem] border border-green-500/20 text-center"
            >
              <Sparkles className="text-green-500 mb-4" size={40} />
              <h2 className="text-2xl font-black text-white mb-2">Setup Complete!</h2>
              <p className="text-white/50 font-medium">Your community is now synchronized with LostyoCord.</p>
            </motion.div>
          )}
        </AnimatePresence>
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