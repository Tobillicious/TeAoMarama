import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  aud: string;
  role: string;
  created_at: string;
  updated_at: string;
  user_metadata: {
    name: string;
    role: string;
    cultural_clearance: string;
  };
  app_metadata: Record<string, any>;
  identities: any[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: () => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  signUp: () => Promise<{ error: string | null; user?: User | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const SimpleAuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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
      cultural_clearance: 'approved',
    },
    app_metadata: {},
    identities: [],
  });
  const [loading] = useState(false);

  useEffect(() => {
    console.log('🎭 Simple Auth: Demo mode active');
  }, []);

  const login = async () => {
    console.log('🎭 Simple Auth: Login simulated');
    setIsAuthenticated(true);
    return { error: null };
  };

  const logout = async () => {
    console.log('🎭 Simple Auth: Logout simulated');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const signUp = async () => {
    console.log('🎭 Simple Auth: Signup simulated');
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

export const useSimpleAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
};
