import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login();
      navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4 relative">
      {/* Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/IntegraLogo.png"
          alt="Integra"
          className="w-[800px] h-[800px] object-contain opacity-[0.05] dark:opacity-[0.03]"
        />
      </div>

      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4">
            <img
              src="/IntegraLogo.png"
              alt="Integra"
              className="w-24 h-24 object-contain mx-auto"
            />
          </div>
          <CardTitle className="text-2xl">Integra</CardTitle>
          <CardDescription>
            Sistema de Prontuário de Atendimentos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            size="lg"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Acesso Temporário (DEV)
          </Button>

          <Button
            className="w-full"
            variant="outline"
            size="lg"
            disabled
          >
            Entrar com Google (Em breve)
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Use "Acesso Temporário" para testar o sistema
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
