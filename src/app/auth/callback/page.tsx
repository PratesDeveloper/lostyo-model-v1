"use client";

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

// Componente interno com a lógica do useSearchParams
function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      Cookies.set('lostyo_logged_in', 'true', { expires: 7 });
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

// Componente principal exportado com o Boundary de Suspense
export default function AuthCallbackPage() {
  return (
    // O fallback é renderizado enquanto os parâmetros da URL carregam
    <Suspense fallback={<div className="min-h-screen bg-[#0B0B0D]" />}>
      <AuthContent />
    </Suspense>
  );
}