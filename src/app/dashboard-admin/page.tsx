"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Database, Gamepad2, Search, 
  Save, Trash2, ExternalLink, RefreshCw, 
  Menu, X, ChevronRight, FileCode, Users, 
  Eye, ThumbsUp, Star, Clock, LogOut, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  
  const [datastores, setDatastores] = useState<any[]>([]);
  const [selectedDS, setSelectedDS] = useState<string>("");
  const [dsKeys, setDsKeys] = useState<any[]>([]);
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
    if (result) toast.success("Data saved successfully");
  };

  const deleteEntry = async () => {
    if (!activeEntryKey || !selectedDS) return;
    if (!confirm("Confirm permanent deletion of this key?")) return;
    const result = await callRobloxAPI('deleteEntry', { datastoreName: selectedDS, entryKey: activeEntryKey });
    if (result) {
      toast.success("Entry deleted");
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

  const filteredKeys = dsKeys.filter(k => k.key.toLowerCase().includes(searchKeyFilter.toLowerCase()));

  if (isLoading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/50">
      <RefreshCw className="animate-spin mr-2" size={20} />
      <span>Loading dashboard...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col lg:flex-row">
      <Toaster theme="dark" position="top-right" />

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
          
          <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Experiences</div>
          <div className="space-y-1 overflow-y-auto max-h-[300px] custom-scrollbar">
            {projects.map(p => (
              <button 
                key={p.id} 
                onClick={() => setSelectedProject(p)}
                className={`w-full text-left px-4 py-2 rounded-md text-xs truncate transition-colors ${selectedProject?.id === p.id ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-white/5'}`}
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

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-h-0 bg-[#0a0a0a]">
        {/* Simple Header */}
        <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-[#111]/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-xs font-medium text-slate-400">
              {selectedProject?.name || 'Select Experience'}
            </span>
          </div>
          <button onClick={loadBaseData} className="p-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
          </button>
        </header>

        <div className="flex-grow p-6 lg:p-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedProject?.name}</h1>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Universe ID: {selectedProject?.id}</span>
                      <span>•</span>
                      <span>Status: {selectedProject?.status}</span>
                    </div>
                  </div>
                  <a 
                    href={`https://www.roblox.com/games/${selectedProject?.roblox_place_id}`} 
                    target="_blank" 
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold text-xs rounded hover:bg-slate-200 transition-colors"
                  >
                    Open on Roblox <ExternalLink size={14} />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={Eye} label="Visits" value={gameDetails?.visits} color="text-blue-400" />
                  <StatCard icon={ThumbsUp} label="Likes" value={gameDetails?.votesUp} color="text-emerald-400" />
                  <StatCard icon={Star} label="Favorites" value={gameDetails?.favoritesCount} color="text-yellow-400" />
                  <StatCard icon={Clock} label="Created" value={gameDetails?.created ? new Date(gameDetails.created).toLocaleDateString() : 'N/A'} color="text-purple-400" />
                </div>

                <div className="bg-[#111] border border-white/5 rounded-lg p-6">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" /> System Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase">Cloud Link</div>
                      <div className="text-xs text-white">Authenticated via OAuth 2.0</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase">Encryption</div>
                      <div className="text-xs text-white">AES-256 Bit SSL</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase">Permissions</div>
                      <div className="text-xs text-white">Full Administrator Access</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'datastores' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                <div className="flex flex-col md:flex-row gap-6 h-full">
                  {/* List Columns */}
                  <div className="w-full md:w-80 flex flex-col gap-6 shrink-0">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">1. Select DataStore</label>
                      <div className="bg-[#111] border border-white/5 rounded-md max-h-60 overflow-y-auto">
                        {datastores.length > 0 ? datastores.map(ds => (
                          <button 
                            key={ds.name} 
                            onClick={() => fetchKeys(ds.name)}
                            className={`w-full text-left px-4 py-3 text-xs border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${selectedDS === ds.name ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-300'}`}
                          >
                            {ds.name}
                          </button>
                        )) : (
                          <div className="p-4 text-xs text-slate-600 italic">No DataStores found</div>
                        )}
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
                          className="w-full h-10 bg-[#111] border border-white/5 rounded-md pl-10 pr-4 text-xs outline-none focus:border-blue-500 transition-colors"
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

                  {/* Editor Area */}
                  <div className="flex-grow flex flex-col min-h-[500px] border border-white/5 rounded-lg bg-[#0d0d0d] overflow-hidden">
                    <div className="h-12 bg-[#161616] border-b border-white/5 flex items-center justify-between px-6">
                      <div className="flex items-center gap-2">
                        <FileCode size={14} className="text-blue-500" />
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[150px]">
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
                            className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-[11px] font-bold rounded hover:bg-blue-500 transition-colors"
                          >
                            <Save size={14} /> Commit Changes
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="flex-grow relative">
                      {activeEntryData ? (
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