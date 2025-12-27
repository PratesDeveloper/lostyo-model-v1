"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RobloxTopBar } from '@/components/market/roblox-topbar';
import { MarketStepChart } from '@/components/market/market-step-chart';
import { 
  TrendingUp, TrendingDown, Wallet, Trophy, 
  Sparkles, X, Activity, Search, User, Filter, 
  Crown, Gem, Zap, Star, ShieldCheck, Award,
  ArrowRight, ShoppingCart, DollarSign, Plus
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

export default function MarketGUIPage() {
  const [activeTab, setActiveTab] = useState('Market');
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");
  
  // Estados fictícios para o Criador
  const [newTicker, setNewTicker] = useState("");
  const [newName, setNewName] = useState("");

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

  const filteredStocks = stocks.filter(s => 
    s.t.toLowerCase().includes(search.toLowerCase()) || 
    s.n.toLowerCase().includes(search.toLowerCase())
  );

  const handleTrade = (type: 'buy' | 'sell', ticker: string) => {
    toast[type === 'buy' ? 'success' : 'error'](
      `${type === 'buy' ? 'Purchased' : 'Sold'} ${ticker} shares successfully!`,
      { description: `Transaction recorded at ${new Date().toLocaleTimeString()}` }
    );
  };

  const handleCreateToken = () => {
    if (!newTicker || !newName) {
      toast.error("Please fill in all fields to launch your IPO.");
      return;
    }
    toast.success(`IPO Launched! ${newTicker} is now live on the market.`);
    setNewTicker("");
    setNewName("");
  };

  return (
    <div className="relative min-h-screen bg-[#030303] flex flex-col items-center justify-center p-4 md:p-10 overflow-hidden font-sans">
      <Toaster position="top-right" theme="dark" richColors />
      <RobloxTopBar />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="w-full max-w-5xl h-[85vh] flex flex-col relative z-10"
          >
            {/* 1. Floating Header */}
            <header className="h-20 bg-[#121214]/90 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-between px-8 mb-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Activity className="text-white" size={20} />
                  </div>
                  <span className="font-black text-white uppercase tracking-tighter text-lg hidden sm:block">Market Terminal</span>
                </div>

                <nav className="flex items-center gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`h-10 px-6 rounded-xl flex items-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest ${
                        activeTab === tab.name 
                        ? 'bg-white text-black shadow-lg scale-105' 
                        : 'text-white/30 hover:text-white/60 hover:bg-white/5'
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
                  <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest opacity-60">Balance</div>
                  <div className="text-base font-black text-white">1,240,500 <span className="text-blue-500 text-xs">BITS</span></div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </header>

            {/* 2. Main Viewport */}
            <div className="flex-grow bg-[#0F0F11]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl">
              <div className="flex-grow overflow-y-auto custom-scrollbar p-10">
                <AnimatePresence mode="wait">
                  {activeTab === 'Market' && (
                    <motion.div key="market" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                      {/* Search Bar */}
                      <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input 
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search for community tickers (e.g. LYO, SHDW)..." 
                          className="w-full h-16 bg-white/[0.03] border border-white/5 rounded-3xl pl-16 pr-8 text-sm font-bold text-white outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>

                      {/* Market Index Chart */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] block mb-1">Global Market Index</span>
                            <h3 className="text-xl font-black text-white tracking-tighter">Metaverse Performance</h3>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-full uppercase tracking-widest">
                              <TrendingUp size={12} /> Market is Bullish
                          </div>
                        </div>
                        <MarketStepChart />
                      </div>

                      {/* Stock List Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredStocks.map((stock) => (
                          <motion.div 
                            layout
                            key={stock.t} 
                            className="bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/[0.05] hover:border-white/20 transition-all shadow-lg"
                          >
                            <div className="flex items-center gap-5">
                              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center font-black text-white text-sm group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                                {stock.t}
                              </div>
                              <div>
                                <div className="text-base font-black text-white mb-0.5">{stock.n}</div>
                                <div className="text-[11px] font-bold text-white/40 uppercase tracking-widest">{stock.p} <span className="text-blue-500">BITS</span></div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end gap-3">
                              <div className={`text-xs font-black px-3 py-1 rounded-full ${stock.c >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                {stock.c > 0 ? '+' : ''}{stock.c}%
                              </div>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => handleTrade('buy', stock.t)} 
                                  className="h-10 px-5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
                                >
                                  Buy
                                </button>
                                <button 
                                  onClick={() => handleTrade('sell', stock.t)} 
                                  className="h-10 px-5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95"
                                >
                                  Sell
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Inventory' && (
                    <motion.div key="inv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                          { l: "Portfolio Value", v: "2.4M", i: Wallet, c: "text-blue-500" },
                          { l: "Net Profit", v: "+150,000", i: TrendingUp, c: "text-emerald-500" },
                          { l: "Total Assets", v: "12", i: Activity, c: "text-purple-500" },
                        ].map((s, i) => (
                          <div key={i} className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
                            <s.i className={`${s.c} mb-4`} size={24} />
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{s.l}</div>
                            <div className="text-3xl font-black text-white tracking-tighter">{s.v} <span className="text-sm opacity-30 uppercase">Bits</span></div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10">
                         <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Your Holdings</h3>
                            <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">View History</button>
                         </div>
                         <div className="space-y-4">
                            {stocks.slice(0, 3).map((s, i) => (
                               <div key={i} className="flex justify-between items-center p-6 bg-white/[0.03] rounded-[2rem] border border-white/5 hover:bg-white/[0.05] transition-all">
                                  <div className="flex gap-5 items-center">
                                     <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black text-xs text-white/60">{s.t}</div>
                                     <div>
                                        <div className="text-base font-black text-white">{s.n}</div>
                                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">1,000 Shares Locked</div>
                                     </div>
                                  </div>
                                  <div className="text-right">
                                     <div className="text-lg font-black text-white tracking-tighter">{s.p * 1000} <span className="text-xs opacity-40">BITS</span></div>
                                     <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">+12.4% Profit</div>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Leaderboard' && (
                    <motion.div key="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto space-y-6">
                      <div className="text-center mb-16">
                        <Trophy size={64} className="text-yellow-500 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]" />
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Global Wealth</h2>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Season 1 Rankings</p>
                      </div>
                      
                      {leaderboardPlayers.map((p, i) => (
                        <div key={i} className={`flex items-center justify-between p-8 rounded-[2.5rem] border transition-all ${i === 0 ? 'bg-blue-600 border-blue-400 shadow-2xl shadow-blue-600/30' : 'bg-white/[0.02] border-white/5'}`}>
                          <div className="flex items-center gap-8">
                            <div className={`text-2xl font-black ${i === 0 ? 'text-white' : 'text-white/10'}`}>#{p.r}</div>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${i === 0 ? 'bg-white/20' : 'bg-white/5 text-white/40'}`}>
                              <p.badge size={28} />
                            </div>
                            <div>
                               <div className={`text-lg font-black ${i === 0 ? 'text-white' : 'text-white'}`}>{p.n}</div>
                               <div className={`text-[10px] font-bold uppercase tracking-widest ${i === 0 ? 'text-white/60' : 'text-white/20'}`}>Top Tier Investor</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xl font-black ${i === 0 ? 'text-white' : 'text-white'}`}>{p.w} <span className="text-xs opacity-40">BITS</span></div>
                            <div className={`text-[9px] font-bold uppercase tracking-widest ${i === 0 ? 'text-white/40' : 'text-white/10'}`}>Portfolio Value</div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'Creator' && (
                    <motion.div key="create" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="h-full flex items-center justify-center">
                        <div className="w-full max-w-2xl bg-white/[0.02] border border-white/5 rounded-[4rem] p-16 text-center shadow-2xl relative overflow-hidden">
                           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/10 blur-[100px] pointer-events-none" />
                           
                           <div className="relative z-10">
                             <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-blue-600/40 group hover:rotate-12 transition-transform">
                                <Sparkles size={48} />
                             </div>
                             
                             <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4 leading-tight">Launch your <br /> Token today.</h2>
                             <p className="text-white/40 text-base font-medium leading-relaxed mb-12">
                                Tokenize your community and raise bits to fund your projects. <br className="hidden sm:block" /> List your server on the public exchange.
                             </p>

                             <div className="space-y-4 mb-12 text-left">
                                <div className="space-y-2">
                                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest px-4">Community Ticker</label>
                                   <input 
                                      value={newTicker}
                                      onChange={(e) => setNewTicker(e.target.value.toUpperCase().slice(0, 4))}
                                      placeholder="e.g. LYO" 
                                      className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-3xl px-8 text-sm font-bold text-white outline-none focus:border-blue-500 transition-all uppercase"
                                   />
                                </div>
                                <div className="space-y-2">
                                   <label className="text-[10px] font-black text-white/30 uppercase tracking-widest px-4">Community Full Name</label>
                                   <input 
                                      value={newName}
                                      onChange={(e) => setNewName(e.target.value)}
                                      placeholder="e.g. Lostyo Studios" 
                                      className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-3xl px-8 text-sm font-bold text-white outline-none focus:border-blue-500 transition-all"
                                   />
                                </div>
                             </div>

                             <button 
                                onClick={handleCreateToken}
                                className="w-full h-20 bg-[#00A2FF] text-white rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:bg-[#0084D1] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/30 group"
                             >
                                <img src="/roblox-logo.png" className="w-7 h-7 object-contain" alt="R$" />
                                Pay 990 Robux to Launch
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                             </button>
                             
                             <p className="mt-10 text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">Verified by Lostyo-Protocol</p>
                           </div>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Footer */}
              <div className="h-12 bg-black/40 border-t border-white/5 px-10 flex items-center justify-between text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                <div className="flex items-center gap-6">
                   <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Network: Stable</span>
                   <span>Version: 2.1.0-Release</span>
                </div>
                <span>© 2025 Lostyo Market Systems</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
}