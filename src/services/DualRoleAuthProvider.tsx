import React, { createContext, useContext, type ReactNode } from 'react';

// User roles and their capabilities
export type UserRole = 'teacher' | 'student' | 'admin' | 'kaitiaki';
export type CulturalClearance = 'basic' | 'approved' | 'kaitiaki';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  culturalClearance: CulturalClearance;
  school?: string;
  grade?: string;
  subjects?: string[];
  iwiAffiliations?: string[];
  createdAt: string;
  lastLogin: string;
}

interface SignUpData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  school?: string;
  grade?: string;
  subjects?: string[];
  iwiAffiliations?: string[];
}

interface AuthContextType {
  // Authentication state
  isAuthenticated: boolean;
  currentUser: User | null;
  isLoading: boolean;

  // Authentication methods
  login: (
    email: string,
    password: string,
    role: UserRole,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  signUp: (userData: SignUpData) => Promise<{ success: boolean; error?: string }>;

  // User management
  updateUserProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  getUserRole: () => UserRole | null;
  hasPermission: (permission: string) => boolean;

  // Additional methods needed by components
  switchToDemoMode?: () => void;
  getRoleBasedFeatures?: () => string[];
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a DualRoleAuthProvider');
  }
  return context;
};

interface DualRoleAuthProviderProps {
  children: ReactNode;
}

export const DualRoleAuthProvider: React.FC<DualRoleAuthProviderProps> = ({ children }) => {
  // Temporarily disable auth system to fix React hook errors
  console.log('DualRoleAuthProvider: Temporarily disabled to fix React hook errors');

  // Return a simple context provider that doesn't use hooks
  const contextValue: AuthContextType = {
    isAuthenticated: false,
    currentUser: null,
    isLoading: false,
    login: async () => ({ success: false, error: 'Auth system temporarily disabled' }),
    logout: async () => {},
    signUp: async () => ({ success: false, error: 'Auth system temporarily disabled' }),
    updateUserProfile: async () => ({ success: false, error: 'Auth system temporarily disabled' }),
    getUserRole: () => null,
    hasPermission: () => false,
    switchToDemoMode: () => {},
    getRoleBasedFeatures: () => [],
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default DualRoleAuthProvider;
