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
import type { KpiMetrics, KpiTargets } from '../../types/kpis';

type FormValues = {
  month: string; // YYYY-MM
  targets: KpiTargets;
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
  novos_clientes_total: 0,
  clientes_perdidos_total: 0,
  sessoes_planejadas_total: 0,
  sessoes_realizadas_total: 0,
  no_show_total: 0,
  horas_trabalhadas_total: 0,
  custo_operacional_total: 0,
  custo_marketing_total: 0,
};

const defaultTargets: KpiTargets = {
  faturamento_total: 0,
  clientes_total: 0,
  ticket_medio: 0,
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
      targets: defaultTargets,
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
        if (existing.targets) {
          (Object.keys(defaultTargets) as Array<keyof KpiTargets>).forEach(
            key => {
              setValue(`targets.${key}` as any, existing.targets?.[key] ?? 0);
            }
          );
        }
      }
    };
    void loadExisting();
  }, [month, setValue]);

  const onSubmit = async (values: FormValues) => {
    await upsertKpiMonthly({
      refDate: values.month as `${number}-${number}`,
      metrics: {
        clientes_plano_mensal: values.clientes_plano_mensal,
        clientes_plano_longo_3m: values.clientes_plano_longo_3m,
        clientes_plano_longo_6m: values.clientes_plano_longo_6m,
        clientes_plano_longo_12m: values.clientes_plano_longo_12m,
        clientes_agudos_avulso: values.clientes_agudos_avulso,
        clientes_cronicos_dnm: values.clientes_cronicos_dnm,
        clientes_total_reab_ped: values.clientes_total_reab_ped,
        clientes_total_reab_adulto: values.clientes_total_reab_adulto,
        clientes_total_reab_idoso: values.clientes_total_reab_idoso,
        clientes_total_sono: values.clientes_total_sono,
        faturamento_reab_ped: values.faturamento_reab_ped,
        faturamento_reab_adulto: values.faturamento_reab_adulto,
        faturamento_reab_idoso: values.faturamento_reab_idoso,
        faturamento_dnm: values.faturamento_dnm,
        faturamento_sono: values.faturamento_sono,
        novos_clientes_total: values.novos_clientes_total,
        clientes_perdidos_total: values.clientes_perdidos_total,
        sessoes_planejadas_total: values.sessoes_planejadas_total,
        sessoes_realizadas_total: values.sessoes_realizadas_total,
        no_show_total: values.no_show_total,
        horas_trabalhadas_total: values.horas_trabalhadas_total,
        custo_operacional_total: values.custo_operacional_total,
        custo_marketing_total: values.custo_marketing_total,
      },
      targets: values.targets,
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

            {/* Aquisição e retenção */}
            <Grid
              item
              xs={12}
              md={12}
            >
              <Typography variant="subtitle1">Aquisição e Retenção</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('novos_clientes_total', 'Novos clientes (total)')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'clientes_perdidos_total',
                'Clientes perdidos (churn)'
              )}
            </Grid>

            {/* Operacional */}
            <Grid
              item
              xs={12}
              md={12}
            >
              <Typography variant="subtitle1">Operacional</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('sessoes_planejadas_total', 'Sessões planejadas')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('sessoes_realizadas_total', 'Sessões realizadas')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField('no_show_total', 'No-show (faltas)')}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'horas_trabalhadas_total',
                'Horas trabalhadas (total)'
              )}
            </Grid>

            {/* Financeiro */}
            <Grid
              item
              xs={12}
              md={12}
            >
              <Typography variant="subtitle1">Financeiro</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'custo_operacional_total',
                'Custo operacional total (R$)'
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              {numberField(
                'custo_marketing_total',
                'Custo marketing total (R$)'
              )}
            </Grid>

            {/* Metas (targets) */}
            <Grid
              item
              xs={12}
              md={12}
            >
              <Typography variant="subtitle1">Metas do mês</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                type="number"
                fullWidth
                label="Meta faturamento total (R$)"
                InputLabelProps={{ shrink: true }}
                {...register('targets.faturamento_total', {
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                type="number"
                fullWidth
                label="Meta clientes total"
                InputLabelProps={{ shrink: true }}
                {...register('targets.clientes_total', { valueAsNumber: true })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                type="number"
                fullWidth
                label="Meta ticket médio (R$)"
                InputLabelProps={{ shrink: true }}
                {...register('targets.ticket_medio', { valueAsNumber: true })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
            >
              <Typography variant="body2">Metas por área (opcional)</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                type="number"
                fullWidth
                label="Meta Reab PEd (R$)"
                InputLabelProps={{ shrink: true }}
                {...register('targets.faturamento_reab_ped', {
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                type="number"
                fullWidth
                label="Meta Reab Adulto (R$)"
                InputLabelProps={{ shrink: true }}
                {...register('targets.faturamento_reab_adulto', {
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                type="number"
                fullWidth
                label="Meta Reab Idoso (R$)"
                InputLabelProps={{ shrink: true }}
                {...register('targets.faturamento_reab_idoso', {
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                type="number"
                fullWidth
                label="Meta DNM (R$)"
                InputLabelProps={{ shrink: true }}
                {...register('targets.faturamento_dnm', {
                  valueAsNumber: true,
                })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                type="number"
                fullWidth
                label="Meta Sono (R$)"
                InputLabelProps={{ shrink: true }}
                {...register('targets.faturamento_sono', {
                  valueAsNumber: true,
                })}
              />
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
