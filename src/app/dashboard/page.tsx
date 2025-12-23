"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { 
  BarChart3, 
  Shield, 
  History, 
  Settings2, 
  Info, 
  Edit3, 
  Users, 
  Zap, 
  LogOut,
  Search,
  ChevronRight,
  Plus,
  Loader2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("analytics");
  const [loading, setLoading] = useState(true);
  const [fetchingGuilds, setFetchingGuilds] = useState(true);
  const [guilds, setGuilds] = useState<any[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<any>(null);

  useEffect(() => {
    // Verifica se está logado antes de qualquer coisa
    const isLoggedIn = Cookies.get('lostyo_logged_in') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const onboardingComplete = Cookies.get('onboarding_complete') === 'true';
    if (!onboardingComplete) {
      router.push('/start');
    } else {
      setLoading(false);
      fetchGuilds();
    }
  }, [router]);

  const fetchGuilds = async () => {
    try {
      setFetchingGuilds(true);
      const response = await fetch('/api/discord/guilds');
      
      if (response.status === 401) {
        // Sessão expirada ou inválida no servidor
        Cookies.remove('lostyo_logged_in');
        Cookies.remove('lostyo_user_id');
        router.push('/login');
        return;
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setGuilds(data);
      }
    } catch (err) {
      console.error("Failed to load guilds", err);
    } finally {
      setFetchingGuilds(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#5865F2] w-10 h-10" />
    </div>
  );

  // Tela de Seleção de Servidor
  if (!selectedGuild) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-4xl font-black mb-2">Select a Server</h1>
            <p className="text-white/40 font-medium">Choose a community to manage with LostyoCord.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {fetchingGuilds ? (
              <div className="flex flex-col items-center py-10">
                <Loader2 className="animate-spin text-[#5865F2] w-10 h-10 mb-4" />
                <p className="text-white/20 text-sm font-bold uppercase tracking-widest">Loading your servers...</p>
              </div>
            ) : guilds.length > 0 ? (
              guilds.map((guild) => (
                <button
                  key={guild.id}
                  onClick={() => guild.active && setSelectedGuild(guild)}
                  className={cn(
                    "flex items-center justify-between p-5 bg-[#141417] border rounded-[2rem] transition-all group relative overflow-hidden",
                    guild.active 
                      ? "hover:bg-[#1A1A1E] border-white/5 hover:border-[#5865F2]/50" 
                      : "opacity-60 border-white/5 cursor-not-allowed grayscale"
                  )}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <Avatar className="w-12 h-12 border border-white/10 group-hover:scale-105 transition-transform">
                      <AvatarImage src={guild.icon} />
                      <AvatarFallback>{guild.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {guild.name}
                        {guild.active && <Zap size={14} className="text-[#5865F2]" />}
                      </h3>
                      <p className="text-xs text-white/30 font-bold uppercase tracking-widest">
                        {guild.active ? "Bot Active" : "Bot not invited"}
                      </p>
                    </div>
                  </div>
                  
                  {guild.active ? (
                    <ChevronRight className="text-white/20 group-hover:text-white transition-colors relative z-10" />
                  ) : (
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/safe-alert?guild_id=${guild.id}`);
                      }}
                      size="sm" 
                      className="bg-[#5865F2] hover:bg-[#4752C4] rounded-full text-[10px] font-black uppercase tracking-wider relative z-10"
                    >
                      Invite Bot
                    </Button>
                  )}

                  {guild.banner && (
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                      <img src={guild.banner} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="text-center py-10 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                <p className="text-white/40">No servers found where you are an admin.</p>
              </div>
            )}
            
            <button 
              onClick={() => router.push('/start')}
              className="flex items-center justify-center gap-3 p-5 bg-white/5 hover:bg-white/10 border border-dashed border-white/10 rounded-[2rem] transition-all group mt-4"
            >
              <Plus size={20} className="text-white/40" />
              <span className="font-bold text-white/40">Manage New Server</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "logs", label: "Audit Logs", icon: History },
    { id: "security", label: "Security", icon: Shield },
    { id: "members", label: "Members", icon: Users },
    { id: "settings", label: "Options", icon: Settings2 },
    { id: "info", label: "Information", icon: Info },
    { id: "edit", label: "Customize", icon: Edit3 },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141417] border-r border-white/5 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => setSelectedGuild(null)}>
          <img src="https://cdn.lostyo.com/logo.png" alt="Logo" className="w-8 h-8" />
          <span className="font-black text-lg">LostyoCord</span>
        </div>

        <nav className="flex-grow space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                activeTab === item.id 
                  ? "bg-[#5865F2] text-white" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} className={cn(
                activeTab === item.id ? "text-white" : "text-white/20 group-hover:text-white"
              )} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-2">
          <button 
            onClick={() => setSelectedGuild(null)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-white/40 hover:bg-white/5 hover:text-white transition-all"
          >
            <ChevronRight className="rotate-180" size={14} />
            Switch Server
          </button>
          <button 
            onClick={() => {
              Cookies.remove('lostyo_logged_in', { path: '/' });
              Cookies.remove('lostyo_user_id', { path: '/' });
              Cookies.remove('onboarding_complete', { path: '/' });
              router.push('/');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-y-auto">
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#0B0B0D]/80 backdrop-blur-xl z-20">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-white/10">
              <AvatarImage src={selectedGuild.icon} />
              <AvatarFallback>{selectedGuild.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-black tracking-widest text-white/40 uppercase">{selectedGuild.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full w-64 md:w-96">
              <Search size={16} className="text-white/20" />
              <input placeholder="Search features..." className="bg-transparent border-none outline-none text-xs font-medium w-full text-white placeholder:text-white/20" />
            </div>
            <Avatar className="w-10 h-10 border border-white/10 hidden sm:flex">
              <AvatarImage src="https://cdn.discordapp.com/embed/avatars/0.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              {menuItems.find(i => i.id === activeTab)?.label}
              <Zap className="text-[#5865F2]" size={24} />
            </h1>
            <p className="text-white/40 font-medium">Viewing data for <span className="text-white">{selectedGuild.name}</span>.</p>
          </div>

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Members", val: "Fetching...", sub: "Real-time sync" },
                { label: "Active Users", val: "---", sub: "Currently online" },
                { label: "Messages/Day", val: "---", sub: "Peak engagement" }
              ].map((stat, i) => (
                <Card key={i} className="bg-[#141417] border-white/5 rounded-3xl p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-sm font-bold text-white/40 uppercase tracking-widest">{stat.label}</CardTitle>
                  </CardHeader>
                  <div className="text-4xl font-black">{stat.val}</div>
                  <div className="text-[#5865F2] text-xs font-bold mt-2">{stat.sub}</div>
                </Card>
              ))}
            </div>
          )}

          {activeTab !== "analytics" && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Settings2 className="text-white/20" size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Section: {activeTab}</h2>
              <p className="text-white/40 max-w-sm">Data for {selectedGuild.name} will be fetched via Discord API hooks.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}