import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useOne } from '@/hooks/useSupabaseQuery';
import { useCreate } from '@/hooks/useSupabaseMutation';
import { SinaisVitaisForm } from '@/components/forms/SinaisVitaisForm';
import { AuscultaPulmonarForm } from '@/components/forms/AuscultaPulmonarForm';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';

export const EvolucaoDnmCreate = () => {
  const { pacienteId } = useParams<{ pacienteId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: paciente, isLoading: loadingPaciente } = useOne<any>(
    'pacientes',
    pacienteId
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ssvv_inicial: {},
      ssvv_final: {},
      data_atendimento: new Date().toISOString().split('T')[0],
      observacao: '',
    },
  });

  const createMutation = useCreate({
    resource: 'evolucao_dnm',
    mutationOptions: {
      onSuccess: () => {
        toast.success('Evolução DNM cadastrada com sucesso!', {
          description: 'Os dados foram salvos corretamente.',
        });
        setTimeout(() => navigate('/pacientes'), 1000);
      },
      onError: (error: any) => {
        toast.error('Erro ao cadastrar evolução DNM', {
          description: error?.message || 'Ocorreu um erro ao salvar os dados.',
        });
      },
    },
  });

  const onSubmit = (data: any) => {
    // Filtrar ausculta pulmonar para manter apenas valores "on"
    const auscultaFiltrada: any = {};

    if (data.ausculta_pulmonar) {
      Object.keys(data.ausculta_pulmonar).forEach(categoria => {
        const valoresFiltrados: any = {};
        Object.entries(data.ausculta_pulmonar[categoria] || {}).forEach(
          ([campo, valor]) => {
            if (valor === true) {
              valoresFiltrados[campo] = 'on';
            }
          }
        );

        if (Object.keys(valoresFiltrados).length > 0) {
          auscultaFiltrada[categoria] = valoresFiltrados;
        }
      });
    }

    const fisioterapeutaInfo = user?.crefito 
      ? `${user.name} - CREFITO: ${user.crefito}`
      : user?.name || '';

    createMutation.mutate({
      patient_id: pacienteId,
      ...data,
      fisioterapeuta: fisioterapeutaInfo,
      ausculta_pulmonar: auscultaFiltrada,
    });
  };

  if (loadingPaciente) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Cadastrar Evolução DNM"
        subtitle={`Paciente: ${paciente?.nome || ''}`}
        showBackButton
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Sinais Vitais */}
        <Card>
          <CardContent className="pt-6">
            <SinaisVitaisForm
              register={register}
              errors={errors}
            />
          </CardContent>
        </Card>

        {/* Ausculta Pulmonar */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Ausculta Pulmonar</h2>
            <AuscultaPulmonarForm control={control} />
          </CardContent>
        </Card>

        {/* Data, Fisioterapeuta e Observações */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label htmlFor="data_atendimento">Data de Atendimento</Label>
              <Input
                id="data_atendimento"
                type="date"
                {...register('data_atendimento', {
                  required: 'Data de atendimento é obrigatória',
                })}
              />
              {errors.data_atendimento && (
                <p className="text-sm text-destructive mt-1">
                  {errors.data_atendimento.message as string}
                </p>
              )}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Responsável pelo Atendimento
              </Label>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1ba0a4] to-[#275e65] flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user?.name || 'Usuário'}</p>
                  <p className="text-sm text-gray-600">CREFITO: {user?.crefito || 'Não informado'}</p>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="observacao">Observações</Label>
              <Textarea
                id="observacao"
                {...register('observacao')}
                placeholder="Digite suas observações..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-2">
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
            Salvar Evolução
          </Button>
        </div>
      </form>
    </div>
  );
};
