// AuthProvider.tsx
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);

  const login = async (email: string, password: string) => {
    // For now, just set authenticated to true
    // In a real implementation, you would validate credentials here
    console.log('Login attempt for:', email, 'with password length:', password.length);
    setIsAuthenticated(true);
    setCurrentUser({ email });
    return { error: null };
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
