'use client';

import { AppointmentsList } from "@/components/AppointmentList";
import { Input } from "@/components/Input";
import { api } from "@/lib/axios";
import { useAppointmentStore } from "@/store/appointments.store";
import { AppointmentData } from "@/types/appointment";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { debounce } from 'lodash'; 
import DataGridPagination from "@/components/DataGridPagination"; // Importe o componente de paginação

export default function Home() {
  const { appointmentList, setAppointmentList } = useAppointmentStore();

  const [loading, setLoading] = useState(true);
  const [error, ] = useState<string | null>(null);

  const [filter, setFilter] = useState<string>(''); 
  const [inputValue, setInputValue] = useState<string>(''); 

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 3,
    total: 0,
  });

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<{ data: AppointmentData[], meta: { total: number } }>('/appointments', {
        params: {
          nome: filter,
          page: pagination.page,
          limit: pagination.limit,
        },
      });
      setAppointmentList(response.data.data || []);
      setPagination((prev) => ({
        ...prev,
        total: response.data.meta.total,
      }));
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, pagination.page, pagination.limit, setAppointmentList]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const debouncedSetFilter = useCallback(
    debounce((value: string) => {
      setFilter(value);
      setPagination((prev) => ({
        ...prev,
        page: 1,
      }));
    }, 300), 
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    debouncedSetFilter(event.target.value); 
  };


  if (loading) return (
    <Box
        sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
    >
        <CircularProgress />;
    </Box>
  )
  
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2, textAlign: 'center' }}>Lista de Atendimentos</Typography>

      <Box
        sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'center',
            m:''
        }}
      >

      <Input
        name="filter"
        label="Filtrar por nome"
        value={inputValue} 
        onChange={handleFilterChange} 
        sx={{ mb: 2, width: '200px' }} 
      />
        
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          mt: 4,
        }}
      >
    

        <AppointmentsList appointments={appointmentList} />

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', position: 'fixed', bottom: 0, width: '100%', mb:2 }}>
          <DataGridPagination
            count={Math.ceil(pagination.total / pagination.limit)}
            page={pagination.page}
            onChange={(value: number) => {
              setPagination((prev) => ({
                ...prev,
                page: value,
              }));
            }}
          />
        </Box>
      </Box>
    </>
  );
}