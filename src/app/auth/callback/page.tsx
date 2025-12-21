"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { exchangeCodeForToken, createJWT, setAuthCookie } from '@/lib/auth/manual-auth';
import { supabase } from '@/integrations/supabase/client';

// 1. Criamos um componente interno para a lógica
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const next = searchParams.get('next') || '/setup-safety';

      if (!code) {
        setError('Código de autorização não encontrado');
        return;
      }

      try {
        const tokenData = await exchangeCodeForToken(code);
        const jwtToken = await createJWT(tokenData);
        setAuthCookie(jwtToken);
        
        await supabase.from('users').upsert({
          id: tokenData.user.id,
          username: tokenData.user.username,
          avatar: tokenData.user.avatar,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
        }, { onConflict: 'id' });

        router.push(next);
      } catch (err) {
        setError('Falha na autenticação. Tente novamente.');
      }
    };
    handleCallback();
  }, [searchParams, router]);

  if (error) return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center text-center">
      <div className="p-8 bg-[#141417] rounded-[2.5rem] max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Erro</h1>
        <p className="text-white/60 mb-6">{error}</p>
        <button onClick={() => router.push('/login')} className="px-6 py-3 bg-[#5865F2] text-white rounded-full font-medium">Voltar</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center text-center">
      <div className="w-16 h-16 border-4 border-[#5865F2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/60">Autenticando...</p>
    </div>
  );
}

// 2. Exportamos a página envolvida em Suspense
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0D]" />}>
      <AuthCallbackContent />
    </Suspense>
  );
}