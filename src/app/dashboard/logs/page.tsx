"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ScrollText,
  Search,
  Filter,
  Calendar,
  User,
  Settings,
  Shield,
  MessageSquare,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const mockLogs = [
  { id: 1, user: "AdminUser", action: "Updated server settings", resource: "General Configuration", time: "2 minutes ago", type: "settings" },
  { id: 2, user: "ModBot", action: "Deleted spam message", resource: "#general channel", time: "5 minutes ago", type: "moderation" },
  { id: 3, user: "NewMember", action: "Joined server", resource: "Community Server", time: "12 minutes ago", type: "user" },
  { id: 4, user: "AdminUser", action: "Created new role", resource: "Moderator", time: "24 minutes ago", type: "settings" },
  { id: 5, user: "ModBot", action: "Warned user", resource: "Spammer#1234", time: "36 minutes ago", type: "moderation" },
  { id: 6, user: "Member123", action: "Posted message", resource: "#announcements", time: "1 hour ago", type: "message" },
  { id: 7, user: "AdminUser", action: "Banned user", resource: "Troll#9999", time: "2 hours ago", type: "moderation" },
  { id: 8, user: "ServerBot", action: "Scheduled maintenance", resource: "Weekly backup", time: "3 hours ago", type: "system" },
];

const LogsPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = mockLogs.filter(log => {
    const matchesFilter = filter === "all" || log.type === filter;
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIconForType = (type: string) => {
    switch(type) {
      case "user": return User;
      case "settings": return Settings;
      case "moderation": return Shield;
      case "message": return MessageSquare;
      case "system": return Server;
      default: return ScrollText;
    }
  };

  const getColorForType = (type: string) => {
    switch(type) {
      case "user": return "text-blue-500";
      case "settings": return "text-yellow-500";
      case "moderation": return "text-red-500";
      case "message": return "text-green-500";
      case "system": return "text-purple-500";
      default: return "text-white";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Activity Logs.</h1>
          <p className="text-white/40 font-medium">Track all actions and changes in your server.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs..."
              className="bg-[#141417] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm font-bold text-white w-64 focus:ring-1 ring-[#5865F2]/50 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-[#141417] border border-white/5 rounded-full text-sm font-bold text-white">
              <Filter className="w-4 h-4 mr-2 text-white/40" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="bg-[#141417] border border-white/5 rounded-2xl">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="user">User Actions</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
              <SelectItem value="moderation">Moderation</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="h-10 px-6 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm">
            Export Logs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Actions", value: "1,245", icon: ScrollText, color: "text-[#5865F2]" },
          { title: "Moderation", value: "87", icon: Shield, color: "text-red-500" },
          { title: "User Actions", value: "423", icon: User, color: "text-blue-500" },
          { title: "Settings", value: "32", icon: Settings, color: "text-yellow-500" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#141417] p-6 rounded-[2rem] border border-white/5"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{stat.title}</p>
                <p className="text-2xl font-black text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logs List */}
      <div className="bg-[#141417] rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-black text-white tracking-tight">Recent Activity</h2>
        </div>
        
        <div className="divide-y divide-white/5">
          {filteredLogs.map((log, index) => {
            const Icon = getIconForType(log.type);
            const color = getColorForType(log.type);
            
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-bold text-white">{log.user}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-white/60">{log.action}</span>
                      <span className="text-white/60">•</span>
                      <span className="font-medium text-white">{log.resource}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="text-white/40 flex items-center gap-1">
                        <Calendar size={14} />
                        {log.time}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${color.replace('text-', 'bg-')}/10`}>
                        {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LogsPage;