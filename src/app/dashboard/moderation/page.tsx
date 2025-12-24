"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  UserX, 
  MessageCircleOff, 
  Clock,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { getInfractions } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';

interface Infraction {
  id: string;
  user_id: string;
  guild_id: string;
  type: string;
  reason: string;
  moderator_id: string;
  created_at: string;
  user?: {
    username: string;
  };
  moderator?: {
    username: string;
  };
}

const ModerationPage = () => {
  const [infractions, setInfractions] = useState<Infraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const guildId = searchParams.get('guild');

  useEffect(() => {
    const fetchInfractions = async () => {
      if (!guildId) return;
      
      setLoading(true);
      const data = await getInfractions(guildId);
      setInfractions(data);
      setLoading(false);
    };
    
    fetchInfractions();
  }, [guildId]);

  const filteredInfractions = infractions.filter(infraction => {
    const matchesFilter = filter === "all" || infraction.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = infraction.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          infraction.reason.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Moderation.</h1>
          <p className="text-white/40 font-medium">Manage infractions and keep your community safe.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
            <input
              type="text"
              placeholder="Search infractions..."
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
              <SelectItem value="spam">Spam</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="bot abuse">Bot Abuse</SelectItem>
              <SelectItem value="advertising">Advertising</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="h-10 px-6 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm">
            New Rule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Infractions", value: infractions.length.toString(), icon: Shield, color: "text-[#5865F2]" },
          { title: "Active Bans", value: "0", icon: UserX, color: "text-red-500" }, // Implementar contagem real
          { title: "Pending Reports", value: "0", icon: AlertTriangle, color: "text-yellow-500" }, // Implementar contagem real
          { title: "Avg. Response Time", value: "0s", icon: Clock, color: "text-green-500" } // Implementar cálculo real
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

      {/* Infractions Table */}
      <div className="bg-[#141417] rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-black text-white tracking-tight">Recent Infractions</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white/40 text-xs font-bold uppercase tracking-widest">
                <th className="p-6">User</th>
                <th className="p-6">Type</th>
                <th className="p-6">Reason</th>
                <th className="p-6">Moderator</th>
                <th className="p-6">Date</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredInfractions.map((infraction, index) => (
                <motion.tr
                  key={infraction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <td className="p-6">
                    <div className="font-bold text-white">{infraction.user?.username || 'Unknown User'}</div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold">
                      {infraction.type}
                    </span>
                  </td>
                  <td className="p-6 text-white/60 max-w-xs truncate">{infraction.reason}</td>
                  <td className="p-6 text-white/60">{infraction.moderator?.username || 'Unknown Moderator'}</td>
                  <td className="p-6 text-white/40 text-sm">{new Date(infraction.created_at).toLocaleString()}</td>
                  <td className="p-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-white/40">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1A1A1E] border-[#2A2A2E] text-white rounded-[1.5rem] p-2">
                        <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer py-3 gap-3">
                          <MessageCircleOff size={16} className="text-white/40" />
                          <span className="font-bold text-sm">View Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer py-3 gap-3">
                          <UserX size={16} className="text-white/40" />
                          <span className="font-bold text-sm">Ban User</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModerationPage;