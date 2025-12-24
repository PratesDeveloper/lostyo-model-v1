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

      // Validação básica de CSRF manual
      if (state !== savedState) {
        console.error('CSRF State mismatch');
        router.push('/login');
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
            Cookies.set('lostyo_logged_in', 'true', { expires: 7 });
            router.push('/start');
          } else {
            router.push('/login');
          }
        } catch (err) {
          router.push('/login');
        }
      } else {
        router.push('/login');
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