"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Award, TrendingUp, DollarSign, ExternalLink, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { robloxUtils } from '@/lib/roblox-utils';

export const AssetEngine = ({ universeId }: { universeId: string }) => {
  const [gamepasses, setGamepasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await robloxUtils.getGamepasses(universeId);
      setGamepasses(data.data || []);
      setLoading(false);
    };
    if (universeId) load();
  }, [universeId]);

  return (
    <div className="space-y-12 h-full">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Monetization Engine</h2>
           <p className="text-white/30 text-lg font-medium">Managing core assets and financial endpoints for the experience.</p>
        </div>
        <div className="px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-black text-blue-500 uppercase tracking-widest">
           Live Economy
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-4">
            <ShoppingBag size={18} className="text-yellow-500" /> Registered Gamepasses
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-28 bg-white/[0.02] border border-white/5 rounded-[2rem] animate-pulse" />)
            ) : gamepasses.length > 0 ? gamepasses.map((gp, i) => (
              <motion.div 
                key={gp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-8 bg-[#08080A] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-yellow-500/30 transition-all"
              >
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center relative overflow-hidden">
                    <img src={`https://www.roblox.com/asset-thumbnail/image?assetId=${gp.id}&width=150&height=150&format=png`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" alt="" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white mb-1">{gp.name}</h4>
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1.5 text-xs font-black text-yellow-500 uppercase tracking-widest">
                         <DollarSign size={14} /> {gp.price || 'Free'}
                       </span>
                       <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">ID: {gp.id}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => window.open(`https://www.roblox.com/game-pass/${gp.id}`, '_blank')}
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 hover:bg-yellow-600 hover:text-white transition-all"
                >
                  <ExternalLink size={18} />
                </button>
              </motion.div>
            )) : (
              <div className="p-20 border-2 border-dashed border-white/5 rounded-[3rem] text-center">
                 <ShoppingBag size={48} className="text-white/5 mx-auto mb-6" />
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">No Gamepasses Found</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
           <div className="p-10 bg-[#08080A] border border-white/5 rounded-[3rem] space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-4">
                <TrendingUp size={18} className="text-emerald-500" /> Conversion Meta
              </h3>
              <div className="space-y-6">
                <MetricItem label="Purchase Volume" value="Detected" />
                <MetricItem label="Avg. Conversion" value="Calculated" />
                <MetricItem label="Total Assets" value={gamepasses.length} />
              </div>
           </div>

           <div className="p-10 bg-gradient-to-br from-yellow-600 to-amber-800 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-yellow-900/20">
              <Sparkles size={48} className="mb-6 opacity-30" />
              <h4 className="text-2xl font-black tracking-tighter uppercase mb-4 leading-tight">Asset <br /> Optimization</h4>
              <p className="text-amber-100/50 text-xs font-medium leading-relaxed mb-10">
                Automatic analysis of gamepass thumbnails and price points to maximize player conversion rates.
              </p>
              <button className="w-full h-14 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Generate Report
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const MetricItem = ({ label, value }: any) => (
  <div className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:pb-0">
    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-black text-white">{value}</span>
  </div>
);