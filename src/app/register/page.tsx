"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Check, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  
  const requirements = [
    { label: "8+ characters", met: password.length >= 8 },
    { label: "Uppercase (A-Z)", met: /[A-Z]/.test(password) },
    { label: "Lowercase (a-z)", met: /[a-z]/.test(password) },
    { label: "Number (0-9)", met: /[0-9]/.test(password) },
    { label: "Symbol (!@#$)", met: /[^A-Za-z0-9]/.test(password) },
  ];

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
            <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Join the Studio.</h1>
            <p className="text-white/30 font-medium">Create your developer account.</p>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                className="h-14 pl-12 bg-white/[0.02] border-white/5 rounded-2xl focus:border-blue-500/50 transition-all text-sm font-medium"
              />
            </div>

            {/* Password Requirements */}
            <div className="grid grid-cols-2 gap-2 px-2 py-4">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-blue-500/20 text-blue-500' : 'bg-white/5 text-white/10'}`}>
                    {req.met ? <Check size={10} /> : <X size={10} />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${req.met ? 'text-white/60' : 'text-white/20'}`}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <Input 
                type="password"
                placeholder="Confirm Password" 
                className="h-14 pl-12 bg-white/[0.02] border-white/5 rounded-2xl focus:border-blue-500/50 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 mb-10 px-2">
            <Checkbox id="terms" className="mt-1 border-white/10 data-[state=checked]:bg-blue-600" />
            <label htmlFor="terms" className="text-xs font-medium text-white/30 leading-relaxed cursor-pointer">
              I agree to the <span className="text-blue-400">Security Protocols</span> and <span className="text-blue-400">Terms of Service</span> for high-end development.
            </label>
          </div>

          <Link href="/register/link-roblox">
            <Button className="w-full h-16 bg-white text-black hover:bg-white/90 rounded-full font-black uppercase tracking-[0.2em] text-[11px] group">
              Proceed to Verification <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </Link>

          <p className="mt-8 text-center text-xs font-bold text-white/20 uppercase tracking-widest">
            Already have an account? <Link href="/login" className="text-blue-400">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}