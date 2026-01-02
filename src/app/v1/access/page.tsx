"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal, Loader2, ChevronRight, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function AdminAccessPage() {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'ready'>('idle');
  const [lines, setLines] = useState<string[]>([]);

  const terminalMessages = [
    "> Initializing Lostyo Secure Gateway...",
    "> Establishing encrypted tunnel...",
    "> Verifying edge node integrity...",
    "> Access point localized: [REDACTED]",
    "> Standby for identity handshake..."
  ];

  const startSequence = () => {
    setStatus('scanning');
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalMessages.length) {
        setLines(prev => [...prev, terminalMessages[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStatus('ready'), 1000);
      }
    }, 600);
  };

  const handleLogin = () => {
    window.location.href = "/api/auth/roblox";
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(29,78,216,0.05),transparent_70%)] pointer-events-none" />
      <div className="noise opacity-[0.05]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl relative"
      >
        <div className="glass rounded-[2rem] border border-white/5 p-8 md:p-12 overflow-hidden">
          <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
              <Terminal size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">System Auth</h1>
              <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Lostyo Internal OS v4.0</p>
            </div>
          </div>

          <div className="space-y-4 mb-10 min-h-[160px]">
            {status === 'idle' && (
              <div className="text-center py-10">
                <p className="text-white/20 text-xs mb-6 uppercase tracking-[0.3em]">Restricted Area</p>
                <Button 
                  onClick={startSequence}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl px-8 h-12 text-[10px] font-black uppercase tracking-widest"
                >
                  Initiate Sequence
                </Button>
              </div>
            )}

            {status !== 'idle' && (
              <div className="space-y-2">
                {lines.map((line, idx) => (
                  <motion.p 
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[11px] text-blue-400 font-bold"
                  >
                    {line}
                  </motion.p>
                ))}
                {status === 'scanning' && (
                  <div className="flex items-center gap-2 text-[11px] text-white/40">
                    <Loader2 size={12} className="animate-spin" /> Processing...
                  </div>
                )}
              </div>
            )}
          </div>

          <AnimatePresence>
            {status === 'ready' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Button 
                  onClick={handleLogin}
                  className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20 group"
                >
                  <Lock size={16} /> Establish Link via Roblox
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-center text-[9px] text-white/10 uppercase tracking-widest font-bold">
                  Identity verification mandatory. unauthorized attempts will be logged.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}