// AuthContext.tsx
import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: { email: string } | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
