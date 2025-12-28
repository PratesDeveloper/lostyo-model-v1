"use client";
import React from 'react';
import { Gamepad2, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  category: string;
  players_count: number;
  status: string;
}

interface ProjectSelectorProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  selectedProject: Project | null;
}

export const ProjectSelector = ({ projects, onSelectProject, selectedProject }: ProjectSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Studio Experiences ({projects.length})</h3>
        <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 flex items-center gap-1">
          <Plus size={12} /> New
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelectProject(project)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              selectedProject?.id === project.id 
                ? 'bg-red-600/10 border-red-500/50 shadow-lg shadow-red-600/10' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-red-400">
                  <Gamepad2 size={18} />
                </div>
                <div>
                  <div className="text-sm font-black text-white">{project.name}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">{project.category}</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-white/30" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};