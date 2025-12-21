"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { motion } from 'framer-motion';
import { Discord } from 'lucide-react'; // Usando um ícone genérico, já que o Discord não está disponível no Lucide

export default function LoginPage() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Redireciona para a página de segurança após o login
      router.push('/setup-safety');
    }
  }, [session, router]);

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
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#5865F2',
                  brandAccent: '#4752C4',
                  inputBackground: 'rgba(255,255,255,0.05)',
                  inputText: 'white',
                }
              }
            }
          }}
          theme="dark"
          providers={['discord']}
          onlyThirdPartyProviders={true} // Garante que apenas provedores de terceiros sejam mostrados
          redirectTo={`${window.location.origin}/auth/callback`}
        />
      </motion.div>
    </div>
  );
}