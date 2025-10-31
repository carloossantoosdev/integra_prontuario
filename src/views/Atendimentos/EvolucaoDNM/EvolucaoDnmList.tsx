import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

export const EvolucaoDnmList = () => {
  return (
    <div>
      <PageHeader
        title="Evoluções DNM"
        subtitle="Lista de evoluções de pacientes DNM"
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
