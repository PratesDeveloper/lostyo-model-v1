"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; // Mantendo a importação caso precise de outros botões
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, Puzzle, Bot, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils"; // Importar a função cn para combinar classes Tailwind

export default function StartPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFinalButton, setShowFinalButton] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Login",
      description: "Access your dashboard and manage your communities",
      icon: Lock,
      action: "Login"
    },
    {
      id: 2,
      title: "Install Extension",
      description: "Enhance your Discord experience with our browser extension",
      icon: Puzzle,
      action: "Install Extension"
    },
    {
      id: 3,
      title: "Add Bot",
      description: "Add the LostyoCord bot to your Discord server",
      icon: Bot,
      action: "Add to Discord"
    }
  ];

  const handleCompleteStep = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

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

          {/* Progress indicator */}
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
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            
            return (
              <motion.div
                key={step.id}
                whileHover={{ y: -5 }}
                className="bg-[#141417] p-6 rounded-2xl flex flex-col items-center text-center border border-[#1A1A1E] hover:border-[#5865F2]/30 transition-all"
              >
                <motion.div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isCompleted 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-red-500/20 text-red-500'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/30 text-xs mb-4">
                  {step.description}
                </p>
                <Button 
                  className={`w-full h-10 text-xs font-bold rounded-full ${
                    isCompleted 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-[#5865F2] hover:bg-[#4752C4]'
                  }`}
                  onClick={() => handleCompleteStep(step.id)}
                >
                  {isCompleted ? 'Completed' : step.action}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Botão final que aparece quando todas as etapas forem concluídas */}
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
              layout // Animate layout changes for smooth size transitions
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

        {/* Botão de voltar - sempre visível */}
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