"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Database, Gamepad2, Search, 
  Save, Trash2, ExternalLink, RefreshCw, 
  Menu, X, ChevronRight, FileCode, 
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
import { CreateKeyForm } from '@/components/admin/create-key-form';

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // DataStore State
  const [datastores, setDatastores] = useState<any[]>([]);
  const [selectedDS, setSelectedDS] = useState<string>("");
  const [dsKeys, setDsKeys] = useState<any[]>([]);
  const [searchKeyFilter, setSearchKeyFilter] = useState("");
  
  const [activeEntryKey, setActiveEntryKey] = useState<string>("");
  const [activeEntryData, setActiveEntryData] = useState<any>(null);
  const [entryError, setEntryError] = useState<string | null>(null);
  
  // UI State
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'datastores' | 'schemas'>('overview');
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }
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

  const handleKeyCreated = (keyName: string) => {
    // Atualiza a lista de chaves e carrega a nova chave
    fetchKeys(selectedDS);
    loadEntry(keyName);
  };

  const fetchKeys = async (dsName: string) => {
    setSelectedDS(dsName);
    setActiveEntryData(null);
    setActiveEntryKey("");
    setEntryError(null);
    const result = await callRobloxAPI('listKeys', { datastoreName: dsName });
    setDsKeys(result?.keys || []);
  };

  const loadEntry = async (key: string) => {
    setActiveEntryKey(key);
    setActiveEntryData(null);
    setEntryError(null);
    
    const result = await callRobloxAPI('getEntry', { datastoreName: selectedDS, entryKey: key });
    
    if (result) {
      setActiveEntryData(result);
      toast.success(`Key '${key}' loaded.`);
    } else {
      setEntryError(`Key '${key}' not found or access denied.`);
    }
  };

  const saveEntry = async () => {
    if (!activeEntryData || !activeEntryKey) return;
    const result = await callRobloxAPI('setEntry', { datastoreName: selectedDS, entryKey: activeEntryKey, value: activeEntryData });
    if (result) toast.success("Data pushed to Roblox Cloud");
  };

  const deleteEntry = async () => {
    if (!activeEntryKey || !selectedDS) return;
    if (!confirm("Confirm permanent deletion of this key?")) return;
    const result = await callRobloxAPI('deleteEntry', { datastoreName: selectedDS, entryKey: activeEntryKey });
    if (result) {
      toast.success("Entry deleted");
      setActiveEntryKey("");
      setActiveEntryData(null);
      setEntryError(null);
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
      <Loader2 className="animate-spin mr-2" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col lg:flex-row">
      <Toaster theme="dark" position="top-right" />

      {/* Modal de Criação de Key */}
      <CreateKeyForm 
        datastoreName={selectedDS}
        onKeyCreated={handleKeyCreated}
        callRobloxAPI={callRobloxAPI}
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
      />

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#111] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <img src="https://cdn.lostyo.com/logo.png" className="w-5 h-5" alt="L" />
            </div>
            <span>Lostyo Admin</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className={`flex-grow px-3 space-y-1 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <button 
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => { setActiveTab('datastores'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'datastores' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Database size={18} /> DataStores
          </button>
          <button 
            onClick={() => { setActiveTab('schemas'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${activeTab === 'schemas' ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Settings size={18} /> Schemas
          </button>
          
          <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-600 uppercase tracking-wider">Experiences</div>
          <div className="space-y-1 overflow-y-auto max-h-[300px] custom-scrollbar">
            {projects.map(p => (
              <button 
                key={p.id} 
                onClick={() => setSelectedProject(p)}
                className={`w-full text-left px-4 py-2 rounded-md text-xs truncate transition-colors ${selectedProject?.id === p.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'text-slate-500 hover:bg-white/5'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 bg-black/20 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <img src={profile?.avatar_url} className="w-8 h-8 rounded-full bg-white/10" alt="" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">{profile?.roblox_display_name}</span>
              <span className="text-[10px] text-slate-500 uppercase">Developer</span>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded border border-white/10 text-xs text-slate-400 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-grow flex flex-col min-h-0 bg-[#0a0a0a]">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-[#111]/30 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{selectedProject?.name} // Root Terminal</span>
          </div>
          <div className="flex items-center gap-4">
            {isSyncing && <Loader2 size={16} className="animate-spin text-slate-500" />}
            <button onClick={loadBaseData} className="p-2 text-slate-400 hover:text-white"><RefreshCw size={16} /></button>
          </div>
        </header>

        <div className="flex-grow p-6 lg:p-10 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedProject?.name}</h1>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> Universe {selectedProject?.id}</span>
                      <span>•</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-bold">{selectedProject?.status}</span>
                    </div>
                  </div>
                  <button onClick={() => window.open(`https://www.roblox.com/games/${selectedProject?.roblox_place_id}`, '_blank')} className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold text-xs rounded hover:bg-slate-200 transition-colors">
                    Open on Roblox <ExternalLink size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={Eye} label="Total Visits" value={gameDetails?.visits} color="text-blue-400" />
                  <StatCard icon={ThumbsUp} label="Likes" value={gameDetails?.votesUp} color="text-emerald-400" />
                  <StatCard icon={Star} label="Favorites" value={gameDetails?.favoritesCount} color="text-yellow-400" />
                  <StatCard icon={Clock} label="Created" value={gameDetails?.created ? new Date(gameDetails.created).toLocaleDateString() : 'N/A'} color="text-purple-400" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#111] border border-white/5 rounded-lg p-6 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><BookOpen size={18} className="text-blue-500" /> Engineering Notes</h3>
                        <button onClick={() => handleUpdateSettings({ notes: settings.notes })} disabled={isSavingSettings} className="text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest">{isSavingSettings ? 'Saving...' : 'Save Notes'}</button>
                      </div>
                      <textarea 
                        value={settings?.notes || ''}
                        onChange={(e) => setSettings({ ...settings, notes: e.target.value })}
                        className="w-full h-64 bg-black/20 border border-white/5 rounded-md p-4 text-sm text-slate-400 outline-none focus:border-blue-500/50 transition-colors resize-none font-mono"
                        placeholder="Project technical documentation, API keys, or pending tasks..."
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-[#111] border border-white/5 rounded-lg p-6">
                      <h3 className="text-sm font-bold text-white mb-4">Quick Actions</h3>
                      <div className="space-y-2">
                        <button onClick={() => selectedDS ? setIsCreateModalOpen(true) : toast.error("Please select a DataStore first.")} className="w-full py-3 bg-white text-black rounded-md text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"><Plus size={14} /> New Entry</button>
                        <button onClick={fetchGameDetails} className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-md text-xs font-bold hover:bg-white/10 transition-colors">Force Sync API</button>
                      </div>
                    </div>
                    <div className="bg-[#111] border border-white/5 rounded-lg p-6">
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
                  <button onClick={() => selectedDS ? setIsCreateModalOpen(true) : toast.error("Please select a DataStore first.")} className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors"><Plus size={14} /> Create Key</button>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
                  <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">1. Select DataStore</label>
                      <div className="bg-[#111] border border-white/5 rounded-md max-h-60 overflow-y-auto">
                        {datastores.map(ds => (
                          <button 
                            key={ds.name} 
                            onClick={() => fetchKeys(ds.name)}
                            className={`w-full text-left px-4 py-3 text-xs border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${selectedDS === ds.name ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-300'}`}
                          >
                            {ds.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 flex-grow flex flex-col">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">2. Select Key</label>
                      <div className="relative mb-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                        <input 
                          placeholder="Search keys..." 
                          value={searchKeyFilter}
                          onChange={e => setSearchKeyFilter(e.target.value)}
                          className="w-full h-10 bg-[#111] border border-white/5 rounded-md pl-10 pr-4 text-xs outline-none focus:border-blue-500/50"
                        />
                      </div>
                      <div className="bg-[#111] border border-white/5 rounded-md flex-grow overflow-y-auto max-h-[400px]">
                        {filteredKeys.length > 0 ? filteredKeys.map(k => (
                          <button 
                            key={k.key} 
                            onClick={() => loadEntry(k.key)}
                            className={`w-full text-left px-4 py-3 text-xs border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${activeEntryKey === k.key ? 'bg-white/5 text-white font-bold' : 'text-slate-400'}`}
                          >
                            {k.key}
                          </button>
                        )) : (
                          <div className="p-4 text-xs text-slate-600 italic">Select a DataStore first</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col border border-white/5 rounded-lg bg-[#0d0d0d] overflow-hidden">
                    <div className="h-14 bg-[#161616] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
                      <div className="flex items-center gap-2">
                        <FileCode size={16} className="text-blue-500" />
                        <span className="text-sm font-medium text-slate-400 truncate max-w-[200px]">
                          {activeEntryKey || 'No file selected'}
                        </span>
                      </div>
                      {activeEntryData && (
                        <div className="flex items-center gap-3">
                          <button onClick={deleteEntry} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                          <button 
                            onClick={saveEntry}
                            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-500 transition-colors"
                          >
                            <Save size={14} /> Commit Changes
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow relative">
                      {entryError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/10 text-red-400 p-8">
                          <AlertCircle size={32} className="mb-4" />
                          <p className="text-sm font-bold mb-2">Entry Not Found</p>
                          <p className="text-xs text-center">{entryError}</p>
                        </div>
                      ) : activeEntryData ? (
                        <textarea 
                          value={typeof activeEntryData === 'string' ? activeEntryData : JSON.stringify(activeEntryData, null, 2)}
                          onChange={e => {
                            try { setActiveEntryData(JSON.parse(e.target.value)); } 
                            catch { setActiveEntryData(e.target.value); }
                          }}
                          className="absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-xs text-emerald-400 outline-none resize-none custom-scrollbar"
                          spellCheck={false}
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 opacity-50">
                          <Gamepad2 size={48} className="mb-4" />
                          <p className="text-xs uppercase font-bold tracking-widest">Select a key to edit data</p>
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
                      <div key={ds.name} className="bg-[#111] border border-white/5 rounded-lg p-6 space-y-4">
                         <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white">{ds.name}</h3>
                            <button 
                              onClick={() => handleUpdateSettings({ 
                                schemas: { ...settings.schemas, [ds.name]: JSON.parse(document.getElementById(`schema-${ds.name}`)?.innerText || '{}') } 
                              })}
                              className="text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest"
                            >
                              Apply Schema
                            </button>
                         </div>
                         <div 
                          id={`schema-${ds.name}`}
                          contentEditable 
                          className="w-full min-h-[100px] bg-black/40 border border-white/5 rounded-md p-4 font-mono text-xs text-emerald-400 outline-none focus:border-blue-500/30"
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
  <div className="bg-[#111] border border-white/5 p-6 rounded-lg">
    <Icon className={`${color} mb-3`} size={20} />
    <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">{label}</div>
    <div className="text-2xl font-bold text-white">
      {typeof value === 'number' ? value.toLocaleString() : value || '0'}
    </div>
  </div>
);