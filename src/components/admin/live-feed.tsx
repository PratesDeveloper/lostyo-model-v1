"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const LiveFeed = () => {
  const logs = [
    { time: "14:22:01", action: "AUTH_GATEWAY", detail: "Root Access Granted" },
    { time: "14:20:45", action: "DS_QUERY", detail: "Fetched Player_7468377959" },
    { time: "14:18:12", action: "CLOUD_SYNC", detail: "Universe Nodes Revalidated" },
    { time: "14:15:30", action: "PROXY_ACTIVE", detail: "Thumbnail Cluster Balanced" },
  ];

  return (
    <div className="space-y-4">
      <h4 className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] px-2">Operational Feed</h4>
      <div className="space-y-2">
        {logs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-center gap-4 group hover:bg-white/[0.03] transition-all"
          >
            <span className="text-[8px] font-mono text-blue-500/50">{log.time}</span>
            <div className="flex-grow">
               <div className="text-[9px] font-black text-white/40 uppercase group-hover:text-white transition-colors">{log.action}</div>
               <div className="text-[8px] text-white/10 font-bold uppercase tracking-wider">{log.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};