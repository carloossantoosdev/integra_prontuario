/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useUpdate, useOne } from '@refinedev/core';
import { Edit, useAutocomplete } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { SinaisVitaisForm } from '../../../components/SinaisVitaisForm/SinaisVitaisForm';
import { TreinamentoAerobicoForm } from '../../../components/TreinamentoAerobicoForm/TreinamentoAerobicoForm';
import { TreinamentoResistidoForm } from '../../../components/TreinamentoResistidoForm/TreinamentoResistidoForm';
import { ExerciciosFuncionaisForm } from '../../../components/ExerciciosFuncionaisForm/ExerciciosFuncionaisForm';
import { TmiForm } from '../../../components/TmiForm/TmiForm';
import { TerapiaExpansaoForm } from '../../../components/TerapiaExpansaoForm/TerapiaExpansaoForm';
import { TerapiaRemoSecrecaoForm } from '../../../components/TerapiaRemoSecrecaoForm/TerapiaRemoSecrecaoForm';
import { useEffect } from 'react';

export const EvolucaoEdit = () => {
  const {
    saveButtonProps,
    refineCore: { query, formLoading },
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({
    refineCoreProps: {
      meta: {
        select:
          'data_atendimento, fisioterapeuta, observacao, ssvv_final, ssvv_inicial, terapia_expansao, terapia_remo_secrecao, tmi, treinamento_aerobico, treinamento_funcional, treinamento_resistido',
      },
    },
  });

  const evolucaoData = query?.data?.data;

  // Carregando dados na inicialização
  useEffect(() => {
    if (evolucaoData) {
      Object.keys(evolucaoData).forEach(key => {
        setValue(key, evolucaoData[key]);
      });
    }
  }, [evolucaoData, setValue]);

  useAutocomplete({
    resource: 'evolucao_rcp',
    defaultValue: evolucaoData?.id,
  });

  const onSubmit = async (data: any) => {
    const { mutate: updateEvolucao } = useUpdate();
    await updateEvolucao({
      resource: 'evolucao_rcp',
      id: evolucaoData?.id,
      values: data,
    });
  };

  const customSaveButtonProps = {
    ...saveButtonProps,
    onClick: handleSubmit(onSubmit),
    children: 'Salvar',
  };

  if (formLoading) {
    return <CircularProgress />;
  }

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={customSaveButtonProps}
      title="Editar Evolução RCP"
    >
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete="off"
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Editar Evolução RCP
        </Typography>

        <SinaisVitaisForm
          register={register}
          errors={errors}
        />

        <Typography variant="h6">1. Treinamento Aeróbico</Typography>
        <TreinamentoAerobicoForm
          register={register}
          errors={errors}
        />

        <Typography variant="h6">2. Treinamento Resistido</Typography>
        <TreinamentoResistidoForm
          register={register}
          selected={evolucaoData?.treinamento_resistido}
          setValue={setValue}
          errors={errors}
        />

        <Typography variant="h6">3. Exercícios Funcionais</Typography>
        <ExerciciosFuncionaisForm
          register={register}
          selected={evolucaoData?.treinamento_funcional}
          setValue={setValue}
          errors={errors}
        />

        <Typography variant="h6">4. TMI</Typography>
        <TmiForm
          register={register}
          selected={evolucaoData?.tmi}
          setValue={setValue}
          errors={errors}
        />

        <Typography variant="h6">5. Terapia de Expansão</Typography>
        <TerapiaExpansaoForm
          register={register}
          selected={evolucaoData?.terapia_expansao}
          setValue={setValue}
          errors={errors}
        />

        <Typography variant="h6">6. Terapia de Remoção de Secreção</Typography>
        <TerapiaRemoSecrecaoForm
          register={register}
          selected={evolucaoData?.terapia_remo_secrecao}
          setValue={setValue}
          errors={errors}
        />

        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={6}
          >
            <TextField
              {...register('data_atendimento', {
                required: 'Campo obrigatório',
              })}
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
            xs={6}
          >
            <TextField
              {...register('fisioterapeuta', { required: 'Campo obrigatório' })}
              label="Fisioterapeuta"
              variant="outlined"
              fullWidth
              error={!!errors.fisioterapeuta}
              helperText={errors.fisioterapeuta?.message?.toString()}
            />
          </Grid>
          <Grid
            item
            xs={12}
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
        </Grid>
      </Box>
    </Edit>
  );
};
