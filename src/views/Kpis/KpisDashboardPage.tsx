import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
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
        ...tickets,
      };
    });
  }, [data]);

  return (
    <Box p={2}>
      <Typography
        variant="h5"
        gutterBottom
      >
        KPIs Mensais - Dashboard
      </Typography>

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
    </Box>
  );
};

export default KpisDashboardPage;
