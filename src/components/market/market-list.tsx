"use client";
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { toast } from 'sonner';

const stocks = [
  { ticker: 'LYO', name: 'Lostyo Studios', price: 4500, change: 12.5 },
  { ticker: 'DRFT', name: 'Neon Drift', price: 1200, change: -5.2 },
  { ticker: 'SHDW', name: 'Shadow Protocol', price: 8900, change: 2.1 },
  { ticker: 'ATHR', name: 'Aetheria', price: 15200, change: 45.8 },
  { ticker: 'BLOX', name: 'BloxCorp', price: 540, change: -2.4 },
  { ticker: 'META', name: 'MetaLink', price: 2300, change: 0 },
  { ticker: 'VRTX', name: 'Vertex Systems', price: 7200, change: 8.4 },
  { ticker: 'CORE', name: 'CoreSys', price: 3100, change: -15.1 },
  { ticker: 'NOVA', name: 'Nova Games', price: 1800, change: 22.3 },
  { ticker: 'GRID', name: 'GridRunner', price: 950, change: 1.2 },
];

export const MarketList = () => {
  const handleAction = (type: 'buy' | 'sell', ticker: string) => {
    toast.success(`${type === 'buy' ? 'Purchased' : 'Sold'} ${ticker} successfully!`);
  };

  return (
    <div className="space-y-3">
      {stocks.map((stock) => (
        <div key={stock.ticker} className="glass p-4 rounded-3xl flex items-center justify-between group hover:bg-white/[0.03] transition-all">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center font-black text-blue-500 text-xs">
              {stock.ticker.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-white">{stock.ticker}</div>
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">{stock.name}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-xs font-black text-white">{stock.price} BITS</div>
              <div className={`text-[10px] font-bold flex items-center justify-end gap-1 ${stock.change > 0 ? 'text-emerald-400' : stock.change < 0 ? 'text-red-400' : 'text-white/20'}`}>
                {stock.change > 0 ? <TrendingUp size={10} /> : stock.change < 0 ? <TrendingDown size={10} /> : <Minus size={10} />}
                {stock.change}%
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => handleAction('buy', stock.ticker)}
                className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
              >
                Buy
              </button>
              <button 
                onClick={() => handleAction('sell', stock.ticker)}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
              >
                Sell
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};