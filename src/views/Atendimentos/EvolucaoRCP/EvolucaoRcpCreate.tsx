/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { supabaseClient } from '../../../utils/supabaseClient';
import { SinaisVitaisForm } from '../../../components/SinaisVitaisForm/SinaisVitaisForm';
import { formDataProps } from '../../../types/evolucaoTypes';
import { TreinamentoAerobicoForm } from '../../../components/TreinamentoAerobicoForm/TreinamentoAerobicoForm';
import { TreinamentoResistidoForm } from '../../../components/TreinamentoResistidoForm/TreinamentoResistidoForm';
import { ExerciciosFuncionaisForm } from '../../../components/ExerciciosFuncionaisForm/ExerciciosFuncionaisForm';
import { Title } from '../../../components/Title/Title';
import { TmiForm } from '../../../components/TmiForm/TmiForm';
import { TerapiaExpansaoForm } from '../../../components/TerapiaExpansaoForm/TerapiaExpansaoForm';

export const EvolucaoRcpCreate = () => {
  const { pacienteId } = useParams();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    formState: { errors },
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<formDataProps>({
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
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (formData: formDataProps) => {
    const { data, error } = await supabaseClient.from('evolucao_rcp').insert([
      {
        patient_id: pacienteId,
        ...formData,
      },
    ]);

    if (error) {
      console.error('Erro ao cadastrar sinais vitais:', error);
    } else {
      console.log('Sinais vitais cadastrados com sucesso:', data);
      navigate('/pacientes');
    }
  };

  const customSaveButtonProps = {
    ...saveButtonProps,
    children: 'Salvar evolução',
    onClick: handleSubmit(onSubmit as any),
  };

  const selectedExercises = watch('treinamento_resistido') || {};
  const selectedFunctionalExercises = watch('treinamento_funcional') || {};
  const selectedTmiExercises = watch('tmi') || {};
  const selectedTerapiaExpansao = watch('terapia_expansao') || {};

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={customSaveButtonProps}
      title="Cadastrar evolução RCP"
    >
      <Title title="0Sinais Vitais" />
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
    </Create>
  );
};
