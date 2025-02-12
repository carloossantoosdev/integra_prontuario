/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

interface AuscultaField {
  name: string;
  label: string;
  options: string[];
}

interface SinaisVitaisFormProps {
  register: any;
  errors: any;
}

export const SinaisVitaisForm = ({
  register,
  errors,
}: SinaisVitaisFormProps) => {
  const auscultaFields: AuscultaField[] = [
    { name: 'mv', label: 'MV', options: ['presente', 'reduzido', 'abolido'] },
    {
      name: 'localizacao',
      label: 'Localização',
      options: ['AHT', 'base', 'Ápice', 'direita', 'esquerda'],
    },
    {
      name: 'ruídos',
      label: 'Ruídos',
      options: [
        'roncos',
        'estridor',
        'espástica',
        'estertores',
        'sibilos expiratorios',
        'sibilos inspiratorios',
      ],
    },
  ];

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}
      autoComplete="off"
    >
      <Grid
        container
        spacing={2}
      >
        <Typography
          variant="h6"
          marginTop={2}
          fontWeight="bold"
        >
          Sinais Vitais Inicial
        </Typography>
        <Grid
          container
          spacing={2}
        >
          {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map(
            fieldName => (
              <Grid
                item
                xs={4}
                key={`ssvv_inicial.${fieldName}`}
              >
                <TextField
                  {...register(`ssvv_inicial.${fieldName}`, {
                    required: `${fieldName} é obrigatório`,
                  })}
                  required={true}
                  type={
                    fieldName === 'SpO2' || fieldName === 'PA'
                      ? 'text'
                      : 'number'
                  }
                  error={!!(errors.ssvv_inicial as any)?.[fieldName]}
                  helperText={
                    (errors.ssvv_inicial as any)?.[fieldName]?.message
                  }
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label={fieldName}
                />
              </Grid>
            )
          )}
        </Grid>

        {/* Dados Finais (ssvv_final) */}
        <Typography
          variant="h6"
          marginTop={2}
          fontWeight="bold"
        >
          Sinais Vitais Final
        </Typography>
        <Grid
          container
          spacing={2}
        >
          {['FC', 'SpO2', 'PA', 'Borg_D', 'Borg_F', 'EVA_Desc'].map(
            fieldName => (
              <Grid
                item
                xs={4}
                key={`ssvv_final.${fieldName}`}
              >
                <TextField
                  {...register(`ssvv_final.${fieldName}`, {
                    required: `${fieldName} é obrigatório`,
                  })}
                  required={true}
                  type={
                    fieldName === 'SpO2' || fieldName === 'PA'
                      ? 'text'
                      : 'number'
                  }
                  error={!!(errors.ssvv_final as any)?.[fieldName]}
                  helperText={(errors.ssvv_final as any)?.[fieldName]?.message}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  label={fieldName}
                />
              </Grid>
            )
          )}
        </Grid>

        <Grid>
          <Typography
            variant="h6"
            marginTop={2}
            fontWeight="bold"
          >
            Ausculta Pulmonar
          </Typography>
          {auscultaFields.map(({ name, label, options }) => (
            <div key={name}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
              >
                {label}
              </Typography>
              {options.map(option => (
                <FormControlLabel
                  key={`ausculta_pulmonar.${name}.${option}`}
                  control={
                    <Checkbox
                      {...register(`ausculta_pulmonar.${name}.${option}`)}
                      color="primary"
                    />
                  }
                  label={option.charAt(0).toUpperCase() + option.slice(1)}
                />
              ))}
            </div>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
