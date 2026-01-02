"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(2, "Tell us what you're building"),
  message: z.string().min(10, "Please provide a bit more detail"),
});

interface ContactModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const ContactModal = ({ isOpen, setIsOpen }: ContactModalProps) => {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", projectType: "", message: "" },
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    // Simulando envio
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Inquiry sent:", values);
    toast.success("Inquiry received! Our team will contact you soon.");
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] bg-[#0D0D0F] border-white/10 text-white rounded-[2rem] p-8">
        <DialogHeader className="mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-4">
            <Send size={20} />
          </div>
          <DialogTitle className="text-3xl font-black tracking-tighter uppercase">Start a Project</DialogTitle>
          <p className="text-white/30 text-sm font-medium">Tell us about your vision and let's build something extraordinary.</p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Full Name" className="bg-white/5 border-white/5 rounded-xl h-12 text-sm focus:border-blue-500/50" {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email Address" className="bg-white/5 border-white/5 rounded-xl h-12 text-sm focus:border-blue-500/50" {...field} />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Project Category (e.g., RPG, Simulator, UI Design)" className="bg-white/5 border-white/5 rounded-xl h-12 text-sm focus:border-blue-500/50" {...field} />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your requirements, budget, and timeline..." 
                      className="bg-white/5 border-white/5 rounded-xl min-h-[120px] text-sm focus:border-blue-500/50 resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting}
              className="w-full h-14 bg-white text-black hover:bg-blue-500 hover:text-white rounded-xl font-black uppercase tracking-widest text-[11px] transition-all"
            >
              {form.formState.isSubmitting ? "Transmitting..." : "Send Inquiry"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};