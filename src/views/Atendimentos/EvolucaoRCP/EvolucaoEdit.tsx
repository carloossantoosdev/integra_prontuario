import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent } from '@/components/ui/card';

export const EvolucaoEdit = () => {
  return (
    <div>
      <PageHeader
        title="Editar Evolução RCP"
        subtitle="Editar evolução de paciente"
        showBackButton
      />

      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Funcionalidade de edição de evolução em desenvolvimento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
