import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContextObject.tsx';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    return { data: { user: null, session: null }, error: null };
  };

  const logIn = async () => {
    return { data: { user: null, session: null }, error: null };
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
