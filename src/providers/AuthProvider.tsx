import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { pocketbaseClient } from '@/utils/pocketbaseClient';
import { toast } from 'sonner';

interface User {
  id: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async (): Promise<boolean> => {
    try {
      // Verificar se há um token temporário de desenvolvimento
      const tempAuth = localStorage.getItem('temp_auth');
      if (tempAuth === 'true') {
        setUser({ id: 'temp', email: 'dev@integra.local', name: 'Dev User' });
        return true;
      }

      // Verificar autenticação do PocketBase
      if (pocketbaseClient.authStore.isValid) {
        const authData = pocketbaseClient.authStore.model;
        if (authData) {
          setUser(authData as User);
          return true;
        }
      }

      setUser(null);
      return false;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setUser(null);
      return false;
    }
  };

  const login = async () => {
    try {
      // Login temporário de desenvolvimento
      localStorage.setItem('temp_auth', 'true');
      setUser({ id: 'temp', email: 'dev@integra.local', name: 'Dev User' });
      toast.success('Login realizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      toast.error(error?.message || 'Erro ao fazer login');
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('temp_auth');
      pocketbaseClient.authStore.clear();
      setUser(null);
      toast.success('Logout realizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

