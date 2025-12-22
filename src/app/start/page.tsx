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

  // Check authentication status on mount
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

  // Check extension status and update step 2
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

  // Handle guild_id from URL and start polling for bot status
  useEffect(() => {
    const guildId = searchParams.get('guild_id');
    
    if (guildId && completedSteps.includes(1) && !completedSteps.includes(3) && !checkingBot) {
      setCheckingBot(true);
      
      const pollBotStatus = async () => {
        try {
          const { data, error } = await supabase.rpc('is_bot_in_guild', { 
            guild_id_input: guildId 
          });
          
          if (!error && data === true) {
            setCompletedSteps(prev => [...prev, 3]);
            setCheckingBot(false);
            if (botCheckTimer) clearInterval(botCheckTimer);
            return true;
          }
        } catch (err) {
          console.error("Error checking bot status:", err);
        }
        return false;
      };

      // Initial check
      pollBotStatus();

      // Set up interval
      const interval = setInterval(async () => {
        const isFinished = await pollBotStatus();
        if (isFinished) {
          clearInterval(interval);
        }
      }, 5000);

      setBotCheckTimer(interval);
    }
  }, [searchParams, completedSteps, checkingBot, botCheckTimer]);

  const steps = [
    {
      id: 1,
      title: "Login",
      description: "Access your dashboard and manage your communities",
      icon: Lock,
      action: "Login",
      link: DiscordOAuthUrl,
      requiresAuth: false
    },
    {
      id: 2,
      title: "Install Extension",
      description: "Enhance your Discord experience with our browser extension",
      icon: Puzzle,
      action: "Install Extension",
      requiresAuth: true
    },
    {
      id: 3,
      title: "Add Bot",
      description: "Add the LostyoCord bot to your Discord server",
      icon: Bot,
      action: "Add to Discord",
      requiresAuth: true
    }
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
      
      if (extensionCheckTimer) {
        clearTimeout(extensionCheckTimer);
      }
      
      const timer = setInterval(() => {
        window.dispatchEvent(new CustomEvent('lostyo-ready'));
      }, 5000);
      
      setExtensionCheckTimer(timer);
      
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('lostyo-ready'));
      }, 2000);
      
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
      const timer = setTimeout(() => {
        setShowFinalButton(true);
      }, 800);
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
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight"
          >
            Get Started with LostyoCord
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/40 text-lg mb-8 font-medium"
          >
            Follow these simple steps to set up LostyoCord
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center items-center mb-12"
          >
            <div className="flex items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <motion.div 
                    className={`flex flex-col items-center ${
                      completedSteps.includes(step.id) ? 'text-green-500' : 'text-red-500'
                    }`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      completedSteps.includes(step.id) 
                        ? 'bg-green-500/20 border-2 border-green-500' 
                        : 'bg-red-500/20 border-2 border-red-500'
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check size={20} />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <step.icon size={20} />
                        </motion.div>
                      )}
                    </div>
                    <span className="text-xs font-bold">{step.title}</span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <motion.div 
                      className={`w-16 h-0.5 mx-2 ${
                        completedSteps.includes(step.id) && completedSteps.includes(steps[index + 1].id)
                          ? 'bg-green-500'
                          : 'bg-gray-700'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    ></motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            const isStep1 = step.id === 1;
            const isStep2 = step.id === 2;
            const isStep3 = step.id === 3;
            
            const isPreviousCompleted = index === 0 || completedSteps.includes(steps[index - 1].id);
            const isDisabled = !isPreviousCompleted && !isCompleted;
            
            const isCheckingExt = isStep2 && checkingExtension && !isCompleted;
            const isCheckingBotStatus = isStep3 && checkingBot && !isCompleted;
            
            return (
              <motion.div
                key={step.id}
                whileHover={isDisabled ? {} : { y: -5 }}
                className={cn(
                  "bg-[#141417] p-6 rounded-2xl flex flex-col items-center text-center border transition-all",
                  isDisabled ? "border-[#1A1A1E] opacity-50" : "border-[#1A1A1E] hover:border-[#5865F2]/30"
                )}
              >
                <motion.div 
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    isCompleted ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                  )}
                  whileTap={isDisabled ? {} : { scale: 0.95 }}
                >
                  <Icon size={24} />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/30 text-xs mb-4">
                  {step.description}
                </p>
                
                {isStep1 ? (
                  <div className="w-full">
                    {isAuthenticated ? (
                      <Button 
                        className="w-full h-10 text-xs font-bold rounded-full bg-green-500 hover:bg-green-600"
                        disabled
                      >
                        Logged In
                      </Button>
                    ) : (
                      <a href={step.link} className="w-full">
                        <Button 
                          className="w-full h-10 text-xs font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4]"
                          onClick={() => handleCompleteStep(step.id)}
                        >
                          {step.action}
                        </Button>
                      </a>
                    )}
                  </div>
                ) : isStep2 ? (
                  <div className="w-full">
                    {isCompleted ? (
                      <Button 
                        className="w-full h-10 text-xs font-bold rounded-full bg-green-500 hover:bg-green-600"
                        disabled
                      >
                        Extension Installed
                      </Button>
                    ) : isCheckingExt ? (
                      <Button 
                        className="w-full h-10 text-xs font-bold rounded-full bg-yellow-500 hover:bg-yellow-600 text-black"
                        disabled
                      >
                        <Loader2 size={14} className="mr-2 animate-spin" />
                        Checking...
                      </Button>
                    ) : (
                      <Button 
                        className="w-full h-10 text-xs font-bold rounded-full bg-[#5865F2] hover:bg-[#4752C4]"
                        onClick={() => handleCompleteStep(step.id)}
                        disabled={isDisabled}
                      >
                        Install Extension
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="w-full">
                    {isCompleted ? (
                      <Button 
                        className="w-full h-10 text-xs font-bold rounded-full bg-green-500 hover:bg-green-600"
                        disabled
                      >
                        Bot Added
                      </Button>
                    ) : isCheckingBotStatus ? (
                      <Button 
                        className="w-full h-10 text-xs font-bold rounded-full bg-yellow-500 hover:bg-yellow-600 text-black"
                        disabled
                      >
                        <Loader2 size={14} className="mr-2 animate-spin" />
                        Verifying...
                      </Button>
                    ) : (
                      <Button 
                        className={cn(
                          "w-full h-10 text-xs font-bold rounded-full",
                          "bg-[#5865F2] hover:bg-[#4752C4]",
                          isDisabled && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() => !isDisabled && handleCompleteStep(step.id)}
                        disabled={isDisabled}
                      >
                        {step.action}
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex flex-col items-center mb-8">
          <Link href={showFinalButton ? "/dashboard" : "#"} passHref>
            <motion.button
              className={cn(
                "px-8 h-14 rounded-full font-bold text-lg group transition-all duration-300 ease-in-out flex items-center justify-center",
                showFinalButton
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-500 text-white cursor-not-allowed opacity-50'
              )}
              disabled={!showFinalButton}
              whileHover={showFinalButton ? { scale: 1.03 } : {}}
              whileTap={showFinalButton ? { scale: 0.98 } : {}}
              layout
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {showFinalButton ? (
                  <motion.span
                    key="dashboard-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="complete-steps-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    Complete all steps to continue
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </Link>
          
          {showFinalButton && (
            <motion.p 
              className="text-white/60 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              You're all set! Welcome to LostyoCord
            </motion.p>
          )}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/">
            <Button 
              variant="ghost" 
              className="text-white/30 hover:text-white hover:bg-white/5 h-10 px-5 rounded-full text-xs font-bold"
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function StartPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
        <Loader2 className="animate-spin text-[#5865F2] w-12 h-12" />
        <p className="text-white/40 mt-4">Loading...</p>
      </div>
    }>
      <StartPageContent />
    </Suspense>
  );
}