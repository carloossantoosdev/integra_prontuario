import React from 'react';
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import { FormProps } from '../../types/formsTypes';

const tmiExercises = [{ name: 'Intensidade', value: 'intensidade' }];

export const TmiForm = ({ register, selected, setValue }: FormProps) => {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        marginTop={2}
      >
        {tmiExercises.map(exercise => (
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
                    checked={Boolean(selected[exercise.value])}
                    onChange={e => {
                      const { checked } = e.target;
                      const updatedTmiExercises = { ...selected };
                      if (checked) {
                        updatedTmiExercises[exercise.value] = {
                          carga: '',
                          series_repeticoes: '',
                        };
                      } else {
                        delete updatedTmiExercises[exercise.value];
                      }
                      setValue(`tmi`, updatedTmiExercises);
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
                  {...register(`tmi.${exercise.value}.carga`)}
                  label="Carga"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  style={{ backgroundColor: 'white' }}
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register(`tmi.${exercise.value}.series_repeticoes`)}
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
