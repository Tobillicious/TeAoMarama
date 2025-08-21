// AuthContext.tsx
import type { User } from '@supabase/supabase-js';
import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
  ) => Promise<{ error: string | null; user?: User | null }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
