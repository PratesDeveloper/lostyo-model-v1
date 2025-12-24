"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, Loader2, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useExtensionDetector } from '@/hooks/useExtensionDetector';
import { supabase } from '@/integrations/supabase/client';
import Cookies from 'js-cookie';

const StepIndicator = ({ id, isDone, title, isActive }: { id: number, isDone: boolean, title: string, isActive: boolean }) => {
  return (
    <div className="flex flex-col items-center relative z-10">
      <motion.div
        animate={isDone ? "done" : isActive ? "active" : "initial"}
        variants={{
          initial: { scale: 1, backgroundColor: "rgba(20, 20, 23, 1)", borderColor: "rgba(26, 26, 30, 1)" },
          active: { scale: 1.1, backgroundColor: "rgba(26, 26, 30, 1)", borderColor: "rgba(88, 101, 242, 0.5)" },
          done: { scale: 1, backgroundColor: "rgba(34, 197, 94, 1)", borderColor: "rgba(34, 197, 94, 1)" }
        }}
        className="w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 font-bold text-sm"
      >
        {isDone ? <Check size={20} className="text-white" /> : <span className={cn(isActive ? "text-white" : "text-white/20")}>{id}</span>}
      </motion.div>
      <span className={cn(
        "text-[10px] font-black uppercase tracking-widest mt-4 transition-colors duration-500",
        isDone ? "text-green-500" : isActive ? "text-white" : "text-white/10"
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
  const [loading, setLoading] = useState(true);
  const [checkingExtension, setCheckingExtension] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const isExtensionInstalled = useExtensionDetector();
  const searchParams = useSearchParams();
  
  const steps = [
    { id: 1, title: "Login", icon: Lock, desc: "Connect your Discord account to begin.", action: "Link Account" },
    { id: 2, title: "Extension", icon: Puzzle, desc: "Install the companion for full features.", action: "Install Now" },
    { id: 3, title: "Add Bot", icon: Bot, desc: "Invite LostyoCord to your community.", action: "Invite Bot" }
  ];

  useEffect(() => {
    const isLoggedIn = Cookies.get('lostyo_logged_in') === 'true';
    if (isLoggedIn && !completedSteps.includes(1)) {
      setCompletedSteps(prev => [...prev, 1]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isExtensionInstalled && completedSteps.includes(1) && !completedSteps.includes(2)) {
      setCheckingExtension(false);
      setCompletedSteps(prev => [...prev, 2]);
    }
  }, [isExtensionInstalled, completedSteps]);

  useEffect(() => {
    const guildId = searchParams.get('guild_id');
    if (guildId && completedSteps.includes(2) && !completedSteps.includes(3)) {
      setCompletedSteps(prev => [...prev, 3]);
      setTimeout(() => setShowFinalButton(true), 1000);
    }
  }, [searchParams, completedSteps]);

  const handleStepAction = (id: number) => {
    if (id === 1) window.location.href = "https://discord.com/oauth2/authorize?client_id=1399625245585051708&response_type=code&redirect_uri=https%3A%2F%2Flostyo.com%2Fauth%2Fcallback&scope=guilds+identify+guilds.join";
    if (id === 2) {
      window.open('https://google.com', '_blank');
      setCheckingExtension(true);
    }
    if (id === 3) router.push('/safe-alert');
  };

  const finishOnboarding = async () => {
    setIsFinishing(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      await supabase
        .from('profiles')
        .update({ onboarding_complete: true })
        .eq('id', session.user.id);
    }
    
    Cookies.set('lostyo_onboarding_done', 'true', { expires: 365 });
    router.push('/dashboard');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-8"
          >
            Setup Wizard
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-16 tracking-tight">Ready to launch?</h1>
          
          <div className="flex justify-center items-center">
            {steps.map((step, idx) => (
              <React.Fragment key={step.id}>
                <StepIndicator 
                  id={step.id} 
                  isDone={completedSteps.includes(step.id)} 
                  isActive={completedSteps.length === idx || (idx === 0 && completedSteps.length === 0)}
                  title={step.title} 
                />
                {idx < 2 && (
                  <div className="w-16 h-[2px] mx-4 bg-white/5 relative overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: completedSteps.includes(step.id) ? "0%" : "-100%" }}
                      className="absolute inset-0 bg-green-500"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const isDone = completedSteps.includes(step.id);
            const isActive = completedSteps.length === idx || (idx === 0 && completedSteps.length === 0);
            const isLocked = !isActive && !isDone;
            const Icon = step.icon;
            
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn("relative group h-full", isLocked && "pointer-events-none")}
              >
                <div className={cn(
                  "h-full bg-[#141417] p-10 rounded-[2.5rem] border transition-all duration-500 flex flex-col",
                  isDone ? "border-green-500/20 bg-green-500/[0.02]" : 
                  isActive ? "border-white/10 shadow-2xl scale-[1.02]" : 
                  "border-white/5 opacity-30"
                )}>
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500",
                    isDone ? "bg-green-500 text-white" : "bg-white/5 text-white/20",
                    isActive && "text-[#5865F2] bg-[#5865F2]/10"
                  )}>
                    <Icon size={24} />
                  </div>

                  <h3 className={cn("text-2xl font-black mb-4 tracking-tight", isActive ? "text-white" : "text-white/40")}>
                    {step.title}
                  </h3>
                  
                  <p className="text-white/20 text-sm font-medium leading-relaxed mb-10 flex-grow">
                    {step.desc}
                  </p>

                  <Button 
                    disabled={isLocked || isDone} 
                    onClick={() => handleStepAction(step.id)}
                    className={cn(
                      "w-full rounded-full font-bold h-14 text-xs uppercase tracking-widest transition-all",
                      isDone ? "bg-green-500/10 text-green-500 border border-green-500/20" : 
                      isActive ? "bg-[#5865F2] text-white hover:bg-[#4752C4]" : 
                      "bg-white/5 text-white/10"
                    )}
                  >
                    {isDone ? (
                      <span className="flex items-center">Verified <Check size={16} className="ml-2" /></span>
                    ) : (
                      <span className="flex items-center">
                        {checkingExtension && step.id === 2 ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                        {step.action}
                      </span>
                    )}
                  </Button>
                </div>

                {isActive && (
                  <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-b from-[#5865F2]/20 to-transparent -z-10 blur-sm" />
                )}
              </motion.div>
            );
          })}
        </div>
        
        <AnimatePresence>
          {showFinalButton && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center mt-20"
            >
              <Button 
                onClick={finishOnboarding}
                disabled={isFinishing}
                className="px-20 h-20 rounded-full font-black text-xl bg-white text-black hover:bg-gray-200 transition-all group shadow-2xl shadow-white/5"
              >
                {isFinishing ? <Loader2 className="animate-spin" /> : <>Enter Dashboard <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" /></>}
              </Button>
              <p className="mt-6 text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                Configuration Complete
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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