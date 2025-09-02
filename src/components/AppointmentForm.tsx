"use client";

import React, { useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { AppointmentData } from '@/types/appointment';
import { Input } from '@/components/Input';
import { supabase } from '@/lib/supabaseClient';
import { useAppointmentStore } from "@/store/appointments.store";
import { useRouter, useSearchParams } from 'next/navigation';

export function AppointmentForm() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<AppointmentData>();
  const { appointmentList } = useAppointmentStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams?.get('id') ?? null;

  useEffect(() => {
    if (appointmentId) {
      const appointment = appointmentList.find(app => app.id === parseInt(appointmentId));
      if (appointment) {
        Object.keys(appointment).forEach(key => {
          setValue(key as keyof AppointmentData, appointment[key as keyof AppointmentData]);
        });
      }
    }
  }, [appointmentId, appointmentList, setValue]);

  const onSubmit = async (data: AppointmentData) => {
    try {
      if (appointmentId) {
        const { error } = await supabase
          .from('appointments')
          .update(data)
          .eq('id', parseInt(appointmentId));
        if (error) throw error;
        console.log('Dados atualizados com sucesso!');
      } else {
        const { error } = await supabase
          .from('appointments')
          .insert(data);
        if (error) throw error;
        console.log('Dados salvos com sucesso!');
      }
      router.push('/');
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Formulário de Atendimento
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="data_atendimento"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="Data do Atendimento"
                type="date"
                error={!!errors.data_atendimento}
                helperText={errors.data_atendimento?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="ssvv_inicial_fc"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="FC Inicial (bpm)"
                type="number"
                error={!!errors.ssvv_inicial_fc}
                helperText={errors.ssvv_inicial_fc?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="ssvv_inicial_spo2"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="SpO2 Inicial (%)"
                type="number"
                error={!!errors.ssvv_inicial_spo2}
                helperText={errors.ssvv_inicial_spo2?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="ssvv_inicial_fr"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="FR Inicial (ipm)"
                type="number"
                error={!!errors.ssvv_inicial_fr}
                helperText={errors.ssvv_inicial_fr?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="ssvv_inicial_pa"
            control={control}
            rules={{ required: 'Este campo é obrigatório' }}
            render={({ field }) => (
              <Input
                {...field}
                label="PA Inicial (mmHg)"
                type="number"
                error={!!errors.ssvv_inicial_pa}
                helperText={errors.ssvv_inicial_pa?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="modo_ventilatorio"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Modo Ventilatório"
                error={!!errors.modo_ventilatorio}
                helperText={errors.modo_ventilatorio?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: '1 1 calc(50% - 16px)', minWidth: '200px' }}>
          <Controller
            name="ipap"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="IPAP"
                type="number"
                error={!!errors.ipap}
                helperText={errors.ipap?.message}
                sx={{ width: '100%' }}
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button type="submit" variant="contained" color="success">
            {appointmentId ? 'Atualizar' : 'Salvar'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}


