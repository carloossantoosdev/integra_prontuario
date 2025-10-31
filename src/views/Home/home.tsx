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
      color: 'bg-primary',
    },
    {
      title: 'Evoluções',
      description: 'Registro de atendimentos RCP e DNM',
      icon: FileText,
      link: '/pacientes',
      color: 'bg-secondary',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="inline-flex items-center justify-center mb-4">
          <img
            src="/IntegraLogo.png"
            alt="Integra"
            className="w-32 h-32 object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Bem-vindo a INTEGRA
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Sistema de gerenciamento de prontuários e atendimentos
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div
                    className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-primary hover:underline">
                    Acessar →
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Info Section */}
    </div>
  );
};
