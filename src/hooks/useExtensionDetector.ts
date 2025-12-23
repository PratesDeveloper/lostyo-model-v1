"use client";
import { useEffect, useState } from 'react';

export function useExtensionDetector() {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Método antigo/clássico: verificação por intervalo
    const checkInterval = setInterval(() => {
      if (document.getElementById('lostyo-extension-installed')) {
        setIsInstalled(true);
        clearInterval(checkInterval);
      }
    }, 1000);

    // Checagem imediata
    if (document.getElementById('lostyo-extension-installed')) {
      setIsInstalled(true);
      clearInterval(checkInterval);
    }

    return () => clearInterval(checkInterval);
  }, []);

  return isInstalled;
}