import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DateField } from '@refinedev/mui';
import { pocketbaseClient } from '../../../utils/pocketbaseClient';
import { formDataRcpProps } from '../../../types/evolucaoRcpTypes';

export const EvolucaoRcpList = () => {
  const [vitalsData, setVitalsData] = useState<formDataRcpProps[]>([]);
  const [patientName, setPatientName] = useState('');
  const [foundPatientName, setFoundPatientName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setFoundPatientName('');

    try {
      // Buscar pacientes pelo nome usando PocketBase
      const patientsResult = await pocketbaseClient
        .collection('pacientes')
        .getList(1, 10, {
          filter: `nome ~ "${patientName}"`,
          sort: 'nome',
        });

      if (patientsResult.items.length > 0) {
        const first = patientsResult.items[0];
        setFoundPatientName(first.nome);

        // Buscar evoluções RCP do paciente
        const vitalsResult = await pocketbaseClient
          .collection('evolucao_rcp')
          .getList(1, 50, {
            filter: `patient_id = "${first.id}"`,
          });

        setVitalsData(
          vitalsResult.items.map(d => ({ id: d.id, ...(d as any) }))
        );
      } else {
        setVitalsData([]);
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setVitalsData([]);
    }
    setLoading(false);
  };

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'created_at',
        headerName: 'Data',
        width: 150,
        renderCell: params => <DateField value={params.value} />,
      },
      {
        field: 'ssvv_inicial',
        headerName: 'Sinais Vitais Inicial',
        flex: 1,
        renderCell: params => <div>{JSON.stringify(params.value)}</div>,
      },
      {
        field: 'ssvv_final',
        headerName: 'Sinais Vitais Final',
        flex: 1,
        renderCell: params => <div>{JSON.stringify(params.value)}</div>,
      },
      {
        field: 'ausculta_pulmonar',
        headerName: 'Ausculta Pulmonar',
        flex: 1,
        renderCell: params => <div>{JSON.stringify(params.value)}</div>,
      },
    ],
    []
  );

  return (
    <Box style={{ padding: '20px' }}>
      <TextField
        label="Nome do Paciente"
        value={patientName}
        onChange={e => setPatientName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        sx={{
          marginTop: '20px',
          marginBottom: '20px',
        }}
        variant="contained"
        color="primary"
        onClick={handleSearch}
      >
        Buscar
      </Button>

      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <>
          {vitalsData.length > 0 ? (
            <Box
              style={{
                marginTop: '20px',
                height: '400px',
                width: '100%',
                overflowX: 'auto',
              }}
            >
              <Typography variant="h6">
                Sinais Vitais para: {foundPatientName}
              </Typography>
              <DataGrid
                rows={vitalsData}
                columns={columns}
                style={{ minWidth: '600px' }}
              />
            </Box>
          ) : (
            <Typography
              variant="body1"
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '50px',
              }}
            >
              Nenhum sinal vital encontrado.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};
