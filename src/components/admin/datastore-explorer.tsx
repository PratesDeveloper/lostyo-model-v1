"use client";

import React, { useEffect, useState } from 'react';
import { 
  Database, Search, Save, Trash2, FileCode, 
  AlertCircle, Gamepad2, Plus, RefreshCw, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { CreateKeyForm } from './create-key-form';

interface DataStoreExplorerProps {
  selectedProject: any;
  settings: any;
  callRobloxAPI: (action: string, params: any) => Promise<any>;
  isSyncing: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isCreateModalOpen: boolean;
}

export const DataStoreExplorer = ({ 
  selectedProject, 
  settings, 
  callRobloxAPI, 
  isSyncing,
  setIsCreateModalOpen,
  isCreateModalOpen
}: DataStoreExplorerProps) => {
  const [datastores, setDatastores] = useState<any[]>([]);
  const [selectedDS, setSelectedDS] = useState<string>("");
  const [dsKeys, setDsKeys] = useState<any[]>([]);
  const [searchKeyFilter, setSearchKeyFilter] = useState("");
  
  const [activeEntryKey, setActiveEntryKey] = useState<string>("");
  const [activeEntryData, setActiveEntryData] = useState<any>(null);
  const [entryError, setEntryError] = useState<string | null>(null);
  const [isKeysLoading, setIsKeysLoading] = useState(false);

  useEffect(() => {
    if (selectedProject) fetchDatastores();
  }, [selectedProject]);

  const fetchDatastores = async () => {
    // Correção: Passando um objeto vazio como segundo argumento
    const result = await callRobloxAPI('listDataStores', {}); 
    if (result?.datastores) setDatastores(result.datastores);
  };

  const handleKeyCreated = (keyName: string) => {
    fetchKeys(selectedDS);
    loadEntry(keyName);
  };

  const fetchKeys = async (dsName: string) => {
    setSelectedDS(dsName);
    setActiveEntryData(null);
    setActiveEntryKey("");
    setEntryError(null);
    setIsKeysLoading(true);
    const result = await callRobloxAPI('listKeys', { datastoreName: dsName });
    setDsKeys(result?.keys || []);
    setIsKeysLoading(false);
  };

  const loadEntry = async (key: string) => {
    setActiveEntryKey(key);
    setActiveEntryData(null);
    setEntryError(null);
    
    const result = await callRobloxAPI('getEntry', { datastoreName: selectedDS, entryKey: key });
    
    if (result) {
      setActiveEntryData(result);
      toast.success(`Key '${key}' loaded.`);
    } else {
      setEntryError(`Key '${key}' not found or access denied.`);
    }
  };

  const saveEntry = async () => {
    if (!activeEntryData || !activeEntryKey) return;
    const result = await callRobloxAPI('setEntry', { datastoreName: selectedDS, entryKey: activeEntryKey, value: activeEntryData });
    if (result) toast.success("Data pushed to Roblox Cloud");
  };

  const deleteEntry = async () => {
    if (!activeEntryKey || !selectedDS) return;
    if (!confirm("Confirm permanent deletion of this key?")) return;
    const result = await callRobloxAPI('deleteEntry', { datastoreName: selectedDS, entryKey: activeEntryKey });
    if (result) {
      toast.success("Entry deleted");
      setActiveEntryKey("");
      setActiveEntryData(null);
      setEntryError(null);
      fetchKeys(selectedDS);
    }
  };

  const clearDatastore = async () => {
    if (!selectedDS) return toast.error("Please select a DataStore first.");
    if (!confirm(`WARNING: This will delete ALL ${dsKeys.length} keys in '${selectedDS}'. Are you absolutely sure?`)) return;

    let successCount = 0;
    let errorCount = 0;

    for (const key of dsKeys) {
      const result = await callRobloxAPI('deleteEntry', { datastoreName: selectedDS, entryKey: key.key });
      if (result) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    if (errorCount === 0) {
      toast.success(`Successfully cleared all ${successCount} keys from ${selectedDS}.`);
    } else {
      toast.warning(`Cleared ${successCount} keys, but failed to delete ${errorCount} keys.`);
    }
    
    fetchKeys(selectedDS);
  };

  const filteredKeys = dsKeys.filter(k => k.key.toLowerCase().includes(searchKeyFilter.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col space-y-6">
      <CreateKeyForm 
        datastoreName={selectedDS}
        onKeyCreated={handleKeyCreated}
        callRobloxAPI={callRobloxAPI}
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
        initialSchema={settings?.schemas?.[selectedDS]}
      />

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-white">Cloud Data Explorer</h2>
        <div className="flex gap-3">
          <button onClick={clearDatastore} disabled={!selectedDS || dsKeys.length === 0} className="px-4 py-2 bg-red-600/10 text-red-400 rounded-md text-xs font-bold flex items-center gap-2 hover:bg-red-600/20 transition-colors disabled:opacity-50">
            <Trash2 size={14} /> Clear All Keys
          </button>
          <button onClick={() => selectedDS ? setIsCreateModalOpen(true) : toast.error("Please select a DataStore first.")} className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors">
            <Plus size={14} /> New Key
          </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
        <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">1. Select DataStore</label>
            <div className="bg-[#111] border border-white/5 rounded-md max-h-60 overflow-y-auto">
              {datastores.map(ds => (
                <button 
                  key={ds.name} 
                  onClick={() => fetchKeys(ds.name)}
                  className={`w-full text-left px-4 py-3 text-xs border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${selectedDS === ds.name ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-slate-300'}`}
                >
                  {ds.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 flex-grow flex flex-col">
            <label className="text-[10px] font-bold text-slate-500 uppercase">2. Select Key</label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                placeholder="Search keys..." 
                value={searchKeyFilter}
                onChange={e => setSearchKeyFilter(e.target.value)}
                className="w-full h-10 bg-[#111] border border-white/5 rounded-md pl-10 pr-4 text-xs outline-none focus:border-blue-500/50"
              />
            </div>
            <div className="bg-[#111] border border-white/5 rounded-md flex-grow overflow-y-auto max-h-[400px]">
              {isKeysLoading ? (
                <div className="p-4 text-xs text-slate-600 italic flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Loading keys...
                </div>
              ) : filteredKeys.length > 0 ? filteredKeys.map(k => (
                <button 
                  key={k.key} 
                  onClick={() => loadEntry(k.key)}
                  className={`w-full text-left px-4 py-3 text-xs border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${activeEntryKey === k.key ? 'bg-white/5 text-white font-bold' : 'text-slate-400'}`}
                >
                  {k.key}
                </button>
              )) : (
                <div className="p-4 text-xs text-slate-600 italic">Select a DataStore first</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col border border-white/5 rounded-lg bg-[#0d0d0d] overflow-hidden">
          <div className="h-14 bg-[#161616] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-2">
              <FileCode size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-slate-400 truncate max-w-[200px]">
                {activeEntryKey || 'No file selected'}
              </span>
            </div>
            {activeEntryData && (
              <div className="flex items-center gap-3">
                <button onClick={deleteEntry} className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={saveEntry}
                  className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-500 transition-colors"
                >
                  <Save size={14} /> Commit Changes
                </button>
              </div>
            )}
          </div>
          <div className="flex-grow relative">
            {entryError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/10 text-red-400 p-8">
                <AlertCircle size={32} className="mb-4" />
                <p className="text-sm font-bold mb-2">Entry Not Found</p>
                <p className="text-xs text-center">{entryError}</p>
              </div>
            ) : activeEntryData ? (
              <textarea 
                value={typeof activeEntryData === 'string' ? activeEntryData : JSON.stringify(activeEntryData, null, 2)}
                onChange={e => {
                  try { setActiveEntryData(JSON.parse(e.target.value)); } 
                  catch { setActiveEntryData(e.target.value); }
                }}
                className="absolute inset-0 w-full h-full bg-transparent p-6 font-mono text-xs text-emerald-400 outline-none resize-none custom-scrollbar"
                spellCheck={false}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 opacity-50">
                <Gamepad2 size={48} className="mb-4" />
                <p className="text-xs uppercase font-bold tracking-widest">Select a key to edit data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};