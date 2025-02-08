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
import { supabaseClient } from '../../../utils/supabaseClient';
import { VitalSigns } from '../../../types/types';

export const EvolucaoRcpList = () => {
  const [vitalsData, setVitalsData] = useState<VitalSigns[]>([]);
  const [patientName, setPatientName] = useState('');
  const [foundPatientName, setFoundPatientName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setFoundPatientName('');

    const { data: patients, error } = await supabaseClient
      .from('pacientes')
      .select('*')
      .ilike('nome', `%${patientName}%`);

    if (error) {
      console.error('Erro ao buscar pacientes:', error);
      setLoading(false);
      return;
    }

    if (patients.length > 0) {
      const patientIds = patients.map(patient => patient.id);
      setFoundPatientName(patients[0].nome);
      const { data: vitals, error: vitalsError } = await supabaseClient
        .from('evolucao_rcp')
        .select('*')
        .in('patient_id', patientIds);

      if (vitalsError) {
        console.error('Erro ao buscar sinais vitais:', vitalsError);
      } else {
        setVitalsData(vitals);
      }
    } else {
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
