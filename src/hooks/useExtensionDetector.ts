"use client";
import { useEffect, useState } from 'react';

export function useExtensionDetector() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Função de checagem
    const check = () => {
      if (document.getElementById('lostyo-extension-installed')) {
        setIsInstalled(true);
      }
    };

    // 1. Checa imediatamente (caso a extensão tenha carregado antes)
    check();

    // 2. Escuta o evento (caso a extensão carregue milissegundos depois)
    window.addEventListener('lostyo-ready', check);

    // 3. Fallback: Tenta checar novamente após 1s (garantia)
    const timer = setTimeout(check, 1000);

    return () => {
      window.removeEventListener('lostyo-ready', check);
      clearTimeout(timer);
    };
  }, []);

  return isInstalled;
}