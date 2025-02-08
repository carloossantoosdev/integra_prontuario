import React from 'react';
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import { FormProps } from '../../types/formsTypes';

const terapiaExpansao = [
  { name: 'EPAP válvula', value: 'ebap_valvula' },
  { name: 'EPAP artesanal', value: 'ebap_artesanal' },
  { name: 'VNI', value: 'vni' },
  { name: 'RTA', value: 'rta' },
];

export const TerapiaExpansaoForm = ({
  register,
  selected,
  setValue,
}: FormProps) => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        marginTop={2}
      >
        {terapiaExpansao.map(exercise => (
          <Grid
            item
            xs={12}
            container
            alignItems="flex-start"
            key={exercise.value}
          >
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    value={exercise.value}
                    checked={Boolean(selected[exercise.value])}
                    onChange={e => {
                      const { checked } = e.target;
                      const updatedFunctionalExercises = { ...selected };
                      if (checked) {
                        updatedFunctionalExercises[exercise.value] = {
                          carga: '',
                          series_repeticoes: '',
                        };
                      } else {
                        delete updatedFunctionalExercises[exercise.value];
                      }
                      setValue(
                        `treinamento_funcional`,
                        updatedFunctionalExercises
                      );
                    }}
                  />
                }
                label={exercise.name}
                style={{ margin: 0 }}
              />
            </Grid>
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
                  {...register(`treinamento_funcional.${exercise.value}.carga`)}
                  label="Carga"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  style={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register(
                    `treinamento_funcional.${exercise.value}.series_repeticoes`
                  )}
                  label="Séries/Repetições"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  style={{ backgroundColor: 'white' }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
