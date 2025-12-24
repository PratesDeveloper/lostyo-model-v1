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
      
      if (code) {
        try {
          const response = await fetch('/api/auth/exchange', {
            method: 'POST',
            body: JSON.stringify({ code }),
            headers: { 'Content-Type': 'application/json' }
          });
          
          if (response.ok) {
            const data = await response.json();
            // Sucesso
            Cookies.set('lostyo_logged_in', 'true', { expires: 7 });
            
            // Verifica se o perfil já completou o onboarding
            if (data.user?.onboarding_complete) {
              Cookies.set('lostyo_onboarding_done', 'true', { expires: 365 });
              router.replace('/dashboard');
            } else {
              router.replace('/start');
            }
          } else {
            router.replace('/login');
          }
        } catch (err) {
          router.replace('/login');
        }
      } else {
        router.replace('/login');
      }
    };

    handleManualAuth();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-6" />
        <h2 className="text-white font-black text-xl tracking-tight mb-2">Syncing with Discord</h2>
        <p className="text-white/30 font-bold uppercase tracking-[0.3em] text-[10px]">Just a moment...</p>
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