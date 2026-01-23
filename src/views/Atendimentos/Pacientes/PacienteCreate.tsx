import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { useCreate } from '@/hooks/useSupabaseMutation';

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

export const PacienteCreate = () => {
  const navigate = useNavigate();

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

  const createMutation = useCreate({
    resource: 'pacientes',
    mutationOptions: {
      onSuccess: () => {
        // A invalidação do cache já foi feita pelo hook
        // Agora podemos navegar imediatamente
        navigate('/pacientes');
      },
    },
  });

  const onSubmit = (data: FormData) => {
    // Converter valor de centavos para reais
    // O campo trabalha com centavos (ex: "20000"), dividir por 100 para salvar em reais
    const valorEmCentavos = parseFloat(data.valor.replace(/\D/g, ''));
    const valorEmReais = valorEmCentavos / 100;

    createMutation.mutate({
      nome: data.nome,
      data_nascimento: data.data_nascimento,
      inicio_atendimento: data.inicio_atendimento,
      valor: valorEmReais,
      area_atendimento: data.area_atendimento,
    });
  };

  const formatCurrency = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';

    // Converte para número e formata
    const amount = parseFloat(numbers) / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div>
      <PageHeader
        title="Criar Paciente"
        subtitle="Cadastrar um novo paciente no sistema"
        showBackButton
      />

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Paciente</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome"
                          {...field}
                        />
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
                          onChange={e => {
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
                        <Input
                          type="date"
                          {...field}
                        />
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
                        <Input
                          type="date"
                          {...field}
                        />
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
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="RCP"
                            id="rcp"
                          />
                          <Label
                            htmlFor="rcp"
                            className="font-normal"
                          >
                            RCP
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="DNM"
                            id="dnm"
                          />
                          <Label
                            htmlFor="dnm"
                            className="font-normal"
                          >
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
                  disabled={createMutation.isPending}
                >
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Salvar Paciente
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
