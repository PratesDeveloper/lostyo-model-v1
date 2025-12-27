"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign, Clock } from 'lucide-react';

const history = [
  { id: 1, type: 'buy', ticker: 'LYO', amount: 10, price: '45,000', time: '2m ago' },
  { id: 2, type: 'sell', ticker: 'ATHR', amount: 5, price: '76,000', time: '15m ago' },
  { id: 3, type: 'buy', ticker: 'VRTX', amount: 100, price: '720,000', time: '1h ago' },
];

export const TransactionHistory = () => {
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden h-full">
      <div className="p-8 border-b border-white/5 flex justify-between items-center">
        <h3 className="text-xs font-black uppercase tracking-widest text-white">Recent Activity</h3>
        <Clock size={16} className="text-white/20" />
      </div>
      <div className="p-6 space-y-4">
        {history.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-4 bg-white/[0.01] rounded-2xl border border-white/5"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                item.type === 'buy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {item.type === 'buy' ? <ShoppingCart size={18} /> : <DollarSign size={18} />}
              </div>
              <div>
                <div className="text-xs font-black text-white">{item.type === 'buy' ? 'Purchased' : 'Sold'} {item.ticker}</div>
                <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{item.amount} Shares</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-black text-white">{item.price} <span className="text-blue-500">BITS</span></div>
              <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{item.time}</div>
            </div>
          </motion.div>
        ))}
        <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">
          View Full Ledger
        </button>
      </div>
    </div>
  );
};