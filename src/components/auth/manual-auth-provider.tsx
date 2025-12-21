"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuthToken, verifyJWT } from '@/lib/auth/manual-auth';
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
    const checkAuth = async () => {
      const token = getAuthToken();
      
      if (!token) {
        setUserId(null);
        setIsLoading(false);
        return;
      }

      try {
        const payload = await verifyJWT(token);
        setUserId(payload.userId);
      } catch (error) {
        console.error('Token inválido:', error);
        setUserId(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    // Remover o cookie de autenticação
    document.cookie = `auth-token=; Path=/; HttpOnly=false; Secure=true; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setUserId(null);
    router.push('/login');
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