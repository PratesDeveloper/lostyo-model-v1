"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuthToken, removeAuthCookie } from '@/lib/auth/manual-auth-client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  userId: null,
  isAuthenticated: false,
  isLoading: true,
  logout: () => {},
});

export const ManualAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      
      if (!token) {
        setUserId(null);
        setIsLoading(false);
        return;
      }

      try {
        // No cliente, apenas decodificamos a base64 do JWT para pegar o ID, 
        // a validação real é feita no servidor via middleware/actions
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.userId);
      } catch (error) {
        console.error('Sessão inválida:', error);
        removeAuthCookie();
        setUserId(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    removeAuthCookie();
    setUserId(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        userId, 
        isAuthenticated: !!userId, 
        isLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useManualAuth = () => useContext(AuthContext);