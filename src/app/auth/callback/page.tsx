"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleDiscordAuth } from '@/app/actions/auth';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processAuth = async () => {
      const code = searchParams.get('code');
      if (!code) {
        setError('Código de autorização não encontrado.');
        setIsLoading(false);
        return;
      }

      const result = await handleDiscordAuth(code);
      
      if (result.success) {
        router.push('/setup-safety');
      } else {
        setError(result.error || 'Erro desconhecido na autenticação.');
        setIsLoading(false);
      }
    };

    processAuth();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#5865F2] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Verifying Identity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-6">
        <div className="bg-[#141417] p-10 rounded-[2.5rem] border border-red-500/20 max-w-md w-full text-center">
          <h1 className="text-2xl font-black text-white mb-2">Auth Failed</h1>
          <p className="text-white/40 text-sm mb-8">{error}</p>
          <button 
            onClick={() => router.push('/login')}
            className="w-full h-12 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0D]" />}>
      <AuthCallbackContent />
    </Suspense>
  );
}