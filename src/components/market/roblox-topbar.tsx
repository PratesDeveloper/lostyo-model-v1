"use client";
import React from 'react';
import { Menu, MessageSquare, Users, Shield, MoreHorizontal } from 'lucide-react';

export const RobloxTopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-[100] bg-transparent pointer-events-none">
      {/* Esquerda: Menu e Chat */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
          <Menu className="text-white" size={24} />
        </div>
        <div className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
          <MessageSquare className="text-white" size={20} />
        </div>
      </div>

      {/* Direita: Leaderboard, Settings, etc */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div className="h-10 px-4 bg-black/40 backdrop-blur-md rounded-lg flex items-center gap-3 text-white">
          <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
            <Users size={16} className="text-white/60" />
            <span className="text-xs font-bold">12</span>
          </div>
          <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
            <Shield size={16} className="text-[#5865F2]" />
            <span className="text-xs font-bold">Admin</span>
          </div>
          <MoreHorizontal size={18} className="text-white/60 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};