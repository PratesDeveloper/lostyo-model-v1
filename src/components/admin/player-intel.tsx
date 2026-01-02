"use client";

import React, { useState } from 'react';
import { Search, User, Shield, BarChart2, Loader2, Database, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { robloxUtils } from '@/lib/roblox-utils';

export const PlayerIntel = ({ onJumpToData }: { onJumpToData: (userId: string) => void }) => {
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const fetchPlayer = async () => {
    if (!searchId) return;
    setLoading(true);
    setPlayer(null);
    try {
      const data = await robloxUtils.getPlayerInfo(searchId);
      if (data.error) throw new Error(data.error);
      
      const thumbnail = await robloxUtils.getPlayerThumbnail(searchId);
      
      setPlayer({ ...data, thumbnail });
      toast.success("Identity localized successfully.");
    } catch (err: any) {
      toast.error("Access denied or ID not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="bg-[#08080A] border border-white/5 rounded-[2.5rem] p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Network Reconnaissance</h3>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input 
              placeholder="Inject UserID..." 
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchPlayer()}
              className="w-full h-16 bg-black/40 border border-white/5 rounded-2xl pl-14 pr-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all font-mono"
            />
          </div>
          <button 
            onClick={fetchPlayer}
            disabled={loading}
            className="h-16 px-10 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all disabled:opacity-50 shadow-xl shadow-blue-900/20"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Query ID"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {player ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow"
          >
            {/* Perfil Esquerdo */}
            <div className="lg:col-span-1 bg-[#08080A] border border-white/5 rounded-[3rem] p-12 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500/30 blur-[60px] rounded-full" />
                <img src={player.thumbnail} className="w-40 h-40 rounded-full border-4 border-white/10 relative z-10 shadow-2xl" alt="" />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter mb-2">{player.displayName}</h2>
              <p className="text-sm font-bold text-blue-500/60 uppercase tracking-widest mb-10">@{player.name}</p>
              
              <div className="w-full space-y-4">
                <MetricItem label="System UID" value={player.id} />
                <MetricItem label="Birth Protocol" value={new Date(player.created).toLocaleDateString()} />
              </div>

              <div className="mt-auto pt-10 w-full">
                <button 
                  onClick={() => onJumpToData(player.id)}
                  className="w-full h-14 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all flex items-center justify-center gap-3 group"
                >
                  <Database size={16} className="group-hover:scale-110 transition-transform" /> Sync with DataStore
                </button>
              </div>
            </div>

            {/* Status Direito */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-[#08080A] border border-white/5 rounded-[3rem] p-10">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10 flex items-center gap-4">
                    <Shield size={18} className="text-blue-500" /> Security Clearing
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <StatusBox label="Account Status" value={player.isBanned ? "TERMINATED" : "ACTIVE"} color={player.isBanned ? "text-red-500" : "text-emerald-500"} />
                    <StatusBox label="Verified Badge" value={player.hasVerifiedBadge ? "VERIFIED" : "NONE"} color="text-blue-400" />
                    <StatusBox label="Risk Level" value="LOW" color="text-emerald-500" />
                    <StatusBox label="Last Seen" value="Detected" color="text-white/40" />
                  </div>
               </div>

               <div className="bg-[#08080A] border border-white/5 rounded-[3rem] p-10 flex-grow relative overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 opacity-5">
                    <BarChart2 size={300} />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-10 flex items-center gap-4">
                    <BarChart2 size={18} className="text-emerald-500" /> Network Telemetry
                  </h3>
                  <div className="p-16 border-2 border-dashed border-white/5 rounded-[2.5rem] text-center flex flex-col items-center">
                    <Loader2 size={32} className="text-white/10 animate-spin mb-6" />
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2">Ingesting Live Stream...</p>
                    <p className="text-[9px] text-white/5 max-w-[250px] leading-relaxed">Place the tracking script in your Roblox experience to enable real-time behavior forensics.</p>
                  </div>
               </div>
            </div>
          </motion.div>
        ) : !loading && (
          <div className="flex-grow flex flex-col items-center justify-center opacity-10">
             <User size={100} className="mb-6" />
             <p className="text-sm font-black uppercase tracking-[0.5em]">Awaiting Identity Uplink</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MetricItem = ({ label, value }: any) => (
  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center group hover:bg-white/[0.04] transition-colors">
    <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-mono text-white/60 group-hover:text-blue-400 transition-colors">{value}</span>
  </div>
);

const StatusBox = ({ label, value, color }: any) => (
  <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-white/10 transition-all">
    <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.4em] mb-2">{label}</div>
    <div className={`text-base font-black uppercase tracking-tighter ${color}`}>{value}</div>
  </div>
);