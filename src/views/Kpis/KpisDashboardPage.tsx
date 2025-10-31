import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, TrendingUp, Activity } from 'lucide-react';

export const KpisDashboardPage = () => {
  const kpis = [
    {
      title: 'Total de Pacientes',
      value: '0',
      icon: Users,
      color: 'text-primary',
    },
    {
      title: 'Atendimentos (Mês)',
      value: '0',
      icon: Activity,
      color: 'text-secondary',
    },
    {
      title: 'Taxa de Crescimento',
      value: '0%',
      icon: TrendingUp,
      color: 'text-tertiary',
    },
    {
      title: 'Média de Atendimentos',
      value: '0',
      icon: BarChart3,
      color: 'text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard de KPIs"
        subtitle="Indicadores e métricas do sistema"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gráficos e Análises</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Visualizações de dados e gráficos serão exibidos aqui.
            Funcionalidade em desenvolvimento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
