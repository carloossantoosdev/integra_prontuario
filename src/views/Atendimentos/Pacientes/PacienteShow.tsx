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
import { pocketbaseClient } from '../../../utils/pocketbaseClient';
// Tipagem flexível para suportar RCP e DNM
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
  const [vitalsData, setVitalsData] = useState<any[]>([]);
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
        try {
          const area = String(
            patientsData.area_atendimento || ''
          ).toUpperCase();
          const collectionName = area.includes('DNM')
            ? 'evolucao_dnm'
            : 'evolucao_rcp';

          const vitalsResult = await pocketbaseClient
            .collection(collectionName)
            .getList(1, 50, {
              filter: `patient_id = "${patientsData.id}"`,
            });

          const vitals = vitalsResult.items.map((d: any) => ({
            id: d.id,
            ...d,
          }));

          const getRecordDate = (rec: any) => {
            const raw = rec?.data_atendimento ?? rec?.created_at;
            if (!raw) return new Date(0);
            // Firestore Timestamp possui toDate
            if (typeof raw?.toDate === 'function') return raw.toDate();
            return new Date(raw);
          };

          setVitalsData(
            vitals.sort((a: any, b: any) => {
              return Number(getRecordDate(b)) - Number(getRecordDate(a));
            })
          );
        } catch (error) {
          console.error('Erro ao buscar sinais vitais:', error);
        }
        setLoadingVitals(false);
      }
    };

    fetchVitals();
  }, [patientsData]);

  if (isLoading || loadingVitals) {
    return <CircularProgress />;
  }

  const getRecordDate = (rec: any) => {
    const raw = rec?.data_atendimento ?? rec?.created_at;
    if (!raw) return new Date(0);
    if (typeof raw?.toDate === 'function') return raw.toDate();
    return new Date(raw);
  };

  const filteredVitalsData = vitalsData.filter(vital => {
    if (!filterDate) return true;
    try {
      return getRecordDate(vital).toISOString().slice(0, 10) === filterDate;
    } catch {
      return false;
    }
  });

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
                {moment(getRecordDate(vital)).format('DD/MM/YYYY')}
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
                {`: ${moment(getRecordDate(vital)).format('DD/MM/YYYY')}`}
              </Typography>

              {vital?.observacao ? (
                <Typography variant="subtitle1">
                  <strong>Observações</strong>
                  {`: ${vital.observacao}`}
                </Typography>
              ) : null}
            </Grid>
          </Accordion>
        ))}
      </Stack>
    </Show>
  );
};
