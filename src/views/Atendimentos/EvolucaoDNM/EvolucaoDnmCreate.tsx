/* eslint-disable @typescript-eslint/no-explicit-any */
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { pocketbaseClient } from '../../../utils/pocketbaseClient';
import { SinaisVitaisForm } from '../../../components/SinaisVitaisForm/SinaisVitaisForm';
import { useOne } from '@refinedev/core';
import { Box, CircularProgress, Typography } from '@mui/material';

export const EvolucaoDnmCreate = () => {
  const { pacienteId } = useParams();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    formState: { errors },
    register,
    getValues,
  } = useForm({});

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

  const navigate = useNavigate();

  const customSaveButtonProps = {
    ...saveButtonProps,
    children: 'Salvar evolução',
    onClick: async () => {
      const formData = getValues();

      try {
        await pocketbaseClient.collection('evolucao_dnm').create({
          patient_id: pacienteId,
          ssvv_inicial: formData.ssvv_inicial,
          ssvv_final: formData.ssvv_final,
          ausculta_pulmonar: formData.ausculta_pulmonar,
        });
        navigate('/pacientes');
      } catch (error) {
        console.error('Erro ao cadastrar sinais vitais:', error);
      }
    },
  };

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
      saveButtonProps={customSaveButtonProps}
      title="Cadastrar evolução DNM"
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
    </Create>
  );
};
