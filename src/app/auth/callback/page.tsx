"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { exchangeCodeForToken, createJWT, setAuthCookie } from '@/lib/auth/manual-auth';

export default function AuthCallbackPage() {
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
        // 1. Trocar o código por um access token do Discord
        const tokenData = await exchangeCodeForToken(code);
        
        // 2. Criar um JWT personalizado com os dados do usuário
        const jwtToken = await createJWT(tokenData);
        
        // 3. Armazenar o JWT em um cookie
        setAuthCookie(jwtToken);
        
        // 4. Redirecionar para a página de destino
        router.push(next);
      } catch (err) {
        console.error('Erro durante a autenticação:', err);
        setError('Falha na autenticação. Por favor, tente novamente.');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <div className="text-center p-8 bg-[#141417] rounded-[2.5rem] max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-4">Erro de Autenticação</h1>
          <p className="text-white/60 mb-6">{error}</p>
          <button 
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-[#5865F2] text-white rounded-full font-medium hover:bg-[#4752C4] transition-colors"
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#5865F2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/60">Autenticando...</p>
      </div>
    </div>
  );
}