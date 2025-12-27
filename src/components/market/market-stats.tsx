"use client";
import React from 'react';
import { Wallet, Trophy, Sparkles } from 'lucide-react';

export const MarketStats = () => {
  return (
    <div className="space-y-6">
      {/* Inventory */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <Wallet className="text-blue-500" size={18} />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">Portfolio</h3>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">LYO Shares</span>
            <span className="text-xs font-black text-white">45.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">ATHR Shares</span>
            <span className="text-xs font-black text-white">12.0</span>
          </div>
          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Total Value</span>
            <span className="text-sm font-black text-blue-400">240,150 BITS</span>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="text-yellow-500" size={18} />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">Wealth Ranking</h3>
        </div>
        <div className="space-y-4">
          {[
            { name: 'StudioAdmin', wealth: '12.5M' },
            { name: 'DevKing', wealth: '8.1M' },
            { name: 'Robloxian_99', wealth: '4.2M' },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-white/10">#{i+1}</span>
                <span className="text-xs font-bold text-white/60">{user.name}</span>
              </div>
              <span className="text-[10px] font-black text-white">{user.wealth} BITS</span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Action */}
      <button className="w-full glass p-8 rounded-[2.5rem] border border-blue-500/20 hover:border-blue-500/50 transition-all group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
          <Sparkles className="text-blue-500" size={40} />
        </div>
        <div className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Public Offering</div>
        <div className="text-lg font-black text-white tracking-tighter mb-4">Launch New Stock</div>
        <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">
          990 Robux
        </div>
      </button>
    </div>
  );
};