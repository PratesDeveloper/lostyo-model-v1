"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';
import { toast } from 'sonner';

// Schema Zod para validação do formulário de entrada
const formSchema = z.object({
  keyName: z.string().min(3, { message: "Key name must be at least 3 characters." }),
  userId: z.string().regex(/^\d+$/, { message: "User ID must be a number." }),
});

interface CreateKeyFormProps {
  datastoreName: string;
  onKeyCreated: (keyName: string) => void;
  callRobloxAPI: (action: string, params: any) => Promise<any>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialSchema?: any; // Novo prop para o schema do Supabase
}

// Schema padrão de fallback (se não houver nada no Supabase)
const defaultFallbackSchema = {
  ActionHistory: [],
  Bits: 10000000,
  JoinDate: 0,
  CreatedTokensList: [],
  Inventory: [],
  RedeemedCodes: [],
  Settings: { Notifications: true, TradeConfirmation: true },
  Statistics: { HighestBalanceEver: 10, PlayTime: 0, TokensCreatedCount: 0, TotalTrades: 0, TotalVolumeTraded: 0 },
  UserId: 0,
};

export const CreateKeyForm = ({ datastoreName, onKeyCreated, callRobloxAPI, isOpen, setIsOpen, initialSchema }: CreateKeyFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyName: "",
      userId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!datastoreName) {
      toast.error("Please select a DataStore first.");
      return;
    }

    try {
      // Usa o schema do Supabase ou o fallback
      const baseSchema = initialSchema || defaultFallbackSchema;
      
      // Constrói o objeto de dados, sobrescrevendo campos dinâmicos
      const initialData = {
        ...baseSchema,
        UserId: parseInt(values.userId),
        JoinDate: Math.floor(Date.now() / 1000), // Garante timestamp atual
      };

      const entryKey = values.keyName;

      // Cria a nova entrada na Roblox Cloud
      const result = await callRobloxAPI('setEntry', { 
        datastoreName, 
        entryKey, 
        value: initialData 
      });

      if (result) {
        toast.success(`New key '${entryKey}' created successfully.`);
        onKeyCreated(entryKey);
        setIsOpen(false);
        form.reset();
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to create key. Check console for details.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-[#111] border-white/10 text-white rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Create New Data Entry</DialogTitle>
          <p className="text-sm text-slate-400">
            DataStore: <span className="font-mono text-blue-400">{datastoreName || 'N/A'}</span>
          </p>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="keyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Entry Key Name (e.g., Player_12345)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter unique key name" 
                      className="bg-black/20 border-white/10 text-white focus:border-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Initial User ID (for schema)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Roblox User ID (e.g., 7468377959)" 
                      className="bg-black/20 border-white/10 text-white focus:border-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-4 bg-white/5 border border-white/10 rounded-md text-xs text-slate-400">
                <p className="font-bold text-white mb-1">Schema Source:</p>
                <ul className="list-disc list-inside space-y-0.5">
                    <li>{initialSchema ? <span className="text-emerald-400">Using custom schema from Supabase.</span> : <span className="text-yellow-400">Using default fallback schema.</span>}</li>
                    <li><span className="text-blue-400">JoinDate</span> set to current Unix Timestamp.</li>
                </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2"
              disabled={!datastoreName || form.formState.isSubmitting}
            >
              <Save size={16} />
              {form.formState.isSubmitting ? 'Creating...' : 'Create Entry'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};