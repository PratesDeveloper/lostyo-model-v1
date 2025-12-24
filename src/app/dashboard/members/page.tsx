"use client";

import React, { useState } from 'react';
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

const mockMembers = [
  { id: 1, name: "Alex Johnson", role: "Owner", joinDate: "2022-01-15", messages: 12450, avatar: "AJ" },
  { id: 2, name: "Sam Wilson", role: "Admin", joinDate: "2022-03-22", messages: 8760, avatar: "SW" },
  { id: 3, name: "Taylor Reed", role: "Moderator", joinDate: "2022-05-30", messages: 5420, avatar: "TR" },
  { id: 4, name: "Jordan Lee", role: "Member", joinDate: "2022-08-14", messages: 3210, avatar: "JL" },
  { id: 5, name: "Casey Smith", role: "Member", joinDate: "2022-11-05", messages: 2890, avatar: "CS" },
  { id: 6, name: "Riley Brown", role: "Member", joinDate: "2023-01-19", messages: 1560, avatar: "RB" },
];

const MembersPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = mockMembers.filter(member => {
    const matchesFilter = filter === "all" || member.role.toLowerCase() === filter.toLowerCase();
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          { title: "Total Members", value: "12,402", icon: Users, color: "text-[#5865F2]" },
          { title: "Online Now", value: "3,245", icon: Calendar, color: "text-green-500" },
          { title: "Admins", value: "5", icon: Crown, color: "text-yellow-500" },
          { title: "Moderators", value: "12", icon: Shield, color: "text-blue-500" }
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
                        {member.avatar}
                      </div>
                      <div className="font-bold text-white">{member.name}</div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      member.role === "Owner" ? "bg-yellow-500/10 text-yellow-500" :
                      member.role === "Admin" ? "bg-red-500/10 text-red-500" :
                      member.role === "Moderator" ? "bg-blue-500/10 text-blue-500" :
                      "bg-gray-500/10 text-gray-500"
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="p-6 text-white/60">{member.joinDate}</td>
                  <td className="p-6 text-white/60">{member.messages.toLocaleString()}</td>
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