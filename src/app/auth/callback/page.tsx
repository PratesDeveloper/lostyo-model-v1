"use client";

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleManualAuth = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const savedState = localStorage.getItem('discord_oauth_state');

      // Limpa o estado CSRF imediatamente
      localStorage.removeItem('discord_oauth_state');

      // 1. Validação básica de CSRF manual
      if (!state || state !== savedState) {
        console.error('CSRF State mismatch or missing state');
        router.replace('/login'); // Usando replace para evitar histórico
        return;
      }

      if (code) {
        try {
          const response = await fetch('/api/auth/exchange', {
            method: 'POST',
            body: JSON.stringify({ code }),
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (response.ok) {
            // 2. Sucesso: Seta cookie e redireciona
            Cookies.set('lostyo_logged_in', 'true', { expires: 7 });
            router.replace('/start');
          } else {
            // 3. Falha na troca de token
            console.error('Token exchange failed:', await response.json());
            router.replace('/login');
          }
        } catch (err) {
          // 4. Erro de rede/API
          console.error('Network error during auth:', err);
          router.replace('/login');
        }
      } else {
        // 5. Código ausente
        router.replace('/login');
      }
    };

    handleManualAuth();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Verifying Direct Access...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0D]" />}>
      <AuthContent />
    </Suspense>
  );
}