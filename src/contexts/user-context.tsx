"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in via cookie
    const loggedIn = Cookies.get('lostyo_logged_in') === 'true';
    if (loggedIn) {
      // In a real app, you would fetch user data from an API
      // For now, we'll use mock data
      setUser({
        id: "1",
        name: "User",
        avatar: "https://cdn.lostyo.com/logo.png"
      });
    }
  }, []);

  const logout = () => {
    Cookies.remove('lostyo_logged_in');
    setUser(null);
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        setUser, 
        isAuthenticated: !!user,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}