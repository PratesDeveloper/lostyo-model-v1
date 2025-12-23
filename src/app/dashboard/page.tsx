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
  Bell,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock de servidores (Em produção isso viria da API do Discord / Supabase)
const MOCK_GUILDS = [
  { id: "123456789", name: "Lostyo Hub", icon: "https://cdn.discordapp.com/embed/avatars/0.png", members: 12482, premium: true },
  { id: "987654321", name: "Dev Community", icon: "https://cdn.discordapp.com/embed/avatars/1.png", members: 5420, premium: false },
  { id: "456789123", name: "Gamer Lounge", icon: "https://cdn.discordapp.com/embed/avatars/2.png", members: 890, premium: false },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("analytics");
  const [loading, setLoading] = useState(true);
  const [selectedGuild, setSelectedGuild] = useState<any>(null);

  useEffect(() => {
    const onboardingComplete = Cookies.get('onboarding_complete') === 'true';
    if (!onboardingComplete) {
      router.push('/start');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

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
            {MOCK_GUILDS.map((guild) => (
              <button
                key={guild.id}
                onClick={() => setSelectedGuild(guild)}
                className="flex items-center justify-between p-5 bg-[#141417] hover:bg-[#1A1A1E] border border-white/5 hover:border-[#5865F2]/50 rounded-[2rem] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border border-white/10 group-hover:scale-105 transition-transform">
                    <AvatarImage src={guild.icon} />
                    <AvatarFallback>{guild.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      {guild.name}
                      {guild.premium && <Zap size={14} className="text-[#5865F2]" />}
                    </h3>
                    <p className="text-xs text-white/30 font-bold uppercase tracking-widest">{guild.members.toLocaleString()} Members</p>
                  </div>
                </div>
                <ChevronRight className="text-white/20 group-hover:text-white transition-colors" />
              </button>
            ))}
            
            <button className="flex items-center justify-center gap-3 p-5 bg-white/5 hover:bg-white/10 border border-dashed border-white/10 rounded-[2rem] transition-all group mt-4">
              <Plus size={20} className="text-white/40" />
              <span className="font-bold text-white/40">Add New Server</span>
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
              Cookies.remove('lostyo_logged_in');
              Cookies.remove('onboarding_complete');
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
                { label: "Total Members", val: selectedGuild.members.toLocaleString(), sub: "+12% this month" },
                { label: "Active Users", val: Math.floor(selectedGuild.members * 0.25).toLocaleString(), sub: "Currently online" },
                { label: "Messages/Day", val: "45.2k", sub: "Peak engagement" }
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