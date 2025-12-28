"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Database, Gamepad2, Search, 
  Save, Trash2, ExternalLink, RefreshCw, 
  Menu, X, ChevronRight, FileCode, Users, 
  Eye, ThumbsUp, Star, Clock, LogOut, ShieldCheck,
  Plus, Settings, BookOpen, AlertCircle, CheckCircle2,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProfileByRobloxId, getProjectSettings, updateProjectSettings } from '@/app/actions/profile';
import { toast, Toaster } from 'sonner';

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // DataStore State
  const [datastores, setDatastores] = useState<any[]>([]);
  const [selectedDS, setSelectedDS] = useState<string>("");
  const [dsKeys, setDsKeys] = useState<any[]>([]);
  const [searchKeyFilter, setSearchKeyFilter] = useState("");
  const [activeEntryKey, setActiveEntryKey] = useState<string>("");
  const [activeEntryData, setActiveEntryData] = useState<any>(null);
  
  // UI State
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'datastores' | 'schemas'>('overview');
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

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
      if (!response.ok) throw new Error(data.error || "Request failed");
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
    if (profileData?.is_developer) {
      setProfile(profileData);
      const result = await callRobloxAPI('listUserUniverses');
      if (result?.universes) {
        setProjects(result.universes);
        if (result.universes.length > 0) setSelectedProject(result.universes[0]);
      }
    } else {
      router.replace('/');
    }
    setIsLoading(false);
  };

  useEffect(() => { loadBaseData(); }, []);

  // Carrega configurações do Supabase quando o projeto muda
  useEffect(() => {
    if (selectedProject) {
      getProjectSettings(selectedProject.id).then(setSettings);
      fetchGameDetails();
      if (activeTab === 'datastores') fetchDatastores();
    }
  }, [selectedProject]);

  const fetchGameDetails = async () => {
    if (!selectedProject?.id) return;
    const data = await fetch(`/api/proxy/games?ids=${selectedProject.id}`).then(res => res.json());
    if (data.data?.[0]) setGameDetails(data.data[0]);
  };

  const fetchDatastores = async () => {
    const result = await callRobloxAPI('listDataStores');
    if (result?.datastores) setDatastores(result.datastores);
  };

  const fetchKeys = async (dsName: string) => {
    setSelectedDS(dsName);
    setActiveEntryData(null);
    setActiveEntryKey("");
    const result = await callRobloxAPI('listKeys', { datastoreName: dsName });
    setDsKeys(result?.keys || []);
  };

  const loadEntry = async (key: string) => {
    setActiveEntryKey(key);
    const result = await callRobloxAPI('getEntry', { datastoreName: selectedDS, entryKey: key });
    if (result) setActiveEntryData(result);
  };

  const saveEntry = async () => {
    if (!activeEntryData || !activeEntryKey) return;
    const result = await callRobloxAPI('setEntry', { datastoreName: selectedDS, entryKey: activeEntryKey, value: activeEntryData });
    if (result) toast.success("Data pushed to Roblox Cloud");
  };

  const deleteEntry = async () => {
    if (!activeEntryKey || !selectedDS) return;
    if (!confirm("Are you sure you want to delete this key?")) return;
    const result = await callRobloxAPI('deleteEntry', { datastoreName: selectedDS, entryKey: activeEntryKey });
    if (result) {
      toast.success("Entry deleted");
      setActiveEntryKey("");
      setActiveEntryData(null);
      fetchKeys(selectedDS);
    }
  };

  const createNewKey = async () => {
    const keyName = prompt("Enter new Key name:");
    if (!keyName || !selectedDS) return;
    const initialData = settings?.schemas?.[selectedDS] || {};
    const result = await callRobloxAPI('setEntry', { datastoreName: selectedDS, entryKey: keyName, value: initialData });
    if (result) {
      toast.success("New key created");
      fetchKeys(selectedDS);
    }
  };

  const handleUpdateSettings = async (updates: any) => {
    setIsSavingSettings(true);
    try {
      await updateProjectSettings(selectedProject.id, updates);
      setSettings({ ...settings, ...updates });
      toast.success("Project settings updated");
    } catch (e) {
      toast.error("Failed to save settings");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const filteredKeys = dsKeys.filter(k => k.key.toLowerCase().includes(searchKeyFilter.toLowerCase()));

  if (isLoading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/50">
      <RefreshCw className="animate-spin mr-2" size={20} />
      <span>Booting Terminal...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col lg:flex-row">
      <Toaster theme="dark" position="top-right" />

      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-[#111] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6">
          <Link href="/" className="font-bold text-white flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg"><img src="https://cdn.lostyo.com/logo.png" className="w-5 h-5" alt="L" /></div>
            <span className="tracking-tight">Lostyo Admin</span>
          </Link>

          <nav className="space-y-1">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}><LayoutDashboard size={18} /> Overview</button>
            <button onClick={() => setActiveTab('datastores')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'datastores' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}><Database size={18} /> DataStores</button>
            <button onClick={() => setActiveTab('schemas')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === 'schemas' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'}`}><Settings size={18} /> Schemas</button>
          </nav>
          
          <div className="mt-8 mb-2 px-4 text-[10px] font-bold text-slate-600 uppercase">Universes</div>
          <div className="space-y-1 overflow-y-auto max-h-[300px] custom-scrollbar">
            {projects.map(p => (
              <button key={p.id} onClick={() => setSelectedProject(p)} className={`w-full text-left px-4 py-2 rounded-md text-xs truncate transition-colors ${selectedProject?.id === p.id ? 'bg-blue-600/20 text-blue-400' : 'text-slate-500 hover:bg-white/5'}`}>{p.name}</button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 bg-black/20 border-t border-white/5 flex items-center gap-3">
          <img src={profile?.avatar_url} className="w-8 h-8 rounded-full" alt="" />
          <div className="flex flex-col min-w-0 flex-grow">
            <span className="text-xs font-bold text-white truncate">{profile?.roblox_display_name}</span>
            <span className="text-[10px] text-slate-500">Developer</span>
          </div>
          <button onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }} className="p-2 text-slate-500 hover:text-red-500"><LogOut size={16} /></button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-grow flex flex-col min-h-0 bg-[#0a0a0a]">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#111]/30 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{selectedProject?.name} // Root Terminal</span>
          </div>
          <div className="flex items-center gap-4">
            {isSyncing && <Loader2 size={16} className="animate-spin text-slate-500" />}
            <button onClick={loadBaseData} className="p-2 text-slate-400 hover:text-white"><RefreshCw size={16} /></button>
          </div>
        </header>

        <div className="flex-grow p-8 lg:p-12 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-10">
                <div className="flex justify-between items-center border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{selectedProject?.name}</h1>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> Universe {selectedProject?.id}</span>
                      <span>•</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold">{selectedProject?.status}</span>
                    </div>
                  </div>
                  <button onClick={() => window.open(`https://www.roblox.com/games/${selectedProject?.roblox_place_id}`, '_blank')} className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-xs rounded-full hover:scale-105 transition-transform"><ExternalLink size={14} /> Open Roblox</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={Eye} label="Total Visits" value={gameDetails?.visits} color="text-blue-400" />
                  <StatCard icon={ThumbsUp} label="Likes" value={gameDetails?.votesUp} color="text-emerald-400" />
                  <StatCard icon={Star} label="Favorites" value={gameDetails?.favoritesCount} color="text-yellow-400" />
                  <StatCard icon={Clock} label="Launch Date" value={gameDetails?.created ? new Date(gameDetails.created).toLocaleDateString() : 'N/A'} color="text-slate-400" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><BookOpen size={18} className="text-blue-500" /> Engineering Notes</h3>
                        <button onClick={() => handleUpdateSettings({ notes: settings.notes })} disabled={isSavingSettings} className="text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest">{isSavingSettings ? 'Saving...' : 'Save Notes'}</button>
                      </div>
                      <textarea 
                        value={settings?.notes || ''}
                        onChange={(e) => setSettings({ ...settings, notes: e.target.value })}
                        className="w-full h-64 bg-black/20 border border-white/5 rounded-xl p-4 text-sm text-slate-400 outline-none focus:border-blue-500/50 transition-colors resize-none font-mono"
                        placeholder="Project technical documentation, API keys, or pending tasks..."
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 rounded-2xl p-8">
                      <h3 className="text-sm font-bold text-white mb-4">Quick Actions</h3>
                      <div className="space-y-2">
                        <button onClick={() => setActiveTab('datastores')} className="w-full py-3 bg-white text-black rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"><Plus size={14} /> New Entry</button>
                        <button onClick={fetchGameDetails} className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-lg text-xs font-bold hover:bg-white/10 transition-colors">Force Sync API</button>
                      </div>
                    </div>
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
                      <h3 className="text-sm font-bold text-white mb-4">System Info</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center"><span className="text-[10px] text-slate-500 uppercase">Last Build</span><span className="text-xs text-white">Stable</span></div>
                        <div className="flex justify-between items-center"><span className="text-[10px] text-slate-500 uppercase">Cloud Sync</span><span className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Live</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'datastores' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-white">Cloud Data Explorer</h2>
                  <button onClick={createNewKey} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors"><Plus size={14} /> Create Key</button>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8 h-full min-h-[600px]">
                  <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0">
                    <div className="bg-[#111] border border-white/5 rounded-xl flex-grow overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-white/5 bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">1. DataStore Cluster</div>
                      <div className="overflow-y-auto custom-scrollbar">
                        {datastores.map(ds => (
                          <button key={ds.name} onClick={() => fetchKeys(ds.name)} className={`w-full text-left px-5 py-4 text-xs transition-colors border-b border-white/5 last:border-0 ${selectedDS === ds.name ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5'}`}>{ds.name}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0">
                    <div className="bg-[#111] border border-white/5 rounded-xl flex-grow overflow-hidden flex flex-col">
                      <div className="p-4 border-b border-white/5 bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">2. Registry Keys</div>
                      <div className="p-4 bg-black/20 border-b border-white/5"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} /><input placeholder="Filter keys..." value={searchKeyFilter} onChange={e => setSearchKeyFilter(e.target.value)} className="w-full bg-[#111] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs outline-none focus:border-blue-500/50" /></div></div>
                      <div className="overflow-y-auto custom-scrollbar">
                        {filteredKeys.map((k: any) => (
                          <button key={k.key} onClick={() => loadEntry(k.key)} className={`w-full text-left px-5 py-4 text-xs transition-all border-b border-white/5 last:border-0 ${activeEntryKey === k.key ? 'bg-white/5 text-blue-400 font-bold pl-7' : 'text-slate-500 hover:bg-white/5'}`}>{k.key}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
                    <div className="h-14 border-b border-white/5 px-6 flex items-center justify-between bg-[#161616]">
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-400"><FileCode size={16} className="text-blue-500" /> {activeEntryKey || 'Idle'}</div>
                      {activeEntryData && (
                        <div className="flex items-center gap-2">
                          <button onClick={deleteEntry} className="p-2 text-slate-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          <button onClick={saveEntry} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-500 transition-colors"><Save size={14} /> Commit Changes</button>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow relative">
                      {activeEntryData ? (
                        <textarea 
                          value={typeof activeEntryData === 'string' ? activeEntryData : JSON.stringify(activeEntryData, null, 2)}
                          onChange={e => { try { setActiveEntryData(JSON.parse(e.target.value)); } catch { setActiveEntryData(e.target.value); } }}
                          className="absolute inset-0 w-full h-full bg-transparent p-8 font-mono text-[13px] text-emerald-400 outline-none resize-none custom-scrollbar leading-relaxed"
                          spellCheck={false}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600/30 select-none">
                          <Gamepad2 size={64} className="mb-4" />
                          <p className="text-xs font-bold uppercase tracking-widest">Select an entry to begin orchestration</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'schemas' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8">
                 <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Data Consistency Schemas</h2>
                    <p className="text-sm text-slate-500">Define a JSON structure for each DataStore. New keys will be initialized with this template.</p>
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {datastores.map(ds => (
                      <div key={ds.name} className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-4">
                         <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white">{ds.name}</h3>
                            <button 
                              onClick={() => handleUpdateSettings({ 
                                schemas: { ...settings.schemas, [ds.name]: JSON.parse(document.getElementById(`schema-${ds.name}`)?.innerText || '{}') } 
                              })}
                              className="text-xs font-bold text-blue-500 uppercase tracking-widest hover:text-blue-400"
                            >
                              Apply Schema
                            </button>
                         </div>
                         <div 
                          id={`schema-${ds.name}`}
                          contentEditable 
                          className="w-full min-h-[100px] bg-black/40 border border-white/5 rounded-xl p-6 font-mono text-xs text-emerald-500/70 outline-none focus:border-blue-500/30"
                         >
                           {JSON.stringify(settings?.schemas?.[ds.name] || {}, null, 2)}
                         </div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
}

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-[#111] border border-white/5 p-8 rounded-2xl group hover:border-white/10 transition-colors">
    <Icon className={`${color} mb-4 group-hover:scale-110 transition-transform`} size={20} />
    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{label}</div>
    <div className="text-3xl font-bold text-white">
      {typeof value === 'number' ? value.toLocaleString() : value || '0'}
    </div>
  </div>
);