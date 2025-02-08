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
} from '@mui/material';
import { useShow } from '@refinedev/core';
import { DateField, Show, EditButton, DeleteButton } from '@refinedev/mui';
import { useEffect, useState } from 'react';
import { supabaseClient } from '../../../utils/supabaseClient';
import { AuscultaPulmonar, Ssvv, VitalSigns } from '../../../types/types';
import { GridExpandMoreIcon } from '@mui/x-data-grid';

export const PacienteShow = () => {
  const [vitalsData, setVitalsData] = useState<VitalSigns[]>([]);
  const [loadingVitals, setLoadingVitals] = useState(true);
  const [filterDate, setFilterDate] = useState('');

  const { query } = useShow({
    meta: {
      select:
        'id, nome, data_nascimento, inicio_atendimento, valor, area_atendimento, fisioterapeuta',
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
              (a: VitalSigns, b: VitalSigns) =>
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
      ? new Date(vital.created_at).toISOString().slice(0, 10) === filterDate
      : true
  );

  const renderDataTable = (data: Ssvv) => {
    if (!data) {
      return (
        <TableRow>
          <TableCell colSpan={2}>Sem dados</TableCell>
        </TableRow>
      );
    }

    return Object.entries(data).map(([key, value]) => (
      <TableRow key={key}>
        <TableCell style={{ fontWeight: 600 }}>{key}</TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    ));
  };

  const renderAuscultaPulmonar = (
    ausculta: AuscultaPulmonar,
    vital: VitalSigns
  ) => {
    if (!ausculta) return null;

    return (
      <>
        <Typography
          variant="h6"
          fontWeight="bold"
          marginTop={1}
        >
          Ausculta Pulmonar -{' '}
          {new Date(vital.created_at).toLocaleDateString('pt-BR')}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {Object.entries(ausculta).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell style={{ fontWeight: 600 }}>{key}</TableCell>
                  <TableCell>
                    {typeof value === 'object'
                      ? Object.entries(value)
                          .filter(([, val]) => val === true)
                          .map(([subKey]) => subKey)
                          .join(', ') || 'Nenhum'
                      : value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <Show
      isLoading={isLoading}
      title="Detalhes Evolução"
      canEdit
      canDelete
      headerButtons={[
        <EditButton recordItemId={patientsData?.id}>Editar</EditButton>,
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
          Dados Pessoais do Paciente
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
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>
                  Fisioterapeuta
                </TableCell>
                <TableCell>{patientsData?.fisioterapeuta}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: 600 }}>Observações</TableCell>
                <TableCell>{patientsData?.area_atendimento}</TableCell>
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
                Evolução -{' '}
                {new Date(vital.created_at).toLocaleDateString('pt-BR')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  Sinais vitais inicial
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
                  Sinais vitais final
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>{renderDataTable(vital.ssvv_final)}</TableBody>
                  </Table>
                </TableContainer>

                {/* Renderizando Ausculta Pulmonar */}
                {renderAuscultaPulmonar(vital.ausculta_pulmonar, vital)}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Show>
  );
};
