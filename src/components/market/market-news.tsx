"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

const news = [
  { id: 1, title: "Lostyo Studios announces new engine update", impact: "positive", ticker: "LYO" },
  { id: 2, title: "Aetheria player count hits 1M milestone", impact: "positive", ticker: "ATHR" },
  { id: 3, title: "BloxCorp faces regulatory challenges in EU", impact: "negative", ticker: "BLOX" },
  { id: 4, title: "Shadow Protocol beta leaks showing huge potential", impact: "positive", ticker: "SHDW" },
];

export const MarketNews = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
          <Zap size={16} />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Market Feed</h3>
      </div>
      
      {news.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] font-black px-2 py-0.5 bg-white/5 rounded-md text-white/60 group-hover:text-blue-400 transition-colors">
              ${item.ticker}
            </span>
            {item.impact === 'positive' ? (
              <ArrowUpRight size={14} className="text-emerald-400" />
            ) : (
              <ArrowDownRight size={14} className="text-red-400" />
            )}
          </div>
          <p className="text-[11px] font-bold text-white/70 leading-snug">{item.title}</p>
        </motion.div>
      ))}
    </div>
  );
};