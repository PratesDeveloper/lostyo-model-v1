"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RobloxTopBar } from '@/components/market/roblox-topbar';
import { MarketStepChart } from '@/components/market/market-step-chart';
import { 
  TrendingUp, TrendingDown, Wallet, Trophy, 
  Sparkles, X, LayoutGrid, Activity, 
  ArrowRight, CreditCard 
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function MarketGUIPage() {
  const [activeTab, setActiveTab] = useState('Market');
  const [isOpen, setIsOpen] = useState(true);

  const tabs = [
    { name: 'Market', icon: Activity },
    { name: 'Inventory', icon: Wallet },
    { name: 'Leaderboard', icon: Trophy },
    { name: 'Creator', icon: Sparkles },
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] flex items-center justify-center overflow-hidden font-sans">
      {/* Efeito de Fundo do Jogo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <Toaster position="top-right" theme="dark" expand={false} />
      <RobloxTopBar />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="w-full max-w-5xl h-[650px] glass rounded-[3rem] border border-white/10 flex overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] relative z-10"
          >
            {/* Sidebar da GUI */}
            <aside className="w-24 border-r border-white/5 bg-black/20 flex flex-col items-center py-10 gap-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4">
                <LayoutGrid className="text-black" size={24} />
              </div>
              
              <nav className="flex flex-col gap-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      activeTab === tab.name 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-110' 
                      : 'text-white/20 hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={22} />
                  </button>
                ))}
              </nav>

              <button 
                onClick={() => setIsOpen(false)}
                className="mt-auto w-14 h-14 rounded-2xl flex items-center justify-center text-red-400/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
              >
                <X size={24} />
              </button>
            </aside>

            {/* Conteúdo Principal da GUI */}
            <div className="flex-grow flex flex-col overflow-hidden">
              <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-white/[0.02]">
                <div>
                  <h1 className="text-2xl font-black tracking-tighter text-white uppercase">{activeTab} Hub</h1>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Lostyo Exchange Protocol v4.0</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-black/40 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-400">BITS</span>
                    <span className="text-sm font-black text-white">1,240,500</span>
                  </div>
                </div>
              </header>

              <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {activeTab === 'Market' && (
                    <motion.div 
                      key="market"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      {/* Gráfico Principal */}
                      <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Market Performance</h3>
                          <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                            <TrendingUp size={14} /> +24% THIS SESSION
                          </div>
                        </div>
                        <MarketStepChart />
                      </div>

                      {/* Lista de Ações */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { t: 'LYO', p: 4500, c: 12 },
                          { t: 'DRFT', p: 1200, c: -5 },
                          { t: 'SHDW', p: 8900, c: 2 },
                          { t: 'ATHR', p: 15200, c: 45 },
                        ].map((stock) => (
                          <div key={stock.t} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] flex justify-between items-center group hover:bg-white/[0.05] transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center font-black text-blue-500">{stock.t}</div>
                              <div>
                                <div className="text-sm font-black text-white">{stock.p} BITS</div>
                                <div className={`text-[10px] font-bold ${stock.c > 0 ? 'text-emerald-400' : 'text-red-400'}`}>{stock.c}%</div>
                              </div>
                            </div>
                            <button 
                              onClick={() => toast.success(`Bought ${stock.t}!`)}
                              className="px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                            >
                              TRADE
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Creator' && (
                    <motion.div 
                      key="creator"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex items-center justify-center"
                    >
                      <div className="max-w-md text-center">
                        <div className="w-24 h-24 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center text-blue-500 mx-auto mb-8">
                          <Sparkles size={48} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase">Launch Your Stock</h2>
                        <p className="text-white/40 text-sm font-medium leading-relaxed mb-10">
                          Take your community to the next level. Issue your own ticker and manage your ecosystem's economy.
                        </p>
                        <button className="w-full h-16 bg-[#00A2FF] text-white rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20">
                          Create for 990 Robux <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Inventory' && (
                    <motion.div key="inventory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { l: 'Total Investment', v: '240k', i: CreditCard },
                          { l: 'Stocks Owned', v: '12', i: LayoutGrid },
                          { l: 'Rank', v: 'Silver', i: Trophy },
                        ].map((stat, i) => (
                          <div key={i} className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5">
                            <stat.i className="text-blue-500 mb-4" size={20} />
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stat.l}</div>
                            <div className="text-2xl font-black text-white">{stat.v}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white text-black px-10 h-14 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all relative z-10"
        >
          Open Market Interface
        </button>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}