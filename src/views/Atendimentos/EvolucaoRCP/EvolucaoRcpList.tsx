import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

export const EvolucaoRcpList = () => {
  return (
    <div>
      <PageHeader
        title="Evoluções RCP"
        subtitle="Lista de evoluções de pacientes RCP"
        showBackButton
      />

      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            As evoluções podem ser visualizadas na página de detalhes de cada
            paciente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
