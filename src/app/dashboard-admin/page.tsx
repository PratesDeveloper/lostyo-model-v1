"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldCheck, Loader2, Gamepad2, Database, 
  Zap, Power, RefreshCcw, LayoutGrid,
  Search, Save, Trash2, ExternalLink, Braces,
  Star, Eye, ThumbsUp, Clock, Menu, X, ChevronRight, FileText, Code
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  
  const [datastores, setDatastores] = useState<any[]>([]);
  const [selectedDS, setSelectedDS] = useState<string>("");
  const [dsKeys, setDsKeys] = useState<any[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [activeEntryData, setActiveEntryData] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'datastores'>('overview');
  const [gameDetails, setGameDetails] = useState<any>(null);

  const router = useRouter();

  // Função centralizada para chamadas via Bridge/Proxy
  const callRobloxAPI = async (action: string, params: any = {}) => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/admin/roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, universeId: selectedProject?.id, ...params })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "API Failure");
      return data;
    } catch (err: any) {
      toast.error(err.message);
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const loadBaseData = async () => {
    const robloxId = Cookies.get('lostyo_roblox_id');
    const logged = Cookies.get('lostyo_roblox_logged');

    if (!robloxId || logged !== 'true') {
      router.replace('/login');
      return;
    }

    const profileData = await getProfileByRobloxId(robloxId);
    if (profileData && profileData.is_developer) {
      setProfile(profileData);
      const robloxData = await callRobloxAPI('listUserUniverses');
      if (robloxData && robloxData.universes) {
        setProjects(robloxData.universes);
        if (robloxData.universes.length > 0) setSelectedProject(robloxData.universes[0]);
      }
    } else {
      router.replace('/');
    }
    setIsLoading(false);
  };

  useEffect(() => { loadBaseData(); }, []);

  // AGORA USANDO O PROXY INTERNO PARA EVITAR CORS
  const fetchGameDetails = async () => {
    if (!selectedProject?.id) return;
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/proxy/games?ids=${selectedProject.id}`);
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setGameDetails(data.data[0]);
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching game details via proxy", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchDatastores = async () => {
    const result = await callRobloxAPI('listDataStores');
    if (result && result.datastores) setDatastores(result.datastores);
  };

  const fetchKeys = async (dsName: string) => {
    setSelectedDS(dsName);
    const result = await callRobloxAPI('listKeys', { datastoreName: dsName });
    if (result && result.keys) setDsKeys(result.keys);
    else setDsKeys([]);
  };

  const loadEntry = async (key: string) => {
    setSearchKey(key);
    const result = await callRobloxAPI('getEntry', { datastoreName: selectedDS, entryKey: key });
    if (result) {
      setActiveEntryData(result);
      toast.success(`Entry ${key} Loaded`);
    }
  };

  const saveEntry = async () => {
    if (!activeEntryData || !searchKey) return;
    const result = await callRobloxAPI('setEntry', { datastoreName: selectedDS, entryKey: searchKey, value: activeEntryData });
    if (result) toast.success("Cloud Data Updated");
  };

  useEffect(() => {
    if (selectedProject) {
      fetchGameDetails();
      if (activeTab === 'datastores') fetchDatastores();
    }
  }, [selectedProject, activeTab]);

  if (isLoading) return <div className="min-h-screen bg-[#0C0C0D] flex items-center justify-center"><Loader2 className="animate-spin text-blue-500 w-12 h-12" /></div>;

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-hidden">
      <Toaster theme="dark" richColors />
      
      {/* Sidebar - Desktop */}
      <aside className="w-80 border-r border-white/5 flex flex-col hidden lg:flex bg-[#0F0F11] shrink-0">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
              <img src="https://cdn.lostyo.com/logo.png" className="w-6 h-6" alt="Logo" />
            </div>
            <span className="font-black tracking-tighter text-lg uppercase leading-none">Lostyo</span>
          </Link>

          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutGrid },
              { id: 'datastores', label: 'DataStores', icon: Database }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-blue-600 shadow-xl shadow-blue-600/20' : 'text-white/20 hover:bg-white/5'}`}>
                <tab.icon size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5 bg-black/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl border border-white/10 overflow-hidden shadow-lg"><img src={profile?.avatar_url} className="w-full h-full object-cover" /></div>
            <div className="flex flex-col"><span className="text-[11px] font-black uppercase truncate max-w-[120px]">{profile?.roblox_display_name}</span><span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Admin Terminal</span></div>
          </div>
          <button onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }} className="w-full h-12 flex items-center justify-center gap-3 rounded-2xl bg-white/5 text-white/40 hover:text-red-500 border border-white/5 transition-all"><Power size={16} /><span className="text-[9px] font-black uppercase tracking-widest">Sign Out</span></button>
        </div>
      </aside>

      {/* Header Mobile */}
      <header className="lg:hidden h-20 border-b border-white/5 bg-[#0F0F11] flex items-center justify-between px-6 z-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="https://cdn.lostyo.com/logo.png" className="w-6 h-6" alt="Logo" />
          <span className="font-black text-sm uppercase">Lostyo</span>
        </Link>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowNodeSelector(!showNodeSelector)} className={`p-2 rounded-xl transition-colors ${showNodeSelector ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'}`}>
            <Gamepad2 size={20} />
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-white/5 rounded-xl text-white">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Node Selector Mobile Overlay */}
      <AnimatePresence>
        {showNodeSelector && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-20 left-0 right-0 bg-[#141417] border-b border-white/5 p-6 z-40 lg:hidden shadow-2xl">
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Production Nodes</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {projects.map((p) => (
                <div key={p.id} onClick={() => { setSelectedProject(p); setShowNodeSelector(false); }} className={`flex-shrink-0 p-4 rounded-2xl border transition-all min-w-[200px] ${selectedProject?.id === p.id ? 'bg-blue-600/10 border-blue-500' : 'bg-white/5 border-white/5'}`}>
                  <div className="flex items-center gap-3">
                    <Gamepad2 size={16} className={selectedProject?.id === p.id ? 'text-blue-500' : 'text-white/20'} />
                    <span className="text-[11px] font-black uppercase truncate">{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-[#0F0F11] z-[60] lg:hidden p-8 pt-24 space-y-12">
            <nav className="space-y-4">
               <button onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }} className={`w-full p-6 rounded-3xl flex items-center gap-4 ${activeTab === 'overview' ? 'bg-blue-600' : 'bg-white/5'}`}><LayoutGrid /> <span className="font-black uppercase text-xs">Dashboard</span></button>
               <button onClick={() => { setActiveTab('datastores'); setMobileMenuOpen(false); }} className={`w-full p-6 rounded-3xl flex items-center gap-4 ${activeTab === 'datastores' ? 'bg-blue-600' : 'bg-white/5'}`}><Database /> <span className="font-black uppercase text-xs">DataStores</span></button>
            </nav>
            <div className="p-8 border border-white/5 rounded-[2.5rem] bg-black/20 flex items-center gap-4">
              <img src={profile?.avatar_url} className="w-14 h-14 rounded-2xl shadow-xl" />
              <div className="flex flex-col"><span className="text-xs font-black uppercase tracking-tight">{profile?.roblox_display_name}</span><span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Active Session</span></div>
            </div>
            <button onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }} className="w-full h-16 bg-red-500/10 text-red-500 rounded-3xl font-black uppercase text-xs tracking-widest border border-red-500/10">Terminate Connection</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col h-full overflow-hidden relative">
        {/* Top Activity Bar */}
        <div className="h-16 md:h-24 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-[#0C0C0D] shrink-0 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hidden sm:block">Protocol // Synchronized</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" />
              <span className="text-[9px] font-black uppercase text-blue-400">Authenticated</span>
            </div>
            <button onClick={loadBaseData} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"><RefreshCcw size={18} className={isSyncing ? "animate-spin" : ""} /></button>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* Node Selector - Desktop */}
          <div className="w-full max-w-[320px] border-r border-white/5 p-6 overflow-y-auto custom-scrollbar hidden md:block bg-[#0C0C0D]/50">
            <h3 className="text-[10px] font-black text-white/10 uppercase tracking-widest mb-8 px-2">Production Nodes</h3>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} onClick={() => setSelectedProject(p)} className={`p-5 rounded-[1.5rem] border cursor-pointer transition-all ${selectedProject?.id === p.id ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-600/5' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedProject?.id === p.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/20'}`}><Gamepad2 size={18} /></div>
                    <div className="flex flex-col"><span className="text-xs font-black uppercase truncate max-w-[150px]">{p.name}</span><span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">{p.id}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Content Panel */}
          <div className="flex-grow p-6 md:p-12 overflow-y-auto custom-scrollbar bg-[#0E0E10]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && selectedProject && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 max-w-5xl mx-auto">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/30 uppercase tracking-widest">ID: {selectedProject.id}</span>
                         </div>
                         <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">{selectedProject.name}</h2>
                      </div>
                      <button onClick={() => window.open(`https://www.roblox.com/games/${selectedProject.roblox_place_id}`, '_blank')} className="w-full md:w-auto h-14 px-8 bg-white text-black rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-white/5">Launch Production <ExternalLink size={16} /></button>
                   </div>

                   {gameDetails ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem]"><Eye className="text-blue-500 mb-6" size={24} /><div className="text-[10px] font-black text-white/20 uppercase mb-1">Total Visits</div><div className="text-3xl font-black text-white tracking-tight">{gameDetails.visits.toLocaleString()}</div></div>
                        <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem]"><ThumbsUp className="text-emerald-500 mb-6" size={24} /><div className="text-[10px] font-black text-white/20 uppercase mb-1">Likes</div><div className="text-3xl font-black text-white tracking-tight">{gameDetails.votesUp.toLocaleString()}</div></div>
                        <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem]"><Star className="text-yellow-500 mb-6" size={24} /><div className="text-[10px] font-black text-white/20 uppercase mb-1">Favorites</div><div className="text-3xl font-black text-white tracking-tight">{gameDetails.favoritesCount.toLocaleString()}</div></div>
                        <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem]"><Clock className="text-purple-500 mb-6" size={24} /><div className="text-[10px] font-black text-white/20 uppercase mb-1">Created</div><div className="text-2xl font-black text-white tracking-tight">{new Date(gameDetails.created).toLocaleDateString()}</div></div>
                     </div>
                   ) : <div className="p-16 border-2 border-dashed border-white/5 rounded-[3rem] text-center opacity-30"><Loader2 className="animate-spin mx-auto mb-4" /> <span className="text-[10px] font-black uppercase tracking-[0.2em]">Interrogating Universe...</span></div>}

                   <div className="p-12 bg-white/[0.01] border border-white/5 rounded-[3rem] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><ShieldCheck size={160} /></div>
                      <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3">Security Protocol</h3>
                      <p className="text-white/40 text-xs font-medium leading-relaxed max-w-xl mb-10">This node is verified and connected to the Roblox Cloud API. All interactions with DataStores and universe properties are encrypted and audited through Lostyo Central Command.</p>
                      <div className="flex flex-wrap gap-4">
                         <div className="px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-full text-[9px] font-black text-blue-500 uppercase tracking-widest">OAuth 2.0 Secure</div>
                         <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-500 uppercase tracking-widest">Cloud Sync Active</div>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'datastores' && selectedProject && (
                <motion.div key="datastores" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-6xl mx-auto">
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">Cloud Data Hub</h2>
                      <button onClick={fetchDatastores} className="h-12 px-6 bg-white/5 rounded-2xl text-[10px] font-black uppercase flex items-center gap-3 hover:bg-white/10 transition-all border border-white/5"><RefreshCcw size={14} /> Re-sync Clusters</button>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      {/* Cluster Selector */}
                      <div className="lg:col-span-3 space-y-6">
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-2">Data Clusters</div>
                         <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                           {datastores.length > 0 ? datastores.map(ds => (
                             <button key={ds.name} onClick={() => fetchKeys(ds.name)} className={`w-full p-6 rounded-2xl border text-left transition-all flex items-center justify-between group ${selectedDS === ds.name ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-600/10' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}>
                               <span className={`text-xs font-black truncate max-w-[120px] ${selectedDS === ds.name ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>{ds.name}</span>
                               <ChevronRight size={16} className={selectedDS === ds.name ? 'text-white' : 'text-white/10 group-hover:text-blue-500 translate-x-0 group-hover:translate-x-1 transition-transform'} />
                             </button>
                           )) : <div className="p-8 border-2 border-dashed border-white/5 rounded-3xl text-center opacity-20"><span className="text-[10px] font-black uppercase">No Clusters</span></div>}
                         </div>
                      </div>

                      {/* Key Explorer */}
                      <div className="lg:col-span-4 space-y-6 border-l border-white/5 pl-0 lg:pl-10">
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-2">Cluster Keys ({dsKeys.length})</div>
                         <div className="relative mb-6">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input placeholder="Search Index..." className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-xs font-bold outline-none focus:border-blue-500 transition-all text-white" />
                         </div>
                         <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                           {dsKeys.length > 0 ? dsKeys.map(k => (
                             <button key={k.key} onClick={() => loadEntry(k.key)} className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center gap-5 ${searchKey === k.key ? 'bg-white/10 border-blue-500/50 shadow-lg shadow-blue-600/5' : 'bg-white/[0.01] border-white/5 hover:bg-white/5'}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${searchKey === k.key ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/20'}`}><FileText size={16} /></div>
                                <span className={`text-[11px] font-black truncate ${searchKey === k.key ? 'text-white' : 'text-white/40'}`}>{k.key}</span>
                             </button>
                           )) : <div className="p-16 text-center opacity-10"><Database size={40} className="mx-auto mb-4" /><p className="text-[10px] font-black uppercase tracking-widest">Awaiting Cluster Selection</p></div>}
                         </div>
                      </div>

                      {/* Live Editor */}
                      <div className="lg:col-span-5">
                         <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] overflow-hidden sticky top-4 shadow-2xl">
                            <div className="h-16 bg-white/[0.03] flex items-center justify-between px-8 border-b border-white/5">
                               <div className="flex items-center gap-3"><Braces size={18} className="text-blue-500" /><span className="text-[10px] font-black uppercase tracking-widest text-white">Cloud Editor</span></div>
                               {activeEntryData && (
                                 <div className="flex gap-4">
                                    <button onClick={saveEntry} className="text-emerald-500 hover:text-emerald-400 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors"><Save size={16} /> Push to Cloud</button>
                                 </div>
                               )}
                            </div>
                            <div className="p-8">
                               {activeEntryData ? (
                                 <textarea 
                                  value={typeof activeEntryData === 'string' ? activeEntryData : JSON.stringify(activeEntryData, null, 2)}
                                  onChange={(e) => { try { setActiveEntryData(JSON.parse(e.target.value)); } catch { setActiveEntryData(e.target.value); } }}
                                  className="w-full h-[450px] bg-transparent text-emerald-400 font-mono text-[11px] leading-relaxed outline-none resize-none custom-scrollbar p-2"
                                 />
                               ) : (
                                 <div className="h-[450px] flex flex-col items-center justify-center text-center opacity-10">
                                   <Code size={56} className="mb-6" />
                                   <p className="text-[10px] font-black uppercase tracking-[0.4em] max-w-[200px] leading-loose">Initialize data entry for local modification</p>
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
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.2); }
        select option { background: #141417; color: white; }
      `}</style>
    </div>
  );
}