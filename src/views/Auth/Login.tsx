import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, User, Eye, EyeOff, ArrowRight, Activity, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupCrefito, setSignupCrefito] = useState('');
  
  const [errors, setErrors] = useState({
    name: '',
    crefito: '',
    email: '',
    password: ''
  });

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação dos campos
    const newErrors = {
      name: '',
      crefito: '',
      email: '',
      password: ''
    };
    
    let hasError = false;
    
    if (!signupName.trim()) {
      newErrors.name = 'Nome completo é obrigatório';
      hasError = true;
    }
    
    if (!signupCrefito.trim()) {
      newErrors.crefito = 'CREFITO é obrigatório';
      hasError = true;
    }
    
    if (!signupEmail.trim()) {
      newErrors.email = 'Email é obrigatório';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) {
      newErrors.email = 'Email inválido';
      hasError = true;
    }
    
    if (!signupPassword) {
      newErrors.password = 'Senha é obrigatória';
      hasError = true;
    } else if (signupPassword.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
      hasError = true;
    }
    
    setErrors(newErrors);
    
    if (hasError) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);
      await signup(signupEmail, signupPassword, signupName, signupCrefito);
      
      // Limpar formulário
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setSignupCrefito('');
      setErrors({ name: '', crefito: '', email: '', password: '' });
      
      // Voltar para tela de login
      setIsSignup(false);
      
      // Mostrar aviso para confirmar email
      toast.success('Conta criada com sucesso!', {
        description: 'Importante: Verifique seu email e confirme seu cadastro para poder fazer login.',
        duration: 8000,
      });
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #275e65 0%, #1ba0a4 50%, #90bc21 100%)'
        }}
      >
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                              radial-gradient(circle at 80% 80%, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
   
      
          </div>

          {/* Hero Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl font-bold mb-4 leading-tight">
                Cuidar é para agora.
                <br />
                <span className="text-[#90bc21]">Reabilitar é para sempre.</span>
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Uma experiência de gestão de prontuários feita para fisioterapeutas que buscam clareza, consistência e decisões melhores.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-[#90bc21] flex items-center justify-center flex-shrink-0 shadow-md">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Evolução em primeiro lugar</h3>
                  <p className="text-white/95 text-sm leading-relaxed">
                    Monitore a evolução dos seus pacientes com um painel visual que simplifica dados e destaca resultados.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                <div className="w-12 h-12 rounded-lg bg-[#1ba0a4] flex items-center justify-center flex-shrink-0 shadow-md">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Interface inteligente</h3>
                  <p className="text-white/95 text-sm leading-relaxed">
                    Interface simples, elegante e inteligente para você tomar decisões com mais confiança.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Integra Fisioterapia
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-5">
          {/* Logo Centered Above Form */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <img 
                src="/IntegraLogo.png" 
                alt="Integra Logo" 
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#051a21' }}>
              {isSignup ? 'Criar conta' : 'Bem-vindo'}
            </h2>
            <p className="text-base" style={{ color: '#455254' }}>
              {isSignup 
                ? 'Preencha os dados para criar sua conta'
                : 'Acesse sua conta e acompanhe o histórico de atendimentos de forma simples e eficiente.'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={isSignup ? handleSignup : handleLogin} className="space-y-5">
            {isSignup && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium" style={{ color: '#275e65' }}>
                    Nome completo <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={signupName}
                      onChange={(e) => {
                        setSignupName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`pl-10 h-12 focus:border-[#1ba0a4] focus:ring-[#1ba0a4] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      required
                      disabled={loading}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-crefito" className="text-sm font-medium" style={{ color: '#275e65' }}>
                    CREFITO <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="signup-crefito"
                      type="text"
                      placeholder="Ex: 123456-F"
                      value={signupCrefito}
                      onChange={(e) => {
                        setSignupCrefito(e.target.value);
                        if (errors.crefito) setErrors({ ...errors, crefito: '' });
                      }}
                      className={`pl-10 h-12 focus:border-[#1ba0a4] focus:ring-[#1ba0a4] ${errors.crefito ? 'border-red-500' : 'border-gray-300'}`}
                      required
                      disabled={loading}
                    />
                  </div>
                  {errors.crefito && (
                    <p className="text-sm text-red-500">{errors.crefito}</p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor={isSignup ? 'signup-email' : 'email'} className="text-sm font-medium" style={{ color: '#275e65' }}>
                Email {isSignup && <span className="text-red-500">*</span>}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id={isSignup ? 'signup-email' : 'email'}
                  type="email"
                  placeholder="seu@email.com"
                  value={isSignup ? signupEmail : email}
                  onChange={(e) => {
                    if (isSignup) {
                      setSignupEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    } else {
                      setEmail(e.target.value);
                    }
                  }}
                  className={`pl-10 h-12 focus:border-[#1ba0a4] focus:ring-[#1ba0a4] ${isSignup && errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  required
                  disabled={loading}
                />
              </div>
              {isSignup && errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={isSignup ? 'signup-password' : 'password'} className="text-sm font-medium" style={{ color: '#275e65' }}>
                Senha {isSignup && <span className="text-red-500">*</span>}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id={isSignup ? 'signup-password' : 'password'}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={isSignup ? signupPassword : password}
                  onChange={(e) => {
                    if (isSignup) {
                      setSignupPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    } else {
                      setPassword(e.target.value);
                    }
                  }}
                  className={`pl-10 pr-10 h-12 focus:border-[#1ba0a4] focus:ring-[#1ba0a4] ${isSignup && errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {isSignup && errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
              {isSignup && !errors.password && (
                <p className="text-xs text-gray-500">Mínimo de 6 caracteres</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #1ba0a4 0%, #15777a 100%)',
                color: 'white'
              }}
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {loading ? (isSignup ? 'Criando...' : 'Entrando...') : (isSignup ? 'Criar conta' : 'Entrar')}
              {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OU</span>
            </div>
          </div>

          {/* Toggle Form */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setEmail('');
                setPassword('');
                setSignupName('');
                setSignupEmail('');
                setSignupPassword('');
                setSignupCrefito('');
                setErrors({ name: '', crefito: '', email: '', password: '' });
              }}
              className="text-[#1ba0a4] hover:text-[#15777a] font-medium transition-colors"
              disabled={loading}
            >
              {isSignup ? 'Já tem uma conta? Entrar' : 'Ainda não tem conta? Criar agora'}
            </button>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-center text-gray-500 pt-4">
            Ao continuar, você concorda com nossa política de privacidade e termos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
