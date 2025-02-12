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
                  {...register('treinamento_aerobico.tipo', {
                    required: 'Tipo de treinamento é obrigatório',
                  })}
                  value={value}
                />
              }
              label={name}
            />
          ))}
          {errors.treinamento_aerobico?.tipo && (
            <Typography color="error">
              {errors.treinamento_aerobico.tipo?.message}
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
          {...register('treinamento_aerobico.intensidade', {
            required: 'Intensidade é obrigatória',
          })}
          required={true}
          error={!!errors.treinamento_aerobico?.intensidade}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Intensidade"
        />
        <TextField
          {...register('treinamento_aerobico.duracao', {
            required: 'Duração é obrigatória',
          })}
          required={true}
          error={!!errors.treinamento_aerobico?.duracao}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Duração"
        />
        <TextField
          {...register('treinamento_aerobico.carga', {
            required: 'Carga é obrigatória',
          })}
          required={true}
          error={!!errors.treinamento_aerobico?.carga}
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
          {...register('treinamento_aerobico.circuito_funcional')}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Circuito funcional"
        />
      </Grid>
    </Box>
  );
};
