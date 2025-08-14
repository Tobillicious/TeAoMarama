import { createContext } from 'react';
import type { Session, User, AuthResponse, AuthError } from '@supabase/supabase-js';

export interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  logIn: (email: string, password: string) => Promise<AuthResponse>;
  logOut: () => Promise<{ error: AuthError | null }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
