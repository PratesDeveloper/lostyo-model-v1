"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center p-6"
        >
          <div className="relative mb-12">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src="https://cdn.lostyo.com/logo.png" 
              className="w-16 h-16 relative z-10"
              alt="Logo"
            />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-blue-600 rounded-full blur-2xl -z-0"
            />
          </div>

          <div className="w-full max-w-[200px] h-[2px] bg-white/5 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              style={{ width: `${progress}%` }}
              transition={{ type: "spring", damping: 20 }}
            />
          </div>
          
          <motion.span 
            className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/20"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Initializing Studio
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};