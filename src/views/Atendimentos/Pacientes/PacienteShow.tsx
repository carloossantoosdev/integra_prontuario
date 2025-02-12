import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useShow } from '@refinedev/core';
import { DateField, Show, EditButton, DeleteButton } from '@refinedev/mui';
import { useEffect, useState } from 'react';
import { supabaseClient } from '../../../utils/supabaseClient';
import { formDataRcpProps } from '../../../types/evolucaoRcpTypes';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import {
  renderAuscultaPulmonar,
  renderDataTable,
  renderTerapia,
  renderTreinamento,
} from './utils/renderHelpers';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const PacienteShow = () => {
  const [vitalsData, setVitalsData] = useState<formDataRcpProps[]>([]);
  const [loadingVitals, setLoadingVitals] = useState(true);
  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  const { query } = useShow({
    meta: {
      select:
        'id, nome, data_nascimento, inicio_atendimento, valor, area_atendimento',
    },
  });

  const { data, isLoading } = query;
  const patientsData = data?.data;

  useEffect(() => {
    const fetchVitals = async () => {
      if (patientsData) {
        setLoadingVitals(true);
        const { data: vitals, error } = await supabaseClient
          .from('evolucao_rcp')
          .select('*')
          .eq('patient_id', patientsData.id);

        if (error) {
          console.error('Erro ao buscar sinais vitais:', error);
        } else {
          setVitalsData(
            vitals.sort(
              (a: formDataRcpProps, b: formDataRcpProps) =>
                Number(new Date(b.created_at)) - Number(new Date(a.created_at))
            )
          );
        }
        setLoadingVitals(false);
      }
    };

    fetchVitals();
  }, [patientsData]);

  if (isLoading || loadingVitals) {
    return <CircularProgress />;
  }

  const filteredVitalsData = vitalsData.filter(vital =>
    filterDate
      ? new Date(vital.data_atendimento).toISOString().slice(0, 10) ===
        filterDate
      : true
  );

  return (
    <Show
      isLoading={isLoading}
      title="Detalhes Evolução"
      canEdit
      canDelete
      headerButtons={[
        <EditButton recordItemId={patientsData?.id}>
          Editar paciente
        </EditButton>,
        <DeleteButton
          recordItemId={patientsData?.id}
          confirmTitle="Deseja excluir este item?"
          confirmCancelText="Cancelar"
          confirmOkText="Excluir"
        >
          Excluir
        </DeleteButton>,
      ]}
    >
      <Stack gap={2}>
        <Typography
          variant="h6"
          fontWeight="bold"
          marginTop={2}
        >
          {`Detalhes Paciente: ${patientsData?.nome}`}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Nome</TableCell>
                <TableCell>{patientsData?.nome}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>
                  Data de Nascimento
                </TableCell>
                <TableCell>
                  <DateField value={patientsData?.data_nascimento} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>
                  Início do Atendimento
                </TableCell>
                <TableCell>
                  <DateField value={patientsData?.inicio_atendimento} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Valor</TableCell>
                <TableCell>
                  {patientsData?.valor
                    ? `R$ ${patientsData?.valor.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : 'R$ 0,00'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TextField
          type="date"
          variant="outlined"
          label="Filtrar por Data"
          onChange={e => setFilterDate(e.target.value)}
          sx={{
            marginTop: 5,
          }}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            style: { marginTop: 10, marginBottom: 16 },
          }}
        />

        {filteredVitalsData.map(vital => (
          <Accordion
            key={vital.id}
            style={{ marginBottom: '20px' }}
          >
            <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
              <Typography variant="h6">
                {/* <Button
                  onClick={() => navigate(`/evolucao_rcp/edit/${vital.id}`)}
                  color="primary"
                >
                  Editar
                </Button> */}
                {`Evolução ${patientsData?.area_atendimento}`}{' '}
                {moment(vital.data_atendimento).format('DD/MM/YYYY')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  Sinais vitais iniciais
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>{renderDataTable(vital.ssvv_inicial)}</TableBody>
                  </Table>
                </TableContainer>

                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  Sinais vitais finais
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>{renderDataTable(vital.ssvv_final)}</TableBody>
                  </Table>
                </TableContainer>

                {renderAuscultaPulmonar(vital.ausculta_pulmonar, vital)}

                {renderTreinamento(
                  vital.treinamento_aerobico,
                  'Treinamento Aeróbico'
                )}

                {renderTreinamento(
                  vital.treinamento_resistido,
                  'Treinamento Resistido'
                )}

                {renderTreinamento(
                  vital.treinamento_funcional,
                  'Treinamento Funcional'
                )}

                {renderTerapia(vital.tmi, 'TMI')}

                {renderTerapia(vital.terapia_expansao, 'Terapia Expansão')}

                {renderTerapia(
                  vital.terapia_remo_secrecao,
                  'Terapia Remoção de Secreção'
                )}
              </Stack>
            </AccordionDetails>

            <Grid
              container
              justifyContent="flex-start"
              sx={{ padding: 2 }}
              direction={'column'}
            >
              <Typography variant="subtitle1">
                <strong>Fisioterapeuta</strong>
                {`: ${vital.fisioterapeuta}`}
              </Typography>

              <Typography>
                <strong>Data do Atendimento</strong>
                {`: ${moment(vital.data_atendimento).format('DD/MM/YYYY')}`}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Observações</strong>
                {`: ${vital.observacao}`}
              </Typography>
            </Grid>
          </Accordion>
        ))}
      </Stack>
    </Show>
  );
};
