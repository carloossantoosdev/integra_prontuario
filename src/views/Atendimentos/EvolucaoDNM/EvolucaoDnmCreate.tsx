/* eslint-disable @typescript-eslint/no-explicit-any */
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { supabaseClient } from '../../../utils/supabaseClient';
import { SinaisVitaisForm } from '../../../components/SinaisVitaisForm/SinaisVitaisForm';

export const EvolucaoDnmCreate = () => {
  const { pacienteId } = useParams();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    formState: { errors },
    register,
    getValues,
  } = useForm({});

  const navigate = useNavigate();

  const customSaveButtonProps = {
    ...saveButtonProps,
    children: 'Salvar evolução',
    onClick: async () => {
      const formData = getValues();

      const { data, error } = await supabaseClient.from('evolucao_dnm').insert([
        {
          patient_id: pacienteId,
          ssvv_inicial: formData.ssvv_inicial,
          ssvv_final: formData.ssvv_final,
          ausculta_pulmonar: formData.ausculta_pulmonar,
        },
      ]);

      if (error) {
        console.error('Erro ao cadastrar sinais vitais:', error);
      } else {
        console.log('Sinais vitais cadastrados com sucesso:', data);
        navigate('/pacientes');
      }
    },
  };

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={customSaveButtonProps}
      title="Cadastrar evolução DNM"
    >
      <SinaisVitaisForm
        register={register}
        errors={errors}
      />
    </Create>
  );
};
