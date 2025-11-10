import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Mail, Lock } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
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
        <CardHeader className="text-center ">
          {/* Logo com gradiente de fundo */}
          <div className="mx-auto mb-2 p-4 rounded-2xl" style={{
    
          }}>
            <img
              src="/IntegraLogo.png"
              alt="Integra"
              className="h-40 object-contain mx-auto"
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
        <CardContent className="space-y-5 pb-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium" style={{ color: 'var(--integra-petroleum)' }}>
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--integra-text-nav)' }} />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium" style={{ color: 'var(--integra-petroleum)' }}>
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--integra-text-nav)' }} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium shadow-md hover:shadow-lg transition-all"
              size="lg"
              disabled={loading || !email || !password}
              style={{
                background: 'linear-gradient(135deg, #1ba0a4 0%, #15777a 100%)',
                color: 'white'
              }}
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="text-xs text-center pt-2" style={{ color: 'var(--color-muted)' }}>
            Entre com seu email e senha para acessar o sistema
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="fixed bottom-4 left-0 right-0 text-center z-10">
        <p className="text-sm" style={{ color: 'var(--integra-text-nav)' }}>
          © {new Date().getFullYear()} Integra Fisioterapia • Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};

export default Login;
