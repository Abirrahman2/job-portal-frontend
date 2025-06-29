'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { User, AuthContextType } from '@/lib/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, initialUser }: { children: ReactNode; initialUser: User | null }) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!initialUser) {
        setLoading(false);
    }
  }, [initialUser])

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      
      await api.post('/auth/login', { email, password });
      const { data: profileData } = await api.get<User>('/users/profile');
      setUser(profileData);
      
      switch (profileData.role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'recruiter':
          router.push('/recruiter/dashboard'); 
          break;
        default:
          router.push('/user/dashboard'); 
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      router.push('/login'); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};