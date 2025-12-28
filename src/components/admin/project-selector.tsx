"use client";
import React from 'react';
import { Gamepad2, ChevronRight, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  category: string;
  players_count: number;
  status: string;
  roblox_place_id: string;
}

interface ProjectSelectorProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  selectedProject: Project | null;
}

export const ProjectSelector = ({ projects, onSelectProject, selectedProject }: ProjectSelectorProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Available Nodes</h3>
        <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">{projects.length} Found</span>
      </div>

      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className="p-10 border border-white/5 rounded-3xl text-center bg-white/[0.01]">
            <p className="text-[9px] font-black uppercase tracking-widest text-white/10">No clusters linked</p>
          </div>
        ) : (
          projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelectProject(project)}
              className={`p-6 rounded-[2rem] border cursor-pointer transition-all relative group overflow-hidden ${
                selectedProject?.id === project.id 
                  ? 'bg-blue-600/10 border-blue-500/30 shadow-2xl shadow-blue-600/5' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
              }`}
            >
              {selectedProject?.id === project.id && (
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    selectedProject?.id === project.id ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/20'
                  }`}>
                    <Gamepad2 size={22} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white mb-0.5">{project.name}</div>
                    <div className="flex items-center gap-2">
                      <Circle size={6} className="fill-emerald-500 text-emerald-500" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">{project.category}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} className={`transition-all ${selectedProject?.id === project.id ? 'text-blue-500 translate-x-1' : 'text-white/10'}`} />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};