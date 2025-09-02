import React from 'react';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreate, useOne, useNotification } from '@refinedev/core';
import { SinaisVitaisForm } from '../../../components/SinaisVitaisForm/SinaisVitaisForm';
import { formDataRcpProps } from '../../../types/evolucaoRcpTypes';
import { TreinamentoAerobicoForm } from '../../../components/TreinamentoAerobicoForm/TreinamentoAerobicoForm';
import { TreinamentoResistidoForm } from '../../../components/TreinamentoResistidoForm/TreinamentoResistidoForm';
import { ExerciciosFuncionaisForm } from '../../../components/ExerciciosFuncionaisForm/ExerciciosFuncionaisForm';
import { Title } from '../../../components/Title/Title';
import { TmiForm } from '../../../components/TmiForm/TmiForm';
import { TerapiaExpansaoForm } from '../../../components/TerapiaExpansaoForm/TerapiaExpansaoForm';
import { TerapiaRemoSecrecaoForm } from '../../../components/TerapiaRemoSecrecaoForm/TerapiaRemoSecrecaoForm';
import {
  Box,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

export const EvolucaoRcpCreate = () => {
  const { pacienteId } = useParams();
  const navigate = useNavigate();
  const { mutateAsync: createEvolucao } = useCreate();
  const { open } = useNotification();

  const {
    saveButtonProps,
    refineCore: { formLoading },
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<formDataRcpProps>({
    defaultValues: {
      ssvv_inicial: {},
      ssvv_final: {},
      ausculta_pulmonar: {},
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

  const {
    data: pacienteData,
    isLoading,
    error,
  } = useOne({
    resource: 'pacientes',
    id: pacienteId,
    queryOptions: {
      staleTime: 5000,
    },
  });

  const onSubmit = async (formData: formDataRcpProps) => {
    const auscultaFiltrada = Object.fromEntries(
      Object.entries(formData.ausculta_pulmonar).map(([key, value]) => [
        key,
        Object.fromEntries(
          Object.entries(value).filter(([_, val]) => val === true)
        ),
      ])
    );

    const dataToSend = {
      patient_id: pacienteId,
      ...formData,
      ausculta_pulmonar: auscultaFiltrada,
    };

    try {
      await createEvolucao({
        resource: 'evolucao_rcp',
        values: dataToSend,
      });
      open?.({ type: 'success', message: 'Evolução salva com sucesso' });
      navigate('/pacientes');
    } catch (error: any) {
      open?.({ type: 'error', message: error?.message ?? 'Erro ao salvar evolução' });
    }
  };

  const selectedExercises = watch('treinamento_resistido') || {};
  const selectedFunctionalExercises = watch('treinamento_funcional') || {};
  const selectedTmiExercises = watch('tmi') || {};
  const selectedTerapiaExpansao = watch('terapia_expansao') || {};
  const selectedTerapiaRemoSecrecao = watch('terapia_remo_secrecao') || {};

  const fisioterapeutas = [
    { name: 'Alisson Alves de Almeida - 296436 - F', value: 'Alisson Alves' },
    { name: 'Erika Lays Santos - 285936 - F', value: 'Erika Lays' },
    { name: 'Rafaela Maria da Silva - 295183 - F', value: 'Rafaela Maria' },
    { name: 'Wilayane Alves Martins - 295357 - F', value: 'Wilayane Alves' },
  ];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        Erro ao buscar dados do paciente
      </Box>
    );
  }

  const pacienteNome = pacienteData?.data?.nome;

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(onSubmit as any),
        children: 'Salvar evolução',
      }}
      title="Cadastrar evolução RCP"
    >
      <Typography
        variant="h6"
        marginBottom={2}
        fontWeight="bold"
      >
        {`Paciente: ${pacienteNome}`}
      </Typography>

      <SinaisVitaisForm
        register={register}
        errors={errors}
      />
      <Title title="1. Treinamento Aeróbico" />
      <TreinamentoAerobicoForm
        register={register}
        errors={errors}
      />
      <Title title="2. Treinamento Resistido" />
      <TreinamentoResistidoForm
        register={register}
        selected={selectedExercises}
        setValue={setValue}
        errors={errors}
      />
      <Title title="3. Exercícios Funcionais" />
      <ExerciciosFuncionaisForm
        register={register}
        selected={selectedFunctionalExercises}
        setValue={setValue}
        errors={errors}
      />
      <Title title="4. TMI" />
      <TmiForm
        register={register}
        selected={selectedTmiExercises}
        setValue={setValue}
        errors={errors}
      />
      <Title title="5. Terapia expansão" />
      <TerapiaExpansaoForm
        register={register}
        selected={selectedTerapiaExpansao}
        setValue={setValue}
        errors={errors}
      />
      <Title title="6. Terapia remoção de secreção" />
      <TerapiaRemoSecrecaoForm
        register={register}
        selected={selectedTerapiaRemoSecrecao}
        setValue={setValue}
        errors={errors}
      />

      <Grid
        item
        xs={12}
      >
        <Typography
          variant="h6"
          marginTop={2}
          fontWeight="bold"
        >
          Fisioterapeuta / CREFITO
        </Typography>
        <RadioGroup row>
          {fisioterapeutas.map(({ name, value }) => (
            <FormControlLabel
              key={value}
              control={
                <Radio
                  {...register('fisioterapeuta', {
                    required: 'Selecione um fisioterapeuta',
                  })}
                  value={value}
                />
              }
              label={name}
            />
          ))}
        </RadioGroup>
        {errors.fisioterapeuta && (
          <FormHelperText error>
            {errors.fisioterapeuta.message as string}
          </FormHelperText>
        )}
      </Grid>

      <Grid
        item
        xs={12}
        marginTop={4}
      >
        <TextField
          {...register('data_atendimento')}
          type="date"
          label="Data de Atendimento"
          variant="outlined"
          fullWidth
          error={!!errors.data_atendimento}
          helperText={errors.data_atendimento?.message?.toString()}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        marginTop={4}
      >
        <TextField
          {...register('observacao')}
          label="Observação"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
      </Grid>
    </Create>
  );
};
