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
import { CreateDatastoreModal } from '@/components/admin/create-datastore-modal';
import { DataStoreExplorer } from '@/components/admin/datastore-explorer';

// Cores customizadas para o tema
const BG_MAIN = 'bg-gray-900'; // Fundo escuro para contraste
const CARD_BG = 'bg-gray-700'; // rgb(164, 163, 166) simulado em dark mode
const HIGHLIGHT = 'bg-blue-500'; // rgb(59, 130, 246)

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
    if (selectedProject) {
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
    <div className={`min-h-screen ${BG_MAIN} flex items-center justify-center text-white/50`}>
      <Loader2 className="animate-spin mr-2" size={32} />
    </div>
  );

  return (
    <div className={`min-h-screen ${BG_MAIN} text-white flex flex-col lg:flex-row`}>
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
      <aside className={`w-full lg:w-64 ${CARD_BG} border-r border-gray-600 flex flex-col shrink-0`}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="font-bold text-white flex items-center gap-2">
            <div className={`w-8 h-8 ${HIGHLIGHT} rounded-xl flex items-center justify-center`}>
              <img src="https://cdn.lostyo.com/logo.png" className="w-5 h-5" alt="L" />
            </div>
            <span>Lostyo Admin</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg bg-gray-600">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <nav className={`flex-grow px-3 space-y-1 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <button 
            onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'overview' ? `${HIGHLIGHT} text-white` : 'text-gray-300 hover:bg-gray-600'}`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            onClick={() => { setActiveTab('datastores'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'datastores' ? `${HIGHLIGHT} text-white` : 'text-gray-300 hover:bg-gray-600'}`}
          >
            <Database size={18} /> DataStores
          </button>
          <button 
            onClick={() => { setActiveTab('schemas'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'schemas' ? `${HIGHLIGHT} text-white` : 'text-gray-300 hover:bg-gray-600'}`}
          >
            <Settings size={18} /> Schemas
          </button>
          
          <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Experiences</div>
          <div className="space-y-1 overflow-y-auto max-h-[300px] custom-scrollbar">
            {projects.map(p => (
              <button 
                key={p.id} 
                onClick={() => setSelectedProject(p)}
                className={`w-full text-left px-4 py-2 rounded-lg text-xs truncate transition-colors ${selectedProject?.id === p.id ? 'bg-blue-600/30 text-white font-bold' : 'text-gray-400 hover:bg-gray-600'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 bg-gray-800 border-t border-gray-600">
          <div className="flex items-center gap-3 mb-4">
            <img src={profile?.avatar_url} className="w-8 h-8 rounded-full bg-gray-600" alt="" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">{profile?.roblox_display_name}</span>
              <span className="text-[10px] text-gray-400 uppercase">Developer</span>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-600 text-gray-400 hover:bg-red-600 hover:text-white transition-all"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className={`flex-grow flex flex-col min-h-0 ${BG_MAIN}`}>
        <header className={`h-16 border-b border-gray-600 px-8 flex items-center justify-between ${CARD_BG} sticky top-0 z-10`}>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{selectedProject?.name} // Terminal</span>
          </div>
          <div className="flex items-center gap-4">
            {isSyncing && <Loader2 size={16} className="animate-spin text-gray-400" />}
            <button onClick={loadBaseData} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-600"><RefreshCw size={16} /></button>
          </div>
        </header>

        <div className="flex-grow p-6 lg:p-10 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-600 pb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedProject?.name}</h1>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> Universe {selectedProject?.id}</span>
                      <span>•</span>
                      <span className="bg-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">{selectedProject?.status}</span>
                    </div>
                  </div>
                  <button onClick={() => window.open(`https://www.roblox.com/games/${selectedProject?.roblox_place_id}`, '_blank')} className={`flex items-center gap-2 px-4 py-2 ${HIGHLIGHT} text-white font-bold text-xs rounded-xl hover:bg-blue-600 transition-colors`}>
                    Open on Roblox <ExternalLink size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard icon={Eye} label="Total Visits" value={gameDetails?.visits} color="text-blue-400" cardBg={CARD_BG} />
                  <StatCard icon={ThumbsUp} label="Likes" value={gameDetails?.votesUp} color="text-emerald-400" cardBg={CARD_BG} />
                  <StatCard icon={Star} label="Favorites" value={gameDetails?.favoritesCount} color="text-yellow-400" cardBg={CARD_BG} />
                  <StatCard icon={Clock} label="Created" value={gameDetails?.created ? new Date(gameDetails.created).toLocaleDateString() : 'N/A'} color="text-purple-400" cardBg={CARD_BG} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className={`${CARD_BG} border border-gray-600 rounded-xl p-6 space-y-6`}>
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2"><BookOpen size={18} className="text-blue-400" /> Engineering Notes</h3>
                        <button onClick={() => handleUpdateSettings({ notes: settings.notes })} disabled={isSavingSettings} className="text-xs font-bold text-blue-400 hover:text-blue-300">{isSavingSettings ? 'Saving...' : 'Save Notes'}</button>
                      </div>
                      <textarea 
                        value={settings?.notes || ''}
                        onChange={(e) => setSettings({ ...settings, notes: e.target.value })}
                        className="w-full h-64 bg-gray-800 border border-gray-600 rounded-lg p-4 text-sm text-gray-300 outline-none focus:border-blue-500 transition-colors resize-none font-mono"
                        placeholder="Project technical documentation, API keys, or pending tasks..."
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className={`${CARD_BG} border border-gray-600 rounded-xl p-6`}>
                      <h3 className="text-sm font-bold text-white mb-4">Quick Actions</h3>
                      <div className="space-y-2">
                        <button onClick={() => setIsCreateDSModalOpen(true)} className={`w-full py-3 ${HIGHLIGHT} text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2`}><Database size={14} /> New DataStore</button>
                        <button onClick={fetchGameDetails} className="w-full py-3 bg-gray-600 border border-gray-500 text-white rounded-lg text-xs font-bold hover:bg-gray-500 transition-colors">Force Sync API</button>
                      </div>
                    </div>
                    <div className={`${CARD_BG} border border-gray-600 rounded-xl p-6`}>
                      <h3 className="text-sm font-bold text-white mb-4">System Info</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center"><span className="text-[10px] text-gray-400 uppercase">Last Build</span><span className="text-xs text-white">Stable</span></div>
                        <div className="flex justify-between items-center"><span className="text-[10px] text-gray-400 uppercase">Cloud Sync</span><span className="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Live</span></div>
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
                    <p className="text-sm text-gray-400">Define a JSON structure for each DataStore. New keys will be initialized with this template.</p>
                 </div>

                 <div className="grid grid-cols-1 gap-6">
                    {Object.keys(settings?.schemas || {}).map(dsName => (
                      <div key={dsName} className={`${CARD_BG} border border-gray-600 rounded-xl p-6 space-y-4`}>
                         <div className="flex items-center justify-between">
                            <h3 className="font-bold text-white">{dsName}</h3>
                            <button 
                              onClick={() => handleUpdateSettings({ 
                                schemas: { ...settings.schemas, [dsName]: JSON.parse(document.getElementById(`schema-${dsName}`)?.innerText || '{}') } 
                              })}
                              className="text-xs font-bold text-blue-400 hover:text-blue-300"
                            >
                              Apply Schema
                            </button>
                         </div>
                         <div 
                          id={`schema-${dsName}`}
                          contentEditable 
                          className="w-full min-h-[100px] bg-gray-800 border border-gray-600 rounded-lg p-4 font-mono text-xs text-emerald-400 outline-none focus:border-blue-500"
                         >
                           {JSON.stringify(settings?.schemas?.[dsName] || {}, null, 2)}
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

const StatCard = ({ icon: Icon, label, value, color, cardBg }: any) => (
  <div className={`${cardBg} border border-gray-600 p-6 rounded-xl`}>
    <Icon className={`${color} mb-3`} size={20} />
    <div className="text-[10px] text-gray-400 uppercase font-bold mb-1">{label}</div>
    <div className="text-2xl font-bold text-white">
      {typeof value === 'number' ? value.toLocaleString() : value || '0'}
    </div>
  </div>
);