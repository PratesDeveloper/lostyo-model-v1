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
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const next = searchParams.get('next') || '/setup-safety';
      
      // Log para debug
      console.log('Parâmetros recebidos:', { code, next });
      setDebugInfo(`Código recebido: ${code ? 'Sim' : 'Não'}`);

      if (!code) {
        const errorMsg = 'Código de autorização não encontrado';
        console.error(errorMsg);
        setError(errorMsg);
        return;
      }

      try {
        console.log('Iniciando processo de autenticação...');
        setDebugInfo('Trocando código por token...');
        
        const tokenData = await exchangeCodeForToken(code);
        console.log('Token obtido com sucesso:', tokenData);
        setDebugInfo('Token obtido, criando JWT...');
        
        const jwtToken = await createJWT(tokenData);
        console.log('JWT criado com sucesso');
        setDebugInfo('JWT criado, definindo cookie...');
        
        setAuthCookie(jwtToken);
        console.log('Cookie de autenticação definido');
        setDebugInfo('Cookie definido, salvando no Supabase...');
        
        // Upsert user data to Supabase
        const { error: upsertError } = await supabase.from('users').upsert({
          id: tokenData.user.id,
          username: tokenData.user.username,
          avatar: tokenData.user.avatar,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString()
        }, {
          onConflict: 'id'
        });
        
        if (upsertError) {
          console.error('Erro ao salvar usuário no Supabase:', upsertError);
          setError(`Erro ao salvar dados do usuário: ${upsertError.message}`);
          return;
        }
        
        console.log('Usuário salvo no Supabase com sucesso');
        setDebugInfo('Autenticação concluída, redirecionando...');
        router.push(next);
      } catch (err: any) {
        console.error('Erro completo na autenticação:', err);
        const errorMsg = `Falha na autenticação: ${err.message || 'Erro desconhecido'}. Tente novamente.`;
        setError(errorMsg);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center text-center">
      <div className="p-8 bg-[#141417] rounded-[2.5rem] max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Erro</h1>
        <p className="text-white/60 mb-6">{error}</p>
        {debugInfo && (
          <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-3 mb-4">
            <p className="text-red-300 text-xs">{debugInfo}</p>
          </div>
        )}
        <button 
          onClick={() => router.push('/login')} 
          className="px-6 py-3 bg-[#5865F2] text-white rounded-full font-medium"
        >
          Voltar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center text-center">
      <div className="w-16 h-16 border-4 border-[#5865F2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <div>
        <p className="text-white/60 mb-2">Autenticando...</p>
        {debugInfo && (
          <p className="text-white/40 text-sm">{debugInfo}</p>
        )}
      </div>
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