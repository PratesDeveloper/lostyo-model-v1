"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-neutral-100 border-t-[#3B82F6] rounded-full animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">
              Loading
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};