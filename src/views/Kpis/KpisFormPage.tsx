import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { upsertKpiMonthly, getKpiByMonth } from '../../services/kpisService';
import type { KpiMetrics } from '../../types/kpis';

type FormValues = {
  month: string; // YYYY-MM
} & KpiMetrics;

const defaultMetrics: KpiMetrics = {
  clientes_plano_mensal: 0,
  clientes_plano_longo_3m: 0,
  clientes_plano_longo_6m: 0,
  clientes_plano_longo_12m: 0,
  clientes_agudos_avulso: 0,
  clientes_cronicos_dnm: 0,
  clientes_total_reab_ped: 0,
  clientes_total_reab_adulto: 0,
  clientes_total_reab_idoso: 0,
  clientes_total_sono: 0,
  faturamento_reab_ped: 0,
  faturamento_reab_adulto: 0,
  faturamento_reab_idoso: 0,
  faturamento_dnm: 0,
  faturamento_sono: 0,
};

export const KpisFormPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      month: new Date().toISOString().slice(0, 7),
      ...defaultMetrics,
    },
  });

  const month = watch('month');

  useEffect(() => {
    const loadExisting = async () => {
      const existing = await getKpiByMonth(month);
      if (existing) {
        const m = existing.metrics;
        (Object.keys(defaultMetrics) as Array<keyof KpiMetrics>).forEach(
          key => {
            setValue(key as any, m[key] ?? 0);
          }
        );
      }
    };
    void loadExisting();
  }, [month, setValue]);

  const onSubmit = async (values: FormValues) => {
    await upsertKpiMonthly({
      refDate: values.month as `${number}-${number}`,
      metrics: { ...values },
    });
  };

  const numberField = (name: keyof KpiMetrics, label: string) => (
    <TextField
      type="number"
      fullWidth
      label={label}
      InputLabelProps={{ shrink: true }}
      {...register(name, { valueAsNumber: true })}
    />
  );

  return (
    <Box p={2}>
      <Typography
        variant="h5"
        gutterBottom
      >
        KPIs Mensais - Preenchimento
      </Typography>

      <Card>
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
            >
              <TextField
                select
                fullWidth
                label="Mês"
                InputLabelProps={{ shrink: true }}
                value={month}
                {...register('month')}
              >
                {Array.from({ length: 24 }).map((_, i) => {
                  const d = new Date();
                  d.setMonth(d.getMonth() - i);
                  const ym = d.toISOString().slice(0, 7);
                  return (
                    <MenuItem
                      key={ym}
                      value={ym}
                    >
                      {ym}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>

            {/* Clientes */}
            <Grid
              item
              xs={12}
              md={12}
            >
              <Typography variant="subtitle1">Clientes</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('clientes_plano_mensal', 'Clientes plano mensal')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'clientes_plano_longo_3m',
                'Clientes plano longo 3 meses'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'clientes_plano_longo_6m',
                'Clientes plano longo 6 meses'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'clientes_plano_longo_12m',
                'Clientes plano longo 12 meses'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'clientes_agudos_avulso',
                'Clientes agudos - avulso'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('clientes_cronicos_dnm', 'Clientes crônicos DNM')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'clientes_total_reab_ped',
                'Clientes total reab PEd'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'clientes_total_reab_adulto',
                'Clientes total reab Adulto'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'clientes_total_reab_idoso',
                'Clientes total reab Idoso'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('clientes_total_sono', 'Clientes total Sono')}
            </Grid>

            {/* Faturamentos */}
            <Grid
              item
              xs={12}
              md={12}
            >
              <Typography variant="subtitle1">Faturamento (R$)</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('faturamento_reab_ped', 'Faturamento reab PEd')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'faturamento_reab_adulto',
                'Faturamento reab Adulto'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('faturamento_reab_idoso', 'Faturamento reab Idoso')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('faturamento_dnm', 'Faturamento DNM')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('faturamento_sono', 'Faturamento Sono')}
            </Grid>

            <Grid
              item
              xs={12}
            >
              <Box
                display="flex"
                gap={2}
              >
                <Button
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  Salvar mês
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default KpisFormPage;
