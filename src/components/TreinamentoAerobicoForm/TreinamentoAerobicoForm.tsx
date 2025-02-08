import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { FormProps } from '../../types/formsTypes';

const aerobicType = [
  { name: 'Caminhada', value: 'Caminhada' },
  { name: 'Esteira', value: 'Esteira' },
  { name: 'Cicloergometria de MMSS', value: 'Cicloergometria de MMSS' },
  { name: 'Cicloergometria de MMII', value: 'Cicloergometria de MMII' },
  { name: 'Circuito Funcional', value: 'Circuito Funcional' },
];

export const TreinamentoAerobicoForm = ({ register, errors }: FormProps) => {
  return (
    <Box>
      <Grid
        container
        item
        xs={12}
      >
        <Typography
          variant="subtitle1"
          marginTop={2}
          fontWeight="bold"
        >
          Tipo
        </Typography>
        <RadioGroup row>
          {aerobicType.map(({ name, value }) => (
            <FormControlLabel
              key={value}
              control={
                <Radio
                  {...register('treinamento_aerobico', {
                    required: 'Tipo de treinamento é obrigatório',
                  })}
                  value={value}
                />
              }
              label={name}
            />
          ))}
          {errors.treinamento_aerobico && (
            <Typography color="error">
              {errors.treinamento_aerobico?.message as string}
            </Typography>
          )}
        </RadioGroup>
      </Grid>

      <Grid
        item
        xs={12}
      >
        <Typography
          variant="subtitle1"
          marginTop={2}
          fontWeight="bold"
        >
          Intensidade
        </Typography>
        <TextField
          {...register('intensidade', {
            required: 'Intensidade é obrigatória',
          })}
          required={true}
          error={!!errors.intensidade}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Intensidade"
        />
        <TextField
          {...register('duracao', { required: 'Duração é obrigatória' })}
          required={true}
          error={!!errors.duracao}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Duração"
        />
        <TextField
          {...register('carga', { required: 'Carga é obrigatória' })}
          required={true}
          error={!!errors.carga}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Carga"
        />
      </Grid>

      <Grid
        item
        xs={12}
      >
        <Typography
          variant="subtitle1"
          marginTop={2}
          fontWeight="bold"
        >
          Observações (Descrição de circuito funcional ou outro)
        </Typography>
        <TextField
          {...register('circuito_funcional')}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Circuito funcional"
        />
      </Grid>
    </Box>
  );
};
