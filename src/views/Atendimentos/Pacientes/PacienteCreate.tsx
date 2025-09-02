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
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreate, useNotification } from '@refinedev/core';

export const PacienteCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    formState: { errors },
    register,
    control,
    handleSubmit,
  } = useForm();

  const { mutateAsync: createPaciente } = useCreate();
  const { open } = useNotification();

  const navigate = useNavigate();

  const onSubmit = async (formData: {
    nome: string;
    data_nascimento: Date;
    inicio_atendimento: Date;
    valor: number;
    area_atendimento: string;
  }) => {
    try {
      const values = {
        nome: formData.nome,
        data_nascimento: formData.data_nascimento
          ? new Date(formData.data_nascimento).toISOString().split('T')[0]
          : null,
        inicio_atendimento: formData.inicio_atendimento
          ? new Date(formData.inicio_atendimento).toISOString().split('T')[0]
          : null,
        valor:
          formData.valor === undefined || formData.valor === null
            ? null
            : Number(formData.valor),
        area_atendimento: formData.area_atendimento,
      } as any;

      await createPaciente({
        resource: 'pacientes',
        values,
      });

      open?.({
        type: 'success',
        message: 'Paciente cadastrado com sucesso',
      });

      navigate('/pacientes');
    } catch (error: any) {
      open?.({ type: 'error', message: error?.message ?? 'Erro ao cadastrar paciente' });
    }
  };

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

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        ...saveButtonProps,
        onClick: handleSubmit(onSubmit as any),
        children: 'Salvar paciente',
      }}
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
              {name === 'valor' ? (
                <Controller
                  name="valor"
                  control={control}
                  rules={{ required: 'Valor é obrigatório' }}
                  render={({ field }) => {
                    const formatter = new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    });
                    const displayValue =
                      field.value === undefined ||
                      field.value === null ||
                      field.value === ''
                        ? ''
                        : formatter.format(Number(field.value));

                    const parseBRL = (input: string) => {
                      const digits = input.replace(/[^\d]/g, '');
                      if (!digits) return '';
                      return Number(digits) / 100;
                    };

                    return (
                      <TextField
                        value={displayValue}
                        onChange={e => {
                          const num = parseBRL(e.target.value);
                          field.onChange(num);
                        }}
                        required={true}
                        type="text"
                        error={!!errors[name]}
                        helperText={errors[name]?.message as string}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        label={label}
                      />
                    );
                  }}
                />
              ) : (
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
              )}
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
