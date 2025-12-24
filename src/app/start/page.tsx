"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, Loader2 } from 'lucide-react';
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
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingExtension, setCheckingExtension] = useState(false);
  const [checkingBot, setCheckingBot] = useState(false);
  const isExtensionInstalled = useExtensionDetector();
  const searchParams = useSearchParams();
  
  const titles = ["Login", "Extension", "Add Bot"];

  useEffect(() => {
    // Agora checamos apenas por cookies/localStorage para o Step 1 manual
    const checkAuth = () => {
      const isLoggedIn = Cookies.get('lostyo_logged_in') === 'true';
      if (isLoggedIn) {
        setIsAuthenticated(true);
        if (!completedSteps.includes(1)) setCompletedSteps(prev => [...prev, 1]);
      }
      setLoading(false);
    };
    checkAuth();
  }, [completedSteps]);

  useEffect(() => {
    if (isExtensionInstalled && completedSteps.includes(1) && !completedSteps.includes(2)) {
      setCheckingExtension(false);
      setCompletedSteps(prev => [...prev, 2]);
    }
  }, [isExtensionInstalled, completedSteps]);

  useEffect(() => {
    const guildId = searchParams.get('guild_id');
    if (guildId && completedSteps.includes(2) && !completedSteps.includes(3) && !checkingBot) {
      setCheckingBot(true);
      setTimeout(() => {
        setCheckingBot(false);
        setCompletedSteps(prev => [...prev, 3]);
        setShowFinalButton(true);
      }, 3000);
    }
  }, [searchParams, completedSteps, checkingBot]);

  const handleStepAction = (id: number) => {
    if (id === 1) router.push('/login');
    if (id === 2) {
      window.open('https://google.com', '_blank');
      setCheckingExtension(true);
    }
    if (id === 3) router.push('/safe-alert');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-12 tracking-tight">Setup Your Community</h1>
          <div className="flex justify-center items-center mb-12">
            {[1, 2, 3].map((id, idx) => (
              <React.Fragment key={id}>
                <StepIndicator id={id} isDone={completedSteps.includes(id)} title={titles[idx]} />
                {idx < 2 && <div className={cn("w-20 h-1 mx-2", completedSteps.includes(id + 1) ? "bg-green-500" : "bg-[#1A1A1E]")} />}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id, idx) => {
            const icons = [Lock, Puzzle, Bot];
            const isDone = completedSteps.includes(id);
            const isLocked = idx > 0 && !completedSteps.includes(id - 1);
            const Icon = icons[idx];
            
            return (
              <div key={id} className={cn("bg-[#141417] p-8 rounded-[2rem] border flex flex-col items-center text-center", isDone ? "border-green-500/50" : isLocked ? "opacity-50 border-[#1A1A1E]" : "border-[#1A1A1E]")}>
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6", isDone ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/40")}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{titles[idx]}</h3>
                <Button 
                  disabled={isLocked || isDone} 
                  onClick={() => handleStepAction(id)}
                  className={cn("w-full rounded-full font-bold h-12", isDone ? "bg-green-600" : "bg-[#5865F2]")}
                >
                  {isDone ? "Done" : id === 1 ? "Login" : id === 2 ? "Install" : "Add Bot"}
                </Button>
              </div>
            );
          })}
        </div>
        
        {showFinalButton && (
          <div className="flex justify-center mt-16">
            <Button onClick={() => router.push('/dashboard')} className="px-16 h-16 rounded-full font-black text-xl bg-green-500 text-white">
              Go to Dashboard
            </Button>
          </div>
        )}
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