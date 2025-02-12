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
  { name: 'EPAP válvula', value: 'epap_valvula' },
  { name: 'EPAP artesanal', value: 'epap_artesanal' },
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
        {terapiaExpansao.map(exercise => {
          const isChecked = Boolean(selected[exercise.value]);

          return (
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
                      checked={isChecked}
                      onChange={e => {
                        const { checked } = e.target;
                        const updatedTerapiaExpansao = { ...selected };
                        if (checked) {
                          updatedTerapiaExpansao[exercise.value] = {
                            carga: '',
                            series_repeticoes: '',
                            parametros: '', // Campo para VNI
                            manuseios: '', // Campo para RTA
                          };
                        } else {
                          delete updatedTerapiaExpansao[exercise.value];
                        }
                        setValue(`terapia_expansao`, updatedTerapiaExpansao);
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
                  {exercise.value === 'vni' ? (
                    <Grid
                      item
                      xs
                    >
                      <TextField
                        {...register(
                          `terapia_expansao.${exercise.value}.parametros`
                        )}
                        label="Parâmetros Ventilatórios"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        style={{ backgroundColor: 'white', width: '100%' }}
                      />
                    </Grid>
                  ) : exercise.value === 'rta' ? (
                    <Grid
                      item
                      xs
                    >
                      <TextField
                        {...register(
                          `terapia_expansao.${exercise.value}.manuseios`
                        )}
                        label="Manuseios"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        style={{ backgroundColor: 'white', width: '100%' }}
                      />
                    </Grid>
                  ) : (
                    <>
                      <Grid
                        item
                        xs
                      >
                        <TextField
                          {...register(
                            `terapia_expansao.${exercise.value}.carga`
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
                            `terapia_expansao.${exercise.value}.series_repeticoes`
                          )}
                          label="Séries/Repetições"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                          style={{ backgroundColor: 'white' }}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
