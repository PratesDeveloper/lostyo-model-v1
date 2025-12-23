"use client";

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      // Salva um marcador de login no cookie (expira em 7 dias)
      Cookies.set('lostyo_logged_in', 'true', { expires: 7 });
      
      // Opcional: Você pode salvar o código ou processar em sua API aqui
      // Para o frontend, o marcador de cookie já satisfaz o "Passo 1"
    }
    
    router.push('/start');
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