"use client";
import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Database, Globe } from 'lucide-react';

export const SystemHealth = () => {
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(8, Math.min(25, prev + (Math.random() * 4 - 2))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      <HealthItem icon={Globe} label="API Mesh" value={`${latency.toFixed(1)}ms`} status="Optimal" />
      <HealthItem icon={Activity} label="Telemetry" value="100%" status="Live" />
      <HealthItem icon={ShieldCheck} label="Firewall" value="AES-256" status="Secure" />
      <HealthItem icon={Database} label="Cloud DB" value="Synced" status="Active" />
    </div>
  );
};

const HealthItem = ({ icon: Icon, label, value, status }: any) => (
  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
    <div className="flex items-center gap-2 mb-2">
      <Icon size={12} className="text-blue-500" />
      <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{label}</span>
    </div>
    <div className="flex justify-between items-end">
      <span className="text-xs font-black text-white">{value}</span>
      <span className="text-[7px] font-bold text-emerald-500 uppercase">{status}</span>
    </div>
  </div>
);