"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/studio/navbar';
import { MarketChart } from '@/components/market/market-chart';
import { MarketList } from '@/components/market/market-list';
import { MarketStats } from '@/components/market/market-stats';
import { Bell, Search, Activity } from 'lucide-react';
import { Toaster } from 'sonner';

export default function MarketTestPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navbar />
      <Toaster position="top-right" theme="dark" />
      
      <main className="pt-32 pb-20 px-6 container mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 uppercase">Market Hub.</h1>
            <p className="text-white/30 text-sm font-medium tracking-wide uppercase">Institutional Grade Trading Interface</p>
          </motion.div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                placeholder="Find tickers..." 
                className="bg-white/5 border-none h-12 rounded-full pl-12 pr-6 text-xs font-bold text-white focus:ring-1 ring-blue-500 w-full sm:w-64 transition-all"
              />
            </div>
            <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Trading Area */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-10 rounded-[3rem] border border-white/5"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tighter">Market Overview</h3>
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Exchange Open</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">4,150.82</div>
                  <div className="text-[10px] font-bold text-emerald-400 tracking-widest">+1.2% (Today)</div>
                </div>
              </div>
              <MarketChart />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6 px-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20">Top Listings</h3>
                <button className="text-[10px] font-black uppercase text-blue-400">See All</button>
              </div>
              <MarketList />
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MarketStats />
          </motion.div>
        </div>
      </main>
    </div>
  );
}