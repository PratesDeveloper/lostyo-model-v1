"use client";

import React, { useState } from 'react';
import { Search, User, Shield, BarChart2, Loader2, Database, ExternalLink, Users, Award, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { robloxUtils } from '@/lib/roblox-utils';

export const PlayerIntel = ({ onJumpToData }: { onJumpToData: (userId: string) => void }) => {
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [groups, setGroups] = useState<any[]>([]);

  const fetchPlayer = async () => {
    if (!searchId) return;
    setLoading(true);
    setPlayer(null);
    setGroups([]);
    try {
      const data = await robloxUtils.getUser(searchId);
      if (data.error) throw new Error(data.error);
      
      const [thumbnail, groupData] = await Promise.all([
        robloxUtils.getUserThumb(searchId),
        robloxUtils.getUserGroups(searchId)
      ]);
      
      setPlayer({ ...data, thumbnail });
      setGroups(groupData.data || []);
      toast.success("Identity localized successfully.");
    } catch (err: any) {
      toast.error("Access denied or ID not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Network Reconnaissance</h3>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input 
              placeholder="Inject UserID..." 
              value={searchId}
              onChange={e => setSearchId(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && fetchPlayer()}
              className="w-full h-16 bg-black/20 border border-white/5 rounded-3xl pl-16 pr-6 text-sm text-white focus:border-blue-500/50 outline-none transition-all font-mono placeholder:text-white/10"
            />
          </div>
          <button 
            onClick={fetchPlayer}
            disabled={loading}
            className="h-16 px-12 bg-white text-black hover:bg-blue-500 hover:text-white rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all disabled:opacity-50"
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
            {/* Left Profile Panel */}
            <div className="lg:col-span-1 bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 flex flex-col items-center text-center relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600/50" />
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full" />
                <img src={player.thumbnail} className="w-44 h-44 rounded-full border-8 border-white/[0.03] relative z-10 shadow-2xl" alt="" />
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter mb-2 leading-none uppercase">{player.displayName}</h2>
              <p className="text-sm font-bold text-blue-500/60 uppercase tracking-widest mb-12">@{player.name}</p>
              
              <div className="w-full space-y-3">
                <MetricItem label="System UID" value={player.id} />
                <MetricItem label="Birth Protocol" value={new Date(player.created).toLocaleDateString()} />
              </div>

              <div className="mt-auto pt-12 w-full">
                <button 
                  onClick={() => onJumpToData(player.id)}
                  className="w-full h-16 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 group"
                >
                  <Database size={16} /> Sync with DataStore
                </button>
              </div>
            </div>

            {/* Right Status Panel */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 backdrop-blur-md">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-12 flex items-center gap-4">
                    <Shield size={18} className="text-blue-500" /> Security Clearing
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <StatusBox label="Status" value={player.isBanned ? "BANNED" : "ACTIVE"} color={player.isBanned ? "text-red-500" : "text-emerald-500"} />
                    <StatusBox label="Badge" value={player.hasVerifiedBadge ? "VERIFIED" : "NONE"} color="text-blue-400" />
                    <StatusBox label="Risk" value="MINIMAL" color="text-emerald-500" />
                    <StatusBox label="Presence" value="OFFLINE" color="text-white/20" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                  <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 backdrop-blur-md">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-8 flex items-center gap-4">
                      <Users size={18} className="text-emerald-500" /> Group Affiliations
                    </h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                      {groups.length > 0 ? groups.map((g, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="min-w-0">
                            <p className="text-xs font-black text-white truncate">{g.group.name}</p>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{g.role.name}</p>
                          </div>
                          <span className="text-[10px] font-black text-blue-500/60">LVL {g.role.rank}</span>
                        </div>
                      )) : (
                        <p className="text-[10px] font-black text-white/10 uppercase tracking-widest text-center py-10">No public groups detected</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 flex flex-col relative overflow-hidden backdrop-blur-md">
                     <div className="absolute -right-10 -bottom-10 text-white/5">
                        <Award size={200} />
                     </div>
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-12 flex items-center gap-4">
                        <Award size={18} className="text-yellow-500" /> Achievement Hub
                     </h3>
                     <div className="mt-auto">
                        <div className="p-8 border-2 border-dashed border-white/5 rounded-[2rem] text-center">
                           <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">Badge Scanner Offline</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        ) : !loading && (
          <div className="flex-grow flex flex-col items-center justify-center opacity-5">
             <User size={120} className="mb-6" />
             <p className="text-sm font-black uppercase tracking-[1em]">Awaiting ID Uplink</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MetricItem = ({ label, value }: any) => (
  <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex justify-between items-center group hover:bg-white/[0.05] transition-all">
    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-mono text-white/40 group-hover:text-blue-500 transition-colors">{value}</span>
  </div>
);

const StatusBox = ({ label, value, color }: any) => (
  <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] hover:border-white/10 transition-all text-center">
    <div className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em] mb-4">{label}</div>
    <div className={`text-sm font-black uppercase tracking-tighter ${color}`}>{value}</div>
  </div>
);