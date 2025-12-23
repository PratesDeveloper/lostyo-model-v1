"use client";

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      // Chamar a API interna para trocar o código
      fetch('/api/auth/exchange', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => res.json())
      .then(data => {
        if (data.user_id) {
          Cookies.set('lostyo_logged_in', 'true', { expires: 7 });
          Cookies.set('discord_user_id', data.user_id, { expires: 7 });
          router.push('/start');
        } else {
          router.push('/login?error=exchange_failed');
        }
      })
      .catch(() => router.push('/login?error=network_error'));
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
        <h2 className="text-white text-xl font-bold mb-2">Authenticating...</h2>
        <p className="text-white/40">Securing your Discord session.</p>
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