"use client";

import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Redireciona para a página de segurança após o login
      router.push('/setup-safety');
    }
  }, [session, router]);

  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: 'guilds identify guilds.join',
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#141417] p-8 rounded-[2.5rem] border border-white/5"
      >
        <div className="text-center mb-8">
          <img src="/apple-touch-icon.png" alt="LostyoCord" className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-black text-white">Welcome back</h1>
          <p className="text-white/40 text-sm">Sign in with Discord to manage your communities.</p>
        </div>
        
        <Button
          onClick={handleDiscordLogin}
          className="w-full h-12 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-3"
        >
          <LogIn size={20} />
          Continue with Discord
        </Button>
      </motion.div>
    </div>
  );
}