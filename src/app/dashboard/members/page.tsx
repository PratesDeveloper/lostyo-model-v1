"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Crown,
  Shield,
  Calendar,
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
import { getMembers } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';

interface Member {
  id: string;
  username: string;
  avatar_url: string | null;
  role: string;
  join_date: string;
  message_count: number;
}

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const guildId = searchParams.get('guild');

  useEffect(() => {
    const fetchMembers = async () => {
      if (!guildId) return;
      
      setLoading(true);
      const data = await getMembers(guildId);
      setMembers(data);
      setLoading(false);
    };
    
    fetchMembers();
  }, [guildId]);

  const filteredMembers = members.filter(member => {
    const matchesFilter = filter === "all" || member.role.toLowerCase() === filter.toLowerCase();
    const matchesSearch = member.username.toLowerCase().includes(searchTerm.toLowerCase());
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
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">Members.</h1>
          <p className="text-white/40 font-medium">Manage your community members and roles.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 w-4 h-4" />
            <input
              type="text"
              placeholder="Search members..."
              className="bg-[#141417] border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm font-bold text-white w-64 focus:ring-1 ring-[#5865F2]/50 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-[#141417] border border-white/5 rounded-full text-sm font-bold text-white">
              <Filter className="w-4 h-4 mr-2 text-white/40" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent className="bg-[#141417] border border-white/5 rounded-2xl">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="h-10 px-6 rounded-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm">
            Add Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Members", value: members.length.toString(), icon: Users, color: "text-[#5865F2]" },
          { title: "Online Now", value: "0", icon: Calendar, color: "text-green-500" }, // Implementar contagem real
          { title: "Admins", value: members.filter(m => m.role === 'admin').length.toString(), icon: Crown, color: "text-yellow-500" },
          { title: "Moderators", value: members.filter(m => m.role === 'moderator').length.toString(), icon: Shield, color: "text-blue-500" }
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

      {/* Members List */}
      <div className="bg-[#141417] rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-black text-white tracking-tight">Community Members</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white/40 text-xs font-bold uppercase tracking-widest">
                <th className="p-6">Member</th>
                <th className="p-6">Role</th>
                <th className="p-6">Join Date</th>
                <th className="p-6">Messages</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold text-sm">
                        {member.username.charAt(0)}
                      </div>
                      <div className="font-bold text-white">{member.username}</div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      member.role === "owner" ? "bg-yellow-500/10 text-yellow-500" :
                      member.role === "admin" ? "bg-red-500/10 text-red-500" :
                      member.role === "moderator" ? "bg-blue-500/10 text-blue-500" :
                      "bg-gray-500/10 text-gray-500"
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="p-6 text-white/60">{new Date(member.join_date).toLocaleDateString()}</td>
                  <td className="p-6 text-white/60">{member.message_count.toLocaleString()}</td>
                  <td className="p-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-white/40">
                          <MoreHorizontal size={18} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#1A1A1E] border-[#2A2A2E] text-white rounded-[1.5rem] p-2">
                        <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer py-3 gap-3">
                          <Users size={16} className="text-white/40" />
                          <span className="font-bold text-sm">View Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl hover:bg-white/5 focus:bg-white/5 cursor-pointer py-3 gap-3">
                          <Shield size={16} className="text-white/40" />
                          <span className="font-bold text-sm">Change Role</span>
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

export default MembersPage;