"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/studio/navbar';
import { 
  Lock, Eye, Server, ShieldCheck, Cpu, Globe, 
  Database, Zap, Key, UserCheck, Search, FileShield 
} from 'lucide-react';

// O componente SecuritySection agora recebe o Icon diretamente como prop 'icon'
const SecuritySection = ({ title, desc, items, icon: Icon }: { 
  title: string, 
  desc: string, 
  items: { icon: React.ElementType, title: string, content: string }[], 
  icon: React.ElementType 
}) => (
  <div className="mb-24">
    <div className="flex items-center gap-6 mb-10">
      <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 shadow-2xl shadow-blue-500/20">
        <Icon size={28} />
      </div>
      <div>
        <h2 className="text-3xl font-black text-white tracking-tighter">{title}</h2>
        <p className="text-white/30 font-medium">{desc}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => {
        const ItemIcon = item.icon; // Desestruturando o ícone do item
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-500">
              <ItemIcon size={20} />
            </div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-widest text-[11px]">{item.title}</h4>
            <p className="text-white/40 text-xs leading-relaxed font-medium">{item.content}</p>
          </motion.div>
        );
      })}
    </div>
  </div>
);

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#030303] selection:bg-blue-500/30">
      <Navbar />
      
      <main className="pt-48 pb-40 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-32"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8">
              <ShieldCheck size={14} className="animate-pulse" />
              Verified Protocol 2.1
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              FORTRESS <br /> <span className="text-white/20">SECURITY.</span>
            </h1>
            <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Our infrastructure is engineered with multiple layers of redundancy and encryption, ensuring the absolute integrity of your digital assets.
            </p>
          </motion.div>

          {/* Core Infrastructure */}
          <SecuritySection 
            icon={Server}
            title="Infrastructure Layers"
            desc="Built on global edge computing networks for maximum resilience."
            items={[
              { icon: Database, title: "AES-256 Storage", content: "All project data and source code are encrypted at rest using Advanced Encryption Standard 256-bit protocols." },
              { icon: Zap, title: "Edge Validation", content: "Server-side Luau validation occurs at the edge, preventing remote code injection before it reaches your instance." },
              { icon: Globe, title: "Global CDN", content: "Assets are delivered through a distributed network with DDoS mitigation and real-time threat detection." }
            ]}
          />

          {/* Authentication & Privacy */}
          <SecuritySection 
            icon={Lock}
            title="Access Control"
            desc="Granular permission management through official platform channels."
            items={[
              { icon: Key, title: "OAuth 2.0 Integration", content: "We never store passwords. All authentication is handled directly by Roblox's secure authorization servers." },
              { icon: UserCheck, title: "Least Privilege", content: "Our systems operate on a 'Need-to-Know' basis, granting only the absolute minimum permissions required." },
              { icon: Search, title: "Audit Logging", content: "Every action taken on the dashboard is recorded in immutable logs for security forensics and transparency." }
            ]}
          />

          {/* Advanced Protection */}
          <div className="glass rounded-[4rem] p-12 md:p-24 border border-white/5 relative overflow-hidden mb-32">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/[0.03] blur-[120px] -z-10" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-white tracking-tighter mb-8">Zero Trust <br /> Architecture.</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="text-blue-500 flex-shrink-0"><FileShield size={24} /></div>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">
                      We treat every request as potentially hostile. Multi-factor verification is required for all administrative changes to production environments.
                    </p>
                  </div>
                  <div className="flex gap-6">
                    <div className="text-blue-500 flex-shrink-0"><ShieldCheck size={24} /></div>
                    <p className="text-white/40 text-sm font-medium leading-relaxed">
                      Automated daily vulnerability scans identify and patch potential exploits in our custom Luau frameworks before they can be leveraged.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-8">System Health</h4>
                <div className="space-y-6">
                  {[
                    { label: "Encryption Engine", status: "Operational", color: "text-emerald-400" },
                    { label: "Edge Security Gate", status: "Active", color: "text-emerald-400" },
                    { label: "Database Isolation", status: "Secure", color: "text-emerald-400" },
                    { label: "Intrusion Detection", status: "Scanning", color: "text-blue-400" }
                  ].map((sys, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-xs font-bold text-white/60">{sys.label}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${sys.color}`}>{sys.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-white tracking-tighter mb-6">Security Inquiries</h3>
            <p className="text-white/30 text-sm font-medium mb-10 leading-relaxed">
              For security researchers wishing to report a vulnerability or partners requesting a full SOC 2 compliance report, please contact our security team.
            </p>
            <button className="h-16 px-12 glass glass-hover rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all">
              Request Data Audit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}