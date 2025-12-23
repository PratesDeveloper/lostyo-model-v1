"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('discord_token');
      
      if (token) {
        try {
          // Fetch user data from Discord API
          const response = await fetch('https://discord.com/api/users/@me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser({
              id: userData.id,
              username: userData.username,
              avatar: userData.avatar 
                ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` 
                : `https://cdn.discordapp.com/embed/avatars/${userData.discriminator % 5}.png`,
              discriminator: userData.discriminator
            });
          } else {
            // Token is invalid, remove it
            Cookies.remove('discord_token');
            Cookies.remove('lostyo_logged_in');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Remove invalid tokens
          Cookies.remove('discord_token');
          Cookies.remove('lostyo_logged_in');
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const logout = () => {
    Cookies.remove('discord_token');
    Cookies.remove('lostyo_logged_in');
    setUser(null);
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        setUser, 
        isAuthenticated: !!user,
        logout,
        isLoading
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