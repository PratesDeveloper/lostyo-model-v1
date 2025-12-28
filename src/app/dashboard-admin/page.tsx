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
import { CreateDatastoreModal } from '@/components/admin/create-datastore-modal';
import { DataStoreExplorer } from '@/components/admin/datastore-explorer';

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // UI State
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'datastores' | 'schemas'>('overview');
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isCreateDSModalOpen, setIsCreateDSModalOpen] = useState(false);

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
    }
  }, [selectedProject]);

  const fetchGameDetails = async () => {
    if (!selectedProject?.id) return;
    const data = await fetch(`/api/proxy/games?ids=${selectedProject.id}`).then(res => res.json());
    if (data.data?.[0]) setGameDetails(data.data[0]);
  };

  const handleDatastoreCreated = () => {
    // Força o recarregamento da lista de DataStores no explorer
    // O DataStoreExplorer fará o fetchKeys internamente
    if (selectedProject) {
      // Força a re-renderização do DataStoreExplorer para buscar a nova lista
      setActiveTab('overview'); 
      setTimeout(() => setActiveTab('datastores'), 10);
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

  if (isLoading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/50">
      <Loader2 className="animate-spin mr-2" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col lg:flex-row">
      <Toaster theme="dark" position="top-right" />

      {/* Modal de Criação de DataStore */}
      <CreateDatastoreModal
        isOpen={isCreateDSModalOpen}
        setIsOpen={setIsCreateDSModalOpen}
        onDatastoreCreated={handleDatastoreCreated}
        callRobloxAPI={callRobloxAPI}
        updateSettings={handleUpdateSettings}
        currentSettings={settings}
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
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
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
                        <button onClick={() => setIsCreateDSModalOpen(true)} className="w-full py-3 bg-blue-600 text-white rounded-md text-xs font-bold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"><Database size={14} /> New DataStore</button>
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

            {activeTab === 'datastores' && selectedProject && settings && (
              <DataStoreExplorer 
                selectedProject={selectedProject}
                settings={settings}
                callRobloxAPI={callRobloxAPI}
                isSyncing={isSyncing}
                setIsCreateModalOpen={setIsCreateDSModalOpen}
                isCreateModalOpen={isCreateDSModalOpen}
              />
            )}

            {activeTab === 'schemas' && (
              <motion.div key="schemas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8">
                 <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Data Consistency Schemas</h2>
                    <p className="text-sm text-slate-500">Define a JSON structure for each DataStore. New keys will be initialized with this template.</p>
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {/* Usando o settings.schemas para renderizar os schemas salvos */}
                    {Object.keys(settings?.schemas || {}).map(dsName => (
                      <div key={dsName} className="bg-[#111] border border-white/5 rounded-lg p-6 space-y-4">
                         <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white">{dsName}</h3>
                            <button 
                              onClick={() => handleUpdateSettings({ 
                                schemas: { ...settings.schemas, [dsName]: JSON.parse(document.getElementById(`schema-${dsName}`)?.innerText || '{}') } 
                              })}
                              className="text-xs font-bold text-blue-500 hover:text-blue-400 uppercase tracking-widest"
                            >
                              Apply Schema
                            </button>
                         </div>
                         <div 
                          id={`schema-${dsName}`}
                          contentEditable 
                          className="w-full min-h-[100px] bg-black/40 border border-white/5 rounded-md p-4 font-mono text-xs text-emerald-400 outline-none focus:border-blue-500/30"
                         >
                           {JSON.stringify(settings?.schemas?.[dsName] || {}, null, 2)}
                         </div>
                      </div>
                    ))}
                    
                    {/* Renderiza DataStores sem schema salvo */}
                    {/* Nota: Para simplificar, vamos renderizar apenas os que têm schema salvo ou usar o DataStoreExplorer para listar todos. */}
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