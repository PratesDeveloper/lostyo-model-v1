"use client";

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie'; // Usaremos js-cookie para gerenciar cookies no lado do cliente

// Substitua pela URL real do seu backend que troca o código por tokens
// Por enquanto, vamos simular a troca e o retorno de tokens
const exchangeCodeForToken = async (code: string) => {
  console.log("Exchanging code for tokens:", code);
  // Em um cenário real, você faria uma requisição para o seu backend aqui.
  // Exemplo:
  // const response = await fetch('/api/auth/discord/token', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ code }),
  // });
  // if (!response.ok) throw new Error('Failed to exchange code');
  // const data = await response.json();
  // return { accessToken: data.access_token, refreshToken: data.refresh_token };

  // Simulação: Retorna tokens fictícios após um pequeno delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    accessToken: `mock_access_token_${Date.now()}`,
    refreshToken: `mock_refresh_token_${Date.now()}`,
    expiresIn: 1209600 // 14 dias em segundos
  };
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error("Discord OAuth Error:", error);
      // Redirecionar para a página de erro ou de volta para o início com uma mensagem
      router.push('/start?error=discord_auth_failed');
      return;
    }

    if (code) {
      exchangeCodeForToken(code)
        .then(({ accessToken, refreshToken, expiresIn }) => {
          // Salva os tokens em cookies com expiração de 14 dias
          const expires = new Date(new Date().getTime() + expiresIn * 1000);
          Cookies.set('discord_access_token', accessToken, { expires: 14, secure: true, sameSite: 'Lax' });
          Cookies.set('discord_refresh_token', refreshToken, { expires: 14, secure: true, sameSite: 'Lax' });
          console.log("Tokens saved to cookies.");
          
          // Redireciona para a página /start
          router.push('/start');
        })
        .catch((err) => {
          console.error("Error exchanging code for token:", err);
          router.push('/start?error=token_exchange_failed');
        });
    } else {
      // Se não houver código nem erro, algo deu errado. Redireciona.
      console.error("No code or error found in callback URL.");
      router.push('/start?error=invalid_callback');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#5865F2] w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Authenticating...</h1>
        <p className="text-white/40">Please wait while we set up your session.</p>
      </div>
    </div>
  );
}