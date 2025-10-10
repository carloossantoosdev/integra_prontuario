import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { PageHeader } from '@/components/crud/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import { useOne } from '@/hooks/usePocketbaseQuery';
import { useCreate } from '@/hooks/usePocketbaseMutation';
import { SinaisVitaisForm } from '@/components/forms/SinaisVitaisForm';
import { AuscultaPulmonarForm } from '@/components/forms/AuscultaPulmonarForm';
import { TreinamentoAerobicoForm } from '@/components/forms/TreinamentoAerobicoForm';
import { TreinamentoResistidoForm } from '@/components/forms/TreinamentoResistidoForm';
import { ExerciciosFuncionaisForm } from '@/components/forms/ExerciciosFuncionaisForm';
import { TmiForm } from '@/components/forms/TmiForm';
import { TerapiaExpansaoForm } from '@/components/forms/TerapiaExpansaoForm';
import { TerapiaRemoSecrecaoForm } from '@/components/forms/TerapiaRemoSecrecaoForm';
import { toast } from 'sonner';

const fisioterapeutas = [
  { name: 'Alisson Alves de Almeida - 296436 - F', value: 'Alisson Alves' },
  { name: 'Erika Lays Santos - 285936 - F', value: 'Erika Lays' },
  { name: 'Rafaela Maria da Silva - 295183 - F', value: 'Rafaela Maria' },
  { name: 'Wilayane Alves Martins - 295357 - F', value: 'Wilayane Alves' },
];

export const EvolucaoRcpCreate = () => {
  const { pacienteId } = useParams<{ pacienteId: string }>();
  const navigate = useNavigate();

  const { data: paciente, isLoading: loadingPaciente } = useOne<any>(
    'pacientes',
    pacienteId
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ssvv_inicial: {},
      ssvv_final: {},
      treinamento_aerobico: {},
      treinamento_resistido: {},
      treinamento_funcional: {},
      tmi: {},
      terapia_expansao: {},
      terapia_remo_secrecao: {},
      fisioterapeuta: '',
      data_atendimento: new Date().toISOString().split('T')[0],
      observacao: '',
    },
  });

  const createMutation = useCreate({
    resource: 'evolucao_rcp',
    mutationOptions: {
      onSuccess: () => {
        toast.success('Evolução RCP cadastrada com sucesso!', {
          description: 'Os dados foram salvos corretamente.',
        });
        setTimeout(() => navigate('/pacientes'), 1000);
      },
      onError: (error: any) => {
        toast.error('Erro ao cadastrar evolução RCP', {
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
        Object.entries(data.ausculta_pulmonar[categoria] || {}).forEach(([campo, valor]) => {
          if (valor === true) {
            valoresFiltrados[campo] = 'on';
          }
        });
        
        if (Object.keys(valoresFiltrados).length > 0) {
          auscultaFiltrada[categoria] = valoresFiltrados;
        }
      });
    }

    createMutation.mutate({
      patient_id: pacienteId,
      ...data,
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
        title="Cadastrar Evolução RCP"
        subtitle={`Paciente: ${paciente?.nome || ''}`}
        showBackButton
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Sinais Vitais */}
        <Card>
          <CardContent className="pt-6">
            <SinaisVitaisForm register={register} errors={errors} />
          </CardContent>
        </Card>

        {/* Ausculta Pulmonar */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Ausculta Pulmonar</h2>
            <AuscultaPulmonarForm control={control} />
          </CardContent>
        </Card>

        {/* 1. Treinamento Aeróbico */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">1. Treinamento Aeróbico</h2>
            <TreinamentoAerobicoForm register={register} errors={errors} />
          </CardContent>
        </Card>

        {/* 2. Treinamento Resistido */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">2. Treinamento Resistido</h2>
            <TreinamentoResistidoForm
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </CardContent>
        </Card>

        {/* 3. Exercícios Funcionais */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">3. Exercícios Funcionais</h2>
            <ExerciciosFuncionaisForm
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </CardContent>
        </Card>

        {/* 4. TMI */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">4. TMI</h2>
            <TmiForm register={register} setValue={setValue} watch={watch} />
          </CardContent>
        </Card>

        {/* 5. Terapia Expansão */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">5. Terapia de Expansão</h2>
            <TerapiaExpansaoForm
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </CardContent>
        </Card>

        {/* 6. Terapia Remoção de Secreção */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">
              6. Terapia Remoção de Secreção
            </h2>
            <TerapiaRemoSecrecaoForm
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </CardContent>
        </Card>

        {/* Fisioterapeuta, Data e Observações */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Fisioterapeuta / CREFITO
              </Label>
              <Controller
                name="fisioterapeuta"
                control={control}
                rules={{ required: 'Selecione um fisioterapeuta' }}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {fisioterapeutas.map(({ name, value }) => (
                        <div key={value} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={value}
                            id={`fisio_${value}`}
                          />
                          <Label
                            htmlFor={`fisio_${value}`}
                            className="font-normal cursor-pointer"
                          >
                            {name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.fisioterapeuta && (
                <p className="text-sm text-destructive mt-2">
                  {errors.fisioterapeuta.message as string}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="data_atendimento">Data de Atendimento</Label>
              <Input
                id="data_atendimento"
                type="date"
                {...register('data_atendimento')}
              />
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

          <Button type="submit" disabled={createMutation.isPending}>
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
