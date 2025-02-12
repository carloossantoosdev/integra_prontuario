import React from 'react';
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Typography,
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
        {tmiExercises.map(exercise => {
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
              <Grid
                item
                xs={12}
              >
                <FormControl component="fieldset">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Tipo
                  </Typography>
                  <RadioGroup row>
                    <FormControlLabel
                      control={<Radio />}
                      label="Fortalecimento"
                      value="fortalecimento"
                      {...register(`tmi.${exercise.value}.tipo`)}
                    />
                    <FormControlLabel
                      control={<Radio />}
                      label="Resistência"
                      value="resistencia"
                      {...register(`tmi.${exercise.value}.tipo`)}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={exercise.value}
                      checked={isChecked}
                      onChange={e => {
                        const { checked } = e.target;
                        const updatedTmiExercises = { ...selected };
                        if (checked) {
                          updatedTmiExercises[exercise.value] = {
                            carga: '',
                            series: '',
                            repeticoes_tempo: '',
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
              {isChecked && (
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
                      label="Séries"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      style={{ backgroundColor: 'white' }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs
                  >
                    <TextField
                      {...register(`tmi.${exercise.value}.repeticoes_tempo`)}
                      label="Repetições/Tempo"
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
