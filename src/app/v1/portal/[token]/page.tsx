"use client";

import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Database, Gamepad2, Search, 
  Save, Trash2, ExternalLink, RefreshCw, 
  Menu, X, ChevronRight, FileCode, Users, 
  Eye, ThumbsUp, Star, Clock, LogOut, ShieldCheck,
  Plus, Settings, BookOpen, AlertCircle, CheckCircle2,
  Loader2, TrendingUp, Cpu, Terminal, Binary
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { getProfileByRobloxId, getProjectSettings, updateProjectSettings } from '@/app/actions/profile';
import { toast, Toaster } from 'sonner';
import { CreateDatastoreModal } from '@/components/admin/create-datastore-modal';
import { DataStoreExplorer } from '@/components/admin/datastore-explorer';
import { PlayerIntel } from '@/components/admin/player-intel';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: '00:00', active: 1200, latency: 45 },
  { name: '04:00', active: 800, latency: 42 },
  { name: '08:00', active: 1500, latency: 48 },
  { name: '12:00', active: 3200, latency: 55 },
  { name: '16:00', active: 4500, latency: 60 },
  { name: '20:00', active: 3800, latency: 52 },
  { name: '23:59', active: 2100, latency: 47 },
];

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'datastores' | 'players' | 'schemas'>('overview');
  const [gameDetails, setGameDetails] = useState<any>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isCreateDSModalOpen, setIsCreateDSModalOpen] = useState(false);
  const [jumpUserId, setJumpUserId] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();

  const callRobloxAPI = async (action: string, paramsObj: any = {}) => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/admin/roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, universeId: selectedProject?.id, ...paramsObj })
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
    const adminToken = Cookies.get('lostyo_admin_token');

    if (!robloxId || logged !== 'true' || adminToken !== params.token) {
      router.replace('/v1/access');
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

  const handleUpdateSettings = async (updates: any) => {
    setIsSavingSettings(true);
    try {
      await updateProjectSettings(selectedProject.id, updates);
      setSettings({ ...settings, ...updates });
      toast.success("Settings synchronized with cloud.");
    } catch (e) {
      toast.error("Failed to sync settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-blue-500 font-mono">
      <Loader2 className="animate-spin mb-4" size={48} />
      <span className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Initializing Lostyo OS</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-slate-200 flex flex-col lg:flex-row font-mono">
      <Toaster theme="dark" position="top-right" />

      <CreateDatastoreModal
        isOpen={isCreateDSModalOpen}
        setIsOpen={setIsCreateDSModalOpen}
        onDatastoreCreated={() => { setActiveTab('overview'); setTimeout(() => setActiveTab('datastores'), 50); }}
        callRobloxAPI={callRobloxAPI}
        updateSettings={handleUpdateSettings}
        currentSettings={settings}
      />

      {/* Sidebar de Tecnologia */}
      <aside className="w-full lg:w-72 bg-[#08080A] border-r border-white/5 flex flex-col shrink-0 relative z-20">
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-all">
              <Binary size={20} className="text-blue-500" />
            </div>
            <div>
              <span className="text-xs font-black text-white uppercase tracking-tighter block">Lostyo Core</span>
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Control Panel v4.2</span>
            </div>
          </Link>
        </div>

        <nav className={`flex-grow p-4 space-y-1 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="px-4 py-3 text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">Main Protocol</div>
          <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={LayoutDashboard} label="Overview" />
          <NavButton active={activeTab === 'datastores'} onClick={() => setActiveTab('datastores')} icon={Database} label="Data Management" />
          <NavButton active={activeTab === 'players'} onClick={() => setActiveTab('players')} icon={Users} label="Player Intel" />
          <NavButton active={activeTab === 'schemas'} onClick={() => setActiveTab('schemas')} icon={Binary} label="Cloud Schemas" />
          
          <div className="pt-8 px-4 py-3 text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">Project Clusters</div>
          <div className="space-y-1 overflow-y-auto max-h-[250px] custom-scrollbar px-2">
            {projects.map(p => (
              <button 
                key={p.id} 
                onClick={() => setSelectedProject(p)} 
                className={`w-full text-left px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${selectedProject?.id === p.id ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-white/20 hover:text-white/40'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-6 bg-white/[0.01] border-t border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img src={profile?.avatar_url} className="w-10 h-10 rounded-xl bg-white/5 grayscale hover:grayscale-0 transition-all cursor-pointer" alt="" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#08080A]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-black text-white truncate block">{profile?.roblox_display_name}</span>
              <span className="text-[8px] text-blue-500 uppercase font-black tracking-widest">Root Authority</span>
            </div>
          </div>
          <button 
            onClick={() => { Cookies.remove('lostyo_roblox_logged'); Cookies.remove('lostyo_admin_token'); window.location.href = '/'; }} 
            className="w-full h-12 flex items-center justify-center gap-3 bg-red-500/5 hover:bg-red-500/10 text-red-400/60 hover:text-red-500 border border-red-500/10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
          >
            <LogOut size={14} /> Terminate Session
          </button>
        </div>
      </aside>

      {/* Main OS Area */}
      <main className="flex-grow flex flex-col min-h-0 bg-[#030303] relative">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/[0.02] blur-[150px] pointer-events-none" />
        
        <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-black/40 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <div className={`w-1.5 h-1.5 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">System Operational</span>
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{selectedProject?.name} // Node {selectedProject?.id}</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Server Latency</span>
                <span className="text-xs font-mono text-emerald-500">14.2ms</span>
             </div>
             <button onClick={loadBaseData} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 transition-all">
                <RefreshCw size={18} />
             </button>
          </div>
        </header>

        <div className="flex-grow p-8 lg:p-12 overflow-y-auto custom-scrollbar relative z-10">
          <AnimatePresence mode="wait">
            
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-12 pb-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                  <div className="space-y-4">
                    <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">{selectedProject?.name}</h1>
                    <p className="text-white/30 text-lg font-medium max-w-2xl leading-relaxed">
                      Connected to production universe. Analyzing live telemetry and cloud data clusters.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => window.open(`https://www.roblox.com/games/${selectedProject?.roblox_place_id}`, '_blank')} className="h-16 px-10 bg-white text-black rounded-3xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-white/5">
                      Launch Console <ExternalLink size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard icon={Eye} label="Network Ingress" value={gameDetails?.visits} color="text-blue-500" />
                  <StatCard icon={ThumbsUp} label="Approval Rating" value={gameDetails?.votesUp} color="text-emerald-500" />
                  <StatCard icon={Star} label="Star Density" value={gameDetails?.favoritesCount} color="text-yellow-500" />
                  <StatCard icon={TrendingUp} label="Live Concurrent" value={gameDetails?.playing || "0"} color="text-purple-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#08080A] border border-white/5 rounded-[3rem] p-10">
                      <div className="flex items-center justify-between mb-12">
                        <div>
                          <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                            <TrendingUp size={20} className="text-emerald-500" /> Concurrent Activity
                          </h3>
                          <p className="text-[10px] text-white/20 font-bold uppercase mt-1">24h Performance Map</p>
                        </div>
                        <div className="flex gap-4">
                           <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-widest">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Active Players
                           </div>
                        </div>
                      </div>
                      <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                            <XAxis dataKey="name" stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#ffffff10" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#08080A', border: '1px solid #ffffff05', borderRadius: '16px' }}
                              itemStyle={{ fontSize: '12px', color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="active" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" strokeWidth={3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-[#08080A] border border-white/5 rounded-[3rem] p-10 space-y-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                          <BookOpen size={20} className="text-blue-500" /> Engineering Logs
                        </h3>
                        <button onClick={() => handleUpdateSettings({ notes: settings.notes })} className="text-[10px] font-black text-blue-500 hover:text-white uppercase tracking-widest transition-colors">Sync to Cloud</button>
                      </div>
                      <textarea 
                        value={settings?.notes || ''}
                        onChange={(e) => setSettings({ ...settings, notes: e.target.value })}
                        className="w-full h-80 bg-white/[0.01] border border-white/5 rounded-[2rem] p-8 text-sm text-white/40 outline-none focus:border-blue-500/30 transition-all resize-none font-mono leading-relaxed"
                        placeholder="Project technical documentation, patch notes, or pending tasks..."
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-900/40">
                      <Cpu size={48} className="mb-6 opacity-30" />
                      <h4 className="text-2xl font-black tracking-tighter uppercase mb-4 leading-tight">System <br /> Integrity</h4>
                      <div className="space-y-4 mb-10">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                           <span className="text-[10px] font-bold text-white/60 uppercase">Cloud Sync</span>
                           <span className="text-[10px] font-black uppercase">Operational</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                           <span className="text-[10px] font-bold text-white/60 uppercase">DataClusters</span>
                           <span className="text-[10px] font-black uppercase">Secure</span>
                        </div>
                      </div>
                      <button onClick={() => setIsCreateDSModalOpen(true)} className="w-full h-14 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-95 shadow-xl">
                        New DataStore
                      </button>
                    </div>

                    <div className="bg-[#08080A] border border-white/5 rounded-[3rem] p-10 space-y-8">
                      <h4 className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Services</h4>
                      <div className="space-y-4">
                        {[
                          { icon: Binary, label: "Open Cloud API", status: "Enabled", color: "text-emerald-500" },
                          { icon: Terminal, label: "Studio Framework", status: "v2.1 Stable", color: "text-blue-500" },
                          { icon: ShieldCheck, label: "Auth Proxy", status: "Active", color: "text-emerald-500" }
                        ].map((s, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                              <s.icon size={18} />
                            </div>
                            <div className="flex-grow">
                               <div className="text-[10px] font-black text-white uppercase">{s.label}</div>
                               <div className={`text-[8px] font-bold uppercase tracking-widest ${s.color}`}>{s.status}</div>
                            </div>
                          </div>
                        ))}
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

            {activeTab === 'players' && (
              <PlayerIntel onJumpToData={(userId) => {
                setJumpUserId(userId);
                setActiveTab('datastores');
              }} />
            )}

            {activeTab === 'schemas' && (
              <motion.div key="schemas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-12">
                 <div className="space-y-3">
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Cloud Consistency</h2>
                    <p className="text-white/30 text-lg font-medium">Define structural protocols for your DataStore clusters. Ensure every player record follows the studio standard.</p>
                 </div>

                 <div className="grid grid-cols-1 gap-8">
                    {Object.keys(settings?.schemas || {}).length > 0 ? Object.keys(settings?.schemas || {}).map(dsName => (
                      <div key={dsName} className="bg-[#08080A] border border-white/5 rounded-[3rem] p-10 space-y-8 relative overflow-hidden group">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/5 blur-[50px] group-hover:bg-blue-600/10 transition-all" />
                         <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-500">
                                 <Binary size={20} />
                               </div>
                               <div>
                                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">{dsName}</h3>
                                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol Definition</span>
                               </div>
                            </div>
                            <button 
                              onClick={() => {
                                const el = document.getElementById(`schema-${dsName}`);
                                if (el) {
                                  try {
                                    const json = JSON.parse(el.innerText);
                                    handleUpdateSettings({ schemas: { ...settings.schemas, [dsName]: json } });
                                  } catch (e) { toast.error("Invalid JSON Schema structure."); }
                                }
                              }}
                              className="h-12 px-8 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white border border-blue-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                              Commit Schema
                            </button>
                         </div>
                         <div 
                          id={`schema-${dsName}`}
                          contentEditable 
                          className="w-full min-h-[150px] bg-black/40 border border-white/5 rounded-[2rem] p-8 font-mono text-xs text-emerald-500/80 outline-none focus:border-blue-500/30 transition-all leading-relaxed"
                         >
                           {JSON.stringify(settings?.schemas?.[dsName] || {}, null, 2)}
                         </div>
                      </div>
                    )) : (
                      <div className="p-32 border-2 border-dashed border-white/5 rounded-[4rem] text-center">
                         <Binary size={64} className="text-white/5 mx-auto mb-6" />
                         <p className="text-sm font-black text-white/20 uppercase tracking-[0.2em]">No schemas defined for this universe</p>
                      </div>
                    )}
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.3); }
        .glass-card { background: rgba(13, 13, 15, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); }
      `}</style>
    </div>
  );
}

const NavButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all group ${active ? 'bg-white text-black shadow-2xl shadow-white/5' : 'text-white/30 hover:bg-white/5 hover:text-white/50'}`}
  >
    <Icon size={18} className={active ? 'text-blue-600' : 'group-hover:text-blue-500 transition-colors'} />
    {label}
  </button>
);

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-[#08080A] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color}`}>
       <Icon size={64} />
    </div>
    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white/20 group-hover:text-blue-500 transition-colors">
       <Icon size={22} />
    </div>
    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{label}</div>
    <div className="text-3xl font-black text-white tracking-tighter">
      {typeof value === 'number' ? value.toLocaleString() : value || '0'}
    </div>
  </div>
);