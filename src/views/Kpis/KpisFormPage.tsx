import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const KpisFormPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de submissão será implementada
  };

  return (
    <div>
      <PageHeader
        title="Preenchimento de KPIs"
        subtitle="Inserir dados para cálculo de indicadores"
      />

      <Card>
        <CardHeader>
          <CardTitle>Formulário de KPIs</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="periodo">Período</Label>
              <Input
                id="periodo"
                type="month"
                defaultValue={new Date().toISOString().slice(0, 7)}
              />
            </div>

            <div>
              <Label htmlFor="meta">Meta de Atendimentos</Label>
              <Input
                id="meta"
                type="number"
                placeholder="Digite a meta"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-md">
            <p className="text-sm text-muted-foreground">
              <strong>Nota:</strong> Funcionalidade completa de KPIs em
              desenvolvimento. Os campos e cálculos serão expandidos na próxima
              iteração.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
