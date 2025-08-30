// AuthProvider.tsx - DEMO MODE (Supabase disabled due to module conflicts)
import type { User } from '@supabase/supabase-js';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // DEMO MODE - Bypass Supabase until module issues resolved
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'demo-user',
    email: 'demo@teaomarama.nz',
    aud: 'authenticated',
    role: 'authenticated', 
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_metadata: {
      name: 'Demo User',
      role: 'educator',
      cultural_clearance: 'approved'
    },
    app_metadata: {},
    identities: []
  } as User);
  const [loading] = useState(false);

  useEffect(() => {
    // Demo mode - skip Supabase auth checks
    console.log('🎭 Demo Mode: Authentication bypassed for showcase');
    // Already set authenticated in state initialization
  }, []);

  const login = async () => {
    // Demo mode - simulate successful login
    console.log('🎭 Demo Mode: Login simulated');
    setIsAuthenticated(true);
    return { error: null };
  };

  const logout = async () => {
    // Demo mode - simulate logout
    console.log('🎭 Demo Mode: Logout simulated');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const signUp = async () => {
    // Demo mode - simulate successful signup
    console.log('🎭 Demo Mode: Signup simulated');
    return { error: null, user: currentUser };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
