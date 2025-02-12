import React from 'react';
import {
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import { FormProps } from '../../types/formsTypes';

const functionalExercises = [
  { name: 'Treino de sentar e levantar', value: 'sentar_levantar' },
  { name: 'Subir e descer degrau', value: 'subir_descer_degrau' },
  { name: 'Agachamento', value: 'agachamento' },
  { name: 'AVDs', value: 'avds' },
  { name: 'AIVDs', value: 'aivds' },
];

export const ExerciciosFuncionaisForm = ({
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
        {functionalExercises.map(exercise => {
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
                        const updatedFunctionalExercises = { ...selected };
                        if (checked) {
                          // Inicializando com os campos apropriados
                          updatedFunctionalExercises[exercise.value] =
                            exercise.value === 'avds' ||
                            exercise.value === 'aivds'
                              ? { descricao: '' } // Somente para AVDs e AIVDs
                              : { carga: '', series_repeticoes: '' }; // Para os outros
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
              {isChecked && ( // Mostra os campos somente se o checkbox estiver marcado
                <Grid
                  item
                  container
                  spacing={1}
                  style={{ marginTop: '8px' }}
                >
                  {exercise.value === 'avds' || exercise.value === 'aivds' ? (
                    <Grid
                      item
                      xs
                    >
                      <TextField
                        {...register(
                          `treinamento_funcional.${exercise.value}.descricao`
                        )}
                        label="Descrição"
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
                            `treinamento_funcional.${exercise.value}.carga`
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
                            `treinamento_funcional.${exercise.value}.series_repeticoes`
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
