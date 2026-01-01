"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Database, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Cores customizadas para o tema
const HIGHLIGHT = 'bg-blue-500';

const formSchema = z.object({
  datastoreName: z.string().min(3, { message: "Name must be at least 3 characters." }).regex(/^[a-zA-Z0-9_]+$/, { message: "Only letters, numbers, and underscores are allowed." }),
  initialKeyName: z.string().min(3, { message: "Initial key name must be at least 3 characters." }),
  initialUserId: z.string().regex(/^\d+$/, { message: "User ID must be a number." }),
});

interface CreateDatastoreModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDatastoreCreated: (name: string) => void;
  callRobloxAPI: (action: string, params: any) => Promise<any>;
  updateSettings: (updates: any) => Promise<void>;
  currentSettings: any;
}

// Schema padrão para inicialização
const defaultSchema = {
  ActionHistory: [],
  Bits: 10000000,
  JoinDate: 0, // Placeholder for current timestamp
  CreatedTokensList: [],
  Inventory: [],
  RedeemedCodes: [],
  Settings: { Notifications: true, TradeConfirmation: true },
  Statistics: { HighestBalanceEver: 10, PlayTime: 0, TokensCreatedCount: 0, TotalTrades: 0, TotalVolumeTraded: 0 },
  UserId: 0, // Placeholder for initial user ID
};

export const CreateDatastoreModal = ({ isOpen, setIsOpen, onDatastoreCreated, callRobloxAPI, updateSettings, currentSettings }: CreateDatastoreModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datastoreName: "",
      initialKeyName: "Player_12345",
      initialUserId: "7468377959",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dsName = values.datastoreName;
    const entryKey = values.initialKeyName;

    try {
      // 1. Constrói o objeto de dados baseado no schema padrão
      const initialData = {
        ...defaultSchema,
        JoinDate: Math.floor(Date.now() / 1000),
        UserId: parseInt(values.initialUserId),
      };

      // 2. Cria a primeira entrada na Roblox Cloud (isso força a criação do DataStore)
      const result = await callRobloxAPI('setEntry', { 
        datastoreName: dsName, 
        entryKey, 
        value: initialData 
      });

      if (result) {
        // 3. Salva o schema inicial no Supabase
        const newSchemas = { ...currentSettings.schemas, [dsName]: initialData };
        await updateSettings({ schemas: newSchemas });

        toast.success(`DataStore '${dsName}' created and initialized.`);
        onDatastoreCreated(dsName);
        setIsOpen(false);
        form.reset();
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to create DataStore. Check API key permissions.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gray-700 border-gray-600 text-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2"><Database size={20} /> Create New DataStore</DialogTitle>
          <p className="text-sm text-gray-400">This action initializes the DataStore in Roblox Cloud by creating the first key.</p>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="datastoreName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">DataStore Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., PlayerData" 
                      className="bg-gray-800 border-gray-600 text-white focus:border-blue-500 rounded-lg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="initialKeyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">Initial Key Name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="e.g., Player_123" 
                                    className="bg-gray-800 border-gray-600 text-white focus:border-blue-500 rounded-lg" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="initialUserId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-300">Initial User ID</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="Roblox User ID" 
                                    className="bg-gray-800 border-gray-600 text-white focus:border-blue-500 rounded-lg" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg text-xs text-yellow-400 flex items-start gap-3">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <p>The initial key will be created using the default schema to ensure the DataStore is immediately available for use.</p>
            </div>

            <Button 
              type="submit" 
              className={`w-full ${HIGHLIGHT} hover:bg-blue-600 text-white font-bold flex items-center gap-2 rounded-lg`}
              disabled={form.formState.isSubmitting}
            >
              <Save size={16} />
              {form.formState.isSubmitting ? 'Initializing...' : 'Create DataStore'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};