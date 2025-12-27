"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-[3rem] p-10 md:p-14 border border-white/5">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-8">
              <img src="https://cdn.lostyo.com/logo.png" className="w-10 h-10 mx-auto" alt="Logo" />
            </Link>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Welcome Back.</h1>
            <p className="text-white/30 font-medium">Continue your creation journey.</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <Input 
                placeholder="Email Address" 
                className="h-14 pl-12 bg-white/[0.02] border-white/5 rounded-2xl focus:border-blue-500/50 transition-all text-sm font-medium"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <Input 
                type="password"
                placeholder="Password" 
                className="h-14 pl-12 bg-white/[0.02] border-white/5 rounded-2xl focus:border-blue-500/50 transition-all text-sm font-medium"
              />
            </div>
            
            <div className="text-right">
              <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-blue-400/60 hover:text-blue-400 transition-colors">
                Forgot Password?
              </Link>
            </div>
          </div>

          <Link href="/dashboard">
            <Button className="w-full h-16 bg-white text-black hover:bg-white/90 rounded-full font-black uppercase tracking-[0.2em] text-[11px] group mb-6">
              Sign In <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-grow bg-white/5" />
            <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.3em]">Or connect with</span>
            <div className="h-[1px] flex-grow bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-14 rounded-2xl bg-white/[0.02] border-white/5 hover:bg-white/5 text-white/60 gap-3">
              <Github size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Github</span>
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl bg-[#00A2FF]/10 border-[#00A2FF]/20 hover:bg-[#00A2FF]/20 text-[#00A2FF] gap-3">
              <img src="https://cdn.lostyo.com/roblox-white.png" className="w-4 h-4" alt="R" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Roblox</span>
            </Button>
          </div>

          <p className="mt-10 text-center text-xs font-bold text-white/20 uppercase tracking-widest">
            New to Lostyo? <Link href="/register" className="text-blue-400">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}