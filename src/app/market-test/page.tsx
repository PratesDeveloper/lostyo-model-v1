"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RobloxTopBar } from '@/components/market/roblox-topbar';
import { MarketStepChart } from '@/components/market/market-step-chart';
import { 
  TrendingUp, TrendingDown, Wallet, Trophy, 
  Sparkles, X, Activity, ArrowRight, 
  CreditCard, Search, ChevronRight, User, LayoutGrid
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

  const stocks = [
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
  ];
  
  const inventoryItems = [
    { t: 'LYO', n: 'Lostyo Studios', q: 150, v: '675k', p: '+12%', isPositive: true },
    { t: 'ATHR', n: 'Aetheria', q: 45, v: '684k', p: '+45%', isPositive: true },
    { t: 'DRFT', n: 'Neon Drift', q: 500, v: '600k', p: '-5%', isPositive: false },
    { t: 'VRTX', n: 'Vertex Systems', q: 20, v: '144k', p: '+8.4%', isPositive: true },
    { t: 'CORE', n: 'CoreSys', q: 10, v: '31k', p: '-15.1%', isPositive: false },
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] flex items-center justify-center overflow-hidden font-sans">
      {/* Background Simulado do Jogo */}
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
            className="w-full max-w-6xl h-[750px] bg-[#0A0A0C]/90 backdrop-blur-3xl rounded-[3rem] border border-white/10 flex flex-col overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] relative z-10"
          >
            {/* Header da GUI com Tabs Horizontais */}
            <div className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-white/[0.02]">
              <div className="flex items-center gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
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
                        ? 'bg-white text-black shadow-lg' 
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
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Your Balance</span>
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

            {/* Conteúdo Dinâmico */}
            <div className="flex-grow overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === 'Market' && (
                  <motion.div 
                    key="market"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-10 space-y-10"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                      {/* Gráfico Gigante */}
                      <div className="lg:col-span-2 bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Market Real-Time Performance</h3>
                          <div className="bg-emerald-500/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                            <TrendingUp size={12} /> Bullish Market
                          </div>
                        </div>
                        <MarketStepChart />
                      </div>

                      {/* Info Card Lateral */}
                      <div className="bg-blue-600 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-125 transition-transform duration-700">
                          <Activity size={120} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-white tracking-tighter mb-2">Market is Hot!</h3>
                          <p className="text-white/60 text-xs font-medium leading-relaxed">
                            LYO and ATHR are reaching all-time highs. Trade now to maximize your profit.
                          </p>
                        </div>
                        <button className="w-full h-14 bg-white text-black rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                          View Analysis <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Lista das 10 Ações (Comprar/Vender) */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-6 ml-4">Stock Listings (10)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stocks.map((stock) => (
                          <div key={stock.t} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] flex justify-between items-center hover:bg-white/[0.05] transition-all group">
                            <div className="flex items-center gap-5">
                              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center font-black text-white group-hover:bg-blue-600 transition-colors">
                                {stock.t}
                              </div>
                              <div>
                                <div className="text-sm font-black text-white">{stock.n}</div>
                                <div className="text-[11px] font-bold text-white/40">{stock.p} BITS</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className={`text-right ${stock.c > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                <div className="text-sm font-black flex items-center justify-end gap-1">
                                  {stock.c > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                  {Math.abs(stock.c)}%
                                </div>
                                <div className="text-[9px] font-bold uppercase tracking-widest opacity-40">Change</div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => toast.success(`Bought 1 share of ${stock.t}`)} className="h-10 px-4 bg-emerald-500/10 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Buy</button>
                                <button onClick={() => toast.error(`Sold 1 share of ${stock.t}`)} className="h-10 px-4 bg-red-500/10 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">Sell</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Inventory' && (
                  <motion.div key="inv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5">
                        <Wallet className="text-blue-500 mb-4" />
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Net Worth</div>
                        <div className="text-3xl font-black text-white">2.4M <span className="text-blue-500 text-sm">BITS</span></div>
                      </div>
                      <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5">
                        <TrendingUp className="text-emerald-500 mb-4" />
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Total Profit</div>
                        <div className="text-3xl font-black text-emerald-400">+450k</div>
                      </div>
                      <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5">
                        <Activity className="text-purple-500 mb-4" />
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Shares</div>
                        <div className="text-3xl font-black text-white">1,502</div>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">
                      <div className="px-8 py-6 border-b border-white/5 bg-white/[0.01]">
                        <h3 className="text-xs font-black uppercase tracking-widest">Your Portfolio ({inventoryItems.length} Assets)</h3>
                      </div>
                      <div className="p-8 space-y-4">
                        {inventoryItems.map((item, i) => (
                          <div key={i} className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl">
                            <div className="flex gap-4 items-center">
                              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-black text-white">{item.t}</div>
                              <div>
                                <div className="text-sm font-black text-white">{item.q} Shares</div>
                                <div className="text-[10px] font-bold text-white/20">Value: {item.v} BITS</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className={`text-sm font-black ${item.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{item.p}</div>
                                <button 
                                    onClick={() => toast.error(`Sold ${item.q} shares of ${item.t}`)}
                                    className="h-10 px-4 bg-red-500/10 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                                >
                                    SELL
                                </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Leaderboard' && (
                  <motion.div key="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10">
                    <div className="max-w-3xl mx-auto space-y-4">
                      <div className="text-center mb-10">
                        <Trophy size={48} className="text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Top Traders</h2>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Ranked by Net Worth in BITS</p>
                      </div>
                      
                      {[
                        { n: 'StudioAdmin', w: '12,500,000', r: 1 },
                        { n: 'Lostyo_Fan_1', w: '8,120,000', r: 2 },
                        { n: 'DevKing', w: '4,500,000', r: 3 },
                        { n: 'Robloxian_99', w: '2,100,000', r: 4 },
                        { n: 'RichieRich', w: '1,950,000', r: 5 },
                      ].map((player, i) => (
                        <div key={i} className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all ${i === 0 ? 'bg-blue-600/20 border-blue-500/50 scale-105' : 'bg-white/[0.02] border-white/5'}`}>
                          <div className="flex items-center gap-6">
                            <div className={`text-xl font-black ${i === 0 ? 'text-blue-400' : 'text-white/10'}`}>#{player.r}</div>
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                              <User size={20} />
                            </div>
                            <div className="text-sm font-black text-white">{player.n}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-black text-white">{player.w} <span className="text-blue-500 text-[10px]">BITS</span></div>
                            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Portfolio Value</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'Creator' && (
                  <motion.div key="create" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-10 h-full flex flex-col items-center justify-center text-center">
                    <div className="max-w-md">
                      <div className="w-24 h-24 bg-blue-600/10 rounded-[2.5rem] flex items-center justify-center text-blue-500 mx-auto mb-8 shadow-2xl shadow-blue-500/20">
                        <Sparkles size={48} />
                      </div>
                      <h2 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase">IPO Protocol</h2>
                      <p className="text-white/40 text-sm font-medium leading-relaxed mb-10">
                        Initial Public Offering: List your own community ticker on our exchange. Manage roles, economy, and community assets.
                      </p>
                      
                      <div className="space-y-4">
                        <button className="w-full h-20 bg-[#00A2FF] text-white rounded-full font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/30 group">
                          <img src="/roblox-logo.png" className="w-6 h-6 object-contain" alt="R$" />
                          Create for 990 Robux
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest">Standard Developer License Applied</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-white text-black px-12 h-16 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all relative z-10 shadow-2xl shadow-white/5"
        >
          Open Market Interface
        </button>
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