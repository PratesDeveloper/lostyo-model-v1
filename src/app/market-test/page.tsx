"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RobloxTopBar } from '@/components/market/roblox-topbar';
import { MarketStepChart } from '@/components/market/market-step-chart';
import { MarketNews } from '@/components/market/market-news';
import { TransactionHistory } from '@/components/market/transaction-history';
import { 
  TrendingUp, TrendingDown, Wallet, Trophy, 
  Sparkles, X, Activity, ArrowRight, 
  Search, ChevronRight, User, Filter, SortAsc,
  Crown, Gem, Zap, Star, ShieldCheck, Award
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
    { t: 'VRTX', n: 'Vertex Systems', p: 7200, c: 8.4 },
    { t: 'CORE', n: 'CoreSys', p: 3100, c: -15.1 },
    { t: 'NOVA', n: 'Nova Games', p: 1800, c: 22.3 },
    { t: 'GRID', n: 'GridRunner', p: 950, c: 1.2 },
  ], []);

  const filteredStocks = stocks.filter(s => 
    s.t.toLowerCase().includes(search.toLowerCase()) || 
    s.n.toLowerCase().includes(search.toLowerCase())
  );

  const leaderboardPlayers = [
    { n: 'Lostyo_Admin', w: '12,500,000', r: 1, p: 'Whale', badge: Crown, color: 'from-yellow-400 to-orange-500' },
    { n: 'Robloxian_44', w: '8,120,000', r: 2, p: 'Elite', badge: Gem, color: 'from-slate-300 to-slate-500' },
    { n: 'DevKing_99', w: '6,450,000', r: 3, p: 'Pro', badge: Award, color: 'from-amber-600 to-amber-800' },
    { n: 'ShadowTraders', w: '4,100,000', r: 4, p: 'Master', badge: Zap },
    { n: 'MetaWolf', w: '3,950,000', r: 5, p: 'Expert', badge: Star },
    { n: 'Aether_Soul', w: '2,800,000', r: 6, p: 'Trader', badge: Activity },
    { n: 'Neon_Drifter', w: '1,500,000', r: 7, p: 'Active', badge: ShieldCheck },
    { n: 'Blox_Master', w: '980,000', r: 8, p: 'Rookie', badge: User },
  ];

  const handleTrade = (type: 'buy' | 'sell', ticker: string) => {
    const msg = type === 'buy' ? `Bought 1 share of ${ticker}` : `Sold 1 share of ${ticker}`;
    if (type === 'buy') toast.success(msg);
    else toast.error(msg);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <Toaster position="top-right" theme="dark" expand={false} />
      <RobloxTopBar />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="w-full max-w-[1200px] h-[800px] bg-[#0A0A0C]/90 backdrop-blur-3xl rounded-[3rem] border border-white/10 flex flex-col overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] relative z-10"
          >
            {/* Header */}
            <div className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-white/[0.02]">
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Activity className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-black text-white tracking-tighter uppercase">Market</h2>
                </div>

                <nav className="flex gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`px-6 h-12 rounded-full flex items-center gap-3 transition-all text-xs font-black uppercase tracking-widest ${
                        activeTab === tab.name 
                        ? 'bg-white text-black shadow-lg scale-105' 
                        : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                      }`}
                    >
                      <tab.icon size={16} />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Balance</span>
                  <span className="text-xl font-black text-white">1,240,500 <span className="text-blue-500">BITS</span></span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow flex overflow-hidden">
              {/* Sidebar Left: Market News */}
              {activeTab === 'Market' && (
                <div className="w-80 border-r border-white/5 p-8 overflow-y-auto custom-scrollbar hidden lg:block">
                  <MarketNews />
                </div>
              )}

              {/* Center Scrollable Content */}
              <div className="flex-grow overflow-y-auto custom-scrollbar p-10">
                <AnimatePresence mode="wait">
                  {activeTab === 'Market' && (
                    <motion.div key="market" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                      {/* Market Content (Keep existing Market code) */}
                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40">Real-Time Index</h3>
                            <div className="flex items-center gap-4">
                                <div className="text-[10px] font-black text-emerald-400 flex items-center gap-1 uppercase">
                                    <TrendingUp size={12} /> High Volatility
                                </div>
                            </div>
                          </div>
                          <MarketStepChart />
                        </div>
                        
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Activity size={120} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tighter mb-2">IPO Alert</h3>
                                <p className="text-white/60 text-xs font-medium leading-relaxed mb-6">
                                    New communities are listing every hour. Don't miss the next pump.
                                </p>
                            </div>
                            <button className="h-12 w-full bg-white text-black rounded-full font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all">
                                Open IPO Portal
                            </button>
                        </div>
                      </div>

                      {/* Market Listings */}
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div className="flex items-center gap-4">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">Stock Listings</h3>
                                <span className="bg-white/5 text-[10px] font-bold px-2 py-0.5 rounded-md text-white/30">{filteredStocks.length} Found</span>
                            </div>
                            
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="relative flex-grow sm:flex-grow-0">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                                    <input 
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search Ticker..." 
                                        className="h-10 pl-10 pr-4 bg-white/5 border-none rounded-full text-[10px] font-bold text-white w-full sm:w-48 outline-none ring-1 ring-white/5 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredStocks.map((stock) => (
                            <motion.div 
                                layout
                                key={stock.t} 
                                className="bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] flex justify-between items-center hover:bg-white/[0.05] transition-all group"
                            >
                              <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black text-white text-xs group-hover:bg-blue-600 transition-colors">
                                  {stock.t}
                                </div>
                                <div>
                                  <div className="text-sm font-black text-white">{stock.n}</div>
                                  <div className="text-[11px] font-bold text-white/40">{stock.p} <span className="text-blue-500/50">BITS</span></div>
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className={`text-right ${stock.c > 0 ? 'text-emerald-400' : stock.c < 0 ? 'text-red-400' : 'text-white/20'}`}>
                                  <div className="text-sm font-black flex items-center justify-end gap-1">
                                    {stock.c > 0 ? <TrendingUp size={14} /> : stock.c < 0 ? <TrendingDown size={14} /> : null}
                                    {Math.abs(stock.c)}%
                                  </div>
                                  <div className="text-[9px] font-bold uppercase tracking-widest opacity-40">Dynamic</div>
                                </div>
                                <div className="flex gap-2">
                                  <button onClick={() => handleTrade('buy', stock.t)} className="h-10 px-5 bg-emerald-500/10 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-95">Buy</button>
                                  <button onClick={() => handleTrade('sell', stock.t)} className="h-10 px-5 bg-red-500/10 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95">Sell</button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Leaderboard' && (
                    <motion.div key="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                      <div className="text-center mb-16">
                        <Trophy size={64} className="text-yellow-500 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(234,179,8,0.3)]" />
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Wealth Rankings</h2>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Top Investors of the Metaverse</p>
                      </div>
                      
                      {/* Podium Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        {/* Rank 2 */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-white/[0.03] border border-white/5 rounded-[3rem] p-10 text-center relative order-2 md:order-1 h-[320px] flex flex-col justify-center"
                        >
                          <div className="w-16 h-16 rounded-full bg-slate-500/10 border border-slate-500/20 flex items-center justify-center text-slate-400 mx-auto mb-6">
                            <Gem size={32} />
                          </div>
                          <div className="text-2xl font-black text-white mb-1">{leaderboardPlayers[1].n}</div>
                          <div className="text-sm font-bold text-blue-500 mb-6">{leaderboardPlayers[1].w} BITS</div>
                          <div className="inline-block px-4 py-1 rounded-full bg-slate-500/20 text-slate-400 text-[10px] font-black uppercase tracking-widest">Rank #2</div>
                        </motion.div>

                        {/* Rank 1 */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className="bg-gradient-to-b from-yellow-400/10 to-transparent border border-yellow-400/20 rounded-[4rem] p-12 text-center relative order-1 md:order-2 h-[400px] flex flex-col justify-center shadow-2xl shadow-yellow-500/10"
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-400/30">
                            <Crown className="text-black" size={24} />
                          </div>
                          <div className="w-24 h-24 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-400 mx-auto mb-8 animate-pulse">
                            <User size={48} />
                          </div>
                          <div className="text-3xl font-black text-white mb-2 tracking-tighter">{leaderboardPlayers[0].n}</div>
                          <div className="text-lg font-black text-yellow-400 mb-8">{leaderboardPlayers[0].w} BITS</div>
                          <div className="inline-block px-6 py-2 rounded-full bg-yellow-400 text-black text-[12px] font-black uppercase tracking-widest shadow-xl shadow-yellow-400/20">The Whale</div>
                        </motion.div>

                        {/* Rank 3 */}
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-white/[0.03] border border-white/5 rounded-[3rem] p-10 text-center relative order-3 md:order-3 h-[280px] flex flex-col justify-center"
                        >
                          <div className="w-14 h-14 rounded-full bg-amber-700/10 border border-amber-700/20 flex items-center justify-center text-amber-600 mx-auto mb-6">
                            <Award size={28} />
                          </div>
                          <div className="text-xl font-black text-white mb-1">{leaderboardPlayers[2].n}</div>
                          <div className="text-sm font-bold text-blue-500 mb-6">{leaderboardPlayers[2].w} BITS</div>
                          <div className="inline-block px-4 py-1 rounded-full bg-amber-700/20 text-amber-600 text-[10px] font-black uppercase tracking-widest">Rank #3</div>
                        </motion.div>
                      </div>

                      {/* Remaining List */}
                      <div className="max-w-4xl mx-auto space-y-4 pt-10">
                        <div className="px-10 flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">
                          <span>Player Identity</span>
                          <span>Portfolio Value</span>
                        </div>
                        {leaderboardPlayers.slice(3).map((player, i) => (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
                          >
                            <div className="flex items-center gap-8">
                              <div className="text-xl font-black text-white/10 w-8">#{player.r}</div>
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <player.badge size={24} />
                              </div>
                              <div>
                                <div className="text-base font-black text-white/80 group-hover:text-white transition-colors">{player.n}</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-blue-400 transition-colors">{player.p} Trader</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-black text-white tracking-tighter">{player.w} <span className="text-blue-500 text-xs">BITS</span></div>
                              <div className="text-[9px] font-bold uppercase tracking-widest text-white/10">Synchronized Ledger</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Other Tabs (Keep existing code) */}
                  {activeTab === 'Inventory' && (
                    <motion.div key="inv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { label: "Net Assets", value: "2.4M", icon: Wallet, color: "text-blue-500" },
                          { label: "Est. Dividend", value: "+45k", icon: TrendingUp, color: "text-emerald-500" },
                          { label: "Total Shares", value: "1,502", icon: Activity, color: "text-purple-500" },
                        ].map((stat, i) => (
                          <div key={i} className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5">
                            <stat.icon className={`${stat.color} mb-4`} size={20} />
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stat.label}</div>
                            <div className="text-3xl font-black text-white">{stat.value} <span className="text-blue-500 text-sm">BITS</span></div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-10">
                          <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-10">Portfolio Details</h3>
                          <div className="space-y-4">
                            {inventoryItems.map((item, i) => (
                              <div key={i} className="flex justify-between items-center p-5 bg-white/[0.02] rounded-3xl border border-white/5 group hover:bg-white/[0.05] transition-all">
                                <div className="flex gap-5 items-center">
                                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-white">{item.t}</div>
                                  <div>
                                    <div className="text-sm font-black text-white">{item.n}</div>
                                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.q} Shares Held</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-8">
                                  <div className="text-right">
                                    <div className="text-xs font-black text-white">{item.v} BITS</div>
                                    <div className={`text-[10px] font-bold ${item.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{item.p} ROI</div>
                                  </div>
                                  <button onClick={() => toast.error('Initiated sale protocol')} className="h-10 px-4 bg-white/5 text-white/40 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Manage</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div><TransactionHistory /></div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Creator' && (
                    <motion.div key="create" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center p-10">
                      <div className="max-w-lg">
                        <div className="w-28 h-28 bg-blue-600/10 rounded-[3rem] flex items-center justify-center text-blue-500 mx-auto mb-10 shadow-2xl shadow-blue-500/20 group hover:scale-110 transition-transform">
                          <Sparkles size={56} className="group-hover:rotate-12 transition-transform" />
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-tighter mb-6 uppercase leading-tight">Launch your <br /> IPO today.</h2>
                        <p className="text-white/40 text-base font-medium leading-relaxed mb-12">
                          Transform your community into a tradable asset. Tokenize your server, reward members with shares, and build a sustainable virtual economy.
                        </p>
                        <button className="w-full h-20 bg-[#00A2FF] text-white rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/30 group">
                          <img src="/roblox-logo.png" className="w-7 h-7 object-contain" alt="R$" />
                          Process IPO Protocol
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar Right: Summary & Legend */}
              <div className="w-80 border-l border-white/5 p-8 hidden xl:block bg-white/[0.01]">
                <div className="mb-10">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-6">Market Legend</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="text-[10px] font-bold text-white/60 uppercase">High Demand</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="text-[10px] font-bold text-white/60 uppercase">Selling Pressure</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <span className="text-[10px] font-bold text-white/60 uppercase">Stabilized</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem]">
                    <h4 className="text-[10px] font-black uppercase text-blue-400 mb-4">Pro Tip</h4>
                    <p className="text-[10px] font-medium text-white/40 leading-relaxed">
                        Diversify your portfolio by holding at least 3 different tickers to minimize risk during volatility.
                    </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="bg-white text-black px-12 h-20 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all relative z-10 shadow-2xl shadow-white/5 flex items-center gap-4"
        >
          <Activity size={20} />
          Terminal de Mercado
        </motion.button>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
}