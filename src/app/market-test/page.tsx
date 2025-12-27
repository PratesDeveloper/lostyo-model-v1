"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RobloxTopBar } from '@/components/market/roblox-topbar';
import { MarketStepChart } from '@/components/market/market-step-chart';
import { 
  TrendingUp, TrendingDown, Wallet, Trophy, 
  Sparkles, X, Activity, Search, User, Filter, 
  Crown, Gem, Zap, Star, ShieldCheck, Award,
  ArrowRight, ShoppingCart, DollarSign
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function MarketGUIPage() {
  const [activeTab, setActiveTab] = useState('Market');
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const tabs = [
    { name: 'Market', icon: Activity },
    { name: 'Inventory', icon: Wallet },
    { name: 'Leaderboard', icon: Trophy },
    { name: 'Creator', icon: Sparkles },
  ];

  const stocks = useMemo(() => [
    { t: 'LYO', n: 'Lostyo Studios', p: 4500, c: 12.5 },
    { t: 'DRFT', n: 'Neon Drift', p: 1200, c: -5.2 },
    { t: 'SHDW', n: 'Shadow Protocol', p: 8900, c: 2.1 },
    { t: 'ATHR', n: 'Aetheria', p: 15200, c: 45.8 },
    { t: 'BLOX', n: 'BloxCorp', p: 540, c: -2.4 },
    { t: 'META', n: 'MetaLink', p: 2300, c: 0 },
  ], []);

  const leaderboardPlayers = [
    { n: 'Lostyo_Admin', w: '12.5M', r: 1, badge: Crown },
    { n: 'Robloxian_44', w: '8.1M', r: 2, badge: Gem },
    { n: 'DevKing_99', w: '6.4M', r: 3, badge: Award },
    { n: 'ShadowTraders', w: '4.1M', r: 4, badge: Zap },
  ];

  const handleTrade = (type: 'buy' | 'sell', ticker: string) => {
    toast[type === 'buy' ? 'success' : 'error'](`${type === 'buy' ? 'Bought' : 'Sold'} ${ticker}`);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] flex flex-col items-center justify-center p-4 md:p-10 overflow-hidden font-sans">
      <Toaster position="top-right" theme="dark" />
      <RobloxTopBar />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full max-w-5xl h-[85vh] flex flex-col relative z-10"
          >
            {/* 1. Floating Header (Fácil de replicar com Frame + UIListLayout) */}
            <header className="h-20 bg-[#121214]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] flex items-center justify-between px-8 mb-4 shadow-2xl">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Activity className="text-white" size={20} />
                  </div>
                  <span className="font-black text-white uppercase tracking-tighter text-lg hidden sm:block">Market Terminal</span>
                </div>

                <nav className="flex items-center gap-1 bg-black/20 p-1 rounded-2xl">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`h-10 px-5 rounded-xl flex items-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest ${
                        activeTab === tab.name 
                        ? 'bg-white text-black' 
                        : 'text-white/40 hover:text-white/60'
                      }`}
                    >
                      <tab.icon size={14} />
                      <span className="hidden md:block">{tab.name}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right hidden xs:block">
                  <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Available</div>
                  <div className="text-base font-black text-white">1.2M <span className="text-blue-500 text-xs">BITS</span></div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </header>

            {/* 2. Main Viewport (O conteúdo rola aqui dentro) */}
            <div className="flex-grow bg-[#0F0F11]/60 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-inner">
              <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'Market' && (
                    <motion.div key="market" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      {/* Dashboard Simples */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                          <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Market Index</span>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
                                <TrendingUp size={12} /> Bullish Trend
                            </div>
                          </div>
                          <MarketStepChart />
                        </div>
                        <div className="bg-blue-600 rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden">
                           <Zap className="absolute -right-4 -top-4 opacity-10" size={120} />
                           <div>
                             <h3 className="text-xl font-black uppercase tracking-tighter mb-2">IPO Ready</h3>
                             <p className="text-white/60 text-xs font-medium leading-relaxed">List your server today to start raising capital.</p>
                           </div>
                           <button className="h-12 w-full bg-white text-black rounded-xl font-black uppercase tracking-widest text-[9px]">Launch Portal</button>
                        </div>
                      </div>

                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input 
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search for community tickers..." 
                          className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-sm font-bold text-white outline-none focus:border-blue-500/50 transition-all"
                        />
                      </div>

                      {/* Stock List */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stocks.map((stock) => (
                          <div key={stock.t} className="bg-white/[0.02] border border-white/5 p-5 rounded-3xl flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-white text-xs group-hover:bg-blue-600 transition-colors">
                                {stock.t}
                              </div>
                              <div>
                                <div className="text-sm font-black text-white">{stock.n}</div>
                                <div className="text-[10px] font-bold text-white/20">{stock.p} BITS</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className={`text-right ${stock.c >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                <div className="text-xs font-black">{stock.c}%</div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleTrade('buy', stock.t)} className="h-9 px-4 bg-emerald-500/10 text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Buy</button>
                                <button onClick={() => handleTrade('sell', stock.t)} className="h-9 px-4 bg-red-500/10 text-red-400 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Sell</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Inventory' && (
                    <motion.div key="inv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          { l: "Value", v: "2.4M", i: Wallet },
                          { l: "Profit", v: "+150k", i: TrendingUp },
                          { l: "Assets", v: "12", i: Activity },
                        ].map((s, i) => (
                          <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5">
                            <s.i className="text-blue-500 mb-2" size={18} />
                            <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">{s.l}</div>
                            <div className="text-2xl font-black text-white">{s.v}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
                         <h3 className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-6">Holdings</h3>
                         <div className="space-y-3">
                            {stocks.slice(0, 3).map((s, i) => (
                               <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                                  <div className="flex gap-4 items-center">
                                     <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-black text-xs">{s.t}</div>
                                     <div className="text-sm font-bold text-white">100 Shares</div>
                                  </div>
                                  <div className="text-right">
                                     <div className="text-xs font-black text-white">{s.p * 100} BITS</div>
                                     <div className="text-[9px] font-bold text-emerald-400">+5.2%</div>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Leaderboard' && (
                    <motion.div key="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-4">
                      <div className="text-center mb-10">
                        <Trophy size={48} className="text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Top Investors</h2>
                      </div>
                      {leaderboardPlayers.map((p, i) => (
                        <div key={i} className={`flex items-center justify-between p-6 rounded-3xl border transition-all ${i === 0 ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/5'}`}>
                          <div className="flex items-center gap-6">
                            <div className={`text-xl font-black ${i === 0 ? 'text-white' : 'text-white/10'}`}>#{p.r}</div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${i === 0 ? 'bg-white/20' : 'bg-white/5 text-white/40'}`}>
                              <p.badge size={24} />
                            </div>
                            <div>
                               <div className="text-base font-black text-white">{p.n}</div>
                               <div className={`text-[9px] font-bold uppercase ${i === 0 ? 'text-white/60' : 'text-white/20'}`}>Tier 1 Investor</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-black text-white">{p.w} <span className="text-xs opacity-40">BITS</span></div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'Creator' && (
                    <motion.div key="create" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center">
                        <div className="max-w-md">
                           <Sparkles size={48} className="text-blue-500 mx-auto mb-6" />
                           <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-4">Go Public</h2>
                           <p className="text-white/40 text-sm font-medium leading-relaxed mb-8">Tokenize your server and raise bits from the community to fund your projects.</p>
                           <button className="h-16 w-full bg-[#00A2FF] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                              <img src="/roblox-logo.png" className="w-6 h-6 object-contain" alt="R$" />
                              Pay 990 Robux Listing Fee
                           </button>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Footer Interno */}
              <div className="h-10 bg-black/40 border-t border-white/5 px-8 flex items-center justify-between text-[8px] font-black uppercase tracking-[0.3em] text-white/20">
                <span>Terminal Session: Active</span>
                <span>System Protocol: Lostyo-Market-v2.1</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
}