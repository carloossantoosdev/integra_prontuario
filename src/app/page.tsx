/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AppointmentsList } from "@/components/AppointmentList";
import { Input } from "@/components/Input";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { debounce } from 'lodash'; 
import DataGridPagination from "@/components/DataGridPagination"; 
import { useAppointmentStore } from "@/store/appointments.store";
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<string>(''); 
  const [inputValue, setInputValue] = useState<string>(''); 

  const { appointmentList, setAppointmentList } = useAppointmentStore();

  console.log(appointmentList)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 3,
    total: 0,
  });

  const router = useRouter();

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error, count } = await supabase
        .from('appointments')
        .select('*', { count: 'exact' })
        .ilike('nome', `%${filter}%`)
        .range((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit - 1);

      if (error) throw error;

      console.log('Dados retornados:', data);
      setAppointmentList(data || []);
      setPagination((prev) => ({
        ...prev,
        total: count || 0,
      }));
    } catch (error) {
      console.error('Erro ao buscar atendimentos:', error);
      setError('Erro ao buscar atendimentos');
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

  const handleEdit = (id: string) => {
    router.push(`/cadastro-atendimentos?id=${id}`);
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
  

        <AppointmentsList appointments={appointmentList} onEdit={handleEdit} />

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