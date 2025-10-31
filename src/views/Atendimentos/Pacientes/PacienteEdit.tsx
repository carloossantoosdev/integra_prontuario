import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useOne } from '@/hooks/useSupabaseQuery';
import { useUpdate } from '@/hooks/useSupabaseMutation';

const formSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  data_nascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  inicio_atendimento: z.string().min(1, 'Início do atendimento é obrigatório'),
  valor: z.string().min(1, 'Valor é obrigatório'),
  area_atendimento: z.enum(['RCP', 'DNM'], {
    required_error: 'Selecione uma área de atendimento',
  }),
});

type FormData = z.infer<typeof formSchema>;

export const PacienteEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: paciente, isLoading } = useOne<any>('pacientes', id);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      data_nascimento: '',
      inicio_atendimento: '',
      valor: '',
      area_atendimento: undefined,
    },
  });

  useEffect(() => {
    if (paciente) {
      // Converter valor para string de centavos para o formato do input
      const valorEmCentavos = Math.round((paciente.valor || 0) * 100).toString();

      form.reset({
        nome: paciente.nome || '',
        data_nascimento: paciente.data_nascimento || '',
        inicio_atendimento: paciente.inicio_atendimento || '',
        valor: valorEmCentavos,
        area_atendimento: paciente.area_atendimento || undefined,
      });
    }
  }, [paciente, form]);

  const updateMutation = useUpdate({
    resource: 'pacientes',
    mutationOptions: {
      onSuccess: () => {
        navigate('/pacientes');
      },
    },
  });

  const onSubmit = (data: FormData) => {
    if (!id) return;

    // Converter valor de string para número
    const valorNumerico = parseFloat(
      data.valor.replace(/[^\d,]/g, '').replace(',', '.')
    );

    updateMutation.mutate({
      id,
      data: {
        nome: data.nome,
        data_nascimento: data.data_nascimento,
        inicio_atendimento: data.inicio_atendimento,
        valor: valorNumerico,
        area_atendimento: data.area_atendimento,
      },
    });
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';

    const amount = parseFloat(numbers) / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Editar Paciente"
        subtitle="Atualizar informações do paciente"
        showBackButton
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Paciente</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="R$ 0,00"
                          value={field.value ? formatCurrency(field.value) : ''}
                          onChange={(e) => {
                            const formatted = e.target.value.replace(
                              /[^\d]/g,
                              ''
                            );
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="data_nascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inicio_atendimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Início do Atendimento</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="area_atendimento"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Área de Atendimento</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="RCP" id="rcp" />
                          <Label htmlFor="rcp" className="font-normal">
                            RCP
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="DNM" id="dnm" />
                          <Label htmlFor="dnm" className="font-normal">
                            DNM
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/pacientes')}
                  disabled={updateMutation.isPending}
                >
                  Cancelar
                </Button>

                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Atualizar Paciente
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
