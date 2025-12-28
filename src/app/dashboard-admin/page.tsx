"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Activity, Code, 
  ShieldCheck, Loader2, Gamepad2, Database, 
  Zap, Power, RefreshCcw, LayoutGrid,
  Search, Save, Trash2, ExternalLink, Braces,
  Settings, Star, Eye, ThumbsUp, Clock
} from 'lucide-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProfileByRobloxId } from '@/app/actions/profile';
import { toast, Toaster } from 'sonner';

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [datastores, setDatastores] = useState<any[]>([]);
  const [selectedDS, setSelectedDS] = useState<string>("");
  const [searchKey, setSearchKey] = useState<string>("");
  const [activeEntryData, setActiveEntryData] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'datastores'>('overview');
  const [gameDetails, setGameDetails] = useState<any>(null);

  const router = useRouter();

  // Roblox API Bridge Interaction
  const callRobloxAPI = async (action: string, params: any = {}) => {
    setIsSyncing(true);
    console.log(`[DashboardAdmin] Calling API: ${action}`, params);
    
    try {
      const response = await fetch('/api/admin/roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, universeId: selectedProject?.id, ...params })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error(`[DashboardAdmin] API Error (${response.status}):`, data);
        toast.error(data.error || "API Failure");
        return null;
      }
      
      console.log(`[DashboardAdmin] API Success (${action}):`, data);
      return data;
    } catch (err: any) {
      console.error(`[DashboardAdmin] Network/Internal Error:`, err);
      toast.error("Network request failed");
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  // Buscar detalhes do jogo (visitas, likes, etc.)
  const fetchGameDetails = async (placeId: string) => {
    try {
      const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${placeId}`);
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setGameDetails(data.data[0]);
      }
    } catch (err) {
      console.error("[DashboardAdmin] Failed to fetch game details", err);
    }
  };

  const loadBaseData = async () => {
    const robloxId = Cookies.get('lostyo_roblox_id');
    const logged = Cookies.get('lostyo_roblox_logged');

    console.log("[DashboardAdmin] Checking auth cookies", { robloxId, logged });

    if (!robloxId || logged !== 'true') {
      console.warn("[DashboardAdmin] User not authenticated, redirecting...");
      router.replace('/login');
      return;
    }

    const profileData = await getProfileByRobloxId(robloxId);
    if (profileData && profileData.is_developer) {
      setProfile(profileData);
      console.log("[DashboardAdmin] Profile authorized as developer");
      
      const robloxData = await callRobloxAPI('listUserUniverses');
      if (robloxData && robloxData.universes) {
        setProjects(robloxData.universes);
        if (robloxData.universes.length > 0) {
          setSelectedProject(robloxData.universes[0]);
        }
      }
    } else {
      console.warn("[DashboardAdmin] Profile not authorized or not developer");
      router.replace('/');
    }
    setIsLoading(false);
  };

  useEffect(() => { loadBaseData(); }, []);

  const fetchDatastores = async () => {
    const result = await callRobloxAPI('listDataStores');
    if (result && result.datastores) setDatastores(result.datastores);
  };

  const loadEntry = async () => {
    if (!selectedDS || !searchKey) return toast.error("Select a DataStore and enter a Key");
    const result = await callRobloxAPI('getEntry', { datastoreName: selectedDS, entryKey: searchKey });
    if (result) {
      setActiveEntryData(result);
      toast.success("Entry Loaded");
    }
  };

  const saveEntry = async () => {
    if (!activeEntryData) return;
    const result = await callRobloxAPI('setEntry', { 
      datastoreName: selectedDS, 
      entryKey: searchKey, 
      value: activeEntryData 
    });
    if (result) toast.success("Entry Saved Successfully");
  };

  useEffect(() => {
    if (selectedProject) {
      fetchGameDetails(selectedProject.roblox_place_id);
      if (activeTab === 'datastores') fetchDatastores();
    }
  }, [selectedProject, activeTab]);

  if (isLoading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-blue-500/30 overflow-hidden">
      <Toaster theme="dark" richColors />
      
      {/* Sidebar - Escondido em mobile */}
      <aside className="w-80 border-r border-white/5 flex flex-col hidden lg:flex bg-[#080808] relative z-20">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
              <img src="https://cdn.lostyo.com/logo.png" className="w-6 h-6" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-lg uppercase leading-none">Lostyo</span>
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Control Center</span>
            </div>
          </Link>

          <nav className="space-y-1">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'overview' ? 'bg-blue-600' : 'text-white/20 hover:bg-white/5'}`}>
              <LayoutGrid size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
            </button>
            <button onClick={() => setActiveTab('datastores')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'datastores' ? 'bg-blue-600' : 'text-white/20 hover:bg-white/5'}`}>
              <Database size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">DataStores</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto p-8 bg-black/20 border-t border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl border border-white/10 overflow-hidden">
              <img src={profile?.avatar_url} className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase truncate">{profile?.roblox_display_name}</span>
              <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">System Admin</span>
            </div>
          </div>
          <button
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-2xl bg-white/5 text-white/40 hover:text-red-500 border border-white/5 transition-all"
          >
            <Power size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest">Disconnect</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-[#080808]">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
            <h1 className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Remote Protocol // Real-Time</h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" />
              <span className="text-[9px] font-black uppercase text-blue-400">API Connection Active</span>
            </div>
            <button onClick={loadBaseData} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
              <RefreshCcw size={18} className={isSyncing ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        <div className="flex-grow flex overflow-hidden">
          {/* Sidebar Mobile - Visível em telas menores */}
          <div className="w-80 border-r border-white/5 p-6 overflow-y-auto custom-scrollbar lg:hidden">
            <div className="mb-6 px-2 flex justify-between items-center">
              <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest">Real Universes</h3>
              <span className="text-[9px] font-bold text-blue-500 px-2 py-0.5 bg-blue-500/10 rounded">{projects.length}</span>
            </div>
            <div className="space-y-3">
              {projects.length === 0 ? (
                <div className="text-center py-10 opacity-20">
                  <Gamepad2 size={32} className="mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase">No games found</p>
                </div>
              ) : (
                projects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedProject?.id === p.id ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-4">
                      <Gamepad2 size={20} className={selectedProject?.id === p.id ? "text-blue-500" : "text-white/20"} />
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase truncate max-w-[160px]">{p.name}</span>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{p.id}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex-grow p-6 md:p-12 overflow-y-auto custom-scrollbar bg-[#060606]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && selectedProject && (
                <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-5xl mx-auto">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-[9px] font-black text-blue-500 uppercase tracking-widest">
                           Cluster Active
                         </div>
                         <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/40 uppercase tracking-widest">
                           ID: {selectedProject.roblox_place_id}
                         </div>
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2">{selectedProject.name}</h2>
                      <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Universe ID: {selectedProject.id}</div>
                    </div>
                     <button
                      onClick={() => window.open(`https://www.roblox.com/games/${selectedProject.roblox_place_id}`, '_blank')}
                      className="h-14 px-8 bg-white text-black rounded-2xl font-black uppercase text-[10px] flex items-center gap-3 hover:scale-105 transition-all"
                    >
                      Launch Experience <ExternalLink size={16} />
                    </button>
                   </div>
                   
                   {/* Game Details Section */}
                   {gameDetails && (
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <Eye size={24} className="text-blue-500 mb-4" />
                        <div className="text-[10px] font-black text-white/20 uppercase mb-1">Visits</div>
                        <div className="text-3xl font-black uppercase">{gameDetails.visits.toLocaleString()}</div>
                      </div>
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <ThumbsUp size={24} className="text-emerald-500 mb-4" />
                        <div className="text-[10px] font-black text-white/20 uppercase mb-1">Likes</div>
                        <div className="text-3xl font-black uppercase">{gameDetails.votesUp.toLocaleString()}</div>
                      </div>
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <Star size={24} className="text-yellow-500 mb-4" />
                        <div className="text-[10px] font-black text-white/20 uppercase mb-1">Favorites</div>
                        <div className="text-3xl font-black uppercase">{gameDetails.favoritesCount.toLocaleString()}</div>
                      </div>
                      <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <Clock size={24} className="text-purple-500 mb-4" />
                        <div className="text-[10px] font-black text-white/20 uppercase mb-1">Created</div>
                        <div className="text-2xl font-black">{new Date(gameDetails.created).toLocaleDateString()}</div>
                      </div>
                     </div>
                   )}
                </motion.div>
              )}

              {activeTab === 'datastores' && selectedProject && (
                <motion.div key="datastores" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 max-w-6xl mx-auto">
                   <div className="flex justify-between items-center mb-10">
                      <h2 className="text-4xl font-black tracking-tighter uppercase">Cloud Data Explorer</h2>
                      <button onClick={fetchDatastores} className="h-10 px-4 bg-white/5 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-white/10 transition-all">
                        <RefreshCcw size={14} /> Sync DataStores
                      </button>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1 space-y-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-white/20 uppercase tracking-widest px-2">Select Cluster</label>
                           <select
                            value={selectedDS}
                            onChange={(e) => setSelectedDS(e.target.value)}
                            className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-xs font-bold uppercase outline-none focus:border-blue-500 transition-all appearance-none"
                           >
                             <option value="">-- Choose DataStore --</option>
                             {datastores.map(ds => <option key={ds.name} value={ds.name}>{ds.name}</option>)}
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-white/20 uppercase tracking-widest px-2">Key Identifier</label>
                           <div className="relative">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                              <input
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                placeholder="Player_ID / Key"
                                className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 text-xs font-bold outline-none focus:border-blue-500 transition-all"
                              />
                           </div>
                        </div>
                        <button
                          onClick={loadEntry}
                          className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-blue-600/20"
                        >
                          Fetch Cloud Data
                        </button>
                      </div>

                      <div className="lg:col-span-2">
                         <div className="glass border border-white/5 rounded-[2.5rem] overflow-hidden">
                            <div className="h-14 bg-white/5 flex items-center justify-between px-8 border-b border-white/5">
                               <div className="flex items-center gap-3">
                                  <Braces size={16} className="text-blue-500" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">Live Cloud Editor</span>
                               </div>
                               {activeEntryData && (
                                 <div className="flex gap-4">
                                    <button onClick={saveEntry} className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-[10px] font-black uppercase">
                                      <Save size={14} /> Save to Cloud
                                    </button>
                                    <button onClick={() => setActiveEntryData(null)} className="text-white/20 hover:text-red-500 flex items-center gap-2 text-[10px] font-black uppercase">
                                      <Trash2 size={14} /> Clear
                                    </button>
                                 </div>
                               )}
                            </div>
                            <div className="p-8">
                               {activeEntryData ? (
                                 <textarea
                                  value={typeof activeEntryData === 'string' ? activeEntryData : JSON.stringify(activeEntryData, null, 2)}
                                  onChange={(e) => {
                                    try {
                                      setActiveEntryData(JSON.parse(e.target.value));
                                    } catch {
                                      setActiveEntryData(e.target.value);
                                    }
                                  }}
                                  className="w-full h-96 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed outline-none resize-none"
                                 />
                               ) : (
                                 <div className="h-96 flex flex-col items-center justify-center text-center opacity-20">
                                    <Code size={48} className="mb-4" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">No Active Entry Loaded</p>
                                 </div>
                               )}
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.2); }
      `}</style>
    </div>
  );
}