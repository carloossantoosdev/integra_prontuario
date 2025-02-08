import {
  Box,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormHelperText,
} from '@mui/material';
import { Create } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../../../utils/supabaseClient';
import { useEffect } from 'react';

export const PacienteCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    formState: { errors },
    register,
    getValues,
    setValue,
  } = useForm({});

  const navigate = useNavigate();

  const customSaveButtonProps = {
    ...saveButtonProps,
    children: 'Salvar',
    onClick: async () => {
      const formData = getValues();

      const { data, error } = await supabaseClient.from('pacientes').insert([
        {
          nome: formData.nome,
          data_nascimento: formData.data_nascimento,
          inicio_atendimento: formData.inicio_atendimento,
          valor: formData.valor,
          fisioterapeuta: formData.fisioterapeuta,
          area_atendimento: formData.area_atendimento,
        },
      ]);

      if (error) {
        console.error('Erro ao enviar dados:', error);
      } else {
        console.log('Paciente cadastrado com sucesso:', data);
        navigate('/pacientes');
      }
    },
  };

  useEffect(() => {
    setValue('area_atendimento', []);
  }, [setValue]);

  const initialFields = [
    { name: 'nome', type: 'text', label: 'Nome Paciente', required: true },
    { name: 'valor', type: 'number', label: 'Valor', required: true },
    {
      name: 'data_nascimento',
      type: 'date',
      label: 'Data de Nascimento',
      required: true,
    },
    {
      name: 'inicio_atendimento',
      type: 'date',
      label: 'Início do Atendimento',
      required: true,
    },
  ];

  const fisioterapeutas = [
    { name: 'Alisson Alves de Almeida - 296436 - F', value: 'Alisson Alves' },
    { name: 'Erika Lays Santos de Barros - 285936 - F', value: 'Erika Lays' },
    { name: 'Rafaela Maria da Silva - 295183 - F', value: 'Rafaela Maria' },
    { name: 'Wilayane Alves Martins - 295357 - F', value: 'Wilayane Alves' },
  ];

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={customSaveButtonProps}
      title="Criar Paciente"
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
          Dados do Paciente
        </Typography>
        <Grid
          container
          spacing={2}
        >
          {initialFields.map(({ name, type, label, required }) => (
            <Grid
              item
              xs={6}
              key={name}
            >
              <TextField
                {...register(name, {
                  required: required ? `${label} é obrigatório` : false,
                })}
                required={true}
                type={type}
                error={!!errors[name]}
                helperText={errors[name]?.message as string}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                label={label}
              />
            </Grid>
          ))}

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
          >
            <Typography
              variant="h6"
              marginTop={2}
              fontWeight="bold"
            >
              Área de Atendimento
            </Typography>
            <RadioGroup
              defaultValue=""
              {...register('area_atendimento', {
                required: 'Selecione uma área de atendimento',
              })}
            >
              <FormControlLabel
                value="RCP"
                control={<Radio />}
                label="RCP"
              />
              <FormControlLabel
                value="DNM"
                control={<Radio />}
                label="DNM"
              />
            </RadioGroup>
            {errors.area_atendimento && (
              <FormHelperText error>
                {errors.area_atendimento.message as string}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
