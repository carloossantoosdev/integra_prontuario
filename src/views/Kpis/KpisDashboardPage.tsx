import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { getKpis } from '../../services/kpisService';
import type { KpiMonthly } from '../../types/kpis';
import { computeTickets } from '../../types/kpis';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

function monthLabel(isoDate: string) {
  return isoDate.slice(0, 7);
}

export const KpisDashboardPage: React.FC = () => {
  const [monthsWindow, setMonthsWindow] = useState(12);
  const [data, setData] = useState<KpiMonthly[]>([]);

  useEffect(() => {
    const to = new Date();
    const from = new Date();
    from.setMonth(from.getMonth() - (monthsWindow - 1));
    const params = {
      from: `${from.toISOString().slice(0, 7)}-01`,
      to: `${to.toISOString().slice(0, 7)}-01`,
    };
    void getKpis(params).then(setData);
  }, [monthsWindow]);

  const shaped = useMemo(() => {
    return data.map(row => {
      const tickets = computeTickets(row.metrics);
      return {
        month: monthLabel(row.ref_date),
        ...row.metrics,
        targets: row.targets ?? {},
        ...tickets,
      };
    });
  }, [data]);

  const latest = shaped[shaped.length - 1];
  const prev = shaped[shaped.length - 2];

  const sums = (row: any) => {
    if (!row) return { faturamento_total: 0, clientes_total: 0 };
    const faturamento_total =
      (row.faturamento_reab_ped || 0) +
      (row.faturamento_reab_adulto || 0) +
      (row.faturamento_reab_idoso || 0) +
      (row.faturamento_dnm || 0) +
      (row.faturamento_sono || 0);
    const clientes_total =
      (row.clientes_total_reab_ped || 0) +
      (row.clientes_total_reab_adulto || 0) +
      (row.clientes_total_reab_idoso || 0) +
      (row.clientes_total_sono || 0);
    return { faturamento_total, clientes_total };
  };

  const pct = (a: number, b: number) => (b ? ((a - b) / b) * 100 : 0);

  const latestAgg = sums(latest);
  const prevAgg = sums(prev);
  const ticketMedioAtual = latestAgg.clientes_total
    ? latestAgg.faturamento_total / latestAgg.clientes_total
    : 0;
  const ticketMedioPrev = prevAgg.clientes_total
    ? prevAgg.faturamento_total / prevAgg.clientes_total
    : 0;

  const aggSeries = useMemo(() => {
    return shaped.map(r => {
      const agg = sums(r);
      const utilizacao =
        (r.sessoes_planejadas_total || 0) > 0
          ? ((r.sessoes_realizadas_total || 0) /
              (r.sessoes_planejadas_total || 1)) *
            100
          : 0;
      return {
        month: r.month,
        faturamento_total: agg.faturamento_total,
        clientes_total: agg.clientes_total,
        meta_faturamento: r?.targets?.faturamento_total || 0,
        novos: r.novos_clientes_total || 0,
        perdidos: r.clientes_perdidos_total || 0,
        net: (r.novos_clientes_total || 0) - (r.clientes_perdidos_total || 0),
        utilizacao,
      };
    });
  }, [shaped]);

  return (
    <Box p={2}>
      <Typography
        variant="h5"
        gutterBottom
      >
        KPIs Mensais - Dashboard
      </Typography>

      {/* Cards de resumo */}
      <Grid
        container
        spacing={2}
        mb={2}
      >
        <Grid
          item
          xs={12}
          md={4}
        >
          <Card>
            <CardHeader
              title="Faturamento Total"
              subheader={latest ? latest.month : '-'}
            />
            <CardContent>
              <Typography variant="h6">
                R${' '}
                {latestAgg.faturamento_total.toLocaleString('pt-BR', {
                  maximumFractionDigits: 0,
                })}
              </Typography>
              <Typography
                variant="body2"
                color={
                  pct(latestAgg.faturamento_total, prevAgg.faturamento_total) >=
                  0
                    ? 'success.main'
                    : 'error.main'
                }
              >
                {pct(
                  latestAgg.faturamento_total,
                  prevAgg.faturamento_total
                ).toFixed(1)}
                % MoM
              </Typography>
              {latest?.targets?.faturamento_total ? (
                <Typography variant="body2">
                  Meta: R${' '}
                  {Number(latest.targets.faturamento_total).toLocaleString(
                    'pt-BR',
                    { maximumFractionDigits: 0 }
                  )}
                </Typography>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Card>
            <CardHeader
              title="Clientes Totais"
              subheader={latest ? latest.month : '-'}
            />
            <CardContent>
              <Typography variant="h6">
                {latestAgg.clientes_total.toLocaleString('pt-BR')}
              </Typography>
              <Typography
                variant="body2"
                color={
                  pct(latestAgg.clientes_total, prevAgg.clientes_total) >= 0
                    ? 'success.main'
                    : 'error.main'
                }
              >
                {pct(latestAgg.clientes_total, prevAgg.clientes_total).toFixed(
                  1
                )}
                % MoM
              </Typography>
              {latest?.targets?.clientes_total ? (
                <Typography variant="body2">
                  Meta: {latest.targets.clientes_total}
                </Typography>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Card>
            <CardHeader
              title="Ticket Médio"
              subheader={latest ? latest.month : '-'}
            />
            <CardContent>
              <Typography variant="h6">
                R${' '}
                {ticketMedioAtual.toLocaleString('pt-BR', {
                  maximumFractionDigits: 0,
                })}
              </Typography>
              <Typography
                variant="body2"
                color={
                  pct(ticketMedioAtual, ticketMedioPrev) >= 0
                    ? 'success.main'
                    : 'error.main'
                }
              >
                {pct(ticketMedioAtual, ticketMedioPrev).toFixed(1)}% MoM
              </Typography>
              {latest?.targets?.ticket_medio ? (
                <Typography variant="body2">
                  Meta: R${' '}
                  {Number(latest.targets.ticket_medio).toLocaleString('pt-BR', {
                    maximumFractionDigits: 0,
                  })}
                </Typography>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mb={2}>
        <TextField
          select
          size="small"
          label="Janela (meses)"
          value={monthsWindow}
          onChange={e => setMonthsWindow(Number(e.target.value))}
        >
          {[6, 12, 18, 24].map(v => (
            <MenuItem
              key={v}
              value={v}
            >
              {v}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
              >
                Clientes por plano (eixo Y)
              </Typography>
              <ResponsiveContainer
                width="100%"
                height={280}
              >
                <LineChart
                  data={shaped}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="clientes_plano_mensal"
                    name="Mensal"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="clientes_plano_longo_3m"
                    name="Longo 3m"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="clientes_plano_longo_6m"
                    name="Longo 6m"
                    stroke="#ffc658"
                  />
                  <Line
                    type="monotone"
                    dataKey="clientes_plano_longo_12m"
                    name="Longo 12m"
                    stroke="#ff7300"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
              >
                Faturamento por área (R$)
              </Typography>
              <ResponsiveContainer
                width="100%"
                height={280}
              >
                <BarChart
                  data={shaped}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="faturamento_reab_ped"
                    name="Reab PEd"
                    fill="#8884d8"
                  />
                  <Bar
                    dataKey="faturamento_reab_adulto"
                    name="Reab Adulto"
                    fill="#82ca9d"
                  />
                  <Bar
                    dataKey="faturamento_reab_idoso"
                    name="Reab Idoso"
                    fill="#ffc658"
                  />
                  <Bar
                    dataKey="faturamento_dnm"
                    name="DNM"
                    fill="#ff7300"
                  />
                  <Bar
                    dataKey="faturamento_sono"
                    name="Sono"
                    fill="#0088FE"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
        >
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
              >
                Ticket médio por área (R$)
              </Typography>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart
                  data={shaped}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ticket_reab_ped"
                    name="Reab PEd"
                    stroke="#8884d8"
                  />
                  <Line
                    type="monotone"
                    dataKey="ticket_reab_adulto"
                    name="Reab Adulto"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="ticket_reab_idoso"
                    name="Reab Idoso"
                    stroke="#ffc658"
                  />
                  <Line
                    type="monotone"
                    dataKey="ticket_dnm"
                    name="DNM"
                    stroke="#ff7300"
                  />
                  <Line
                    type="monotone"
                    dataKey="ticket_sono"
                    name="Sono"
                    stroke="#0088FE"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Metas x Real e Operacional */}
      <Grid
        container
        spacing={2}
        mt={1}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
              >
                Metas x Real (Faturamento Total)
              </Typography>
              <ResponsiveContainer
                width="100%"
                height={280}
              >
                <BarChart
                  data={aggSeries}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="faturamento_total"
                    name="Real"
                    fill="#4caf50"
                  />
                  <Bar
                    dataKey="meta_faturamento"
                    name="Meta"
                    fill="#9e9e9e"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
              >
                Aquisição e retenção (clientes)
              </Typography>
              <ResponsiveContainer
                width="100%"
                height={280}
              >
                <BarChart
                  data={aggSeries}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="novos"
                    name="Novos"
                    fill="#2196f3"
                  />
                  <Bar
                    dataKey="perdidos"
                    name="Perdidos"
                    fill="#f44336"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
        >
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
              >
                Utilização operacional (%)
              </Typography>
              <ResponsiveContainer
                width="100%"
                height={280}
              >
                <LineChart
                  data={aggSeries}
                  margin={{ left: 8, right: 8, top: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="utilizacao"
                    name="Utilização %"
                    stroke="#673ab7"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KpisDashboardPage;
