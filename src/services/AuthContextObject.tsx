import { createContext } from 'react';
import type { User } from 'firebase/auth';

export interface AuthContextType {
  currentUser: User | null;
  session: User | null; // Firebase User as session
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ data: { user: User | null }, error: any }>;
  logIn: (email: string, password: string) => Promise<{ data: { user: User | null }, error: any }>;
  logOut: () => Promise<{ error: any }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
