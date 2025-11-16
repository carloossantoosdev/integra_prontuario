import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // ============================================
  // AUTENTICAÇÃO COMENTADA TEMPORARIAMENTE
  // Para reativar, descomente o bloco abaixo
  // ============================================
  
  /* 
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  */

  // Retorna direto os children sem verificar autenticação
  return <>{children}</>;
}
