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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #eef6f7 0%, #f7fbfc 50%, #eaf2f2 100%)' }}>
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(27, 160, 164, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(144, 188, 33, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(39, 94, 101, 0.05) 0%, transparent 80%)`
        }} />
      </div>

      {/* Floating Logo Background */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src="/integra-symbol.svg"
          alt=""
          className="w-[600px] h-[600px] object-contain opacity-[0.03]"
        />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md relative z-10 shadow-xl border-none">
        <CardHeader className="space-y-4 text-center pt-8 pb-6">
          {/* Logo com gradiente de fundo */}
          <div className="mx-auto mb-2 p-4 rounded-2xl" style={{
            background: 'linear-gradient(135deg, rgba(27, 160, 164, 0.1) 0%, rgba(39, 94, 101, 0.1) 100%)'
          }}>
            <img
              src="/Logo.png"
              alt="Integra"
              className="h-20 object-contain mx-auto"
            />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold mb-2" style={{ color: 'var(--integra-primary-darkest)' }}>
              Integra Prontuário
            </CardTitle>
            <CardDescription className="text-base" style={{ color: 'var(--integra-text-nav)' }}>
              Sistema de gerenciamento de atendimentos
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-8">
          <Button
            className="w-full h-12 text-base font-medium shadow-md hover:shadow-lg transition-all"
            size="lg"
            onClick={handleLogin}
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #1ba0a4 0%, #15777a 100%)',
              color: 'white'
            }}
          >
            {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {loading ? 'Entrando...' : 'Acessar Sistema'}
          </Button>

          <Button
            className="w-full h-12"
            variant="outline"
            size="lg"
            disabled
            style={{ borderColor: 'var(--color-border)' }}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google (Em breve)
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" style={{ borderColor: 'var(--color-border)' }} />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ambiente de desenvolvimento
              </span>
            </div>
          </div>

          <p className="text-sm text-center" style={{ color: 'var(--color-muted)' }}>
            Use "Acessar Sistema" para entrar
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 text-center z-10">
        <p className="text-sm" style={{ color: 'var(--integra-text-nav)' }}>
          © 2025 Integra Fisioterapia • Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};

export default Login;
