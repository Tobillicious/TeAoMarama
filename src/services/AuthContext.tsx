import { useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { AuthContext } from './AuthContextObject.tsx';
import { supabase } from '../supabaseClient';

// AuthContext moved to AuthContextObject.tsx

// useAuth moved to useAuth.ts

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    // Fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setCurrentUser(session?.user ?? null);
        setLoading(false);
    });


    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) => {
    return supabase.auth.signUp({ email, password });
  };

  const logIn = (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const logOut = () => {
    return supabase.auth.signOut();
  };

  const value = {
    currentUser,
    session,
    loading,
    signUp,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
