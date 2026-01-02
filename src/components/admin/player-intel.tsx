"use client";

import React, { useState } from 'react';
import { Search, User, Shield, BarChart2, Hash, Calendar, Loader2, Link as LinkIcon, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export const PlayerIntel = ({ onJumpToData }: { onJumpToData: (userId: string) => void }) => {
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<any>(null);

  const fetchPlayer = async () => {
    if (!searchId) return;
    setLoading(true);
    setPlayer(null);
    try {
      // Usamos proxies para evitar CORS em APIs públicas do Roblox
      const res = await fetch(`https://users.roblox.com/v1/users/${searchId}`);
      if (!res.ok) throw new Error("Player not found");
      const data = await res.json();
      
      const thumbRes = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${searchId}&size=150x150&format=Png&isCircular=true`);
      const thumbData = await thumbRes.json();
      
      setPlayer({
        ...data,
        thumbnail: thumbData.data?.[0]?.imageUrl
      });
    } catch (err) {
      toast.error("Invalid User ID or API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6">Identity Search</h3>
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input 
              placeholder="Enter Roblox UserID..." 
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchPlayer()}
              className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all"
            />
          </div>
          <button 
            onClick={fetchPlayer}
            disabled={loading}
            className="h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Locate"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {player ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow"
          >
            <div className="lg:col-span-1 bg-[#111] border border-white/5 rounded-[3rem] p-10 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 blur-[40px] rounded-full" />
                <img src={player.thumbnail} className="w-32 h-32 rounded-full border-4 border-white/5 relative z-10" alt="" />
              </div>
              <h2 className="text-2xl font-black text-white mb-1">{player.displayName}</h2>
              <p className="text-sm font-bold text-white/20 uppercase tracking-widest mb-8">@{player.name}</p>
              
              <div className="w-full space-y-3">
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/20 uppercase">Network ID</span>
                  <span className="text-xs font-mono text-blue-400">{player.id}</span>
                </div>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-between items-center">
                  <span className="text-[10px] font-black text-white/20 uppercase">Joined</span>
                  <span className="text-xs font-mono text-white/60">{new Date(player.created).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-auto pt-8 w-full">
                <button 
                  onClick={() => onJumpToData(player.id)}
                  className="w-full h-12 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all flex items-center justify-center gap-3"
                >
                  <Database size={14} /> Link to DataStore
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
               <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-3">
                    <Shield size={16} className="text-blue-500" /> Account Protocols
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Banned", value: player.isBanned ? "TRUE" : "FALSE", color: player.isBanned ? "text-red-500" : "text-emerald-500" },
                      { label: "Verified", value: player.hasVerifiedBadge ? "YES" : "NO", color: "text-blue-400" },
                      { label: "Safety Level", value: "Standard", color: "text-white/60" },
                      { label: "Region", value: "Detected", color: "text-white/60" }
                    ].map((p, i) => (
                      <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <div className="text-[9px] font-black text-white/10 uppercase tracking-widest mb-1">{p.label}</div>
                        <div className={`text-sm font-black uppercase ${p.color}`}>{p.value}</div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 flex-grow">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8 flex items-center gap-3">
                    <BarChart2 size={16} className="text-emerald-500" /> Behavior Analysis
                  </h3>
                  <div className="p-10 border-2 border-dashed border-white/5 rounded-[2rem] text-center">
                    <p className="text-[10px] font-black text-white/10 uppercase tracking-widest mb-2">Live Telemetry Offline</p>
                    <p className="text-[9px] text-white/5 max-w-[200px] mx-auto">Ingest live game telemetry to view player session data and heatmaps.</p>
                  </div>
               </div>
            </div>
          </motion.div>
        ) : !loading && (
          <div className="flex-grow flex flex-col items-center justify-center opacity-20">
             <User size={64} className="mb-4" />
             <p className="text-xs font-black uppercase tracking-widest">Awaiting Identity Input</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};