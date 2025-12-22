"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Check, Circle, Lock, Puzzle, Bot, ArrowRight } from 'lucide-react';

export default function StartPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

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

  const allStepsCompleted = steps.length === completedSteps.length;

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effect with large icon */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[800px] h-[800px] rounded-full bg-[#5865F2]/5 blur-3xl"></div>
        <Bot className="absolute w-[400px] h-[400px] text-[#5865F2]/5" />
      </div>
      
      <div className="max-w-3xl w-full relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Get Started with LostyoCord
          </h1>
          <p className="text-white/40 text-lg mb-8 font-medium">
            Follow these simple steps to set up LostyoCord
          </p>
          
          {/* Progress indicator */}
          <div className="flex justify-center items-center mb-12">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div 
                    className={`flex flex-col items-center ${
                      completedSteps.includes(step.id) ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      completedSteps.includes(step.id) 
                        ? 'bg-green-500/20 border-2 border-green-500' 
                        : 'bg-red-500/20 border-2 border-red-500'
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <Check size={20} />
                      ) : (
                        <step.icon size={20} />
                      )}
                    </div>
                    <span className="text-xs font-bold">{step.title}</span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-2 ${
                      completedSteps.includes(step.id) && completedSteps.includes(steps[index + 1].id)
                        ? 'bg-green-500'
                        : 'bg-gray-700'
                    }`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            
            return (
              <div 
                key={step.id} 
                className="bg-[#141417] p-6 rounded-2xl flex flex-col items-center text-center"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  isCompleted 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  <Icon size={24} />
                </div>
                
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
              </div>
            );
          })}
        </div>
        
        {/* Dashboard button - only enabled when all steps are completed */}
        <div className="text-center mb-8">
          <Link href="/dashboard">
            <Button 
              disabled={!allStepsCompleted}
              className={`h-14 px-8 rounded-full text-base font-bold transition-all ${
                allStepsCompleted
                  ? 'bg-[#5865F2] hover:bg-[#4752C4] text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="text-white/30 hover:text-white hover:bg-white/5 h-10 px-5 rounded-full text-xs font-bold"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}