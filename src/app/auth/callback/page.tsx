"use client";

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    
    const handleAuth = async () => {
      if (code) {
        // O Supabase ainda pode trocar esse código por uma sessão se o provedor estiver configurado
        await supabase.auth.exchangeCodeForSession(code);
      }
      router.push('/start');
    };

    handleAuth();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
        <p className="text-white/40">Securing your session...</p>
      </div>
    </div>
  );
}