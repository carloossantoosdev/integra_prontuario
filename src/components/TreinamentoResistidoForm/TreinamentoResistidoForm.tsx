/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import { FormProps } from '../../types/formsTypes';

const resistidoExercises = [
  { name: 'Diagonal 1', value: 'diagonal_1' },
  { name: 'Diagonal 2', value: 'diagonal_2' },
  { name: 'Flexão de cotovelo', value: 'flexao_cotovelo' },
  { name: 'Extensão de cotovelo', value: 'extensao_cotovelo' },
  { name: 'Flexão de ombro', value: 'flexao_ombro' },
  { name: 'Extensão de joelho', value: 'extensao_joelho' },
  { name: 'Flexão de joelho', value: 'flexao_joelho' },
  { name: 'Flexão de quadril', value: 'flexao_quadril' },
  { name: 'Extensão de quadril', value: 'extensao_quadril' },
  { name: 'Flexão plantar', value: 'flexao_plantar' },
];

export const TreinamentoResistidoForm = ({
  register,
  setValue,
  selected,
}: FormProps) => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        marginTop={2}
      >
        {resistidoExercises.map(exercise => {
          const isChecked = Boolean(selected[exercise.value]);

          return (
            <Grid
              item
              xs={12}
              container
              alignItems="flex-start"
              key={exercise.value}
              spacing={1}
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={exercise.value}
                      checked={isChecked}
                      onChange={e => {
                        const { checked } = e.target;
                        const updatedExercises = { ...selected };
                        if (checked) {
                          updatedExercises[exercise.value] = {
                            carga: '',
                            series_repeticoes: '',
                          };
                        } else {
                          delete updatedExercises[exercise.value];
                        }
                        setValue(`treinamento_resistido`, updatedExercises);
                      }}
                    />
                  }
                  label={exercise.name}
                  style={{ margin: 0 }}
                />
              </Grid>
              {isChecked && ( // Mostra os campos somente se o checkbox estiver marcado
                <Grid
                  item
                  container
                  spacing={1}
                  style={{ marginTop: '8px' }}
                >
                  <Grid
                    item
                    xs
                  >
                    <TextField
                      {...register(
                        `treinamento_resistido.${exercise.value}.carga`
                      )}
                      label="Carga"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      style={{ backgroundColor: 'white' }}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      {...register(
                        `treinamento_resistido.${exercise.value}.series_repeticoes`
                      )}
                      label="Séries/Repetições"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      style={{ backgroundColor: 'white' }}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
