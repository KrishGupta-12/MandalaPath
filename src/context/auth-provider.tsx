'use client';
import { createContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd check for a token in localStorage or a cookie
    // For now, we simulate checking auth status and start with no user.
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
