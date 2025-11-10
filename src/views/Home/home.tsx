import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const cards = [
    {
      title: 'Pacientes',
      description: 'Gerenciar cadastro de pacientes',
      icon: Users,
      link: '/pacientes',
      gradient: 'linear-gradient(135deg, #1ba0a4 0%, #15777a 100%)',
    },
    {
      title: 'Evoluções',
      description: 'Registro de atendimentos RCP e DNM',
      icon: FileText,
      link: '/pacientes',
      gradient: 'linear-gradient(135deg, #90bc21 0%, #6a8e17 100%)',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Hero Section */}
      <div className="text-center space-y-2 py-12 px-4">
      <div className="inline-flex items-center justify-center mb-4">
          <img
            src="/IntegraLogo.png"
            alt="Integra"
            className="w-32 h-32 object-contain"
          />
        </div>
        <div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight title-accent inline-block" style={{
          color: 'var(--integra-primary-darkest)'
        }}>
          Bem-vindo a Integra
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto" style={{
          color: 'var(--integra-text-nav)'
        }}>
          Sistema de gerenciamento de prontuários e atendimentos de fisioterapia
        </p>
        </div>
      
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 px-4">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-none shadow-lg hover:scale-[1.02]" style={{
                background: 'white'
              }}>
                <CardHeader className="pb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md"
                    style={{ background: card.gradient }}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl" style={{ color: 'var(--integra-primary-darkest)' }}>
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-base" style={{ color: 'var(--integra-text-nav)' }}>
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--integra-turquoise)' }}>
                    Acessar
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="mt-12 p-8 rounded-2xl section-soft mx-4">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--integra-petroleum)' }}>
            Sistema Integrado de Gestão
          </h2>
          <p className="text-muted-foreground">
            Gerencie pacientes, registre evoluções e acompanhe o histórico de atendimentos de forma simples e eficiente.
          </p>
        </div>
      </div>
    </div>
  );
};
