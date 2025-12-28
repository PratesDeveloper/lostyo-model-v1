"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldCheck, Loader2, Gamepad2, Database, 
  Zap, Power, RefreshCcw, LayoutGrid,
  Search, Save, Trash2, ExternalLink, Braces,
  Star, Eye, ThumbsUp, Clock, Menu, X, ChevronRight, FileText, Code, AlertTriangle
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
  const [filteredKeys, setFilteredKeys] = useState<any[]>([]);
  const [searchKeyFilter, setSearchKeyFilter] = useState("");
  
  const [activeEntryKey, setActiveEntryKey] = useState<string>("");
  const [activeEntryData, setActiveEntryData] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'datastores'>('overview');
  const [gameDetails, setGameDetails] = useState<any>(null);

  const router = useRouter();

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

  const fetchGameDetails = async () => {
    if (!selectedProject?.id) return;
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/proxy/games?ids=${selectedProject.id}`);
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setGameDetails(data.data[0]);
      } else {
        setGameDetails(null);
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
    setActiveEntryData(null);
    setActiveEntryKey("");
    const result = await callRobloxAPI('listKeys', { datastoreName: dsName });
    if (result && result.keys) {
      setDsKeys(result.keys);
      setFilteredKeys(result.keys);
    } else {
      setDsKeys([]);
      setFilteredKeys([]);
    }
  };

  useEffect(() => {
    const filtered = dsKeys.filter(k => k.key.toLowerCase().includes(searchKeyFilter.toLowerCase()));
    setFilteredKeys(filtered);
  }, [searchKeyFilter, dsKeys]);

  const loadEntry = async (key: string) => {
    setActiveEntryKey(key);
    const result = await callRobloxAPI('getEntry', { datastoreName: selectedDS, entryKey: key });
    if (result) {
      setActiveEntryData(result);
      toast.success(`Entry ${key} Loaded`);
    }
  };

  const saveEntry = async () => {
    if (!activeEntryData || !activeEntryKey) return;
    const result = await callRobloxAPI('setEntry', { datastoreName: selectedDS, entryKey: activeEntryKey, value: activeEntryData });
    if (result) toast.success("Cloud Data Synchronized");
  };

  const deleteEntry = async () => {
    if (!activeEntryKey || !selectedDS) return;
    if (!confirm(`Are you sure you want to PERMANENTLY delete ${activeEntryKey}?`)) return;
    
    const result = await callRobloxAPI('deleteEntry', { datastoreName: selectedDS, entryKey: activeEntryKey });
    if (result) {
      toast.success("Entry Purged from Cloud");
      setActiveEntryData(null);
      setActiveEntryKey("");
      fetchKeys(selectedDS);
    }
  };

  useEffect(() => {
    if (selectedProject) {
      fetchGameDetails();
      if (activeTab === 'datastores') fetchDatastores();
    }
  }, [selectedProject, activeTab]);

  if (isLoading) return (
    <div className="min-h-screen bg-[#0C0C0D] flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-500 w-12 h-12 mb-4" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Initialising Terminal</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0C0C0D] text-white flex flex-col lg:flex-row font-sans selection:bg-blue-500/30 overflow-hidden">
      <Toaster theme="dark" richColors />
      
      {/* Sidebar - Desktop */}
      <aside className="w-80 border-r border-white/5 flex flex-col hidden lg:flex bg-[#0F0F11] shrink-0">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all group-hover:scale-105 group-hover:rotate-3">
              <img src="https://cdn.lostyo.com/logo.png" className="w-6 h-6" alt="Logo" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-lg uppercase leading-none">Lostyo</span>
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Core Systems</span>
            </div>
          </Link>

          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutGrid },
              { id: 'datastores', label: 'Cloud Data', icon: Database }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id as any)} 
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeTab === tab.id ? 'bg-blue-600 shadow-xl shadow-blue-600/20' : 'text-white/20 hover:bg-white/5 hover:text-white'}`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'group-hover:text-blue-500 transition-colors'} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5 bg-black/10">
          <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-2xl border border-white/10 overflow-hidden shadow-lg">
              <img src={profile?.avatar_url} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] font-black uppercase truncate">{profile?.roblox_display_name}</span>
              <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Administrator</span>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }} 
            className="w-full h-14 flex items-center justify-center gap-3 rounded-2xl bg-white/5 text-white/40 hover:text-red-500 border border-white/5 hover:bg-red-500/5 transition-all"
          >
            <Power size={16} />
            <span className="text-[9px] font-black uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Header Mobile */}
      <header className="lg:hidden h-20 border-b border-white/5 bg-[#0F0F11] flex items-center justify-between px-6 z-50">
        <Link href="/" className="flex items-center gap-2">
          <img src="https://cdn.lostyo.com/logo.png" className="w-6 h-6" alt="Logo" />
          <span className="font-black text-sm uppercase tracking-tighter">Lostyo</span>
        </Link>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowNodeSelector(!showNodeSelector)} 
            className={`p-3 rounded-xl transition-all ${showNodeSelector ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/40'}`}
          >
            <Gamepad2 size={20} />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-3 bg-white/5 rounded-xl text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Node Selector Mobile Overlay */}
      <AnimatePresence>
        {showNodeSelector && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="absolute top-20 left-0 right-0 bg-[#141417]/95 backdrop-blur-xl border-b border-white/10 p-6 z-40 lg:hidden shadow-2xl"
          >
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Select Universe</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {projects.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => { setSelectedProject(p); setShowNodeSelector(false); }} 
                  className={`flex-shrink-0 p-5 rounded-[2rem] border transition-all min-w-[240px] ${selectedProject?.id === p.id ? 'bg-blue-600/10 border-blue-500' : 'bg-white/5 border-white/5'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedProject?.id === p.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/20'}`}>
                      <Gamepad2 size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black uppercase truncate">{p.name}</span>
                      <span className="text-[8px] font-bold text-white/20 uppercase">ID: {p.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col h-full overflow-hidden relative bg-[#0C0C0D]">
        {/* Top Activity Bar */}
        <div className="h-16 md:h-24 border-b border-white/5 flex items-center justify-between px-6 md:px-10 bg-[#0C0C0D] shrink-0 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'}`} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hidden sm:block">Channel // Synchronized</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden xs:flex px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" />
              <span className="text-[9px] font-black uppercase text-blue-400">Protocol Secure</span>
            </div>
            <button 
              onClick={loadBaseData} 
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-90"
            >
              <RefreshCcw size={18} className={isSyncing ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          {/* Node Selector - Desktop */}
          <div className="w-full max-w-[320px] border-r border-white/5 p-6 overflow-y-auto custom-scrollbar hidden md:block bg-[#0C0C0D]/50">
            <h3 className="text-[10px] font-black text-white/10 uppercase tracking-widest mb-8 px-2">Production Nodes</h3>
            <div className="space-y-4">
              {projects.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => setSelectedProject(p)} 
                  className={`p-5 rounded-[2rem] border cursor-pointer transition-all relative group overflow-hidden ${selectedProject?.id === p.id ? 'bg-blue-600/10 border-blue-500/50 shadow-2xl shadow-blue-600/5' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                >
                  {selectedProject?.id === p.id && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                  )}
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${selectedProject?.id === p.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-white/20'}`}>
                      <Gamepad2 size={22} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase truncate max-w-[150px]">{p.name}</span>
                      <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">{p.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Content Panel */}
          <div className="flex-grow p-6 md:p-12 overflow-y-auto custom-scrollbar bg-[#0E0E10]/40">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && selectedProject && (
                <motion.div 
                  key="overview" 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="space-y-12 max-w-5xl mx-auto"
                >
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                      <div className="space-y-4">
                         <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/30 uppercase tracking-widest">Root: {selectedProject.roblox_place_id}</span>
                         </div>
                         <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white break-words">{selectedProject.name}</h2>
                      </div>
                      <button 
                        onClick={() => window.open(`https://www.roblox.com/games/${selectedProject.roblox_place_id}`, '_blank')} 
                        className="w-full md:w-auto h-16 px-10 bg-white text-black rounded-[2rem] font-black uppercase text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-white/5"
                      >
                        Launch Production <ExternalLink size={16} />
                      </button>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                        <Eye className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" size={24} />
                        <div className="text-[10px] font-black text-white/20 uppercase mb-1">Total Visits</div>
                        <div className="text-3xl font-black text-white tracking-tight">{(gameDetails?.visits || 0).toLocaleString()}</div>
                      </div>
                      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                        <ThumbsUp className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={24} />
                        <div className="text-[10px] font-black text-white/20 uppercase mb-1">Up Votes</div>
                        <div className="text-3xl font-black text-white tracking-tight">{(gameDetails?.votesUp || 0).toLocaleString()}</div>
                      </div>
                      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                        <Star className="text-yellow-500 mb-6 group-hover:scale-110 transition-transform" size={24} />
                        <div className="text-[10px] font-black text-white/20 uppercase mb-1">Favorites</div>
                        <div className="text-3xl font-black text-white tracking-tight">{(gameDetails?.favoritesCount || 0).toLocaleString()}</div>
                      </div>
                      <div className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative overflow-hidden group">
                        <Clock className="text-purple-500 mb-6 group-hover:scale-110 transition-transform" size={24} />
                        <div className="text-[10px] font-black text-white/20 uppercase mb-1">Created</div>
                        <div className="text-2xl font-black text-white tracking-tight">{gameDetails?.created ? new Date(gameDetails.created).toLocaleDateString() : '---'}</div>
                      </div>
                   </div>

                   <div className="p-12 bg-white/[0.01] border border-white/5 rounded-[3.5rem] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity"><ShieldCheck size={180} /></div>
                      <div className="relative z-10">
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-4">
                          <span className="w-2 h-8 bg-blue-600 rounded-full" /> Security & Infrastructure
                        </h3>
                        <p className="text-white/40 text-sm font-medium leading-relaxed max-w-2xl mb-12">
                          All cloud interactions are routed through the Lostyo Secure Bridge. This universe is currently operating under 256-bit encryption with real-time audit logging enabled for all DataStore transactions.
                        </p>
                        <div className="flex flex-wrap gap-4">
                           <div className="px-8 py-3 bg-blue-600/10 border border-blue-500/20 rounded-full text-[9px] font-black text-blue-500 uppercase tracking-[0.2em]">Verified Provider</div>
                           <div className="px-8 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-500 uppercase tracking-[0.2em]">Cloud Sync Active</div>
                           <div className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Latency: 12ms</div>
                        </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'datastores' && selectedProject && (
                <motion.div 
                  key="datastores" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="space-y-12 max-w-7xl mx-auto"
                >
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                      <div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white">Cloud Explorer</h2>
                        <p className="text-white/20 text-xs font-bold uppercase tracking-widest mt-2">Universe: {selectedProject.name}</p>
                      </div>
                      <button 
                        onClick={fetchDatastores} 
                        className="h-14 px-8 bg-white/5 rounded-2xl text-[10px] font-black uppercase flex items-center gap-3 hover:bg-white/10 transition-all border border-white/5 hover:scale-105 active:scale-95"
                      >
                        <RefreshCcw size={14} /> Synchronize Clusters
                      </button>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      {/* Cluster Selector */}
                      <div className="lg:col-span-3 space-y-6">
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-2">Data Clusters</div>
                         <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-3">
                           {datastores.length > 0 ? datastores.map(ds => (
                             <button 
                              key={ds.name} 
                              onClick={() => fetchKeys(ds.name)} 
                              className={`w-full p-6 rounded-[2rem] border text-left transition-all flex items-center justify-between group ${selectedDS === ds.name ? 'bg-blue-600 border-blue-500 shadow-xl shadow-blue-600/10' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                             >
                               <span className={`text-xs font-black truncate max-w-[120px] ${selectedDS === ds.name ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>{ds.name}</span>
                               <ChevronRight size={16} className={selectedDS === ds.name ? 'text-white' : 'text-white/10 group-hover:text-blue-500 transition-transform translate-x-0 group-hover:translate-x-1'} />
                             </button>
                           )) : (
                             <div className="p-12 border-2 border-dashed border-white/5 rounded-[2.5rem] text-center opacity-20">
                               <Database size={32} className="mx-auto mb-4" />
                               <span className="text-[10px] font-black uppercase tracking-widest">No Clusters</span>
                             </div>
                           )}
                         </div>
                      </div>

                      {/* Key Explorer */}
                      <div className="lg:col-span-4 space-y-6 lg:border-l border-white/5 lg:pl-10">
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-2 flex justify-between">
                           <span>Cluster Keys</span>
                           <span className="text-blue-500">{filteredKeys.length}</span>
                         </div>
                         <div className="relative mb-8">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input 
                              value={searchKeyFilter}
                              onChange={(e) => setSearchKeyFilter(e.target.value)}
                              placeholder="Search index..." 
                              className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-xs font-bold outline-none focus:border-blue-500 transition-all text-white placeholder:text-white/10" 
                            />
                         </div>
                         <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-3">
                           {filteredKeys.length > 0 ? filteredKeys.map(k => (
                             <button 
                              key={k.key} 
                              onClick={() => loadEntry(k.key)} 
                              className={`w-full p-5 rounded-2xl border text-left transition-all flex items-center gap-5 ${activeEntryKey === k.key ? 'bg-white/10 border-blue-500/50 shadow-lg' : 'bg-white/[0.01] border-white/5 hover:bg-white/5'}`}
                             >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeEntryKey === k.key ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/20'}`}>
                                  <FileText size={16} />
                                </div>
                                <span className={`text-[11px] font-black truncate ${activeEntryKey === k.key ? 'text-white' : 'text-white/40'}`}>{k.key}</span>
                             </button>
                           )) : (
                             <div className="p-20 text-center opacity-10">
                               <Search size={48} className="mx-auto mb-6" />
                               <p className="text-[10px] font-black uppercase tracking-[0.4em] leading-loose">Awaiting Selection</p>
                             </div>
                           )}
                         </div>
                      </div>

                      {/* Live Editor */}
                      <div className="lg:col-span-5">
                         <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] overflow-hidden sticky top-4 shadow-2xl flex flex-col h-[680px]">
                            <div className="h-20 bg-white/[0.03] flex items-center justify-between px-10 border-b border-white/5 shrink-0">
                               <div className="flex items-center gap-4">
                                  <Braces size={20} className="text-blue-500" />
                                  <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Editor</span>
                                    <span className="text-[8px] font-bold text-white/20 uppercase truncate max-w-[150px]">{activeEntryKey || 'No file active'}</span>
                                  </div>
                               </div>
                               {activeEntryData && (
                                 <div className="flex gap-4">
                                    <button onClick={deleteEntry} className="p-3 text-white/20 hover:text-red-500 transition-colors rounded-xl hover:bg-red-500/5">
                                      <Trash2 size={18} />
                                    </button>
                                    <button onClick={saveEntry} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                      <Save size={14} /> Commit
                                    </button>
                                 </div>
                               )}
                            </div>
                            <div className="p-8 flex-grow overflow-hidden flex">
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
                                  className="w-full h-full bg-transparent text-emerald-400 font-mono text-[11px] leading-relaxed outline-none resize-none custom-scrollbar p-2"
                                 />
                               ) : (
                                 <div className="flex-grow flex flex-col items-center justify-center text-center opacity-10">
                                   <Code size={64} className="mb-8" />
                                   <p className="text-[10px] font-black uppercase tracking-[0.5em] max-w-[200px] leading-loose">Initialize cloud data entry for modification</p>
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.1); }
      `}</style>
    </div>
  );
}