import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContextObject.tsx';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser] = useState(null);
  const [loading] = useState(false); // Set to false to avoid loading state

  // Simplified auth provider for ERO hui - Firebase disabled temporarily
  const signUp = async () => {
    return { data: { user: null }, error: { message: 'Auth temporarily disabled' } };
  };

  const logIn = async () => {
    return { data: { user: null }, error: { message: 'Auth temporarily disabled' } };
  };

  const logOut = async () => {
    return { error: null };
  };

  const value = {
    currentUser,
    session: null,
    loading,
    signUp,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
