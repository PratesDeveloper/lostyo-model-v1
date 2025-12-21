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
  const [isLoading, setIsLoading] = useState(true); // Adicionado estado de loading

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const next = searchParams.get('next') || '/setup-safety';
      
      if (!code) {
        setError('Código de autorização não encontrado');
        setIsLoading(false); // Finaliza o loading em caso de erro
        return;
      }

      try {
        console.log('Iniciando processo de autenticação...');
        
        const tokenData = await exchangeCodeForToken(code);
        console.log('Token obtido com sucesso:', tokenData);
        
        const jwtToken = await createJWT(tokenData);
        console.log('JWT criado com sucesso');
        
        setAuthCookie(jwtToken);
        console.log('Cookie de autenticação definido');
        
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
          setIsLoading(false); // Finaliza o loading em caso de erro
          return;
        }
        
        console.log('Usuário salvo no Supabase com sucesso');
        router.push(next);
      } catch (err: any) {
        console.error('Erro completo na autenticação:', err);
        setError(`Falha na autenticação: ${err.message || 'Erro desconhecido'}. Tente novamente.`);
        setIsLoading(false); // Finaliza o loading em caso de erro
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center text-center">
        <div className="w-16 h-16 border-4 border-[#5865F2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/60">Autenticando...</p>
      </div>
    );
  }

  if (error) return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center text-center">
      <div className="p-8 bg-[#141417] rounded-[2.5rem] max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Erro</h1>
        <p className="text-white/60 mb-6">{error}</p>
        <button 
          onClick={() => router.push('/login')} 
          className="px-6 py-3 bg-[#5865F2] text-white rounded-full font-medium"
        >
          Voltar
        </button>
      </div>
    </div>
  );

  // Se não houver erro e não estiver carregando, o redirecionamento já aconteceu.
  // Este return é um fallback caso algo inesperado ocorra.
  return null; 
}

// 2. Exportamos a página envolvida em Suspense
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0D]" />}>
      <AuthCallbackContent />
    </Suspense>
  );
}