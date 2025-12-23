"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { 
  BarChart3, Shield, History, Settings2, Info, Edit3, Users, Zap, LogOut, Search, ChevronRight, Plus, Loader2 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("analytics");
  const [loading, setLoading] = useState(true);
  const [guilds, setGuilds] = useState<any[]>([]);
  const [selectedGuild, setSelectedGuild] = useState<any>(null);

  useEffect(() => {
    const onboardingComplete = Cookies.get('onboarding_complete') === 'true';
    if (!onboardingComplete) {
      router.push('/start');
      return;
    }

    // Carregar servidores reais
    fetch('/api/discord/guilds')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setGuilds(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#5865F2] w-12 h-12" />
      </div>
    );
  }

  // Tela de Seleção de Servidor Real
  if (!selectedGuild) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <img src="https://cdn.lostyo.com/logo.png" alt="Lostyo" className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-4xl font-black mb-2">Select a Server</h1>
            <p className="text-white/40 font-medium">Manage your Discord communities in real-time.</p>
          </div>

          <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {guilds.map((guild) => (
              <button
                key={guild.id}
                onClick={() => setSelectedGuild(guild)}
                className="flex items-center justify-between p-5 bg-[#141417] hover:bg-[#1A1A1E] border border-white/5 hover:border-[#5865F2]/50 rounded-[2rem] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border border-white/10">
                    <AvatarImage src={guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : ""} />
                    <AvatarFallback className="bg-[#1A1A1E] text-white/40">{guild.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      {guild.name}
                      {guild.owner && <Zap size={14} className="text-[#5865F2]" />}
                    </h3>
                    <p className="text-xs text-white/30 font-bold uppercase tracking-widest">ID: {guild.id}</p>
                  </div>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-white" />
              </button>
            ))}
            
            {guilds.length === 0 && (
              <div className="text-center py-10 bg-[#141417] rounded-[2rem] border border-dashed border-white/10">
                <p className="text-white/40">No manageable servers found.</p>
              </div>
            )}
          </div>
          
          <Link href="/start" className="block mt-6">
            <button className="w-full flex items-center justify-center gap-3 p-5 bg-white/5 hover:bg-white/10 border border-dashed border-white/10 rounded-[2rem] transition-all group">
              <Plus size={20} className="text-white/40" />
              <span className="font-bold text-white/40">Add New Server</span>
            </button>
          </Link>
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
                activeTab === item.id ? "bg-[#5865F2] text-white" : "text-white/40 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-2">
          <button onClick={() => setSelectedGuild(null)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-white/40 hover:bg-white/5 hover:text-white transition-all">
            <ChevronRight className="rotate-180" size={14} />
            Switch Server
          </button>
          <button onClick={() => { Cookies.remove('lostyo_logged_in'); router.push('/'); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col h-screen overflow-y-auto">
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-[#0B0B0D]/80 backdrop-blur-xl z-20">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8 border border-white/10">
              <AvatarImage src={selectedGuild.icon ? `https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.png` : ""} />
              <AvatarFallback>{selectedGuild.name[0]}</AvatarFallback>
            </Avatar>
            <p className="text-xs font-black tracking-widest text-white/40 uppercase">{selectedGuild.name}</p>
          </div>
          <Avatar className="w-10 h-10 border border-white/10">
             <AvatarImage src={`https://cdn.discordapp.com/embed/avatars/0.png`} />
          </Avatar>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            {menuItems.find(i => i.id === activeTab)?.label}
            <Zap className="text-[#5865F2]" size={24} />
          </h1>
          <p className="text-white/40 font-medium mb-10">Live data for <span className="text-white">{selectedGuild.name}</span>.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#141417] border-white/5 rounded-3xl p-6">
              <CardTitle className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Verification</CardTitle>
              <div className="text-4xl font-black">{selectedGuild.owner ? "Owner" : "Admin"}</div>
              <div className="text-[#5865F2] text-xs font-bold mt-2">Authenticated via Discord</div>
            </Card>
            <Card className="bg-[#141417] border-white/5 rounded-3xl p-6">
              <CardTitle className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Server ID</CardTitle>
              <div className="text-2xl font-black truncate">{selectedGuild.id}</div>
              <div className="text-white/20 text-xs font-bold mt-2">Physical Location: Discord API</div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}