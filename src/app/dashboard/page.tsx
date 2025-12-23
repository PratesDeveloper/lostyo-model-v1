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
  Bell
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("analytics");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onboardingComplete = Cookies.get('onboarding_complete') === 'true';
    if (!onboardingComplete) {
      router.push('/start');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

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
        <div className="flex items-center gap-3 mb-10 px-2">
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

        <div className="mt-auto pt-6 border-t border-white/5">
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
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full w-96">
            <Search size={16} className="text-white/20" />
            <input placeholder="Search features..." className="bg-transparent border-none outline-none text-xs font-medium w-full text-white placeholder:text-white/20" />
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10 border border-white/10">
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
            <p className="text-white/40 font-medium">Community management dashboard.</p>
          </div>

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Members", val: "12,482", sub: "+12% this month" },
                { label: "Active Users", val: "3,120", sub: "Currently online" },
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
              <p className="text-white/40 max-w-sm">Detailed settings and logs will appear here based on your server data.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}