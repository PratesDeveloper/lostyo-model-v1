"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Activity, Code, 
  ShieldCheck, Loader2, Gamepad2, Database, 
  Zap, Lock, Power, RefreshCcw, LayoutGrid,
  Search, Save, Trash2, ExternalLink, Braces,
  Settings, AlertCircle
} from 'lucide-react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProfileByRobloxId, getAllProjects } from '@/app/actions/profile';
import { toast, Toaster } from 'sonner';

export default function DashboardAdminPage() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // DataStore State
  const [datastores, setDatastores] = useState<any[]>([]);
  const [selectedDS, setSelectedDS] = useState<string>("");
  const [searchKey, setSearchKey] = useState<string>("");
  const [activeEntryData, setActiveEntryData] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'datastores'>('overview');

  const router = useRouter();

  const loadBaseData = async () => {
    const robloxId = Cookies.get('lostyo_roblox_id');
    let profileData = null;
    if (robloxId) profileData = await getProfileByRobloxId(robloxId);

    setProfile(profileData || {
      roblox_display_name: "Test Admin",
      avatar_url: "https://cdn.lostyo.com/logo.png",
      is_developer: true
    });

    const projectsData = await getAllProjects();
    setProjects(projectsData);
    if (projectsData.length > 0 && !selectedProject) setSelectedProject(projectsData[0]);
    setIsLoading(false);
  };

  useEffect(() => { loadBaseData(); }, []);

  const callRobloxAPI = async (action: string, params: any = {}) => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/admin/roblox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, universeId: selectedProject?.roblox_place_id, ...params })
      });
      
      const data = await response.json();
      
      if (data.error) {
        // Erro vindo da API do Roblox ou Bridge
        console.error("API Error Response:", data);
        toast.error(data.error, {
          description: data.details || "Check server logs for more info."
        });
        return null;
      }
      
      return data;
    } catch (err: any) {
      toast.error("Bridge Connection Failed");
      return null;
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchDatastores = async () => {
    const result = await callRobloxAPI('listDataStores');
    if (result && result.datastores) {
      setDatastores(result.datastores);
      toast.success(`Fetched ${result.datastores.length} clusters`);
    }
  };

  const loadEntry = async () => {
    if (!selectedDS || !searchKey) return toast.error("Configuration Required", { description: "Select DataStore and Key ID" });
    const result = await callRobloxAPI('getEntry', { datastoreName: selectedDS, entryKey: searchKey });
    if (result) {
      setActiveEntryData(result);
      toast.success("Cloud Data Sync Complete");
    }
  };

  const saveEntry = async () => {
    if (!activeEntryData) return;
    const result = await callRobloxAPI('setEntry', { datastoreName: selectedDS, entryKey: searchKey, value: activeEntryData });
    if (result) toast.success("Cloud Entry Overwritten Successfully");
  };

  useEffect(() => {
    if (selectedProject && activeTab === 'datastores') fetchDatastores();
  }, [selectedProject, activeTab]);

  if (isLoading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Loader2 className="animate-spin text-blue-500 w-12 h-12" /></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-blue-500/30 overflow-hidden">
      <Toaster theme="dark" richColors />
      <aside className="w-80 border-r border-white/5 flex flex-col hidden xl:flex bg-[#080808]">
        <div className="p-10">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg"><img src="https://cdn.lostyo.com/logo.png" className="w-6 h-6" /></div>
            <div className="flex flex-col"><span className="font-black tracking-tighter text-lg uppercase leading-none">Lostyo</span><span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">Command Hub</span></div>
          </Link>
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'overview' ? 'bg-blue-600' : 'text-white/20 hover:bg-white/5'}`}><LayoutGrid size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span></button>
            <button onClick={() => setActiveTab('datastores')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'datastores' ? 'bg-blue-600' : 'text-white/20 hover:bg-white/5'}`}><Database size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Data Explorer</span></button>
          </nav>
        </div>
        <div className="mt-auto p-8 bg-black/20 border-t border-white/5">
          <div className="flex items-center gap-4 mb-6"><div className="w-12 h-12 rounded-2xl border border-white/10 overflow-hidden"><img src={profile?.avatar_url} className="w-full h-full object-cover" /></div><div className="flex flex-col"><span className="text-[11px] font-black uppercase truncate">{profile?.roblox_display_name}</span><span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Super Admin</span></div></div>
          <button onClick={() => { Cookies.remove('lostyo_roblox_logged'); window.location.href = '/'; }} className="w-full h-12 flex items-center justify-center gap-3 rounded-2xl bg-white/5 text-white/40 hover:text-red-500 border border-white/5 transition-all"><Power size={16} /><span className="text-[9px] font-black uppercase tracking-widest">Exit Terminal</span></button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10 bg-[#080808]">
          <div className="flex items-center gap-4"><div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-500'}`} /><h1 className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Secure Connection // Active</h1></div>
          <div className="flex items-center gap-3"><div className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center gap-2"><ShieldCheck size={14} className="text-blue-500" /><span className="text-[9px] font-black uppercase text-blue-400">Auth Root</span></div><button onClick={loadBaseData} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"><RefreshCcw size={18} className={isSyncing ? "animate-spin" : ""} /></button></div>
        </header>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-80 border-r border-white/5 p-8 overflow-y-auto custom-scrollbar">
            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-6">Linked Universes</h3>
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} onClick={() => setSelectedProject(p)} className={`p-5 rounded-2xl border cursor-pointer transition-all ${selectedProject?.id === p.id ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/5 border-white/5'}`}>
                  <div className="flex items-center gap-4"><Gamepad2 size={20} className={selectedProject?.id === p.id ? "text-blue-500" : "text-white/20"} /><div className="flex flex-col"><span className="text-xs font-black uppercase">{p.name}</span><span className="text-[9px] font-bold text-white/20 uppercase">{p.category}</span></div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-grow p-12 overflow-y-auto custom-scrollbar bg-[#060606]">
            {selectedProject ? (
              <AnimatePresence mode="wait">
                {activeTab === 'overview' ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-5xl mx-auto">
                    <div className="flex justify-between items-end">
                      <div><h2 className="text-6xl font-black tracking-tighter uppercase mb-2">{selectedProject.name}</h2><div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Open Cloud Engine // {selectedProject.roblox_place_id}</div></div>
                      <button onClick={() => window.open(`https://www.roblox.com/games/${selectedProject.roblox_place_id}`, '_blank')} className="h-14 px-8 bg-white text-black rounded-2xl font-black uppercase text-[10px] flex items-center gap-3">Live Experience <ExternalLink size={16} /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl"><Users size={24} className="text-blue-500 mb-4" /><div className="text-[10px] font-black text-white/20 uppercase mb-1">Live Players</div><div className="text-3xl font-black">--</div></div>
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl"><Zap size={24} className="text-yellow-500 mb-4" /><div className="text-[10px] font-black text-white/20 uppercase mb-1">API Latency</div><div className="text-3xl font-black">--</div></div>
                      <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl"><Activity size={24} className="text-emerald-500 mb-4" /><div className="text-[10px] font-black text-white/20 uppercase mb-1">Status</div><div className="text-3xl font-black uppercase">Monitoring</div></div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1 space-y-6">
                        <div className="space-y-2"><label className="text-[10px] font-black text-white/20 uppercase px-2">Data Cluster</label><select value={selectedDS} onChange={(e) => setSelectedDS(e.target.value)} className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl px-6 text-xs font-bold outline-none focus:border-blue-500">{datastores.length === 0 ? <option>Loading Clusters...</option> : <option value="">Select DataStore</option>}{datastores.map(ds => <option key={ds.name} value={ds.name}>{ds.name}</option>)}</select></div>
                        <div className="space-y-2"><label className="text-[10px] font-black text-white/20 uppercase px-2">Player Key / ID</label><div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} /><input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder="UserID" className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 text-xs font-bold outline-none focus:border-blue-500" /></div></div>
                        <button onClick={loadEntry} className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">Fetch Data</button>
                      </div>
                      <div className="lg:col-span-2">
                         <div className="glass border border-white/5 rounded-[2.5rem] overflow-hidden">
                            <div className="h-14 bg-white/5 flex items-center justify-between px-8 border-b border-white/5"><div className="flex items-center gap-3"><Braces size={16} className="text-blue-500" /><span className="text-[10px] font-black uppercase tracking-widest">Metadata Editor</span></div><div className="flex gap-4"><button onClick={saveEntry} className="text-blue-500 hover:text-blue-400 flex items-center gap-2 text-[10px] font-black uppercase"><Save size={14} /> Commit</button><button onClick={() => setActiveEntryData(null)} className="text-white/20 hover:text-red-500 flex items-center gap-2 text-[10px] font-black uppercase"><Trash2 size={14} /> Clear</button></div></div>
                            <div className="p-8">{activeEntryData ? <textarea value={typeof activeEntryData === 'string' ? activeEntryData : JSON.stringify(activeEntryData, null, 2)} onChange={(e) => { try { setActiveEntryData(JSON.parse(e.target.value)); } catch { setActiveEntryData(e.target.value); } }} className="w-full h-96 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed outline-none resize-none" /> : <div className="h-96 flex flex-col items-center justify-center text-center opacity-20"><Code size={48} className="mb-4" /><p className="text-[10px] font-black uppercase tracking-widest">No Key Loaded</p></div>}</div>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10"><Gamepad2 size={100} /><p className="mt-4 font-black uppercase tracking-[0.5em]">Standby</p></div>
            )}
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </div>
  );
}